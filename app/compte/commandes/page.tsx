'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, ArrowRight, ShoppingBag } from 'lucide-react';
import { getOrders } from '@/lib/services/orders';
import { formatPrice } from '@/lib/utils';
import Skeleton from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';

interface OrderItem {
  name_fr: string;
  quantity: number;
}

interface Order {
  id: number;
  order_number: string;
  created_at: string;
  status: string;
  payment_method?: string;
  total: number;
  items: OrderItem[];
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  pending:    { label: 'En attente',    className: 'bg-gray-100 text-gray-600' },
  confirmed:  { label: 'Confirmée',     className: 'bg-blue-100 text-blue-700' },
  processing: { label: 'En traitement', className: 'bg-amber-100 text-amber-700' },
  shipped:    { label: 'Expédiée',      className: 'bg-purple-100 text-purple-700' },
  delivered:  { label: 'Livrée',        className: 'bg-green-100 text-green-700' },
  cancelled:  { label: 'Annulée',       className: 'bg-red-100 text-red-700' },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? { label: status, className: 'bg-gray-100 text-gray-600' };
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold', cfg.className)}>
      {cfg.label}
    </span>
  );
}

export default function OrdersPage() {
  const pathname = usePathname();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then((d) => {
        const list: Order[] = Array.isArray(d) ? d : d?.orders ?? d?.data ?? [];
        setOrders(list);
      })
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-7 w-40" />
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">Mes commandes</h1>

      {orders.length === 0 ? (
        <div className="py-20 text-center flex flex-col items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
            <ShoppingBag className="w-7 h-7 text-gray-400" />
          </div>
          <div>
            <p className="font-semibold text-gray-700">Aucune commande pour le moment</p>
            <p className="text-sm text-gray-400 mt-1">Vos achats apparaîtront ici</p>
          </div>
          <Link
            href={`/catalogue`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F3460] text-white text-sm font-semibold rounded-xl hover:bg-[#0a2444] transition"
          >
            Commencer vos achats <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => {
            const date = new Date(order.created_at).toLocaleDateString('fr-MA', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            });
            const preview = order.items.slice(0, 2).map((i) => i.name_fr).join(', ');
            const extra = order.items.length > 2 ? ` et ${order.items.length - 2} autre(s)` : '';

            return (
              <li key={order.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                {/* Top row */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="font-bold text-gray-900 text-sm">#{order.order_number}</span>
                  </div>
                  <span className="text-xs text-gray-400">{date}</span>
                  <StatusBadge status={order.status} />
                </div>

                {/* Items preview */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-1">
                  {preview}{extra}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-[#0F3460]">{formatPrice(order.total)}</span>
                  <Link
                    href={`/compte/commandes/${order.id}`}
                    className="flex items-center gap-1.5 text-sm font-semibold text-[#0F3460] hover:underline"
                  >
                    Voir le détail <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
