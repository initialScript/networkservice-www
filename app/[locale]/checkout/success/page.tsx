'use client';

import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { CheckCircle, Package, ArrowRight, ShoppingBag } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] ?? 'fr';
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') ?? '';
  const method = searchParams.get('method') ?? 'cod';

  const isCod = method === 'cod';
  const isBankTransfer = method === 'bank_transfer';

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Commande confirmée !</h1>

        {orderNumber && (
          <p className="text-sm text-gray-500 mb-4">
            Votre commande{' '}
            <span className="font-semibold text-gray-800">#{orderNumber}</span>{' '}
            a été enregistrée avec succès.
          </p>
        )}

        {/* Method-specific message */}
        {isCod && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-6 text-sm text-blue-700">
            Notre équipe vous contactera sous peu pour confirmer la livraison.
          </div>
        )}
        {isBankTransfer && (
          <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-6 text-sm text-amber-700 text-start">
            <p className="font-semibold mb-1">Virement bancaire requis</p>
            <p>
              Veuillez effectuer le virement et envoyer le reçu à{' '}
              <a
                href="mailto:paiement@iris.ma"
                className="underline font-medium"
              >
                paiement@iris.ma
              </a>
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          {orderNumber && (
            <Link
              href={`/${locale}/compte/commandes`}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#0F3460] text-white text-sm font-semibold rounded-xl hover:bg-[#0a2444] transition"
            >
              <Package className="w-4 h-4" /> Voir ma commande
            </Link>
          )}
          <Link
            href={`/${locale}/catalogue`}
            className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-[#0F3460] text-[#0F3460] text-sm font-semibold rounded-xl hover:bg-[#0F3460] hover:text-white transition"
          >
            <ShoppingBag className="w-4 h-4" /> Continuer mes achats
          </Link>
        </div>
      </div>
    </div>
  );
}
