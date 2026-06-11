'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Check, Camera } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useCartStore } from '@/store/useCartStore';
import { cn, formatPrice } from '@/lib/utils';

type Props = {
  media_url?: string,
  product: any
}


export default function ProductCard({ product, media_url }: Props) {
  const locale = useLocale();
  const addItem = useCartStore((s) => s.addItem);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

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
    <>
      {imageLoading && (
        <div className="absolute inset-0 animate-pulse bg-gray-200">
          <div className="flex h-full items-center justify-center">
            <div className="h-8 w-8 rounded-full border-2 border-gray-300 border-t-gray-500 animate-spin" />
          </div>
        </div>
      )}

      <Image
        src={`${media_url}${product.images[0].url}`}
        alt={product.name_fr}
        fill
        className={cn(
          'object-contain p-2 group-hover:scale-105 transition-all duration-300',
          imageLoading ? 'opacity-0' : 'opacity-100'
        )}
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        onLoad={() => setImageLoading(false)}
      />
    </>
  ) : (
    <div className="absolute inset-0 flex items-center justify-center text-gray-200">
      <Camera className="w-8 h-8" />
    </div>
  )}
</div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-3 gap-2">
        <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug min-h-[2.5rem]">
          {product.name_fr}
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