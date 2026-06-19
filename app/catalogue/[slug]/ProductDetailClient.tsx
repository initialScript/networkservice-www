'use client';

import { AmountBtns } from "@/components/product/AmountBtns";
import ProductCarousel from '@/components/products/ProductCarousel';
import ImageGallery from "@/components/products/ImageGallery";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import {
  CircleCheck, ShieldCheck, ShoppingCart, Store, Truck,
  MapPin, Clock, ArrowRight, RefreshCw, Headphones,
  ChevronDown, ChevronUp, Tag, Package, AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { WhatsAppOrderButton } from "@/components/product/WhatsAppOrderButton";


// ─── Types ────────────────────────────────────────────────────────────────────

interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt: string;
  sort_order: number;
  is_primary: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProductSpec {
  id: string;
  product_id: string;
  spec_key: string;
  spec_value: string;
  sort_order: number;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name_fr: string;
  name_ar: string | null;
  slug: string;
}

interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
}

interface Product {
  id: string;
  category_id: string;
  brand_id: string;
  sku: string;
  name_fr: string;
  name_ar: string | null;
  slug: string;
  description: string;
  price: string;
  compare_price: string | null;
  stock_qty: number;
  is_active: boolean;
  short_description: string;
  tags: string;
  meta_title: string;
  meta_description: string;
  meta: {
    mpn: string;
    focus_keyword: string;
  };
  createdAt: string;
  updatedAt: string;
  Category: Category;
  Brand: Brand;
  images: ProductImage[];
  specs: ProductSpec[];
  categories: Category[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatPrice = (price: string | number) => {
  const n = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('fr-MA').format(n);
};

/** Strip all <a> tags from HTML so embedded links don't escape the page */
const sanitizeDescriptionHtml = (html: string) =>
  html.replace(/<a\b[^>]*>(.*?)<\/a>/gi, '$1');

/** Parse tags string → array */
const parseTags = (tags: string): string[] =>
  tags
    .split(',')
    .map(t => t.trim())
    .filter(Boolean);

/** Discount percentage helper */
const discountPct = (price: string, compare: string) => {
  const p = parseFloat(price);
  const c = parseFloat(compare);
  if (!c || c <= p) return null;
  return Math.round(((c - p) / c) * 100);
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const StockBadge = ({ qty }: { qty: number }) =>
  // qty > 0 ? (
  //   <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
  //     <CircleCheck size={14} />
  //     En stock ({qty} disponible{qty > 1 ? 's' : ''})
  //   </span>
  // ) : (
  //   <span className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">
  //     <Package size={14} />
  //     Rupture de stock
  //   </span>
  // )
  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
    <CircleCheck size={14} />
    En stock ({qty} disponible{qty > 1 ? 's' : ''})
  </span>;

// ─── Main Component ───────────────────────────────────────────────────────────

const ProductDetailClient = ({
  product,
  relatedProducts,
  media_url
}: {
  product: Product;
  relatedProducts: any[];
  media_url?: string
}) => {
  
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [shortDescExpanded, setShortDescExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const mediaUrl = process.env.NEXT_PUBLIC_MEDIA_URL || '';

  // Check if product has valid price (greater than 0)
  const hasValidPrice = parseFloat(product.price) > 0;
  // const inStock = product.stock_qty > 0 && hasValidPrice;
  const inStock = hasValidPrice; // Always in stock if price is valid

  const galleryImages = [...product.images]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(image => ({
      id: image.id,
      src: `${mediaUrl}${image.url}`,
      alt: image.alt || product.name_fr,
      title: product.name_fr,
    }));

  const addItem = useCartStore(state => state.addItem);

const handleAddToCart = async () => {
  if (!inStock) return;

  
  setIsAddingToCart(true);
  setError(null);
  setSuccess(null);
  
  try {
    // Only use the store's addItem - it will handle both API and local state
    await addItem({
      product_id: product.id,
      name: product.name_fr,
      slug: product.slug,
      price: parseFloat(product.price),
      image: `${mediaUrl}${product.images.find(i => i.is_primary)?.url ?? product.images[0]?.url}`,
      quantity,
    });
    
    setSuccess('Produit ajouté au panier avec succès !');
    setTimeout(() => setSuccess(null), 3000);
    
  } catch (err) {
    console.error('Full error details:', err);
    setError(`Erreur: ${err instanceof Error ? err.message : 'Erreur inconnue'}`);
    setTimeout(() => setError(null), 3000);
  } finally {
    setIsAddingToCart(false);
  }
};

  const handleIncrease = () => {
    // if (quantity < Math.min(99, product.stock_qty)) setQuantity(q => q + 1);
    if (quantity < 99) setQuantity(q => q + 1); // Always allow up to 99
  };
  
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(q => q - 1);
  };

  // Data derived from product
  const pct = product.compare_price ? discountPct(product.price, product.compare_price) : null;
  const visibleSpecs = showAllSpecs ? product.specs : product.specs.slice(0, 6);
  const descriptionHtml = sanitizeDescriptionHtml(product.description || product.short_description || '');
  const shortDesc = product.short_description || '';
  const TRUNCATE_AT = 220;

  const breadcrumbItems = [
  {
    label: "Accueil",
    href: "/",
  },

  ...product.categories.map((category) => ({
    label: category.name_fr,
    href: `/catalogue?category=${category.slug}`,
  })),

  {
    label: product.name_fr,
  },
];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-10">

        {/* ── Breadcrumb ── */}
        <Breadcrumb items={breadcrumbItems} />

        {/* ── Main Grid ── */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12 mt-6">

          {/* LEFT: Image Gallery */}
          <div className="relative w-full">
            <div className="lg:sticky lg:top-24">
              {galleryImages.length > 0 ? (
                <ImageGallery images={galleryImages} />
              ) : (
                <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center">
                  <Package size={64} className="text-gray-300" />
                </div>
              )}

              {/* Discount badge overlaid on image */}
              {pct && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg shadow">
                  -{pct}%
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="flex flex-col space-y-4 sm:space-y-5">

            {/* Delivery badge */}
            <div className="inline-flex w-fit items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium">
              <Truck size={14} className="stroke-emerald-600" />
              Livraison express sous 1-3 jours
            </div>

            {/* Title & meta */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                {product.name_fr}
              </h1>
              {product.name_ar && (
                <p className="text-base text-gray-500 font-medium" dir="rtl">
                  {product.name_ar}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                {product.Category && (
                  <Link
                    href={`/catalogue?category=${product.Category.slug}`}
                    className="text-gray-500 hover:text-amber-600 transition-colors"
                  >
                    {product.Category.name_fr}
                  </Link>
                )}
                {product.Brand && (
                  <Link
                    href={`/catalogue?brand=${product.Brand.slug}`}
                    className="text-gray-500 hover:text-amber-600 transition-colors font-medium"
                  >
                    {product.Brand.name}
                  </Link>
                )}
                <span className="text-gray-400 text-xs font-mono">SKU: {product.sku}</span>
                {product.meta?.mpn && (
                  <span className="text-gray-400 text-xs font-mono">MPN: {product.meta.mpn}</span>
                )}
              </div>
            </div>

            {/* Short description */}
            {shortDesc && (
              <div className="text-sm sm:text-base text-gray-600 leading-relaxed border-l-2 border-amber-200 pl-4">
                {shortDesc.length > TRUNCATE_AT && !shortDescExpanded ? (
                  <>
                    {shortDesc.substring(0, TRUNCATE_AT)}…{' '}
                    <button
                      onClick={() => setShortDescExpanded(true)}
                      className="text-amber-600 font-medium hover:underline"
                    >
                      lire plus
                    </button>
                  </>
                ) : (
                  <>
                    {shortDesc}
                    {shortDesc.length > TRUNCATE_AT && (
                      <button
                        onClick={() => setShortDescExpanded(false)}
                        className="text-amber-600 font-medium hover:underline ml-1"
                      >
                        réduire
                      </button>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Specs preview card */}
            {product.specs.length > 0 && (
              <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 space-y-3">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  Spécifications
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {visibleSpecs.map(spec => (
                    <div
                      key={spec.id}
                      className="flex items-start justify-between border-b border-gray-50 pb-2 gap-4 last:border-0 last:pb-0"
                    >
                      <span className="text-xs sm:text-sm text-gray-500 font-medium shrink-0">
                        {spec.spec_key}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-gray-900 text-right break-words">
                        {spec.spec_value}
                      </span>
                    </div>
                  ))}
                </div>

                {product.specs.length > 6 && (
                  <button
                    onClick={() => setShowAllSpecs(v => !v)}
                    className="flex items-center justify-center gap-1.5 w-full mt-1 text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors"
                  >
                    {showAllSpecs
                      ? <><ChevronUp size={15} /> Voir moins</>
                      : <><ChevronDown size={15} /> Voir {product.specs.length - 6} de plus</>
                    }
                  </button>
                )}
              </div>
            )}

            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* Price block - Only show if price > 0 */}
            {hasValidPrice ? (
              <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-4 sm:p-5 flex items-end gap-3 flex-wrap">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-base sm:text-lg font-medium text-gray-500">DH</span>
                  <span className="text-xs text-gray-400">TTC</span>
                </div>
                {product.compare_price && parseFloat(product.compare_price) > parseFloat(product.price) && (
                  <div className="flex items-center gap-2">
                    <span className="text-base text-gray-400 line-through">
                      {formatPrice(product.compare_price)} DH
                    </span>
                    {pct && (
                      <span className="text-xs font-bold text-white bg-red-500 px-2 py-0.5 rounded-md">
                        -{pct}%
                      </span>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-4 sm:p-5">
                <span className="text-gray-500 font-medium">Prix non disponible</span>
              </div>
            )}

            {/* Trust tags row */}
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 text-xs text-gray-700 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full">
                <CircleCheck size={13} className="text-emerald-500" /> Neuf
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-700 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full">
                <ShieldCheck size={13} className="text-emerald-500" /> Garantie 1 an
              </span>
              {product.Brand && (
                <span className="flex items-center gap-1.5 text-xs text-gray-700 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full">
                  <Store size={13} className="text-emerald-500" />
                  Vendu par {product.Brand.name}
                </span>
              )}
            </div>

            {/* Stock - Only show if price > 0 */}
            {hasValidPrice && <StockBadge qty={product.stock_qty} />}

            {/* Success/Error Messages */}
            {success && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2">
                <CircleCheck size={18} className="text-emerald-600" />
                <span className="text-sm text-emerald-800">{success}</span>
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
                <AlertCircle size={18} className="text-red-600" />
                <span className="text-sm text-red-800">{error}</span>
              </div>
            )}

            {/* Quantity + CTA - Only show if price > 0 */}
            {hasValidPrice ? (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
                {inStock && (
                  <div className="sm:shrink-0">
                    <AmountBtns
                      amount={quantity}
                      onIncrease={handleIncrease}
                      onDecrease={handleDecrease}
                      minAmount={1}
                      // maxAmount={Math.min(99, product.stock_qty)}
                      maxAmount={99} // Always allow up to 99
                    />
                  </div>
                )}
                <Button
                  onClick={handleAddToCart}
                  disabled={!inStock || isAddingToCart}
                  className={`flex-1 gap-2 rounded-xl py-3 sm:py-4 transition-all duration-200 shadow-md hover:shadow-lg text-sm sm:text-base font-semibold ${
                    !inStock || isAddingToCart
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  {isAddingToCart ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Ajout en cours...
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      {inStock ? 'Ajouter au panier' : 'Rupture de stock'}
                      {inStock && <ArrowRight size={14} className="opacity-60" />}
                    </>
                  )}
                </Button>

                {/* WhatsApp Order Button - Only show if price > 0 and in stock */}
                {/*
                {inStock && ( 
                  <WhatsAppOrderButton 
                    product={{
                      id: product.id,
                      name_fr: product.name_fr,
                      sku: product.sku,
                      price: product.price,
                      quantity: quantity,
                      images: product.images,
                      media_url: mediaUrl
                    }}
                    className="flex-1"
                  />
                )}
                */}
              </div>
            ) : (
              <div className="w-full bg-gray-100 rounded-xl p-4 text-center">
                <p className="text-gray-500 font-medium">Ce produit n'est pas disponible à la vente</p>
              </div>
            )}

            {/* Delivery options - Only show if price > 0 */}
            {hasValidPrice && (
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-xl gap-3 border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-full shadow-sm shrink-0">
                      <Truck size={16} className="text-gray-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Livraison partout au Maroc</p>
                      <p className="text-xs text-gray-500 mt-0.5">40 DH TTC · Délai 1–3 jours ouvrés</p>
                    </div>
                  </div>
                  <button className="text-xs font-medium text-amber-600 hover:text-amber-700 transition-colors self-end sm:self-auto">
                    Détails
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-emerald-50/40 rounded-xl gap-3 border border-emerald-100/60">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-full shadow-sm shrink-0">
                      <MapPin size={16} className="text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Retrait en magasin (Casablanca)</p>
                      <div className="flex flex-wrap items-center gap-1.5 mt-1">
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-0.5 rounded-full">
                          <CircleCheck size={10} />
                          {/* {inStock ? 'En stock' : 'Rupture'} */}
                          En stock
                        </span>
                        <span className="text-xs text-gray-500">
                          {/* {inStock ? 'Retrait immédiat' : 'Délai à confirmer'} */}
                          Retrait immédiat
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="text-xs font-medium text-amber-600 hover:text-amber-700 transition-colors flex items-center gap-1 self-end sm:self-auto">
                    Horaires &amp; plan <Clock size={12} />
                  </button>
                </div>
              </div>
            )}

            
          </div>
        </div>

        {/* ── Trust Badges ── */}
        <div className="mt-10 sm:mt-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-8 border-t border-gray-100">
            {[
              {
                icon: <ShieldCheck size={20} strokeWidth={1.5} className="text-emerald-600" />,
                bg: 'from-emerald-50 to-teal-50',
                title: 'Paiement sécurisé',
                sub: '100% crypté & protégé',
              },
              {
                icon: <RefreshCw size={20} strokeWidth={1.5} className="text-blue-600" />,
                bg: 'from-blue-50 to-indigo-50',
                title: 'Retours gratuits',
                sub: 'Sous 14 jours',
              },
              {
                icon: <Headphones size={20} strokeWidth={1.5} className="text-orange-600" />,
                bg: 'from-orange-50 to-amber-50',
                title: 'Support client',
                sub: 'Disponible 7j/7',
              },
            ].map(({ icon, bg, title, sub }) => (
              <div
                key={title}
                className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200 flex items-center gap-3"
              >
                <div className={`shrink-0 w-11 h-11 bg-gradient-to-br ${bg} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                  {icon}
                </div>
                <div>
                  <p className="text-gray-800 font-semibold text-sm">{title}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Description ── */}
        {descriptionHtml && (
          <div className="mt-10 sm:mt-12 w-full">
            <div className="border-b border-gray-200 mb-6">
              <span className="inline-block pb-3 text-sm sm:text-base font-semibold tracking-wide uppercase text-amber-500 border-b-2 border-amber-500 -mb-px">
                Descriptif
              </span>
            </div>

            <style>{`
              .product-specs h3 {
                display: none;
              }
              .product-specs dl {
                display: grid;
                grid-template-columns: 260px 1fr;
                gap: 0;
              }
              .product-specs dt,
              .product-specs dd {
                padding: 10px 16px;
              }
              .product-specs dt:nth-child(4n+1),
              .product-specs dd:nth-child(4n+2) {
                background-color: #e5e7eb; /* gray-200 */
              }
              .product-specs dt:nth-child(4n+3),
              .product-specs dd:nth-child(4n+4) {
                background-color: #d1d5db; /* gray-300 */
              }
              .product-specs dt {
                font-weight: 600;
                color: #374151;
              }
              .product-specs dd {
                margin: 0;
                color: #111827;
              }
              .product-specs a {
                color: inherit;
                text-decoration: none;
              }
              @media (max-width: 640px) {
                .product-specs dl {
                  grid-template-columns: 1fr;
                  gap: 4px 0;
                }
                .product-specs dd {
                  padding-bottom: 10px;
                  border-bottom: 1px solid #f3f4f6;
                }
              }
            `}</style>

            <div
              className="product-specs text-sm sm:text-base overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          </div>
        )}

        {relatedProducts?.length > 0 && (
          <div className="mt-12">
            <ProductCarousel
              title="Produits similaires"
              products={relatedProducts}
              media_url={media_url}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailClient;