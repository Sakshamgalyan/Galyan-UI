"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import "./textarea.css";

export type TextareaSize = "sm" | "md" | "lg";
export type TextareaVariant =
  | "default"
  | "filled"
  | "focused"
  | "error"
  | "success"
  | "disabled";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label text displayed above the textarea */
  label?: string;
  /** Helper text displayed below the textarea */
  helperText?: string;
  /** Custom icon displayed next to the helper text */
  helperIcon?: React.ReactNode;
  /** Size scale of the textarea */
  size?: TextareaSize;
  /** Whether the textarea takes full width of container */
  fullWidth?: boolean;
  /** Visual variant of the textarea */
  variant?: TextareaVariant;
  /** Whether the textarea shows an error state */
  hasError?: boolean;
  /** Whether the textarea shows a success state */
  hasSuccess?: boolean;
  /** Whether the textarea is disabled */
  isDisabled?: boolean;
  /** Whether the textarea is visually focused */
  isFocused?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Maximum character count allowed */
  maxCharCount?: number;
  /** Automatically resize height based on content */
  autoResize?: boolean;
  /** CSS resize property */
  resize?: "none" | "vertical" | "horizontal" | "both";
  /** Disables border focus effects (ring + color change) */
  disableBorderEffects?: boolean;
  /** Custom border radius */
  borderRadius?: string;
  /** Legacy error string */
  error?: string;
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

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      label,
      placeholder,
      helperText,
      helperIcon,
      size = "md",
      fullWidth = true,
      variant = "default",
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
      className = "",
      id,
      ...rest
    },
    ref,
  ) {
    const uid = useId();
    const inputId = id ?? uid;
    const innerRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef =
      (ref as React.RefObject<HTMLTextAreaElement>) ?? innerRef;

    // Merge legacy disabled prop with isDisabled
    const resolvedDisabled = isDisabled || disabled || variant === "disabled";
    // Merge legacy error string prop with hasError
    const resolvedError = hasError || !!error || variant === "error";
    const resolvedSuccess = hasSuccess || variant === "success";
    const resolvedFocused = isFocused || variant === "focused";

    const [internalFocused, setInternalFocused] = useState(false);
    const showFocused = resolvedFocused || internalFocused;

    const charCount = typeof value === "string" ? value.length : 0;
    const isOver =
      maxCharCount !== undefined ? charCount > maxCharCount : false;

    const adjustHeight = useCallback(() => {
      const el = textareaRef.current;
      if (!el || !autoResize) return;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }, [autoResize, textareaRef]);

    useEffect(() => {
      adjustHeight();
    }, [value, adjustHeight]);

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

    const textareaClasses = [
      "gy-textarea",
      `gy-textarea--${size}`,
      variant === "filled" ? "gy-textarea--filled" : "",
      resolvedError ? "gy-textarea--error" : "",
      resolvedSuccess ? "gy-textarea--success" : "",
      resolvedDisabled ? "gy-textarea--disabled" : "",
      showFocused && !disableBorderEffects ? "gy-textarea--focused" : "",
      disableBorderEffects ? "gy-textarea--no-border-fx" : "",
      autoResize ? "gy-textarea--auto-resize" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const textareaStyle: React.CSSProperties = {};
    if (borderRadius) textareaStyle.borderRadius = borderRadius;
    if (resize && !autoResize) textareaStyle.resize = resize;

    const errorMessage =
      error || (resolvedError && helperText ? helperText : undefined);
    const showHelper = !resolvedError && Boolean(helperText);

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

    return (
      <div
        className={`gy-textarea-root ${fullWidth ? "" : "gy-textarea-root--inline"} ${className}`}
      >
        {label && (
          <label
            className={`gy-textarea-label ${required ? "gy-textarea-label--required" : ""}`}
            htmlFor={inputId}
          >
            {label}
          </label>
        )}

        <textarea
          ref={textareaRef}
          id={inputId}
          className={textareaClasses}
          style={textareaStyle}
          placeholder={placeholder}
          disabled={resolvedDisabled}
          required={required}
          aria-invalid={resolvedError || undefined}
          aria-describedby={
            resolvedError
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />

        {(resolvedError && errorMessage) ||
        showHelper ||
        maxCharCount !== undefined ? (
          <div className="gy-textarea-footer">
            {resolvedError && errorMessage ? (
              <span
                id={`${inputId}-error`}
                className="gy-textarea-helper gy-textarea-helper--error"
                role="alert"
              >
                {renderHelperIcon("error") && (
                  <span className="gy-textarea-helper__icon" aria-hidden="true">
                    {renderHelperIcon("error")}
                  </span>
                )}
                <span>{errorMessage}</span>
              </span>
            ) : resolvedSuccess && helperText ? (
              <span
                id={`${inputId}-helper`}
                className="gy-textarea-helper gy-textarea-helper--success"
              >
                {renderHelperIcon("success") && (
                  <span className="gy-textarea-helper__icon" aria-hidden="true">
                    {renderHelperIcon("success")}
                  </span>
                )}
                <span>{helperText}</span>
              </span>
            ) : showHelper ? (
              <span
                id={`${inputId}-helper`}
                className={`gy-textarea-helper ${required ? "gy-textarea-helper--required" : ""}`}
              >
                {renderHelperIcon("helper") && (
                  <span className="gy-textarea-helper__icon" aria-hidden="true">
                    {renderHelperIcon("helper")}
                  </span>
                )}
                <span>{helperText}</span>
              </span>
            ) : (
              <span />
            )}

            {maxCharCount !== undefined && (
              <span
                className={`gy-textarea-count ${isOver ? "gy-textarea-count--over" : ""}`}
              >
                {charCount}/{maxCharCount}
              </span>
            )}
          </div>
        ) : null}
      </div>
    );
  },
);
