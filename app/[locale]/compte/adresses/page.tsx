'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, MapPin } from 'lucide-react';
import api from '@/lib/api';
import AddressModal, { type Address } from '@/components/account/AddressModal';
import { ToastContainer } from '@/components/ui/Toast';
import { useToast } from '@/hooks/useToast';
import Skeleton from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';

export default function AdressesPage() {
  const { toasts, success, error: toastError, dismiss } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Address | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    api
      .get('/api/me/addresses')
      .then((r) => {
        const list: Address[] = Array.isArray(r.data) ? r.data : r.data?.addresses ?? [];
        setAddresses(list);
      })
      .catch(() => setAddresses([]))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (addr: Address) => { setEditing(addr); setModalOpen(true); };

  const handleSaved = (saved: Address) => {
    setAddresses((prev) => {
      const idx = prev.findIndex((a) => a.id === saved.id);
      if (idx >= 0) { const next = [...prev]; next[idx] = saved; return next; }
      return [...prev, saved];
    });
    success(saved.id ? 'Adresse modifiée' : 'Adresse ajoutée');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cette adresse ?')) return;
    setDeletingId(id);
    try {
      await api.delete(`/api/me/addresses/${id}`);
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      success('Adresse supprimée');
    } catch {
      toastError('Impossible de supprimer l\'adresse.');
    } finally {
      setDeletingId(null);
    }
  };

  const setDefault = async (id: number) => {
    // Optimistic update
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, is_default: a.id === id })),
    );
    try {
      await api.patch(`/api/me/addresses/${id}/default`);
      success('Adresse par défaut mise à jour');
    } catch {
      toastError('Impossible de mettre à jour l\'adresse par défaut.');
      load(); // revert
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} dismiss={dismiss} />
      <AddressModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={handleSaved}
        initial={editing}
      />

      <h1 className="text-xl font-bold text-gray-900 mb-6">Mes adresses</h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-44 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={cn(
                'bg-white border rounded-2xl p-5 shadow-sm relative',
                addr.is_default ? 'border-[#0F3460]' : 'border-gray-100',
              )}
            >
              {/* Label badge */}
              {addr.label && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full mb-2">
                  <MapPin className="w-3 h-3" /> {addr.label}
                </span>
              )}

              {/* Default badge */}
              {addr.is_default && (
                <span className="absolute top-4 end-4 text-xs font-semibold bg-[#0F3460] text-white px-2 py-0.5 rounded-full">
                  Par défaut
                </span>
              )}

              <address className="not-italic text-sm text-gray-700 space-y-0.5 mb-4">
                <p className="font-semibold text-gray-900">{addr.full_name}</p>
                <p>{addr.address_line}</p>
                <p>{addr.city}{addr.region ? `, ${addr.region}` : ''} {addr.zip}</p>
                <p className="text-gray-500">{addr.phone}</p>
              </address>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(addr)}
                  className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-[#0F3460] transition"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Modifier
                </button>
                <button
                  type="button"
                  onClick={() => addr.id && handleDelete(addr.id)}
                  disabled={deletingId === addr.id}
                  className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-red-500 transition disabled:opacity-40"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Supprimer
                </button>
                {!addr.is_default && (
                  <button
                    type="button"
                    onClick={() => addr.id && setDefault(addr.id)}
                    className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-[#0F3460] transition"
                  >
                    Définir par défaut
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Add card */}
          <button
            type="button"
            onClick={openCreate}
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl p-5 text-gray-400 hover:border-[#0F3460] hover:text-[#0F3460] transition min-h-[140px]"
          >
            <Plus className="w-7 h-7" />
            <span className="text-sm font-medium">Ajouter une adresse</span>
          </button>
        </div>
      )}
    </>
  );
}
