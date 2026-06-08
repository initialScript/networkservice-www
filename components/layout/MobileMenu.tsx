'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  X, Home, Grid, Tag, Building2, Phone, User, ShoppingCart,
  Heart, ChevronDown, LogOut,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import { useCartDrawer } from '@/lib/contexts/CartDrawerContext';
import type { Category } from './Header';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  locale: string;
}

export default function MobileMenu({ isOpen, onClose, categories, locale }: Props) {
  const { isAuthenticated, logout } = useAuthStore();
  const items_count = useCartStore((s) => s.items_count);
  const { open: openCart } = useCartDrawer();
  const [catsOpen, setCatsOpen] = useState(false);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />

      {/* Panel */}
      <div className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#0F3460]">
          <span className="text-xl font-extrabold tracking-tight text-white">
            IRIS<span className="text-[#E94560]">.</span><span className="text-sm font-medium text-blue-200 ms-0.5">MA</span>
          </span>
          <button onClick={onClose} className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5 text-sm">
          <Link href={`/${locale}`} onClick={onClose} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#0F3460] transition">
            <Home className="w-4 h-4 flex-shrink-0" /> Accueil
          </Link>

          {/* Categories accordion */}
          <button
            onClick={() => setCatsOpen((v) => !v)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#0F3460] transition"
          >
            <span className="flex items-center gap-3"><Grid className="w-4 h-4 flex-shrink-0" /> Catalogue</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${catsOpen ? 'rotate-180' : ''}`} />
          </button>
          {catsOpen && (
            <div className="ml-7 pl-3 border-l-2 border-gray-100 space-y-0.5 py-1">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${locale}/catalogue/${cat.slug}`}
                  onClick={onClose}
                  className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-[#0F3460] transition"
                >
                  {locale === 'ar' ? cat.name_ar : cat.name_fr}
                </Link>
              ))}
              <Link href={`/${locale}/catalogue`} onClick={onClose} className="block px-3 py-2 font-semibold text-[#0F3460]">
                Voir tout →
              </Link>
            </div>
          )}

          <Link href="#" onClick={onClose} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#0F3460] transition">
            <Tag className="w-4 h-4 flex-shrink-0" /> Marques
          </Link>
          <Link href={`/${locale}/b2b`} onClick={onClose} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#0F3460] transition">
            <Building2 className="w-4 h-4 flex-shrink-0" /> B2B / Entreprises
          </Link>
          <Link href="#" onClick={onClose} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#0F3460] transition">
            <Phone className="w-4 h-4 flex-shrink-0" /> Contact
          </Link>

          <hr className="border-gray-100 my-2" />

          <button
            onClick={() => { onClose(); openCart(); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#0F3460] transition"
          >
            <ShoppingCart className="w-4 h-4 flex-shrink-0" />
            Panier
            {items_count > 0 && (
              <span className="ms-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#E94560] px-1 text-[10px] font-bold text-white">
                {items_count}
              </span>
            )}
          </button>

          {isAuthenticated ? (
            <>
              <Link href={`/${locale}/compte`} onClick={onClose} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#0F3460] transition">
                <User className="w-4 h-4 flex-shrink-0" /> Mon compte
              </Link>
              <Link href={`/${locale}/compte/wishlist`} onClick={onClose} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#0F3460] transition">
                <Heart className="w-4 h-4 flex-shrink-0" /> Wishlist
              </Link>
              <button
                onClick={() => { logout(); onClose(); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="w-4 h-4 flex-shrink-0" /> Déconnexion
              </button>
            </>
          ) : (
            <Link href={`/${locale}/auth/login`} onClick={onClose} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#0F3460] transition">
              <User className="w-4 h-4 flex-shrink-0" /> Se connecter
            </Link>
          )}
        </nav>

        {/* Locale switcher */}
        <div className="px-5 py-4 border-t border-gray-100 flex items-center gap-2 text-sm">
          <span className="text-gray-400">Langue :</span>
          <Link href={`/fr${locale === 'ar' ? '' : ''}`} onClick={onClose} className={`px-2.5 py-1 rounded-md font-medium transition ${locale === 'fr' ? 'bg-[#0F3460] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            FR
          </Link>
          <Link href={`/ar${''}`} onClick={onClose} className={`px-2.5 py-1 rounded-md font-medium transition ${locale === 'ar' ? 'bg-[#0F3460] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            AR
          </Link>
        </div>
      </div>
    </>
  );
}
