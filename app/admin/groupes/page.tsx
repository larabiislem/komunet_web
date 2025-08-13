'use client';

import React, { useState, useMemo } from 'react';
import { Trash2, Eye, EyeOff, Upload } from 'lucide-react';

type Group = {
  id: number;
  nom: string;
  theme: string;
  description: string;
  imageUrl?: string;
  visibilite: 'public' | 'prive';
  capacite?: number | null;
  active: boolean;
  createdAt: string;
};

export default function AdminGroupesPage() {
  // Form state
  const [nom, setNom] = useState('');
  const [theme, setTheme] = useState('');
  const [description, setDescription] = useState('');
  const [visibilite, setVisibilite] = useState<'public' | 'prive'>('public');
  const [capacite, setCapacite] = useState<number | ''>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const now = Date.now();
  const iso = (ms: number) => new Date(ms).toISOString();

  const [groupes, setGroupes] = useState<Group[]>(() => [
    {
      id: 1,
      nom: 'Developpeurs Frontend',
      theme: 'Web UI',
      description: 'Discussions autour de React, Tailwind, UX.',
      imageUrl: 'https://picsum.photos/400/240?random=11',
      visibilite: 'public',
      capacite: 120,
      active: true,
      createdAt: iso(now - 1000 * 60 * 60 * 5),
    },
    {
      id: 2,
      nom: 'Sécurité Applicative',
      theme: 'Cybersécurité',
      description: 'Partage de vulnérabilités, bonnes pratiques.',
      imageUrl: 'https://picsum.photos/400/240?random=12',
      visibilite: 'prive',
      capacite: 40,
      active: true,
      createdAt: iso(now - 1000 * 60 * 60 * 12),
    },
    {
      id: 3,
      nom: 'IA & ML',
      theme: 'Data / AI',
      description: 'Modèles, MLOps, nouveautés IA générative.',
      imageUrl: 'https://picsum.photos/400/240?random=13',
      visibilite: 'public',
      capacite: 300,
      active: true,
      createdAt: iso(now - 1000 * 60 * 60 * 24),
    },
    {
      id: 4,
      nom: 'Design Systems',
      theme: 'UI System',
      description: 'Tokens, librairies partagées, accessibilité.',
      imageUrl: 'https://picsum.photos/400/240?random=14',
      visibilite: 'public',
      capacite: 80,
      active: true,
      createdAt: iso(now - 1000 * 60 * 60 * 30),
    },
    {
      id: 5,
      nom: 'Backend Performant',
      theme: 'Architecture',
      description: 'Scalabilité, microservices, observabilité.',
      imageUrl: 'https://picsum.photos/400/240?random=15',
      visibilite: 'prive',
      capacite: 60,
      active: true,
      createdAt: iso(now - 1000 * 60 * 60 * 40),
    },
  ]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim() || !theme.trim() || !description.trim()) return;
    const newGroup: Group = {
      id: Date.now(),
      nom: nom.trim(),
      theme: theme.trim(),
      description: description.trim(),
      imageUrl: imagePreview || undefined,
      visibilite,
      capacite: capacite === '' ? null : Number(capacite),
      active: true,
      createdAt: new Date().toISOString(),
    };
    setGroupes(g => [newGroup, ...g]);
    setNom('');
    setTheme('');
    setDescription('');
    setVisibilite('public');
    setCapacite('');
    setImageFile(null);
    setImagePreview(null);
  };

  const toggleActive = (id: number) =>
    setGroupes(g => g.map(gr => (gr.id === id ? { ...gr, active: !gr.active } : gr)));

  const deleteOne = (id: number) =>
    setGroupes(g => g.filter(gr => gr.id !== id));

  const visibleGroupes = useMemo(
    () =>
      groupes
        .filter(g => g.active)
        .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)),
    [groupes]
  );

  const maxDisplayed = 8;
  const displayed = visibleGroupes.slice(0, maxDisplayed);
  const remaining = visibleGroupes.length - displayed.length;

  const input =
    'w-full bg-[#F5F2F2] border border-gray-200 rounded-lg px-3 py-2 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFBFBF]';

  return (
    <div className="min-h-screen px-4 md:px-10 py-10 md:ml-64">
      {/* Aligné sur la même largeur que la page annonces (max-w-5xl) */}
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Tableau de bord administrateur – Groupes
          </h1>
          <div className="flex gap-3">
            <a
              href="/admin/annnonces"
              className="px-4 py-2 rounded-lg bg-white text-black border border-gray-300 text-sm font-medium hover:bg-gray-50 transition"
            >
              Annonces
            </a>
            <button className="px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition">
              Groupes
            </button>
          </div>
        </div>

        {/* Formulaire création groupe */}
        <div className="bg-white rounded-xl shadow border border-gray-100 p-6 md:p-7">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Nouveau groupe</h2>
          <form onSubmit={handleCreate} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Nom</label>
                <input
                  className={input}
                  placeholder="Ex: Communauté React"
                  value={nom}
                  onChange={e => setNom(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Thème</label>
                <input
                  className={input}
                  placeholder="Ex: Frontend"
                  value={theme}
                  onChange={e => setTheme(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Description</label>
              <textarea
                className={`${input} min-h-[110px] resize-y`}
                placeholder="Décrivez le groupe..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Visibilité
                </label>
                <select
                  className={input}
                  value={visibilite}
                  onChange={e =>
                    setVisibilite(e.target.value === 'prive' ? 'prive' : 'public')
                  }
                >
                  <option value="public">Public</option>
                  <option value="prive">Privé</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Capacité (optionnel)
                </label>
                <input
                  type="number"
                  min={1}
                  className={input}
                  placeholder="Ex: 150"
                  value={capacite}
                  onChange={e =>
                    setCapacite(e.target.value === '' ? '' : Number(e.target.value))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Image (optionnel)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const f = e.target.files?.[0] || null;
                    setImageFile(f);
                    setImagePreview(f ? URL.createObjectURL(f) : null);
                  }}
                  className="block w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-white file:text-black cursor-pointer"
                />
              </div>
            </div>

            {imagePreview && (
              <div className="mt-2 w-full md:w-72 aspect-[4/3] rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <img
                  src={imagePreview}
                  alt="Prévisualisation"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-[#FFBFBF] text-black font-semibold hover:bg-[#ff9f9f] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFBFBF]/60"
              >
                Créer le groupe
              </button>
            </div>
          </form>
        </div>

        {/* Liste groupes actifs */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Groupes actifs (affichés: {displayed.length}
            {visibleGroupes.length > 0 ? ` / ${visibleGroupes.length}` : ''})
          </h2>
          {displayed.length === 0 && (
            <div className="bg-white rounded-lg border border-gray-100 p-6 text-gray-600">
              Aucun groupe actif.
            </div>
          )}
          <div className="space-y-5">
            {displayed.map(g => (
              <div
                key={g.id}
                className="bg-white rounded-lg shadow border border-gray-100 p-5 flex flex-col md:flex-row gap-5"
              >
                <div className="flex gap-4 w-full">
                  {g.imageUrl && (
                    <div className="w-32 h-24 flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
                      <img
                        src={g.imageUrl}
                        alt={g.nom}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold text-gray-900">
                        {g.nom}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                        {g.theme}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          g.visibilite === 'public'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-indigo-50 text-indigo-700'
                        }`}
                      >
                        {g.visibilite === 'public' ? 'Public' : 'Privé'}
                      </span>
                      {g.capacite && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-700">
                          Capacité: {g.capacite}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mt-1 line-clamp-3">
                      {g.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Créé le {new Date(g.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:self-start">
                  {/* Toggle active */}
                  <label className="inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={g.active}
                      onChange={() => toggleActive(g.id)}
                    />
                    <span
                      className={`w-11 h-6 rounded-full transition ${
                        g.active ? 'bg-green-500' : 'bg-gray-300'
                      } flex items-center px-1`}
                    >
                      <span
                        className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
                          g.active ? 'translate-x-5' : ''
                        }`}
                      />
                    </span>
                  </label>

                  {/* Visibilité rapide */}
                  <button
                    onClick={() =>
                      setGroupes(list =>
                        list.map(x =>
                          x.id === g.id
                            ? {
                                ...x,
                                visibilite: x.visibilite === 'public' ? 'prive' : 'public',
                              }
                            : x
                        )
                      )
                    }
                    className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                    title="Changer visibilité"
                  >
                    {g.visibilite === 'public' ? (
                      <Eye className="w-5 h-5" />
                    ) : (
                      <EyeOff className="w-5 h-5" />
                    )}
                  </button>

                  {/* Supprimer */}
                  <button
                    onClick={() => deleteOne(g.id)}
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
                {remaining} autre{remaining > 1 ? 's' : ''} groupe
                {remaining > 1 ? 's' : ''} actif{remaining > 1 ? 's' : ''} masqué{remaining > 1 ? 's' : ''}.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}