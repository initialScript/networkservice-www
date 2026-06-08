import Link from 'next/link';
import { ArrowRight, Shield, Truck, RotateCcw, Headphones } from 'lucide-react';
import ProductCard, { type Product } from '@/components/catalog/ProductCard';

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

  const categories = norm<Category>(catRes, 'categories');
  const featuredProducts = norm<Product>(featuredRes, 'products');
  const inStockProducts = norm<Product>(inStockRes, 'products');

  return (
    <div>
      {/* ── Hero ── */}
      <section className="bg-[#0F3460]">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-start">
            <span className="inline-block mb-4 text-xs font-bold tracking-widest uppercase text-[#E94560] bg-[#E94560]/10 border border-[#E94560]/20 px-3 py-1 rounded-full">
              Nouveautés 2025
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              Votre matériel informatique<br />
              <span className="text-[#E94560]">livré partout au Maroc</span>
            </h1>
            <p className="text-blue-200 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              Imprimantes, ordinateurs, accessoires — qualité garantie, prix compétitifs, livraison rapide.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href={`/${locale}/catalogue`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#E94560] text-white font-semibold rounded-xl hover:bg-[#c73350] transition text-sm"
              >
                Voir le catalogue <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/${locale}/b2b`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition text-sm"
              >
                Espace B2B
              </Link>
            </div>
          </div>

          {/* Hero visual placeholder */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <div className="w-80 h-64 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 text-sm italic">
              {/* TODO: hero product or banner image */}
              Image produit
            </div>
          </div>
        </div>
      </section>

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

      {/* ── Category grid ── */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-14">
          <div className="flex items-center justify-between mb-7">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Nos catégories</h2>
              <p className="text-sm text-gray-500 mt-0.5">Trouvez le produit qu&apos;il vous faut</p>
            </div>
            <Link href={`/${locale}/catalogue`} className="text-sm font-medium text-[#0F3460] hover:underline flex items-center gap-1">
              Tout voir <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.slice(0, 12).map((cat) => (
              <Link
                key={cat.slug}
                href={`/${locale}/catalogue/${cat.slug}`}
                className="group flex flex-col items-center gap-2.5 p-4 bg-white rounded-xl border border-gray-100 hover:border-[#0F3460] hover:shadow-md transition-all text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-[#0F3460] transition-colors flex items-center justify-center text-2xl">
                  {/* TODO: replace emoji with category image/icon */}
                  📦
                </div>
                <span className="text-xs font-medium text-gray-700 group-hover:text-[#0F3460] leading-snug line-clamp-2 transition-colors">
                  {locale === 'ar' ? cat.name_ar : cat.name_fr}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

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
