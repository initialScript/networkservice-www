import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FilterSidebar, { type Category, type Brand } from '@/components/catalog/FilterSidebar';
import SortBar from '@/components/catalog/SortBar';
import ProductGrid from '@/components/catalog/ProductGrid';
import Pagination from '@/components/catalog/Pagination';
import Breadcrumb from '@/components/ui/Breadcrumb';
import MobileFilterDrawer from '../MobileFilterDrawer';
import type { Product } from '@/components/catalog/ProductCard';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

async function safeFetch<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return fallback;
    return res.json();
  } catch {
    return fallback;
  }
}

interface CategoryDetail {
  id: number;
  slug: string;
  name_fr: string;
  name_ar: string;
  description_fr?: string;
}

interface Props {
  params: { locale: string; slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}

function str(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await safeFetch<CategoryDetail | null>(
    `${API}/api/categories/${params.slug}`,
    null,
  );
  if (!category) return { title: 'Catalogue — IRIS.MA' };
  return {
    title: `${category.name_fr} — IRIS.MA`,
    description: `Découvrez notre gamme ${category.name_fr} : large choix de produits avec livraison rapide partout au Maroc.`,
    openGraph: {
      title: `${category.name_fr} — IRIS.MA`,
      description: `Découvrez notre gamme ${category.name_fr}.`,
    },
  };
}

export default async function CategoryPage({ params: { locale, slug }, searchParams }: Props) {
  const brand = str(searchParams.brand);
  const min_price = str(searchParams.min_price);
  const max_price = str(searchParams.max_price);
  const in_stock = str(searchParams.in_stock);
  const sort = str(searchParams.sort) ?? 'newest';
  const page = Number(str(searchParams.page) ?? '1');

  const productParams = new URLSearchParams({ category: slug, sort, page: String(page), limit: '24' });
  if (brand) productParams.set('brand', brand);
  if (min_price) productParams.set('min_price', min_price);
  if (max_price) productParams.set('max_price', max_price);
  if (in_stock) productParams.set('in_stock', in_stock);

  const [categoryData, productsRes, categoriesRes, brandsRes] = await Promise.all([
    safeFetch<CategoryDetail | null>(`${API}/api/categories/${slug}`, null),
    safeFetch<{ products?: Product[]; total?: number; totalPages?: number }>(
      `${API}/api/products?${productParams.toString()}`, {},
    ),
    safeFetch<unknown>(`${API}/api/categories`, []),
    safeFetch<unknown>(`${API}/api/brands`, []),
  ]);

  if (!categoryData) notFound();

  const norm = <T,>(r: unknown, key: string): T[] => {
    if (Array.isArray(r)) return r as T[];
    if (r && typeof r === 'object') {
      const obj = r as Record<string, unknown>;
      if (Array.isArray(obj[key])) return obj[key] as T[];
      if (Array.isArray(obj['data'])) return obj['data'] as T[];
    }
    return [];
  };

  const products: Product[] = productsRes.products ?? norm<Product>(productsRes, 'products');
  const total = productsRes.total ?? products.length;
  const totalPages = productsRes.totalPages ?? Math.ceil(total / 24);
  const categories = norm<Category>(categoriesRes, 'categories');
  const brands = norm<Brand>(brandsRes, 'brands');

  const categoryName = locale === 'ar' ? categoryData.name_ar : categoryData.name_fr;
  const currentFilters = { category: slug, brand, min_price, max_price, in_stock };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Accueil', href: `/${locale}` },
          { label: 'Catalogue', href: `/${locale}/catalogue` },
          { label: categoryName },
        ]}
      />

      {/* Category header */}
      <div className="mt-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{categoryName}</h1>
        {categoryData.description_fr && (
          <p className="text-sm text-gray-500 mt-1">{categoryData.description_fr}</p>
        )}
      </div>

      <div className="flex gap-8">
        {/* Sidebar — desktop */}
        <div className="hidden lg:block w-[260px] flex-shrink-0">
          <FilterSidebar
            categories={categories}
            brands={brands}
            currentFilters={currentFilters}
            locale={locale}
          />
        </div>

        {/* Main */}
        <div className="flex-1 min-w-0">
          <SortBar total={total} currentSort={sort} />
          <div className="mt-5">
            <ProductGrid products={products} />
          </div>
          <Pagination total={total} page={page} limit={24} totalPages={totalPages} />
        </div>
      </div>

      {/* Mobile drawer */}
      <MobileFilterDrawer
        categories={categories}
        brands={brands}
        currentFilters={currentFilters}
        locale={locale}
      />
    </div>
  );
}
