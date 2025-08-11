"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ThumbsUp, MessageSquare } from "lucide-react";

export default function DesignFeedPage() {
  const router = useRouter();

  const posts = [
    {
      id: 1,
      author: "Ethan Carter",
      time: "2j",
      profile: "https://randomuser.me/api/portraits/men/32.jpg",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794",
      text: "Je suis ravi de vous présenter mon dernier projet ! Je travaille sur une nouvelle application mobile pour un tracker d'activité. Découvrez les maquettes ci-jointes et donnez-moi votre avis ! #design #applicationmobile #fitness",
      likes: 23,
      comments: 2,
    },
    {
      id: 2,
      author: "Sophie Laurent",
      time: "1j",
      profile: "https://randomuser.me/api/portraits/women/44.jpg",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      text: "Voici un aperçu de mon nouveau projet mobile. J'aimerais beaucoup avoir vos retours sur l'interface et les couleurs choisies.",
      likes: 15,
      comments: 5,
    },
  ];

  return (
    <div className="ml-[300px] bg-[#FAF3EF] min-h-screen p-6 space-y-6 text-black">
      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher des amis, des groupes, des pages"
          className="w-full border rounded-full px-4 py-2 bg-white"
        />
      </div>

      {/* Page title */}
      <h1 className="text-xl font-semibold mb-4 text-black">Passionnés de design</h1>

      {/* Posts */}
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-lg shadow p-4 cursor-pointer"
          onClick={() => router.push(`/design/${post.id}`)}
        >
          {/* Author */}
          <div className="flex items-center gap-2 mb-3">
            <img
              src={post.profile}
              alt={post.author}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-medium text-black">{post.author}</span>
            <span className="text-black text-sm">{post.time}</span>
          </div>

          {/* Image */}
          <div className="mb-3">
            <img
              src={post.image}
              alt={post.text}
              width={800}
              height={400}
              className="rounded-lg w-full h-auto"
            />
          </div>

          {/* Text */}
          <p className="text-black mb-3">{post.text}</p>

          {/* Stats */}
          <div className="flex items-center gap-6 text-gray-500 text-sm">
            <div className="flex items-center gap-1">
              <ThumbsUp size={16} /> {post.likes}
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare size={16} /> {post.comments}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
