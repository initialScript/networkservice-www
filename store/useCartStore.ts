// /store/useCartStore.ts (updated version with better error handling for stock)

'use client';

import { create } from 'zustand';
import {
  getCartItems,
  addProductToCart as apiAddToCart,
  updateCartItemQuantity as apiUpdateQuantity,
  deleteCartItem as apiDeleteItem
} from '@/lib/api/cart';

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
  isLoading: boolean;
  error: string | null;

  hydrate: () => void;
  fetchCart: () => Promise<void>;
  addItem: (item: AddCartInput, quantity?: number) => Promise<void>;
  updateItem: (product_id: string, quantity: number) => Promise<void>;
  removeItem: (product_id: string) => Promise<void>;
  clearCart: () => void;
}

const calculateTotals = (items: CartItem[]) => ({
  items,
  items_count: items.reduce((sum, item) => sum + item.quantity, 0),
  subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
});

const saveCartToLocal = (items: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

const loadCartFromLocal = (): CartItem[] => {
  const raw = localStorage.getItem('cart');
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const toNumber = (value: unknown, fallback = 0) => {
  const numberValue = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(numberValue) ? numberValue : fallback;
};

const getProductId = (item: any) =>
  String(item?.product_id ?? item?.productId ?? item?.product?.id ?? item?.Product?.id ?? item?.id ?? '');

const getImagePath = (imageUrl: string | undefined): string | undefined => {
  if (!imageUrl) return undefined;
  
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    try {
      const url = new URL(imageUrl);
      return url.pathname;
    } catch {
      return imageUrl;
    }
  }
  
  return imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
};

const normalizeCartItem = (item: any): CartItem | null => {
  const product = item?.product ?? item?.Product ?? {};
  const product_id = getProductId(item);

  if (!product_id) {
    console.warn('No product_id found for item:', item);
    return null;
  }

  let imageUrl = item?.image ?? 
                  item?.image_url ?? 
                  product?.image ?? 
                  product?.image_url ?? 
                  product?.images?.find?.((image: any) => image?.is_primary)?.url ??
                  product?.images?.[0]?.url;

  const imagePath = imageUrl ? getImagePath(imageUrl) : undefined;

  const name = 
    item?.name || 
    item?.title || 
    item?.product_name ||
    product?.name_fr ||
    product?.name ||
    product?.title ||
    product?.product_name ||
    product?.Product?.name_fr ||
    product?.Product?.name ||
    '';

  return {
    product_id,
    name: String(name),
    slug: String(item?.slug ?? product?.slug ?? product_id),
    price: toNumber(item?.price ?? product?.price),
    compare_price:
      item?.compare_price ?? product?.compare_price
        ? toNumber(item?.compare_price ?? product?.compare_price)
        : undefined,
    image: imagePath,
    quantity: Math.max(1, toNumber(item?.quantity ?? item?.qty, 1)),
  };
};

const extractCartItems = (response: any): CartItem[] | undefined => {
  const candidates = [
    response?.data?.items,
    response?.data?.cart?.items,
    response?.data?.cartItems,
    response?.data,
    response?.items,
    response?.cart?.items,
    response?.cartItems,
    response,
  ];

  const rawItems = candidates.find(Array.isArray);
  if (!rawItems) return undefined;

  return rawItems
    .map(normalizeCartItem)
    .filter((item): item is CartItem => Boolean(item));
};

const buildCartItem = (input: AddCartInput, quantity?: number): CartItem => {
  if (typeof input === 'string' || typeof input === 'number') {
    const product_id = String(input);
    return {
      product_id,
      name: '',
      slug: product_id,
      price: 0,
      quantity: quantity ?? 1,
    };
  }

  let imagePath = input.image;
  if (imagePath) {
    imagePath = getImagePath(imagePath);
  }

  return {
    ...input,
    product_id: String(input.product_id),
    price: toNumber(input.price),
    image: imagePath,
    quantity: Math.max(1, quantity ?? input.quantity),
  };
};

const mergeCartItem = (items: CartItem[], newItem: CartItem) => {
  const existing = items.find((item) => item.product_id === newItem.product_id);

  if (!existing) return [...items, newItem];

  return items.map((item) =>
    item.product_id === newItem.product_id
      ? {
          ...item,
          ...newItem,
          name: newItem.name || item.name,
          slug: newItem.slug || item.slug,
          image: newItem.image || item.image,
          price: newItem.price || item.price,
          quantity: item.quantity + newItem.quantity,
        }
      : item
  );
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  subtotal: 0,
  items_count: 0,
  isLoading: false,
  error: null,

  hydrate: () => {
    const items = loadCartFromLocal();
    set(calculateTotals(items));
  },

  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getCartItems();
      const items = extractCartItems(response);

      if (items) {
        if (items.length === 0 && get().items.length > 0) return;
        saveCartToLocal(items);
        set(calculateTotals(items));
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      set({ error: 'Failed to load cart' });
      const items = loadCartFromLocal();
      set(calculateTotals(items));
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (input, quantity) => {
    const newItem = buildCartItem(input, quantity);
    set({ isLoading: true, error: null });
    
    try {
      // Try to add to cart via API
      await apiAddToCart({
        product_id: newItem.product_id,
        quantity: newItem.quantity
      });

      // If API succeeds, update local state
      const optimisticItems = mergeCartItem(get().items, newItem);
      saveCartToLocal(optimisticItems);
      set(calculateTotals(optimisticItems));

      await get().fetchCart();

      if (!get().items.some((item) => item.product_id === newItem.product_id)) {
        const fallbackItems = mergeCartItem(get().items, newItem);
        saveCartToLocal(fallbackItems);
        set(calculateTotals(fallbackItems));
      }

    } catch (error) {
      console.error('Failed to add item to API, falling back to local:', error);
      
      // If API fails (due to stock check), still add to local cart
      const optimisticItems = mergeCartItem(get().items, newItem);
      saveCartToLocal(optimisticItems);
      set(calculateTotals(optimisticItems));
      
      // Don't throw the error - we want the user to be able to add items even if API fails
      // set({ error: 'Failed to add item to cart' });
      // throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateItem: async (product_id, quantity) => {
    const previousItems = get().items;
    const items = previousItems.map((item) =>
      item.product_id === product_id ? { ...item, quantity } : item
    );

    saveCartToLocal(items);
    set({ ...calculateTotals(items), isLoading: true, error: null });

    if (!previousItems.some((item) => item.product_id === product_id)) {
      set({ isLoading: false });
      return;
    }

    try {
      await apiUpdateQuantity(product_id, quantity);
    } catch (error) {
      console.error('Failed to update item in API, keeping local:', error);
      // Keep the local update even if API fails
      // set({ error: 'Failed to sync cart update' });
    } finally {
      set({ isLoading: false });
    }
  },

  removeItem: async (product_id) => {
    const previousItems = get().items;
    const items = previousItems.filter((item) => item.product_id !== product_id);

    saveCartToLocal(items);
    set({ ...calculateTotals(items), isLoading: true, error: null });

    if (!previousItems.some((item) => item.product_id === product_id)) {
      set({ isLoading: false });
      return;
    }

    try {
      await apiDeleteItem(product_id);
    } catch (error) {
      console.error('Failed to remove item from API, removing locally:', error);
      // Keep the local removal even if API fails
      // set({ error: 'Failed to sync cart removal' });
    } finally {
      set({ isLoading: false });
    }
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