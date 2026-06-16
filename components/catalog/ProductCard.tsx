'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Check, Camera } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { cn, formatPrice } from '@/lib/utils';

type Props = {
  media_url?: string,
  product: any,
  priority?: boolean
}

export default function ProductCard({ product, media_url, priority = false }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Check if product has a valid price (greater than 0)
  const hasValidPrice = product.price > 0;
  const isOutOfStock = product.stock_qty === 0;
  const isLowStock = product.stock_qty > 0 && product.stock_qty <= 5;
  const hasDiscount = !!product.compare_price && product.compare_price > product.price;
  const discountPct = hasDiscount
    ? Math.round((1 - product.price / product.compare_price!) * 100)
    : 0;

  // Get the image path (without base URL)
  const getImagePath = (): string | undefined => {
    if (!product.images || product.images.length === 0) return undefined;
    const primaryImage = product.images.find((img: any) => img.is_primary) || product.images[0];
    const imagePath = primaryImage.url;
    if (!imagePath) return undefined;
    
    // If it's a full URL, extract just the path
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      try {
        const url = new URL(imagePath);
        return url.pathname;
      } catch {
        return imagePath;
      }
    }
    
    // Return as-is if it's already a path
    return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  };

  // Get full URL for display
  const getFullImageUrl = (): string | undefined => {
    const path = getImagePath();
    if (!path) return undefined;
    return `${media_url}${path}`;
  };

  const imagePath = getImagePath();
  const imageUrl = getFullImageUrl();

  // Lazy load images with Intersection Observer
  useEffect(() => {
    if (priority) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px',
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isOutOfStock || isAdding || isAdded || !hasValidPrice) return;
    
    setIsAdding(true);
    
    try {
      // Store ONLY the path (without base URL)
      await addItem({
        product_id: product.id,
        name: product.name_fr,
        slug: product.slug,
        price: parseFloat(product.price),
        image: imagePath,
        quantity: 1,
      });
      
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Link
      href={`/catalogue/${product.slug}`}
      className="group flex flex-col bg-white rounded-xl border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 overflow-hidden h-full"
    >
      {/* Image Container */}
      <div ref={imgRef} className="relative aspect-square w-full bg-gray-100 overflow-hidden">
        {imageUrl ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 animate-pulse bg-gray-200">
                <div className="flex h-full items-center justify-center">
                  <div className="h-8 w-8 rounded-full border-2 border-gray-300 border-t-gray-500 animate-spin" />
                </div>
              </div>
            )}

            {shouldLoad && (
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={product.name_fr}
                  fill
                  loading={priority ? 'eager' : 'lazy'}
                  priority={priority}
                  quality={priority ? 80 : 70}
                  className={cn(
                    'object-contain p-2 transition-all duration-300',
                    'group-hover:scale-105',
                    imageLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                  )}
                  sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  onLoad={() => setImageLoading(false)}
                />
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-200">
            <Camera className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-2 sm:p-3 gap-1.5 sm:gap-2">
        {/* Product Name */}
        <p className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 leading-snug min-h-[2rem] sm:min-h-[2.5rem]">
          {product.name_fr}
        </p>

        {/* Price - Only show if price > 0 */}
        {hasValidPrice ? (
          <div className="flex items-end gap-1 flex-wrap">
            <span className="text-sm sm:text-base font-bold text-[#0F3460]">
              {formatPrice(product.price)} MAD
            </span>
            {hasDiscount && (
              <>
                <span className="text-[10px] sm:text-xs text-gray-400 line-through leading-relaxed">
                  {formatPrice(product.compare_price!)} MAD
                </span>
                <span className="text-[8px] sm:text-[10px] font-bold text-[#E94560] bg-orange-50 px-1 py-0.5 rounded">
                  -{discountPct}%
                </span>
              </>
            )}
          </div>
        ) : (
          <div className="text-sm sm:text-base text-gray-400 font-medium">
            Prix non disponible
          </div>
        )}

        {/* Stock */}
        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs">
          <span className={cn(
            'w-1.5 h-1.5 rounded-full flex-shrink-0',
            isOutOfStock ? 'bg-red-500' : isLowStock ? 'bg-orange-400' : 'bg-green-500',
          )} />
          <span className={cn(
            isOutOfStock ? 'text-red-500' : isLowStock ? 'text-orange-500' : 'text-green-600',
            'truncate'
          )}>
            {isOutOfStock ? 'Rupture de stock' : isLowStock ? `Stock limité (${product.stock_qty})` : 'En stock'}
          </span>
        </div>

        {/* CTA Button - Disabled if price is 0 or out of stock */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock || isAdding || !hasValidPrice}
          className={cn(
            'mt-auto w-full py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200',
            'flex items-center justify-center gap-1 sm:gap-2',
            'min-h-[2rem] sm:min-h-[2.5rem]',
            isAdded
              ? 'bg-green-500 text-white'
              : (isOutOfStock || !hasValidPrice)
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-[#E94560] text-white hover:bg-[#c73350] active:scale-[0.97]',
          )}
        >
          {isAdded ? (
            <>
              <Check className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="hidden xs:inline">Ajouté !</span>
              <span className="inline xs:hidden">✓</span>
            </>
          ) : isAdding ? (
            <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white/30 border-t-white animate-spin flex-shrink-0" />
          ) : !hasValidPrice ? (
            <span className="text-[10px] sm:text-xs">Prix non disponible</span>
          ) : isOutOfStock ? (
            <span className="text-[10px] sm:text-xs">Indisponible</span>
          ) : (
            <>
              <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="hidden xs:inline">Ajouter</span>
              <span className="hidden sm:inline"> au panier</span>
              <span className="inline xs:hidden">+</span>
            </>
          )}
        </button>
      </div>
    </Link>
  );
}