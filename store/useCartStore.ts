'use client';

import { create } from 'zustand';

export interface CartItem {
  product_id: string;
  name: string;
  slug: string;
  price: number;
  compare_price?: number;
  image?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  subtotal: number;
  items_count: number;

  hydrate: () => void;

  addItem: (item: CartItem) => void;
  updateItem: (product_id: string, quantity: number) => void;
  removeItem: (product_id: string) => void;
  clearCart: () => void;
}

const calculateTotals = (items: CartItem[]) => ({
  items,
  items_count: items.reduce((sum, item) => sum + item.quantity, 0),
  subtotal: items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ),
});

const saveCart = (items: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  subtotal: 0,
  items_count: 0,

  hydrate: () => {
    const raw = localStorage.getItem('cart');

    if (!raw) return;

    const items: CartItem[] = JSON.parse(raw);

    set(calculateTotals(items));
  },

  addItem: (newItem) => {
    const items = [...get().items];

    const existing = items.find(
      (item) => item.product_id === newItem.product_id
    );

    if (existing) {
      existing.quantity += newItem.quantity;
    } else {
      items.push(newItem);
    }

    saveCart(items);
    set(calculateTotals(items));
  },

  updateItem: (product_id, quantity) => {
    const items = get().items.map((item) =>
      item.product_id === product_id
        ? { ...item, quantity }
        : item
    );

    saveCart(items);
    set(calculateTotals(items));
  },

  removeItem: (product_id) => {
    const items = get().items.filter(
      (item) => item.product_id !== product_id
    );

    saveCart(items);
    set(calculateTotals(items));
  },

  clearCart: () => {
    localStorage.removeItem('cart');

    set({
      items: [],
      subtotal: 0,
      items_count: 0,
    });
  },
}));