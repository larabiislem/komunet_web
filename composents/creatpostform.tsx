import React, { useEffect, useRef, useState } from "react";
import { Paperclip, Image as ImageIcon, Smile, X } from "lucide-react";

type CreatePostFormProps = {
  endpoint?: string; // API endpoint. Par défaut: /api/posts
  maxLength?: number; // Limite caractères
  placeholder?: string;
  disabled?: boolean;
  onCreated?: (post: any) => void; // Callback après création réussie
};

export default function CreatePostForm({
  endpoint = "/api/posts",
  maxLength = 500,
  placeholder = "À quoi pensez-vous en ce moment ?",
  disabled = false,
  onCreated,
}: CreatePostFormProps) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Auto-resize du textarea
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = Math.min(200, el.scrollHeight) + "px";
  }, [content]);

  // Preview image
  useEffect(() => {
    if (!image) {
      setImagePreview(null);
      return;
    }
    const url = URL.createObjectURL(image);
    setImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setImage(e.target.files[0]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  // Drag & drop
  const onDrop = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dt = e.dataTransfer;
    if (!dt.files || dt.files.length === 0) return;
    const f = dt.files[0];
    if (f.type.startsWith("image/")) setImage(f);
    else setFile(f);
  };

  const onDragOver = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const resetForm = () => {
    setContent("");
    setImage(null);
    setFile(null);
    setImagePreview(null);
    setProgress(0);
    setError(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const canSubmit = !disabled && !isSubmitting && (content.trim().length > 0 || image || file);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    setError(null);
    setProgress(0);

    const form = new FormData();
    form.append("content", content.trim());
    if (image) form.append("image", image);
    if (file) form.append("file", file);

    // Abort + faux suivi de progression (fetch ne donne pas la progression nativement)
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const fakeProgress = setInterval(() => {
      setProgress((p) => (p < 90 ? p + 5 : p));
    }, 120);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: form,
        signal: controller.signal,
        // credentials: 'include', // Active si votre API nécessite des cookies
      });

      clearInterval(fakeProgress);
      setProgress(100);

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Erreur lors de l’envoi");
      }

      const json = await res.json().catch(() => ({}));
      onCreated?.(json);
      resetForm();
    } catch (err: any) {
      clearInterval(fakeProgress);
      setError(err?.message || "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setProgress(0), 400);
    }
  };

  // Raccourci clavier: Cmd/Ctrl + Enter
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      handleSubmit();
    }
  };

  const remaining = maxLength - content.length;
  const counterColor =
    remaining < 0
      ? "text-red-600"
      : remaining <= 50
      ? "text-orange-600"
      : "text-gray-500";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow p-4 flex flex-col gap-4 w-full max-w-xl"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <textarea
        ref={textRef}
        className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-200 text-black placeholder-black"
        placeholder={placeholder}
        value={content}
        onChange={(e) => setContent(e.target.value.slice(0, maxLength + 100))} // petite marge au-dessus pour éviter blocage brutal
        onKeyDown={onKeyDown}
        rows={3}
        disabled={disabled || isSubmitting}
      />

      {/* Compteur + progression */}
      <div className="flex items-center justify-between">
        <span className={`text-xs ${counterColor}`}>
          {remaining < 0 ? `Limite dépassée (${Math.abs(remaining)})` : `${remaining} caractères restants`}
        </span>
        {isSubmitting && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Envoi…</span>
            <div className="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-2 bg-indigo-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Zone drop + previews */}
      {(imagePreview || file) && (
        <div className="flex items-center gap-3">
          {imagePreview && (
            <div className="relative w-24 h-16 rounded border border-gray-200 overflow-hidden">
              <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setImage(null)}
                className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full p-0.5 shadow"
                aria-label="Retirer l’image"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          )}
          {file && (
            <div className="flex items-center gap-2 text-xs border border-gray-200 rounded px-2 py-1">
              <Paperclip className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700 truncate max-w-[180px]">{file.name}</span>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="ml-1 text-gray-500 hover:text-gray-700"
                aria-label="Retirer le fichier"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Pièce jointe */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-full hover:bg-gray-100"
          title="Ajouter une pièce jointe"
          disabled={disabled || isSubmitting}
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
          disabled={disabled || isSubmitting}
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

        {/* Emoji (placeholder) */}
        <button
          type="button"
          className="p-2 rounded-full hover:bg-gray-100"
          title="Ajouter un emoji"
          disabled={disabled || isSubmitting}
          onClick={() => setContent((c) => c + " 🙂")}
        >
          <Smile className="w-5 h-5 text-gray-500" />
        </button>

        <div className="flex-1" />
        <button
          type="submit"
          disabled={!canSubmit || remaining < 0}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold transition
            ${!canSubmit || remaining < 0 || isSubmitting
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-[#4F46E5] text-white hover:bg-indigo-700"
            }`}
        >
          Poster
        </button>
      </div>

      {/* Drop helper */}
      <div className="text-[11px] text-gray-500">
        Astuce: glissez-déposez une image ou un fichier ici. Raccourci: Cmd/Ctrl + Entrée pour publier.
      </div>

      {error && (
        <div className="text-sm text-red-600">
          {error}
        </div>
      )}
    </form>
  );
}