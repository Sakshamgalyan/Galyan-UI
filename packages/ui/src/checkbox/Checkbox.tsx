'use client';

import React, { forwardRef, useId, useState } from 'react';
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

  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
  const isChecked = isControlled ? checked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextChecked = e.target.checked;
    if (!isControlled) {
      setInternalChecked(nextChecked);
    }
    onChange?.(nextChecked);
  };

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
        checked={isChecked}
        disabled={disabled}
        className="gy-checkbox-input"
        onChange={handleChange}
        aria-checked={indeterminate ? 'mixed' : isChecked}
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
