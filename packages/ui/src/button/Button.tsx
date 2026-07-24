'use client';

import React, { forwardRef, useCallback } from 'react';
import type { ThemeRole, ColorMode } from '@galyan/theme';
import './button.css';

export type ButtonVariant = 'neumorphic' | 'solid' | 'outline' | 'ghost' | 'soft' | 'link' | 'danger';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant — defaults to 'neumorphic' */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Legacy loading boolean (use isLoading instead) */
  loading?: boolean;
  /** Show loading state with spinner */
  isLoading?: boolean;
  /** Text to render next to spinner while loading (replaces children) */
  loadingText?: string;
  /** Stretch to full width of parent container */
  fullWidth?: boolean;
  /** Convenience prop: renders with outline variant styling */
  outline?: boolean;
  /** Icon placed before children */
  leftIcon?: React.ReactNode;
  /** Icon placed after children */
  rightIcon?: React.ReactNode;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Override theme role for this button component */
  themeRole?: ThemeRole;
  /** Override color mode (light/dark) for this button component */
  colorMode?: ColorMode;
  /** Polymorphic element tag */
  as?: React.ElementType;
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'neumorphic',
    size = 'md',
    loading = false,
    isLoading = false,
    loadingText,
    fullWidth = false,
    outline = false,
    leftIcon,
    rightIcon,
    disabled,
    children,
    className = '',
    onClick,
    themeRole,
    colorMode,
    as: Component = 'button',
    ...rest
  },
  ref
) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      // Ripple effect for non-neumorphic or active feedback
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const s = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - s / 2;
      const y = e.clientY - rect.top - s / 2;

      const ripple = document.createElement('span');
      ripple.className = 'gy-btn__ripple';
      ripple.style.width = ripple.style.height = `${s}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);

      onClick?.(e);
    },
    [onClick]
  );

  const activeLoading = isLoading || loading;
  const isDisabled = disabled || activeLoading;
  
  // Resolution of variant: outline shorthand overrides default variant if set
  const resolvedVariant = outline && variant === 'neumorphic' ? 'outline' : variant;
  const iconOnly = !children && (leftIcon || rightIcon) && !activeLoading;

  const classes = [
    'gy-btn',
    `gy-btn--${resolvedVariant}`,
    `gy-btn--${size}`,
    fullWidth ? 'gy-btn--full' : '',
    activeLoading ? 'gy-btn--loading' : '',
    iconOnly ? 'gy-btn--icon-only' : '',
    isDisabled ? 'gy-btn--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Dynamic theme attribute scoping if themeRole or colorMode props are provided
  const dataProps: Record<string, string> = {};
  if (themeRole) dataProps['data-theme'] = themeRole;
  if (colorMode) dataProps['data-color-mode'] = colorMode;

  return (
    <Component
      ref={ref}
      className={classes}
      disabled={isDisabled}
      onClick={handleClick}
      aria-busy={activeLoading}
      {...dataProps}
      {...rest}
    >
      {activeLoading ? (
        <>
          <span className="gy-btn__spinner" aria-hidden="true" />
          {loadingText && <span className="gy-btn__loading-text">{loadingText}</span>}
        </>
      ) : (
        <>
          {leftIcon && <span className="gy-btn__icon gy-btn__icon--left" aria-hidden="true">{leftIcon}</span>}
          {children && <span>{children}</span>}
          {rightIcon && <span className="gy-btn__icon gy-btn__icon--right" aria-hidden="true">{rightIcon}</span>}
        </>
      )}
    </Component>
  );
});
