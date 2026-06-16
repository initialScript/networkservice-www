'use client';

import { useState, useEffect } from 'react';
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

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleFilterChange = (updates: Record<string, string | null>) => {
    onFilterChange?.(updates);
    handleClose();
  };

  return (
    <>
      {/* Fixed Filter Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center gap-2 bg-[#0F3460] text-white rounded-full px-5 py-3.5 shadow-xl hover:bg-[#1a4a7a] transition-all hover:scale-105 active:scale-95"
        >
          <Filter size={20} />
          <span className="text-sm font-medium">Filtrer</span>
        </button>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with blur */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-md max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#0F3460]">Filtres</h2>
              <button
                onClick={handleClose}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={22} className="text-gray-500" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-70px)] p-5">
              <FilterSidebar
                categories={categories}
                brands={brands}
                currentFilters={currentFilters}
                locale={locale}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>
        </div>
      )}

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes zoom-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-in {
          animation: fade-in 0.2s ease-out, zoom-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
}