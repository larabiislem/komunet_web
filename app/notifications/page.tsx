"use client";

import { useForm } from "react-hook-form";

const notificationOptions = [
  "Mentions",
  "Commentaires",
  "Partages",
  "Réactions",
  "Messages",
  "Demandes de connexion",
  "Approbations de connexion",
  "Recommandations",
  "Publications de groupe",
  "Invitations à des événements",
];

export default function NotificationPreferencesPage() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const onSubmit = (data: unknown) => {
    console.log("Preferences saved:", data);
  };

  return (
    <main className="ml-64 p-10 bg-[#fef6f1] min-h-screen">
      <div className="max-w-xl ml-20">
        <h1 className="text-2xl font-bold text-black mb-2">
          Préférences de notification
        </h1>
        <p className="text-gray-600 mb-6">
          Sélectionnez les types de notifications que vous souhaitez recevoir
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {notificationOptions.map((label, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`notif-${index}`}
                {...register(label)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={`notif-${index}`} className="text-gray-800">
                {label}
              </label>
            </div>
          ))}

          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-gray-200 text-black  hover:bg-gray-300 transition disabled:opacity-50  rounded-lg "
            >
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
