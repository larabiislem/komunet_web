"use client";

import React from "react";

const groups = [
  {
    title: "Passionnés d'ech",
    category: "Technologie",
    type: "Public",
    members: "150/200",
    image: "/images/group1.jpg",
  },
  {
    title: "Club de lecture",
    category: "Littérature",
    type: "Privé",
    members: "75/100",
    image: "/images/group2.jpg",
  },
  {
    title: "Aventures de randonnée",
    category: "En plein air",
    type: "Public",
    members: "200/300",
    image: "/images/group3.jpg",
  },
  {
    title: "Groupe de photographie",
    category: "Arts et culture",
    type: "Public",
    members: "100/150",
    image: "/images/group4.jpg",
  },
  {
    title: "Communauté de cuisine",
    category: "Nourriture et boissons",
    type: "Privé",
    members: "50/75",
    image: "/images/group5.jpg",
  },
];

export default function GroupsPage() {
  return (
    <div className="p-6 bg-[#FFF9F5] min-h-screen">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher des amis, des groupes, des pages"
          className="w-full md:w-[50%] border border-gray-300 rounded px-4 py-2 text-sm"
        />
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Trier par"
            className="border border-gray-300 rounded px-4 py-2 text-sm w-full"
          />
          <input
            type="text"
            placeholder="Thème"
            className="border border-gray-300 rounded px-4 py-2 text-sm w-full"
          />
        </div>
      </div>

      {/* Title */}
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Groupes publics</h1>
        <p className="text-sm text-gray-600">
          Explorez des groupes en fonction de vos intérêts ou créez les vôtres.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 text-sm font-medium">
        <button className="text-blue-600 underline">Tous les groupes</button>
        <button className="text-gray-500 hover:text-blue-600">Mes groupes</button>
      </div>

      {/* Group Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {groups.map((group, idx) => (
          <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-sm">
            <img src={group.image} alt={group.title} className="w-full h-32 object-cover" />
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-800">{group.title}</h3>
              <p className="text-xs text-gray-500">{group.category}</p>
              <p className="text-xs text-gray-500 mt-1">
                Type : <span className="font-medium">{group.type}</span>, Membres : {group.members}
              </p>
              <div className="flex gap-2 mt-3">
                <button className="bg-gray-100 text-sm px-3 py-1 rounded-full text-blue-600">Rejoindre</button>
                <button className="bg-gray-100 text-sm px-3 py-1 rounded-full text-gray-600">Voir</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Group Button */}
      <div className="text-center">
        <button className="bg-blue-600 text-white text-sm px-6 py-2 rounded-full hover:bg-blue-700 transition">
          Demander la Création du Groupe
        </button>
      </div>
    </div>
  );
}
