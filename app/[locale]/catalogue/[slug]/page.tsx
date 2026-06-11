// /catalogue/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getSingleProduct } from '@/lib/api/products';

import type { Metadata } from "next";
import ProductDetailClient from './ProductDetailClient';

interface Props {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const product = await getSingleProduct(params.slug);

  if (!product) {
    return {
      title: "Produit introuvable",
    };
  }

  const mediaUrl = process.env.NEXT_PUBLIC_MEDIA_URL;

  const image =
    product.images?.[0]
      ? `${mediaUrl}${product.images[0].url}`
      : undefined;

  return {
    title: product.meta_title || product.name_fr,
    description: product.meta_description || product.short_description || "",
    keywords: [
      product.name_fr,
      product.Brand?.name,
      product.Category?.name_fr,
      ...(product.tags?.split(",") || []),
    ].filter(Boolean),
    openGraph: {
      title: product.meta_title || product.name_fr,
      description: product.meta_description || product.short_description || "",
      type: "website",
      images: image ? [{ url: image, alt: product.name_fr }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: product.meta_title || product.name_fr,
      description: product.meta_description || product.short_description || "",
      images: image ? [image] : [],
    },
    alternates: {
      canonical: `/catalogue/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  try {
    const product = await getSingleProduct(params.slug);

    if (!product) {
      notFound();
    }

    const mediaUrl = process.env.NEXT_PUBLIC_MEDIA_URL;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name_fr,
      image: product.images?.map(
        (img: any) => `${mediaUrl}${img.url}`
      ),
      description: product.meta_description || product.short_description,
      sku: product.sku,
      brand: {
        "@type": "Brand",
        name: product.Brand?.name,
      },
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "MAD",
        availability: product.stock_qty > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      },
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <ProductDetailClient product={product} />
      </>
    );
  } catch {
    notFound();
  }
}