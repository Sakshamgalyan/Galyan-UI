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
  | "simantrix"
  | "coral"
  | "green"
  | "blue"
  | "violet"
  | "amber"
  | "cyan"
  | "purple"
  | "live"
  | "active"
  | "emerald"
  | "default";

export type BadgeSize = "xs" | "sm" | "md" | "lg" | "xl";
export type BadgeShape = "circle" | "rounded" | "square";
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
  /** Badge shape */
  shape?: BadgeShape;
  /** Adds primary ring & shadow glow */
  glow?: boolean;
  /** Interactive hover scale and feedback */
  interactive?: boolean;
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
  shape,
  glow = false,
  interactive = false,
  placement,
  showZero = false,
  invisible = false,
  className = "",
  style,
  ...rest
}: BadgeProps) {
  // If children is provided without content and without dot/placed mode,
  // treat children as the inline badge content instead of wrapping with a floating dot.
  const isWrapper = Boolean(
    children && (
      (content !== undefined && placement !== "inline") ||
      (dot && placement !== "inline") ||
      (placement && placement !== "inline")
    )
  );

  // Determine placement default: if wrapper, top-right; otherwise inline
  const resolvedPlacement = placement ?? (isWrapper ? "top-right" : "inline");

  // Format content for numeric caps
  let displayContent = content !== undefined ? content : (!isWrapper ? children : undefined);
  if (typeof displayContent === "number") {
    if (displayContent === 0 && !showZero && !dot) {
      invisible = true;
    } else if (max && displayContent > max) {
      displayContent = `${max}+`;
    }
  }

  if (invisible) {
    return isWrapper ? <span className="gy-badge-wrapper">{children}</span> : null;
  }

  const isClickable = Boolean(rest.onClick || interactive);

  const variantMap: Record<string, string> = {
    purple: "violet",
    live: "success",
    active: "success",
    emerald: "success",
    default: "neutral",
  };
  const resolvedVariant = variantMap[variant] ?? variant;

  const badgeElement = (
    <span
      className={[
        "gy-badge",
        `gy-badge--${resolvedVariant}`,
        `gy-badge--${size}`,
        shape ? `gy-badge--${shape}` : "",
        glow ? "gy-badge--glow" : "",
        isClickable ? "gy-badge--clickable" : "",
        interactive ? "gy-badge--interactive" : "",
        dot ? "gy-badge--dot" : "",
        resolvedPlacement !== "inline" ? `gy-badge--placed gy-badge--${resolvedPlacement}` : "",
        !isWrapper ? className : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={!isWrapper ? style : undefined}
      role={!isWrapper && isClickable ? "button" : undefined}
      tabIndex={!isWrapper && isClickable ? 0 : undefined}
      {...(!isWrapper ? rest : {})}
    >
      {ping && <span className="gy-badge__ping" />}
      {!dot && displayContent}
    </span>
  );

  if (isWrapper) {
    return (
      <span
        className={`gy-badge-wrapper ${className}`.trim()}
        style={style}
        {...rest}
      >
        {children}
        {badgeElement}
      </span>
    );
  }

  return badgeElement;
}
