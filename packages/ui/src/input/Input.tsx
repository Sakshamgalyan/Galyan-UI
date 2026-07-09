'use client';

import React, { forwardRef, useId } from 'react';
import './input.css';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  size?: InputSize;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  required?: boolean;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    size = 'md',
    error,
    helperText,
    leftIcon,
    rightIcon,
    clearable,
    onClear,
    required,
    fullWidth = true,
    disabled,
    className = '',
    id,
    value,
    onChange,
    ...rest
  },
  ref
) {
  const uid = useId();
  const inputId = id ?? uid;

  const wrapperClasses = [
    'gy-input-wrapper',
    `gy-input-wrapper--${size}`,
    error ? 'gy-input-wrapper--error' : '',
    disabled ? 'gy-input-wrapper--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const showClear = clearable && value && !disabled;

  return (
    <div className={`gy-input-root ${fullWidth ? '' : 'gy-input-root--inline'} ${className}`}>
      {label && (
        <label
          className={`gy-input-label ${required ? 'gy-input-label--required' : ''}`}
          htmlFor={inputId}
        >
          {label}
        </label>
      )}

      <div className={wrapperClasses}>
        {leftIcon && (
          <span className="gy-input-addon gy-input-addon--left" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          className="gy-input"
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          value={value}
          onChange={onChange}
          {...rest}
        />

        {showClear && (
          <button
            type="button"
            className="gy-input-clear"
            onClick={onClear}
            aria-label="Clear input"
            tabIndex={-1}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="1" y1="1" x2="13" y2="13" />
              <line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </button>
        )}

        {rightIcon && !showClear && (
          <span className="gy-input-addon gy-input-addon--right" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </div>

      {error && (
        <span id={`${inputId}-error`} className="gy-input-helper gy-input-helper--error" role="alert">
          {error}
        </span>
      )}
      {!error && helperText && (
        <span id={`${inputId}-helper`} className="gy-input-helper">
          {helperText}
        </span>
      )}
    </div>
  );
});
