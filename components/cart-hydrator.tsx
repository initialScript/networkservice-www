// components/cart/CartHydrator.tsx (or wherever it is)
'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';

export default function CartHydrator() {
  const { hydrate, fetchCart } = useCartStore();

  useEffect(() => {
    hydrate(); // Load from localStorage first for instant display
    fetchCart(); // Then fetch from server to sync
  }, [hydrate, fetchCart]);

  return null;
}