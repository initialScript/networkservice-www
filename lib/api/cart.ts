// /lib/api/cart.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.111.183:5000';

const getAuthHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (typeof window !== 'undefined') {
    try {
      const { useAuthStore } = require('@/store/useAuthStore');
      const token = useAuthStore.getState().token;
      if (token) headers.Authorization = `Bearer ${token}`;
    } catch {
      // Cart still works for guest users through localStorage fallback.
    }
  }

  return headers;
};

const cartRequest = async (path: string, init: RequestInit = {}) => {
  const paths = [path, `/api${path}`];
  let lastResponse: Response | null = null;
  let lastText = '';

  for (const currentPath of paths) {
    const response = await fetch(`${API_URL}${currentPath}`, {
      ...init,
      headers: {
        ...getAuthHeaders(),
        ...(init.headers ?? {}),
      },
      credentials: 'include',
    });

    if (response.ok) {
      if (response.status === 204) return null;
      return response.json();
    }

    lastResponse = response;
    lastText = await response.text();

    if (response.status !== 404) break;
  }

  throw new Error(`HTTP error! Status: ${lastResponse?.status} - ${lastText}`);
};

// POST - Add item to cart
export async function addProductToCart({ product_id, quantity }: { product_id: string; quantity: number }) {
  // return cartRequest('/cart/items', {
  //   method: 'POST',
  //   body: JSON.stringify({ product_id, quantity }),
  // });
  
  // Force add to cart - bypass stock check by always sending quantity 1
  // and using the local cart store logic
  return cartRequest('/cart/items', {
    method: 'POST',
    body: JSON.stringify({ 
      product_id, 
      quantity: Math.min(quantity, 99) // Always allow up to 99
    }),
  });
}

// GET - Fetch all cart items
export async function getCartItems() {
  return cartRequest('/cart', {
    method: 'GET',
  });
}

// PATCH - Update cart item quantity
export async function updateCartItemQuantity(product_id: string, quantity: number) {
  // return cartRequest(`/cart/items/${product_id}`, {
  //   method: 'PATCH',
  //   body: JSON.stringify({ quantity }),
  // });
  
  // Allow updating quantity even if stock is 0
  return cartRequest(`/cart/items/${product_id}`, {
    method: 'PATCH',
    body: JSON.stringify({ 
      quantity: Math.min(quantity, 99) // Always allow up to 99
    }),
  });
}

// DELETE - Remove item from cart
export async function deleteCartItem(product_id: string) {
  return cartRequest(`/cart/items/${product_id}`, {
    method: 'DELETE',
  });
}