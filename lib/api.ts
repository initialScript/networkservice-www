import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: '',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Attach stored token — client side only
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useAuthStore } = require('@/store/useAuthStore');
    const token: string | null = useAuthStore.getState().token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On 401, clear auth state and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const url = (error.config as InternalAxiosRequestConfig)?.url ?? '';
    const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/register');

    if (error.response?.status === 401 && !isAuthEndpoint && typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { useAuthStore } = require('@/store/useAuthStore');
      useAuthStore.getState().logout();
      window.location.href = '/fr/auth/login';
    }

    return Promise.reject(error);
  }
);

export default api;
