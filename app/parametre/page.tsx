"use client";

import React, { useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    subscriberActivity: false,
    mentions: false,
    directMessages: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="p-6 bg-[#FFF9F5] min-h-screen ml-[300px] mt-[70px]">
      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Paramètres</h1>

      {/* Preferences Tabs */}
      <div className="mb-6">
        <button className="bg-white text-sm px-4 py-2 rounded-full font-medium text-gray-700 shadow">
          Gérez vos préférences de notifications
        </button>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-sm divide-y">
        {[
          {
            key: "subscriberActivity",
            title: "Activité des abonnés",
            desc: 'Recevez des notifications pour les nouveaux abonnés, les mentions "J\'aime" et les commentaires.',
          },
          {
            key: "mentions",
            title: "Mentions",
            desc: "Soyez averti lorsque quelqu'un vous mentionne dans une publication ou un commentaire.",
          },
          {
            key: "directMessages",
            title: "Messages directs",
            desc: "Recevez des notifications pour les messages directs.",
          },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between p-4">
            <div>
              <h3 className="font-medium text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings[item.key as keyof typeof settings]}
                onChange={() => toggleSetting(item.key as keyof typeof settings)}
                title={`Activer ou désactiver ${item.title}`}
              />
              <div className="relative w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-300">
                <div className="absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
              </div>
            </label>
          </div>
        ))}
      </div>

      {/* Security Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 mt-6 space-y-4">
        <div>
          <a href="#" className="text-blue-600 hover:underline font-medium text-sm flex items-center gap-2">
            <ShieldIcon />
            Activer l’authentification à deux étapes
          </a>
          <p className="text-xs text-gray-500">Gérez la sécurité de votre compte</p>
        </div>

        <div>
          <a href="#" className="text-blue-600 hover:underline font-medium text-sm flex items-center gap-2">
            <FlagIcon />
            Signaler
          </a>
          <p className="text-xs text-gray-500">Gérez les signalements</p>
        </div>
      </div>
    </div>
  );
}

// Inline Icons
function ShieldIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M12 3l7 4v5c0 5.5-3.6 10.5-7 12-3.4-1.5-7-6.5-7-12V7l7-4z" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M4 4v16" />
      <path d="M4 4c5-2 10 2 15 0v10c-5 2-10-2-15 0" />
    </svg>
  );
}
