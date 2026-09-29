"use client";

import React from "react";
import "./empty-state.css";
import { Typography } from "../typography";

export interface EmptyStateProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode | null;
  action?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?:
    | "default"
    | "subtle"
    | "card"
    | "dashed"
    | "gradient"
    | "glass"
    | "spotlight";
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
    {/* Sloped tray walls */}
    <path
      d="M4 13.2 6.3 6.6A2.2 2.2 0 0 1 8.4 5.1h7.2a2.2 2.2 0 0 1 2.1 1.5l2.3 6.6"
      opacity="0.5"
    />
    {/* Tray body */}
    <path d="M20 13.2v4.3a2.2 2.2 0 0 1-2.2 2.2H6.2A2.2 2.2 0 0 1 4 17.5v-4.3" />
    {/* Intake slot (accent highlight) */}
    <path
      d="M4 13.2h3.7l1.1 2.1h6.4l1.1-2.1H20"
      stroke="var(--gy-primary, #3b82f6)"
      strokeWidth="1.8"
    />
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
      {title && (
        <Typography variant="span" as="div" className="gy-empty-state-title">
          {title}
        </Typography>
      )}
      {description && (
        <Typography
          variant="span"
          as="div"
          className="gy-empty-state-description"
        >
          {description}
        </Typography>
      )}
      {action && <div className="gy-empty-state-action">{action}</div>}
      {children && <div className="gy-empty-state-content">{children}</div>}
    </div>
  );
}

export const NoData = EmptyState;
