'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import FilterSidebar from '@/components/catalog/FilterSidebar';
import { cn } from '@/lib/utils';

interface MobileFilterDrawerProps {
  categories: any[];
  brands: any[];
  currentFilters: any;
  locale: string;
  onFilterChange?: (updates: Record<string, string | null>) => void;
}

export default function MobileFilterDrawer({
  categories,
  brands,
  currentFilters,
  locale,
  onFilterChange,
}: MobileFilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-30">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center gap-2 bg-[#0F3460] text-white rounded-full px-4 py-3 shadow-lg hover:bg-[#0a2444] transition-colors"
        >
          <Filter size={18} />
          <span className="text-sm font-medium">Filtrer</span>
        </button>
      </div>

      {/* Drawer */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={cn(
              'fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 transition-transform duration-300 overflow-y-auto',
              isOpen ? 'translate-x-0' : 'translate-x-full'
            )}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Filtrer</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <FilterSidebar
                categories={categories}
                brands={brands}
                currentFilters={currentFilters}
                locale={locale}
                onFilterChange={(updates) => {
                  onFilterChange?.(updates);
                  setIsOpen(false);
                }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}