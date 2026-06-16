// app/not-found.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, ArrowLeft, AlertCircle } from 'lucide-react';

export default function NotFound() {
  const pathname = usePathname();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-[120px] md:text-[150px] font-bold leading-none">
            <span className="text-[#0F3460]">4</span>
            <span className="text-[#E94560]">0</span>
            <span className="text-[#0F3460]">4</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <AlertCircle className="w-32 h-32 text-gray-400" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Oups ! Page non trouvée
        </h1>
        
        {/* Description */}
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          Vérifiez l'URL ou retournez à la page d'accueil.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <Link
            href={`/`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F3460] text-white rounded-xl font-semibold hover:bg-[#0a2444] transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Home className="w-4 h-4" />
            Accueil
          </Link>
          <Link
            href={`/catalogue`}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-[#0F3460] hover:text-[#0F3460] transition-all duration-200"
          >
            <ShoppingBag className="w-4 h-4" />
            Voir le catalogue
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 text-gray-500 rounded-xl font-semibold hover:text-[#E94560] transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
        </div>

        {/* Help text */}
        <p className="text-xs text-gray-400 mt-8">
          Besoin d'aide ? <Link href={`/contact`} className="text-[#E94560] hover:underline">Contactez-nous</Link>
        </p>
      </div>
    </div>
  );
}