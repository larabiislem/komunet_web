'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function WaitingRoomPage() {
  const params = useSearchParams();

  // Optional: pass ?at=2025-12-31T18:00:00Z to set a specific target time
  const targetDate = useMemo(() => {
    const at = params?.get('at');
    const parsed = at ? new Date(at) : new Date(Date.now() + 15 * 60 * 1000); // default +15min
    return isNaN(parsed.getTime()) ? new Date(Date.now() + 15 * 60 * 1000) : parsed;
  }, [params]);

  const [timeLeft, setTimeLeft] = useState<number>(() => Math.max(0, targetDate.getTime() - Date.now()));

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(Math.max(0, targetDate.getTime() - Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const { hh, mm, ss } = useMemo(() => {
    const totalSec = Math.floor(timeLeft / 1000);
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return { hh: pad(hours), mm: pad(minutes), ss: pad(seconds) };
  }, [timeLeft]);

  return (
    <div className="min-h-screen md:ml-64 px-4 md:px-8 py-10 flex items-center justify-center">
      <div className="w-full max-w-3xl rounded-2xl border border-white/40 bg-white/60 backdrop-blur-md shadow-xl overflow-hidden">
        <div className="p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 text-center">Salle d’attente</h1>
          <p className="mt-2 text-center text-gray-700">
            Vous êtes sur la liste d’attente pour cet événement.
          </p>

          <div className="mt-6 rounded-xl overflow-hidden shadow">
            <img
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1600&auto=format&fit=crop"
              alt="Réunion d'équipe"
              className="w-full h-56 md:h-72 object-cover"
            />
          </div>

          <p className="mt-6 text-gray-800 leading-relaxed text-center">
            L’événement à venir est une conférence sur les nouvelles technologies et leur impact sur la société. Des experts de divers domaines partageront leurs connaissances et perspectives.
          </p>

          <div className="mt-8">
            <p className="text-center text-gray-600 mb-3">Début dans</p>
            <div className="flex items-center justify-center gap-3 md:gap-4">
              <TimeBox label="Heures" value={hh} />
              <span className="text-2xl md:text-3xl font-semibold text-gray-800">:</span>
              <TimeBox label="Minutes" value={mm} />
              <span className="text-2xl md:text-3xl font-semibold text-gray-800">:</span>
              <TimeBox label="Secondes" value={ss} />
            </div>
            {timeLeft === 0 && (
              <p className="mt-4 text-center text-emerald-700 font-medium">L’événement commence bientôt !</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TimeBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 md:w-24 h-14 md:h-16 bg-white text-black rounded-lg border border-gray-200 shadow flex items-center justify-center text-2xl md:text-3xl font-semibold">
        {value}
      </div>
      <span className="mt-1 text-xs md:text-sm text-gray-600">{label}</span>
    </div>
  );
}