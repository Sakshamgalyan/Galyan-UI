'use client';

import React, { forwardRef, useId, useState } from 'react';
import './toggle.css';

export type ToggleSize = 'sm' | 'md' | 'lg';

export interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  labelPosition?: 'left' | 'right';
  size?: ToggleSize;
  id?: string;
  name?: string;
  className?: string;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  {
    checked,
    defaultChecked,
    onChange,
    disabled = false,
    label,
    labelPosition = 'right',
    size = 'md',
    id,
    name,
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

  const track = (
    <span
      className={[
        'gy-toggle-track',
        `gy-toggle-track--${size}`,
        isChecked ? 'gy-toggle-track--checked' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    >
      <span className="gy-toggle-thumb" />
    </span>
  );

  const labelEl = label && (
    <span className="gy-toggle-label">{label}</span>
  );

  return (
    <label
      htmlFor={inputId}
      className={[
        'gy-toggle-root',
        disabled ? 'gy-toggle-root--disabled' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        role="switch"
        name={name}
        checked={isChecked}
        disabled={disabled}
        className="gy-toggle-input"
        aria-checked={isChecked}
        onChange={handleChange}
      />
      {labelPosition === 'left' && labelEl}
      {track}
      {labelPosition === 'right' && labelEl}
    </label>
  );
});
