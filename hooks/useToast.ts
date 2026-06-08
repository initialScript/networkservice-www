'use client';

import { useState, useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

const MAX_TOASTS = 3;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const add = useCallback(
    (type: ToastType, message: string) => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((prev) => {
        const next = [...prev, { id, type, message }];
        return next.length > MAX_TOASTS ? next.slice(next.length - MAX_TOASTS) : next;
      });
      setTimeout(() => dismiss(id), 3000);
    },
    [dismiss],
  );

  const success = useCallback((msg: string) => add('success', msg), [add]);
  const error = useCallback((msg: string) => add('error', msg), [add]);
  const info = useCallback((msg: string) => add('info', msg), [add]);

  return { toasts, success, error, info, dismiss };
}
