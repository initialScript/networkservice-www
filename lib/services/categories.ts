import api from '@/lib/api';

export const getCategories = () =>
  api.get('/api/categories').then((r) => r.data);

export const getCategory = (slug: string) =>
  api.get(`/api/categories/${slug}`).then((r) => r.data);
