'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Check, Eye } from 'lucide-react';
import { useState } from 'react';
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
    
    setAddingProductId(product.id);
    try {
      await addItem(product.id);
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
      {products.map((product) => {
        const isOutOfStock = product.stock_qty === 0;
        const isLowStock = product.stock_qty > 0 && product.stock_qty <= 5;
        const hasDiscount = !!product.compare_price && product.compare_price > product.price;
        const discountPct = hasDiscount
          ? Math.round((1 - product.price / product.compare_price!) * 100)
          : 0;

        const productSlug = product.id + '-' + product.slug
const categorySlug = product.category?.toLowerCase() || 'product';

        return (
          <Link
            key={product.id}
            href={`/catalogue/${categorySlug}/${productSlug}`}
            className="group flex flex-col sm:flex-row gap-4 bg-white rounded-xl border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 overflow-hidden p-4"
          >
            {/* Image */}
            <div className="relative w-full sm:w-40 h-40 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
              {product.images?.[0] ? (
                <Image
                  src={`${media_url}${product.images[0].url}`}
                  alt={product.name_fr}
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
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
              {isOutOfStock && (
                <span className="absolute top-1 right-1 bg-red-100 text-red-600 text-[9px] font-semibold px-1.5 py-0.5 rounded">
                  Rupture
                </span>
              )}
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

                {/* Stock Status */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span
                    className={cn(
                      'w-1.5 h-1.5 rounded-full',
                      isOutOfStock
                        ? 'bg-red-500'
                        : isLowStock
                        ? 'bg-orange-400'
                        : 'bg-green-500'
                    )}
                  />
                  <span
                    className={cn(
                      isOutOfStock
                        ? 'text-red-500'
                        : isLowStock
                        ? 'text-orange-500'
                        : 'text-green-600'
                    )}
                  >
                    {isOutOfStock
                      ? 'Rupture de stock'
                      : isLowStock
                      ? `Plus que ${product.stock_qty}`
                      : 'En stock'}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={isOutOfStock}
                    className={cn(
                      'flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
                      isOutOfStock
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-[#E94560] text-white hover:bg-[#c73350] active:scale-95'
                    )}
                  >
                    {addingProductId === product.id ? (
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    ) : (
                      <>
                        <ShoppingCart size={16} />
                        Ajouter
                      </>
                    )}
                  </button>
                  <Link
                    href={`/catalogue/${categorySlug}/${productSlug}`}
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