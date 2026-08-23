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

export interface ToastMethods {
  (toast: Omit<Toast, "id">): string;
  success: (
    title: React.ReactNode,
    options?: Partial<Omit<Toast, "id" | "title" | "variant">>,
  ) => string;
  error: (
    title: React.ReactNode,
    options?: Partial<Omit<Toast, "id" | "title" | "variant">>,
  ) => string;
  warning: (
    title: React.ReactNode,
    options?: Partial<Omit<Toast, "id" | "title" | "variant">>,
  ) => string;
  info: (
    title: React.ReactNode,
    options?: Partial<Omit<Toast, "id" | "title" | "variant">>,
  ) => string;
  loading: (
    title: React.ReactNode,
    options?: Partial<Omit<Toast, "id" | "title" | "variant">>,
  ) => string;
  promise: <T>(
    promise: Promise<T>,
    msgs: {
      loading: React.ReactNode;
      success: React.ReactNode | ((data: T) => React.ReactNode);
      error: React.ReactNode | ((err: any) => React.ReactNode);
    },
    options?: Partial<Omit<Toast, "id" | "title" | "variant">>,
  ) => Promise<T>;
}

interface ToastContextValue {
  toasts: Toast[];
  toast: ToastMethods;
  dismiss: (id: string) => void;
  dismissAll: () => void;
  update: (id: string, data: Partial<Omit<Toast, "id">>) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const defaultIcons: Record<ToastVariant, React.ReactNode> = {
  success: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="9 12 11.5 14.5 15.5 9.5" />
    </svg>
  ),
  error: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  warning: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  info: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
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

  const update = useCallback(
    (id: string, data: Partial<Omit<Toast, "id">>) => {
      setToasts((prev) =>
        prev.map((t) => {
          if (t.id !== id) return t;
          const duration =
            data.autoHideDuration ??
            data.duration ??
            t.duration ??
            (data.variant === "loading" ? 0 : 4000);
          return { ...t, ...data, duration };
        }),
      );

      const targetDuration =
        data.autoHideDuration ??
        data.duration ??
        (data.variant === "loading" ? 0 : 4000);
      if (targetDuration > 0) {
        setTimeout(() => dismiss(id), targetDuration);
      }
    },
    [dismiss],
  );

  const baseToast = useCallback(
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

  const toastMethods = React.useMemo(() => {
    const fn = ((data: Omit<Toast, "id">) => baseToast(data)) as ToastMethods;

    fn.success = (title, options) =>
      baseToast({ ...options, title, variant: "success" });

    fn.error = (title, options) =>
      baseToast({ ...options, title, variant: "error" });

    fn.warning = (title, options) =>
      baseToast({ ...options, title, variant: "warning" });

    fn.info = (title, options) =>
      baseToast({ ...options, title, variant: "info" });

    fn.loading = (title, options) =>
      baseToast({ ...options, title, variant: "loading", duration: 0 });

    fn.promise = async <T,>(
      promise: Promise<T>,
      msgs: {
        loading: React.ReactNode;
        success: React.ReactNode | ((data: T) => React.ReactNode);
        error: React.ReactNode | ((err: any) => React.ReactNode);
      },
      options?: Partial<Omit<Toast, "id" | "title" | "variant">>,
    ) => {
      const id = baseToast({
        ...options,
        title: msgs.loading,
        variant: "loading",
        duration: 0,
      });

      try {
        const result = await promise;
        const successTitle =
          typeof msgs.success === "function"
            ? msgs.success(result)
            : msgs.success;
        update(id, {
          title: successTitle,
          variant: "success",
          duration: options?.duration ?? 4000,
        });
        return result;
      } catch (err) {
        const errorTitle =
          typeof msgs.error === "function" ? msgs.error(err) : msgs.error;
        update(id, {
          title: errorTitle,
          variant: "error",
          duration: options?.duration ?? 4000,
        });
        throw err;
      }
    };

    return fn;
  }, [baseToast, update]);

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
    <ToastContext.Provider
      value={{
        toasts,
        toast: toastMethods,
        dismiss,
        dismissAll,
        update,
      }}
    >
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
