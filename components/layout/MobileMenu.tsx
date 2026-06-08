'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  X, Home, Tag, Building2, Phone, User, ShoppingCart,
  Heart, ChevronDown, LogOut, LayoutGrid,
  Printer, Laptop, Tv2, BatteryCharging, Keyboard,
  PenTool, Camera, Wifi, Trash2, Package, Monitor, Droplets,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import { useCartDrawer } from '@/lib/contexts/CartDrawerContext';
import { categories } from '@/data/categories';
import { navigationBarLinks } from '@/utils/navigationBarLinks';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  children?: Category[];
}

const categoryIcons: Record<string, React.ReactNode> = {
  'imprimante-scanner':     <Printer className="w-4 h-4 shrink-0" />,
  'ordinateur':             <Laptop className="w-4 h-4 shrink-0" />,
  'ecran-moniteur':         <Tv2 className="w-4 h-4 shrink-0" />,
  'onduleur':               <BatteryCharging className="w-4 h-4 shrink-0" />,
  'peripherique':           <Keyboard className="w-4 h-4 shrink-0" />,
  'tablette-graphique':     <PenTool className="w-4 h-4 shrink-0" />,
  'image-son':              <Camera className="w-4 h-4 shrink-0" />,
  'reseaux':                <Wifi className="w-4 h-4 shrink-0" />,
  'telephonie':             <Phone className="w-4 h-4 shrink-0" />,
  'destructeur-papiers':    <Trash2 className="w-4 h-4 shrink-0" />,
  'accessoires-composants': <Package className="w-4 h-4 shrink-0" />,
  'logiciels':              <Monitor className="w-4 h-4 shrink-0" />,
  'sacoche-sac-dos':        <Package className="w-4 h-4 shrink-0" />,
  'tablette-tactile':       <Monitor className="w-4 h-4 shrink-0" />,
  'consommables':           <Droplets className="w-4 h-4 shrink-0" />,
};

// Recursive category row — handles depth 0 (top-level) and depth 1+ (sub-groups)
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

  const rowBase =
    'w-full flex items-center gap-3 rounded-lg transition-colors text-sm';

  const depthStyles =
    depth === 0
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
        <span className="flex-1 text-left">{cat.name}</span>
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
        <span className="flex-1 text-left">{cat.name}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div className="ml-6 pl-3 border-l-2 border-gray-100 mt-0.5 mb-1 space-y-0.5">
          {/* "Voir tout" shortcut */}
          <Link
            href={`/catalogue/${cat.slug}`}
            onClick={onClose}
            className="block px-3 py-1.5 text-xs font-semibold text-[#0F3460] hover:bg-blue-50 rounded-lg transition-colors"
          >
            Voir tout — {cat.name} →
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

export default function MobileMenu({ isOpen, onClose, locale }: Props) {
  const { isAuthenticated, logout } = useAuthStore();
  const items_count = useCartStore((s) => s.items_count);
  const { open: openCart } = useCartDrawer();
  const [catsOpen, setCatsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />

      {/* Slide-in panel */}
      <div className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#0F3460] shrink-0">
          <img
            src="http://networkservice-info.com/wp-content/uploads/2025/02/networkservies-logo-1707919409.png"
            alt="Network Service Info"
            className="h-8 brightness-0 invert"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5 text-sm">

          {/* Accueil */}
          <Link
            href={`/${locale}`}
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#0F3460] transition"
          >
            <Home className="w-4 h-4 shrink-0 text-gray-400" />
            Accueil
          </Link>

          {/* ── Tous nos produits accordion ── */}
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

          {catsOpen && (
            <div className="space-y-0.5 pb-1">
              {categories.map((cat) => (
                <CategoryRow
                  key={cat.slug}
                  cat={cat as Category}
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
          )}

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

          {/* Auth */}
          {isAuthenticated ? (
            <>
              <Link
                href={`/${locale}/compte`}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#0F3460] transition"
              >
                <User className="w-4 h-4 shrink-0 text-gray-400" />
                Mon compte
              </Link>
              <Link
                href={`/${locale}/compte/wishlist`}
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
              href={`/${locale}/auth/login`}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#0F3460] transition"
            >
              <User className="w-4 h-4 shrink-0 text-gray-400" />
              Se connecter
            </Link>
          )}
        </nav>

        {/* Locale switcher */}
        <div className="px-5 py-4 border-t border-gray-100 flex items-center gap-2 text-sm shrink-0">
          <span className="text-gray-400">Langue :</span>
          <Link
            href="/fr"
            onClick={onClose}
            className={`px-2.5 py-1 rounded-md font-medium transition ${
              locale === 'fr' ? 'bg-[#0F3460] text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            FR
          </Link>
          <Link
            href="/ar"
            onClick={onClose}
            className={`px-2.5 py-1 rounded-md font-medium transition ${
              locale === 'ar' ? 'bg-[#0F3460] text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            AR
          </Link>
        </div>
      </div>
    </>
  );
}