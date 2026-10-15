import React, { forwardRef } from "react";
import "./clear-button.css";

export type ClearButtonSize = "xs" | "sm" | "md";
export type ClearButtonVariant = "subtle" | "filled";

export interface ClearButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ClearButtonSize;
  variant?: ClearButtonVariant;
  ariaLabel?: string;
  className?: string;
  as?: "button" | "span";
}

export const ClearButton = forwardRef<HTMLButtonElement | HTMLSpanElement, ClearButtonProps>(
  (
    {
      size = "sm",
      variant = "subtle",
      ariaLabel = "Clear",
      className = "",
      onClick,
      disabled,
      type = "button",
      as = "button",
      ...rest
    },
    ref,
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLSpanElement>) => {
      e.stopPropagation();
      if (disabled) return;
      onClick?.(e as React.MouseEvent<HTMLButtonElement>);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
      if (disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
        onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>);
      }
    };

    const classNames = [
      "gy-clear-button",
      `gy-clear-button--${size}`,
      `gy-clear-button--${variant}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const icon = (
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
    );

    if (as === "span") {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          role="button"
          className={classNames}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          aria-label={ariaLabel}
          {...(rest as React.HTMLAttributes<HTMLSpanElement>)}
        >
          {icon}
        </span>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        className={classNames}
        onClick={handleClick}
        disabled={disabled}
        aria-label={ariaLabel}
        tabIndex={0}
        {...rest}
      >
        {icon}
      </button>
    );
  },
);

ClearButton.displayName = "ClearButton";
