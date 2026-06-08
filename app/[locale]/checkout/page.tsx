'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Check, ChevronRight, MapPin, CreditCard, ClipboardList, Tag } from 'lucide-react';
import api from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import { createOrder } from '@/lib/services/orders';
import { formatPrice } from '@/lib/utils';
import AddressModal, { type Address } from '@/components/account/AddressModal';
import Skeleton from '@/components/ui/Skeleton';
import { ToastContainer } from '@/components/ui/Toast';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';

const STEPS = [
  { id: 1, label: 'Adresse', icon: MapPin },
  { id: 2, label: 'Paiement', icon: CreditCard },
  { id: 3, label: 'Confirmation', icon: ClipboardList },
];

const PAYMENT_OPTIONS = [
  {
    id: 'cod',
    label: 'Paiement à la livraison (COD)',
    desc: 'Payez en cash à la réception',
    icon: '💵',
    disabled: false,
  },
  {
    id: 'card',
    label: 'Paiement par carte (CMI)',
    desc: 'Carte bancaire Marocaine',
    icon: '💳',
    disabled: true,
    badge: 'Bientôt disponible',
  },
  {
    id: 'bank_transfer',
    label: 'Virement bancaire',
    desc: 'Virement + envoi du reçu',
    icon: '🏦',
    disabled: false,
  },
  {
    id: 'cih_pay',
    label: 'CIH Pay',
    desc: 'Paiement mobile CIH',
    icon: '📱',
    disabled: true,
    badge: 'Bientôt disponible',
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] ?? 'fr';
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { items, subtotal, coupon, clearCart, hydrate } = useCartStore();
  const { toasts, error: toastError, dismiss } = useToast();

  const [step, setStep] = useState(1);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressLoading, setAddressLoading] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [notes, setNotes] = useState('');

  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');

  const [submitting, setSubmitting] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) router.replace(`/${locale}/auth/login?redirect=/checkout`);
  }, [isAuthenticated, locale, router]);

  // Load addresses
  useEffect(() => {
    if (!isAuthenticated) return;
    api.get('/api/me/addresses')
      .then((r) => {
        const list: Address[] = Array.isArray(r.data) ? r.data : r.data?.addresses ?? [];
        setAddresses(list);
        const def = list.find((a) => a.is_default) ?? list[0];
        if (def?.id) setSelectedAddressId(def.id);
        if (def?.city) fetchDeliveryFee(def.city);
      })
      .catch(() => {})
      .finally(() => setAddressLoading(false));
  }, [isAuthenticated]);

  const fetchDeliveryFee = (city: string) => {
    api.get(`/api/delivery-zones?city=${encodeURIComponent(city)}`)
      .then((r) => setDeliveryFee(r.data?.fee ?? 0))
      .catch(() => setDeliveryFee(0));
  };

  const handleSelectAddress = (addr: Address) => {
    if (!addr.id) return;
    setSelectedAddressId(addr.id);
    if (addr.city) fetchDeliveryFee(addr.city);
  };

  const handleAddressSaved = (saved: Address) => {
    setAddresses((prev) => {
      const idx = prev.findIndex((a) => a.id === saved.id);
      if (idx >= 0) { const next = [...prev]; next[idx] = saved; return next; }
      return [...prev, saved];
    });
    if (saved.id) handleSelectAddress(saved);
  };

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponError('');
    try {
      const r = await api.post('/api/cart/coupon', { code: couponCode });
      setCouponDiscount(r.data?.discount ?? 0);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Code invalide';
      setCouponError(msg);
    } finally {
      setCouponLoading(false);
    }
  };

  const confirmOrder = async () => {
    if (!selectedAddressId) return toastError('Veuillez sélectionner une adresse.');
    setSubmitting(true);
    try {
      const r = await createOrder({
        address_id: selectedAddressId,
        coupon: couponCode || undefined,
        notes: notes || undefined,
      } as Parameters<typeof createOrder>[0] & { payment_method: string });
      clearCart();
      await hydrate();
      const orderNum = r?.order?.order_number ?? r?.order_number ?? r?.id;
      router.push(`/${locale}/checkout/success?order=${orderNum}&method=${paymentMethod}`);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Impossible de passer la commande.';
      toastError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);
  const total = subtotal + deliveryFee - couponDiscount - (coupon ? subtotal * (coupon.type === 'percentage' ? coupon.discount / 100 : 0) : 0);

  if (!isAuthenticated) return null;

  return (
    <>
      <ToastContainer toasts={toasts} dismiss={dismiss} />
      <AddressModal
        open={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        onSaved={handleAddressSaved}
        initial={null}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-xl font-bold text-gray-900 mb-6">Commander</h1>

        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((s, i) => {
            const done = step > s.id;
            const active = step === s.id;
            return (
              <div key={s.id} className="flex items-center gap-2 flex-1 min-w-0">
                <div className={cn(
                  'flex items-center gap-2 text-sm font-medium whitespace-nowrap',
                  active ? 'text-[#0F3460]' : done ? 'text-green-600' : 'text-gray-400',
                )}>
                  <div className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0',
                    active ? 'bg-[#0F3460] text-white' : done ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400',
                  )}>
                    {done ? <Check className="w-4 h-4" /> : <s.icon className="w-3.5 h-3.5" />}
                  </div>
                  <span className="hidden sm:block">{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={cn('flex-1 h-0.5 mx-2', step > s.id ? 'bg-green-400' : 'bg-gray-200')} />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main step content */}
          <div className="lg:col-span-2">
            {/* ── Step 1: Address ── */}
            {step === 1 && (
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h2 className="text-base font-semibold text-gray-800 mb-4">Adresse de livraison</h2>

                {addressLoading ? (
                  <div className="space-y-3">
                    {[1, 2].map((i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {addresses.map((addr) => (
                      <label
                        key={addr.id}
                        className={cn(
                          'flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-colors',
                          selectedAddressId === addr.id
                            ? 'border-[#0F3460] bg-[#0F3460]/5'
                            : 'border-gray-200 hover:border-gray-300',
                        )}
                      >
                        <input
                          type="radio"
                          name="address"
                          value={addr.id}
                          checked={selectedAddressId === addr.id}
                          onChange={() => handleSelectAddress(addr)}
                          className="mt-1 w-4 h-4 text-[#0F3460]"
                        />
                        <div className="flex-1 text-sm">
                          <p className="font-semibold text-gray-800">{addr.full_name}</p>
                          <p className="text-gray-600">{addr.address_line}</p>
                          <p className="text-gray-600">{addr.city}{addr.region ? `, ${addr.region}` : ''}</p>
                          <p className="text-gray-500 text-xs mt-0.5">{addr.phone}</p>
                        </div>
                        {addr.is_default && (
                          <span className="text-xs font-semibold text-[#0F3460] bg-[#0F3460]/10 px-2 py-0.5 rounded-full">
                            Par défaut
                          </span>
                        )}
                      </label>
                    ))}

                    <button
                      type="button"
                      onClick={() => setAddressModalOpen(true)}
                      className="flex items-center gap-2 w-full p-4 border-2 border-dashed border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:border-[#0F3460] hover:text-[#0F3460] transition"
                    >
                      <MapPin className="w-4 h-4" /> + Ajouter une nouvelle adresse
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!selectedAddressId}
                  className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-[#0F3460] text-white text-sm font-semibold rounded-xl hover:bg-[#0a2444] disabled:opacity-50 transition"
                >
                  Continuer <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* ── Step 2: Payment ── */}
            {step === 2 && (
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h2 className="text-base font-semibold text-gray-800 mb-4">Mode de paiement</h2>

                <div className="space-y-3">
                  {PAYMENT_OPTIONS.map((opt) => (
                    <label
                      key={opt.id}
                      className={cn(
                        'flex items-start gap-3 p-4 border rounded-xl transition-colors',
                        opt.disabled
                          ? 'opacity-50 cursor-not-allowed border-gray-100 bg-gray-50'
                          : paymentMethod === opt.id
                          ? 'border-[#0F3460] bg-[#0F3460]/5 cursor-pointer'
                          : 'border-gray-200 hover:border-gray-300 cursor-pointer',
                      )}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={opt.id}
                        checked={paymentMethod === opt.id}
                        disabled={opt.disabled}
                        onChange={() => setPaymentMethod(opt.id)}
                        className="mt-1 w-4 h-4 text-[#0F3460]"
                      />
                      <span className="text-xl flex-shrink-0">{opt.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-gray-800">{opt.label}</p>
                          {opt.badge && (
                            <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="mt-4">
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">
                    Instructions de livraison (optionnel)
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Code d'entrée, étage, instructions particulières..."
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3460]/20 transition resize-none"
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 border border-gray-200 text-sm font-semibold text-gray-600 rounded-xl hover:bg-gray-50 transition"
                  >
                    Retour
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#0F3460] text-white text-sm font-semibold rounded-xl hover:bg-[#0a2444] transition"
                  >
                    Continuer <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 3: Confirm ── */}
            {step === 3 && (
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
                <h2 className="text-base font-semibold text-gray-800">Confirmation de commande</h2>

                {/* Cart items summary */}
                <ul className="divide-y divide-gray-50">
                  {items.map((item) => (
                    <li key={item.product_id} className="flex items-center justify-between py-2.5 text-sm">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400 text-xs">×{item.quantity}</span>
                        <span className="text-gray-800 line-clamp-1">{item.name}</span>
                      </div>
                      <span className="font-medium text-gray-700 whitespace-nowrap ms-4">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Address recap */}
                {selectedAddress && (
                  <div className="bg-gray-50 rounded-xl p-3 text-sm">
                    <p className="text-xs font-semibold text-gray-400 mb-1">Livraison à</p>
                    <p className="font-medium text-gray-800">{selectedAddress.full_name}</p>
                    <p className="text-gray-600">{selectedAddress.address_line}, {selectedAddress.city}</p>
                  </div>
                )}

                {/* Coupon code */}
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" /> Code promo
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponError(''); }}
                      placeholder="IRIS10"
                      className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3460]/20"
                    />
                    <button
                      type="button"
                      onClick={applyCoupon}
                      disabled={couponLoading || !couponCode}
                      className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 disabled:opacity-50 transition"
                    >
                      Appliquer
                    </button>
                  </div>
                  {couponError && <p className="text-xs text-red-500 mt-1">{couponError}</p>}
                  {couponDiscount > 0 && (
                    <p className="text-xs text-green-600 mt-1 font-medium">
                      ✓ Réduction de {formatPrice(couponDiscount)} appliquée
                    </p>
                  )}
                </div>

                {/* Confirm button */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 py-3 border border-gray-200 text-sm font-semibold text-gray-600 rounded-xl hover:bg-gray-50 transition"
                  >
                    Retour
                  </button>
                  <button
                    type="button"
                    onClick={confirmOrder}
                    disabled={submitting}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#E94560] text-white text-sm font-semibold rounded-xl hover:bg-[#c73350] disabled:opacity-60 transition"
                  >
                    {submitting && (
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    )}
                    Confirmer la commande
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm sticky top-6">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Résumé</h2>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Sous-total</dt>
                  <dd className="font-medium">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Livraison</dt>
                  <dd className="font-medium">{deliveryFee === 0 ? 'Offerte' : formatPrice(deliveryFee)}</dd>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <dt>Réduction</dt>
                    <dd>-{formatPrice(couponDiscount)}</dd>
                  </div>
                )}
                <div className="pt-3 border-t border-gray-100 flex justify-between font-bold text-base">
                  <dt>Total</dt>
                  <dd className="text-[#0F3460]">{formatPrice(Math.max(0, total))}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
