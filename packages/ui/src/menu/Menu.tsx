"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  Placement as FloatingPlacement,
} from "@floating-ui/react";
import "./menu.css";

// Re-export Tooltip for backwards compat
import { Tooltip } from "../tooltip/Tooltip";
import { Typography } from "../typography";
export type { TooltipProps, TooltipPosition } from "../tooltip/Tooltip";
export { Tooltip };

export type MenuSize = "sm" | "md" | "lg";
export type MenuVariant =
  | "default"
  | "bordered"
  | "minimal"
  | "glassmorphic"
  | "glass";

export interface MenuItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
  children?: MenuItem[];
}

export type TriggerRenderProps = {
  open: boolean;
  toggle: (e?: React.MouseEvent<HTMLElement>) => void;
};

export interface MenuProps {
  items?: MenuItem[];
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
  header?: React.ReactNode;
  readOnly?: boolean;
  className?: string;
  /** Dropdown / Floating mode props */
  trigger?: React.ReactNode | ((props: TriggerRenderProps) => React.ReactNode);
  renderTrigger?: (props: TriggerRenderProps) => React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: FloatingPlacement;
  width?: number | string;
  keepOpenOnSelect?: boolean;
  usePortal?: boolean;
  zIndex?: number;
}

export function Menu({
  items = [],
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
  header,
  readOnly = false,
  className = "",
  trigger,
  renderTrigger,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  placement = "bottom-start",
  width,
  keepOpenOnSelect = false,
  usePortal = true,
  zIndex = 10050,
}: MenuProps) {
  const isDropdown = Boolean(trigger || renderTrigger);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const isOpen = isControlled ? Boolean(openProp) : internalOpen;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  const toggle = (e?: React.MouseEvent<HTMLElement>) => {
    e?.stopPropagation();
    handleOpenChange(!isOpen);
  };

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: handleOpenChange,
    placement,
    whileElementsMounted: autoUpdate,
    strategy: "fixed",
    middleware: [
      offset(8),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
    ],
  });

  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "menu" });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    dismiss,
    role,
  ]);

  const rootRef = useRef<HTMLElement>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    const expanded = new Set<string>();
    if (
      !defaultCollapsed &&
      orientation === "vertical" &&
      Array.isArray(items)
    ) {
      items.forEach((item) => {
        if (item?.children) expanded.add(item.id);
      });
    }
    return expanded;
  });

  // In horizontal menu, close submenus on outside click (only active when submenus are actually open)
  useEffect(() => {
    if (orientation !== "horizontal" || expandedIds.size === 0) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setExpandedIds((prev) => (prev.size === 0 ? prev : new Set()));
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [orientation, expandedIds.size]);

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

  const isHorizontal = orientation === "horizontal";

  const renderItem = (item: MenuItem, depth: number = 0) => {
    if (!item) return null;
    if (depth > 8) return null; // Prevent runaway recursion

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

    const handleClick = () => {
      if (readOnly || item.disabled) return;
      if (hasChildren && collapsible) {
        setExpandedIds((prev) => {
          const next = new Set(prev);
          if (next.has(item.id)) next.delete(item.id);
          else {
            if (isHorizontal) return new Set([item.id]);
            next.add(item.id);
          }
          return next;
        });
      }
      if (isDropdown && !keepOpenOnSelect) {
        handleOpenChange(false);
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
            paddingLeft:
              !isHorizontal && isChild ? `${1 + depth * 1.25}rem` : undefined,
            ...customActiveStyle,
          }}
          onClick={handleClick}
          disabled={item.disabled}
          aria-current={isActive ? "page" : undefined}
          aria-expanded={hasChildren ? isExpanded : undefined}
        >
          {item.icon && <span className="gy-nav-menu__icon">{item.icon}</span>}
          <Typography variant="span" className="gy-nav-menu__label">
            {item.label}
          </Typography>
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

        {hasChildren && isExpanded && item.children && (
          <div className="gy-nav-menu__children">
            {item.children.map((child) => renderItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const headerContent = header || children;

  const menuContent = (
    <nav ref={rootRef} className={rootClasses} style={rootStyle}>
      {headerContent && <div className="gy-nav-menu__header">{headerContent}</div>}
      <div className="gy-nav-menu__list" role="menu">
        {Array.isArray(items) && items.map((item) => renderItem(item))}
      </div>
    </nav>
  );

  if (!isDropdown) {
    return menuContent;
  }

  const triggerNode = renderTrigger
    ? renderTrigger({ open: isOpen, toggle })
    : typeof trigger === "function"
      ? (trigger as (props: TriggerRenderProps) => React.ReactNode)({ open: isOpen, toggle })
      : React.isValidElement(trigger)
        ? React.cloneElement(trigger as React.ReactElement<any>, {
            onClick: (e: any) => {
              (trigger as any).props?.onClick?.(e);
              toggle(e);
            },
          })
        : trigger;

  const floatingPanel = isOpen ? (
    <div
      ref={refs.setFloating}
      className="gy-menu-dropdown"
      style={{
        ...floatingStyles,
        zIndex,
        width: width ? (typeof width === "number" ? `${width}px` : width) : undefined,
        maxWidth: "calc(100vw - 16px)",
      }}
      {...getFloatingProps()}
    >
      {menuContent}
    </div>
  ) : null;

  return (
    <>
      <span
        ref={refs.setReference}
        className="gy-menu-trigger-wrapper"
        {...getReferenceProps()}
      >
        {triggerNode}
      </span>
      {usePortal ? (
        <FloatingPortal>{floatingPanel}</FloatingPortal>
      ) : (
        floatingPanel
      )}
    </>
  );
}
