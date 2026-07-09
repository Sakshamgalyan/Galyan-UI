'use client';

import React, { forwardRef, useCallback, useEffect, useId, useRef } from 'react';
import './textarea.css';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxCharCount?: number;
  autoResize?: boolean;
  required?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    label,
    error,
    helperText,
    maxCharCount,
    autoResize = false,
    required,
    disabled,
    value,
    onChange,
    className = '',
    id,
    ...rest
  },
  ref
) {
  const uid = useId();
  const inputId = id ?? uid;
  const innerRef = useRef<HTMLTextAreaElement>(null);
  const textareaRef = (ref as React.RefObject<HTMLTextAreaElement>) ?? innerRef;

  const charCount = typeof value === 'string' ? value.length : 0;
  const isOver = maxCharCount ? charCount > maxCharCount : false;

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el || !autoResize) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [autoResize, textareaRef]);

  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    adjustHeight();
    onChange?.(e);
  };

  return (
    <div className={`gy-textarea-root ${className}`}>
      {label && (
        <label
          className={`gy-textarea-label ${required ? 'gy-textarea-label--required' : ''}`}
          htmlFor={inputId}
        >
          {label}
        </label>
      )}

      <textarea
        ref={textareaRef}
        id={inputId}
        className={[
          'gy-textarea',
          error ? 'gy-textarea--error' : '',
          autoResize ? 'gy-textarea--auto-resize' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        disabled={disabled}
        required={required}
        aria-invalid={!!error}
        value={value}
        onChange={handleChange}
        {...rest}
      />

      <div className="gy-textarea-footer">
        {error ? (
          <span className="gy-textarea-helper gy-textarea-helper--error" role="alert">{error}</span>
        ) : helperText ? (
          <span className="gy-textarea-helper">{helperText}</span>
        ) : (
          <span />
        )}

        {maxCharCount !== undefined && (
          <span className={`gy-textarea-count ${isOver ? 'gy-textarea-count--over' : ''}`}>
            {charCount}/{maxCharCount}
          </span>
        )}
      </div>
    </div>
  );
});
