'use client';

import React, { useId, useState } from 'react';
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

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? value : internalValue;

  return (
    <div
      role="radiogroup"
      aria-label={typeof groupLabel === 'string' ? groupLabel : undefined}
      className={`gy-radio-group ${orientation === 'horizontal' ? 'gy-radio-group--horizontal' : ''} ${className}`}
    >
      {groupLabel && <div className="gy-radio-group-label">{groupLabel}</div>}
      {options.map((opt) => {
        const isChecked = currentValue === opt.value;
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
              disabled={isDisabled}
              className="gy-radio-input"
              onChange={() => {
                if (!isControlled) {
                  setInternalValue(opt.value);
                }
                onChange?.(opt.value);
              }}
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
