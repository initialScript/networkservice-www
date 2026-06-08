'use client';

import { useAuthStore } from '@/store/useAuthStore';

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const loginStore = useAuthStore((s) => s.login);
  const logoutStore = useAuthStore((s) => s.logout);

  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

  return { user, token, isAuthenticated, isAdmin, login: loginStore, logout: logoutStore };
}
