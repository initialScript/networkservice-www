'use client';

import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import FilterSidebar, { type Category, type Brand, type CurrentFilters } from '@/components/catalog/FilterSidebar';

interface Props {
  categories: Category[];
  brands: Brand[];
  currentFilters: CurrentFilters;
  locale: string;
}

export default function MobileFilterDrawer({ categories, brands, currentFilters, locale }: Props) {
  const [open, setOpen] = useState(false);

  const hasFilters =
    !!currentFilters.category ||
    !!currentFilters.brand ||
    !!currentFilters.min_price ||
    !!currentFilters.max_price ||
    !!currentFilters.in_stock;

  return (
    <>
      {/* Sticky trigger — only visible on mobile */}
      <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-30">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-[#0F3460] text-white text-sm font-semibold rounded-full shadow-lg"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtres{hasFilters ? ' ●' : ''}
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`lg:hidden fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-2xl transform transition-transform duration-300 max-h-[85dvh] overflow-y-auto ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white">
          <span className="font-semibold text-gray-900">Filtres</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-5 pb-8">
          <FilterSidebar
            categories={categories}
            brands={brands}
            currentFilters={currentFilters}
            locale={locale}
          />
        </div>
      </div>
    </>
  );
}
