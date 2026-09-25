"use client";

import React, { useState, createContext, useContext, useMemo } from "react";
import { Tooltip } from "../tooltip/Tooltip";
import "./sidebar.css";

export type SidebarPosition = "left" | "right";
export type SidebarVariant =
  | "default"
  | "floating"
  | "bordered"
  | "compact"
  | "glass"
  | "dark";
export type SidebarActiveVariant = "pill" | "line" | "subtle" | "glow";

export interface SidebarItemData {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  badgeColor?: "primary" | "danger" | "success" | "warning" | "neutral";
  disabled?: boolean;
  divider?: boolean;
  group?: string;
  children?: SidebarItemData[];
  defaultExpanded?: boolean;
  onClick?: () => void;
}

export interface SidebarProps {
  /** Controlled collapsed state */
  collapsed?: boolean;
  /** Default collapsed state when uncontrolled */
  defaultCollapsed?: boolean;
  /** Callback fired when collapse state changes */
  onCollapseChange?: (collapsed: boolean) => void;
  /** Whether the sidebar can be collapsed */
  collapsible?: boolean;
  /** Positioning side of the sidebar */
  position?: SidebarPosition;
  /** Visual variant */
  variant?: SidebarVariant;
  /** Style for the active navigation item */
  activeVariant?: SidebarActiveVariant;
  /** Custom accent color for active item / brand highlight */
  accentColor?: string;
  /** Expanded width */
  width?: string | number;
  /** Collapsed width */
  collapsedWidth?: string | number;
  /** Header slot element */
  header?: React.ReactNode;
  /** Footer slot element */
  footer?: React.ReactNode;
  /** Navigation item definitions */
  items?: SidebarItemData[];
  /** Currently active navigation item id */
  activeItemId?: string;
  /** Callback when a navigation item is clicked */
  onItemClick?: (id: string) => void;
  /** Custom children when building a custom layout */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

interface SidebarContextValue {
  isCollapsed: boolean;
  position: SidebarPosition;
  variant: SidebarVariant;
  activeVariant: SidebarActiveVariant;
  accentColor?: string;
  activeItemId?: string;
  onItemClick?: (id: string) => void;
}

const SidebarContext = createContext<SidebarContextValue>({
  isCollapsed: false,
  position: "left",
  variant: "default",
  activeVariant: "pill",
});

export const useSidebar = () => useContext(SidebarContext);

const ChevronLeft = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.25"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.25"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ChevronDown = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.25"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export function Sidebar({
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  onCollapseChange,
  collapsible = true,
  position = "left",
  variant = "default",
  activeVariant = "pill",
  accentColor,
  width = 260,
  collapsedWidth = 70,
  header,
  footer,
  items,
  activeItemId,
  onItemClick,
  children,
  className = "",
  style,
}: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isCollapsed = controlledCollapsed ?? internalCollapsed;

  // Track expanded state for nested accordion items
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(() => {
    if (!items) return {};
    const initial: Record<string, boolean> = {};
    const initRecursive = (itemList: SidebarItemData[]) => {
      itemList.forEach((it) => {
        if (it.defaultExpanded) initial[it.id] = true;
        if (it.children) initRecursive(it.children);
      });
    };
    initRecursive(items);
    return initial;
  });

  const toggleItemExpand = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCollapse = () => {
    if (!collapsible) return;
    const next = !isCollapsed;
    setInternalCollapsed(next);
    onCollapseChange?.(next);
  };

  const resolvedWidth = isCollapsed
    ? typeof collapsedWidth === "number"
      ? `${collapsedWidth}px`
      : collapsedWidth
    : typeof width === "number"
      ? `${width}px`
      : width;

  const sidebarClasses = [
    "gy-sidebar",
    `gy-sidebar--${position}`,
    `gy-sidebar--${variant}`,
    `gy-sidebar--active-${activeVariant}`,
    isCollapsed ? "gy-sidebar--collapsed" : "gy-sidebar--expanded",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const contextValue: SidebarContextValue = {
    isCollapsed,
    position,
    variant,
    activeVariant,
    accentColor,
    activeItemId,
    onItemClick,
  };

  // Group items if groups are provided
  const groupedItems = useMemo(() => {
    if (!items) return null;
    return items.reduce<Record<string, SidebarItemData[]>>((acc, item) => {
      const key = item.group ?? "__default__";
      acc[key] = [...(acc[key] ?? []), item];
      return acc;
    }, {});
  }, [items]);

  const customAccentStyle: React.CSSProperties = {
    ...(accentColor ? ({ "--gy-sidebar-accent": accentColor } as any) : {}),
    width: resolvedWidth,
    minWidth: resolvedWidth,
    maxWidth: resolvedWidth,
    ...style,
  };

  const renderItem = (item: SidebarItemData, level: number = 0) => {
    if (item.divider) {
      return <div key={item.id} className="gy-sidebar-divider" />;
    }

    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = !!expandedItems[item.id];
    const isDirectActive = activeItemId === item.id;
    const isChildActive =
      hasChildren && item.children!.some((c) => c.id === activeItemId);
    const isActive = isDirectActive || isChildActive;

    const itemButton = (
      <button
        type="button"
        key={item.id}
        disabled={item.disabled}
        className={[
          "gy-sidebar-item",
          level > 0 ? "gy-sidebar-item--nested" : "",
          isDirectActive ? "gy-sidebar-item--active" : "",
          isChildActive && !isDirectActive ? "gy-sidebar-item--child-active" : "",
          item.disabled ? "gy-sidebar-item--disabled" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() => {
          if (!item.disabled) {
            if (hasChildren && !isCollapsed) {
              toggleItemExpand(item.id);
            }
            item.onClick?.();
            onItemClick?.(item.id);
          }
        }}
      >
        {item.icon && (
          <span className="gy-sidebar-item-icon">{item.icon}</span>
        )}
        {!isCollapsed && (
          <span className="gy-sidebar-item-label">{item.label}</span>
        )}
        {!isCollapsed && item.badge && (
          <span
            className={`gy-sidebar-item-badge gy-sidebar-item-badge--${item.badgeColor ?? "danger"}`}
          >
            {item.badge}
          </span>
        )}
        {!isCollapsed && hasChildren && (
          <span
            className={`gy-sidebar-item-chevron ${isExpanded ? "gy-sidebar-item-chevron--expanded" : ""}`}
            onClick={(e) => toggleItemExpand(item.id, e)}
          >
            <ChevronDown />
          </span>
        )}
      </button>
    );

    const wrappedButton = isCollapsed ? (
      <Tooltip
        key={item.id}
        content={item.label}
        placement={position === "left" ? "right" : "left"}
        delay={40}
      >
        {itemButton}
      </Tooltip>
    ) : (
      itemButton
    );

    if (hasChildren && isExpanded && !isCollapsed) {
      return (
        <div key={item.id} className="gy-sidebar-nested-group">
          {wrappedButton}
          <div className="gy-sidebar-nested-list">
            {item.children!.map((child) => renderItem(child, level + 1))}
          </div>
        </div>
      );
    }

    return wrappedButton;
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      <aside
        className={sidebarClasses}
        style={customAccentStyle}
        aria-expanded={!isCollapsed}
      >
        {collapsible && (
          <button
            type="button"
            className="gy-sidebar-toggle-btn"
            onClick={toggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {position === "left" ? (
              isCollapsed ? (
                <ChevronRight />
              ) : (
                <ChevronLeft />
              )
            ) : isCollapsed ? (
              <ChevronLeft />
            ) : (
              <ChevronRight />
            )}
          </button>
        )}

        {header && <div className="gy-sidebar-header">{header}</div>}

        <div className="gy-sidebar-body">
          {children}

          {groupedItems &&
            Object.entries(groupedItems).map(([group, groupItems]) => (
              <div key={group} className="gy-sidebar-group">
                {group !== "__default__" && !isCollapsed && (
                  <div className="gy-sidebar-group-title">{group}</div>
                )}
                {groupItems.map((item) => renderItem(item, 0))}
              </div>
            ))}
        </div>

        {footer && <div className="gy-sidebar-footer">{footer}</div>}
      </aside>
    </SidebarContext.Provider>
  );
}

/* ── Compound Subcomponents for Custom Composition ─────────────────────── */

export function SidebarHeader({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`gy-sidebar-header ${className}`}>{children}</div>
  );
}

export function SidebarBody({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`gy-sidebar-body ${className}`}>{children}</div>;
}

export function SidebarFooter({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`gy-sidebar-footer ${className}`}>{children}</div>
  );
}

export function SidebarGroup({
  title,
  children,
  className = "",
}: {
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const { isCollapsed } = useSidebar();
  return (
    <div className={`gy-sidebar-group ${className}`}>
      {title && !isCollapsed && (
        <div className="gy-sidebar-group-title">{title}</div>
      )}
      {children}
    </div>
  );
}

export function SidebarItem({
  id,
  label,
  icon,
  badge,
  badgeColor = "danger",
  disabled = false,
  active,
  onClick,
  className = "",
}: {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  badgeColor?: "primary" | "danger" | "success" | "warning" | "neutral";
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const { isCollapsed, activeItemId, onItemClick, position } = useSidebar();
  const isSelected = active ?? (activeItemId === id);

  const btn = (
    <button
      type="button"
      disabled={disabled}
      className={[
        "gy-sidebar-item",
        isSelected ? "gy-sidebar-item--active" : "",
        disabled ? "gy-sidebar-item--disabled" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => {
        if (!disabled) {
          onClick?.();
          onItemClick?.(id);
        }
      }}
    >
      {icon && <span className="gy-sidebar-item-icon">{icon}</span>}
      {!isCollapsed && (
        <span className="gy-sidebar-item-label">{label}</span>
      )}
      {!isCollapsed && badge && (
        <span
          className={`gy-sidebar-item-badge gy-sidebar-item-badge--${badgeColor}`}
        >
          {badge}
        </span>
      )}
    </button>
  );

  if (isCollapsed) {
    return (
      <Tooltip
        content={label}
        placement={position === "left" ? "right" : "left"}
        delay={40}
      >
        {btn}
      </Tooltip>
    );
  }

  return btn;
}
