'use client';

import Image from 'next/image';
import { Minus, Plus, X, Camera } from 'lucide-react';
import { useCartStore, type CartItem as CartItemType } from '@/store/useCartStore';
import { formatPrice } from '@/lib/utils';

interface Props {
  item: CartItemType;
}

export default function CartItem({ item }: Props) {
  const updateItem = useCartStore((s) => s.updateItem);
  const removeItem = useCartStore((s) => s.removeItem);

  const decrease = () => {
    if (item.quantity > 1) updateItem(item.product_id, item.quantity - 1);
    else removeItem(item.product_id);
  };

  return (
    <div className="flex gap-3 py-3.5 border-b border-gray-100 last:border-0">
      {/* Image */}
      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
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
            className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:border-[#0F3460] hover:text-[#0F3460] transition"
            aria-label="Diminuer"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-7 text-center text-sm font-semibold text-gray-800 select-none">
            {item.quantity}
          </span>
          <button
            onClick={() => updateItem(item.product_id, item.quantity + 1)}
            className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:border-[#0F3460] hover:text-[#0F3460] transition"
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
        onClick={() => removeItem(item.product_id)}
        className="flex-shrink-0 self-start p-1 mt-0.5 text-gray-300 hover:text-red-500 transition rounded"
        aria-label="Supprimer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
