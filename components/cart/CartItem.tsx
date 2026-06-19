'use client';

import Image from 'next/image';
import { Minus, Plus, X, Camera } from 'lucide-react';
import { useCartStore, type CartItem as CartItemType } from '@/store/useCartStore';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';

interface Props {
  item: CartItemType;
  media_url?: string; // Add media_url prop
}

export default function CartItem({ item, media_url }: Props) {
  const updateItem = useCartStore((s) => s.updateItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const [isUpdating, setIsUpdating] = useState(false);

  // Build the full image URL
  const getFullImageUrl = () => {
    if (!item.image) return undefined;
    
    // If it's already a full URL, return it
    if (item.image.startsWith('http://') || item.image.startsWith('https://')) {
      return item.image;
    }
    
    // Add the media_url prefix
    return `${media_url || ''}${item.image.startsWith('/') ? item.image : `/${item.image}`}`;
  };

  const imageUrl = getFullImageUrl();

  const decrease = () => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      if (item.quantity > 1) {
        updateItem(item.product_id, item.quantity - 1);
      } else {
        removeItem(item.product_id);
      }
    } finally {
      // Use setTimeout to avoid flash of loading state
      setTimeout(() => setIsUpdating(false), 300);
    }
  };

  const increase = () => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      updateItem(item.product_id, item.quantity + 1);
    } finally {
      setTimeout(() => setIsUpdating(false), 300);
    }
  };

  const handleRemove = () => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      removeItem(item.product_id);
    } finally {
      setTimeout(() => setIsUpdating(false), 300);
    }
  };

  return (
    <div className={`flex gap-3 py-3.5 border-b border-gray-100 last:border-0 relative ${isUpdating ? 'opacity-50' : ''}`}>
      {isUpdating && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
          <div className="w-5 h-5 border-2 border-gray-200 border-t-[#E94560] rounded-full animate-spin" />
        </div>
      )}
      
      {/* Image */}
      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            className="object-contain p-1.5"
            sizes="64px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
            <Camera className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">{item.name}</p>
        <p className="text-sm font-bold text-[#0F3460] mt-0.5">{formatPrice(item.price)}</p>

        {/* Quantity stepper */}
        <div className="flex items-center gap-1.5 mt-2">
          <button
            onClick={decrease}
            disabled={isUpdating}
            className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:border-[#0F3460] hover:text-[#0F3460] transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Diminuer"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-7 text-center text-sm font-semibold text-gray-800 select-none">
            {item.quantity}
          </span>
          <button
            onClick={increase}
            disabled={isUpdating}
            className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:border-[#0F3460] hover:text-[#0F3460] transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Augmenter"
          >
            <Plus className="w-3 h-3" />
          </button>
          <span className="ms-1 text-xs text-gray-400">
            = {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>

      {/* Remove */}
      <button
        onClick={handleRemove}
        disabled={isUpdating}
        className="flex-shrink-0 self-start p-1 mt-0.5 text-gray-300 hover:text-red-500 transition rounded disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Supprimer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}