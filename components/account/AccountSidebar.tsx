'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { User, Package, MapPin, Heart, Building2, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';

interface Props {
  locale: string;
}

const NAV = [
  { href: '/compte', label: 'Mon profil', icon: User, exact: true },
  { href: '/compte/commandes', label: 'Mes commandes', icon: Package },
  { href: '/compte/adresses', label: 'Mes adresses', icon: MapPin },
  { href: '/compte/wishlist', label: 'Ma wishlist', icon: Heart },
  { href: '/b2b', label: 'Espace B2B', icon: Building2 },
];

export default function AccountSidebar({ locale }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const initials = user?.name
    ? user.name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
    : '?';

  const handleLogout = () => {
    logout();
    router.push(`/${locale}`);
  };

  const isActive = (href: string, exact?: boolean) => {
    const full = `/${locale}${href}`;
    return exact ? pathname === full : pathname.startsWith(full);
  };

  return (
    <aside className="w-full">
      {/* Avatar + user info */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-100 lg:border-0 lg:mb-4">
        <div className="w-12 h-12 rounded-full bg-[#0F3460] text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">{user?.name ?? '—'}</p>
          <p className="text-xs text-gray-500 truncate">{user?.email ?? '—'}</p>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex lg:flex-col gap-1">
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact);
          const fullHref = href.startsWith('/b2b') ? `/${locale}/b2b` : `/${locale}${href}`;
          return (
            <Link
              key={href}
              href={fullHref}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                active
                  ? 'bg-[#0F3460] text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="hidden lg:block">{label}</span>
            </Link>
          );
        })}

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors mt-auto w-full text-start rtl:text-end"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span className="hidden lg:block">Déconnexion</span>
        </button>
      </nav>
    </aside>
  );
}
