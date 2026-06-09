'use client';

import Link from 'next/link';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCartDrawer } from '@/lib/contexts/CartDrawerContext';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/lib/utils';
import CartItem from './CartItem';

export default function CartDrawer() {
  const { isOpen, close } = useCartDrawer();
  const { items, subtotal, items_count } = useCartStore();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'fr';


  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={close}
      />

      {/* Panel */}
      <div
        className={`fixed inset-y-0 end-0 z-50 w-96 max-w-[90vw] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#0F3460]" />
            <span className="font-semibold text-gray-900">Mon panier</span>
            {items_count > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#E94560] px-1.5 text-[10px] font-bold text-white">
                {items_count}
              </span>
            )}
          </div>
          <button
            onClick={close}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition"
            aria-label="Fermer le panier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-5 py-1">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-100" />
              <div>
                <p className="font-semibold text-gray-700">Votre panier est vide</p>
                <p className="text-sm text-gray-400 mt-1">Découvrez notre catalogue de produits</p>
              </div>
              <Link
                href={`/${locale}/catalogue`}
                onClick={close}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F3460] text-white text-sm font-semibold rounded-xl hover:bg-[#0a2444] transition"
              >
                Voir le catalogue <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            items.map((item) => <CartItem key={item.product_id} item={item} />)
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-4 space-y-3 bg-gray-50/80">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Sous-total</span>
              <span className="text-lg font-bold text-gray-900">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-gray-400">Frais de livraison calculés à la commande</p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href={`/${locale}/panier`}
                onClick={close}
                className="flex items-center justify-center py-2.5 rounded-xl border-2 border-[#0F3460] text-[#0F3460] text-sm font-semibold hover:bg-[#0F3460] hover:text-white transition"
              >
                Voir le panier
              </Link>
              <Link
                href={`/${locale}/checkout`}
                onClick={close}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#E94560] text-white text-sm font-semibold hover:bg-[#c73350] transition"
              >
                Commander <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
