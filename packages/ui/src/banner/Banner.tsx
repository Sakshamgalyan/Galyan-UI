'use client';

import React, { useState } from 'react';
import './banner.css';

export type BannerVariant = 'info' | 'success' | 'warning' | 'danger' | 'neutral';
export type BannerStyle = 'subtle' | 'solid' | 'outline';
export type BannerSize = 'sm' | 'md' | 'lg';

const defaultIcons: Record<BannerVariant, React.ReactNode> = {
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a1 1 0 110 2 1 1 0 010-2zm0 3a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 7z"/></svg>
  ),
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm3.78 5.78a.75.75 0 00-1.06-1.06L7 9.44 5.28 7.72a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l4.25-4.25z"/></svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1.5a.75.75 0 01.65.375l6 10.5A.75.75 0 0114 13.5H2a.75.75 0 01-.65-1.125l6-10.5A.75.75 0 018 1.5zm0 4a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 018 5.5zm0 6.5a1 1 0 110-2 1 1 0 010 2z"/></svg>
  ),
  danger: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 018 4zm0 7.5a1 1 0 110-2 1 1 0 010 2z"/></svg>
  ),
  neutral: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 018 4zm0 7.5a1 1 0 110-2 1 1 0 010 2z"/></svg>
  ),
};

export interface BannerProps {
  variant?: BannerVariant;
  bannerStyle?: BannerStyle;
  title?: React.ReactNode;
  description?: React.ReactNode;
  size?: BannerSize;
  icon?: React.ReactNode;
  button?: React.ReactNode;
  fullWidth?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  bordered?: boolean;
  children?: React.ReactNode;
}

export function Banner({
  variant = 'info',
  bannerStyle = 'subtle',
  title,
  description,
  size = 'md',
  icon,
  button,
  fullWidth = true,
  dismissible = false,
  onDismiss,
  className = '',
  bordered = true,
  children,
}: BannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  const bodyContent = children ?? description;

  const rootClasses = [
    'gy-banner',
    `gy-banner--${variant}`,
    `gy-banner--${bannerStyle}`,
    `gy-banner--${size}`,
    fullWidth ? 'gy-banner--full-width' : '',
    bordered ? 'gy-banner--bordered' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={rootClasses} role="alert">
      <span className="gy-banner__icon">{icon ?? defaultIcons[variant]}</span>
      <div className="gy-banner__content">
        {title && <div className="gy-banner__title">{title}</div>}
        {bodyContent && <div className="gy-banner__description">{bodyContent}</div>}
      </div>
      {button && <div className="gy-banner__action">{button}</div>}
      {dismissible && (
        <button className="gy-banner__close" onClick={handleDismiss} aria-label="Dismiss">
          <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="1" y1="1" x2="11" y2="11" />
            <line x1="11" y1="1" x2="1" y2="11" />
          </svg>
        </button>
      )}
    </div>
  );
}
