"use client";
import img from "next/image";

export default function ModeratorDashboard() {
  const posts = [
    {
      id: 1,
      groupName: "Nom du groupe",
      title: "Titre de la publication",
      author: {
        name: "Sophie Dubois",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      },
      content:
        "Je suis vraiment enthousiaste à propos de cette nouvelle initiative ! C'est formidable de voir notre communauté grandir et attirer de nouveaux défis. J'ai hâte de contribuer et de faire une réelle différence ensemble.",
      reply: {
        name: "Lucas Marin",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        content:
          "Je suis d'accord, Sophie ! C'est une opportunité fantastique pour nous de collaborer et de réaliser quelque chose de significatif. Profitons-en au maximum !",
      },
    },
    {
      id: 2,
      groupName: "Nom du groupe",
      title: "Titre de la publication",
      author: {
        name: "Sophie Dubois",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      content:
        "Je suis vraiment enthousiaste à propos de cette nouvelle initiative ! C'est formidable de voir notre communauté grandir et attirer de nouveaux défis. J'ai hâte de contribuer et de faire une réelle différence ensemble.",
      reply: {
        name: "Modérateur",
        avatar: "https://randomuser.me/api/portraits/men/78.jpg",
        content:
          "Je suis d'accord, Sophie ! C'est une opportunité fantastique pour nous de collaborer et de réaliser quelque chose de significatif. Profitons-en au maximum !",
      },
    },
  ];

  return (
    <div className="ml-[360px] p-6 bg-[#FFF8F5] min-h-screen">
      {/* Tabs */}
     

      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-1 text-black">Tableau de Bord Modérateur</h1>
      <p className="text-gray-600 mb-6">
        Examiner les publications signalées et gérer la modération du contenu
      </p>

      {/* Tabs for content status */}
      <div className="flex gap-4 mb-8">
        <button className="px-4 py-2 border-b-2 border-black font-semibold text-black">
           En attente (2)
        </button>
        <button className="px-4 py-2 text-gray-500"> Examinées (0)</button>
      </div>

      {/* Posts List */}
      {posts.map((post) => (
        <div key={post.id} className="bg-[#FFF1EC] rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-500 mb-1">
            {post.groupName} /{" "}
            <span className="font-medium">{post.title}</span>
          </p>

          {/* Main Post */}
          <div className="flex items-start gap-3 mb-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="font-semibold">{post.author.name}</p>
              <p className="text-gray-700 text-sm">{post.content}</p>
            </div>
          </div>

          {/* Reply */}
          <div className="flex items-start gap-3 mb-3 ml-10 relative">
            <img
              src={post.reply.avatar}
              alt={post.reply.name}
              width={35}
              height={35}
              className="rounded-full"
            />
            <div>
              <p className="font-semibold">{post.reply.name}</p>
              <p className="text-gray-700 text-sm">{post.reply.content}</p>
            </div>
            {/* Signal badge */}
            <span className="absolute right-0 top-0 bg-red-500 text-white px-3 py-1 text-xs rounded-full">
              signalé
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 ml-10">
            <button className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-1 rounded">
              Approuver
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 px-4 py-1 rounded">
              Rejeter
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
