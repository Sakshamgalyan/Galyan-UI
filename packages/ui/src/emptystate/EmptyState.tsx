"use client";

import React from "react";
import "./empty-state.css";

export interface EmptyStateProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode | null;
  action?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "subtle" | "card";
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const DefaultEmptyIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* Dashed outer box representing empty container */}
    <rect
      x="3"
      y="4"
      width="18"
      height="16"
      rx="3"
      strokeDasharray="3 2"
      opacity="0.5"
    />
    {/* Bar 1 */}
    <path d="M8 14v-2" stroke="currentColor" strokeWidth="2" opacity="0.6" />
    {/* Bar 2 (accent highlight) */}
    <path
      d="M12 14v-5"
      stroke="var(--gy-primary, #3b82f6)"
      strokeWidth="2"
    />
    {/* Bar 3 */}
    <path d="M16 14v-3" stroke="currentColor" strokeWidth="2" opacity="0.6" />
    {/* Base line */}
    <path d="M7 16h10" stroke="currentColor" opacity="0.4" />
  </svg>
);

export function EmptyState({
  title = "No data available",
  description,
  icon,
  action,
  size = "md",
  variant = "default",
  className = "",
  style,
  children,
}: EmptyStateProps) {
  const classes = [
    "gy-empty-state",
    `gy-empty-state--${size}`,
    `gy-empty-state--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderedIcon =
    icon === undefined ? (
      <div className="gy-empty-state-icon-badge">
        <DefaultEmptyIcon />
      </div>
    ) : icon ? (
      <div className="gy-empty-state-icon">{icon}</div>
    ) : null;

  return (
    <div className={classes} style={style}>
      {renderedIcon}
      {title && <div className="gy-empty-state-title">{title}</div>}
      {description && (
        <div className="gy-empty-state-description">{description}</div>
      )}
      {action && <div className="gy-empty-state-action">{action}</div>}
      {children && <div className="gy-empty-state-content">{children}</div>}
    </div>
  );
}

export const NoData = EmptyState;
