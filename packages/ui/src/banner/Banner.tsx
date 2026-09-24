"use client";

import React, { useState } from "react";
import "./banner.css";

export type BannerVariant =
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "neutral";
export type BannerStyle = "subtle" | "solid" | "outline";
export type BannerSize = "sm" | "md" | "lg";

const defaultIcons: Record<BannerVariant, React.ReactNode> = {
  info: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  success: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  warning: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  danger: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  neutral: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
};

export interface BannerProps {
  /** The semantic variant/color theme of the banner ('info', 'success', 'warning', 'danger', 'neutral'). Default is 'info'. */
  variant?: BannerVariant;
  /** Visual style variant ('subtle', 'solid', 'outline'). Default is 'subtle'. */
  bannerStyle?: BannerStyle;
  /** Title header element or text displayed at the top of the banner. */
  title?: React.ReactNode;
  /** Description message content displayed within the banner body. */
  description?: React.ReactNode;
  /** Size variant controlling banner padding and font sizes ('sm', 'md', 'lg'). Default is 'md'. */
  size?: BannerSize;
  /** Custom leading icon to replace the default variant icon. */
  icon?: React.ReactNode;
  /** Custom action element or button displayed on the right side of the banner. */
  button?: React.ReactNode;
  /** Whether the banner takes up the full width of its container. Default is true. */
  fullWidth?: boolean;
  /** Whether to render a close button allowing users to dismiss the banner. Default is false. */
  dismissible?: boolean;
  /** Callback triggered when the dismiss close button is clicked. */
  onDismiss?: () => void;
  /** Additional CSS class names to apply to the root banner container. */
  className?: string;
  /** Whether to render a border around the banner. Default is true. */
  bordered?: boolean;
  /** Children content passed as fallback or alternative for description. */
  children?: React.ReactNode;
}

export function Banner({
  variant = "info",
  bannerStyle = "subtle",
  title,
  description,
  size = "md",
  icon,
  button,
  fullWidth = true,
  dismissible = false,
  onDismiss,
  className = "",
  bordered = true,
  children,
}: BannerProps) {
  const [isDismissing, setIsDismissing] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setIsDismissing(true);
    setTimeout(() => {
      setDismissed(true);
      onDismiss?.();
    }, 280);
  };

  const bodyContent = children ?? description;
  const isSingleLine = !title || !bodyContent;

  const rootClasses = [
    "gy-banner",
    `gy-banner--${variant}`,
    `gy-banner--${bannerStyle}`,
    `gy-banner--${size}`,
    fullWidth ? "gy-banner--full-width" : "",
    bordered ? "gy-banner--bordered" : "",
    isSingleLine ? "gy-banner--single-line" : "",
    isDismissing ? "gy-banner--dismissing" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={`gy-banner-wrapper ${isDismissing ? "gy-banner-wrapper--dismissing" : ""} ${fullWidth ? "gy-banner-wrapper--full-width" : ""}`}
    >
      <div className="gy-banner-wrapper__inner">
        <div className={rootClasses} role="alert">
          <span className="gy-banner__icon">
            {icon ?? defaultIcons[variant]}
          </span>
          <div className="gy-banner__content">
            {title && <div className="gy-banner__title">{title}</div>}
            {bodyContent && (
              <div className="gy-banner__description">{bodyContent}</div>
            )}
          </div>
          {button && <div className="gy-banner__action">{button}</div>}
          {dismissible && (
            <button
              type="button"
              className="gy-banner__close"
              onClick={handleDismiss}
              aria-label="Dismiss banner"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
