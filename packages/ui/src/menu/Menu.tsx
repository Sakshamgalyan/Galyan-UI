"use client";

import React, { useState } from "react";
import "./menu.css";

// Re-export Tooltip for backwards compat
import { Tooltip } from "../tooltip/Tooltip";
export type { TooltipProps, TooltipPosition } from "../tooltip/Tooltip";
export { Tooltip };

// ── Menu Types ──────────────────────────────────────────────────────────────
export type MenuSize = "sm" | "md" | "lg";
export type MenuVariant = "default" | "bordered" | "minimal";

export interface MenuItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
  children?: MenuItem[];
}

export interface MenuProps {
  items: MenuItem[];
  orientation?: "vertical" | "horizontal";
  size?: MenuSize;
  variant?: MenuVariant;
  onItemClick?: (id: string) => void;
  activeItemId?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  activeMenuItemColor?: string;
  maxHeight?: string;
  children?: React.ReactNode;
  readOnly?: boolean;
  className?: string;
}

export function Menu({
  items,
  orientation = "vertical",
  size = "md",
  variant = "bordered",
  onItemClick,
  activeItemId,
  collapsible = true,
  defaultCollapsed = false,
  activeMenuItemColor,
  maxHeight,
  children,
  readOnly = false,
  className = "",
}: MenuProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    const expanded = new Set<string>();
    if (!defaultCollapsed) {
      // Expand parents of active item or first level collapsible by default
      items.forEach((item) => {
        if (item.children) expanded.add(item.id);
      });
    }
    return expanded;
  });

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const rootClasses = [
    "gy-nav-menu",
    `gy-nav-menu--${orientation}`,
    `gy-nav-menu--${size}`,
    `gy-nav-menu--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const rootStyle: React.CSSProperties = {};
  if (maxHeight) {
    rootStyle.maxHeight = maxHeight;
    rootStyle.overflowY = "auto";
  }

  const renderItem = (item: MenuItem, depth: number = 0) => {
    if (item.divider) {
      return <div key={item.id} className="gy-nav-menu__divider" />;
    }

    const isActive = activeItemId === item.id;
    const hasChildren = Boolean(item.children && item.children.length > 0);
    const isExpanded = expandedIds.has(item.id);
    const isChild = depth > 0;

    const itemClasses = [
      "gy-nav-menu__item",
      isChild ? "gy-nav-menu__item--child" : "",
      isActive ? "gy-nav-menu__item--active" : "",
      item.disabled ? "gy-nav-menu__item--disabled" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const handleClick = (e: React.MouseEvent) => {
      if (readOnly || item.disabled) return;
      if (hasChildren && collapsible) {
        setExpandedIds((prev) => {
          const next = new Set(prev);
          if (next.has(item.id)) next.delete(item.id);
          else next.add(item.id);
          return next;
        });
      }
      onItemClick?.(item.id);
    };

    const customActiveStyle: React.CSSProperties = {};
    if (isActive && activeMenuItemColor) {
      customActiveStyle.backgroundColor = activeMenuItemColor;
    }

    return (
      <div key={item.id} className="gy-nav-menu__entry">
        <button
          type="button"
          className={itemClasses}
          style={{
            paddingLeft: isChild ? `${1 + depth * 1.25}rem` : "0.875rem",
            ...customActiveStyle,
          }}
          onClick={handleClick}
          disabled={item.disabled}
          aria-current={isActive ? "page" : undefined}
          aria-expanded={hasChildren ? isExpanded : undefined}
        >
          {/* Active left vertical accent line */}
          {isActive && !isChild && (
            <span className="gy-nav-menu__accent-line" />
          )}

          {item.icon && <span className="gy-nav-menu__icon">{item.icon}</span>}
          <span className="gy-nav-menu__label">{item.label}</span>
          {item.badge && (
            <span className="gy-nav-menu__badge">{item.badge}</span>
          )}

          {hasChildren && collapsible && (
            <span
              className={`gy-nav-menu__chevron ${isExpanded ? "gy-nav-menu__chevron--open" : ""}`}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          )}
        </button>

        {hasChildren && isExpanded && (
          <div className="gy-nav-menu__children">
            {item.children!.map((child) => renderItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={rootClasses} style={rootStyle}>
      {children && <div className="gy-nav-menu__header">{children}</div>}
      <div className="gy-nav-menu__list" role="menu">
        {items.map((item) => renderItem(item))}
      </div>
    </nav>
  );
}
