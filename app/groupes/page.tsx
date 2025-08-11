"use client";

import React, { useState } from "react";
import Link from "next/link";

const allGroups = [
  {
    id: 1,
    title: "Tech Innovators",
    category: "Technologie",
    type: "Public",
    members: "12,345",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
  },
  {
    id: 2,
    title: "Marketing Mavericks",
    category: "Business",
    type: "Public",
    members: "8,765",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  },
  {
    id: 3,
    title: "Creative Minds",
    category: "Design",
    type: "Public",
    members: "5,432",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  {
    id: 4,
    title: "Bookworms Unite",
    category: "Littérature",
    type: "Public",
    members: "15,678",
    image: "https://images.unsplash.com/photo-1519183071298-a2962be90b8e",
  },
  {
    id: 5,
    title: "Fitness Fanatics",
    category: "Sport",
    type: "Public",
    members: "10,987",
    image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488",
  },
  {
    id: 6,
    title: "Foodie Adventures",
    category: "Nourriture",
    type: "Public",
    members: "7,654",
    image: "https://images.unsplash.com/photo-1521302080377-44c0d6e88a68",
  },
];

const myGroups = [allGroups[0], allGroups[4], allGroups[5]];

export default function GroupsPage() {
  const [activeTab, setActiveTab] = useState("tous");
  const displayedGroups = activeTab === "tous" ? allGroups : myGroups;

  return (
    <div className="p-6 bg-[#FFF9F5] min-h-screen lg:ml-[360px] md:ml-[300px] sm:ml-0 lg:pr-10 md:pr-6 sm:pr-4">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher des amis, des groupes, des pages"
          className="w-full md:w-[50%] border border-gray-300 rounded px-4 py-2 text-sm"
        />
      </div>

      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-800 mb-1">Mes groupes</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 text-sm font-medium">
        <button
          onClick={() => setActiveTab("tous")}
          className={`pb-1 border-b-2 ${
            activeTab === "tous"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-blue-600"
          }`}
        >
          Tous les groupes
        </button>
        <button
          onClick={() => setActiveTab("mes")}
          className={`pb-1 border-b-2 ${
            activeTab === "mes"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-blue-600"
          }`}
        >
          Mes groupes
        </button>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {displayedGroups.map((group) => (
          <div
            key={group.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <img
              src={group.image}
              alt={group.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-800">
                {group.title}
              </h3>
              <p className="text-xs text-gray-500">{group.category}</p>
              <p className="text-xs text-gray-500 mt-1">
                Type : <span className="font-medium">{group.type}</span>, Membres :{" "}
                {group.members}
              </p>
              <div className="flex gap-2 mt-3">
                <Link href={`/groupes/${group.id}/join`}>
                  <button className="bg-gray-100 text-sm px-3 py-1 rounded-full text-blue-600">
                    Rejoindre
                  </button>
                </Link>
                <Link href={`/groupes/${group.id}`}>
                  <button className="bg-gray-100 text-sm px-3 py-1 rounded-full text-gray-600">
                    Voir
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Group Button */}
      <div className="text-center mt-6">
        <button className="bg-blue-600 text-white text-sm px-6 py-2 rounded-full hover:bg-blue-700 transition">
          Demander la Création du Groupe
        </button>
      </div>
    </div>
  );
}
