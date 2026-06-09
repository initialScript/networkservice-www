'use client';

import { useState, useEffect } from 'react';
import { X, SlidersHorizontal, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterSection {
  title: string;
  options: FilterOption[];
  type: 'checkbox' | 'radio' | 'range';
}

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
  categories?: FilterOption[];
  brands?: FilterOption[];
  prices?: { min: number; max: number };
  ratings?: number[];
}

export default function FilterSidebar({
  isOpen,
  onClose,
  onApplyFilters,
  categories = [],
  brands = [],
  prices = { min: 0, max: 10000 },
  ratings = [5, 4, 3, 2, 1],
}: FilterSidebarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState(prices);
  const [openSections, setOpenSections] = useState<string[]>(['categories', 'brands', 'price', 'ratings']);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSection = (section: string) => {
    setOpenSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleBrandChange = (brandId: string) => {
    setSelectedBrands(prev =>
      prev.includes(brandId)
        ? prev.filter(b => b !== brandId)
        : [...prev, brandId]
    );
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRatings(prev =>
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    setPriceRange(prev => ({ ...prev, [type]: value }));
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedRatings([]);
    setPriceRange(prices);
  };

  const handleApply = () => {
    onApplyFilters({
      categories: selectedCategories,
      brands: selectedBrands,
      ratings: selectedRatings,
      priceRange,
    });
    if (isMobile) onClose();
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
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 transition-transform duration-300 overflow-y-auto',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={20} className="text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filtrer</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Réinitialiser
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Filter Sections */}
        <div className="p-4 space-y-4">
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
                        onChange={() => handleCategoryChange(category.id)}
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
                          onChange={() => handleBrandChange(brand.id)}
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
                      value={priceRange.min}
                      onChange={(e) => handlePriceChange('min', Number(e.target.value))}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <span className="text-gray-400">-</span>
                  <div className="flex-1">
                    <label className="text-xs text-gray-500">Max</label>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={prices.min}
                  max={prices.max}
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange('max', Number(e.target.value))}
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
                      onChange={() => handleRatingChange(rating)}
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

        {/* Footer Buttons */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Réinitialiser
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-2 bg-[#E94560] text-white rounded-lg text-sm font-semibold hover:bg-[#c73350] transition-colors"
          >
            Appliquer
          </button>
        </div>
      </div>
    </>
  );
}