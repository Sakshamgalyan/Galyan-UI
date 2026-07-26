"use client";

import React, { forwardRef, useId, useState } from "react";
import "./input.css";

export type InputSize = "sm" | "md" | "lg";
export type InputVariant =
  | "default"
  | "filled"
  | "focused"
  | "error"
  | "success"
  | "disabled";

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  /** Label text displayed above the input */
  label?: string;
  /** Placeholder text inside the input */
  placeholder?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Size of the input */
  size?: InputSize;
  /** Whether the input should take the full width of its container */
  fullWidth?: boolean;
  /** Visual variant of the input */
  variant?: InputVariant;
  /** Input type (text, password, email, number, etc.) */
  type?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the input shows an error state */
  hasError?: boolean;
  /** Whether the input shows a success state */
  hasSuccess?: boolean;
  /** Whether the input is disabled */
  isDisabled?: boolean;
  /** Whether the input is visually focused */
  isFocused?: boolean;
  /** Icon element on the left side */
  leftIcon?: React.ReactNode;
  /** Icon element on the right side */
  rightIcon?: React.ReactNode;
  /** Click handler for the left icon */
  onLeftIconClick?: () => void;
  /** Click handler for the right icon */
  onRightIconClick?: () => void;
  /** Custom class name for the root element */
  className?: string;
  /** Clearable input: shows a clear button when value is present */
  clearable?: boolean;
  /** Callback when the clear button is clicked */
  onClear?: () => void;
  /** Disables border focus effects (ring + color change) */
  disableBorderEffects?: boolean;
  /** Custom border radius (CSS value, e.g. '0.5rem' or '9999px') */
  borderRadius?: string;
  /** Legacy error message string (shows as helperText in error state) */
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    placeholder,
    helperText,
    size = "md",
    fullWidth = true,
    variant = "default",
    type = "text",
    required,
    hasError,
    hasSuccess,
    isDisabled,
    isFocused,
    leftIcon,
    rightIcon,
    onLeftIconClick,
    onRightIconClick,
    className = "",
    clearable,
    onClear,
    disableBorderEffects = false,
    borderRadius,
    error,
    disabled,
    id,
    value,
    onChange,
    onFocus,
    onBlur,
    autoFocus,
    ...rest
  },
  ref,
) {
  const uid = useId();
  const inputId = id ?? uid;

  // Merge legacy `disabled` prop with `isDisabled`
  const resolvedDisabled = isDisabled || disabled || variant === "disabled";
  // Merge legacy `error` string prop with `hasError`
  const resolvedError = hasError || !!error || variant === "error";
  const resolvedSuccess = hasSuccess || variant === "success";
  const resolvedFocused = isFocused || variant === "focused";

  // Track internal focus for styling
  const [internalFocused, setInternalFocused] = useState(false);
  const showFocused = resolvedFocused || internalFocused;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setInternalFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setInternalFocused(false);
    onBlur?.(e);
  };

  const wrapperClasses = [
    "gy-input-wrapper",
    `gy-input-wrapper--${size}`,
    variant === "filled" ? "gy-input-wrapper--filled" : "",
    resolvedError ? "gy-input-wrapper--error" : "",
    resolvedSuccess ? "gy-input-wrapper--success" : "",
    resolvedDisabled ? "gy-input-wrapper--disabled" : "",
    showFocused && !disableBorderEffects ? "gy-input-wrapper--focused" : "",
    disableBorderEffects ? "gy-input-wrapper--no-border-fx" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const showClear = clearable && value && !resolvedDisabled;

  // Error message from either `error` string or `helperText` when hasError
  const errorMessage =
    error || (resolvedError && helperText ? helperText : undefined);
  const showHelper = !resolvedError && helperText;

  const wrapperStyle: React.CSSProperties = {};
  if (borderRadius) {
    wrapperStyle.borderRadius = borderRadius;
  }

  return (
    <div
      className={`gy-input-root ${fullWidth ? "" : "gy-input-root--inline"} ${className}`}
    >
      {label && (
        <label
          className={`gy-input-label ${required ? "gy-input-label--required" : ""}`}
          htmlFor={inputId}
        >
          {label}
        </label>
      )}

      <div className={wrapperClasses} style={wrapperStyle}>
        {leftIcon && (
          <span
            className={`gy-input-addon gy-input-addon--left ${onLeftIconClick ? "gy-input-addon--clickable" : ""}`}
            aria-hidden="true"
            onClick={onLeftIconClick}
            role={onLeftIconClick ? "button" : undefined}
            tabIndex={onLeftIconClick ? 0 : undefined}
          >
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          className="gy-input"
          type={type}
          placeholder={placeholder}
          disabled={resolvedDisabled}
          required={required}
          autoFocus={autoFocus}
          aria-invalid={resolvedError || undefined}
          aria-describedby={
            resolvedError
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
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
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="1" y1="1" x2="13" y2="13" />
              <line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </button>
        )}

        {rightIcon && !showClear && (
          <span
            className={`gy-input-addon gy-input-addon--right ${onRightIconClick ? "gy-input-addon--clickable" : ""}`}
            aria-hidden="true"
            onClick={onRightIconClick}
            role={onRightIconClick ? "button" : undefined}
            tabIndex={onRightIconClick ? 0 : undefined}
          >
            {rightIcon}
          </span>
        )}
      </div>

      {resolvedError && errorMessage && (
        <span
          id={`${inputId}-error`}
          className="gy-input-helper gy-input-helper--error"
          role="alert"
        >
          {errorMessage}
        </span>
      )}
      {resolvedSuccess && !resolvedError && helperText && (
        <span
          id={`${inputId}-helper`}
          className="gy-input-helper gy-input-helper--success"
        >
          {helperText}
        </span>
      )}
      {showHelper && !resolvedSuccess && (
        <span id={`${inputId}-helper`} className="gy-input-helper">
          {helperText}
        </span>
      )}
    </div>
  );
});
