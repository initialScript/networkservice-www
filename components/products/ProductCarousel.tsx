'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../catalog/ProductCard';
import { cn } from '@/lib/utils';

interface ProductCarouselProps {
  products: any[];
  title?: string;
}

export default function ProductCarousel({ products, title }: ProductCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMaxScroll = () => {
      if (carouselRef.current) {
        const { scrollWidth, clientWidth } = carouselRef.current;
        setMaxScroll(scrollWidth - clientWidth);
      }
    };
    updateMaxScroll();
    window.addEventListener('resize', updateMaxScroll);
    return () => window.removeEventListener('resize', updateMaxScroll);
  }, [products]);

  const handleScroll = () => {
    if (carouselRef.current) {
      setScrollPosition(carouselRef.current.scrollLeft);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      const newPosition = direction === 'left' 
        ? scrollPosition - scrollAmount 
        : scrollPosition + scrollAmount;
      
      carouselRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  };

  // Mouse/Touch drag handlers
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    setStartX(pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const x = pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, []);

  if (!products || products.length === 0) return null;

  return (
    <div className="w-full py-6">
      {/* Header with title and navigation buttons */}
      <div className="flex items-center justify-between mb-4 px-2">
        {title && (
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            {title}
          </h2>
        )}
        
        {/* Navigation Buttons - Desktop only */}
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={scrollPosition <= 0}
            className={cn(
              "p-2 rounded-full border border-gray-200 transition-all duration-200",
              scrollPosition <= 0
                ? "opacity-40 cursor-not-allowed bg-gray-50"
                : "hover:bg-gray-100 hover:border-gray-300 active:scale-95"
            )}
            aria-label="Previous products"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={scrollPosition >= maxScroll - 5}
            className={cn(
              "p-2 rounded-full border border-gray-200 transition-all duration-200",
              scrollPosition >= maxScroll - 5
                ? "opacity-40 cursor-not-allowed bg-gray-50"
                : "hover:bg-gray-100 hover:border-gray-300 active:scale-95"
            )}
            aria-label="Next products"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Carousel Container - Touch/Mouse draggable */}
      <div className="relative group">
        {/* Gradient overlays for scroll indication */}
        {scrollPosition > 0 && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none hidden md:block" />
        )}
        {scrollPosition < maxScroll - 5 && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none hidden md:block" />
        )}

        <div
          ref={carouselRef}
          className={cn(
            "flex overflow-x-auto gap-4 scroll-smooth",
            "scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300",
            "snap-mandatory snap-x",
            isDragging ? "cursor-grabbing select-none" : "cursor-grab"
          )}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          style={{
            scrollbarWidth: 'thin',
            msOverflowStyle: 'auto'
          }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className={cn(
                "flex-shrink-0 w-full snap-start",
                "sm:w-[calc(50%-0.5rem)]",
                "md:w-[calc(33.333%-1rem)]",
                "lg:w-[calc(25%-0.75rem)]"
              )}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator dots (optional) */}
      <div className="flex justify-center gap-1.5 mt-6 md:hidden">
        {products.slice(0, Math.ceil(products.length / 2)).map((_, idx) => {
          const isActive = scrollPosition >= (idx * 300) && scrollPosition < ((idx + 1) * 300);
          return (
            <button
              key={idx}
              onClick={() => {
                if (carouselRef.current) {
                  carouselRef.current.scrollTo({
                    left: idx * carouselRef.current.clientWidth * 0.8,
                    behavior: 'smooth'
                  });
                }
              }}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                isActive ? "w-6 bg-orange-500" : "w-1.5 bg-gray-300"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}