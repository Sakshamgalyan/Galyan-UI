'use client';

import React, { forwardRef, useId } from 'react';
import './checkbox.css';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  description?: string;
  size?: CheckboxSize;
  id?: string;
  name?: string;
  value?: string;
  className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    checked,
    defaultChecked,
    indeterminate = false,
    onChange,
    disabled = false,
    label,
    description,
    size = 'md',
    id,
    name,
    value,
    className = '',
  },
  ref
) {
  const uid = useId();
  const inputId = id ?? uid;

  const isChecked = checked ?? defaultChecked ?? false;

  const boxClasses = [
    'gy-checkbox-box',
    `gy-checkbox-box--${size}`,
    isChecked ? 'gy-checkbox-box--checked' : '',
    indeterminate ? 'gy-checkbox-box--indeterminate' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label
      className={[
        'gy-checkbox-root',
        disabled ? 'gy-checkbox-root--disabled' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      htmlFor={inputId}
    >
      <input
        ref={ref}
        type="checkbox"
        id={inputId}
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        className="gy-checkbox-input"
        onChange={(e) => onChange?.(e.target.checked)}
        aria-checked={indeterminate ? 'mixed' : checked}
      />
      <span className={boxClasses} aria-hidden="true">
        {(isChecked || indeterminate) && (
          <span className="gy-checkbox-icon">
            {indeterminate ? (
              <svg width="10" height="2" viewBox="0 0 10 2" fill="currentColor">
                <rect x="0" y="0" width="10" height="2" rx="1" />
              </svg>
            ) : (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1,4 4,7 9,1" />
              </svg>
            )}
          </span>
        )}
      </span>
      {(label || description) && (
        <span className="gy-checkbox-content">
          {label && <span className="gy-checkbox-label">{label}</span>}
          {description && <span className="gy-checkbox-description">{description}</span>}
        </span>
      )}
    </label>
  );
});
