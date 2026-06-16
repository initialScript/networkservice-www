'use client';

import { AlertCircle } from 'lucide-react';

interface Props {
  error: Error;
  reset: () => void;
}

export default function CatalogueError({ reset }: Props) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col items-center text-center gap-5">
      <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
        <AlertCircle className="w-7 h-7 text-red-400" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          Erreur lors du chargement du catalogue
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Une erreur est survenue. Veuillez réessayer.
        </p>
      </div>
      <button
        onClick={reset}
        className="px-5 py-2.5 bg-[#0F3460] text-white text-sm font-semibold rounded-xl hover:bg-[#0a2444] transition"
      >
        Réessayer
      </button>
    </div>
  );
}
