import { notFound } from 'next/navigation';
import { fakeProducts } from '@/data/products';
import ProductsDetailClient from '@/app/[locale]/store/[slug]/ProductsDetailClient';

interface Props {
  params: {
    slug: string;
    productId: string;
    locale: string;
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { productId, slug } = params;
  
  // The productId comes as "prod-001-macbook-pro-14-m3-pro-chip"
  // Extract just the ID part (e.g., "prod-001")
  const actualProductId = productId.split('-').slice(0, 2).join('-');
  
  const product = fakeProducts.find((p) => p.id === actualProductId);

  if (!product) {
    notFound();
  }

  // Optional: Verify the product belongs to the correct category
  const categorySlug = slug.toLowerCase();
  const productCategory = product.category.toLowerCase();
  
  if (categorySlug !== productCategory) {
    notFound();
  }

  return <ProductsDetailClient productId={product.id} />;
}