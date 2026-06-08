import api from '@/lib/api';

export interface CreateOrderData {
  address_id: number;
  coupon?: string;
  notes?: string;
}

export const createOrder = (data: CreateOrderData) =>
  api.post('/api/orders', data).then((r) => r.data);

export const getOrders = () =>
  api.get('/api/orders').then((r) => r.data);

export const getOrder = (id: string | number) =>
  api.get(`/api/orders/${id}`).then((r) => r.data);
