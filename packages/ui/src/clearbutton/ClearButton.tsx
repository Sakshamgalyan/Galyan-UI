import React, { forwardRef } from "react";
import "./clear-button.css";

export type ClearButtonSize = "xs" | "sm" | "md";
export type ClearButtonVariant = "subtle" | "filled";

export interface ClearButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ClearButtonSize;
  variant?: ClearButtonVariant;
  ariaLabel?: string;
  className?: string;
}

export const ClearButton = forwardRef<HTMLButtonElement, ClearButtonProps>(
  (
    {
      size = "sm",
      variant = "subtle",
      ariaLabel = "Clear",
      className = "",
      onClick,
      disabled,
      type = "button",
      ...rest
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;
      onClick?.(e);
    };

    const classNames = [
      "gy-clear-button",
      `gy-clear-button--${size}`,
      `gy-clear-button--${variant}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type={type}
        className={classNames}
        onClick={handleClick}
        disabled={disabled}
        aria-label={ariaLabel}
        tabIndex={0}
        {...rest}
      >
        <svg
          className="gy-clear-button__icon"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M4 4L12 12M12 4L4 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    );
  }
);

ClearButton.displayName = "ClearButton";
