import Link from 'next/link';
import { ArrowRight, Shield, Truck, RotateCcw, Headphones } from 'lucide-react';
import ProductCard, { type Product } from '@/components/catalog/ProductCard';
import { categories } from '@/data/categories';
import Hero from '@/components/home/Hero';

export const revalidate = 3600;

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

async function safeFetch<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return fallback;
    return res.json();
  } catch {
    return fallback;
  }
}

interface Category {
  id: number;
  name_fr: string;
  name_ar: string;
  slug: string;
}

interface Props {
  params: { locale: string };
}

export default async function HomePage({ params: { locale } }: Props) {
  const [catRes, featuredRes, inStockRes] = await Promise.all([
    safeFetch<unknown>(`${API}/api/categories`, []),
    safeFetch<unknown>(`${API}/api/products?limit=8&sort=newest`, []),
    safeFetch<unknown>(`${API}/api/products?limit=8&in_stock=true&sort=newest`, []),
  ]);

  // Tolerate different API envelope shapes: { categories: [] } | { data: [] } | []
  const norm = <T,>(r: unknown, key: string): T[] => {
    if (Array.isArray(r)) return r as T[];
    if (r && typeof r === 'object') {
      const obj = r as Record<string, unknown>;
      if (Array.isArray(obj[key])) return obj[key] as T[];
      if (Array.isArray(obj['data'])) return obj['data'] as T[];
    }
    return [];
  };

  // const categories = norm<Category>(catRes, 'categories');
  const featuredProducts = norm<Product>(featuredRes, 'products');
  const inStockProducts = norm<Product>(inStockRes, 'products');

  return (
    <div>
      {/* ── Hero ── */}
      <Hero locale={locale} />

      {/* ── Trust badges ── */}
      <section className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
            {[
              { Icon: Truck, label: 'Livraison rapide', sub: 'Partout au Maroc' },
              { Icon: Shield, label: 'Garantie officielle', sub: 'Produits authentiques' },
              { Icon: RotateCcw, label: 'Retours faciles', sub: 'Sous 14 jours' },
              { Icon: Headphones, label: 'Support client', sub: 'Lun–Ven 9h–18h' },
            ].map(({ Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 px-4 py-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#0F3460]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{label}</p>
                  <p className="text-xs text-gray-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── Featured products ── */}
      {featuredProducts.length > 0 && (
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
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── B2B promo banner ── */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-[#0F3460] to-[#1a4a8a] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-300">Espace entreprises</span>
            <h3 className="text-2xl font-bold text-white mt-1 mb-2">Solutions B2B pour votre entreprise</h3>
            <p className="text-blue-200 text-sm max-w-md">
              Tarifs préférentiels, facturation sur bon de commande, livraison express. Notre équipe dédiée vous accompagne.
            </p>
          </div>
          <Link
            href={`/${locale}/b2b`}
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-[#E94560] text-white font-semibold rounded-xl hover:bg-[#c73350] transition text-sm"
          >
            En savoir plus <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── In-stock / quick-delivery products ── */}
      {inStockProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <div className="flex items-center justify-between mb-7">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Disponible immédiatement</h2>
              <p className="text-sm text-gray-500 mt-0.5">Expédition sous 24–48h</p>
            </div>
            <Link href={`/${locale}/catalogue?in_stock=true`} className="text-sm font-medium text-[#0F3460] hover:underline flex items-center gap-1">
              Tout voir <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {inStockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
