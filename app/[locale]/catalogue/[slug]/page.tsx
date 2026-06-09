import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FilterSidebar, { type Category, type Brand } from '@/components/catalog/FilterSidebar';
import SortBar from '@/components/catalog/SortBar';
import ProductGrid from '@/components/catalog/ProductGrid';
import Pagination from '@/components/catalog/Pagination';
import Breadcrumb from '@/components/ui/Breadcrumb';
import MobileFilterDrawer from '../MobileFilterDrawer';
import { fakeProducts } from '@/data/products';

interface CategoryDetail {
  id: number;
  slug: string;
  name_fr: string;
  name_ar: string;
  description?: string;
}

interface Props {
  params: { locale: string; slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}

function str(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

// Define categories locally
const categories: Category[] = [
  { id: 1, slug: 'laptop', name_fr: 'Laptop', name_ar: 'حاسوب محمول', description: 'Ordinateurs portables haute performance pour tous vos besoins' },
  { id: 2, slug: 'desktop', name_fr: 'Desktop', name_ar: 'حاسوب مكتبي', description: 'Ordinateurs de bureau puissants pour le travail et le gaming' },
  { id: 3, slug: 'gaming', name_fr: 'Gaming', name_ar: 'ألعاب', description: 'Matériel gaming pour une expérience immersive' },
  { id: 4, slug: 'accessories', name_fr: 'Accessoires', name_ar: 'إكسسوارات', description: 'Accessoires informatiques de qualité' },
  { id: 5, slug: 'components', name_fr: 'Composants PC', name_ar: 'مكونات الكمبيوتر', description: 'Composants pour monter ou améliorer votre PC' },
  { id: 6, slug: 'peripherals', name_fr: 'Périphériques', name_ar: 'الأجهزة الطرفية', description: 'Claviers, souris, écrans et plus' },
  { id: 7, slug: 'storage', name_fr: 'Stockage', name_ar: 'تخزين', description: 'Solutions de stockage pour vos données' },
  { id: 8, slug: 'monitors', name_fr: 'Moniteurs', name_ar: 'شاشات', description: 'Écrans haute résolution pour le travail et le gaming' },
  { id: 9, slug: 'printers', name_fr: 'Imprimantes', name_ar: 'طابعات', description: 'Imprimantes pour la maison et le bureau' },
  { id: 10, slug: 'networking', name_fr: 'Réseau', name_ar: 'شبكات', description: 'Équipements réseau pour une connexion optimale' },
];

// Define brands locally
const brands: Brand[] = [
  { id: 1, slug: 'apple', name: 'Apple', logo: '/brands/apple.svg', productCount: 156 },
  { id: 2, slug: 'dell', name: 'Dell', logo: '/brands/dell.svg', productCount: 89 },
  { id: 3, slug: 'asus', name: 'ASUS', logo: '/brands/asus.svg', productCount: 124 },
  { id: 4, slug: 'hp', name: 'HP', logo: '/brands/hp.svg', productCount: 98 },
  { id: 5, slug: 'lenovo', name: 'Lenovo', logo: '/brands/lenovo.svg', productCount: 112 },
  { id: 6, slug: 'acer', name: 'Acer', logo: '/brands/acer.svg', productCount: 76 },
  { id: 7, slug: 'msi', name: 'MSI', logo: '/brands/msi.svg', productCount: 54 },
  { id: 8, slug: 'razer', name: 'Razer', logo: '/brands/razer.svg', productCount: 32 },
  { id: 9, slug: 'microsoft', name: 'Microsoft', logo: '/brands/microsoft.svg', productCount: 28 },
  { id: 10, slug: 'lg', name: 'LG', logo: '/brands/lg.svg', productCount: 45 },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = categories.find(c => c.slug === params.slug);
  if (!category) return { title: 'Catalogue — IRIS.MA' };
  return {
    title: `${category.name_fr} — IRIS.MA`,
    description: category.description || `Découvrez notre gamme ${category.name_fr} : large choix de produits avec livraison rapide partout au Maroc.`,
    openGraph: {
      title: `${category.name_fr} — IRIS.MA`,
      description: category.description || `Découvrez notre gamme ${category.name_fr}.`,
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
  const limit = 24;

  // Find category
  const categoryData = categories.find(c => c.slug === slug);
  if (!categoryData) notFound();

  // Filter products
  let filteredProducts = [...fakeProducts];

  // Filter by category
  filteredProducts = filteredProducts.filter(
    (product) => product.category.toLowerCase() === categoryData.name_fr.toLowerCase()
  );

  // Filter by brand
  if (brand) {
    const brandNames = brand.split(',');
    filteredProducts = filteredProducts.filter((product) => {
      const productBrand = getBrandFromProduct(product);
      return brandNames.some(b => productBrand?.toLowerCase() === b.toLowerCase());
    });
  }

  // Filter by price
  if (min_price) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= Number(min_price)
    );
  }
  if (max_price) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= Number(max_price)
    );
  }

  // Filter by stock
  if (in_stock === 'true') {
    filteredProducts = filteredProducts.filter((product) => product.inStock === true);
  }

  // Sort products
  switch (sort) {
    case 'price-asc':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filteredProducts.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      break;
    default: // newest - using id as proxy for newer products
      filteredProducts.sort((a, b) => b.id.localeCompare(a.id));
  }

  // Paginate
  const total = filteredProducts.length;
  const totalPages = Math.ceil(total / limit);
  const paginatedProducts = filteredProducts.slice((page - 1) * limit, page * limit);

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
        {categoryData.description && (
          <p className="text-sm text-gray-500 mt-1">{categoryData.description}</p>
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
            <ProductGrid products={paginatedProducts} />
          </div>
          {totalPages > 1 && (
            <Pagination total={total} page={page} limit={limit} totalPages={totalPages} />
          )}
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

// Helper function to get brand from product
function getBrandFromProduct(product: any): string | null {
  const title = product.title.toLowerCase();
  if (title.includes('apple') || title.includes('macbook')) return 'Apple';
  if (title.includes('dell') || title.includes('xps')) return 'Dell';
  if (title.includes('asus') || title.includes('rog')) return 'ASUS';
  if (title.includes('hp') || title.includes('spectre')) return 'HP';
  if (title.includes('lenovo') || title.includes('thinkpad')) return 'Lenovo';
  if (title.includes('acer') || title.includes('predator')) return 'Acer';
  if (title.includes('msi')) return 'MSI';
  if (title.includes('razer') || title.includes('blade')) return 'Razer';
  if (title.includes('microsoft') || title.includes('surface')) return 'Microsoft';
  if (title.includes('lg') || title.includes('gram')) return 'LG';
  return null;
}