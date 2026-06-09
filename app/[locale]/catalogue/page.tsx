import type { Metadata } from 'next';
import { Suspense } from 'react';
import CatalogueClient from './CatalogueClient';
import { fakeProducts } from '@/data/products';

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

  const categories = [
    {
      id: 1,
      name_fr: 'Laptop',
      slug: 'laptop',
      name_ar: 'حاسوب محمول',
      productCount: 156,
      icon: 'Laptop',
    },
    {
      id: 2,
      name_fr: 'Desktop',
      slug: 'desktop',
      name_ar: 'حاسوب مكتبي',
      productCount: 89,
      icon: 'Monitor',
    },
    {
      id: 3,
      name_fr: 'Gaming',
      slug: 'gaming',
      name_ar: 'ألعاب',
      productCount: 124,
      icon: 'Gamepad',
    },
    {
      id: 4,
      name_fr: 'Accessoires',
      slug: 'accessories',
      name_ar: 'إكسسوارات',
      productCount: 234,
      icon: 'Smartphone',
    },
    {
      id: 5,
      name_fr: 'Composants PC',
      slug: 'components',
      name_ar: 'مكونات الكمبيوتر',
      productCount: 187,
      icon: 'Cpu',
    },
    {
      id: 6,
      name_fr: 'Périphériques',
      slug: 'peripherals',
      name_ar: 'الأجهزة الطرفية',
      productCount: 145,
      icon: 'Keyboard',
    },
    {
      id: 7,
      name_fr: 'Stockage',
      slug: 'storage',
      name_ar: 'تخزين',
      productCount: 98,
      icon: 'HardDrive',
    },
    {
      id: 8,
      name_fr: 'Moniteurs',
      slug: 'monitors',
      name_ar: 'شاشات',
      productCount: 76,
      icon: 'Monitor',
    },
    {
      id: 9,
      name_fr: 'Imprimantes',
      slug: 'printers',
      name_ar: 'طابعات',
      productCount: 54,
      icon: 'Printer',
    },
    {
      id: 10,
      name_fr: 'Réseau',
      slug: 'networking',
      name_ar: 'شبكات',
      productCount: 42,
      icon: 'Wifi',
    },
  ];

  // Filter and paginate products on the server
  let products = [...fakeProducts];

  if (search) {
    products = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category) {
    products = products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (brand) {
    products = products.filter(
      (product) => product.brand?.toLowerCase() === brand.toLowerCase()
    );
  }

  if (min_price) {
    products = products.filter(
      (product) => product.price >= Number(min_price)
    );
  }

  if (max_price) {
    products = products.filter(
      (product) => product.price <= Number(max_price)
    );
  }

  switch (sort) {
    case 'price-asc':
      products.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      products.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      products.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      break;
    default:
      // newest first
     
  }

  const limit = 24;
  const total = products.length;
  const totalPages = Math.ceil(total / limit);
  const paginatedProducts = products.slice((page - 1) * limit, page * limit);



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

  return (
    <CatalogueClient
      initialProducts={paginatedProducts}
      totalProducts={total}
      totalPages={totalPages}
      currentPage={page}
      currentSort={sort}
      currentFilters={currentFilters}
      categories={categories}
      brands={brands}
      locale={locale}
    />
  );
}