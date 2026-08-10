"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Spinner } from "../spinner/Spinner";
import "./toaster.css";

export type ToastVariant = "success" | "error" | "warning" | "info" | "loading";
export type ToastSize = "sm" | "md" | "lg";
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

export interface Toast {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  size?: ToastSize;
  duration?: number;
  autoHideDuration?: number;
  dismissible?: boolean;
  actions?: React.ReactNode;
  onDismiss?: () => void;
  icon?: React.ReactNode;
  className?: string;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

interface ToastContextValue {
  toasts: Toast[];
  toast: (toast: Omit<Toast, "id">) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const defaultIcons: Record<ToastVariant, React.ReactNode> = {
  success: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="none"
      stroke="#10b981"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8" r="7" />
      <polyline points="5,8 7,10 11,6" />
    </svg>
  ),
  error: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="none"
      stroke="#ef4444"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8" r="7" />
      <line x1="8" y1="5" x2="8" y2="9" />
      <circle cx="8" cy="11.5" r="0.5" fill="#ef4444" />
    </svg>
  ),
  warning: (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="#f59e0b">
      <path
        d="M8 2L1 14h14L8 2zm0 4v4m0 2v.01"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  info: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="none"
      stroke="#0ea5e9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8" r="7" />
      <line x1="8" y1="8" x2="8" y2="12" />
      <circle cx="8" cy="5" r="0.5" fill="#0ea5e9" />
    </svg>
  ),
  loading: <Spinner size="xs" />,
};

export interface ToasterProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
}

export function ToasterProvider({
  children,
  position = "bottom-right",
}: ToasterProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => {
      const target = prev.find((t) => t.id === id);
      target?.onDismiss?.();
      return prev.filter((t) => t.id !== id);
    });
  }, []);

  const dismissAll = useCallback(() => {
    toasts.forEach((t) => t.onDismiss?.());
    setToasts([]);
  }, [toasts]);

  const toast = useCallback(
    (data: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).slice(2);
      const duration =
        data.autoHideDuration ??
        data.duration ??
        (data.variant === "loading" ? 0 : 4000);
      const newToast: Toast = { ...data, id, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
      }

      return id;
    },
    [dismiss],
  );

  const isLeft = position.includes("left");

  const toasterNode = (
    <div className={`gy-toaster gy-toaster--${position}`}>
      {toasts.length > 1 && (
        <button className="gy-toast-clear-all" onClick={dismissAll}>
          Clear All ({toasts.length})
        </button>
      )}

      {toasts.map((t) => {
        const toastVariant = t.variant ?? "info";
        const toastSize = t.size ?? "md";
        const toastIcon = t.icon ?? defaultIcons[toastVariant];

        return (
          <div
            key={t.id}
            className={[
              "gy-toast",
              `gy-toast--${toastVariant}`,
              `gy-toast--${toastSize}`,
              isLeft ? "gy-toast--left" : "",
              t.className ?? "",
            ]
              .filter(Boolean)
              .join(" ")}
            role="alert"
            aria-live="polite"
            {...t.containerProps}
          >
            <div className="gy-toast-accent" />
            <span className="gy-toast-icon">{toastIcon}</span>
            <div className="gy-toast-content">
              <div className="gy-toast-title">{t.title}</div>
              {t.description && (
                <div className="gy-toast-description">{t.description}</div>
              )}
              {t.actions && <div className="gy-toast-actions">{t.actions}</div>}
            </div>
            {(t.dismissible ?? true) && (
              <button
                className="gy-toast-close"
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="1" y1="1" x2="11" y2="11" />
                  <line x1="11" y1="1" x2="1" y2="11" />
                </svg>
              </button>
            )}
            {t.duration && t.duration > 0 && (
              <div className="gy-toast-progress">
                <div
                  className="gy-toast-progress-bar"
                  style={{ animationDuration: `${t.duration}ms` }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss, dismissAll }}>
      {children}
      {mounted && createPortal(toasterNode, document.body)}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToasterProvider");
  return ctx;
}
