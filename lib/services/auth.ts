import api from '@/lib/api';

export interface RegisterData {
  last_name: string;
  first_name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const register = (data: RegisterData) =>
  api.post('/api/auth/register', data).then((r) => r.data);

export const login = (data: LoginData) =>
  api.post<{ success: boolean; user: { id: number; first_name: string; last_name: string; email: string; role: string }; token: string }>(
    '/api/auth/login',
    data
  ).then((r) => r.data);

export const getMe = () =>
  api.post('/api/auth/me').then((r) => r.data);
