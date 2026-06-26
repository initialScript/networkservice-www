'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { SlidersHorizontal } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import {
  ShoppingCart, Heart, User, Search, Menu, ChevronDown,
  LogOut, Package
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartDrawer } from '@/lib/contexts/CartDrawerContext';
import MobileMenu from './MobileMenu';
import TopBar from '../header/TopBar';
import NavigationBar from '../header/NavigationBar';
import { useCategories } from '@/hooks/useCategories';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { open: openCart } = useCartDrawer();
  const items_count = useCartStore((s) => s.items_count);
  const { isAuthenticated, user, logout } = useAuthStore();
  
  // Fetch categories using the hook
  const { categories, loading, error } = useCategories();

  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileCatOpen, setIsMobileCatOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const categoryRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);


  const handleSearch = useCallback(() => {
    const q = searchQuery.trim();
    const params = new URLSearchParams();
    if (q) params.append('search', q);
    if (selectedCategory) params.append('category', selectedCategory);
    
    if (q || selectedCategory) {
      router.push(`/catalogue?${params.toString()}`);
    }
  }, [searchQuery, selectedCategory, router]);

  const handleSearchInput = (value: string) => {
    setSearchQuery(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (value.trim()) {
        const params = new URLSearchParams();
        params.append('search', value.trim());
        if (selectedCategory) params.append('category', selectedCategory);
        router.push(`/catalogue?${params.toString()}`);
      }
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

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    router.push(`/auth/login`);
  };

  // Show loading state or error if needed
  if (error) {
    console.error('Failed to load categories:', error);
  }

  return (
    <header className="sticky top-0 z-40 w-full">
      <TopBar />

      {/* ── Main bar ── */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-1.5 rounded-md hover:bg-gray-100 text-[#0F3460]"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link
            href={`/`}
            className="flex-1 lg:flex-none flex justify-center lg:justify-start"
          >
            <img
              src="/assets/main-logo.png"
              alt="network service info logo"
              className="w-[140px] sm:w-[160px]"
            />
          </Link>

          {/* Search */}
          <div className="hidden lg:block flex-1 max-w-2xl">
            <div className="flex h-10 rounded-lg border border-gray-300 overflow-hidden focus-within:border-[#0F3460] transition-colors">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-full border-r border-gray-300 bg-gray-50 px-3 text-sm text-gray-700 outline-none cursor-pointer shrink-0 max-w-[190px]"
                disabled={loading}
              >
                <option value="">Toutes les catégories</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name_fr}
                  </option>
                ))}
              </select>

              <input
                type="search"
                value={searchQuery}
                onChange={(e) => handleSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    clearTimeout(debounceRef.current);
                    handleSearch();
                  }
                }}
                placeholder="Rechercher un produit, une marque…"
                className="flex-1 h-full px-4 bg-gray-50 text-sm outline-none"
              />

              <button
                onClick={handleSearch}
                className="h-full w-11 flex items-center justify-center bg-[#0F3460] text-white shrink-0 hover:bg-[#0a2444] transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right icons - same as before */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setIsMobileSearchOpen((v) => !v);
                setIsMobileCatOpen(false);
              }}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              aria-label="Recherche"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist — desktop + authenticated */}
            {isAuthenticated && (
              <Link
                href={`/compte/wishlist`}
                className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-[#E94560] transition"
                aria-label="Ma wishlist"
              >
                <Heart className="w-5 h-5" />
              </Link>
            )}

            {/* Account — desktop */}
            <div ref={userMenuRef} className="relative ">
                <Link
                  href={`/auth/login`}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-[#0F3460] transition text-sm"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden xl:block font-medium">Se connecter</span>
                </Link>
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

      {/* Mobile search */}
      {isMobileSearchOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
          <div className="flex h-10 rounded-lg border border-gray-300 overflow-hidden focus-within:border-[#0F3460] transition-colors">
            <button
              onClick={() => setIsMobileCatOpen((v) => !v)}
              className="h-full px-3 bg-gray-50 border-r border-gray-300 text-[#0F3460] hover:bg-gray-100 transition-colors shrink-0 flex items-center gap-1"
              aria-label="Filtrer par catégorie"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <ChevronDown className={`w-3 h-3 transition-transform ${isMobileCatOpen ? 'rotate-180' : ''}`} />
            </button>

            <input
              type="search"
              value={searchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                  setIsMobileSearchOpen(false);
                  setIsMobileCatOpen(false);
                }
              }}
              placeholder="Rechercher..."
              autoFocus
              className="flex-1 h-full px-4 bg-gray-50 text-sm outline-none"
            />

            <button
              onClick={() => {
                handleSearch();
                setIsMobileSearchOpen(false);
                setIsMobileCatOpen(false);
              }}
              className="h-full w-11 flex items-center justify-center bg-[#0F3460] text-white shrink-0 hover:bg-[#0a2444] transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Category dropdown panel */}
          {isMobileCatOpen && (
            <div className="mt-2 rounded-lg border border-gray-200 bg-white shadow-md overflow-hidden">
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setIsMobileCatOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                  selectedCategory === '' ? 'font-semibold text-[#0F3460] bg-blue-50' : 'text-gray-700'
                }`}
              >
                Toutes les catégories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => {
                    setSelectedCategory(cat.slug);
                    setIsMobileCatOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm border-t border-gray-100 hover:bg-gray-50 transition-colors ${
                    selectedCategory === cat.slug ? 'font-semibold text-[#0F3460] bg-blue-50' : 'text-gray-700'
                  }`}
                >
                  {cat.name_fr}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Navigation bar ── */}
      <NavigationBar
        categories={categories}
        categoryRef={categoryRef}
        isCategoryOpen={isCategoryOpen}
        setIsCategoryOpen={setIsCategoryOpen}
      />

      {/* Mobile menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        categories={categories}
        
      />
    </header>
  );
}