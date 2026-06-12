'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Trash2, ShoppingBag, ArrowRight, Minus, Plus, Tag, Truck, 
  Shield, CreditCard, X, Heart, AlertCircle 
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

const PanierClientPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] ?? 'fr';
  const { items, subtotal, updateItem, removeItem, clearCart, hydrate, isLoading: isCartLoading } = useCartStore();
  
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [deliveryFee, setDeliveryFee] = useState(40);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  // Valid coupons
  const validCoupons: Record<string, { discount: number; type: 'fixed' | 'percentage' }> = {
    'WELCOME10': { discount: 100, type: 'fixed' },
    'SAVE20': { discount: 20, type: 'percentage' },
    'IRIS15': { discount: 150, type: 'fixed' },
  };

  // Hydrate cart on mount
  useEffect(() => {
    hydrate();
    setIsHydrated(true);
  }, [hydrate]);

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > 99) return;
    updateItem(productId, newQuantity);
  };

  const removeItemFromCart = (productId: string) => {
    removeItem(productId);
  };

  const applyCoupon = () => {
    if (!couponCode.trim()) return;
    
    const coupon = validCoupons[couponCode.toUpperCase()];
    if (!coupon) {
      setCouponError('Code promo invalide');
      return;
    }
    
    let discount = 0;
    if (coupon.type === 'fixed') {
      discount = Math.min(coupon.discount, subtotal);
    } else {
      discount = (subtotal * coupon.discount) / 100;
    }
    
    setCouponDiscount(discount);
    setAppliedCoupon({ code: couponCode.toUpperCase(), discount });
    setCouponError('');
  };

  const removeCoupon = () => {
    setCouponDiscount(0);
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const total = Math.max(0, subtotal + deliveryFee - couponDiscount);

  const handleCheckout = () => {
    if (items.length === 0) return;
    setIsCheckoutLoading(true);
    router.push(`/${locale}/order`);
  };

  if (!isHydrated || (isCartLoading && items.length === 0)) {
    return <CartPageLoading />;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Votre panier est vide</h1>
          <p className="text-gray-500 mb-6">
            Découvrez nos produits et ajoutez-les à votre panier.
          </p>
          <Link
            href={`/${locale}/catalogue`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F3460] text-white rounded-lg font-semibold hover:bg-[#0a2444] transition"
          >
            Découvrir nos produits
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Mon panier</h1>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {items.length} article{items.length > 1 ? 's' : ''}
        </span>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Cart Items - Left Column */}
        <div className="flex-1">
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
            {/* Desktop Header - Hidden on mobile */}
            <div className="hidden md:grid grid-cols-12 gap-3 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-5">Produit</div>
              <div className="col-span-2 text-center">Prix</div>
              <div className="col-span-2 text-center">Quantité</div>
              <div className="col-span-2 text-center">Total</div>
              <div className="col-span-1 text-center"></div>
            </div>

            {/* Cart Items List */}
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.product_id} className="p-4 md:p-5">
                  {/* Desktop Layout */}
                  <div className="hidden md:grid grid-cols-12 gap-3 items-center">
                    {/* Product */}
                    <div className="col-span-5 flex gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="w-6 h-6 text-gray-300" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/${locale}/products/${item.slug}`}>
                          <h3 className="font-semibold text-gray-800 hover:text-[#0F3460] transition text-sm line-clamp-2">
                            {item.name}
                          </h3>
                        </Link>
                        {item.compare_price && item.compare_price > item.price && (
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-xs text-gray-400 line-through">
                              {formatPrice(item.compare_price)} 
                            </span>
                            <span className="text-xs bg-red-100 text-red-600 px-1 py-0.5 rounded">
                              -{Math.round((1 - item.price / item.compare_price) * 100)}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="col-span-2 text-center">
                      <span className="text-sm font-medium text-gray-700">{formatPrice(item.price)}</span>
                    </div>
                    
                    {/* Quantity */}
                    <div className="col-span-2">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                        >
                          <Minus className="w-3 h-3 text-gray-600" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                        >
                          <Plus className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Total */}
                    <div className="col-span-2 text-center">
                      <span className="text-sm font-bold text-[#0F3460]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                    
                    {/* Remove */}
                    <div className="col-span-1 text-center">
                      <button
                        onClick={() => removeItemFromCart(item.product_id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="md:hidden">
                    <div className="flex gap-3">
                      {/* Image */}
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="w-8 h-8 text-gray-300" />
                          </div>
                        )}
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <Link href={`/${locale}/products/${item.slug}`}>
                          <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
                            {item.name}
                          </h3>
                        </Link>
                        <div className="flex items-center justify-between mt-2">
                          <div>
                            <span className="text-base font-bold text-[#0F3460]">
                              {formatPrice(item.price)} 
                            </span>
                            {item.compare_price && item.compare_price > item.price && (
                              <span className="text-xs text-gray-400 line-through ml-2">
                                {formatPrice(item.compare_price)} 
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => removeItemFromCart(item.product_id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Quantity controls mobile */}
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                          <span className="text-xs text-gray-500">Quantité</span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                              className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                            >
                              <Minus className="w-3 h-3 text-gray-600" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                              className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                            >
                              <Plus className="w-3 h-3 text-gray-600" />
                            </button>
                            <span className="text-sm font-semibold text-[#0F3460] ml-2">
                              Total: {formatPrice(item.price * item.quantity)} 
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="px-4 py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row justify-between gap-3">
              <Link
                href={`/${locale}/catalogue`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <ShoppingBag className="w-4 h-4" />
                Continuer mes achats
              </Link>
              <button
                onClick={() => clearCart()}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-red-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
              >
                <Trash2 className="w-4 h-4" />
                Vider le panier
              </button>
            </div>
          </div>

          {/* Trust Badges - Mobile friendly */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
              <Truck className="w-4 h-4 text-[#0F3460] flex-shrink-0" />
              <div>
                <p className="text-[11px] font-semibold text-gray-800">Livraison rapide</p>
                <p className="text-[9px] text-gray-500">Partout au Maroc</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
              <Shield className="w-4 h-4 text-[#0F3460] flex-shrink-0" />
              <div>
                <p className="text-[11px] font-semibold text-gray-800">Paiement sécurisé</p>
                <p className="text-[9px] text-gray-500">100% garanti</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
              <CreditCard className="w-4 h-4 text-[#0F3460] flex-shrink-0" />
              <div>
                <p className="text-[11px] font-semibold text-gray-800">Paiement à la livraison</p>
                <p className="text-[9px] text-gray-500">Cash ou carte</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
              <Tag className="w-4 h-4 text-[#0F3460] flex-shrink-0" />
              <div>
                <p className="text-[11px] font-semibold text-gray-800">Meilleurs prix</p>
                <p className="text-[9px] text-gray-500">Garantie satisfait</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary - Right Column */}
        <div className="lg:w-80 xl:w-96 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-5 sticky top-24 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Résumé</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Sous-total</span>
                <span className="font-medium text-gray-900">{formatPrice(subtotal)} </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Livraison</span>
                <span className="font-medium text-gray-900">
                  {deliveryFee === 0 ? 'Offerte' : `${formatPrice(deliveryFee)} `}
                </span>
              </div>
              
              {/* Coupon Section */}
              {appliedCoupon ? (
                <div className="bg-green-50 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-green-700 font-medium">Code appliqué</span>
                    <p className="text-sm font-semibold text-green-800">{appliedCoupon.code}</p>
                  </div>
                  <button onClick={removeCoupon} className="text-green-700 hover:text-green-900">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Code promo"
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3460]/20"
                    />
                    <button
                      onClick={applyCoupon}
                      disabled={!couponCode}
                      className="px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 disabled:opacity-50 transition whitespace-nowrap"
                    >
                      Appliquer
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-xs text-red-500 mt-1">{couponError}</p>
                  )}
                </div>
              )}
              
              {couponDiscount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Réduction</span>
                  <span>-{formatPrice(couponDiscount)} </span>
                </div>
              )}
              
              <div className="border-t border-gray-100 pt-3 mt-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-900 font-semibold">Total</span>
                  <span className="text-xl md:text-2xl font-bold text-[#0F3460]">{formatPrice(total)} </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">TTC, livraison incluse</p>
              </div>
            </div>
            
            <button
              onClick={handleCheckout}
              disabled={isCheckoutLoading}
              className="w-full mt-5 py-3 bg-[#E94560] text-white rounded-lg font-semibold hover:bg-[#c73350] transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isCheckoutLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Procéder à la commande
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            
            <p className="text-center text-[11px] text-gray-400 mt-3">
              Les frais de livraison sont calculés à l'étape suivante
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

function CartPageLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 w-40 rounded bg-gray-200" />
        <div className="h-7 w-24 rounded-full bg-gray-100" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="flex-1 bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="hidden md:grid grid-cols-12 gap-3 px-5 py-3 bg-gray-50 border-b border-gray-100">
            <div className="col-span-5 h-4 rounded bg-gray-200" />
            <div className="col-span-2 h-4 rounded bg-gray-200" />
            <div className="col-span-2 h-4 rounded bg-gray-200" />
            <div className="col-span-2 h-4 rounded bg-gray-200" />
          </div>

          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="p-4 md:p-5 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-gray-100" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-4 w-32 rounded bg-gray-100" />
                </div>
                <div className="hidden md:block h-8 w-24 rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>

        <div className="lg:w-80 xl:w-96 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-5 shadow-sm space-y-4">
            <div className="h-6 w-28 rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-100" />
            <div className="h-4 w-5/6 rounded bg-gray-100" />
            <div className="h-px bg-gray-100" />
            <div className="h-8 w-full rounded bg-gray-200" />
            <div className="h-11 w-full rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanierClientPage;
