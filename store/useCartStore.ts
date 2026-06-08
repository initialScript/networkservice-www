'use client';

import { create } from 'zustand';
import api from '@/lib/api';

export interface CartItem {
  product_id: number;
  name: string;
  slug: string;
  price: number;
  compare_price?: number;
  image?: string;
  quantity: number;
}

interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
}

interface CartPayload {
  items: CartItem[];
  subtotal: number;
  items_count: number;
  coupon?: Coupon | null;
}

interface CartState {
  items: CartItem[];
  subtotal: number;
  items_count: number;
  coupon: Coupon | null;
  isLoading: boolean;
  setCart: (cart: CartPayload) => void;
  hydrate: () => Promise<void>;
  addItem: (product_id: number, quantity: number) => Promise<void>;
  updateItem: (product_id: number, quantity: number) => Promise<void>;
  removeItem: (product_id: number) => Promise<void>;
  clearCart: () => void;
}

const applyCart = (cart: CartPayload): Partial<CartState> => ({
  items: cart.items,
  subtotal: cart.subtotal,
  items_count: cart.items_count,
  coupon: cart.coupon ?? null,
});

export const useCartStore = create<CartState>((set) => ({
  items: [],
  subtotal: 0,
  items_count: 0,
  coupon: null,
  isLoading: false,

  setCart: (cart) => set(applyCart(cart)),

  // Call once on app mount to hydrate from the server session
  hydrate: async () => {
    try {
      set({ isLoading: true });
      const cart: CartPayload = await api.get('/api/cart').then((r) => r.data);
      set(applyCart(cart));
    } catch {
      // Unauthenticated or empty cart — leave defaults
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (product_id, quantity) => {
    const cart: CartPayload = await api
      .post('/api/cart/items', { product_id, quantity })
      .then((r) => r.data);
    set(applyCart(cart));
  },

  updateItem: async (product_id, quantity) => {
    const cart: CartPayload = await api
      .patch(`/api/cart/items/${product_id}`, { quantity })
      .then((r) => r.data);
    set(applyCart(cart));
  },

  removeItem: async (product_id) => {
    const cart: CartPayload = await api
      .delete(`/api/cart/items/${product_id}`)
      .then((r) => r.data);
    set(applyCart(cart));
  },

  clearCart: () => set({ items: [], subtotal: 0, items_count: 0, coupon: null }),
}));
