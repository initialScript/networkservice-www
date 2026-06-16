// /store/useCartStore.ts (partial - showing the methods)
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
  image?: string; // Now stores only the path (e.g., /public/101/network_service/products/072f75c78c.webp)
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

// Helper to extract just the image path (without base URL)
const getImagePath = (imageUrl: string | undefined): string | undefined => {
  if (!imageUrl) return undefined;
  
  // If it's already a full URL, extract just the path
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    try {
      const url = new URL(imageUrl);
      return url.pathname; // Returns: /public/101/network_service/products/072f75c78c.webp
    } catch {
      return imageUrl;
    }
  }
  
  // If it's already a path, return as-is
  return imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
};

const normalizeCartItem = (item: any): CartItem | null => {
  console.log('=== NORMALIZING ITEM ===');
  console.log('Raw item:', item);
  
  const product = item?.product ?? item?.Product ?? {};
  const product_id = getProductId(item);

  console.log('Extracted product_id:', product_id);
  console.log('Extracted product:', product);
  console.log('item.name:', item?.name);
  console.log('item.title:', item?.title);
  console.log('product.name_fr:', product?.name_fr);
  console.log('product.name:', product?.name);

  if (!product_id) {
    console.warn('No product_id found for item:', item);
    return null;
  }

  // Get the image URL and extract only the path
  let imageUrl = item?.image ?? 
                  item?.image_url ?? 
                  product?.image ?? 
                  product?.image_url ?? 
                  product?.images?.find?.((image: any) => image?.is_primary)?.url ??
                  product?.images?.[0]?.url;

  // Store only the path (without base URL)
  const imagePath = imageUrl ? getImagePath(imageUrl) : undefined;

  // Try multiple paths for the product name
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

  console.log('Extracted name:', name);
  console.log('Extracted imagePath:', imagePath);
  console.log('Extracted price:', toNumber(item?.price ?? product?.price));

  const result = {
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

  console.log('Normalized result:', result);
  return result;
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

  // Store only the image path (without base URL)
  let imagePath = input.image;
  if (imagePath) {
    imagePath = getImagePath(imagePath);
  }

  return {
    ...input,
    product_id: String(input.product_id),
    price: toNumber(input.price),
    image: imagePath, // Store only the path
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

 // In useCartStore.ts - update the fetchCart function

fetchCart: async () => {
  set({ isLoading: true, error: null });
  try {
    const response = await getCartItems();
    
    // Detailed logging
    console.log('=== CART API RESPONSE ===');
    console.log('Full response:', JSON.stringify(response, null, 2));
    console.log('Response type:', typeof response);
    console.log('Response keys:', Object.keys(response || {}));
    
    // Check for items in various places
    console.log('response.data?.items:', response?.data?.items);
    console.log('response.data?.cart?.items:', response?.data?.cart?.items);
    console.log('response.data?.cartItems:', response?.data?.cartItems);
    console.log('response.items:', response?.items);
    console.log('response.cart?.items:', response?.cart?.items);
    console.log('response.cartItems:', response?.cartItems);

    const items = extractCartItems(response);
    console.log('Extracted items:', items);

    if (items) {
      if (items.length === 0 && get().items.length > 0) return;

      saveCartToLocal(items);
      set(calculateTotals(items));
    } else {
      console.warn('No items found in response');
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
  console.log('=== ADDING ITEM TO CART ===');
  console.log('Input:', input);
  console.log('Quantity:', quantity);
  
  const newItem = buildCartItem(input, quantity);
  console.log('Built cart item:', newItem);

  set({ isLoading: true, error: null });
  try {
    await apiAddToCart({
      product_id: newItem.product_id,
      quantity: newItem.quantity
    });

    const optimisticItems = mergeCartItem(get().items, newItem);
    saveCartToLocal(optimisticItems);
    set(calculateTotals(optimisticItems));

    // Refetch cart to get the latest server state
    await get().fetchCart();

    if (!get().items.some((item) => item.product_id === newItem.product_id)) {
      const fallbackItems = mergeCartItem(get().items, newItem);
      saveCartToLocal(fallbackItems);
      set(calculateTotals(fallbackItems));
    }

  } catch (error) {
    console.error('Failed to add item:', error);
    set({ error: 'Failed to add item to cart' });
    throw error;
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

    set({ isLoading: true, error: null });
    try {
      await apiUpdateQuantity(product_id, quantity);

    } catch (error) {
      console.error('Failed to update item:', error);
      set({ error: 'Failed to sync cart update' });
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
      console.error('Failed to remove item:', error);
      set({ error: 'Failed to sync cart removal' });
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