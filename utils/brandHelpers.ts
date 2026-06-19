// utils/brandHelpers.ts
import { brandsImages } from "./data/brands";

interface Brand {
    id: string;
    name: string;
    slug: string;
    logo_url: string | null;
    is_active: boolean;
    createdAt: string;
    updatedAt: string;
}

interface BrandWithImage {
    brand: string;
    src: string;
    name: string;
    id: string;
}

export const getBrandsWithImages = (brands: Brand[]): BrandWithImage[] => {
    return brands
        .map(brand => {
            const image = brandsImages.find(img => 
                img.brand.toLowerCase() === brand.slug.toLowerCase()
            );
            return {
                ...brand,
                brand: brand.slug,
                src: image?.src || '/assets/brands/placeholder.png' // fallback image
            };
        })
        .filter(brand => brand.src); // Only return brands that have images
};