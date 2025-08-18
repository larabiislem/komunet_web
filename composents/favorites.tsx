import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, Heart, MessageCircle, Share2, Eye, ImageIcon } from "lucide-react";
import { getFavorites } from "@/app/favorites/favortisslisers";

interface FavoritePost {
  id: number;
  content: string;
  creationDate: string;
  author: string;
  likesCount?: number;
  commentsCount?: number;
  sharesCount?: number;
  viewCount?: number;
  mediaUrl?: string;
  authorAvatarUrl?: string;
}

// Fallbacks
const DEFAULT_AVATAR = "/images/default-avatar.png";
const DEFAULT_MEDIA = "/images/default-media.jpg";

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

// Eviter la boucle onError
const onErrorOnce = (img: HTMLImageElement, fallback: string) => {
  if ((img as any).dataset?.fallbackApplied === "1") return;
  (img as any).dataset.fallbackApplied = "1";
  img.src = fallback;
};

export default function FavoritesList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch]);

  const favorites = useSelector((state: any) => state.favorites.value);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-2xl space-y-6">
        {favorites && favorites.map((fav: FavoritePost) => (
          <div
            key={fav.id}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl ring-1 ring-black/5 p-6 md:p-7 flex flex-col gap-3 transition-shadow duration-300 hover:shadow-2xl hover:ring-black/10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={fav.authorAvatarUrl || DEFAULT_AVATAR}
                  alt={fav.author}
                  className="w-full h-full object-cover"
                  onError={(e) => onErrorOnce(e.currentTarget, DEFAULT_AVATAR)}
                />
              </div>
              <div>
                <span className="font-semibold text-gray-900">{fav.author}</span>
                <div className="text-xs text-gray-500">{timeAgo(fav.creationDate)}</div>
              </div>
              <button
                className="ml-auto p-2 rounded-full hover:bg-red-100 transition"
                title="Supprimer des favoris"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>

            <div className="text-gray-800 text-base">{fav.content}</div>

            {/* Image du post (icône si pas d'image) */}
            {fav.mediaUrl ? (
              <div className="rounded-lg overflow-hidden border border-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={fav.mediaUrl}
                  alt="media"
                  className="w-full max-h-96 object-cover"
                  onError={(e) => onErrorOnce(e.currentTarget, DEFAULT_MEDIA)}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 py-12">
                <ImageIcon className="w-16 h-16 text-gray-300" />
              </div>
            )}

            <div className="flex items-center gap-6 mt-2 text-gray-600">
              <div className="flex items-center gap-1">
                <Heart className="w-5 h-5" />
                <span>{fav.likesCount ?? 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-5 h-5" />
                <span>{fav.commentsCount ?? 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <Share2 className="w-5 h-5" />
                <span>{fav.sharesCount ?? 0}</span>
              </div>
              <div className="flex items-center gap-1 ml-auto">
                <Eye className="w-5 h-5" />
                <span>{fav.viewCount ?? 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}