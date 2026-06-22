// components/BrandsMarquee.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { getBrandsWithImages } from '@/utils/brandHelpers';

interface BrandsMarqueeProps {
    brands: any[];
}

export default function BrandsMarquee({ brands }: BrandsMarqueeProps) {
    const [brandsWithImages, setBrandsWithImages] = useState<any[]>([]);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    

    useEffect(() => {
        if (brands && brands.length > 0) {
            const mappedBrands = getBrandsWithImages(brands);
            setBrandsWithImages(mappedBrands);
        }
    }, [brands]);

    if (!brandsWithImages || brandsWithImages.length === 0) {
        return null;
    }

    // Double the array for seamless looping
    const duplicatedBrands = [...brandsWithImages, ...brandsWithImages];

    return (
        <div className="w-full overflow-hidden bg-gray-50 py-8 md:py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
                    Our Trusted Brands
                </h2>
                
                <div 
                    className="relative overflow-hidden"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div
                        ref={marqueeRef}
                        className="flex gap-6 lg:gap-10 items-center"
                        style={{
                            animation: `marquee 30s linear infinite ${isPaused ? 'paused' : 'running'}`,
                            width: 'max-content'
                        }}
                    >
                        {duplicatedBrands.map((brand, index) => (
                            <div
                                key={`${brand.id}-${index}`}
                                className="flex-shrink-0 w-32 md:w-40 h-20 md:h-24 relative hover:scale-105 transition-all duration-300"
                            >
                                <Image
                                    src={brand.src}
                                    alt={brand.name || brand.brand}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 8rem, 10rem"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
        </div>
    );
}