'use client';

import React, { useRef, useState, useEffect } from 'react';
import { categories } from '@/data/categories';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../catalog/ProductCard';

export interface Product {
  id: number;
  name_fr: string;
  name_ar: string;
  slug: string;
  price: number;
  compare_price?: number;
  stock_qty: number;
  image?: { url: string; alt: string };
}

type Props = {
  locale: string;
  products: Product[] | any;
  title?: string;
  subtitle?: string;
  banner?: string
  haveCategories?: boolean
};

const ProductsCarouselSection = ({ 
  products, 
  banner,
  locale, 
  title,
  subtitle,
  haveCategories=false
}: Props) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const productScrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeCategory, setActiveCategory] = useState('imprimante-scanner')

  const checkScrollPosition = () => {
    const container = productScrollRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  const scrollProducts = (direction: 'left' | 'right') => {
    const container = productScrollRef.current;
    if (container) {
      const amount = container.clientWidth * 0.9;
      container.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (productScrollRef.current?.offsetLeft || 0));
    setScrollLeft(productScrollRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (productScrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (productScrollRef.current) {
      productScrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  useEffect(() => {
    const container = productScrollRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
      checkScrollPosition();
      
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, [products]);

  const scroll = (direction: 'left' | 'right') => {
      const container = scrollContainerRef.current;
      if (container) {
        const scrollAmount = container.clientWidth * 0.8;
        const newScrollLeft = direction === 'left' 
          ? container.scrollLeft - scrollAmount 
          : container.scrollLeft + scrollAmount;
        
        container.scrollTo({
          left: newScrollLeft,
          behavior: 'smooth',
        });
      }
    };

  if (!products || products.length === 0) return null;

  return (
    <section className="bg-[#f8fafc] py-8 w-full">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="max-w-7xl mx-auto px-4 mb-10">
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

        {haveCategories && (
          <>
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              {/* Carousel Container with Arrows */}
              <div className="relative group">
                {/* Left Arrow */}
                <button
                  onClick={() => scroll('left')}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    showLeftArrow ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                  aria-label="Scroll left"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={2} 
                    stroke="currentColor" 
                    className="w-5 h-5 text-gray-700"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
        
                {/* Right Arrow */}
                <button
                  onClick={() => scroll('right')}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    showRightArrow ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                  aria-label="Scroll right"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={2} 
                    stroke="currentColor" 
                    className="w-5 h-5 text-gray-700"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
        
                {/* Scrollable Categories */}
                <div
                  ref={scrollContainerRef}
                  className="flex overflow-x-auto scroll-smooth gap-4 pb-4 hide-scrollbar"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  onMouseDown={handleMouseDown}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                >
                  {categories.map((category, index) => (
                    <button onClick={() => setActiveCategory(category.slug)}
                      key={index}
                      className={`flex-shrink-0   rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group/item border border-gray-100 hover:border-blue-200 ${activeCategory === category.slug ? ' bg-[#0F3460]' : 'bg-gradient-to-br from-gray-50 to-white'}`}
                    >
                      <div className="flex flex-col items-center p-4 text-center">
                        {/* Icon Placeholder - you can replace with actual icons */}
                        <div  className={`text-sm sm:text-base font-medium  transition-colors duration-200 ${activeCategory === category.slug ? 'text-white' : 'text-gray-800 group-hover/item:text-blue-600'}`}>
                          {category.name}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                </div>
                </div>
                <div className="bg-gradient-to-r from-[#0F3460] to-[#163d70] rounded-3xl p-8 my-10 text-white">
                  <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">
              Imprimantes & Scanner
            </h3>
        
            <p className="text-slate-300 mt-2">
              Les meilleures imprimantes pour particuliers et entreprises.
            </p>
          </div>
        
          <Link
            href="/products"
            className="hidden md:flex bg-white text-[#0F3460] px-6 py-3 rounded-xl font-semibold"
          >
            Découvrir
          </Link>
        </div>
        </div>
          </>
         )}

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="relative">
            <button
              onClick={() => scrollProducts('left')}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 ${
                showLeftArrow ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            >
              ←
            </button>

            <button
              onClick={() => scrollProducts('right')}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 ${
                showRightArrow ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            >
              →
            </button>

            <div
              ref={productScrollRef}
              className="flex overflow-x-auto scroll-smooth gap-6 snap-x snap-mandatory pb-4 hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {products.map((product: any) => (
                <div
                  key={product.id}
                  className="flex-none snap-start w-[220px] md:w-[260px]"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full grid place-items-center mt-8">
          <Link
            href={`/${locale}/catalogue?sort=newest`}
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