'use client';

import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';

export function useWishlist() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [ids, setIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);

  // Hydrate on mount when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    api
      .get('/api/me/wishlist')
      .then((r) => {
        const items: { product_id: number }[] = Array.isArray(r.data)
          ? r.data
          : r.data?.items ?? [];
        setIds(new Set(items.map((i) => i.product_id)));
      })
      .catch(() => {});
  }, [isAuthenticated]);

  const isInWishlist = useCallback((product_id: number) => ids.has(product_id), [ids]);

  const toggle = useCallback(
    async (product_id: number) => {
      if (!isAuthenticated) return false;
      const was = ids.has(product_id);

      // Optimistic update
      setIds((prev) => {
        const next = new Set(prev);
        was ? next.delete(product_id) : next.add(product_id);
        return next;
      });

      try {
        setLoading(true);
        if (was) {
          await api.delete(`/api/me/wishlist/${product_id}`);
        } else {
          await api.post('/api/me/wishlist', { product_id });
        }
        return true;
      } catch {
        // Revert optimistic update
        setIds((prev) => {
          const next = new Set(prev);
          was ? next.add(product_id) : next.delete(product_id);
          return next;
        });
        return false;
      } finally {
        setLoading(false);
      }
    },
    [ids, isAuthenticated],
  );

  return { ids, isInWishlist, toggle, loading };
}
