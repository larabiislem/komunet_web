'use client';

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getevents } from "../app/events/eventslicer";
import Link from "next/link";

type EventItem = {
  id: number;
  Title: string;
  description: string;
  imageUrl: string;
};

type RootState = any;

// Fallback image
const DEFAULT_EVENT_IMG = "/images/default-event.jpg";

function EventCard({
  title,
  description,
  imageUrl,
}: {
  title: string;
  description: string;
  imageUrl: string;
}) {
  const onErrorOnce = (img: HTMLImageElement) => {
    if ((img as any).dataset.fallbackApplied === "1") return;
    (img as any).dataset.fallbackApplied = "1";
    img.src = DEFAULT_EVENT_IMG;
  };

  return (
    <div className="w-full max-w-3xl bg-white rounded-lg shadow p-6 flex items-center justify-between gap-6">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-black">{title}</h3>
        <p className="mt-2 text-sm text-gray-700">{description}</p>
      </div>
      <div className="w-40 h-28 md:w-56 md:h-36 flex-shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl || DEFAULT_EVENT_IMG}
          alt={title}
          className="w-full h-full object-cover rounded-md"
          onError={(e) => onErrorOnce(e.currentTarget)}
        />
      </div>
    </div>
  );
}

type Props = {
  endpoint?: string;        // Optionnel: si fourni, on fetch via API (?page=&pageSize=&q=)
  pageSize?: number;        // Par défaut: 8
  enableSearch?: boolean;   // Afficher barre de recherche
};

export default function EventsList({ endpoint, pageSize = 8, enableSearch = true }: Props) {
  const dispatch = useDispatch();
  const reduxEvents: EventItem[] = useSelector(
    (state: RootState) => state.events?.value ?? []
  );

  // Local states pour mode API
  const [events, setEvents] = useState<EventItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [q, setQ] = useState("");

  const fetchPage = async (p: number, replace = false) => {
    if (!endpoint) return;
    setLoading(true);
    setErr(null);
    try {
      const url = new URL(endpoint, window.location.origin);
      url.searchParams.set("page", String(p));
      url.searchParams.set("pageSize", String(pageSize));
      if (q.trim()) url.searchParams.set("q", q.trim());
      const res = await fetch(url.toString(), { credentials: "include" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const items: EventItem[] = Array.isArray(data) ? data : data.data || [];
      setEvents((prev) => (replace ? items : [...prev, ...items]));
      setHasMore(items.length >= pageSize);
    } catch (e: any) {
      setErr(e?.message || "Erreur de chargement");
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    if (endpoint) {
      setPage(1);
      fetchPage(1, true);
    } else {
      dispatch(getevents());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, pageSize]);

  // Recherche (debounce simple)
  useEffect(() => {
    if (!endpoint) return;
    const id = setTimeout(() => {
      setPage(1);
      fetchPage(1, true);
    }, 300);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, endpoint, pageSize]);

  const list: EventItem[] = useMemo(() => {
    if (endpoint) return events;
    if (!q.trim()) return reduxEvents;
    const s = q.trim().toLowerCase();
    return reduxEvents.filter(
      (e: EventItem) =>
        e.Title?.toLowerCase().includes(s) ||
        e.description?.toLowerCase().includes(s)
    );
  }, [endpoint, events, reduxEvents, q]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-3xl space-y-6">
        {enableSearch && (
          <div className="bg-white rounded-lg shadow p-4">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher un événement..."
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 placeholder-black text-black"
            />
          </div>
        )}

        {err && (
          <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 p-3 text-sm">
            {err}
          </div>
        )}

        {loading && list.length === 0 && (
          <>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-full max-w-3xl bg-white rounded-lg shadow p-6 flex items-center justify-between gap-6 animate-pulse">
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-48 bg-gray-200 rounded" />
                  <div className="h-3 w-4/5 bg-gray-200 rounded" />
                </div>
                <div className="w-40 h-28 md:w-56 md:h-36 bg-gray-200 rounded-md" />
              </div>
            ))}
          </>
        )}

        {!loading && list.length === 0 && !err && (
          <div className="bg-white rounded-lg border border-gray-100 p-6 text-center text-sm text-gray-600">
            Aucun événement pour le moment.
          </div>
        )}

        {list.map((e) => (
          <Link
            key={e.id}
            href={`/events/${e.id}`}
            className="block cursor-pointer hover:shadow-lg transition-shadow rounded-lg"
            aria-label={`Voir le détail de ${e.Title}`}
          >
            <EventCard title={e.Title} description={e.description} imageUrl={e.imageUrl} />
          </Link>
        ))}

        {endpoint && hasMore && (
          <div className="flex justify-center">
            <button
              onClick={() => {
                const next = page + 1;
                setPage(next);
                fetchPage(next);
              }}
              disabled={loading}
              className="px-4 py-2 rounded-md bg-gray-900 text-white text-sm hover:bg-black transition disabled:opacity-50"
            >
              {loading ? "Chargement..." : "Charger plus"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}