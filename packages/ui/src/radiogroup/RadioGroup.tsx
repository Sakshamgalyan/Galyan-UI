'use client';

import React, { useId } from 'react';
import './radiogroup.css';

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  groupLabel?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
}

export function RadioGroup({
  options,
  value,
  defaultValue,
  onChange,
  orientation = 'vertical',
  groupLabel,
  name,
  disabled = false,
  className = '',
}: RadioGroupProps) {
  const uid = useId();
  const groupName = name ?? uid;

  return (
    <div
      role="radiogroup"
      aria-label={typeof groupLabel === 'string' ? groupLabel : undefined}
      className={`gy-radio-group ${orientation === 'horizontal' ? 'gy-radio-group--horizontal' : ''} ${className}`}
    >
      {groupLabel && <div className="gy-radio-group-label">{groupLabel}</div>}
      {options.map((opt) => {
        const isChecked = value !== undefined ? value === opt.value : undefined;
        const isDisabled = disabled || opt.disabled;

        return (
          <label
            key={opt.value}
            className={`gy-radio ${isDisabled ? 'gy-radio--disabled' : ''}`}
          >
            <input
              type="radio"
              name={groupName}
              value={opt.value}
              checked={isChecked}
              defaultChecked={defaultValue === opt.value}
              disabled={isDisabled}
              className="gy-radio-input"
              onChange={() => onChange?.(opt.value)}
            />
            <span className={`gy-radio-circle ${isChecked ? 'gy-radio-circle--checked' : ''}`}>
              {isChecked && <span className="gy-radio-dot" />}
            </span>
            <span className="gy-radio-label">{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
}
