'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface ProductImage {
  url: string;
  alt?: string;
}

interface Props {
  images: ProductImage[];
  productName: string;
}

export default function ProductGallery({ images, productName }: Props) {
  const [active, setActive] = useState(0);
  const hasMany = images.length > 1;

  const mainImage = images[active] ?? images[0];

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square w-full bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {mainImage ? (
          <Image
            src={mainImage.url}
            alt={mainImage.alt ?? productName}
            fill
            className="object-contain p-6"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-200 text-sm italic">
            Pas d&apos;image
          </div>
        )}
      </div>

      {/* Thumbnails — CSS scroll-snap, no library */}
      {hasMany && (
        <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                'snap-start flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden bg-white transition-all',
                i === active
                  ? 'border-[#0F3460] shadow-sm'
                  : 'border-gray-100 hover:border-gray-300',
              )}
              aria-label={`Image ${i + 1}`}
            >
              <Image
                src={img.url}
                alt={img.alt ?? `${productName} ${i + 1}`}
                width={64}
                height={64}
                className="object-contain w-full h-full p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
