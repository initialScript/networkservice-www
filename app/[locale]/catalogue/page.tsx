import type { Metadata } from 'next';
import CatalogueClient from './CatalogueClient';
import { getAllProducts, getCategories } from '@/lib/api/products';

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

    const brands = [
    {
      id: 1,
      name: 'Apple',
      slug: 'apple',
      logo: '/brands/apple.svg',
      productCount: 156,
    },
    {
      id: 2,
      name: 'Dell',
      slug: 'dell',
      logo: '/brands/dell.svg',
      productCount: 89,
    },
    {
      id: 3,
      name: 'ASUS',
      slug: 'asus',
      logo: '/brands/asus.svg',
      productCount: 124,
    },
    {
      id: 4,
      name: 'HP',
      slug: 'hp',
      logo: '/brands/hp.svg',
      productCount: 98,
    },
    {
      id: 5,
      name: 'Lenovo',
      slug: 'lenovo',
      logo: '/brands/lenovo.svg',
      productCount: 112,
    },
    {
      id: 6,
      name: 'Acer',
      slug: 'acer',
      logo: '/brands/acer.svg',
      productCount: 76,
    },
    {
      id: 7,
      name: 'MSI',
      slug: 'msi',
      logo: '/brands/msi.svg',
      productCount: 54,
    },
    {
      id: 8,
      name: 'Razer',
      slug: 'razer',
      logo: '/brands/razer.svg',
      productCount: 32,
    },
    {
      id: 9,
      name: 'Microsoft',
      slug: 'microsoft',
      logo: '/brands/microsoft.svg',
      productCount: 28,
    },
    {
      id: 10,
      name: 'LG',
      slug: 'lg',
      logo: '/brands/lg.svg',
      productCount: 45,
    },
  ];


  // Filter and paginate products on the server
const params: Record<string, string> = {
  page: page.toString(),
  limit: "20",
};

if (search) params.search = search;
if (category) params.category = category;
if (brand) params.brand = brand;
if (min_price) params.min_price = min_price;
if (max_price) params.max_price = max_price;
if (in_stock) params.in_stock = in_stock;
if (sort) params.sort = sort;

  const categories = await getCategories()
const { data: products, pagination } = await getAllProducts(params);
  const currentFilters = { 
    search, 
    category, 
    brand, 
    min_price, 
    max_price, 
    in_stock, 
    sort, 
    page 
  };

  const media_url = process.env.NEXT_PUBLIC_MEDIA_URL

  const selectedCategory = categories.find(
    (c:any) => c.slug === category
  );

  const filteredProducts = category
  ? products.filter((product: any) =>
      product.categories.some(
        (c: any) => c.slug === category
      )
    )
  : products;

  return (
    <CatalogueClient
  initialProducts={filteredProducts}
  totalProducts={pagination.total}
  totalPages={pagination.totalPages}
  currentPage={pagination.page}
  currentSort={sort}
  currentFilters={currentFilters}
  categories={categories}
  brands={brands}
      locale={locale}
      media_url={media_url}
/>
  );
}