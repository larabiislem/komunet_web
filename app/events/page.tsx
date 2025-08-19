'use client';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import EventsList from '@/composents/event';
import { useRouter } from 'next/navigation'; // ajout navigation

const filters = ['Mes événements', 'Abonnements', 'Événements', 'Participé'] as const;
type Filter = typeof filters[number];

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('Mes événements');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const router = useRouter(); // init router

  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Top bar responsive */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-black">Événements</h1>
          <button
            className="w-full sm:w-auto text-center px-4 py-2 rounded-lg bg-[#FFBFBF] text-black font-medium hover:opacity-90 transition"
            onClick={() => router.push('/events/create_event')}
          >
            créer un évenement
          </button>
        </div>

        {/* Filtres: scroll horizontal sur mobile */}
        <div className="w-full overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 mb-6">
          <div className="inline-flex items-center gap-2 md:gap-3 whitespace-nowrap">
            {filters.map((f) => {
              const isActive = activeFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition
                    ${isActive ? 'bg-black text-white' : 'bg-white text-black border border-gray-300 hover:bg-gray-50'}
                  `}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        {/* Calendriers: 1 colonne mobile, 2 colonnes >= md */}
        <div className="w-full flex flex-col items-center gap-6 sm:gap-8 mb-10">
          <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="flex flex-col items-center w-full">
              <span className="mb-2 text-sm font-medium text-black">Début</span>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                inline
                calendarClassName="dp-red"
              />
            </div>
            <div className="flex flex-col items-center w-full">
              <span className="mb-2 text-sm font-medium text-black">Fin</span>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                inline
                minDate={startDate ?? undefined}
                calendarClassName="dp-red"
              />
            </div>
          </div>
        </div>

        {/* Zone résultats */}
        <div className="w-full max-w-2xl sm:max-w-3xl mx-auto space-y-4">
          <div className="bg-white rounded-lg shadow p-4 text-black">
            <div className="text-sm text-gray-600 mb-1">
              Filtre: {activeFilter} {startDate && `• dès ${startDate.toLocaleDateString()}`} {endDate && `→ ${endDate?.toLocaleDateString()}`}
            </div>
          </div>

          {/* Liste des événements depuis Redux */}
          <EventsList />
        </div>
      </div>
    </div>
  );
}
