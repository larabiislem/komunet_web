"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function JoinRequestPending() {
  return (
    <div className="p-6 bg-[#FFF9F5] min-h-screen lg:ml-[260px] md:ml-[200px] sm:ml-0 lg:pr-10 md:pr-6 sm:pr-4 flex flex-col items-center justify-center text-center">
      <div className="w-full max-w-2xl">
        <Link href="/groups" className="flex items-center gap-2 text-gray-600 mb-6">
          <ArrowLeft size={18} /> Retour
        </Link>
        <h1 className="text-lg font-semibold text-gray-800">
          Votre demande de rejoindre le groupe est en attente
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Vous recevrez une notification lorsque votre demande sera acceptée.
        </p>
      </div>
    </div>
  );
}
