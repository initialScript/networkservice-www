'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: any[];
  defaultImageIndex?: number;
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  defaultImageIndex = 0,
  className,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(defaultImageIndex);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const selectedImage = images[selectedImageIndex];

  // Thumbnail carousel scroll handlers
  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const scrollThumbnails = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 200;
      const newScrollLeft = direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  // Drag scrolling for thumbnails
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isZoomOpen) {
        if (e.key === 'ArrowLeft') {
          handlePrevious();
        } else if (e.key === 'ArrowRight') {
          handleNext();
        } else if (e.key === 'Escape') {
          setIsZoomOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomOpen, selectedImageIndex]);

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
  }, [images]);

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
    // Scroll thumbnail into view
    const thumbnailElement = document.getElementById(`thumbnail-${index}`);
    thumbnailElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  const handlePrevious = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleMainImageClick = () => {
    setIsZoomOpen(true);
  };

  return (
    <div className={cn("w-full max-w-6xl mx-auto px-4 py-8", className)}>
      {/* Main Image Section */}
      <div className="relative group mb-6">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100 shadow-lg">
          <Image
            src={selectedImage.src}
            alt={selectedImage.alt}
            fill
            className="object-contain cursor-zoom-in transition-transform duration-300 hover:scale-105"
            onClick={handleMainImageClick}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
          
          {/* Navigation Arrows on Main Image */}
          {images.length > 1 && (
            <>
              {/* Left Arrow */}
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Zoom Button */}
          <button
            onClick={handleMainImageClick}
            className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Zoom image"
          >
            <ZoomIn className="w-5 h-5" />
          </button>

          {/* Image Counter Badge */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
              {selectedImageIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Image Title/Description */}
        {(selectedImage.title || selectedImage.description) && (
          <div className="mt-4 text-center">
            {selectedImage.title && (
              <h3 className="text-lg font-semibold text-gray-900">{selectedImage.title}</h3>
            )}
            {selectedImage.description && (
              <p className="text-sm text-gray-600 mt-1">{selectedImage.description}</p>
            )}
          </div>
        )}
      </div>

      {/* Thumbnail Carousel */}
      <div className="relative group">
        {/* Left Arrow for Thumbnails */}
        {showLeftArrow && (
          <button
            onClick={() => scrollThumbnails('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Previous thumbnails"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
        )}

        {/* Right Arrow for Thumbnails */}
        {showRightArrow && (
          <button
            onClick={() => scrollThumbnails('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Next thumbnails"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        )}

        {/* Thumbnails Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-3 pb-4 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          {images.map((image, index) => (
            <button
              key={image.id || index}
              id={`thumbnail-${index}`}
              onClick={() => handleThumbnailClick(index)}
              className={cn(
                "relative flex-shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
                selectedImageIndex === index
                  ? "ring-2 ring-blue-500 ring-offset-2 scale-95"
                  : "hover:ring-2 hover:ring-gray-300 hover:scale-95"
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 96px, 112px"
              />
              {selectedImageIndex === index && (
                <div className="absolute inset-0 bg-blue-500/10" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Zoom Dialog */}
      <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 bg-black/95 border-none">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons in Modal */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-200 hover:scale-110"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-200 hover:scale-110"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Main Image in Modal */}
            <div className="relative w-full h-full flex items-center justify-center p-8">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                priority
                sizes="95vw"
              />
            </div>

            {/* Image Info in Modal */}
            {(selectedImage.title || selectedImage.description) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                {selectedImage.title && (
                  <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
                )}
                {selectedImage.description && (
                  <p className="text-sm text-gray-200 mt-1">{selectedImage.description}</p>
                )}
                <p className="text-xs text-gray-300 mt-2">
                  {selectedImageIndex + 1} / {images.length}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ImageGallery;