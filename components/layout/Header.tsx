'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  ShoppingCart, Heart, User, Search, Menu, ChevronDown,
  Phone, Mail, Truck, LogOut, Package, ChevronRight,
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartDrawer } from '@/lib/contexts/CartDrawerContext';
import MobileMenu from './MobileMenu';

export interface Category {
  id: number;
  name_fr: string;
  name_ar: string;
  slug: string;
  children?: Category[];
}

interface Props {
  categories: Category[];
}

export default function Header({ categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { open: openCart } = useCartDrawer();
  const items_count = useCartStore((s) => s.items_count);
  const { isAuthenticated, user, logout } = useAuthStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const categoryRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const locale = pathname.split('/')[1] || 'fr';

  const handleSearch = useCallback(() => {
    const q = searchQuery.trim();
    if (q) router.push(`/${locale}/catalogue?search=${encodeURIComponent(q)}`);
  }, [searchQuery, router, locale]);

  const handleSearchInput = (value: string) => {
    setSearchQuery(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (value.trim()) router.push(`/${locale}/catalogue?search=${encodeURIComponent(value.trim())}`);
    }, 300);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) setIsCategoryOpen(false);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setIsUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const switchLocale = (next: string) => {
    const segments = pathname.split('/');
    segments[1] = next;
    router.push(segments.join('/') || '/');
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    router.push(`/${locale}/auth/login`);
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* ── Top bar (desktop) ── */}
      <div className="hidden lg:block bg-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between text-xs text-gray-600">
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#E94560]" />
            Livraison rapide partout au Maroc
          </span>
          <div className="flex items-center gap-5">
            <a href="tel:+212600000000" className="flex items-center gap-1 hover:text-[#0F3460] transition">
              <Phone className="w-3 h-3" /> +212 6 00 00 00 00
            </a>
            <a href="mailto:contact@iris.ma" className="flex items-center gap-1 hover:text-[#0F3460] transition">
              <Mail className="w-3 h-3" /> contact@iris.ma
            </a>
          </div>
        </div>
      </div>

      {/* ── Main bar ── */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-1.5 rounded-md hover:bg-gray-100 text-[#0F3460]"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href={`/${locale}`} className="flex-shrink-0 flex items-baseline gap-0.5 select-none">
            <span className="text-2xl font-extrabold tracking-tight text-[#0F3460]">IRIS</span>
            <span className="text-2xl font-extrabold text-[#E94560]">.</span>
            <span className="hidden sm:block text-sm font-semibold text-gray-400 ml-0.5">MA</span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-2xl">
            <div className="relative flex">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => handleSearchInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { clearTimeout(debounceRef.current); handleSearch(); }}}
                placeholder="Rechercher un produit, une marque…"
                className="w-full h-10 pl-4 pr-12 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3460] focus:border-transparent transition"
              />
              <button
                onClick={handleSearch}
                className="h-10 w-11 flex items-center justify-center rounded-r-lg bg-[#0F3460] text-white hover:bg-[#0a2444] transition flex-shrink-0"
                aria-label="Rechercher"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-1">
            {/* Locale switcher — desktop */}
            <div className="hidden lg:flex items-center text-xs font-semibold text-gray-500 border border-gray-200 rounded-md overflow-hidden">
              <button
                onClick={() => switchLocale('fr')}
                className={`px-2.5 py-1.5 transition ${locale === 'fr' ? 'bg-[#0F3460] text-white' : 'hover:bg-gray-50'}`}
              >
                FR
              </button>
              <button
                onClick={() => switchLocale('ar')}
                className={`px-2.5 py-1.5 transition ${locale === 'ar' ? 'bg-[#0F3460] text-white' : 'hover:bg-gray-50'}`}
              >
                AR
              </button>
            </div>

            {/* Wishlist — desktop + authenticated */}
            {isAuthenticated && (
              <Link
                href={`/${locale}/compte/wishlist`}
                className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-[#E94560] transition"
                aria-label="Ma wishlist"
              >
                <Heart className="w-5 h-5" />
              </Link>
            )}

            {/* Account — desktop */}
            <div ref={userMenuRef} className="relative hidden lg:block">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => setIsUserMenuOpen((v) => !v)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-[#0F3460] transition text-sm"
                  >
                    <User className="w-5 h-5" />
                    <span className="hidden xl:block font-medium max-w-[80px] truncate">{user?.name?.split(' ')[0]}</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-1.5 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50">
                      <Link href={`/${locale}/compte`} onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                        <User className="w-4 h-4 text-gray-400" /> Mon compte
                      </Link>
                      <Link href={`/${locale}/compte/commandes`} onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                        <Package className="w-4 h-4 text-gray-400" /> Mes commandes
                      </Link>
                      <hr className="my-1 border-gray-100" />
                      <button onClick={handleLogout} className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                        <LogOut className="w-4 h-4" /> Déconnexion
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={`/${locale}/auth/login`}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-[#0F3460] transition text-sm"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden xl:block font-medium">Se connecter</span>
                </Link>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-[#0F3460] transition"
              aria-label="Mon panier"
            >
              <ShoppingCart className="w-5 h-5" />
              {items_count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#E94560] text-[10px] font-bold text-white">
                  {items_count > 99 ? '99+' : items_count}
                </span>
              )}
              <span className="hidden xl:block text-sm font-medium">Panier</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Navigation bar ── */}
      <div className="hidden lg:block bg-[#0F3460]">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center h-10 text-sm text-white gap-1">
            <Link href={`/${locale}`} className="px-3 py-1.5 rounded hover:bg-white/10 transition font-medium">
              Accueil
            </Link>

            {/* Catalogue dropdown */}
            <div ref={categoryRef} className="relative h-full flex items-center">
              <button
                onMouseEnter={() => setIsCategoryOpen(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded hover:bg-white/10 transition font-medium"
              >
                Catalogue <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {isCategoryOpen && (
                <div
                  onMouseLeave={() => setIsCategoryOpen(false)}
                  className="absolute left-0 top-full w-60 bg-white text-gray-700 shadow-2xl rounded-b-xl border-t-2 border-[#E94560] py-2 z-50"
                >
                  {categories.length === 0 ? (
                    <p className="px-4 py-3 text-sm text-gray-400">Aucune catégorie</p>
                  ) : (
                    categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/${locale}/catalogue/${cat.slug}`}
                        onClick={() => setIsCategoryOpen(false)}
                        className="flex items-center justify-between px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-[#0F3460] transition"
                      >
                        {locale === 'ar' ? cat.name_ar : cat.name_fr}
                        {cat.children && cat.children.length > 0 && (
                          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                        )}
                      </Link>
                    ))
                  )}
                  <hr className="my-1 border-gray-100" />
                  <Link
                    href={`/${locale}/catalogue`}
                    onClick={() => setIsCategoryOpen(false)}
                    className="block px-4 py-2.5 text-sm font-semibold text-[#0F3460] hover:bg-blue-50 transition"
                  >
                    Voir tout le catalogue →
                  </Link>
                </div>
              )}
            </div>

            <Link href="#" className="px-3 py-1.5 rounded hover:bg-white/10 transition font-medium">Marques</Link>
            <Link href={`/${locale}/b2b`} className="px-3 py-1.5 rounded hover:bg-white/10 transition font-medium">B2B / Entreprises</Link>
            <Link href="#" className="px-3 py-1.5 rounded hover:bg-white/10 transition font-medium">Contact</Link>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        categories={categories}
        locale={locale}
      />
    </header>
  );
}
