"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function GroupDetail() {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="p-6 bg-[#FFF9F5] min-h-screen lg:ml-[360px]">
      {/* Back */}
      <Link href="/groups" className="flex items-center gap-2 text-black mb-6">
        <ArrowLeft size={18} /> Retour
      </Link>

      {/* Tabs */}
      <div className="flex justify-center gap-6 border-b mb-6 text-sm font-medium">
        {["posts", "events", "members", "about"].map((tab) => (
          <button
            key={tab}
            className={`pb-2 ${
              activeTab === tab
                ? "text-black border-b-2 border-black"
                : "text-black hover:text-blue-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "posts" && "Posts"}
            {tab === "events" && "Evénements"}
            {tab === "members" && "Membres"}
            {tab === "about" && "À propos"}
          </button>
        ))}
      </div>

      {/* Dynamic content */}
      {activeTab === "posts" && <div>Liste des posts du groupe...</div>}
      {activeTab === "events" && <div>Liste des événements du groupe...</div>}
      {activeTab === "members" && <div>Liste des membres du groupe...</div>}
      {activeTab === "about" && <div>Description du groupe...</div>}
    </div>
  );
}
