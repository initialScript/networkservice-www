'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Category {
  id: number;
  slug: string;
  name_fr: string;
  name_ar: string;
  description?: string;
}

export interface Brand {
  id: number;
  slug: string;
  name: string;
  logo?: string;
  productCount?: number;
}

export interface CurrentFilters {
  category?: string;
  brand?: string;
  min_price?: string;
  max_price?: string;
  in_stock?: string;
}

interface Props {
  categories: Category[];
  brands: Brand[];
  currentFilters: CurrentFilters;
  locale?: string;
  onFilterChange?: (updates: Record<string, string | null>) => void;
}

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 py-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full text-sm font-semibold text-gray-800 mb-2"
      >
        {title}
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}

export default function FilterSidebar({ 
  categories, 
  brands, 
  currentFilters, 
  onFilterChange 
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(currentFilters.min_price ?? '');
  const [maxPrice, setMaxPrice] = useState(currentFilters.max_price ?? '');

  // Sync local state with currentFilters when they change
  useEffect(() => {
    setMinPrice(currentFilters.min_price ?? '');
    setMaxPrice(currentFilters.max_price ?? '');
  }, [currentFilters.min_price, currentFilters.max_price]);

  const pushFilter = (updates: Record<string, string | null>) => {
    if (onFilterChange) {
      // Use the callback if provided (for client-side)
      onFilterChange(updates);
    } else {
      // Fallback to router navigation
      const params = new URLSearchParams(searchParams.toString());
      params.delete('page');
      for (const [key, val] of Object.entries(updates)) {
        if (val === null || val === '') {
          params.delete(key);
        } else {
          params.set(key, val);
        }
      }
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const selectedBrands = currentFilters.brand
    ? currentFilters.brand.split(',').filter(Boolean)
    : [];

  const toggleBrand = (slug: string) => {
    const next = selectedBrands.includes(slug)
      ? selectedBrands.filter((b) => b !== slug)
      : [...selectedBrands, slug];
    pushFilter({ brand: next.length ? next.join(',') : null });
  };

  const applyPrice = () => {
    pushFilter({ 
      min_price: minPrice || null, 
      max_price: maxPrice || null 
    });
  };

  const setPreset = (min: string, max: string) => {
    setMinPrice(min);
    setMaxPrice(max);
    pushFilter({ 
      min_price: min || null, 
      max_price: max || null 
    });
  };

  const hasFilters =
    !!currentFilters.category ||
    !!currentFilters.brand ||
    !!currentFilters.min_price ||
    !!currentFilters.max_price ||
    !!currentFilters.in_stock;

  const clearAll = () => {
    setMinPrice('');
    setMaxPrice('');
    pushFilter({ 
      category: null, 
      brand: null, 
      min_price: null, 
      max_price: null, 
      in_stock: null 
    });
  };

  return (
    <aside className="w-full">
      {/* Catégories */}
      <Section title="Catégories">
        <ul className="space-y-1">
          {categories.map((cat) => {
            const name = cat.name_fr;
            const isActive = currentFilters.category === cat.slug;
            return (
              <li key={cat.slug}>
                <button
                  type="button"
                  onClick={() =>
                    pushFilter({ category: isActive ? null : cat.slug })
                  }
                  className={cn(
                    'w-full text-start text-sm px-2 py-1.5 rounded-lg transition-colors',
                    isActive
                      ? 'bg-[#0F3460] text-white font-semibold'
                      : 'text-gray-700 hover:bg-gray-100',
                  )}
                >
                  {name}
                </button>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Marques */}
      {brands.length > 0 && (
        <Section title="Marques">
          <ul className="space-y-1 max-h-56 overflow-y-auto">
            {brands.map((brand) => {
              const checked = selectedBrands.includes(brand.slug);
              return (
                <li key={brand.slug}>
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleBrand(brand.slug)}
                      className="w-4 h-4 rounded border-gray-300 text-[#0F3460] focus:ring-[#0F3460]/30 cursor-pointer"
                    />
                    {brand.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={brand.logo} alt={brand.name} className="h-5 object-contain" />
                    ) : (
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        {brand.name}
                      </span>
                    )}
                    {brand.productCount && (
                      <span className="text-xs text-gray-400 ml-auto">{brand.productCount}</span>
                    )}
                  </label>
                </li>
              );
            })}
          </ul>
        </Section>
      )}

      {/* Prix */}
      <Section title="Prix">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3460]/30"
            />
            <span className="text-gray-400 text-sm flex-shrink-0">—</span>
            <input
              type="number"
              min={0}
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3460]/30"
            />
          </div>
          <button
            type="button"
            onClick={applyPrice}
            className="w-full py-1.5 text-sm font-semibold rounded-lg bg-[#0F3460] text-white hover:bg-[#0a2444] transition"
          >
            Appliquer
          </button>
          <div className="flex flex-wrap gap-1.5">
            {[
              { label: '0–500 DH', min: '0', max: '500' },
              { label: '500–2000 DH', min: '500', max: '2000' },
              { label: '2000+ DH', min: '2000', max: '' },
            ].map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => setPreset(preset.min, preset.max)}
                className={cn(
                  'text-xs px-2.5 py-1 rounded-full border transition',
                  currentFilters.min_price === preset.min && currentFilters.max_price === preset.max
                    ? 'bg-[#0F3460] text-white border-[#0F3460]'
                    : 'border-gray-200 text-gray-600 hover:border-[#0F3460] hover:text-[#0F3460]',
                )}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Disponibilité */}
      <Section title="Disponibilité">
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={currentFilters.in_stock === 'true'}
            onChange={(e) =>
              pushFilter({ in_stock: e.target.checked ? 'true' : null })
            }
            className="w-4 h-4 rounded border-gray-300 text-[#0F3460] focus:ring-[#0F3460]/30 cursor-pointer"
          />
          <span className="text-sm text-gray-700">En stock uniquement</span>
        </label>
      </Section>

      {/* Réinitialiser */}
      {hasFilters && (
        <button
          type="button"
          onClick={clearAll}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-gray-500 hover:text-red-500 border border-gray-200 hover:border-red-300 rounded-lg transition"
        >
          <X className="w-4 h-4" />
          Réinitialiser les filtres
        </button>
      )}
    </aside>
  );
}