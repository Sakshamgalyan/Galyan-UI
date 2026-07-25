'use client';

import React, { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react';
import './textarea.css';

export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaVariant = 'default' | 'filled' | 'focused' | 'error' | 'success' | 'disabled';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  size?: TextareaSize;
  fullWidth?: boolean;
  variant?: TextareaVariant;
  hasError?: boolean;
  hasSuccess?: boolean;
  isDisabled?: boolean;
  isFocused?: boolean;
  required?: boolean;
  maxCharCount?: number;
  autoResize?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  disableBorderEffects?: boolean;
  borderRadius?: string;
  /** Legacy error string */
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    label,
    helperText,
    size = 'md',
    fullWidth = true,
    variant = 'default',
    hasError,
    hasSuccess,
    isDisabled,
    isFocused,
    required,
    maxCharCount,
    autoResize = false,
    resize,
    disableBorderEffects = false,
    borderRadius,
    error,
    disabled,
    value,
    onChange,
    onFocus,
    onBlur,
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

  const resolvedDisabled = isDisabled || disabled || variant === 'disabled';
  const resolvedError = hasError || !!error || variant === 'error';
  const resolvedSuccess = hasSuccess || variant === 'success';
  const resolvedFocused = isFocused || variant === 'focused';

  const [internalFocused, setInternalFocused] = useState(false);
  const showFocused = resolvedFocused || internalFocused;

  const charCount = typeof value === 'string' ? value.length : 0;
  const isOver = maxCharCount ? charCount > maxCharCount : false;

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el || !autoResize) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [autoResize, textareaRef]);

  useEffect(() => { adjustHeight(); }, [value, adjustHeight]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    adjustHeight();
    onChange?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setInternalFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setInternalFocused(false);
    onBlur?.(e);
  };

  const wrapperClasses = [
    'gy-textarea',
    `gy-textarea--${size}`,
    variant === 'filled' ? 'gy-textarea--filled' : '',
    resolvedError ? 'gy-textarea--error' : '',
    resolvedSuccess ? 'gy-textarea--success' : '',
    resolvedDisabled ? 'gy-textarea--disabled' : '',
    showFocused && !disableBorderEffects ? 'gy-textarea--focused' : '',
    disableBorderEffects ? 'gy-textarea--no-border-fx' : '',
    autoResize ? 'gy-textarea--auto-resize' : '',
  ].filter(Boolean).join(' ');

  const textareaStyle: React.CSSProperties = {};
  if (borderRadius) textareaStyle.borderRadius = borderRadius;
  if (resize && !autoResize) textareaStyle.resize = resize;

  const errorMessage = error || (resolvedError && helperText ? helperText : undefined);
  const showHelper = !resolvedError && helperText;

  return (
    <div className={`gy-textarea-root ${fullWidth ? '' : 'gy-textarea-root--inline'} ${className}`}>
      {label && (
        <label className={`gy-textarea-label ${required ? 'gy-textarea-label--required' : ''}`} htmlFor={inputId}>
          {label}
        </label>
      )}

      <textarea
        ref={textareaRef}
        id={inputId}
        className={wrapperClasses}
        style={textareaStyle}
        disabled={resolvedDisabled}
        required={required}
        aria-invalid={resolvedError || undefined}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />

      <div className="gy-textarea-footer">
        {resolvedError && errorMessage ? (
          <span className="gy-textarea-helper gy-textarea-helper--error" role="alert">{errorMessage}</span>
        ) : resolvedSuccess && helperText ? (
          <span className="gy-textarea-helper gy-textarea-helper--success">{helperText}</span>
        ) : showHelper ? (
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
