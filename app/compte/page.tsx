'use client';

import { useState } from 'react';
import { Eye, EyeOff, Edit2, X, Check } from 'lucide-react';
import api from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';
import { ToastContainer } from '@/components/ui/Toast';
import { useToast } from '@/hooks/useToast';
import Skeleton from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';

function PasswordStrengthBar({ password }: { password: string }) {
  const score = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;

  if (!password) return null;
  const colors = ['', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500'];
  return (
    <div className="flex gap-1 mt-1.5">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={cn('flex-1 h-1 rounded-full', i <= score ? colors[score] : 'bg-gray-200')}
        />
      ))}
    </div>
  );
}

export default function ProfilePage() {
  const { toasts, success, error: toastError, dismiss } = useToast();
  const user = useAuthStore((s) => s.user);
  const loginStore = useAuthStore((s) => s.login);
  const accessToken = useAuthStore((s) => s.token);

  // Profile edit state
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState(user?.first_name ?? '');
  const [lastName, setLastName] = useState(user?.last_name ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [profileLoading, setProfileLoading] = useState(false);

  // Password change state
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwError, setPwError] = useState('');

  const cancelEdit = () => {
    setFirstName(user?.first_name ?? '');
    setLastName(user?.last_name ?? '');
    setPhone(user?.phone ?? '');
    setEditMode(false);
  };

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const r = await api.patch('/api/me/profile', {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone,
      });
      // Keep store in sync
      if (accessToken) {
        loginStore(r.data.user ?? r.data, accessToken);
      }
      success('Profil mis à jour avec succès');
      setEditMode(false);
    } catch {
      toastError('Impossible de mettre à jour le profil.');
    } finally {
      setProfileLoading(false);
    }
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError('');
    if (newPw.length < 8) return setPwError('Le mot de passe doit contenir au moins 8 caractères.');
    if (newPw !== confirmPw) return setPwError('Les mots de passe ne correspondent pas.');
    setPwLoading(true);
    try {
      await api.patch('/api/me/password', { current_password: currentPw, new_password: newPw });
      success('Mot de passe modifié avec succès');
      setCurrentPw('');
      setNewPw('');
      setConfirmPw('');
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Mot de passe actuel incorrect.';
      setPwError(msg);
    } finally {
      setPwLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-52 w-full rounded-2xl" />
      </div>
    );
  }

  const roleBadge: Record<string, string> = {
    admin: 'Administrateur',
    super_admin: 'Super Admin',
    b2b: 'Compte B2B',
    customer: 'Client',
  };

  return (
    <>
      <ToastContainer toasts={toasts} dismiss={dismiss} />

      <div className="space-y-6">
        <h1 className="text-xl font-bold text-gray-900">Mon profil</h1>

        {/* Card 1 — Personal info */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-gray-800">Informations personnelles</h2>
            {!editMode && (
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="flex items-center gap-1.5 text-sm text-[#0F3460] hover:underline font-medium"
              >
                <Edit2 className="w-3.5 h-3.5" /> Modifier
              </button>
            )}
          </div>

          {editMode ? (
            <form onSubmit={saveProfile} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <ProfileInput label="Prénom" value={firstName} onChange={setFirstName} />
                <ProfileInput label="Nom" value={lastName} onChange={setLastName} />
              </div>
              <ProfileInput label="Téléphone" value={phone} onChange={setPhone} type="tel" />

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
                >
                  <X className="w-4 h-4" /> Annuler
                </button>
                <button
                  type="submit"
                  disabled={profileLoading}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#0F3460] rounded-xl hover:bg-[#0a2444] disabled:opacity-60 transition"
                >
                  {profileLoading ? (
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  Enregistrer
                </button>
              </div>
            </form>
          ) : (
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              <InfoRow label="Nom complet" value={`${user.first_name} ${user.last_name}`.trim()} />
              <InfoRow label="E-mail" value={user.email} />
              {user.phone && <InfoRow label="Téléphone" value={user.phone} />}
              <div>
                <dt className="text-xs text-gray-400 mb-0.5">Rôle</dt>
                <dd>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#0F3460]/10 text-[#0F3460]">
                    {roleBadge[user.role ?? 'customer'] ?? user.role}
                  </span>
                </dd>
              </div>
            </dl>
          )}
        </div>

        {/* Card 2 — Change password */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-5">Changer le mot de passe</h2>
          <form onSubmit={changePassword} className="space-y-4 max-w-md">
            {pwError && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                {pwError}
              </p>
            )}

            <PwInput
              label="Mot de passe actuel"
              value={currentPw}
              onChange={setCurrentPw}
              show={showCurrent}
              onToggle={() => setShowCurrent((v) => !v)}
              autoComplete="current-password"
            />
            <div>
              <PwInput
                label="Nouveau mot de passe"
                value={newPw}
                onChange={setNewPw}
                show={showNew}
                onToggle={() => setShowNew((v) => !v)}
                autoComplete="new-password"
              />
              <PasswordStrengthBar password={newPw} />
            </div>
            <PwInput
              label="Confirmer le nouveau mot de passe"
              value={confirmPw}
              onChange={setConfirmPw}
              show={showNew}
              onToggle={() => setShowNew((v) => !v)}
              autoComplete="new-password"
            />

            <button
              type="submit"
              disabled={pwLoading || !currentPw || !newPw || !confirmPw}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#0F3460] text-white text-sm font-semibold rounded-xl hover:bg-[#0a2444] disabled:opacity-50 transition"
            >
              {pwLoading && (
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              )}
              Mettre à jour
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <dt className="text-xs text-gray-400 mb-0.5">{label}</dt>
      <dd className="text-sm font-medium text-gray-800">{value ?? '—'}</dd>
    </div>
  );
}

function ProfileInput({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3460]/20 transition"
      />
    </div>
  );
}

function PwInput({
  label,
  value,
  onChange,
  show,
  onToggle,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-600">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-[#0F3460]/20 transition"
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={onToggle}
          className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
