import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, UserCircle, Heart, MessageCircle, Share2, Eye, Image as ImageIcon } from "lucide-react";
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
            className="bg-white rounded-lg shadow p-6 flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <UserCircle className="w-10 h-10 text-gray-400" />
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
            {/* Icône image de post, plus grande */}
               <div className="text-gray-800 text-base">{fav.content}</div>
            <div className="flex items-center justify-center mb-4">
              <ImageIcon className="w-72 h-56 text-gray-200" />
            </div>
         
            <div className="flex items-center gap-6 mt-2 text-gray-500">
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