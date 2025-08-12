'use client';

import React, { useState, useMemo } from 'react';
import { Trash2 } from 'lucide-react';
import Link from 'next/link'; // <-- ajouté

type Announcement = {
  id: number;
  titre: string;
  contenu: string;
  createdAt: string;
  expiration: string;
  active: boolean;
};

export default function AdminDashboardPage() {
  // Form state
  const [titre, setTitre] = useState('');
  const [contenu, setContenu] = useState('');
  const [expiration, setExpiration] = useState('');

  // Données initiales (exemple) pour remplir la liste
  const [annonces, setAnnonces] = useState<Announcement[]>(() => {
    const now = Date.now();
    const iso = (ms: number) => new Date(ms).toISOString();
    return [
      {
        id: 1,
        titre: 'Maintenance serveur',
        contenu: 'Maintenance planifiée cette nuit entre 01h et 02h.',
        createdAt: iso(now - 1000 * 60 * 60 * 2),
        expiration: iso(now + 1000 * 60 * 60 * 24),
        active: true,
      },
      {
        id: 2,
        titre: 'Nouvelle fonctionnalité',
        contenu: 'Lancement du module de statistiques avancées.',
        createdAt: iso(now - 1000 * 60 * 60 * 5),
        expiration: iso(now + 1000 * 60 * 60 * 48),
        active: true,
      },
      {
        id: 3,
        titre: 'Webinaire',
        contenu: 'Rejoignez notre webinaire vendredi à 15h.',
        createdAt: iso(now - 1000 * 60 * 60 * 10),
        expiration: iso(now + 1000 * 60 * 60 * 72),
        active: true,
      },
      {
        id: 4,
        titre: 'Nouvelle charte',
        contenu: 'Mise à jour de la charte d’utilisation disponible.',
        createdAt: iso(now - 1000 * 60 * 60 * 15),
        expiration: iso(now + 1000 * 60 * 60 * 24 * 5),
        active: true,
      },
      {
        id: 5,
        titre: 'Formations',
        contenu: 'Ouverture des inscriptions aux formations internes.',
        createdAt: iso(now - 1000 * 60 * 60 * 20),
        expiration: iso(now + 1000 * 60 * 60 * 24 * 2),
        active: true,
      },
      {
        id: 6,
        titre: 'Info interne',
        contenu: 'Réunion générale lundi prochain.',
        createdAt: iso(now - 1000 * 60 * 60 * 30),
        expiration: iso(now + 1000 * 60 * 60 * 24 * 3),
        active: true,
      },
    ];
  });

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titre.trim() || !contenu.trim() || !expiration) return;
    setAnnonces(a => [
      {
        id: Date.now(),
        titre: titre.trim(),
        contenu: contenu.trim(),
        createdAt: new Date().toISOString(),
        expiration,
        active: true,
      },
      ...a,
    ]);
    setTitre('');
    setContenu('');
    setExpiration('');
  };

  const toggleActive = (id: number) => {
    setAnnonces(a => a.map(an => (an.id === id ? { ...an, active: !an.active } : an)));
  };

  const deleteOne = (id: number) => {
    setAnnonces(a => a.filter(an => an.id !== id));
  };

  // Active triées récentes -> limité à 5
  const activeAnnonces = useMemo(
    () =>
      annonces
        .filter(a => a.active)
        .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
        .slice(0, 5),
    [annonces]
  );

  const totalActive = annonces.filter(a => a.active).length;
  const remaining = totalActive - activeAnnonces.length;

  return (
    <div className="min-h-screen px-4 md:px-10 py-10 md:ml-64">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* En-tête */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Tableau de bord administrateur
            </h1>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition">
                Annonces
              </button>
              <Link
                href="/admin/groupes"
                className="px-4 py-2 rounded-lg bg-white text-black border border-gray-300 text-sm font-medium hover:bg-gray-50 transition"
              >
                Groupes
              </Link>
            </div>
          </div>
        </div>

        {/* Formulaire création */}
        <div className="bg-white rounded-xl shadow border border-gray-100 p-6 md:p-7">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Nouvelle annonce
          </h2>
          <form onSubmit={handlePublish} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Titre
              </label>
              <input
                type="text"
                className="w-full bg-[#F5F2F2] border border-gray-200 rounded-lg px-3 py-2 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFBFBF]"
                placeholder="Ex: Maintenance programmée"
                value={titre}
                onChange={e => setTitre(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Contenu
              </label>
              <textarea
                className="w-full bg-[#F5F2F2] border border-gray-200 rounded-lg px-3 py-2 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFBFBF] min-h-[120px] resize-y"
                placeholder="Détails de l’annonce…"
                value={contenu}
                onChange={e => setContenu(e.target.value)}
                required
              />
            </div>
            <div className="max-w-xs">
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Date d’expiration
              </label>
              <input
                type="date"
                className="w-full bg-[#F5F2F2] border border-gray-200 rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#FFBFBF]"
                value={expiration}
                onChange={e => setExpiration(e.target.value)}
                required
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-[#FFBFBF] text-black font-semibold hover:bg-[#ff9f9f] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFBFBF]/60"
              >
                Publier
              </button>
            </div>
          </form>
        </div>

        {/* Liste des annonces actives (max 5) */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Annonces actives (affichées: {activeAnnonces.length}
            {totalActive > 0 ? ` / ${totalActive}` : ''})
          </h2>
          {activeAnnonces.length === 0 && (
            <div className="bg-white rounded-lg border border-gray-100 p-6 text-gray-600">
              Aucune annonce active.
            </div>
          )}
          {activeAnnonces.map(a => (
            <div
              key={a.id}
              className="bg-white rounded-lg shadow border border-gray-100 p-5 flex flex-col md:flex-row md:items-center gap-4"
            >
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900">{a.titre}</h3>
                <p className="text-sm text-gray-700 mt-1 line-clamp-3">{a.contenu}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Créée le {new Date(a.createdAt).toLocaleDateString()} • Expire le{' '}
                  {new Date(a.expiration).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={a.active}
                    onChange={() => toggleActive(a.id)}
                  />
                  <span
                    className={`w-11 h-6 rounded-full transition ${
                      a.active ? 'bg-green-500' : 'bg-gray-300'
                    } flex items-center px-1`}
                  >
                    <span
                      className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
                        a.active ? 'translate-x-5' : ''
                      }`}
                    />
                  </span>
                </label>
                <button
                  onClick={() => deleteOne(a.id)}
                  className="p-2 rounded-md hover:bg-red-50 text-red-600 transition"
                  aria-label="Supprimer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {remaining > 0 && (
            <p className="text-xs text-gray-500">
              {remaining} autre{remaining > 1 ? 's' : ''} annonce
              {remaining > 1 ? 's' : ''} active{remaining > 1 ? 's' : ''} masquée{remaining > 1 ? 's' : ''}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}