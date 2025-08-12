"use client";

import { useState } from "react";

export default function ModeratorPostsPage() {
  const [tab, setTab] = useState<"pending" | "reviewed">("pending");

  const posts = [
    {
      id: 1,
      name: "John Doe",
      username: "@johndoe",
      content:
        "This is a controversial post that has been reported by multiple users for inappropriate content.",
      type: "Contenu inapproprié",
      typeColor: "bg-red-100 text-red-600",
      reports: 5,
      time: "il y a 2 heures",
    },
    {
      id: 2,
      name: "Jane Smith",
      username: "@janesmith",
      content:
        "Another post that needs moderation review due to spam reports.",
      type: "Spam",
      typeColor: "bg-pink-100 text-pink-600",
      reports: 3,
      time: "il y a 4 heures",
    },
  ];

  return (
    <div className="pl-[360px] pr-6 py-8 bg-[#fffaf9] min-h-screen">
      <h1 className="text-2xl font-semibold mb-2 text-black">Tableau de Bord Modérateur</h1>
      <p className="text-black mb-6">
        Examiner les publications signalées et gérer la modération du contenu
      </p>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setTab("pending")}
          className={`px-4 py-2 rounded-lg font-medium ${
            tab === "pending"
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          En Attente (2)
        </button>
        <button
          onClick={() => setTab("reviewed")}
          className={`px-4 py-2 rounded-lg font-medium ${
            tab === "reviewed"
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Examinés (0)
        </button>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white border rounded-lg p-4 shadow-sm flex flex-col gap-2"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{post.name}</h3>
                <p className="text-sm text-gray-500">{post.username}</p>
              </div>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${post.typeColor}`}
              >
                {post.type}
              </span>
            </div>
            <p className="text-black text-sm">{post.content}</p>
            <p className="text-xs text-gray-500">
              Signalé par {post.reports} utilisateurs • {post.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
