'use client';

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getevents } from "../app/events/eventslicer";

type EventItem = {
  id: number;
  Title: string; // d'après vos données
  description: string;
  imageUrl: string;
};

type RootState = any; // remplacez par le type de votre store si dispo

function EventCard({ title, description, imageUrl }: { title: string; description: string; imageUrl: string }) {
  return (
    <div className="w-full max-w-3xl bg-white rounded-lg shadow p-6 flex items-center justify-between gap-6">
      {/* Texte à gauche */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-black">{title}</h3>
        <p className="mt-2 text-sm text-gray-700">{description}</p>
      </div>
      {/* Image à droite */}
      <div className="w-40 h-28 md:w-56 md:h-36 flex-shrink-0">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover rounded-md" />
      </div>
    </div>
  );
}

export default function EventsList() {
  const dispatch = useDispatch();
  const events: EventItem[] = useSelector((state: RootState) => state.events?.value ?? []);

  useEffect(() => {
    dispatch(getevents());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-3xl space-y-6">
        {events.map((e) => (
          <EventCard key={e.id} title={e.Title} description={e.description} imageUrl={e.imageUrl} />
        ))}
      </div>
    </div>
  );
}