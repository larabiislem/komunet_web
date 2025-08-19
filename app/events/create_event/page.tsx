'use client';

import React, { useState } from 'react';

export default function CreateEventPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [link, setLink] = useState('');
  const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0, 10)); // yyyy-mm-dd
  const [time, setTime] = useState<string>('18:00');
  const [duration, setDuration] = useState<string>('1:00'); // h:mm
  const [capacity, setCapacity] = useState<number | ''>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      Title: title,
      description,
      location,
      link,
      date,
      time,
      duration,
      capacity: capacity === '' ? null : Number(capacity),
      imageFile,
    };
    console.log('Soumis pour modération:', payload);
  };

  const inputBase =
    'w-full bg-[#F5F2F2] text-black placeholder-gray-500 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFBFBF]';

  return (
    <div className="min-h-screen px-4 md:px-8 py-10 md:py-14 flex items-start justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
            Créer un évènement
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Titre */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Titre de l’évènement
              </label>
              <input
                type="text"
                className={inputBase}
                placeholder="Ex: Atelier Innovation Digitale"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Description
              </label>
              <textarea
                className={`${inputBase} resize-y min-h-[110px]`}
                placeholder="Décrivez l’évènement…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Lieu / Lien */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Lieu (optionnel)
                </label>
                <input
                  type="text"
                  className={inputBase}
                  placeholder="Ex: Alger, Algérie"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Lien (optionnel)
                </label>
                <input
                  type="url"
                  className={inputBase}
                  placeholder="https://…"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
            </div>

            {/* Image de l’évènement */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Image de l’évènement
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setImageFile(file);
                  setImagePreview(file ? URL.createObjectURL(file) : null);
                }}
                className="block w-full bg-[#F5F2F2] text-black border border-gray-200 rounded-lg px-3 py-2 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-white file:text-black focus:outline-none focus:ring-2 focus:ring-[#FFBFBF]"
              />
              {imagePreview && (
                <div className="mt-3 w-full h-40 rounded-lg overflow-hidden border border-gray-200">
                  <img src={imagePreview} alt="Aperçu de l’évènement" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Date / Heure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className={inputBase}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Heure
                </label>
                <input
                  type="time"
                  className={inputBase}
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Durée / Capacité */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Durée
                </label>
                <input
                  type="text"
                  className={inputBase}
                  placeholder="Ex: 2:00 (h:mm)"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Capacité
                </label>
                <input
                  type="number"
                  className={inputBase}
                  placeholder="Ex: 50"
                  min={1}
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value === '' ? '' : Number(e.target.value))}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-[#FFBFBF] text-black font-semibold hover:bg-[#ff9f9f] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFBFBF]/60"
              >
                Soumettre pour modération
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

