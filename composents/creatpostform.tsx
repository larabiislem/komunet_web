import React, { useRef, useState } from "react";
import { Paperclip, Image as ImageIcon, Smile } from "lucide-react";

export default function CreatePostForm() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implémente ici la logique d'envoi du post
    setContent("");
    setImage(null);
    setFile(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow p-4 flex flex-col gap-4 w-full max-w-xl"
    >
      <textarea
        className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-200 text-black placeholder-black"
        placeholder="À quoi pensez-vous en ce moment ?"
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={3}
      />
      <div className="flex items-center gap-4">
        {/* Pièce jointe */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-full hover:bg-gray-100"
          title="Ajouter une pièce jointe"
        >
          <Paperclip className="w-5 h-5 text-gray-500" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Image */}
        <button
          type="button"
          onClick={() => imageInputRef.current?.click()}
          className="p-2 rounded-full hover:bg-gray-100"
          title="Ajouter une image"
        >
          <ImageIcon className="w-5 h-5 text-gray-500" />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          className="hidden"
          onChange={handleImageChange}
        />

        {/* Emoji (optionnel) */}
        <button
          type="button"
          className="p-2 rounded-full hover:bg-gray-100"
          title="Ajouter un emoji"
        >
          <Smile className="w-5 h-5 text-gray-500" />
        </button>

        <div className="flex-1" />
        <button
          type="submit"
          className="flex items-center gap-2 bg-[#4F46E5] text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Poster
        </button>
      </div>
      {/* Affichage du nom du fichier/image sélectionné */}
      {(image || file) && (
        <div className="text-xs text-gray-600">
          {image && <span>Image : {image.name}</span>}
          {file && <span className="ml-2">Fichier : {file.name}</span>}
        </div>
      )}
    </form>
  );
}