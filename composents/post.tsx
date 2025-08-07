import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from '../app/home/postslicer';
import { UserCircle, Heart, MessageCircle, Share2, Eye, Image as ImageIcon } from "lucide-react";

interface RegularPost {
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
}

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

export default function RegularPosts() {
  const dispatch = useDispatch();
  const regularPosts = useSelector((state: any) => state.post.value.regular);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      {regularPosts && regularPosts.map((post: RegularPost) => (
        <div
          key={post.id}
          className="bg-white rounded-lg shadow p-6 flex flex-col gap-3"
        >
          <div className="flex items-center gap-3">
            <UserCircle className="w-10 h-10 text-gray-400" />
            <div>
              <span className="font-semibold text-gray-900">{post.author}</span>
              <div className="text-xs text-gray-500">{timeAgo(post.creationDate)}</div>
            </div>
            {post.isPinned && (
              <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">Épinglé</span>
            )}
          </div>
          {/* Icône image de post, plus grande */}
        
          <div className="text-gray-800 text-base">{post.content}</div>
            <div className="flex items-center justify-center mb-4">
            <ImageIcon className="w-72 h-56 text-gray-200" />
          </div>
          <div className="flex items-center gap-6 mt-2 text-gray-500">
            <div className="flex items-center gap-1">
              <Heart className="w-5 h-5" />
              <span>{post.likesCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-5 h-5" />
              <span>{post.commentsCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Share2 className="w-5 h-5" />
              <span>{post.sharesCount}</span>
            </div>
            <div className="flex items-center gap-1 ml-auto">
              <Eye className="w-5 h-5" />
              <span>{post.viewCount}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}