"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ThumbsUp, MessageSquare } from "lucide-react";

export default function DesignThreadPage() {
  const router = useRouter();
  const { id } = useParams();

  const comments = [
    {
      author: "Jacob Harris",
      time: "2j",
      profile: "https://randomuser.me/api/portraits/men/12.jpg",
      text: "Excited to share my latest project! I've been working on a new mobile app design for a fitness tracker. Check out the attached mockups and let me know what you think!",
      likes: 12,
      comments: 3,
    },
    {
      author: "Isabella Clark",
      time: "1j",
      profile: "https://randomuser.me/api/portraits/women/33.jpg",
      text: "Hey everyone, I'm looking for feedback on a website redesign for a local coffee shop. Any thoughts on the color scheme and layout?",
      likes: 8,
      comments: 2,
    },
    {
      author: "Noah Turner",
      time: "1j",
      profile: "https://randomuser.me/api/portraits/men/45.jpg",
      text: "Just finished branding project for a tech startup. Here's a sneak peek of the logo and brand guidelines. What do you think?",
      likes: 20,
      comments: 7,
    },
    {
      author: "Sophia Miller",
      time: "1j",
      profile: "https://randomuser.me/api/portraits/women/19.jpg",
      text: "Great work everyone! I love seeing all the creative projects. Keep up the amazing work!",
      likes: 5,
      comments: 1,
    },
  ];

  return (
    <div className="ml-[300px] bg-[#FAF3EF] min-h-screen p-6 space-y-6">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="text-blue-500 underline text-sm"
      >
        ← Fermer le Thread
      </button>

      <h1 className="text-xl font-semibold">Passionnés de design</h1>

      {comments.map((c, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow p-4">
          {/* Author */}
          <div className="flex items-center gap-2 mb-2">
            <img
              src={c.profile}
              alt={c.author}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-medium text-black">{c.author}</span>
            <span className="text-black text-sm">{c.time}</span>
          </div>

          {/* Comment text */}
          <p className="text-black mb-3">{c.text}</p>

          {/* Stats */}
          <div className="flex items-center gap-6 text-gray-500 text-sm">
            <div className="flex items-center gap-1">
              <ThumbsUp size={16} /> {c.likes}
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare size={16} /> {c.comments}
            </div>
          </div>

          {/* Reply */}
          <input
            type="text"
            placeholder="Reply..."
            className="mt-3 w-full border rounded-full px-3 py-1 text-sm"
          />
        </div>
      ))}
    </div>
  );
}
