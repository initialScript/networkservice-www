// store/useCartStore.ts

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

type AddCartInput = CartItem | string | number;

interface CartState {
  items: CartItem[];
  subtotal: number;
  items_count: number;

  hydrate: () => void;
  addItem: (item: AddCartInput, quantity?: number) => void;
  updateItem: (product_id: string, quantity: number) => void;
  removeItem: (product_id: string) => void;
  clearCart: () => void;
}

// ─── localStorage helpers ────────────────────────────────────────────────────

const CART_KEY = 'cart';

const saveCartToLocal = (items: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

const loadCartFromLocal = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
};

// ─── Pure helpers ────────────────────────────────────────────────────────────

const toNumber = (value: unknown, fallback = 0): number => {
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) ? n : fallback;
};

const calculateTotals = (items: CartItem[]) => ({
  items,
  items_count: items.reduce((sum, item) => sum + item.quantity, 0),
  subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
});

const normalizeImagePath = (imageUrl: string | undefined): string | undefined => {
  if (!imageUrl) return undefined;
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    try {
      return new URL(imageUrl).pathname;
    } catch {
      return imageUrl;
    }
  }
  return imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
};

const buildCartItem = (input: AddCartInput, quantity?: number): CartItem => {
  if (typeof input === 'string' || typeof input === 'number') {
    const product_id = String(input);
    return { product_id, name: '', slug: product_id, price: 0, quantity: quantity ?? 1 };
  }
  return {
    ...input,
    product_id: String(input.product_id),
    price: toNumber(input.price),
    image: normalizeImagePath(input.image),
    quantity: Math.max(1, quantity ?? input.quantity),
  };
};

const mergeItem = (items: CartItem[], newItem: CartItem): CartItem[] => {
  const existing = items.find((i) => i.product_id === newItem.product_id);
  if (!existing) return [...items, newItem];

  return items.map((i) =>
    i.product_id === newItem.product_id
      ? {
          ...i,
          ...newItem,
          name: newItem.name || i.name,
          slug: newItem.slug || i.slug,
          image: newItem.image || i.image,
          price: newItem.price || i.price,
          quantity: i.quantity + newItem.quantity,
        }
      : i
  );
};

// ─── Store ───────────────────────────────────────────────────────────────────

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  subtotal: 0,
  items_count: 0,

  /** Call once on app mount to seed state from localStorage. */
  hydrate: () => {
    const items = loadCartFromLocal();
    set(calculateTotals(items));
  },

  /** Add a product (or increase its quantity if already in cart). */
  addItem: (input, quantity) => {
    const newItem = buildCartItem(input, quantity);
    const merged = mergeItem(get().items, newItem);
    saveCartToLocal(merged);
    set(calculateTotals(merged));
  },

  /** Set the exact quantity for a cart item. Removes it if quantity <= 0. */
  updateItem: (product_id, quantity) => {
    const updated =
      quantity <= 0
        ? get().items.filter((i) => i.product_id !== product_id)
        : get().items.map((i) =>
            i.product_id === product_id ? { ...i, quantity } : i
          );
    saveCartToLocal(updated);
    set(calculateTotals(updated));
  },

  /** Remove a single product from the cart. */
  removeItem: (product_id) => {
    const filtered = get().items.filter((i) => i.product_id !== product_id);
    saveCartToLocal(filtered);
    set(calculateTotals(filtered));
  },

  /** Wipe the cart completely. */
  clearCart: () => {
    localStorage.removeItem(CART_KEY);
    set({ items: [], subtotal: 0, items_count: 0 });
  },
}));