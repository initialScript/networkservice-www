// app/[locale]/order/success/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, Truck, Mail, Home, ShoppingBag, ArrowLeft } from 'lucide-react';

interface OrderDetails {
  orderNumber: string;
  paymentMethod: string;
  date: string;
}

export default function OrderSuccessPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = pathname.split('/')[1] ?? 'fr';
  
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading or fetch order details
    const loadOrderDetails = async () => {
      const order = searchParams.get('order');
      const method = searchParams.get('method');
      
      if (order && method) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setOrderDetails({
          orderNumber: order,
          paymentMethod: method,
          date: new Date().toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        });
      }
      setLoading(false);
    };
    
    loadOrderDetails();
  }, [searchParams]);

  // Loading state
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

  if (!orderDetails) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Commande non trouvée</h2>
          <p className="text-gray-500 mb-4">Impossible de charger les détails de votre commande</p>
          <Link
            href={`/${locale}`}
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
                  {orderDetails.orderNumber}
                </p>
              </div>
              <div className="text-right">
                <p className="text-blue-100 text-xs uppercase tracking-wider">Date</p>
                <p className="text-white text-sm">{orderDetails.date}</p>
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

            {/* Payment Method */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Mode de paiement</p>
                <p className="text-sm text-gray-600">
                  {orderDetails.paymentMethod === 'cod' 
                    ? 'Paiement à la livraison' 
                    : orderDetails.paymentMethod === 'card' 
                    ? 'Carte bancaire' 
                    : 'Virement bancaire'}
                </p>
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
            href={`/${locale}`}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-[#0F3460] text-white rounded-xl font-semibold hover:bg-[#0a2444] transition-all duration-200 group"
          >
            <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Retour à l'accueil
          </Link>
          <Link
            href={`/${locale}/catalogue`}
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
            href={`/${locale}/contact`}
            className="text-sm text-[#0F3460] font-medium hover:underline inline-flex items-center gap-1 mt-1"
          >
            Contactez notre service client
          </Link>
        </div>
      </div>
    </div>
  );
}