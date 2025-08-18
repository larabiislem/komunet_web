"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function GroupDetail() {
  const [activeTab, setActiveTab] = useState("posts");

  // Mock data
  const posts = [
    {
      id: 1,
      title: "Nouveautés en IA 2025",
      content: "Discussion autour des dernières avancées en Intelligence Artificielle...",
    },
    {
      id: 2,
      title: "React vs Next.js",
      content: "Quel framework utilisez-vous en production cette année ?",
    },
    {
      id: 3,
      title: "Nouveaux gadgets",
      content: "Partagez vos impressions sur les derniers casques VR.",
    },
  ];

  const events = [
  {
    id: 1,
    name: "Conférence Tech 2025",
    date: "20 Septembre 2025",
    description: "Rencontre avec des experts en cloud et IA.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Hackathon Web3",
    date: "5 Octobre 2025",
    description: "Un week-end entier pour créer des projets Web3 innovants.",
    image: "https://images.unsplash.com/photo-1638029202288-451a89e0d55f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Meetup développeurs",
    date: "15 Novembre 2025",
    description: "Un moment d'échange autour du développement web moderne.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
  },
];


  const members = [
    {
      id: 1,
      name: "Yasmine K.",
      role: "Admin",
      img: "https://randomuser.me/api/portraits/women/50.jpg",
    },
    {
      id: 2,
      name: "Amine B.",
      role: "Modérateur",
      img: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
      id: 3,
      name: "Lina T.",
      role: "Membre actif",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

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
        <ArrowLeft size={18} /> <span className="text-black">Retour</span>
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
          12,345 membres · Créé le 15 Janvier 2022
        </p>
      </div>

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
            {tab === "events" && "Événements"}
            {tab === "members" && "Membres"}
            {tab === "about" && "À propos"}
          </button>
        ))}
      </div>

      {/* Dynamic Content */}
      {activeTab === "posts" && (
        <div className="mb-8 text-black">
          <h2 className="text-sm font-semibold mb-4 text-black">Posts récents</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-semibold text-black">{post.title}</h3>
                <p className="text-sm text-black">{post.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "events" && (
  <div className="mb-8 text-black">
    <h2 className="text-sm font-semibold mb-4 text-black">Événements à venir</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
        >
          {/* Event image */}
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-32 object-cover"
          />

          {/* Event details */}
          <div className="p-4">
            <h3 className="font-semibold text-black mb-1">{event.name}</h3>
            <p className="text-xs text-black mb-2">{event.date}</p>
            <p className="text-sm text-black line-clamp-2">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


      {activeTab === "members" && (
  <div className="mb-8 text-black">
    <h2 className="text-sm font-semibold mb-4 text-black">Membres</h2>
    <div className="flex gap-3 flex-wrap">
      {members.map((member) => (
        <img
          key={member.id}
          src={member.img}
          alt={member.name}
          className="rounded-full w-12 h-12 object-cover border-2 border-white shadow-sm hover:scale-105 transition"
        />
      ))}
    </div>
  </div>
)}


      {activeTab === "about" && (
        <div className="mb-8 text-black">
          <h2 className="text-sm font-semibold mb-2 text-black">À propos</h2>
          <p className="text-sm text-black leading-relaxed">
            Tech Enthusiasts est une communauté dédiée aux passionnés de
            technologie. Ici, nous partageons des actualités, organisons des
            événements et échangeons autour des tendances du développement,
            gadgets et innovations numériques. Rejoignez-nous pour apprendre,
            collaborer et innover ensemble !
          </p>
        </div>
      )}

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
            img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1932&auto=format&fit=crop",
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
