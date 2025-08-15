// pages/moderateur.js
'use client'
import { useState, useEffect, useRef } from "react";

export default function ModerateurDashboard() {
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
      setFilterOpen(false);
      }
    }
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // Example list with all statuses
  const groupes = [
    {
      id: 1,
      titre: "Développement Durable & Écologie",
      createur: "Sophie Dubois",
      statut: "En attente",
      description:
        "Un espace pour discuter des initiatives écologiques, partager des astuces pour un mode de vie durable et organiser des actions locales."
    },
    {
      id: 2,
      titre: "Club de Lecture Mensuel",
      createur: "Lucas Martin",
      statut: "En attente",
      description:
        "Chaque mois, nous choisissons un livre à lire et nous nous retrouvons pour en discuter."
    },
    {
      id: 3,
      titre: "Photographes Amateurs",
      createur: "Amina Sadi",
      statut: "Validé",
      description:
        "Partagez vos meilleures photos, obtenez des retours constructifs et participez à nos défis photo mensuels."
    },
    {
      id: 4,
      titre: "Groupe de Cuisine",
      createur: "Pierre Leclerc",
      statut: "Rejeté",
      description:
        "Un espace pour partager vos recettes préférées et organiser des ateliers culinaires."
    },
    {
      id: 5,
      titre: "Randonnée & Nature",
      createur: "Camille Durand",
      statut: "Fermé",
      description:
        "Organisation de sorties en plein air, randonnées et découvertes de paysages locaux."
    }
  ];

  interface Groupe {
    id: number;
    titre: string;
    createur: string;
    statut: "En attente" | "Validé" | "Rejeté" | "Fermé";
    description: string;
  }

  type Statut = Groupe["statut"];

  const getStatusColor = (statut: Statut): string => {
    switch (statut) {
      case "En attente":
        return "text-yellow-800 bg-yellow-100";
      case "Validé":
        return "text-green-800 bg-green-100";
      case "Rejeté":
        return "text-red-800 bg-red-100";
      case "Fermé":
        return "text-gray-800 bg-gray-200";
      default:
        return "text-gray-800 bg-gray-100";
    }
  };

  return (
    <main className="flex-1 p-8 bg-[#fffaf9]" style={{ marginLeft: "360px" }}>
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Tableau de Bord Modérateur
          </h1>
          <p className="text-gray-600 mt-1">
            Gérer le statut des groupes thématiques
          </p>
        </header>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          {/* Tabs */}
          <div className="flex border-b mb-6">
            {["Tous", "En attente", "Validés", "Rejetés", "Fermés"].map((tab) => (
              <button
                key={tab}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-800 border-b-2 border-transparent hover:border-gray-800"
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Group Cards */}
          <div className="space-y-6">
            {groupes.map((groupe) => (
              <div key={groupe.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {groupe.titre}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Créé par: <span className="font-medium">{groupe.createur}</span>
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      groupe.statut as Statut
                    )}`}
                  >
                    {groupe.statut}
                  </span>
                </div>
                <p className="mt-4 text-gray-700">{groupe.description}</p>

                {/* Conditional buttons */}
                <div className="mt-4 flex space-x-2">
                  {groupe.statut === "En attente" && (
                    <>
                      <button className="bg-blue-400 px-4 py-2 text-sm font-medium rounded-lg text-white hover:bg-blue-500">
                        Valider
                      </button>
                      <button className="bg-blue-500 px-4 py-2 text-sm font-medium rounded-lg text-white hover:bg-blue-600">
                        Rejeter
                      </button>
                    </>
                  )}
                  {groupe.statut === "Validé" && (
                    <button className="bg-red-500 px-4 py-2 text-sm font-medium rounded-lg text-white hover:bg-red-600">
                      Fermer le groupe
                    </button>
                  )}
                  {/* For Fermé or Rejeté → no button */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
