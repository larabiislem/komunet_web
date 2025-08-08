'use client';

import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { getevents } from '../eventslicer';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

type EventItem = {
  id: number;
  Title: string;
  description: string;
  date?: string;
  location?: string;
  imageUrl: string;
  link?: string;
  StatusEvenement?: string;
  TypeEvenement?: string;
};

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const eventId = Number(id);

  const dispatch = useDispatch();
  const events: EventItem[] = useSelector((state: any) => state.events?.value ?? []);

  useEffect(() => {
    dispatch(getevents());
  }, [dispatch]);

  const evt = useMemo(() => events.find((e) => e.id === eventId), [events, eventId]);

  if (!evt) {
    return (
      <div className="min-h-screen px-4 md:px-8 py-10">
        <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
          <p className="text-gray-700">Événement introuvable.</p>
        </div>
      </div>
    );
  }

  return (
    // Décale le contenu pour ne pas passer sous la sidebar (64 = 16rem). Ajuste selon la largeur réelle de ta sidebar.
    <div className="min-h-screen px-4 md:px-8 py-10 md:py-16 md:ml-64 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto rounded-2xl border border-white/40 bg-white/60 backdrop-blur-md shadow-xl overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
            {/* Infos */}
            <div className="md:col-span-3 space-y-4">
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">{evt.Title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                {evt.date && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 text-gray-800">
                    <Calendar className="w-4 h-4" />
                    {new Date(evt.date).toLocaleDateString()}
                  </span>
                )}
                {evt.location && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 text-gray-800">
                    <MapPin className="w-4 h-4" />
                    {evt.location}
                  </span>
                )}
                {evt.TypeEvenement && (
                  <span className="inline-flex px-3 py-1 rounded-full bg-indigo-50 text-indigo-700">{evt.TypeEvenement}</span>
                )}
                {evt.StatusEvenement && (
                  <span className="inline-flex px-3 py-1 rounded-full bg-emerald-50 text-emerald-700">{evt.StatusEvenement}</span>
                )}
              </div>
              <p className="text-gray-800 leading-relaxed">{evt.description}</p>

              {evt.link && (
                <a
                  href={evt.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                  Plus d'infos <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Image + bouton à droite */}
            <div className="md:col-span-2 flex flex-col items-end gap-4">
              <div className="w-full md:w-72 aspect-[4/3] rounded-xl overflow-hidden shadow-md">
                <img src={evt.imageUrl} alt={evt.Title} className="w-full h-full object-cover" />
              </div>
              <button
                className="w-full md:w-auto px-5 py-2.5 rounded-lg bg-[#FFBFBF] text-black font-semibold hover:bg-[#ff9f9f] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFBFBF]/60"
                onClick={() => {}}
              >
                Je participe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
