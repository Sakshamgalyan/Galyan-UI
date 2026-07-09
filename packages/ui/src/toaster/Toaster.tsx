'use client';

import React, { createContext, useCallback, useContext, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { Spinner } from '../spinner/Spinner';
import './toaster.css';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'loading';
export type ToastPosition =
  | 'top-right' | 'top-left' | 'top-center'
  | 'bottom-right' | 'bottom-left' | 'bottom-center';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  dismissible?: boolean;
}

interface ToastContextValue {
  toasts: Toast[];
  toast: (toast: Omit<Toast, 'id'>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const icons: Record<ToastVariant, React.ReactNode> = {
  success: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="7"/><polyline points="5,8 7,10 11,6"/></svg>,
  error: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="7"/><line x1="8" y1="5" x2="8" y2="9"/><circle cx="8" cy="11.5" r="0.5" fill="#ef4444"/></svg>,
  warning: <svg width="16" height="16" viewBox="0 0 16 16" fill="#f59e0b"><path d="M8 2L1 14h14L8 2zm0 4v4m0 2v.01" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  info: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="7"/><line x1="8" y1="8" x2="8" y2="12"/><circle cx="8" cy="5" r="0.5" fill="#0ea5e9"/></svg>,
  loading: <Spinner size="xs" />,
};

export function ToasterProvider({ children, position = 'top-right' }: { children: React.ReactNode; position?: ToastPosition }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => setToasts([]), []);

  const toast = useCallback((data: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    const duration = data.duration ?? (data.variant === 'loading' ? 0 : 4000);
    const newToast: Toast = { ...data, id, duration };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => dismiss(id), duration);
    }

    return id;
  }, [dismiss]);

  const isLeft = position.includes('left');

  const toasterNode = (
    <div className={`gy-toaster gy-toaster--${position}`}>
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`gy-toast gy-toast--${t.variant ?? 'info'} ${isLeft ? 'gy-toast--left' : ''}`}
          role="alert"
          aria-live="polite"
        >
          <div className="gy-toast-accent" />
          <span className="gy-toast-icon">{icons[t.variant ?? 'info']}</span>
          <div className="gy-toast-content">
            <div className="gy-toast-title">{t.title}</div>
            {t.description && <div className="gy-toast-description">{t.description}</div>}
          </div>
          {(t.dismissible ?? true) && (
            <button className="gy-toast-close" onClick={() => dismiss(t.id)} aria-label="Dismiss">
              <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="1" y1="1" x2="11" y2="11" /><line x1="11" y1="1" x2="1" y2="11" />
              </svg>
            </button>
          )}
          {t.duration && t.duration > 0 && (
            <div className="gy-toast-progress">
              <div className="gy-toast-progress-bar" style={{ animationDuration: `${t.duration}ms` }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss, dismissAll }}>
      {children}
      {typeof document !== 'undefined' && createPortal(toasterNode, document.body)}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToasterProvider');
  return ctx;
}
