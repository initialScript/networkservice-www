'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Camera } from 'lucide-react';
import { getOrder } from '@/lib/services/orders';
import { formatPrice, getImageUrl } from '@/lib/utils';
import Skeleton from '@/components/ui/Skeleton';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { cn } from '@/lib/utils';

interface OrderItem {
  product_id: number;
  name_fr: string;
  sku?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  image?: { url: string };
}

interface OrderAddress {
  full_name: string;
  address_line: string;
  city: string;
  region?: string;
  zip?: string;
  phone: string;
}

interface OrderDetail {
  id: number;
  order_number: string;
  created_at: string;
  status: string;
  payment_method?: string;
  payment_status?: string;
  notes?: string;
  subtotal: number;
  shipping_fee: number;
  discount?: number;
  total: number;
  items: OrderItem[];
  shipping_address?: OrderAddress;
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  pending:    { label: 'En attente',    className: 'bg-gray-100 text-gray-700' },
  confirmed:  { label: 'Confirmée',     className: 'bg-blue-100 text-blue-700' },
  processing: { label: 'En traitement', className: 'bg-amber-100 text-amber-700' },
  shipped:    { label: 'Expédiée',      className: 'bg-purple-100 text-purple-700' },
  delivered:  { label: 'Livrée',        className: 'bg-green-100 text-green-700' },
  cancelled:  { label: 'Annulée',       className: 'bg-red-100 text-red-600' },
};

const PAYMENT_LABELS: Record<string, string> = {
  cod: 'Paiement à la livraison',
  card: 'Carte bancaire',
  bank_transfer: 'Virement bancaire',
  cih_pay: 'CIH Pay',
};

interface Props {
  params: { locale: string; id: string };
}

export default function OrderDetailPage({ params: { locale, id } }: Props) {
  const pathname = usePathname();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrder(id)
      .then((d) => setOrder(d?.order ?? d))
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-28 w-full rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-52 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-36 w-full rounded-2xl" />
            <Skeleton className="h-28 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500">Commande introuvable.</p>
        <Link href={`/${locale}/compte/commandes`} className="mt-4 inline-block text-sm text-[#0F3460] hover:underline">
          ← Mes commandes
        </Link>
      </div>
    );
  }

  const cfg = STATUS_CONFIG[order.status] ?? { label: order.status, className: 'bg-gray-100 text-gray-700' };
  const date = new Date(order.created_at).toLocaleDateString('fr-MA', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div>
      <Breadcrumb items={[
        { label: 'Accueil', href: `/${locale}` },
        { label: 'Compte', href: `/${locale}/compte` },
        { label: 'Mes commandes', href: `/${locale}/compte/commandes` },
        { label: `#${order.order_number}` },
      ]} />

      <h1 className="text-xl font-bold text-gray-900 mt-4 mb-6">Commande #{order.order_number}</h1>

      {/* Status header card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm mb-6 flex flex-wrap items-center gap-4">
        <div>
          <p className="text-xs text-gray-400 mb-1">Statut</p>
          <span className={cn('inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold', cfg.className)}>
            {cfg.label}
          </span>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Date</p>
          <p className="text-sm font-medium text-gray-800">{date}</p>
        </div>
        {order.payment_method && (
          <div>
            <p className="text-xs text-gray-400 mb-1">Paiement</p>
            <p className="text-sm font-medium text-gray-800">
              {PAYMENT_LABELS[order.payment_method] ?? order.payment_method}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Items */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-800">Articles commandés</h2>
            </div>
            <table className="w-full text-sm">
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.product_id} className="border-b border-gray-50 last:border-0">
                    <td className="px-5 py-3 w-16">
                      <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden">
                        {item.image ? (
                          <Image
                            src={getImageUrl(item.image.url)}
                            alt={item.name_fr}
                            width={48}
                            height={48}
                            className="object-contain"
                          />
                        ) : (
                          <Camera className="w-5 h-5 text-gray-300" />
                        )}
                      </div>
                    </td>
                    <td className="px-2 py-3">
                      <p className="font-medium text-gray-800 line-clamp-2">{item.name_fr}</p>
                      {item.sku && <p className="text-xs text-gray-400 mt-0.5">Réf: {item.sku}</p>}
                    </td>
                    <td className="px-3 py-3 text-center text-gray-600 whitespace-nowrap">×{item.quantity}</td>
                    <td className="px-3 py-3 text-right whitespace-nowrap text-gray-600">
                      {formatPrice(item.unit_price)}
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-gray-900 whitespace-nowrap">
                      {formatPrice(item.total_price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Récapitulatif</h2>
            <dl className="space-y-2 text-sm">
              <Row label="Sous-total" value={formatPrice(order.subtotal)} />
              <Row label="Livraison" value={order.shipping_fee === 0 ? 'Offerte' : formatPrice(order.shipping_fee)} />
              {(order.discount ?? 0) > 0 && (
                <Row label="Réduction" value={`-${formatPrice(order.discount!)}`} valueClass="text-green-600" />
              )}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <dt className="font-bold text-gray-900">Total</dt>
                <dd className="font-bold text-lg text-[#0F3460]">{formatPrice(order.total)}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Address */}
          {order.shipping_address && (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-3">Adresse de livraison</h2>
              <address className="not-italic text-sm text-gray-600 space-y-0.5">
                <p className="font-medium text-gray-800">{order.shipping_address.full_name}</p>
                <p>{order.shipping_address.address_line}</p>
                <p>{order.shipping_address.city}{order.shipping_address.region ? `, ${order.shipping_address.region}` : ''} {order.shipping_address.zip}</p>
                <p>{order.shipping_address.phone}</p>
              </address>
            </div>
          )}

          {/* Payment */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-3">Informations paiement</h2>
            <p className="text-sm text-gray-700 mb-2">
              {PAYMENT_LABELS[order.payment_method ?? ''] ?? order.payment_method ?? '—'}
            </p>
            {order.payment_status && (
              <span className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
                order.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600',
              )}>
                {order.payment_status === 'paid' ? 'Payé' : 'En attente de paiement'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-gray-500">{label}</dt>
      <dd className={cn('font-medium text-gray-800', valueClass)}>{value}</dd>
    </div>
  );
}
