// TODO: Extract cart API calls here if useCartStore grows too large
// The cart store (store/useCartStore.ts) currently calls the API directly.
import api from '@/lib/api';

export const getCart = () =>
  api.get('/api/cart').then((r) => r.data);

export const addCartItem = (product_id: number, quantity: number) =>
  api.post('/api/cart/items', { product_id, quantity }).then((r) => r.data);

export const updateCartItem = (product_id: number, quantity: number) =>
  api.patch(`/api/cart/items/${product_id}`, { quantity }).then((r) => r.data);

export const removeCartItem = (product_id: number) =>
  api.delete(`/api/cart/items/${product_id}`).then((r) => r.data);
