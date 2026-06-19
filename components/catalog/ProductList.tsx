'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Eye } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { cn, formatPrice } from '@/lib/utils';

interface ProductListProps {
  products: any[];
  media_url?:string
}

export default function ProductList({ products, media_url }: ProductListProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [addingProductId, setAddingProductId] = useState<string | null>(null);

  const handleAddToCart = async (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (addingProductId) return;
    
    // Check if product has valid price
    if (product.price <= 0) return;
    
    setAddingProductId(product.id);
    try {
      // Store ONLY the path (without base URL)
      const imagePath = product.images?.[0]?.url 
        ? (product.images[0].url.startsWith('/') ? product.images[0].url : `/${product.images[0].url}`)
        : undefined;

      await addItem({
        product_id: product.id,
        name: product.name_fr,
        slug: product.slug,
        price: parseFloat(product.price),
        compare_price: product.compare_price ? parseFloat(product.compare_price) : undefined,
        image: imagePath, // Store only the path
        quantity: 1,
      });
    } finally {
      setTimeout(() => setAddingProductId(null), 500);
    }
  };

  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500 text-sm">Aucun produit trouvé.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product, index) => {
        const hasValidPrice = product.price > 0;
        // const isOutOfStock = product.stock_qty === 0;
        const isOutOfStock = false; // Always in stock
        // const isLowStock = product.stock_qty > 0 && product.stock_qty <= 5;
        const isLowStock = false; // Always in stock
        const hasDiscount = !!product.compare_price && product.compare_price > product.price;
        const discountPct = hasDiscount
          ? Math.round((1 - product.price / product.compare_price!) * 100)
          : 0;

        // Get full image URL for display
        const imageUrl = product.images?.[0]?.url 
          ? `${media_url}${product.images[0].url.startsWith('/') ? product.images[0].url : `/${product.images[0].url}`}`
          : undefined;

        return (
          <Link
            key={product.id}
            href={`/catalogue/${product.slug}`}
            className="group flex flex-col sm:flex-row gap-4 bg-white rounded-xl border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 overflow-hidden p-4"
          >
            {/* Image */}
            <div className="relative w-full sm:w-40 h-40 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
              {imageUrl ? (
                <ProductImage
                  src={imageUrl}
                  alt={product.name_fr}
                  priority={index < 2}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                  <ShoppingCart size={32} />
                </div>
              )}
              {hasDiscount && (
                <span className="absolute top-1 left-1 bg-[#E94560] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                  -{discountPct}%
                </span>
              )}
              {/* {isOutOfStock && (
                <span className="absolute top-1 right-1 bg-red-100 text-red-600 text-[9px] font-semibold px-1.5 py-0.5 rounded">
                  Rupture
                </span>
              )} */}
            </div>

            {/* Product Info */}
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-base line-clamp-1 mb-1">
                  {product.name_fr}
                </h3>
                {product?.short_description && (
                <p className="text-gray-500 text-sm line-clamp-2 mb-2">
                  {product.short_description}
                </p>
                )}
                
                {/* Specs summary */}
                {product.specs && (
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                    {product.specs.processor && (
                      <span className="flex items-center gap-1">
                        <span className="font-medium">CPU:</span> {product.specs.processor.split(' ').slice(0, 2).join(' ')}
                      </span>
                    )}
                    {product.specs.ram && (
                      <span className="flex items-center gap-1">
                        <span className="font-medium">RAM:</span> {product.specs.ram}
                      </span>
                    )}
                    {product.specs.storage && (
                      <span className="flex items-center gap-1">
                        <span className="font-medium">Stockage:</span> {product.specs.storage}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Price and Actions */}
              <div className="flex-shrink-0 flex flex-col items-end gap-2">
                {/* Price - Only show if price > 0 */}
                {hasValidPrice ? (
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-[#0F3460]">{formatPrice(product.price)}</span>
                      <span className="text-xs text-gray-500">DH</span>
                    </div>
                    {hasDiscount && (
                      <div className="text-xs text-gray-400 line-through">
                        {formatPrice(product.compare_price!)} DH
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-sm text-gray-400 font-medium">
                    Prix non disponible
                  </div>
                )}

                {/* Stock Status */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span
                    className={cn(
                      'w-1.5 h-1.5 rounded-full',
                      // isOutOfStock
                      //   ? 'bg-red-500'
                      //   : isLowStock
                      //   ? 'bg-orange-400'
                      //   : 'bg-green-500'
                      'bg-green-500' // Always green
                    )}
                  />
                  <span
                    className={cn(
                      // isOutOfStock
                      //   ? 'text-red-500'
                      //   : isLowStock
                      //   ? 'text-orange-500'
                      //   : 'text-green-600'
                      'text-green-600' // Always green
                    )}
                  >
                    {/* {isOutOfStock
                      ? 'Rupture de stock'
                      : isLowStock
                      ? `Plus que ${product.stock_qty}`
                      : 'En stock'} */}
                    En stock ({product.stock_qty} disponible{product.stock_qty > 1 ? 's' : ''})
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    // disabled={isOutOfStock || !hasValidPrice}
                    disabled={!hasValidPrice} // Only disabled if no valid price
                    className={cn(
                      'flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
                      // (isOutOfStock || !hasValidPrice)
                      (!hasValidPrice)
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-[#E94560] text-white hover:bg-[#c73350] active:scale-95'
                    )}
                  >
                    {addingProductId === product.id ? (
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    ) : !hasValidPrice ? (
                      <>
                        <ShoppingCart size={16} />
                        Indisponible
                      </>
                    ) : // isOutOfStock ? (
                    //   <>
                    //     <ShoppingCart size={16} />
                    //     Rupture
                    //   </>
                    // ) : 
                    (
                      <>
                        <ShoppingCart size={16} />
                        Ajouter
                      </>
                    )}
                  </button>
                  <Link
                    href={`/catalogue/${product.slug}`}
                    className="flex items-center justify-center p-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-[#E94560] transition-colors"
                  >
                    <Eye size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function ProductImage({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
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

  return (
    <div ref={imgRef} className="relative w-full h-full">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-200">
          <div className="flex h-full items-center justify-center">
            <div className="h-6 w-6 rounded-full border-2 border-gray-300 border-t-gray-500 animate-spin" />
          </div>
        </div>
      )}

      {shouldLoad && (
        <Image
          src={src}
          alt={alt}
          fill
          loading={priority ? 'eager' : 'lazy'}
          priority={priority}
          quality={priority ? 80 : 70}
          sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          onLoad={() => setLoaded(true)}
          className={cn(
            'object-contain p-2 transition-all duration-300',
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          )}
        />
      )}
    </div>
  );
}