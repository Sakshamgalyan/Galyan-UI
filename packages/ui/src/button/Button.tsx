'use client';

import React, { forwardRef, useCallback, useRef } from 'react';
import './button.css';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'soft' | 'link' | 'danger';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /** Render as a different element (e.g. 'a' for links) */
  as?: React.ElementType;
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'solid',
    size = 'md',
    loading = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    disabled,
    children,
    className = '',
    onClick,
    as: Component = 'button',
    ...rest
  },
  ref
) {
  const rippleRef = useRef<HTMLSpanElement | null>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      // Ripple effect
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const ripple = document.createElement('span');
      ripple.className = 'gy-btn__ripple';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);

      onClick?.(e);
    },
    [onClick]
  );

  const isDisabled = disabled || loading;
  const iconOnly = !children && (leftIcon || rightIcon);

  const classes = [
    'gy-btn',
    `gy-btn--${variant}`,
    `gy-btn--${size}`,
    fullWidth ? 'gy-btn--full' : '',
    loading ? 'gy-btn--loading' : '',
    iconOnly ? 'gy-btn--icon-only' : '',
    isDisabled ? 'gy-btn--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component
      ref={ref}
      className={classes}
      disabled={isDisabled}
      onClick={handleClick}
      aria-busy={loading}
      {...rest}
    >
      {loading ? (
        <span className="gy-btn__spinner" aria-hidden="true" />
      ) : (
        leftIcon && <span className="gy-btn__icon gy-btn__icon--left" aria-hidden="true">{leftIcon}</span>
      )}
      {children && <span>{children}</span>}
      {!loading && rightIcon && (
        <span className="gy-btn__icon gy-btn__icon--right" aria-hidden="true">{rightIcon}</span>
      )}
    </Component>
  );
});
