'use client';

import { useState } from 'react';
import { ShoppingCart, Minus, Plus, Facebook, Copy, Check } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';
import { useCartDrawer } from '@/lib/contexts/CartDrawerContext';
import Breadcrumb, { type BreadcrumbItem } from '@/components/ui/Breadcrumb';

export interface ProductDetail {
  id: number;
  name_fr: string;
  name_ar?: string;
  slug: string;
  sku?: string;
  price: number;
  compare_price?: number;
  stock_qty: number;
  description?: string;
  brand?: { name: string; slug?: string };
  category?: { name_fr: string; slug: string };
}

interface Props {
  product: ProductDetail;
  locale: string;
}

export default function ProductInfo({ product, locale }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const { open: openCart } = useCartDrawer();

  const [qty, setQty] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const name = locale === 'ar' && product.name_ar ? product.name_ar : product.name_fr;
  const isOutOfStock = product.stock_qty === 0;
  const isLowStock = product.stock_qty > 0 && product.stock_qty <= 5;
  const hasDiscount =
    !!product.compare_price && product.compare_price > product.price;
  const discountPct = hasDiscount
    ? Math.round((1 - product.price / product.compare_price!) * 100)
    : 0;

  const desc = product.description ?? '';
  const shortDesc = desc.slice(0, 300);
  const needsToggle = desc.length > 300;

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Accueil', href: `/${locale}` },
    { label: 'Catalogue', href: `/${locale}/catalogue` },
    ...(product.category
      ? [{ label: product.category.name_fr, href: `/${locale}/catalogue/${product.category.slug}` }]
      : []),
    { label: name },
  ];

  const handleAdd = async () => {
    if (isOutOfStock || isAdding) return;
    setIsAdding(true);
    try {
      await addItem({
        product_id: String(product.id),
        name: product.name_fr,
        slug: product.slug,
        price: product.price,
        compare_price: product.compare_price,
        quantity: qty,
      });
      setIsAdded(true);
      openCart();
      setTimeout(() => setIsAdded(false), 2500);
    } catch {
      // TODO: toast
    } finally {
      setIsAdding(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const href = typeof window !== 'undefined' ? window.location.href : '';
  const waLink = `https://wa.me/?text=${encodeURIComponent(name + ' — ' + href)}`;
  const fbLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(href)}`;

  return (
    <div className="flex flex-col gap-5">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Brand + SKU */}
      <div className="flex items-center gap-3 text-xs text-gray-400">
        {product.brand && <span>Marque : <span className="font-medium text-gray-600">{product.brand.name}</span></span>}
        {product.sku && (
          <>
            {product.brand && <span className="text-gray-200">|</span>}
            <span>Réf : <span className="font-medium text-gray-600">{product.sku}</span></span>
          </>
        )}
      </div>

      {/* Name */}
      <h1 className="text-2xl font-semibold text-[#0F3460] leading-snug">{name}</h1>

      {/* Price block */}
      <div className="flex flex-wrap items-end gap-3">
        <span className="text-3xl font-bold text-[#0F3460]">{formatPrice(product.price)}</span>
        {hasDiscount && (
          <>
            <span className="text-base text-gray-400 line-through leading-relaxed">
              {formatPrice(product.compare_price!)}
            </span>
            <span className="text-sm font-bold text-white bg-[#E94560] px-2 py-0.5 rounded-md">
              -{discountPct}%
            </span>
          </>
        )}
      </div>

      {/* Stock status */}
      <div className="flex items-center gap-2 text-sm">
        <span className={cn(
          'w-2 h-2 rounded-full flex-shrink-0',
          isOutOfStock ? 'bg-red-500' : isLowStock ? 'bg-orange-400' : 'bg-green-500',
        )} />
        <span className={cn(
          isOutOfStock ? 'text-red-500' : isLowStock ? 'text-orange-500' : 'text-green-600',
        )}>
          {isOutOfStock
            ? 'Rupture de stock'
            : isLowStock
            ? `Stock limité (${product.stock_qty} restant${product.stock_qty > 1 ? 's' : ''})`
            : 'En stock'}
        </span>
      </div>

      {/* Short description */}
      {desc && (
        <div className="text-sm text-gray-600 leading-relaxed">
          <p>{descExpanded ? desc : shortDesc}{needsToggle && !descExpanded && '…'}</p>
          {needsToggle && (
            <button
              type="button"
              onClick={() => setDescExpanded((v) => !v)}
              className="mt-1 text-[#0F3460] font-medium hover:underline text-xs"
            >
              {descExpanded ? 'Réduire' : 'Lire plus'}
            </button>
          )}
        </div>
      )}

      {/* Quantity + Add to cart */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Quantité :</span>
          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              disabled={isOutOfStock || qty <= 1}
              className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition"
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              type="number"
              value={qty}
              min={1}
              max={product.stock_qty}
              onChange={(e) => setQty(Math.min(product.stock_qty, Math.max(1, Number(e.target.value))))}
              disabled={isOutOfStock}
              className="w-14 h-10 text-center text-sm font-semibold border-x border-gray-200 focus:outline-none disabled:bg-gray-50"
            />
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(product.stock_qty, q + 1))}
              disabled={isOutOfStock || qty >= product.stock_qty}
              className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={isOutOfStock || isAdding}
          className={cn(
            'w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-base font-semibold transition-all',
            isAdded
              ? 'bg-green-500 text-white'
              : isOutOfStock
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-[#E94560] text-white hover:bg-[#c73350] active:scale-[0.98]',
          )}
        >
          {isAdding ? (
            <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : isAdded ? (
            <><Check className="w-5 h-5" /> Ajouté au panier !</>
          ) : (
            <><ShoppingCart className="w-5 h-5" /> Ajouter au panier</>
          )}
        </button>
      </div>

      {/* Quick info strip */}
      <div className="grid grid-cols-3 gap-2 py-4 border-y border-gray-100">
        {[
          { icon: '🚚', label: 'Livraison rapide' },
          { icon: '✅', label: 'Qualité garantie' },
          { icon: '📞', label: 'Support dédié' },
        ].map(({ icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-1 text-center">
            <span className="text-xl">{icon}</span>
            <span className="text-[11px] font-medium text-gray-600 leading-tight">{label}</span>
          </div>
        ))}
      </div>

      {/* Share */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400">Partager :</span>
        <a
          href={fbLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition"
        >
          <Facebook className="w-3.5 h-3.5" /> Facebook
        </a>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-600 hover:border-green-500 hover:text-green-600 transition"
        >
          <span className="text-sm leading-none">WhatsApp</span>
        </a>
        <button
          type="button"
          onClick={copyLink}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-600 hover:border-gray-400 transition"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copié !' : 'Lien'}
        </button>
      </div>
    </div>
  );
}
