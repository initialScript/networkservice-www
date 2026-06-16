'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Check } from 'lucide-react';
import { register as registerService, login as loginService } from '@/lib/services/auth';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/lib/utils';

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const colors = ['bg-gray-200', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500'];
  const labels = ['', 'Très faible', 'Faible', 'Moyen', 'Fort'];

  if (!password) return null;

  return (
    <div className="mt-1.5 space-y-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn('flex-1 h-1 rounded-full transition-colors', i <= score ? colors[score] : 'bg-gray-200')}
          />
        ))}
      </div>
      {score > 0 && (
        <p className={cn('text-xs', score <= 1 ? 'text-red-500' : score <= 2 ? 'text-orange-500' : score <= 3 ? 'text-yellow-600' : 'text-green-600')}>
          {labels[score]}
        </p>
      )}
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const loginStore = useAuthStore((s) => s.login);

  const [step, setStep] = useState(1);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agreed, setAgreed] = useState(false);

  // Step 1 validation
  const [step1Errors, setStep1Errors] = useState({ firstName: '', lastName: '', email: '', phone: '' });

  const validateStep1 = () => {
    const e = { firstName: '', lastName: '', email: '', phone: '' };
    if (!firstName.trim()) e.firstName = 'Requis';
    if (!lastName.trim()) e.lastName = 'Requis';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Email invalide';
    setStep1Errors(e);
    return !Object.values(e).some(Boolean);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) return setError('Le mot de passe doit contenir au moins 8 caractères.');
    if (password !== confirm) return setError('Les mots de passe ne correspondent pas.');
    if (!agreed) return setError('Vous devez accepter les conditions d\'utilisation.');
    setError('');
    setLoading(true);
    try {
      await registerService({
        last_name: lastName.trim(),
        first_name: firstName.trim(),
        // name: `${firstName} ${lastName}`.trim(),
        email,
        password,
        phone: phone || undefined,
      });
      // Auto-login
      const data = await loginService({ email, password });
      loginStore(data.user, data.token);
      router.push('/compte');
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Une erreur est survenue. Veuillez réessayer.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Créer un compte — IRIS.MA</title>
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Logo */}
          <div className="mb-6 text-center">
            <span className="text-2xl font-extrabold text-[#0F3460]">IRIS<span className="text-[#E94560]">.MA</span></span>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-3 mb-6">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={cn(
                  'w-3 h-3 rounded-full transition-all',
                  s === step ? 'bg-[#0F3460] scale-110' : s < step ? 'bg-[#0F3460] opacity-40' : 'bg-gray-200',
                )}
              />
            ))}
          </div>

          <h1 className="text-xl font-bold text-gray-900 mb-1">Créer un compte</h1>
          <p className="text-sm text-gray-500 mb-6">
            {step === 1 ? 'Étape 1 : Informations personnelles' : 'Étape 2 : Sécurité'}
          </p>

          {/* ── Step 1 ── */}
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <InputField
                  label="Prénom *"
                  value={firstName}
                  onChange={setFirstName}
                  error={step1Errors.firstName}
                  autoComplete="given-name"
                />
                <InputField
                  label="Nom *"
                  value={lastName}
                  onChange={setLastName}
                  error={step1Errors.lastName}
                  autoComplete="family-name"
                />
              </div>

              <InputField
                label="Adresse e-mail *"
                type="email"
                value={email}
                onChange={setEmail}
                error={step1Errors.email}
                autoComplete="email"
                placeholder="vous@exemple.com"
              />

              <InputField
                label="Téléphone"
                type="tel"
                value={phone}
                onChange={setPhone}
                placeholder="+212 6 XX XX XX XX"
                autoComplete="tel"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0F3460] text-white text-sm font-semibold hover:bg-[#0a2444] transition"
              >
                Continuer
              </button>
            </form>
          )}

          {/* ── Step 2 ── */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Mot de passe *</label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
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
                <PasswordStrength password={password} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Confirmer le mot de passe *</label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    autoComplete="new-password"
                    className={cn(
                      'w-full border rounded-xl px-4 py-2.5 text-sm pr-11 focus:outline-none focus:ring-2 transition',
                      confirm && confirm !== password
                        ? 'border-red-300 focus:ring-red-200'
                        : confirm && confirm === password
                        ? 'border-green-400 focus:ring-green-200'
                        : 'border-gray-200 focus:ring-[#0F3460]/25',
                    )}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400 transition"
                  >
                    {confirm && confirm === password ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : showConfirm ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#0F3460]"
                />
                <span className="text-sm text-gray-600">
                  J&apos;accepte les{' '}
                  <Link href="#" className="text-[#0F3460] hover:underline">
                    conditions d&apos;utilisation
                  </Link>
                </span>
              </label>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    'flex-1 py-3 rounded-xl text-sm font-semibold text-white transition flex items-center justify-center gap-2',
                    loading ? 'bg-[#E94560]/70 cursor-not-allowed' : 'bg-[#E94560] hover:bg-[#c73350]',
                  )}
                >
                  {loading && (
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  )}
                  Créer mon compte
                </button>
              </div>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-gray-500">
            Déjà un compte ?{' '}
            <Link href="../login" className="text-[#0F3460] font-semibold hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

function InputField({
  label,
  value,
  onChange,
  error,
  type = 'text',
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={cn(
          'w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition',
          error ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-[#0F3460]/25',
        )}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
