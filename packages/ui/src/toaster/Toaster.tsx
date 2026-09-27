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

export type ToastVariant =
  | "default"
  | "neutral"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"
  | "primary"
  | "secondary"
  | "glassmorphic"
  | "glass"
  | "solid"
  | "outline"
  | "minimal";

export type ToastStyle =
  | "subtle"
  | "solid"
  | "outline"
  | "glassmorphic"
  | "glass"
  | "minimal";

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
  toastStyle?: ToastStyle;
  styleVariant?: ToastStyle;
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

export type ToastOptions = Partial<Omit<Toast, "id" | "title">>;

export interface ToastMethods {
  (toast: Omit<Toast, "id">): string;
  success: (title: React.ReactNode, options?: ToastOptions) => string;
  error: (title: React.ReactNode, options?: ToastOptions) => string;
  warning: (title: React.ReactNode, options?: ToastOptions) => string;
  info: (title: React.ReactNode, options?: ToastOptions) => string;
  loading: (title: React.ReactNode, options?: ToastOptions) => string;
  default: (title: React.ReactNode, options?: ToastOptions) => string;
  neutral: (title: React.ReactNode, options?: ToastOptions) => string;
  primary: (title: React.ReactNode, options?: ToastOptions) => string;
  secondary: (title: React.ReactNode, options?: ToastOptions) => string;
  glassmorphic: (title: React.ReactNode, options?: ToastOptions) => string;
  glass: (title: React.ReactNode, options?: ToastOptions) => string;
  solid: (title: React.ReactNode, options?: ToastOptions) => string;
  outline: (title: React.ReactNode, options?: ToastOptions) => string;
  minimal: (title: React.ReactNode, options?: ToastOptions) => string;
  promise: <T>(
    promise: Promise<T>,
    msgs: {
      loading: React.ReactNode;
      success: React.ReactNode | ((data: T) => React.ReactNode);
      error: React.ReactNode | ((err: any) => React.ReactNode);
    },
    options?: ToastOptions,
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
  default: (
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
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  neutral: (
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
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  primary: (
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  secondary: (
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
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  glassmorphic: (
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  glass: (
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  solid: (
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
  outline: (
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
  minimal: (
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
};

export interface ToasterProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  defaultVariant?: ToastVariant;
  defaultStyle?: ToastStyle;
}

export function ToasterProvider({
  children,
  position = "bottom-right",
  defaultVariant = "info",
  defaultStyle = "subtle",
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
      baseToast({ ...options, title, variant: options?.variant ?? "success" });

    fn.error = (title, options) =>
      baseToast({ ...options, title, variant: options?.variant ?? "error" });

    fn.warning = (title, options) =>
      baseToast({ ...options, title, variant: options?.variant ?? "warning" });

    fn.info = (title, options) =>
      baseToast({ ...options, title, variant: options?.variant ?? "info" });

    fn.loading = (title, options) =>
      baseToast({
        ...options,
        title,
        variant: options?.variant ?? "loading",
        duration: 0,
      });

    fn.default = (title, options) =>
      baseToast({ ...options, title, variant: options?.variant ?? "default" });

    fn.neutral = (title, options) =>
      baseToast({ ...options, title, variant: options?.variant ?? "neutral" });

    fn.primary = (title, options) =>
      baseToast({ ...options, title, variant: options?.variant ?? "primary" });

    fn.secondary = (title, options) =>
      baseToast({
        ...options,
        title,
        variant: options?.variant ?? "secondary",
      });

    fn.glassmorphic = (title, options) =>
      baseToast({
        ...options,
        title,
        variant: options?.variant ?? "glassmorphic",
        toastStyle: options?.toastStyle ?? "glassmorphic",
      });

    fn.glass = (title, options) =>
      baseToast({
        ...options,
        title,
        variant: options?.variant ?? "glass",
        toastStyle: options?.toastStyle ?? "glass",
      });

    fn.solid = (title, options) =>
      baseToast({
        ...options,
        title,
        variant: options?.variant ?? "solid",
        toastStyle: options?.toastStyle ?? "solid",
      });

    fn.outline = (title, options) =>
      baseToast({
        ...options,
        title,
        variant: options?.variant ?? "outline",
        toastStyle: options?.toastStyle ?? "outline",
      });

    fn.minimal = (title, options) =>
      baseToast({
        ...options,
        title,
        variant: options?.variant ?? "minimal",
        toastStyle: options?.toastStyle ?? "minimal",
      });

    fn.promise = async <T,>(
      promise: Promise<T>,
      msgs: {
        loading: React.ReactNode;
        success: React.ReactNode | ((data: T) => React.ReactNode);
        error: React.ReactNode | ((err: any) => React.ReactNode);
      },
      options?: ToastOptions,
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
        const toastVariant = t.variant ?? defaultVariant;
        const resolvedStyle =
          t.toastStyle ??
          t.styleVariant ??
          (toastVariant === "glassmorphic" || toastVariant === "glass"
            ? "glassmorphic"
            : toastVariant === "solid"
            ? "solid"
            : toastVariant === "outline"
            ? "outline"
            : toastVariant === "minimal"
            ? "minimal"
            : defaultStyle);
        const toastSize = t.size ?? "md";
        const toastIcon =
          t.icon ??
          defaultIcons[toastVariant] ??
          defaultIcons.info;

        return (
          <div
            key={t.id}
            className={[
              "gy-toast",
              `gy-toast--${toastVariant}`,
              resolvedStyle && resolvedStyle !== "subtle"
                ? `gy-toast--style-${resolvedStyle}`
                : "",
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
