"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function GroupDetail() {
  return (
    <div
      className="
        p-6 bg-[#FFF9F5] min-h-screen
        lg:ml-[360px] md:ml-[300px] sm:ml-0
        lg:pr-10 md:pr-6 sm:pr-4
      "
    >
      {/* Back */}
      <Link href="/groups" className="flex items-center gap-2 text-black mb-6">
        <ArrowLeft size={18} /> Retour
      </Link>

      {/* Group Header */}
      <div className="flex flex-col items-center mb-6">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
          alt="Group Logo"
          className="rounded-full w-20 h-20 mb-3 object-cover"
        />
        <h1 className="text-lg font-semibold text-black">Tech Enthusiasts</h1>
        <p className="text-sm text-black">
          12,345 members · Created on Jan 15, 2022
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-6 border-b mb-6 text-sm font-medium">
        <button className="text-black border-b-2 border-black pb-2">
          Posts
        </button>
        <button className="text-black hover:text-blue-600">Evénements</button>
        <button className="text-black hover:text-blue-600">Membres</button>
        <button className="text-black hover:text-blue-600">À propos</button>
      </div>

      {/* Moderators */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold mb-2 text-black">Moderators</h2>
        <div className="flex gap-2">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            className="rounded-full w-10 h-10 object-cover"
            alt="Moderator 1"
          />
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            className="rounded-full w-10 h-10 object-cover"
            alt="Moderator 2"
          />
          <img
            src="https://randomuser.me/api/portraits/men/65.jpg"
            className="rounded-full w-10 h-10 object-cover"
            alt="Moderator 3"
          />
        </div>
        <p className="text-sm text-black mt-2">
          A community for tech lovers to discuss the latest trends, gadgets, and
          innovations.
        </p>
      </div>

      {/* Similar Groups */}
      <h2 className="text-sm font-semibold mb-3 text-black">Similar Groups</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            name: "AI Innovators",
            img: "https://images.unsplash.com/photo-1581094794329-c8112a89e2be",
          },
          {
            name: "Frontend Masters",
            img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
          },
          {
            name: "Gadget Lovers",
            img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
          },
        ].map((group, i) => (
          <div
            key={i}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <div className="h-24">
              <img
                src={group.img}
                alt={group.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold text-black">{group.name}</p>
              <p className="text-xs text-black">Short description here</p>
              <button className="bg-gray-100 text-sm px-3 py-1 rounded-full text-blue-600 mt-2">
                Rejoindre
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
