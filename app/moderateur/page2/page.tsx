"use client";

export default function ModeratorEventsPage() {
  const events = [
    {
      id: 1,
      title: "Conférence Tech : L’IA dans les affaires",
      description:
        "Rejoignez-nous pour une discussion instructive sur l’impact de l’IA dans les pratiques commerciales modernes. Apprenez des experts de l’industrie et réseautiez avec des professionnels.",
      image:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&q=80",
    },
    {
      id: 2,
      title: "Atelier de photographie en plein air",
      description:
        "Capturez la beauté de la nature avec notre atelier de photographie en plein air. Tous les niveaux sont les bienvenus, apportez votre appareil photo et votre créativité !",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&q=80",
    },
    {
      id: 3,
      title: "Club de lecture : « L’Observateur silencieux »",
      description:
        "Discutez du dernier best-seller, « L’Observateur silencieux », un roman à suspense palpitant. Partagez vos pensées et interprétations avec d’autres amateurs de livres.",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&q=80",
    },
  ];

  return (
    <div className="pl-[360px] pr-6 py-8 bg-[#fffaf9] min-h-screen">
      <h1 className="text-2xl font-semibold mb-2 text-black">Événements en attente</h1>
      <p className="text-black mb-6">Événements à modérer</p>

      <div className="space-y-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg border shadow-sm p-4 flex items-start gap-4"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-black">{event.title}</h3>
              <p className="text-sm text-gray-600  mb-4">{event.description}</p>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                  Valider
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-800 text-sm rounded-lg hover:bg-gray-300">
                  Refuser
                </button>
              </div>
            </div>
            <img
              src={event.image}
              alt={event.title}
              className="w-24 h-24 object-cover rounded-lg border"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
