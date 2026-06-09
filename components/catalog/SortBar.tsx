'use client';

import { ChevronDown, Grid3x3, List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SortBarProps {
  total: number;
  currentSort: string;
  currentLayout?: string;
  onSortChange?: (sort: string) => void;
  onLayoutChange?: (layout: string) => void;
}

export default function SortBar({ 
  total, 
  currentSort, 
  currentLayout = 'grid',
  onSortChange, 
  onLayoutChange 
}: SortBarProps) {
  const sortOptions = [
    { value: 'newest', label: 'Plus récents' },
    { value: 'price-asc', label: 'Prix croissant' },
    { value: 'price-desc', label: 'Prix décroissant' },
    { value: 'rating', label: 'Meilleures notes' },
  ];

  const handleSortChange = (sort: string) => {
    if (onSortChange) {
      onSortChange(sort);
    }
  };

  const handleLayoutChange = (layout: string) => {
    if (onLayoutChange) {
      onLayoutChange(layout);
    }
  };

  return (
    <div className="flex flex-row items-center justify-between gap-4">
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
            onChange={(e) => handleSortChange(e.target.value)}
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
  );
}