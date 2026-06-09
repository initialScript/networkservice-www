'use client';

import { useState } from 'react';
import { Filter, Grid3x3, List } from 'lucide-react';
import FilterSidebar from '@/components/store/FilterSidebar';
import DesktopFilterSidebar from '@/components/store/DesktopFilterSidebar';
import ProductCard from '@/components/catalog/ProductCard';
import { cn } from '@/lib/utils';

export default function StorePage({ products }: { products: any[] }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  
  // Filter state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState({ min: 0, max: 10000 });

  // Sample filter data
  const categories = [
    { id: 'laptop', label: 'Laptops', count: 24 },
    { id: 'desktop', label: 'Desktops', count: 12 },
    { id: 'gaming', label: 'Gaming', count: 18 },
    { id: 'accessories', label: 'Accessories', count: 36 },
  ];

  const brands = [
    { id: 'apple', label: 'Apple', count: 8 },
    { id: 'dell', label: 'Dell', count: 6 },
    { id: 'hp', label: 'HP', count: 5 },
    { id: 'asus', label: 'ASUS', count: 7 },
    { id: 'lenovo', label: 'Lenovo', count: 4 },
  ];

  const ratings = [5, 4, 3, 2, 1];
  const priceRange = { min: 0, max: 10000 };

  // Filter handlers
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
    setSelectedPriceRange(prev => ({ ...prev, [type]: value }));
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedRatings([]);
    setSelectedPriceRange(priceRange);
  };

  const handleApplyFilters = () => {
    setIsFilterOpen(false);
    // Here you would fetch filtered products from your API
    console.log('Applied filters:', {
      categories: selectedCategories,
      brands: selectedBrands,
      ratings: selectedRatings,
      priceRange: selectedPriceRange,
    });
  };

  const activeFiltersCount = 
    selectedCategories.length + 
    selectedBrands.length + 
    selectedRatings.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="w-full flex items-center justify-center gap-2 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700"
        >
          <Filter size={18} />
          Filtrer
          {activeFiltersCount > 0 && (
            <span className="bg-[#E94560] text-white text-xs px-1.5 py-0.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Desktop Sidebar */}
        <DesktopFilterSidebar
          onReset={handleResetFilters}
          activeFiltersCount={activeFiltersCount}
          categories={categories}
          brands={brands}
          ratings={ratings}
          priceRange={priceRange}
          selectedCategories={selectedCategories}
          selectedBrands={selectedBrands}
          selectedRatings={selectedRatings}
          selectedPriceRange={selectedPriceRange}
          onCategoryChange={handleCategoryChange}
          onBrandChange={handleBrandChange}
          onRatingChange={handleRatingChange}
          onPriceChange={handlePriceChange}
        />

        {/* Products Section */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <p className="text-sm text-gray-500">
              Affichage de <span className="font-medium text-gray-900">1-{products.length}</span> sur{' '}
              <span className="font-medium text-gray-900">{products.length}</span> produits
            </p>
            
            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-[#E94560] focus:border-transparent"
              >
                <option value="newest">Plus récents</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="popular">Plus populaires</option>
              </select>

              {/* View Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-1.5 px-3 transition-colors',
                    viewMode === 'grid'
                      ? 'bg-[#E94560] text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  )}
                >
                  <Grid3x3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-1.5 px-3 transition-colors',
                    viewMode === 'list'
                      ? 'bg-[#E94560] text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  )}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters Tags */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCategories.map(cat => {
                const category = categories.find(c => c.id === cat);
                return category && (
                  <span key={cat} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded-full">
                    {category.label}
                    <button onClick={() => handleCategoryChange(cat)} className="ml-1 hover:text-gray-900">×</button>
                  </span>
                );
              })}
              {selectedBrands.map(brand => {
                const brandItem = brands.find(b => b.id === brand);
                return brandItem && (
                  <span key={brand} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded-full">
                    {brandItem.label}
                    <button onClick={() => handleBrandChange(brand)} className="ml-1 hover:text-gray-900">×</button>
                  </span>
                );
              })}
              {selectedPriceRange.min > 0 || selectedPriceRange.max < 10000 ? (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded-full">
                  {selectedPriceRange.min} DH - {selectedPriceRange.max} DH
                  <button onClick={handleResetFilters} className="ml-1 hover:text-gray-900">×</button>
                </span>
              ) : null}
            </div>
          )}

          {/* Products Grid */}
          <div className={cn(
            'grid gap-4',
            viewMode === 'grid' 
              ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3' 
              : 'grid-cols-1'
          )}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* No Results */}
          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucun produit trouvé</p>
              <button onClick={handleResetFilters} className="mt-2 text-[#E94560] hover:underline">
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
        categories={categories}
        brands={brands}
        ratings={ratings}
        priceRange={priceRange}
        selectedCategories={selectedCategories}
        selectedBrands={selectedBrands}
        selectedRatings={selectedRatings}
        selectedPriceRange={selectedPriceRange}
        onCategoryChange={handleCategoryChange}
        onBrandChange={handleBrandChange}
        onRatingChange={handleRatingChange}
        onPriceChange={handlePriceChange}
      />
    </div>
  );
}