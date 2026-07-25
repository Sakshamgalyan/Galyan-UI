'use client';

import React, { forwardRef } from 'react';
import './checkbox.css';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Size of the checkbox */
  size?: 'sm' | 'md' | 'lg';
  /** Color theme of the checkbox */
  color?: 'primary' | 'error';
  /** The variant style of the checkbox */
  variant?: 'solid' | 'outline' | 'soft';
  /** Text label displayed next to the checkbox */
  label?: React.ReactNode;
  /** If true, renders the checkbox in an indeterminate state */
  indeterminate?: boolean;
  /** If true, the checkbox will be disabled */
  isDisabled?: boolean;
  /** Custom class for the wrapper */
  className?: string;
}

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="gy-checkbox__icon"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const MinusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="gy-checkbox__icon"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = 'md',
      color = 'primary',
      variant = 'solid',
      label,
      checked,
      indeterminate = false,
      isDisabled = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    // We use a local ref to set the indeterminate property on the underlying input if needed
    const innerRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

    React.useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const fallbackId = React.useId();
    const checkboxId = id || fallbackId;

    const wrapperClasses = [
      'gy-checkbox-wrapper',
      `gy-checkbox--${size}`,
      `gy-checkbox--${color}`,
      `gy-checkbox--${variant}`,
      isDisabled ? 'gy-checkbox--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <label className={wrapperClasses} htmlFor={checkboxId}>
        <div className="gy-checkbox__control">
          <input
            type="checkbox"
            id={checkboxId}
            ref={innerRef}
            className="gy-checkbox__input"
            checked={checked}
            disabled={isDisabled}
            aria-checked={indeterminate ? 'mixed' : checked}
            {...props}
          />
          <div className="gy-checkbox__box">
            {indeterminate ? <MinusIcon /> : <CheckIcon />}
          </div>
        </div>
        {label && <span className="gy-checkbox__label">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
