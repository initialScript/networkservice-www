'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Grid3x3, List, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SortBarProps {
  total: number;
  currentSort: string;
  currentLayout?: string;
  onSortChange?: (sort: string) => void;
  onLayoutChange?: (layout: string) => void;
  onFilterClick?: () => void;
}

const sortOptions = [
  { value: 'newest', label: 'Plus récents' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'rating', label: 'Meilleures notes' },
];

export default function SortBar({ 
  total, 
  currentSort, 
  currentLayout = 'grid',
  onSortChange, 
  onLayoutChange,
  onFilterClick 
}: SortBarProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSortLabel, setSelectedSortLabel] = useState(
    sortOptions.find((opt) => opt.value === currentSort)?.label || 'Trier par'
  );

  useEffect(() => {
    const label = sortOptions.find((opt) => opt.value === currentSort)?.label || 'Trier par';
    setSelectedSortLabel(label);
  }, [currentSort]);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isSortOpen && !target.closest('.sort-dropdown')) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isSortOpen]);

  const handleSortSelect = (value: string) => {
    if (onSortChange) {
      onSortChange(value);
    }
    setIsSortOpen(false);
  };

  const handleLayoutChange = (layout: string) => {
    if (onLayoutChange) {
      onLayoutChange(layout);
    }
  };

  return (
    <div className="sort-dropdown w-full bg-white rounded-lg border border-gray-100 p-3 md:p-4">
      {/* Mobile Layout - Stacked */}
      <div className="block md:hidden space-y-3">
        {/* Top row: Count + Filter + Layout */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 font-medium">
            <span className="font-semibold text-gray-900">{total}</span> produits
          </span>
          <div className="flex items-center gap-2">
            {/* Mobile Filter Button */}
            {onFilterClick && (
              <button
                onClick={onFilterClick}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-[#0F3460] text-white hover:bg-[#1a4a7a] rounded-lg transition-colors shadow-sm"
              >
                <Filter className="w-4 h-4" />
                <span>Filtrer</span>
              </button>
            )}
            
            {/* Layout Toggle - Same style as desktop */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => handleLayoutChange('grid')}
                className={cn(
                  'p-1.5 px-3 transition-colors',
                  currentLayout === 'grid'
                    ? 'bg-[#0F3460] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                )}
                aria-label="Vue en grille"
              >
                <Grid3x3 size={18} />
              </button>
              <button
                onClick={() => handleLayoutChange('list')}
                className={cn(
                  'p-1.5 px-3 transition-colors',
                  currentLayout === 'list'
                    ? 'bg-[#0F3460] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                )}
                aria-label="Vue en liste"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Sort Dropdown (mobile) */}
        <div className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="w-full flex items-center justify-between px-3 py-2.5 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
          >
            <span className="text-gray-700 font-medium">{selectedSortLabel}</span>
            <ChevronDown
              className={cn(
                'w-4 h-4 text-gray-400 transition-transform duration-200',
                isSortOpen ? 'rotate-180' : ''
              )}
            />
          </button>

          {isSortOpen && (
            <>
              <div
                className="fixed inset-0 z-40 bg-black/20"
                onClick={() => setIsSortOpen(false)}
              />
              <div className="absolute left-0 right-0 top-full mt-1 z-50 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                {sortOptions.map((option, index) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortSelect(option.value)}
                    className={cn(
                      'w-full px-4 py-3 text-sm text-left transition-colors',
                      currentSort === option.value
                        ? 'bg-[#0F3460] text-white'
                        : 'text-gray-700 hover:bg-gray-50',
                      index !== sortOptions.length - 1 ? 'border-b border-gray-50' : ''
                    )}
                  >
                    <span>{option.label}</span>
                    {currentSort === option.value && (
                      <span className="ml-2">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Tablet/Desktop Layout - Horizontal */}
      <div className="hidden md:flex items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-900">{total}</span> produits
        </p>
        
        <div className="flex items-center gap-3">
          {/* Layout Toggle Buttons */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => handleLayoutChange('grid')}
              className={cn(
                'p-1.5 px-3 transition-colors',
                currentLayout === 'grid'
                  ? 'bg-[#0F3460] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              )}
              aria-label="Grid view"
            >
              <Grid3x3 size={18} />
            </button>
            <button
              onClick={() => handleLayoutChange('list')}
              className={cn(
                'p-1.5 px-3 transition-colors',
                currentLayout === 'list'
                  ? 'bg-[#0F3460] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              )}
              aria-label="List view"
            >
              <List size={18} />
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={currentSort}
              onChange={(e) => onSortChange?.(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-[#0F3460] focus:border-transparent cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  Trier par: {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}