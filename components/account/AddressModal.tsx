'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import api from '@/lib/api';
import { cn } from '@/lib/utils';

export interface Address {
  id?: number;
  label?: string;
  full_name: string;
  phone: string;
  address_line: string;
  city: string;
  region: string;
  zip?: string;
  is_default?: boolean;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSaved: (address: Address) => void;
  initial?: Address | null;
}

const EMPTY: Address = {
  label: '',
  full_name: '',
  phone: '',
  address_line: '',
  city: '',
  region: '',
  zip: '',
  is_default: false,
};

export default function AddressModal({ open, onClose, onSaved, initial }: Props) {
  const [form, setForm] = useState<Address>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Address, string>>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (open) {
      setForm(initial ?? EMPTY);
      setErrors({});
      setApiError('');
    }
  }, [open, initial]);

  const set = (field: keyof Address, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  const validate = () => {
    const e: typeof errors = {};
    if (!form.full_name.trim()) e.full_name = 'Champ requis';
    if (!form.phone.trim()) e.phone = 'Champ requis';
    if (!form.address_line.trim()) e.address_line = 'Champ requis';
    if (!form.city.trim()) e.city = 'Champ requis';
    if (!form.region.trim()) e.region = 'Champ requis';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError('');
    try {
      let saved: Address;
      if (form.id) {
        const r = await api.put(`/api/me/addresses/${form.id}`, form);
        saved = r.data;
      } else {
        const r = await api.post('/api/me/addresses', form);
        saved = r.data;
      }
      onSaved(saved);
      onClose();
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Une erreur est survenue';
      setApiError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">
            {form.id ? 'Modifier l\'adresse' : 'Ajouter une adresse'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 max-h-[70dvh] overflow-y-auto">
          {apiError && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {apiError}
            </p>
          )}

          <Field
            label="Étiquette"
            placeholder="Domicile, Bureau..."
            value={form.label ?? ''}
            onChange={(v) => set('label', v)}
          />

          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Nom complet *"
              value={form.full_name}
              onChange={(v) => set('full_name', v)}
              error={errors.full_name}
            />
            <Field
              label="Téléphone *"
              placeholder="+212..."
              value={form.phone}
              onChange={(v) => set('phone', v)}
              error={errors.phone}
              type="tel"
            />
          </div>

          <Field
            label="Adresse *"
            value={form.address_line}
            onChange={(v) => set('address_line', v)}
            error={errors.address_line}
            multiline
          />

          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Ville *"
              value={form.city}
              onChange={(v) => set('city', v)}
              error={errors.city}
            />
            <Field
              label="Région *"
              value={form.region}
              onChange={(v) => set('region', v)}
              error={errors.region}
            />
          </div>

          <Field
            label="Code postal"
            value={form.zip ?? ''}
            onChange={(v) => set('zip', v)}
          />

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={!!form.is_default}
              onChange={(e) => set('is_default', e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#0F3460]"
            />
            <span className="text-sm text-gray-700">Définir comme adresse par défaut</span>
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-[#0F3460] text-white text-sm font-semibold hover:bg-[#0a2444] disabled:opacity-60 transition flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              )}
              {form.id ? 'Enregistrer' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
  type = 'text',
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  type?: string;
  multiline?: boolean;
}) {
  const base = cn(
    'w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition',
    error
      ? 'border-red-300 focus:ring-red-200'
      : 'border-gray-200 focus:ring-[#0F3460]/20',
  );
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-600">{label}</label>
      {multiline ? (
        <textarea
          rows={3}
          className={base}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={type}
          className={base}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
