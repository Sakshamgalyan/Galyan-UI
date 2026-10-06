"use client";

import React, { forwardRef, useId, useState } from "react";
import type { ThemeRole, ColorMode } from "@galyan/theme";
import { ClearButton } from "../clearbutton/ClearButton";
import "./input.css";
import { Typography } from "../typography";

export type InputSize = "xs" | "sm" | "md" | "lg";
export type InputVariant =
  | "default"
  | "filled"
  | "glass"
  | "glassmorphic"
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
  /** Custom icon displayed next to the helper text */
  helperIcon?: React.ReactNode;
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
  /** Override theme role for this input component */
  themeRole?: ThemeRole;
  /** Override color mode (light/dark) for this input component */
  colorMode?: ColorMode;
}

const InfoIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const AlertCircleIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    placeholder,
    helperText,
    helperIcon,
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
    themeRole,
    colorMode,
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
    variant === "glass" || variant === "glassmorphic"
      ? `gy-input-wrapper--${variant}`
      : "",
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

  const renderHelperIcon = (type: "error" | "success" | "helper") => {
    if (helperIcon !== undefined) {
      return helperIcon;
    }
    if (type === "error" || (type === "helper" && required)) {
      return <AlertCircleIcon />;
    }
    if (type === "success") {
      return <CheckCircleIcon />;
    }
    return <InfoIcon />;
  };

  const wrapperStyle: React.CSSProperties = {};
  if (borderRadius) {
    wrapperStyle.borderRadius = borderRadius;
  }

  // Dynamic theme attribute scoping if themeRole or colorMode props are provided
  const dataProps: Record<string, string> = {};
  if (themeRole) {
    dataProps["data-theme"] = themeRole;
    dataProps["data-role"] = themeRole;
  }
  if (colorMode) {
    dataProps["data-color-mode"] = colorMode;
  }

  return (
    <div
      className={`gy-input-root ${fullWidth ? "" : "gy-input-root--inline"} ${className}`}
      {...dataProps}
    >
      {label && (
        <Typography
          variant="span"
          as="label"
          className={`gy-input-label ${required ? "gy-input-label--required" : ""}`}
          htmlFor={inputId}
        >
          {label}
        </Typography>
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
          <ClearButton
            size={size === "lg" ? "md" : size === "xs" || size === "sm" ? "xs" : "sm"}
            variant="subtle"
            ariaLabel="Clear input"
            onClick={onClear}
            className="gy-input-clear"
          />
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
          {renderHelperIcon("error") && (
            <span className="gy-input-helper__icon" aria-hidden="true">
              {renderHelperIcon("error")}
            </span>
          )}
          <span>{errorMessage}</span>
        </span>
      )}
      {resolvedSuccess && !resolvedError && helperText && (
        <span
          id={`${inputId}-helper`}
          className="gy-input-helper gy-input-helper--success"
        >
          {renderHelperIcon("success") && (
            <span className="gy-input-helper__icon" aria-hidden="true">
              {renderHelperIcon("success")}
            </span>
          )}
          <span>{helperText}</span>
        </span>
      )}
      {showHelper && !resolvedSuccess && (
        <span
          id={`${inputId}-helper`}
          className={`gy-input-helper ${required ? "gy-input-helper--required" : ""}`}
        >
          {renderHelperIcon("helper") && (
            <span className="gy-input-helper__icon" aria-hidden="true">
              {renderHelperIcon("helper")}
            </span>
          )}
          <span>{helperText}</span>
        </span>
      )}
    </div>
  );
});

Input.displayName = "Input";
