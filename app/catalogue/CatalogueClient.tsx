'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import MobileFilterDrawer from './MobileFilterDrawer';
import FilterSidebar from '@/components/catalog/FilterSidebar';
import SortBar from '@/components/catalog/SortBar';
import ProductGrid from '@/components/catalog/ProductGrid';
import Pagination from '@/components/catalog/Pagination';
import { Product } from '@/data/products';
import ProductList from '@/components/catalog/ProductList';

interface CatalogueClientProps {
  initialProducts: Product[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  currentSort: string;
  currentFilters: {
    search?: string;
    category?: string;
    brand?: string;
    min_price?: string;
    max_price?: string;
    in_stock?: string;
    sort: string;
    page: number;
  };
  categories: any[];
  brands: any[];
  locale: string;
  media_url?: string
}

export default function CatalogueClient({
  initialProducts,
  totalProducts,
  totalPages,
  currentPage,
  currentSort,
  currentFilters,
  categories,
  brands,
  locale,
  media_url
}: CatalogueClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [layout, setLayout] = useState('grid');

  // Helper function to get numeric price
  const getNumericPrice = (price: string | number): number => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') return parseFloat(price);
    return 0;
  };

  // Sort products based on currentSort
  const sortedProducts = useMemo(() => {
    const productsCopy = [...products];
    
    switch (currentSort) {
      case 'price-asc':
        return productsCopy.sort((a, b) => {
          const priceA = getNumericPrice(a.price);
          const priceB = getNumericPrice(b.price);
          return priceA - priceB;
        });
      case 'price-desc':
        return productsCopy.sort((a, b) => {
          const priceA = getNumericPrice(a.price);
          const priceB = getNumericPrice(b.price);
          return priceB - priceA;
        });
      case 'newest':
        return productsCopy.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
      case 'rating':
        return productsCopy;
      default:
        return productsCopy;
    }
  }, [products, currentSort]);

  const handleLayoutChange = (newLayout: string) => {
    setLayout(newLayout);
    localStorage.setItem('product-layout', newLayout);
  };
  
  useEffect(() => {
    const savedLayout = localStorage.getItem('product-layout');
    if (savedLayout && (savedLayout === 'grid' || savedLayout === 'list')) {
      setLayout(savedLayout);
    }
  }, []);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const handleFilterChange = (updates: Record<string, string | null>) => {
    setIsLoading(true);
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    
    params.set('page', '1');
    router.push(`?${params.toString()}`);
    setIsLoading(false);
  };

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sort);
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    router.push(window.location.pathname);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Active Filters Display */}
      {(currentFilters.search || 
        currentFilters.category || 
        currentFilters.brand || 
        currentFilters.min_price || 
        currentFilters.max_price) && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500">Filtres actifs:</span>
          {currentFilters.search && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded-full">
              Recherche: {currentFilters.search}
              <button onClick={() => handleFilterChange({ search: null })} className="ml-1 hover:text-gray-900">×</button>
            </span>
          )}
          {currentFilters.category && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded-full">
              Catégorie: {currentFilters.category}
              <button onClick={() => handleFilterChange({ category: null })} className="ml-1 hover:text-gray-900">×</button>
            </span>
          )}
          {currentFilters.brand && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded-full">
              Marque: {currentFilters.brand}
              <button onClick={() => handleFilterChange({ brand: null })} className="ml-1 hover:text-gray-900">×</button>
            </span>
          )}
          {(currentFilters.min_price || currentFilters.max_price) && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded-full">
              Prix: {currentFilters.min_price || '0'} DH - {currentFilters.max_price || '∞'} DH
              <button onClick={() => handleFilterChange({ min_price: null, max_price: null })} className="ml-1 hover:text-gray-900">×</button>
            </span>
          )}
          <button
            onClick={handleClearFilters}
            className="text-xs text-[#E94560] hover:underline ml-2"
          >
            Tout effacer
          </button>
        </div>
      )}

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-[260px] flex-shrink-0">
          <FilterSidebar
            categories={categories}
            brands={brands}
            currentFilters={currentFilters}
            locale={locale}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <SortBar 
            total={totalProducts} 
            currentSort={currentSort} 
            currentLayout={layout}
            onSortChange={handleSortChange}
            onLayoutChange={handleLayoutChange}
          />

          <div className="mt-5">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="w-8 h-8 border-3 border-gray-200 border-t-[#E94560] rounded-full animate-spin" />
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Aucun produit trouvé</p>
                <button
                  onClick={handleClearFilters}
                  className="mt-2 text-[#E94560] hover:underline"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              layout === 'grid' ? (
                <ProductGrid products={sortedProducts} media_url={media_url} />
              ) : (
                <ProductList products={sortedProducts} media_url={media_url} />
              )
            )}
          </div>

          {totalPages > 1 && (
            <Pagination
              total={totalProducts}
              page={currentPage}
              limit={24}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer - Auto-managed */}
      <MobileFilterDrawer
        categories={categories}
        brands={brands}
        currentFilters={currentFilters}
        locale={locale}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}