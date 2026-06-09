'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';

export default function CartHydrator() {
  const hydrate = useCartStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, []);

  return null;
}