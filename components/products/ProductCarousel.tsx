'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../catalog/ProductCard';
import { cn } from '@/lib/utils';

interface ProductCarouselProps {
  products: any[];
  title?: string;
  media_url?: string;
}

export default function ProductCarousel({ products, title, media_url }: ProductCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Calculate items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) setItemsPerPage(1);      // mobile
      else if (width < 768) setItemsPerPage(2); // tablet
      else if (width < 1024) setItemsPerPage(3); // small desktop
      else setItemsPerPage(4);                   // large desktop
    };
    
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentPage = Math.round(scrollPosition / (carouselRef.current?.clientWidth || 1));

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
      const scrollAmount = carouselRef.current.clientWidth;
      const newPosition = direction === 'left' 
        ? scrollPosition - scrollAmount 
        : scrollPosition + scrollAmount;
      
      carouselRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToPage = (pageIndex: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: pageIndex * carouselRef.current.clientWidth,
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
    <div className="w-full py-4 md:py-6">
      {/* Header with title */}
      <div className="flex items-center justify-between mb-3 md:mb-4 px-2">
        {title && (
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
            {title}
          </h2>
        )}
      </div>

      {/* Carousel Container with overlay navigation buttons */}
      <div className="relative ">
        {/* Gradient overlays for scroll indication */}
        {scrollPosition > 0 && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none hidden md:block" />
        )}
        {scrollPosition < maxScroll - 5 && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none hidden md:block" />
        )}

        {/* Left Navigation Button - Small on mobile */}
        {scrollPosition > 0 && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/80 md:bg-white shadow-md border border-gray-200 hover:bg-gray-100 transition-all duration-200 active:scale-95"
            aria-label="Previous products"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}

        {/* Right Navigation Button - Small on mobile */}
        {scrollPosition < maxScroll - 5 && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/80 md:bg-white shadow-md border border-gray-200 hover:bg-gray-100 transition-all duration-200 active:scale-95"
            aria-label="Next products"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        )}

        <div
          ref={carouselRef}
          className={cn(
            "flex overflow-x-auto overflow-y-hidden gap-3 md:gap-4",
            "scroll-smooth snap-x snap-mandatory",
            "hide-scrollbar",
            isDragging ? "cursor-grabbing select-none" : "cursor-grab"
          )}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className={cn(
                "flex-shrink-0 snap-start",
                "w-full",
                "sm:w-[calc(50%-0.5rem)]",
                "md:w-[calc(33.333%-1rem)]",
                "lg:w-[calc(25%-0.75rem)]"
              )}
            >
              <ProductCard product={product} media_url={media_url} />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator dots - Very small on mobile */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-1 mt-3 md:mt-6">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <div
              key={idx}
              onClick={() => scrollToPage(idx)}
              className={cn(
                "rounded-full transition-all duration-300",
                currentPage === idx 
                  ? "w-6 h-2 bg-orange-500" 
                  : "w-2 h-2 bg-gray-300"
              )}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}