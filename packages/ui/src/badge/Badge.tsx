"use client";

import React from "react";
import "./badge.css";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  | "glass"
  | "developer"
  | "organization"
  | "org-admin"
  | "org-member";

export type BadgeSize = "xs" | "sm" | "md" | "lg";
export type BadgePlacement =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "inline";

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "content"> {
  /** Optional child element to position badge relative to (e.g., an icon or avatar) */
  children?: React.ReactNode;
  /** Badge content (number or text) */
  content?: React.ReactNode;
  /** Max count when content is numeric (e.g., 99 yields "99+") */
  max?: number;
  /** Render as a compact dot without content */
  dot?: boolean;
  /** Add a live pulsing ping animation */
  ping?: boolean;
  /** Visual variant */
  variant?: BadgeVariant;
  /** Size preset */
  size?: BadgeSize;
  /** Position relative to children, or inline */
  placement?: BadgePlacement;
  /** Whether to render badge when content is 0 */
  showZero?: boolean;
  /** Force hide the badge */
  invisible?: boolean;
  /** Custom class name */
  className?: string;
}

export function Badge({
  children,
  content,
  max = 99,
  dot = false,
  ping = false,
  variant = "primary",
  size = "md",
  placement,
  showZero = false,
  invisible = false,
  className = "",
  style,
  ...rest
}: BadgeProps) {
  // Determine placement default: if children exist, top-right; otherwise inline
  const resolvedPlacement = placement ?? (children ? "top-right" : "inline");

  // Format content for numeric caps
  let displayContent = content;
  if (typeof content === "number") {
    if (content === 0 && !showZero && !dot) {
      invisible = true;
    } else if (max && content > max) {
      displayContent = `${max}+`;
    }
  }

  if (invisible) {
    return children ? <span className="gy-badge-wrapper">{children}</span> : null;
  }

  const badgeElement = (
    <span
      className={[
        "gy-badge",
        `gy-badge--${variant}`,
        `gy-badge--${size}`,
        dot ? "gy-badge--dot" : "",
        resolvedPlacement !== "inline" ? `gy-badge--placed gy-badge--${resolvedPlacement}` : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      {...rest}
    >
      {ping && <span className="gy-badge__ping" />}
      {!dot && displayContent}
    </span>
  );

  if (children) {
    return (
      <span className="gy-badge-wrapper">
        {children}
        {badgeElement}
      </span>
    );
  }

  return badgeElement;
}
