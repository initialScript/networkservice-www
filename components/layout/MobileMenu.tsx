// components/MobileMenu.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  X, Home, User, ShoppingCart,
  Heart, ChevronDown, LogOut, LayoutGrid,
  Printer, Laptop, Tv2, BatteryCharging, Keyboard,
  PenTool, Camera, Wifi, Trash2, Package, Monitor, Droplets, Phone,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import { useCartDrawer } from '@/lib/contexts/CartDrawerContext';
import { navigationBarLinks } from '@/utils/navigationBarLinks';
import { Category } from '@/hooks/useCategories';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

const categoryIcons: Record<string, React.ReactNode> = {
  'telephonie':             <Phone className="w-4 h-4 shrink-0" />,
  'imprimante-scanner':     <Printer className="w-4 h-4 shrink-0" />,
  'ordinateur':             <Laptop className="w-4 h-4 shrink-0" />,
  'ecran-moniteur':         <Tv2 className="w-4 h-4 shrink-0" />,
  'onduleur':               <BatteryCharging className="w-4 h-4 shrink-0" />,
  'peripherique':           <Keyboard className="w-4 h-4 shrink-0" />,
  'tablette-graphique':     <PenTool className="w-4 h-4 shrink-0" />,
  'image-son':              <Camera className="w-4 h-4 shrink-0" />,
  'reseaux':                <Wifi className="w-4 h-4 shrink-0" />,
  'destructeur-papiers':    <Trash2 className="w-4 h-4 shrink-0" />,
  'accessoires-composants': <Package className="w-4 h-4 shrink-0" />,
  'logiciels':              <Monitor className="w-4 h-4 shrink-0" />,
  'sacoche-sac-dos':        <Package className="w-4 h-4 shrink-0" />,
  'tablette-tactile':       <Monitor className="w-4 h-4 shrink-0" />,
  'consommables':           <Droplets className="w-4 h-4 shrink-0" />,
};

// Recursive category row component
function CategoryRow({
  cat,
  onClose,
  depth = 0,
}: {
  cat: Category;
  onClose: () => void;
  depth?: number;
}) {
  const [open, setOpen] = useState(false);
  const hasChildren = !!cat.children?.length;
  const icon = categoryIcons[cat.slug] ?? <LayoutGrid className="w-4 h-4 shrink-0" />;
  
  // Get localized name
  const categoryName = cat.name_fr;

  const rowBase = 'w-full flex items-center gap-3 rounded-lg transition-colors text-sm';
  const depthStyles = depth === 0
    ? 'px-3 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-[#0F3460]'
    : 'px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-[#0F3460]';

  if (!hasChildren) {
    return (
      <Link
        href={`/catalogue/${cat.slug}`}
        onClick={onClose}
        className={`${rowBase} ${depthStyles}`}
      >
        {depth === 0 ? (
          <span className="text-gray-400 shrink-0">{icon}</span>
        ) : (
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0 ml-1" />
        )}
        <span className="flex-1 text-left">{categoryName}</span>
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`${rowBase} ${depthStyles}`}
      >
        {depth === 0 ? (
          <span className="text-gray-400 shrink-0">{icon}</span>
        ) : (
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0 ml-1" />
        )}
        <span className="flex-1 text-left">{categoryName}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div className="ml-6 pl-3 border-l-2 border-gray-100 mt-0.5 mb-1 space-y-0.5">
          <Link
            href={`/catalogue/${cat.slug}`}
            onClick={onClose}
            className="block px-3 py-1.5 text-xs font-semibold text-[#0F3460] hover:bg-blue-50 rounded-lg transition-colors"
          >
            Voir tout — {categoryName} →
          </Link>
          {cat.children!.map((child) => (
            <CategoryRow
              key={child.slug}
              cat={child}
              onClose={onClose}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MobileMenu({ isOpen, onClose, categories }: Props) {
  const { isAuthenticated, logout } = useAuthStore();
  const items_count = useCartStore((s) => s.items_count);
  const { open: openCart } = useCartDrawer();
  const [catsOpen, setCatsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <>
      {/* Backdrop with fade animation */}
      <div 
        className={`fixed inset-0 z-40 transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={isOpen ? onClose : undefined}
      />

      {/* Slide-in panel with smooth animation */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-gray-100 shrink-0">
          <img
            src="/assets/main-logo.png"
            alt="Network Service Info"
            className="h-8"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-[#0F3460] hover:bg-gray-50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5 text-sm">
          {/* Accueil */}
          <Link
            href={`/`}
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#0F3460] transition"
          >
            <Home className="w-4 h-4 shrink-0 text-gray-400" />
            Accueil
          </Link>

          {/* Tous nos produits accordion */}
          <button
            onClick={() => setCatsOpen((v) => !v)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#0F3460] transition"
          >
            <LayoutGrid className="w-4 h-4 shrink-0 text-gray-400" />
            <span className="flex-1 text-left font-medium">Tous nos produits</span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                catsOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Category children with smooth expand animation */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              catsOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="space-y-0.5 pb-1 pt-1">
              {categories.map((cat) => (
                <CategoryRow
                  key={cat.slug}
                  cat={cat}
                  onClose={onClose}
                  depth={0}
                />
              ))}
              <Link
                href="/catalogue"
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-[#0F3460] hover:bg-blue-50 transition-colors"
              >
                Voir tout le catalogue →
              </Link>
            </div>
          </div>

          <hr className="border-gray-100 !my-2" />

          {/* Navigation bar links */}
          {navigationBarLinks.map((link) => (
            <Link
              key={link.id}
              href={link.path}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#0F3460] transition"
            >
              {link.title}
            </Link>
          ))}

          <hr className="border-gray-100 !my-2" />

          {/* Cart */}
          <button
            onClick={() => { onClose(); openCart(); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#0F3460] transition"
          >
            <ShoppingCart className="w-4 h-4 shrink-0 text-gray-400" />
            <span className="flex-1 text-left">Panier</span>
            {items_count > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#E94560] px-1 text-[10px] font-bold text-white">
                {items_count}
              </span>
            )}
          </button>

          {/* Auth - Commented out as per original */}
          {/* Auth */}
          {/* {isAuthenticated ? (
            <>
              <Link
                href={`/compte`}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#0F3460] transition"
              >
                <User className="w-4 h-4 shrink-0 text-gray-400" />
                Mon compte
              </Link>
              <Link
                href={`/compte/wishlist`}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#0F3460] transition"
              >
                <Heart className="w-4 h-4 shrink-0 text-gray-400" />
                Wishlist
              </Link>
              <button
                onClick={() => { logout(); onClose(); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                Déconnexion
              </button>
            </>
          ) : (
            <Link
              href={`/auth/login`}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#0F3460] transition"
            >
              <User className="w-4 h-4 shrink-0 text-gray-400" />
              Se connecter
            </Link>
          )} */}
        </nav>
      </div>
    </>
  );
}