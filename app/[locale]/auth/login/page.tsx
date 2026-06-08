'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { login as loginService } from '@/lib/services/auth';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get('redirect');

  const loginStore = useAuthStore((s) => s.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await loginService({ email, password });
      loginStore(data.user, data.token);
      const isAdmin = ['admin', 'super_admin'].includes(data.user.role);
      if (isAdmin) {
        window.location.href = process.env.NEXT_PUBLIC_ADMIN_URL ?? 'http://localhost:4200';
      } else {
        router.push(redirectParam ?? '/compte');
      }
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Email ou mot de passe incorrect.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Connexion — IRIS.MA</title>
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Logo */}
          <div className="mb-8 text-center">
            <span className="text-2xl font-extrabold text-[#0F3460]">IRIS<span className="text-[#E94560]">.MA</span></span>
          </div>

          <h1 className="text-xl font-bold text-gray-900 mb-6">Connexion à votre compte</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Adresse e-mail
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3460]/25 transition"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <Link
                  href="#"
                  className="text-xs text-[#0F3460] hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm pr-11 focus:outline-none focus:ring-2 focus:ring-[#0F3460]/25 transition"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={cn(
                'w-full py-3 rounded-xl text-sm font-semibold text-white transition flex items-center justify-center gap-2',
                loading ? 'bg-[#E94560]/70 cursor-not-allowed' : 'bg-[#E94560] hover:bg-[#c73350]',
              )}
            >
              {loading && (
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              )}
              Se connecter
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400">ou</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <p className="mt-4 text-center text-sm text-gray-500">
            Pas encore de compte ?{' '}
            <Link href="../register" className="text-[#0F3460] font-semibold hover:underline">
              Créer un compte
            </Link>
          </p>

          <p className="mt-3 text-center text-xs text-gray-400">
            Vous êtes une entreprise ?{' '}
            <Link href="../../b2b" className="text-[#0F3460] hover:underline font-medium">
              Espace B2B
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
