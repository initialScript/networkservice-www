'use client';

import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Toast as ToastItem } from '@/hooks/useToast';

const CONFIG = {
  success: {
    icon: CheckCircle,
    bar: 'bg-green-500',
    text: 'text-green-700',
    bg: 'bg-green-50 border-green-200',
  },
  error: {
    icon: AlertCircle,
    bar: 'bg-red-500',
    text: 'text-red-700',
    bg: 'bg-red-50 border-red-200',
  },
  info: {
    icon: Info,
    bar: 'bg-blue-500',
    text: 'text-blue-700',
    bg: 'bg-blue-50 border-blue-200',
  },
};

interface Props {
  toasts: ToastItem[];
  dismiss: (id: string) => void;
}

export function ToastContainer({ toasts, dismiss }: Props) {
  if (toasts.length === 0) return null;
  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 end-4 z-[9999] flex flex-col gap-2 pointer-events-none"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} dismiss={dismiss} />
      ))}
    </div>
  );
}

function ToastItem({ toast, dismiss }: { toast: ToastItem; dismiss: (id: string) => void }) {
  const cfg = CONFIG[toast.type];
  const Icon = cfg.icon;

  return (
    <div
      className={cn(
        'pointer-events-auto flex items-start gap-3 min-w-[260px] max-w-sm px-4 py-3 rounded-xl border shadow-lg',
        'animate-in slide-in-from-right-4 fade-in duration-200',
        cfg.bg,
      )}
      role="alert"
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', cfg.text)} />
      <p className={cn('flex-1 text-sm font-medium', cfg.text)}>{toast.message}</p>
      <button
        type="button"
        onClick={() => dismiss(toast.id)}
        className={cn('p-0.5 rounded hover:opacity-70 transition flex-shrink-0', cfg.text)}
        aria-label="Fermer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
