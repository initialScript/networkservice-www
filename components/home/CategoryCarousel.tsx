'use client';

import { categories } from '@/data/categories';
import React, { useRef, useState, useEffect } from 'react';
import ProductCard from '../catalog/ProductCard';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { additionalProducts } from '@/data/products';




const CategoryCarousel = ({locale}:{locale:string}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeCategory, setActiveCategory] = useState('imprimante-scanner')
  // Check scroll position to show/hide arrows
  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  // Scroll to left or right
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

  // Mouse drag scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
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
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
      checkScrollPosition();
      
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, []);

  return (
    <>
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
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

      {/* Add custom CSS for hiding scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      </div>
      
      {/*  */}
      <div className="max-w-7xl mx-auto px-4">
           
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {additionalProducts.map((product:any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
    </>
  );
};

export default CategoryCarousel;