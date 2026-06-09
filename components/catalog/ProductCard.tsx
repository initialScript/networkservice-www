'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Check, Camera } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useCartStore } from '@/store/useCartStore';
import { cn, formatPrice } from '@/lib/utils';


export default function ProductCard({ product }: any) {
  const locale = useLocale();
  const addItem = useCartStore((s) => s.addItem);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const name = locale === 'ar' ? product.name_ar : product.name_fr;
  const isOutOfStock = product.stock_qty === 0;
  const isLowStock = product.stock_qty > 0 && product.stock_qty <= 5;
  const hasDiscount = !!product.compare_price && product.compare_price > product.price;
  const discountPct = hasDiscount
    ? Math.round((1 - product.price / product.compare_price!) * 100)
    : 0;


  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock || isAdding || isAdded) return;
    setIsAdding(true);
    try {
      await addItem(product.id);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch {
      // TODO: surface error toast
    } finally {
      setIsAdding(false);
    }
  };

 const productSlug = product.id + '-' + product.slug
const categorySlug = product.category?.toLowerCase() || 'product';


  return (
    <Link
      href={`/catalogue/${categorySlug}/${productSlug}`}
      className="group flex flex-col bg-white rounded-xl border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 overflow-hidden"
    >
      {/* Image - Smaller */}
      <div className="relative h-40 sm:h-48 md:h-52 bg-gray-100 overflow-hidden">
        {product.images ? (
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-200">
            <Camera className="w-8 h-8" />
          </div>
        )}

        {hasDiscount && (
          <span className="absolute top-2 start-2 bg-[#E94560] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
            PROMO
          </span>
        )}
        {isOutOfStock && (
          <span className="absolute top-2 end-2 bg-red-100 text-red-600 text-[10px] font-semibold px-1.5 py-0.5 rounded-md">
            Rupture
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-3 gap-2">
        <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug min-h-[2.5rem]">
          {product.title}
        </p>

        {/* Price */}
        <div className="flex items-end gap-1.5 flex-wrap">
          <span className="text-base font-bold text-[#0F3460]">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <>
              <span className="text-xs text-gray-400 line-through leading-relaxed">
                {formatPrice(product.compare_price!)}
              </span>
              <span className="text-[10px] font-bold text-[#E94560] bg-orange-50 px-1 py-0.5 rounded">
                -{discountPct}%
              </span>
            </>
          )}
        </div>

        {/* Stock */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className={cn(
            'w-1.5 h-1.5 rounded-full flex-shrink-0',
            isOutOfStock ? 'bg-red-500' : isLowStock ? 'bg-orange-400' : 'bg-green-500',
          )} />
          <span className={cn(
            isOutOfStock ? 'text-red-500' : isLowStock ? 'text-orange-500' : 'text-green-600',
          )}>
            {isOutOfStock ? 'Rupture de stock' : isLowStock ? `Stock limité (${product.stock_qty})` : 'En stock'}
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock || isAdding}
          className={cn(
            'mt-auto flex items-center justify-center gap-2 w-full py-2 rounded-lg text-sm font-semibold transition-all duration-200',
            isAdded
              ? 'bg-green-500 text-white'
              : isOutOfStock
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-[#E94560] text-white hover:bg-[#c73350] active:scale-[0.97]',
          )}
        >
          {isAdded ? (
            <><Check className="w-4 h-4" /> Ajouté !</>
          ) : isAdding ? (
            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : (
            <><ShoppingCart className="w-4 h-4" /> Ajouter au panier</>
          )}
        </button>
      </div>
    </Link>
  );
}