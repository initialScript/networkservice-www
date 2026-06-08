import api from '@/lib/api';

export interface ProductsParams {
  category?: string;
  page?: number;
  limit?: number;
  sort?: string;
  min_price?: number;
  max_price?: number;
  brand?: string;
  [key: string]: unknown;
}

export const getProducts = (params?: ProductsParams) =>
  api.get('/api/products', { params }).then((r) => r.data);

export const getProduct = (slug: string) =>
  api.get(`/api/products/${slug}`).then((r) => r.data);

export const getRelated = (slug: string) =>
  api.get(`/api/products/${slug}/related`).then((r) => r.data);

export const searchProducts = (q: string) =>
  api.get('/api/search', { params: { q } }).then((r) => r.data);
