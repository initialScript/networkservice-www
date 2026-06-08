import Link from 'next/link'
import React from 'react'
import ProductCard from '../catalog/ProductCard'
import { ArrowRight } from 'lucide-react';

export interface Product {
  id: number;
  name_fr: string;
  name_ar: string;
  slug: string;
  price: number;
  compare_price?: number;
  stock_qty: number;
  image?: { url: string; alt: string };
}

type Props = {
    locale: string
    products: Product[] | any
}

const FeaturedProductsSection = ({products, locale}: Props) => {
  return (
    <section className="bg-[#F8F9FA]">
          <div className="max-w-7xl mx-auto px-4 py-14">
            <div className="flex items-center justify-between mb-7">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Nouveaux produits</h2>
                <p className="text-sm text-gray-500 mt-0.5">Les dernières arrivées dans notre catalogue</p>
              </div>
              <Link href={`/${locale}/catalogue?sort=newest`} className="text-sm font-medium text-[#0F3460] hover:underline flex items-center gap-1">
                Tout voir <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {products.map((product:any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
  )
}

export default FeaturedProductsSection