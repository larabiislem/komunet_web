'use client';

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from '../app/home/postslicer';
import { Megaphone } from "lucide-react";

interface Announcement {
  id: number;
  title?: string;
  content: string;
  postType: string;
  creationDate: string;
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

export default function AnnouncementsList() {
  const dispatch = useDispatch();
  const announcements = useSelector((state: any) => state.post.value.announcement);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
   <div className="max-h-96 overflow-y-auto space-y-4 p-2 bg-transparent rounded-lg ">
      {announcements && announcements.map((item: Announcement) => (
        <div
          key={item.id}
          className="flex items-center gap-3 p-4 rounded-lg"
          style={{ background: "#EFF6FF" }}
        >
          <Megaphone className="w-6 h-6 text-black flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-black">{item.title ?? "Annonce"}</h3>
            <p className="text-black">{item.content}</p>
            <span className="text-xs text-gray-700">{timeAgo(item.creationDate)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
