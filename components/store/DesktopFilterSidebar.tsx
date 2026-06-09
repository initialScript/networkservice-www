'use client';

import { FilterContent } from './FilterContent';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface DesktopFilterSidebarProps {
  onReset: () => void;
  activeFiltersCount: number;
  categories: FilterOption[];
  brands: FilterOption[];
  ratings: number[];
  priceRange: { min: number; max: number };
  selectedCategories: string[];
  selectedBrands: string[];
  selectedRatings: number[];
  selectedPriceRange: { min: number; max: number };
  onCategoryChange: (categoryId: string) => void;
  onBrandChange: (brandId: string) => void;
  onRatingChange: (rating: number) => void;
  onPriceChange: (type: 'min' | 'max', value: number) => void;
}

export default function DesktopFilterSidebar({
  onReset,
  activeFiltersCount,
  categories,
  brands,
  ratings,
  priceRange,
  selectedCategories,
  selectedBrands,
  selectedRatings,
  selectedPriceRange,
  onCategoryChange,
  onBrandChange,
  onRatingChange,
  onPriceChange,
}: DesktopFilterSidebarProps) {
  return (
    <div className="hidden md:block w-64 flex-shrink-0">
      <div className="sticky top-24">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Filtres</h3>
            {activeFiltersCount > 0 && (
              <button
                onClick={onReset}
                className="text-xs text-[#E94560] hover:underline"
              >
                Tout effacer
              </button>
            )}
          </div>

          <FilterContent
            categories={categories}
            brands={brands}
            ratings={ratings}
            priceRange={priceRange}
            selectedCategories={selectedCategories}
            selectedBrands={selectedBrands}
            selectedRatings={selectedRatings}
            selectedPriceRange={selectedPriceRange}
            onCategoryChange={onCategoryChange}
            onBrandChange={onBrandChange}
            onRatingChange={onRatingChange}
            onPriceChange={onPriceChange}
          />
        </div>
      </div>
    </div>
  );
}