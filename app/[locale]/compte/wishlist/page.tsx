'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Heart, X, ShoppingCart, Camera, ArrowRight } from 'lucide-react';
import api from '@/lib/api';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice, getImageUrl } from '@/lib/utils';
import Skeleton from '@/components/ui/Skeleton';
import { ToastContainer } from '@/components/ui/Toast';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';

interface WishlistProduct {
  product_id: number;
  name_fr: string;
  name_ar?: string;
  slug: string;
  price: number;
  compare_price?: number;
  stock_qty: number;
  image?: { url: string; alt?: string };
}

export default function WishlistPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] ?? 'fr';
  const addItem = useCartStore((s) => s.addItem);
  const { toasts, success, error: toastError, dismiss } = useToast();

  const [items, setItems] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [addingId, setAddingId] = useState<number | null>(null);

  useEffect(() => {
    api
      .get('/api/me/wishlist')
      .then((r) => {
        const list: WishlistProduct[] = Array.isArray(r.data) ? r.data : r.data?.items ?? [];
        setItems(list);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const remove = async (product_id: number) => {
    // Optimistic
    setItems((prev) => prev.filter((p) => p.product_id !== product_id));
    setRemovingId(product_id);
    try {
      await api.delete(`/api/me/wishlist/${product_id}`);
      success('Retiré de la wishlist');
    } catch {
      toastError('Impossible de retirer ce produit.');
      // Revert: reload
      api.get('/api/me/wishlist').then((r) => {
        setItems(Array.isArray(r.data) ? r.data : r.data?.items ?? []);
      });
    } finally {
      setRemovingId(null);
    }
  };

  const addToCart = async (item: WishlistProduct) => {
    setAddingId(item.product_id);
    try {
      await addItem({
        product_id: String(item.product_id),
        name: item.name_fr,
        slug: item.slug,
        price: item.price,
        compare_price: item.compare_price,
        image: item.image ? getImageUrl(item.image.url) : undefined,
        quantity: 1,
      });
      success('Ajouté au panier !');
    } catch {
      toastError('Impossible d\'ajouter au panier.');
    } finally {
      setAddingId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-7 w-40" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[3/4] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer toasts={toasts} dismiss={dismiss} />
      <h1 className="text-xl font-bold text-gray-900 mb-6">Ma wishlist</h1>

      {items.length === 0 ? (
        <div className="py-20 text-center flex flex-col items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
            <Heart className="w-7 h-7 text-gray-300" />
          </div>
          <div>
            <p className="font-semibold text-gray-700">Votre wishlist est vide</p>
            <p className="text-sm text-gray-400 mt-1">Sauvegardez les produits qui vous intéressent</p>
          </div>
          <Link
            href={`/${locale}/catalogue`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F3460] text-white text-sm font-semibold rounded-xl hover:bg-[#0a2444] transition"
          >
            Découvrir le catalogue <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => {
            const name = locale === 'ar' && item.name_ar ? item.name_ar : item.name_fr;
            const isOutOfStock = item.stock_qty === 0;
            const hasDiscount = !!item.compare_price && item.compare_price > item.price;
            const discountPct = hasDiscount
              ? Math.round((1 - item.price / item.compare_price!) * 100)
              : 0;

            return (
              <div
                key={item.product_id}
                className="group relative flex flex-col bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all overflow-hidden"
              >
                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => remove(item.product_id)}
                  disabled={removingId === item.product_id}
                  className="absolute top-2 end-2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white/90 border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-300 shadow-sm transition"
                  aria-label="Retirer de la wishlist"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                {/* Image */}
                <Link href={`/${locale}/produits/${item.slug}`} className="relative aspect-square bg-gray-50">
                  {item.image ? (
                    <Image
                      src={getImageUrl(item.image.url)}
                      alt={item.image.alt ?? name}
                      fill
                      className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-200">
                      <Camera className="w-10 h-10" />
                    </div>
                  )}
                  {hasDiscount && (
                    <span className="absolute top-2 start-2 bg-[#E94560] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                      -{discountPct}%
                    </span>
                  )}
                </Link>

                {/* Body */}
                <div className="flex flex-col flex-1 p-3 gap-2">
                  <Link href={`/${locale}/produits/${item.slug}`}>
                    <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug hover:text-[#0F3460] transition-colors min-h-[2.5rem]">
                      {name}
                    </p>
                  </Link>

                  <div className="flex items-end gap-1.5 flex-wrap">
                    <span className="text-base font-bold text-[#0F3460]">{formatPrice(item.price)}</span>
                    {hasDiscount && (
                      <span className="text-xs text-gray-400 line-through leading-relaxed">
                        {formatPrice(item.compare_price!)}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => addToCart(item)}
                    disabled={isOutOfStock || addingId === item.product_id}
                    className={cn(
                      'mt-auto flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs font-semibold transition-all',
                      isOutOfStock
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-[#E94560] text-white hover:bg-[#c73350]',
                    )}
                  >
                    {addingId === item.product_id ? (
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    ) : (
                      <ShoppingCart className="w-3.5 h-3.5" />
                    )}
                    {isOutOfStock ? 'Rupture de stock' : 'Ajouter au panier'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
