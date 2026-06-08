import type { Metadata } from 'next';
import MobileFilterDrawer from './MobileFilterDrawer';
import FilterSidebar, { type Category, type Brand } from '@/components/catalog/FilterSidebar';
import SortBar from '@/components/catalog/SortBar';
import ProductGrid from '@/components/catalog/ProductGrid';
import Pagination from '@/components/catalog/Pagination';
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

interface ProductsResponse {
  products?: Product[];
  data?: Product[];
  total?: number;
  totalPages?: number;
  page?: number;
  limit?: number;
}

interface Props {
  params: { locale: string };
  searchParams: Record<string, string | string[] | undefined>;
}

function str(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const search = str(searchParams.search);
  const category = str(searchParams.category);

  if (search) {
    return { title: `Résultats pour "${search}" — IRIS.MA` };
  }
  if (category) {
    // We don't have the name here without an extra fetch — use slug as fallback
    return { title: `${category} — IRIS.MA` };
  }
  return {
    title: 'Catalogue — Matériel informatique | IRIS.MA',
    description:
      'Parcourez notre catalogue complet de matériel informatique : imprimantes, ordinateurs, accessoires et bien plus. Livraison partout au Maroc.',
  };
}

export default async function CataloguePage({ params: { locale }, searchParams }: Props) {
  const search = str(searchParams.search);
  const category = str(searchParams.category);
  const brand = str(searchParams.brand);
  const min_price = str(searchParams.min_price);
  const max_price = str(searchParams.max_price);
  const in_stock = str(searchParams.in_stock);
  const sort = str(searchParams.sort) ?? 'newest';
  const page = Number(str(searchParams.page) ?? '1');

  const productParams = new URLSearchParams();
  if (search) productParams.set('search', search);
  if (category) productParams.set('category', category);
  if (brand) productParams.set('brand', brand);
  if (min_price) productParams.set('min_price', min_price);
  if (max_price) productParams.set('max_price', max_price);
  if (in_stock) productParams.set('in_stock', in_stock);
  productParams.set('sort', sort);
  productParams.set('page', String(page));
  productParams.set('limit', '24');

  const [productsRes, categoriesRes, brandsRes] = await Promise.all([
    safeFetch<ProductsResponse>(`${API}/api/products?${productParams.toString()}`, {}),
    safeFetch<unknown>(`${API}/api/categories`, []),
    safeFetch<unknown>(`${API}/api/brands`, []),
  ]);

  const norm = <T,>(r: unknown, key: string): T[] => {
    if (Array.isArray(r)) return r as T[];
    if (r && typeof r === 'object') {
      const obj = r as Record<string, unknown>;
      if (Array.isArray(obj[key])) return obj[key] as T[];
      if (Array.isArray(obj['data'])) return obj['data'] as T[];
    }
    return [];
  };

  const products: Product[] = norm<Product>(
    productsRes,
    'products',
  ).length
    ? norm<Product>(productsRes, 'products')
    : (productsRes as ProductsResponse).products ?? [];

  const total = (productsRes as ProductsResponse).total ?? products.length;
  const totalPages = (productsRes as ProductsResponse).totalPages ?? Math.ceil(total / 24);
  const categories = norm<Category>(categoriesRes, 'categories');
  const brands = norm<Brand>(brandsRes, 'brands');

  const currentFilters = { category, brand, min_price, max_price, in_stock };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {search ? `Résultats pour "${search}"` : 'Catalogue'}
        </h1>
        {search && (
          <p className="text-sm text-gray-500 mt-1">{total} produit{total !== 1 ? 's' : ''} trouvé{total !== 1 ? 's' : ''}</p>
        )}
      </div>

      <div className="flex gap-8">
        {/* Filter sidebar — desktop */}
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

          <Pagination
            total={total}
            page={page}
            limit={24}
            totalPages={totalPages}
          />
        </div>
      </div>

      {/* Mobile filter drawer trigger */}
      <MobileFilterDrawer
        categories={categories}
        brands={brands}
        currentFilters={currentFilters}
        locale={locale}
      />
    </div>
  );
}

