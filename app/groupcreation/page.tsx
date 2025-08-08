'use client'

import { useState } from 'react'

export default function GroupRequestPage() {
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverPhoto(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Group creation request submitted!')
  }

  return (
    <div className=" min-h-screen text-black pl-64 p-6 "> {/* ← Left padding for sidebar */}
      <form
        onSubmit={handleSubmit}
        className=" rounded-xl shadow max-w-3xl mx-auto p-6 space-y-6"
      >
        <h2 className="text-2xl font-semibold">Demander la création d&apos;un groupe</h2>

        <div className='w-100'>
          <label className="block text-sm font-medium mb-1">Nom du groupe</label>
          <input
            type="text"
            className="w-full  rounded-md p-2 bg-[#EEF5FF]"
            required
          />
        </div>

        <div className='w-100'>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full  rounded-md p-2 h-28 bg-[#EEF5FF]"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4 w-100">
          <div>
            <label className="block text-sm font-medium mb-1">Thème</label>
            <select className="w-full  rounded-md p-2 bg-[#EEF5FF]" required>
              <option value="">Choisissez</option>
              <option value="tech">Tech</option>
              <option value="design">Design</option>
              <option value="business">Business</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Visibilité</label>
            <select className="w-full  rounded-md p-2 bg-[#EEF5FF]" required>
              <option value="">Choisissez</option>
              <option value="public">Public</option>
              <option value="private">Privé</option>
            </select>
          </div>
        </div>

        <div className='w-100'>
          <label className="block text-sm font-medium mb-1">Capacité maximale</label>
          <input
            type="number"
            className="w-full  rounded-md p-2 bg-[#EEF5FF]"
            min={1}
            required
          />
        </div>

        <div className="-dashed -2 -gray-300 rounded-md p-4 text-center">
          <label htmlFor="cover-upload" className="cursor-pointer block">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="mx-auto rounded-md object-cover max-h-48"
              />
            ) : (
              <>
                <p className="font-medium">Ajouter une photo de couverture</p>
                <p className="text-sm text-gray-500">Recommandé: 1680 × 396 pixels</p>
              </>
            )}
          </label>
          <input
            id="cover-upload"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Demander la Création du Groupe
        </button>
      </form>
    </div>
  )
}
