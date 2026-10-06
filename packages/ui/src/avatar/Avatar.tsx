"use client";

import React, { useState } from "react";
import "./avatar.css";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarShape = "circle" | "rounded" | "square";
export type AvatarVariant = "default" | "glass" | "bordered" | "ring";
export type AvatarStatus =
  | "online"
  | "away"
  | "busy"
  | "in_meeting"
  | "dnd"
  | "offline"
  | "ONLINE"
  | "AWAY"
  | "BUSY"
  | "IN_MEETING"
  | "DO_NOT_DISTURB"
  | "OFFLINE";

export type AvatarRole =
  | "developer"
  | "organization"
  | "org-admin"
  | "org-member";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image source URL */
  src?: string | null;
  /** Image alternative text */
  alt?: string;
  /** Full name or username used to generate fallback initials */
  name?: string;
  /** Custom fallback text or node */
  fallback?: React.ReactNode;
  /** Size preset */
  size?: AvatarSize;
  /** Avatar shape */
  shape?: AvatarShape;
  /** Visual style variant */
  variant?: AvatarVariant;
  /** Samantrix role */
  role?: AvatarRole;
  /** Live presence or availability status */
  status?: AvatarStatus;
  /** Placement of the status indicator */
  statusPosition?: "bottom-right" | "top-right" | "bottom-left" | "top-left";
  /** Adds primary ring & shadow glow */
  glow?: boolean;
  /** Interactive hover scale and feedback */
  interactive?: boolean;
  /** Optional click handler */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Additional CSS class names */
  className?: string;
}

function getInitials(name?: string): string {
  if (!name) return "";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0];
  if (!first) return "";
  if (parts.length === 1) {
    return first.slice(0, 2).toUpperCase();
  }
  const last = parts[parts.length - 1];
  const firstChar = first.charAt(0);
  const lastChar = last ? last.charAt(0) : "";
  return (firstChar + lastChar).toUpperCase();
}

function normalizeStatus(status?: AvatarStatus): string | undefined {
  if (!status) return undefined;
  const s = status.toLowerCase();
  if (s === "do_not_disturb") return "dnd";
  return s;
}

export function Avatar({
  src,
  alt = "",
  name,
  fallback,
  size = "md",
  shape = "circle",
  variant = "default",
  role,
  status,
  statusPosition = "bottom-right",
  glow = false,
  interactive = false,
  onClick,
  className = "",
  style,
  ...rest
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const initials = fallback ?? (name ? getInitials(name) : "?");
  const hasImage = Boolean(src) && !imageError;
  const normalizedStatus = normalizeStatus(status);
  const isClickable = Boolean(onClick || interactive);

  const rootClasses = [
    "gy-avatar",
    `gy-avatar--${size}`,
    `gy-avatar--${shape}`,
    `gy-avatar--${variant}`,
    role ? `gy-avatar--role-${role}` : "",
    isClickable ? "gy-avatar--clickable" : "",
    interactive ? "gy-avatar--interactive" : "",
    glow ? "gy-avatar--glow" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={rootClasses}
      style={style}
      data-role={role}
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      {...rest}
    >
      {hasImage ? (
        <img
          src={src!}
          alt={alt || name || "Avatar"}
          className="gy-avatar__image"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="gy-avatar__fallback" aria-label={name || alt}>
          {initials}
        </span>
      )}

      {normalizedStatus && (
        <span
          className={`gy-avatar__status gy-avatar__status--${normalizedStatus} gy-avatar__status--${statusPosition}`}
          aria-label={`Status: ${normalizedStatus}`}
          title={`Status: ${normalizedStatus}`}
        />
      )}
    </div>
  );
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
  size?: AvatarSize;
  spacing?: "tight" | "normal" | "relaxed";
  className?: string;
}

export function AvatarGroup({
  children,
  max,
  size = "md",
  spacing = "normal",
  className = "",
  ...rest
}: AvatarGroupProps) {
  const childrenArray = React.Children.toArray(children);
  const total = childrenArray.length;
  const visible = max ? childrenArray.slice(0, max) : childrenArray;
  const excess = max && total > max ? total - max : 0;

  return (
    <div
      className={`gy-avatar-group gy-avatar-group--${spacing} ${className}`}
      {...rest}
    >
      {visible.map((child, index) => {
        if (React.isValidElement<AvatarProps>(child)) {
          return React.cloneElement(child, {
            size: child.props.size ?? size,
            className: `${child.props.className ?? ""} gy-avatar-group__item`,
            key: index,
          });
        }
        return child;
      })}

      {excess > 0 && (
        <div
          className={`gy-avatar gy-avatar--${size} gy-avatar--circle gy-avatar--excess gy-avatar-group__item`}
          title={`${excess} more`}
        >
          <span className="gy-avatar__fallback">+{excess}</span>
        </div>
      )}
    </div>
  );
}
