'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, Truck, Mail, Home, ShoppingBag, ArrowLeft } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface OrderSummaryItem {
  product_name: string | null;
  sku: string | null;
  slug: string | null;
  quantity: number;
  unit_price: string | number;
  total_price: string | number;
}

interface OrderSummary {
  order_number: string;
  status: string;
  payment_method: string;
  payment_status: string;
  subtotal: string | number;
  discount: string | number;
  shipping_fee: string | number;
  total: string | number;
  created_at: string;
  items: OrderSummaryItem[];
}

const paymentMethodLabel = (method: string) => {
  switch (method) {
    case 'cod': return 'Paiement à la livraison';
    case 'card': return 'Carte bancaire';
    case 'cih': return 'CIH Pay';
    case 'bank_transfer': return 'Virement bancaire';
    default: return method;
  }
};

export default function OrderSuccessPage() {
  const params = useParams<{ orderId: string }>();
  const orderId = params.orderId;

  const [order, setOrder] = useState<OrderSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!orderId) return;

    const loadOrder = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guest/orders/${orderId}`);
        const result = await response.json();

        if (!response.ok || !result.success) {
          setError(true);
        } else {
          setOrder(result.data);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-10 h-10 border-4 border-[#0F3460] border-t-transparent rounded-full animate-spin" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Confirmation en cours...</h2>
          <p className="text-gray-500">Veuillez patienter un instant</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Commande non trouvée</h2>
          <p className="text-gray-500 mb-4">Impossible de charger les détails de votre commande</p>
          <Link
            href={`/`}
            className="inline-flex items-center gap-2 px-6 py-2 bg-[#0F3460] text-white rounded-lg hover:bg-[#0a2444] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Merci pour votre commande !
          </h1>
          <p className="text-gray-600">
            Votre commande a été confirmée avec succès
          </p>
        </div>

        {/* Order Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0F3460] to-[#1a4a7a] px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-blue-100 text-xs uppercase tracking-wider">Numéro de commande</p>
                <p className="text-white font-mono text-lg font-semibold">
                  {order.order_number}
                </p>
              </div>
              <div className="text-right">
                <p className="text-blue-100 text-xs uppercase tracking-wider">Date</p>
                <p className="text-white text-sm">
                  {new Date(order.created_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            {/* Status */}
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm font-medium text-green-700">Commande confirmée</span>
            </div>

            {/* Items */}
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate flex-1">
                    {item.quantity} × {item.product_name ?? item.sku}
                  </span>
                  <span className="font-medium text-gray-900 ml-2">
                    {formatPrice(Number(item.total_price))} DH
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-gray-100 pt-3 space-y-1">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Sous-total</span>
                <span>{formatPrice(Number(order.subtotal))} DH</span>
              </div>
              {Number(order.discount) > 0 && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Remise</span>
                  <span>-{formatPrice(Number(order.discount))} DH</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-gray-600">
                <span>Livraison</span>
                <span>{formatPrice(Number(order.shipping_fee))} DH</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-1">
                <span>Total</span>
                <span className="text-[#0F3460] text-xl">{formatPrice(Number(order.total))} DH</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="flex items-start gap-3 border-t border-gray-100 pt-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Mode de paiement</p>
                <p className="text-sm text-gray-600">{paymentMethodLabel(order.payment_method)}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Vous payez à la réception de votre commande
                </p>
              </div>
            </div>

            {/* Email Confirmation */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Email de confirmation</p>
                <p className="text-sm text-gray-600">
                  Un email de confirmation vous a été envoyé
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Conservez-le pour le suivi de votre commande
                </p>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Livraison</p>
                <p className="text-sm text-gray-600">
                  Délai de livraison : 3-5 jours ouvrés
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Vous serez notifié par email et SMS
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <Link
            href={`/`}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-[#0F3460] text-white rounded-xl font-semibold hover:bg-[#0a2444] transition-all duration-200 group"
          >
            <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Retour à l'accueil
          </Link>
          <Link
            href={`/catalogue`}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 group"
          >
            <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Continuer mes achats
          </Link>
        </div>

        {/* Help Section */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl text-center">
          <p className="text-sm text-gray-600">
            Une question sur votre commande ?
          </p>
          <Link
            href={`/contact`}
            className="text-sm text-[#0F3460] font-medium hover:underline inline-flex items-center gap-1 mt-1"
          >
            Contactez notre service client
          </Link>
        </div>
      </div>
    </div>
  );
}
