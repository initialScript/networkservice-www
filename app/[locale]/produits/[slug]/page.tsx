import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductGallery, { type ProductImage } from '@/components/product/ProductGallery';
import ProductInfo, { type ProductDetail } from '@/components/product/ProductInfo';
import ProductSpecs, { type ProductSpec } from '@/components/product/ProductSpecs';
import ProductGrid from '@/components/catalog/ProductGrid';
import type { Product } from '@/components/catalog/ProductCard';

export const revalidate = 1800;

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

async function safeFetch<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url, { next: { revalidate: 1800 } });
    if (!res.ok) return fallback;
    return res.json();
  } catch {
    return fallback;
  }
}

interface FullProduct extends ProductDetail {
  images?: ProductImage[];
  meta_description?: string;
  specs?: ProductSpec[];
  attributes?: Record<string, string>;
}

interface Props {
  params: { locale: string; slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await safeFetch<FullProduct | null>(
    `${API}/api/products/${params.slug}`,
    null,
  );
  if (!data) return { title: 'Produit introuvable — IRIS.MA' };

  const name = data.name_fr;
  const description =
    data.meta_description ?? (data.description ? data.description.slice(0, 160) : undefined);
  const image = data.images?.[0]?.url;

  return {
    title: `${name} — IRIS.MA`,
    description,
    openGraph: {
      title: `${name} — IRIS.MA`,
      description,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    other: {
      'product:price:amount': String(data.price),
      'product:price:currency': 'MAD',
    },
  };
}

export default async function ProductPage({ params: { locale, slug } }: Props) {
  const [productData, relatedData] = await Promise.all([
    safeFetch<FullProduct | null>(`${API}/api/products/${slug}`, null),
    safeFetch<unknown>(`${API}/api/products/${slug}/related`, []),
  ]);

  if (!productData) notFound();

  const norm = <T,>(r: unknown, key: string): T[] => {
    if (Array.isArray(r)) return r as T[];
    if (r && typeof r === 'object') {
      const obj = r as Record<string, unknown>;
      if (Array.isArray(obj[key])) return obj[key] as T[];
      if (Array.isArray(obj['data'])) return obj['data'] as T[];
    }
    return [];
  };

  const related = norm<Product>(relatedData, 'products').slice(0, 6);

  // Normalise images
  const images: ProductImage[] =
    productData.images && productData.images.length > 0
      ? productData.images
      : [];

  // Normalise specs: support both ProductSpec[] and Record<string,string>
  const specs: ProductSpec[] = productData.specs
    ? productData.specs
    : productData.attributes
    ? Object.entries(productData.attributes).map(([key, value]) => ({ key, value }))
    : [];

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productData.name_fr,
    description: productData.description,
    sku: productData.sku,
    ...(productData.brand ? { brand: { '@type': 'Brand', name: productData.brand.name } } : {}),
    offers: {
      '@type': 'Offer',
      price: productData.price,
      priceCurrency: 'MAD',
      availability:
        productData.stock_qty > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 2-col product section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <ProductGallery images={images} productName={productData.name_fr} />

          {/* Info (client component — interactivity) */}
          <ProductInfo product={productData} locale={locale} />
        </div>

        {/* Specs */}
        <ProductSpecs specs={specs} />

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Produits similaires</h2>
            <ProductGrid products={related} columns="related" />
          </section>
        )}
      </div>
    </>
  );
}
