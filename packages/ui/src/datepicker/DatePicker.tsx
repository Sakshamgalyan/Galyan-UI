'use client';

import React, { useEffect, useRef, useState, useId } from 'react';
import { Calendar, CalendarProps } from '../calendar/Calendar';
import { Input } from '../input/Input';
import './datepicker.css';

export interface DatePickerProps extends Omit<CalendarProps, 'className'> {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export function DatePicker({
  mode = 'single',
  value,
  onChange,
  minDate,
  maxDate,
  label,
  placeholder = 'Select date',
  disabled,
  error,
  helperText,
  className = '',
}: DatePickerProps) {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  let displayValue = '';
  if (Array.isArray(value)) {
    if (value[0] && value[1]) displayValue = `${formatDate(value[0])} - ${formatDate(value[1])}`;
    else if (value[0]) displayValue = formatDate(value[0]);
  } else if (value) {
    displayValue = formatDate(value as Date);
  }

  const handleChange = (val: Date | [Date, Date]) => {
    onChange?.(val);
    if (mode === 'single' || (Array.isArray(val) && val[0] && val[1])) {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={`gy-datepicker ${className}`}>
      <div onClick={() => !disabled && setOpen((o) => !o)} style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}>
        <Input
          id={`gy-datepicker-${uid}`}
          label={label}
          placeholder={placeholder}
          value={displayValue}
          readOnly
          disabled={disabled}
          error={error}
          helperText={helperText}
          style={{ cursor: disabled ? 'not-allowed' : 'pointer', pointerEvents: 'none' }}
          rightIcon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          }
        />
      </div>

      {open && !disabled && (
        <div className="gy-datepicker-popover">
          <Calendar
            mode={mode}
            value={value}
            onChange={handleChange}
            minDate={minDate}
            maxDate={maxDate}
            className="gy-calendar--popover"
            style={{ border: 'none', borderRadius: 0 }}
          />
        </div>
      )}
    </div>
  );
}
