"use client";

import React, { forwardRef, useCallback } from "react";
import type { ThemeRole, ColorMode } from "@galyan/theme";
import "./button.css";
import { Typography } from "../typography";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "danger"
  | "danger-soft"
  | "soft"
  | "link"
  | "ghost"
  | "solid"
  | "outline"
  | "glassmorphic"
  | "glass";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant — defaults to 'primary' */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Show loading state with spinner */
  isLoading?: boolean;
  /** Text to render next to spinner while loading (replaces children) */
  loadingText?: string;
  /** Stretch to full width of parent container */
  fullWidth?: boolean;
  /** Render outlined version of variant styling */
  outline?: boolean;
  /** Icon placed before children */
  leftIcon?: React.ReactNode;
  /** Icon placed after children */
  rightIcon?: React.ReactNode;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Override theme role for this button component */
  themeRole?: ThemeRole;
  /** Override color mode (light/dark) for this button component */
  colorMode?: ColorMode;
  /** Additional CSS class names for custom styling */
  className?: string;
  /** Polymorphic element tag (defaults to "a" when href is present, otherwise "button") */
  as?: React.ElementType;
  /** Link destination URL (renders as <a> if provided and as is unset) */
  href?: string;
  /** Target window or frame for the link (e.g. '_blank', '_self', '_parent', '_top') */
  target?: React.HTMLAttributeAnchorTarget;
  /** Relationship of the target object to the link object (defaults to 'noopener noreferrer' when target='_blank') */
  rel?: string;
  /** Prompts the user to save the linked URL instead of navigating to it */
  download?: boolean | string;
  /** Referrer policy for the link */
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  /** Open in new tab with security attributes (sets target="_blank" and rel="noopener noreferrer") */
  external?: boolean;
  /** Button type attribute when rendered as <button> (defaults to 'button') */
  type?: "button" | "submit" | "reset";
}

export const Button = forwardRef<any, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      loadingText,
      fullWidth = false,
      outline = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      className = "",
      onClick,
      themeRole,
      colorMode,
      as,
      href,
      target,
      rel,
      download,
      referrerPolicy,
      external = false,
      type,
      ...rest
    },
    ref,
  ) {
    const isButtonDisabled = Boolean(disabled) || isLoading;
    const isLink = Boolean(href) || as === "a";
    const Component = as ?? (href ? "a" : "button");

    const computedTarget = target ?? (external ? "_blank" : undefined);
    const computedRel =
      rel ??
      (computedTarget === "_blank" || external
        ? "noopener noreferrer"
        : undefined);

    const handleClick = useCallback(
      (e: React.MouseEvent<any>) => {
        if (isButtonDisabled) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        if (variant !== "link") {
          // Ripple effect for active feedback
          const btn = e.currentTarget;
          if (btn && typeof btn.getBoundingClientRect === "function") {
            const rect = btn.getBoundingClientRect();
            const s = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - s / 2;
            const y = e.clientY - rect.top - s / 2;

            const ripple = document.createElement("span");
            ripple.className = "gy-btn__ripple";
            ripple.style.width = ripple.style.height = `${s}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
          }
        }

        onClick?.(e);
      },
      [isButtonDisabled, onClick, variant],
    );

    const iconOnly =
      !children && !loadingText && (leftIcon || rightIcon) && !isLoading;

    const classes = [
      "gy-btn",
      `gy-btn--${variant}`,
      outline ? "gy-btn--outline" : "",
      `gy-btn--${size}`,
      fullWidth ? "gy-btn--full" : "",
      isLoading ? "gy-btn--loading" : "",
      iconOnly ? "gy-btn--icon-only" : "",
      disabled ? "gy-btn--disabled" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Dynamic theme attribute scoping if themeRole or colorMode props are provided
    const dataProps: Record<string, string> = {};
    if (themeRole) dataProps["data-theme"] = themeRole;
    if (colorMode) dataProps["data-color-mode"] = colorMode;

    const elementProps: Record<string, any> = isLink
      ? {
          href: isButtonDisabled ? undefined : href,
          target: computedTarget,
          rel: computedRel,
          download,
          referrerPolicy,
          role: isButtonDisabled ? "link" : rest.role,
          tabIndex: isButtonDisabled ? -1 : rest.tabIndex,
        }
      : {
          type: type ?? "button",
          disabled: isButtonDisabled,
        };

    return (
      <Component
        ref={ref}
        className={classes}
        aria-busy={isLoading}
        aria-disabled={isButtonDisabled}
        onClick={handleClick}
        {...dataProps}
        {...elementProps}
        {...rest}
      >
        {isLoading ? (
          <>
            <span className="gy-btn__spinner" aria-hidden="true" />
            {loadingText ? (
              <Typography variant="span" className="gy-btn__loading-text">
                {loadingText}
              </Typography>
            ) : children ? (
              <Typography variant="span" className="gy-btn__loading-text">
                {children}
              </Typography>
            ) : null}
          </>
        ) : (
          <>
            {leftIcon && (
              <span
                className="gy-btn__icon gy-btn__icon--left"
                aria-hidden="true"
              >
                {leftIcon}
              </span>
            )}
            {children && (
              <Typography variant="span" className="gy-btn__text">
                {children}
              </Typography>
            )}
            {rightIcon && (
              <span
                className="gy-btn__icon gy-btn__icon--right"
                aria-hidden="true"
              >
                {rightIcon}
              </span>
            )}
          </>
        )}
      </Component>
    );
  },
);
