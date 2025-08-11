'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getpostevents } from './post_event_slicer';
import { getevents } from '../eventslicer';
import { PlayCircle, FileDown, ExternalLink } from 'lucide-react';
import { createSelector } from '@reduxjs/toolkit';

type RootState = any;

type EventItem = {
  id: number;
  Title: string;
  description: string;
  imageUrl: string;
  date?: string;
  location?: string;
  link?: string;
};

type PostEventResource = {
  id: number;
  eventId: number;
  urlVideo?: string;
  fileSupport?: string;
};

// Stable empty arrays (prevent new references)
const EMPTY_EVENTS: EventItem[] = [];
const EMPTY_RESOURCES: PostEventResource[] = [];

// Base selectors (use the correct slice keys)
const selectEvents = (s: RootState) => s.events?.value ?? EMPTY_EVENTS;
const selectPostEventResources = (s: RootState) => s.post_events?.value ?? EMPTY_RESOURCES;

// Memoized join
const selectJoined = createSelector(
  [selectEvents, selectPostEventResources],
  (events, resources) =>
    resources
      .map((r: PostEventResource) => ({ res: r, evt: events.find((e: EventItem) => e.id === r.eventId) }))
      .filter(
        (x: { res: PostEventResource; evt: EventItem | undefined }): x is { res: PostEventResource; evt: EventItem } => Boolean(x.evt)
      )
);

export default function PostEventsResourcesPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getevents());
    dispatch(getpostevents());
  }, [dispatch]);

  const joined = useSelector(selectJoined);

  return (
    <div className="min-h-screen px-4 md:px-8 py-8">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
          Ressources Post-Événement
        </h1>

        {joined.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-gray-700">
            Aucune ressource disponible pour le moment.
          </div>
        ) : (
          <div className="space-y-6">
            {joined.map(({ res, evt }: { res: PostEventResource; evt: EventItem }) => (
              <div
                key={res.id}
                className="bg-white rounded-lg shadow p-6 flex items-center justify-between gap-6"
              >
                {/* Texte + ressources à gauche */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-black">{evt.Title}</h3>
                  <p className="mt-2 text-sm text-gray-700">{evt.description}</p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    {res.urlVideo && (
                      <a
                        href={res.urlVideo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#FFBFBF] text-black text-sm font-medium hover:opacity-90 transition"
                      >
                        <PlayCircle className="w-4 h-4" />
                        Voir la vidéo
                        <ExternalLink className="w-4 h-4 opacity-70" />
                      </a>
                    )}
                    {res.fileSupport && (
                      <a
                        href={res.fileSupport}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#FFBFBF] text-black text-sm font-medium hover:opacity-90 transition"
                      >
                        <FileDown className="w-4 h-4" />
                        Télécharger le support
                        <ExternalLink className="w-4 h-4 opacity-70" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Image à droite */}
                <div className="w-40 h-28 md:w-56 md:h-36 flex-shrink-0 rounded-md overflow-hidden">
                  <img
                    src={evt.imageUrl}
                    alt={evt.Title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

