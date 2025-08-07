
import React from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="w-full flex justify-center my-6">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Rechercher des amis, des groupes, des pages"
          className="w-full pl-10 pr-4 py-2 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-100 bg-white text-gray-700"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}