"use client";

import React, { forwardRef } from "react";
import "./toggle.css";

export interface ToggleProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> {
  /** Size variant of the toggle */
  size?: "sm" | "md" | "lg";
  /** Text label displayed next to the toggle */
  label?: React.ReactNode;
  /** Whether to show icons inside the toggle thumb/track */
  withIcon?: boolean;
  /** Custom icons for the on and off states */
  icon?: {
    on: React.ReactNode;
    off: React.ReactNode;
  };
  /** If true, the toggle will be disabled */
  isDisabled?: boolean;
  /** Custom class for the wrapper */
  className?: string;
}

const DefaultTickIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="gy-toggle__icon gy-toggle__icon--on"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const DefaultCrossIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="gy-toggle__icon gy-toggle__icon--off"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      size = "md",
      label,
      checked,
      withIcon = false,
      icon,
      isDisabled = false,
      className = "",
      id,
      ...props
    },
    ref,
  ) => {
    const fallbackId = React.useId();
    const toggleId = id || fallbackId;

    const wrapperClasses = [
      "gy-toggle-wrapper",
      `gy-toggle--${size}`,
      isDisabled ? "gy-toggle--disabled" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const renderOnIcon = () => {
      if (!withIcon) return null;
      if (icon?.on)
        return (
          <span className="gy-toggle__icon gy-toggle__icon--on">{icon.on}</span>
        );
      return <DefaultTickIcon />;
    };

    const renderOffIcon = () => {
      if (!withIcon) return null;
      if (icon?.off)
        return (
          <span className="gy-toggle__icon gy-toggle__icon--off">
            {icon.off}
          </span>
        );
      return <DefaultCrossIcon />;
    };

    return (
      <label className={wrapperClasses} htmlFor={toggleId}>
        <div className="gy-toggle__control">
          <input
            type="checkbox"
            role="switch"
            id={toggleId}
            ref={ref}
            className="gy-toggle__input"
            checked={checked}
            disabled={isDisabled}
            aria-checked={checked}
            {...props}
          />
          <div className="gy-toggle__track">
            {withIcon && (
              <div className="gy-toggle__track-icons">
                {renderOnIcon()}
                {renderOffIcon()}
              </div>
            )}
            <div className="gy-toggle__thumb">
              {/* Optional: we can render icons inside thumb instead of track if we want to change behavior, but rendering inside track is standard for switches with cross/tick. */}
            </div>
          </div>
        </div>
        {label && <span className="gy-toggle__label">{label}</span>}
      </label>
    );
  },
);

Toggle.displayName = "Toggle";
