'use client';

import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterContentProps {
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

export function FilterContent({
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
}: FilterContentProps) {
  const [openSections, setOpenSections] = useState<string[]>(['categories', 'brands', 'price', 'ratings']);

  const toggleSection = (section: string) => {
    setOpenSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={cn(
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Categories Section */}
      <div className="border-b border-gray-100 pb-4">
        <button
          onClick={() => toggleSection('categories')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="font-semibold text-gray-900">Catégories</span>
          {openSections.includes('categories') ? (
            <ChevronUp size={18} className="text-gray-400" />
          ) : (
            <ChevronDown size={18} className="text-gray-400" />
          )}
        </button>
        {openSections.includes('categories') && (
          <div className="mt-3 space-y-2">
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center justify-between cursor-pointer hover:bg-gray-50 px-2 py-1 rounded"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => onCategoryChange(category.id)}
                    className="w-4 h-4 rounded border-gray-300 text-[#E94560] focus:ring-[#E94560]"
                  />
                  <span className="text-sm text-gray-700">{category.label}</span>
                </div>
                {category.count && (
                  <span className="text-xs text-gray-400">{category.count}</span>
                )}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brands Section */}
      {brands.length > 0 && (
        <div className="border-b border-gray-100 pb-4">
          <button
            onClick={() => toggleSection('brands')}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="font-semibold text-gray-900">Marques</span>
            {openSections.includes('brands') ? (
              <ChevronUp size={18} className="text-gray-400" />
            ) : (
              <ChevronDown size={18} className="text-gray-400" />
            )}
          </button>
          {openSections.includes('brands') && (
            <div className="mt-3 space-y-2">
              {brands.map((brand) => (
                <label
                  key={brand.id}
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-50 px-2 py-1 rounded"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand.id)}
                      onChange={() => onBrandChange(brand.id)}
                      className="w-4 h-4 rounded border-gray-300 text-[#E94560] focus:ring-[#E94560]"
                    />
                    <span className="text-sm text-gray-700">{brand.label}</span>
                  </div>
                  {brand.count && (
                    <span className="text-xs text-gray-400">{brand.count}</span>
                  )}
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Price Range Section */}
      <div className="border-b border-gray-100 pb-4">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="font-semibold text-gray-900">Prix</span>
          {openSections.includes('price') ? (
            <ChevronUp size={18} className="text-gray-400" />
          ) : (
            <ChevronDown size={18} className="text-gray-400" />
          )}
        </button>
        {openSections.includes('price') && (
          <div className="mt-3">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-xs text-gray-500">Min</label>
                <input
                  type="number"
                  value={selectedPriceRange.min}
                  onChange={(e) => onPriceChange('min', Number(e.target.value))}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <span className="text-gray-400">-</span>
              <div className="flex-1">
                <label className="text-xs text-gray-500">Max</label>
                <input
                  type="number"
                  value={selectedPriceRange.max}
                  onChange={(e) => onPriceChange('max', Number(e.target.value))}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              value={selectedPriceRange.max}
              onChange={(e) => onPriceChange('max', Number(e.target.value))}
              className="w-full mt-3 accent-[#E94560]"
            />
          </div>
        )}
      </div>

      {/* Ratings Section */}
      <div className="border-b border-gray-100 pb-4">
        <button
          onClick={() => toggleSection('ratings')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="font-semibold text-gray-900">Note</span>
          {openSections.includes('ratings') ? (
            <ChevronUp size={18} className="text-gray-400" />
          ) : (
            <ChevronDown size={18} className="text-gray-400" />
          )}
        </button>
        {openSections.includes('ratings') && (
          <div className="mt-3 space-y-2">
            {ratings.map((rating) => (
              <label
                key={rating}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded"
              >
                <input
                  type="checkbox"
                  checked={selectedRatings.includes(rating)}
                  onChange={() => onRatingChange(rating)}
                  className="w-4 h-4 rounded border-gray-300 text-[#E94560] focus:ring-[#E94560]"
                />
                <div className="flex items-center gap-1">
                  {renderStars(rating)}
                  <span className="text-xs text-gray-500 ml-1">et plus</span>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}