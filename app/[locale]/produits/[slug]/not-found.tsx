import Link from 'next/link';
import { Search, ArrowLeft } from 'lucide-react';

export default function ProductNotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-32 text-center flex flex-col items-center gap-6">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
        <Search className="w-7 h-7 text-gray-400" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Produit introuvable</h1>
        <p className="text-gray-500 mt-2 text-sm leading-relaxed">
          Ce produit n&apos;existe pas ou n&apos;est plus disponible.
          <br />
          Essayez de rechercher un autre produit.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <Link
          href="/catalogue"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F3460] text-white text-sm font-semibold rounded-xl hover:bg-[#0a2444] transition"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          Retour au catalogue
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:border-gray-300 hover:bg-gray-50 transition"
        >
          Accueil
        </Link>
      </div>
    </div>
  );
}
