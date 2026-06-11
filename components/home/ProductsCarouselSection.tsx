'use client';

import React, { useRef, useState, useEffect } from 'react';
import { categories } from '@/data/categories';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../catalog/ProductCard';

type Props = {
  locale: string;
  products: any[];
  title?: string;
  subtitle?: string;
  banner?: string;
  haveCategories?: boolean;
};

const ProductsCarouselSection = ({ 
  products, 
  banner,
  locale, 
  title,
  subtitle,
  haveCategories = false
}: Props) => {
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const productScrollRef = useRef<HTMLDivElement>(null);
  
  const [showCategoryLeftArrow, setShowCategoryLeftArrow] = useState(false);
  const [showCategoryRightArrow, setShowCategoryRightArrow] = useState(true);
  const [showProductLeftArrow, setShowProductLeftArrow] = useState(false);
  const [showProductRightArrow, setShowProductRightArrow] = useState(true);
  
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeCategory, setActiveCategory] = useState('laptop');

  const checkCategoryScrollPosition = () => {
    const container = categoryScrollRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowCategoryLeftArrow(scrollLeft > 0);
      setShowCategoryRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const checkProductScrollPosition = () => {
    const container = productScrollRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowProductLeftArrow(scrollLeft > 0);
      setShowProductRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const scrollCategory = (direction: 'left' | 'right') => {
    const container = categoryScrollRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.7;
      container.scrollTo({
        left: direction === 'left' ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollProducts = (direction: 'left' | 'right') => {
    const container = productScrollRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (categoryScrollRef.current?.offsetLeft || 0));
    setScrollLeft(categoryScrollRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (categoryScrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  useEffect(() => {
    const categoryContainer = categoryScrollRef.current;
    const productContainer = productScrollRef.current;
    
    if (categoryContainer) {
      categoryContainer.addEventListener('scroll', checkCategoryScrollPosition);
      checkCategoryScrollPosition();
    }
    
    if (productContainer) {
      productContainer.addEventListener('scroll', checkProductScrollPosition);
      checkProductScrollPosition();
    }
    
    window.addEventListener('resize', () => {
      checkCategoryScrollPosition();
      checkProductScrollPosition();
    });
    
    return () => {
      if (categoryContainer) categoryContainer.removeEventListener('scroll', checkCategoryScrollPosition);
      if (productContainer) productContainer.removeEventListener('scroll', checkProductScrollPosition);
      window.removeEventListener('resize', () => {});
    };
  }, [products]);

  if (!products || products.length === 0) return null;

  // ✅ FIXED: Filter products by active category
  const filteredProducts = activeCategory 
    ? products.filter((product: any) => 
        product.category?.toLowerCase() === activeCategory.toLowerCase()
      )
    : products;

  const displayProducts = filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <section className="bg-[#f8fafc] py-8 w-full">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <span className="text-[#E94560] font-semibold uppercase tracking-wider text-sm">
            {banner}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F3460] mt-2">
            {title}
          </h2>
          <p className="text-gray-500 mt-2 max-w-2xl">
            {subtitle}
          </p>
        </div>

        {/* Categories Section */}
        {haveCategories && (
          <>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <div className="relative group">
                <button
                  onClick={() => scrollCategory('left')}
                  className={`absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full p-2 shadow-lg border border-gray-200 ${
                    showCategoryLeftArrow ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  } transition-all duration-200`}
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>

                <button
                  onClick={() => scrollCategory('right')}
                  className={`absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full p-2 shadow-lg border border-gray-200 ${
                    showCategoryRightArrow ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  } transition-all duration-200`}
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>

                <div
                  ref={categoryScrollRef}
                  className="flex overflow-x-auto scroll-smooth gap-3 pb-2 hide-scrollbar"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  onMouseDown={handleMouseDown}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                >
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveCategory(category.slug)}
                      className={`flex-shrink-0 px-5 py-2.5 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                        activeCategory === category.slug 
                          ? 'bg-[#0F3460] text-white shadow-md' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Category Banner */}
            <div className="bg-gradient-to-r from-[#0F3460] to-[#1a4a8a] rounded-2xl p-6 md:p-8 my-8 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold">
                    {categories.find(c => c.slug === activeCategory)?.name || 'Produits'}
                  </h3>
                  <p className="text-slate-300 mt-1 text-sm md:text-base">
                    Découvrez notre sélection de {categories.find(c => c.slug === activeCategory)?.name?.toLowerCase() || 'produits'} de qualité
                  </p>
                </div>
                <Link
                  href={`/${locale}/catalogue/${activeCategory}`}
                  className="flex items-center gap-2 bg-white text-[#0F3460] px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                >
                  Tout voir <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </>
        )}

        {/* Products Carousel */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="relative">
            <button
              onClick={() => scrollProducts('left')}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 ${
                showProductLeftArrow ? 'opacity-100' : 'opacity-0'
              } transition-all duration-200`}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <button
              onClick={() => scrollProducts('right')}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 ${
                showProductRightArrow ? 'opacity-100' : 'opacity-0'
              } transition-all duration-200`}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>

            <div
              ref={productScrollRef}
              className="flex overflow-x-auto scroll-smooth gap-6 snap-x snap-mandatory pb-4 hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* ✅ FIXED: Use displayProducts (filtered by category) */}
              {displayProducts.map((product: any) => (
                <div key={product.id} className="flex-none snap-start w-[220px] md:w-[260px]">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="w-full grid place-items-center mt-8">
          <Link
            href={`/${locale}/catalogue`}
            className="bg-[#0F3460] text-white px-12 py-3 shadow-md rounded-xl hover:bg-[#0a2444] transition-colors"
          >
            Voir tous les produits
          </Link>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ProductsCarouselSection;