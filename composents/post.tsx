import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../app/home/postslicer";
import {
  UserCircle,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  Image as ImageIcon,
  Bookmark,
  Send,
  X, // added
} from "lucide-react";

type RegularPost = {
  id: number;
  content: string;
  creationDate: string;
  isEdited: boolean;
  modificationDate: string;
  isPinned: boolean;
  isArchived: boolean;
  reportedCount: number;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  viewCount: number;
  author: string;
  postType: string;
  mediaUrl?: string; // image du post
  authorAvatarUrl?: string; // avatar auteur (nouveau)
};

type Props = {
  endpoint?: string; // posts API
  pageSize?: number;
  pollInterval?: number; // ms (optionnel)
  commentsEndpoint?: string; // API commentaires (GET ?postId=, POST)
};

type CommentItem = {
  id: string | number;
  postId: number;
  author: string;
  avatarUrl?: string;
  content: string;
  createdAt: string; // ISO
};

function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) {
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return `il y a ${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}`;
  }
  return `il y a ${diffHours} heure${diffHours > 1 ? "s" : ""}`;
}

export default function RegularPosts({
  endpoint,
  pageSize = 10,
  pollInterval,
  commentsEndpoint,
}: Props) {
  const dispatch = useDispatch();
  const regularPosts = useSelector((state: any) => state?.post?.value?.regular || []);

  // État local si endpoint est fourni
  const [page, setPage] = useState(1);
  const [remotePosts, setRemotePosts] = useState<RegularPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // ====== ÉTAT COMMENTAIRES (dynamique) ======
  const [comments, setComments] = useState<Record<number, CommentItem[]>>({});
  const [commentsOpen, setCommentsOpen] = useState<Record<number, boolean>>({});
  const [commentLoading, setCommentLoading] = useState<Record<number, boolean>>({});
  const [commentError, setCommentError] = useState<Record<number, string | null>>({});
  const [commentDrafts, setCommentDrafts] = useState<Record<number, string>>({});
  const [commentsDelta, setCommentsDelta] = useState<Record<number, number>>({});

  const loadComments = async (postId: number) => {
    if (comments[postId] !== undefined) return; // déjà chargé
    if (!commentsEndpoint) {
      // mock vide si pas d'endpoint
      setComments((s) => ({ ...s, [postId]: [] }));
      return;
    }
    setCommentLoading((s) => ({ ...s, [postId]: true }));
    setCommentError((s) => ({ ...s, [postId]: null }));
    try {
      const url = new URL(commentsEndpoint, window.location.origin);
      url.searchParams.set("postId", String(postId));
      const res = await fetch(url.toString(), { credentials: "include" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const items: CommentItem[] = Array.isArray(data) ? data : data.data || [];
      // tri récent -> ancien
      items.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
      setComments((s) => ({ ...s, [postId]: items }));
    } catch (e: any) {
      setCommentError((s) => ({ ...s, [postId]: e?.message || "Erreur de chargement des commentaires" }));
    } finally {
      setCommentLoading((s) => ({ ...s, [postId]: false }));
    }
  };

  const submitComment = async (postId: number) => {
    const text = (commentDrafts[postId] || "").trim();
    if (!text) return;

    const optimistic: CommentItem = {
      id: `tmp_${Date.now()}`,
      postId,
      author: "Vous",
      avatarUrl: undefined,
      content: text,
      createdAt: new Date().toISOString(),
    };

    // Optimistic UI
    setComments((s) => ({ ...s, [postId]: [optimistic, ...(s[postId] || [])] }));
    setCommentsDelta((d) => ({ ...d, [postId]: (d[postId] || 0) + 1 }));
    setCommentDrafts((d) => ({ ...d, [postId]: "" }));

    if (!commentsEndpoint) return; // local only

    try {
      const res = await fetch(commentsEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ postId, content: text }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const saved: CommentItem =
        (await res.json().catch(() => null))?.data || (await res.json().catch(() => null)) || optimistic;

      // Remplacer l'optimistic par la vraie version
      setComments((s) => ({
        ...s,
        [postId]: (s[postId] || []).map((c) => (String(c.id).startsWith("tmp_") ? saved : c)),
      }));
    } catch (e) {
      // rollback
      setComments((s) => ({
        ...s,
        [postId]: (s[postId] || []).filter((c) => !String(c.id).startsWith("tmp_")),
      }));
      setCommentsDelta((d) => ({ ...d, [postId]: Math.max(0, (d[postId] || 1) - 1) }));
      setCommentError((s) => ({ ...s, [postId]: "Échec de l’envoi du commentaire" }));
    }
  };

  // Fetch côté client (optionnel)
  const fetchPage = async (p: number, replace = false) => {
    if (!endpoint) return;
    setLoading(true);
    setErr(null);
    try {
      const url = new URL(endpoint, window.location.origin);
      url.searchParams.set("page", String(p));
      url.searchParams.set("pageSize", String(pageSize));
      const res = await fetch(url.toString(), { credentials: "include" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      // Supporte soit {data: Post[]} soit Post[]
      const items: RegularPost[] = Array.isArray(data) ? data : data.data || [];
      setRemotePosts((prev) => (replace ? items : [...prev, ...items]));
      setHasMore(items.length >= pageSize);
    } catch (e: any) {
      setErr(e?.message || "Erreur de chargement");
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Initialisation
  useEffect(() => {
    if (endpoint) {
      setPage(1);
      fetchPage(1, true);
    } else {
      dispatch(getPosts());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, dispatch, pageSize]);

  // Polling optionnel
  useEffect(() => {
    if (!endpoint || !pollInterval) return;
    const id = setInterval(() => fetchPage(1, true), pollInterval);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, pollInterval, pageSize]);

  const posts: RegularPost[] = useMemo(() => {
    const list = endpoint ? remotePosts : regularPosts;
    return [...list].sort(
      (a, b) =>
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
    );
  }, [endpoint, remotePosts, regularPosts]);

  const [likes, setLikes] = useState<Record<number, boolean>>({});
  const [saved, setSaved] = useState<Record<number, boolean>>({});

  const toggleLike = (id: number) =>
    setLikes((s) => ({ ...s, [id]: !s[id] }));
  const toggleSave = (id: number) =>
    setSaved((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div className="space-y-6">
      {/* Erreur */}
      {err && (
        <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 p-3 text-sm">
          {err}
        </div>
      )}

      {/* Skeletons */}
      {loading && posts.length === 0 && (
        <>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg ring-1 ring-black/5 p-6 animate-pulse space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="h-3 w-40 bg-gray-200 rounded" />
              </div>
              <div className="h-3 w-11/12 bg-gray-200 rounded" />
              <div className="h-40 bg-gray-100 rounded" />
            </div>
          ))}
        </>
      )}

      {/* Liste */}
      {posts &&
        posts.map((post: RegularPost) => {
          const open = !!commentsOpen[post.id];
          const postComments = comments[post.id] || [];
          const cLoading = !!commentLoading[post.id];
          const cError = commentError[post.id];
          const draft = commentDrafts[post.id] || "";
          const displayCommentsCount = post.commentsCount + (commentsDelta[post.id] || 0);

          return (
            <div
              key={post.id}
              className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl ring-1 ring-black/5 p-6 md:p-7 flex flex-col gap-3 transition-shadow duration-300 hover:shadow-2xl hover:ring-black/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  {post.authorAvatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.authorAvatarUrl}
                      alt={post.author}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserCircle className="w-10 h-10 text-gray-400" />
                  )}
                </div>
                <div>
                  <span className="font-semibold text-gray-900">
                    {post.author}
                  </span>
                  <div className="text-xs text-gray-500">
                    {timeAgo(post.creationDate)}
                  </div>
                </div>
                {post.isPinned && (
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                    Épinglé
                  </span>
                )}
                <button
                  className="ml-auto p-2 rounded-full hover:bg-gray-100 transition"
                  title={saved[post.id] ? "Retirer des favoris" : "Enregistrer"}
                  onClick={() => toggleSave(post.id)}
                >
                  <Bookmark
                    className={`w-5 h-5 ${
                      saved[post.id] ? "text-indigo-600" : "text-gray-500"
                    }`}
                    fill={saved[post.id] ? "currentColor" : "none"}
                  />
                </button>
              </div>

              <div className="text-gray-800 text-base whitespace-pre-wrap">
                {post.content}
              </div>

              {/* Image si disponible sinon placeholder plus discret */}
              {post.mediaUrl ? (
                <div className="rounded-lg overflow-hidden border border-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.mediaUrl}
                    alt="media"
                    className="w-full max-h-96 object-cover"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center mb-2">
                  <ImageIcon className="w-56 h-40 text-gray-200" />
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-6 mt-2 text-gray-500">
                <button
                  className="flex items-center gap-1 hover:text-gray-700"
                  onClick={() => toggleLike(post.id)}
                  aria-label="Aimer"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      likes[post.id] ? "text-rose-600 fill-rose-600" : ""
                    }`}
                  />
                  <span>
                    {post.likesCount + (likes[post.id] ? 1 : 0)}
                  </span>
                </button>

                <button
                  className="flex items-center gap-1 hover:text-gray-700"
                  onClick={async () => {
                    const next = !open;
                    setCommentsOpen((s) => ({ ...s, [post.id]: next }));
                    if (next) await loadComments(post.id);
                  }}
                  aria-label="Commentaires"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{displayCommentsCount}</span>
                </button>

                <div className="flex items-center gap-1">
                  <Share2 className="w-5 h-5" />
                  <span>{post.sharesCount}</span>
                </div>

                <div className="flex items-center gap-1 ml-auto">
                  <Eye className="w-5 h-5" />
                  <span>{post.viewCount}</span>
                </div>
              </div>

              {/* Modal commentaires */}
              {open && (
                <div className="fixed inset-0 z-50" aria-modal="true" role="dialog">
                  <div
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    onClick={() => setCommentsOpen((s) => ({ ...s, [post.id]: false }))}
                  />
                  <div className="relative z-10 mx-auto mt-12 md:mt-20 w-full max-w-2xl px-4">
                    <div className="relative bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 p-4 md:p-6">
                      <button
                        onClick={() => setCommentsOpen((s) => ({ ...s, [post.id]: false }))}
                        className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100"
                        aria-label="Fermer"
                      >
                        <X className="w-5 h-5 text-gray-700" />
                      </button>

                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Commentaires</h3>

                      {/* Champ d'ajout */}
                      <div className="flex items-end gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                          <UserCircle className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <div className="relative">
                            <textarea
                              rows={1}
                              value={draft}
                              onChange={(e) =>
                                setCommentDrafts((s) => ({ ...s, [post.id]: e.target.value }))
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  submitComment(post.id);
                                }
                              }}
                              placeholder="Écrire un commentaire…"
                              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 placeholder-black text-black"
                            />
                            <button
                              onClick={() => submitComment(post.id)}
                              className="absolute right-2 bottom-2 p-1.5 rounded-md bg-gray-900 text-white hover:bg-black transition"
                              aria-label="Envoyer"
                            >
                              <Send className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-[10px] text-gray-500 mt-1">
                            Entrée pour envoyer • Maj+Entrée pour nouvelle ligne
                          </div>
                        </div>
                      </div>

                      {/* Liste des commentaires */}
                      {cError && <div className="text-sm text-red-600 mb-2">{cError}</div>}
                      {cLoading && postComments.length === 0 && (
                        <div className="space-y-2 mb-2">
                          {[...Array(2)].map((_, i) => (
                            <div key={i} className="flex items-start gap-2 animate-pulse">
                              <div className="w-8 h-8 rounded-full bg-gray-200" />
                              <div className="flex-1 space-y-2">
                                <div className="h-3 w-40 bg-gray-200 rounded" />
                                <div className="h-3 w-3/4 bg-gray-200 rounded" />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
                        {postComments.map((c) => (
                          <div key={c.id} className="flex items-start gap-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                              {c.avatarUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={c.avatarUrl} alt={c.author} className="w-full h-full object-cover" />
                              ) : (
                                <UserCircle className="w-8 h-8 text-gray-400" />
                              )}
                            </div>
                            <div className="flex-1 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
                              <div className="text-xs text-gray-600">
                                <span className="font-medium text-gray-800">{c.author}</span>
                                <span className="ml-2 text-gray-400">{timeAgo(c.createdAt)}</span>
                              </div>
                              <div className="text-sm text-gray-800 whitespace-pre-wrap">{c.content}</div>
                            </div>
                          </div>
                        ))}
                        {postComments.length === 0 && !cLoading && !cError && (
                          <div className="text-xs text-gray-500">Aucun commentaire pour le moment.</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

      {/* Empty state */}
      {posts.length === 0 && !loading && (
        <div className="text-center text-gray-500">Aucun post à afficher.</div>
      )}

      {/* Pagination bouton Charger plus (endpoint) */}
      {endpoint && hasMore && !loading && (
        <div className="text-center">
          <button
            onClick={() => fetchPage(page + 1)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Charger plus
          </button>
        </div>
      )}
    </div>
  );
}