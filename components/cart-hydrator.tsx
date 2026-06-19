'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';

export default function CartHydrator() {
  const hydrate = useCartStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, []);

  return null;
}