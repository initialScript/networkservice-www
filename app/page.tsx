import Link from 'next/link';
import { ArrowRight, ChevronRight} from 'lucide-react';
import ProductCard from '@/components/catalog/ProductCard';
import Hero from '@/components/home/Hero';
import HomeBadge from '@/components/home/HomeBadge';
import Services from '@/components/home/Services';
import {
  getAllProducts,
  getCategories,
  getRecentProducts,
} from '@/lib/api/products';
import ProductCarousel from '@/components/products/ProductCarousel';
import ProductsByCategories from '@/components/home/ProductsByCategories';
import BrandsMarquee from '@/components/home/BrandsMarquee';
import { getBrands } from '@/lib/api/brands';
import CategoriesGrid from '@/components/home/CategoriesGrid';

import Featured from '@/components/home/featured';
import Contact from '@/components/Contact';

export const revalidate = 3600;

interface Props {
  params: { locale: string };
}

export default async function HomePage({ params: { locale } }: Props) {
const [recentProducts, categories, brands, inStockProducts] =
  await Promise.all([
    getRecentProducts(),
    getCategories(),
    getBrands(),
    getAllProducts({
      in_stock: "true",
      limit: "100",
    }),
  ]);

  const media_url =process.env.NEXT_PUBLIC_MEDIA_URL
  process.env.NEXT_PUBLIC_MEDIA_URL
  


  return (
    <div>
      {/* ── Hero ── */}
      <Hero locale={locale} />

      <BrandsMarquee brands={brands} />

      <HomeBadge />

      {/* Recent PRODUCTS */}
      <div className='w-full max-w-7xl mx-auto px-4 lg:px-0 mt-4'>
        <ProductCarousel products={recentProducts.slice(0, 8)} media_url={media_url} title='Nouveaux produits' subTitle='Découvrez nos nouveaux produits' />
      </div>

      <CategoriesGrid />
      
        {/* PRODUCTS BY CATEGORIES */}
      <div className='mt-6 lg:mt-12'>
        <div className='w-full max-w-7xl mx-auto px-4 lg:px-0'>
          <div className="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            Découvrez nos produits par catégorie
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-1">
            Découvrez nos produits par catégorie
          </p>
        </div>
        <Link 
          href="/catalogue" 
          className="text-sm font-medium text-[#0F3460] hover:underline flex items-center gap-1"
        >
          Tout voir
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
          
        <ProductsByCategories  categories={categories} media_url={media_url} />
        </div>
        </div>

          <Featured />

      {/* SERVICES */}
      <Services />

      {/* Contact */}
          <Contact />

      {/* ── In-stock / quick-delivery products ── */}
      {inStockProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <div className="flex items-center justify-between mb-7">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Disponible immédiatement</h2>
              <p className="text-sm text-gray-500 mt-0.5">Expédition sous 24–48h</p>
            </div>
            <Link href={`/catalogue?in_stock=true`} className="text-sm font-medium text-[#0F3460] hover:underline flex items-center gap-1">
              Tout voir <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {inStockProducts.map((product:any) => (
              <ProductCard key={product.id} product={product} media_url={media_url} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
