"use client";

import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
  useMemo,
} from "react";
import { Tooltip } from "../tooltip/Tooltip";
import "./sidebar.css";
import { Typography } from "../typography";

export type SidebarPosition = "left" | "right";
export type SidebarVariant =
  | "default"
  | "floating"
  | "floating-glass"
  | "floating-glassmorphic"
  | "bordered"
  | "compact"
  | "glass"
  | "glassmorphic"
  | "dark";
export type SidebarActiveVariant = "pill" | "line" | "subtle" | "glow";

/** Built-in color scheme presets */
export type SidebarRolePreset =
  | "simantrix"
  | "coral"
  | "green"
  | "blue"
  | "violet"
  | "amber"
  | "cyan";

/** Custom color scheme object for full control */
export interface SidebarCustomColorScheme {
  /** Primary accent color (buttons, active items, badges) */
  primary: string;
  /** Lighter tint for surfaces & active-item backgrounds (light mode) */
  surfaceLight?: string;
  /** Darker tint for surfaces (dark mode) */
  surfaceDark?: string;
  /** Text color for light mode (defaults to the primary) */
  textLight?: string;
  /** Text color for dark mode */
  textDark?: string;
  /** Border color override */
  border?: string;
}

/** Can be a preset color scheme name or a custom color scheme object */
export type SidebarColorScheme = SidebarRolePreset | SidebarCustomColorScheme;

/** Color scheme presets */
const ROLE_COLOR_PRESETS: Record<SidebarRolePreset, SidebarCustomColorScheme> =
  {
    simantrix: {
      primary: "#7c5cff",
      surfaceLight: "#f5f3ff",
      surfaceDark: "#1e1040",
      textLight: "#5b21b6",
      textDark: "#c4b5fd",
      border: "#ddd6fe",
    },
    coral: {
      primary: "#f43f5e",
      surfaceLight: "#fff1f2",
      surfaceDark: "#4c0519",
      textLight: "#be123c",
      textDark: "#fda4af",
      border: "#fecdd3",
    },
    green: {
      primary: "#10b981",
      surfaceLight: "#ecfdf5",
      surfaceDark: "#022c22",
      textLight: "#047857",
      textDark: "#6ee7b7",
      border: "#a7f3d0",
    },
    blue: {
      primary: "#3b82f6",
      surfaceLight: "#eff6ff",
      surfaceDark: "#172554",
      textLight: "#1d4ed8",
      textDark: "#93c5fd",
      border: "#bfdbfe",
    },
    violet: {
      primary: "#6366f1",
      surfaceLight: "#eef2ff",
      surfaceDark: "#1e1b4b",
      textLight: "#4338ca",
      textDark: "#a5b4fc",
      border: "#c7d2fe",
    },
    amber: {
      primary: "#f59e0b",
      surfaceLight: "#fffbeb",
      surfaceDark: "#451a03",
      textLight: "#b45309",
      textDark: "#fcd34d",
      border: "#fde68a",
    },
    cyan: {
      primary: "#0ea5e9",
      surfaceLight: "#f0f9ff",
      surfaceDark: "#082f49",
      textLight: "#0369a1",
      textDark: "#7dd3fc",
      border: "#bae6fd",
    },
  };

/** Resolves a colorScheme to a concrete color object */
function resolveColorScheme(
  scheme?: SidebarColorScheme,
): SidebarCustomColorScheme | undefined {
  if (!scheme) return undefined;
  if (typeof scheme === "string") return ROLE_COLOR_PRESETS[scheme];
  return scheme;
}

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
  /**
   * Role-based color scheme. Pass a preset role name
   * ("admin" | "editor" | "viewer" | "moderator" | "owner" | "support" | "guest")
   * or a custom { primary, surfaceLight?, surfaceDark?, textLight?, textDark?, border? } object.
   */
  colorScheme?: SidebarColorScheme;
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
  /** Enable automatic responsive collapse and mobile drawer overlay (default: true) */
  responsive?: boolean;
  /** Breakpoint in pixels for mobile responsive behavior (default: 768) */
  breakpoint?: number;
  /** Show dark frosted backdrop on mobile when drawer is expanded (default: true) */
  showBackdropOnMobile?: boolean;
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
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
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
  colorScheme,
  width = 260,
  collapsedWidth = 70,
  header,
  footer,
  items,
  activeItemId,
  onItemClick,
  responsive = true,
  breakpoint = 768,
  showBackdropOnMobile = true,
  children,
  className = "",
  style,
}: SidebarProps) {
  const resolvedColors = useMemo(
    () => resolveColorScheme(colorScheme),
    [colorScheme],
  );
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive breakpoint listener
  useEffect(() => {
    if (!responsive || typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const updateMobile = (e: MediaQueryListEvent | MediaQueryList) => {
      const matches = e.matches;
      setIsMobile(matches);
      if (matches && controlledCollapsed === undefined) {
        setInternalCollapsed(true);
      }
    };

    updateMobile(mediaQuery);

    const listener = (e: MediaQueryListEvent) => updateMobile(e);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    } else {
      mediaQuery.addListener(listener);
      return () => mediaQuery.removeListener(listener);
    }
  }, [responsive, breakpoint, controlledCollapsed]);

  const isCollapsed = controlledCollapsed ?? internalCollapsed;

  // Track expanded state for nested accordion items
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    () => {
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
    },
  );

  // Helper to normalize IDs for flexible route matching
  const normalizeId = (id?: string) => (id ? id.replace(/^\/+|\/+$/g, "").toLowerCase() : "");

  // Ref tracking the currently active item to auto-scroll it into view
  const activeItemRef = useRef<HTMLButtonElement | null>(null);

  // Auto-scroll active item into view when activeItemId changes
  useEffect(() => {
    if (activeItemId && activeItemRef.current) {
      const timer = setTimeout(() => {
        activeItemRef.current?.scrollIntoView({
          block: "nearest",
          inline: "nearest",
          behavior: "smooth",
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeItemId]);

  // Auto-expand any parent accordion item if activeItemId is inside a nested group
  useEffect(() => {
    if (!activeItemId || !items) return;
    const normActive = normalizeId(activeItemId);
    const findParents = (itemList: SidebarItemData[], parents: string[] = []): string[] => {
      for (const it of itemList) {
        if (normalizeId(it.id) === normActive) {
          return parents;
        }
        if (it.children && it.children.length > 0) {
          const res = findParents(it.children, [...parents, it.id]);
          if (res.length > 0) return res;
        }
      }
      return [];
    };
    const parentsToExpand = findParents(items);
    if (parentsToExpand.length > 0) {
      setExpandedItems((prev) => {
        const next = { ...prev };
        let changed = false;
        parentsToExpand.forEach((pid) => {
          if (!next[pid]) {
            next[pid] = true;
            changed = true;
          }
        });
        return changed ? next : prev;
      });
    }
  }, [activeItemId, items]);

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

  const isFloating =
    variant === "floating" ||
    variant === "floating-glass" ||
    variant === "floating-glassmorphic";
  const isGlass =
    variant === "glass" ||
    variant === "glassmorphic" ||
    variant === "floating-glass" ||
    variant === "floating-glassmorphic";
  const isFloatingGlass =
    variant === "floating-glass" || variant === "floating-glassmorphic";
  const hasColorScheme = !!resolvedColors;

  const sidebarClasses = [
    "gy-sidebar",
    `gy-sidebar--${position}`,
    `gy-sidebar--${variant}`,
    isFloating ? "gy-sidebar--floating" : "",
    isGlass ? "gy-sidebar--glassmorphic" : "",
    isFloatingGlass ? "gy-sidebar--floating-glass" : "",
    `gy-sidebar--active-${activeVariant}`,
    isCollapsed ? "gy-sidebar--collapsed" : "gy-sidebar--expanded",
    responsive ? "gy-sidebar--responsive" : "",
    isMobile ? "gy-sidebar--mobile" : "",
    isMobile && !isCollapsed ? "gy-sidebar--mobile-open" : "",
    hasColorScheme ? "gy-sidebar--color-scheme" : "",
    typeof colorScheme === "string" ? `gy-sidebar--role-${colorScheme}` : "",
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

  // Build CSS custom properties for role color scheme
  const colorSchemeVars: Record<string, string> = {};
  if (resolvedColors) {
    colorSchemeVars["--gy-sidebar-accent"] = resolvedColors.primary;
    colorSchemeVars["--gy-sidebar-brand"] = resolvedColors.primary;
    colorSchemeVars["--gy-sidebar-cs-primary"] = resolvedColors.primary;
    if (resolvedColors.surfaceLight)
      colorSchemeVars["--gy-sidebar-cs-surface-light"] =
        resolvedColors.surfaceLight;
    if (resolvedColors.surfaceDark)
      colorSchemeVars["--gy-sidebar-cs-surface-dark"] =
        resolvedColors.surfaceDark;
    if (resolvedColors.textLight)
      colorSchemeVars["--gy-sidebar-cs-text-light"] = resolvedColors.textLight;
    if (resolvedColors.textDark)
      colorSchemeVars["--gy-sidebar-cs-text-dark"] = resolvedColors.textDark;
    if (resolvedColors.border)
      colorSchemeVars["--gy-sidebar-cs-border"] = resolvedColors.border;
  }

  const customAccentStyle: React.CSSProperties = {
    ...(accentColor && !resolvedColors
      ? ({ "--gy-sidebar-accent": accentColor } as React.CSSProperties)
      : {}),
    ...colorSchemeVars,
    width: resolvedWidth,
    minWidth: resolvedWidth,
    maxWidth: resolvedWidth,
    ...style,
  } as React.CSSProperties;

  const renderItem = (item: SidebarItemData, level: number = 0) => {
    if (item.divider) {
      return <div key={item.id} className="gy-sidebar-divider" />;
    }

    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = !!expandedItems[item.id];
    const isDirectActive =
      activeItemId === item.id ||
      (Boolean(activeItemId) && Boolean(item.id) && normalizeId(activeItemId) === normalizeId(item.id));
    const isChildActive =
      hasChildren &&
      item.children!.some(
        (c) =>
          activeItemId === c.id ||
          (Boolean(activeItemId) && Boolean(c.id) && normalizeId(activeItemId) === normalizeId(c.id)),
      );

    const itemButton = (
      <button
        ref={isDirectActive ? activeItemRef : undefined}
        type="button"
        key={item.id}
        disabled={item.disabled}
        className={[
          "gy-sidebar-item",
          level > 0 ? "gy-sidebar-item--nested" : "",
          isDirectActive ? "gy-sidebar-item--active" : "",
          isChildActive && !isDirectActive
            ? "gy-sidebar-item--child-active"
            : "",
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
        {item.icon && <span className="gy-sidebar-item-icon">{item.icon}</span>}
        {isCollapsed && item.badge && (
          <span
            className={`gy-sidebar-item-badge-dot gy-sidebar-item-badge-dot--${item.badgeColor ?? "danger"}`}
            aria-label={
              typeof item.badge === "string" ? item.badge : "Notification"
            }
          />
        )}
        {!isCollapsed && (
          <Typography variant="span" className="gy-sidebar-item-label">
            {item.label}
          </Typography>
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

    const tooltipContent = item.badge
      ? `${typeof item.label === "string" ? item.label : ""} (${item.badge})`
      : item.label;

    const wrappedButton = isCollapsed ? (
      <Tooltip
        key={item.id}
        content={tooltipContent}
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
      {isMobile && !isCollapsed && showBackdropOnMobile && (
        <div
          className="gy-sidebar-backdrop"
          onClick={toggleCollapse}
          aria-label="Close sidebar overlay"
        />
      )}
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
            Object.entries(groupedItems).map(([group, groupItems], idx) => (
              <div key={group} className="gy-sidebar-group">
                {group !== "__default__" &&
                  (isCollapsed ? (
                    idx > 0 && <div className="gy-sidebar-group-divider" />
                  ) : (
                    <Typography
                      variant="span"
                      as="div"
                      className="gy-sidebar-group-title"
                    >
                      {group}
                    </Typography>
                  ))}
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
  return <div className={`gy-sidebar-header ${className}`}>{children}</div>;
}

export function SidebarLogo({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`gy-sidebar-logo ${className}`}>{children}</div>;
}

export function SidebarText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`gy-sidebar-text ${className}`}>{children}</div>;
}

export function SidebarDivider({ className = "" }: { className?: string }) {
  return <div className={`gy-sidebar-divider ${className}`} />;
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
  return <div className={`gy-sidebar-footer ${className}`}>{children}</div>;
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
        <Typography variant="span" as="div" className="gy-sidebar-group-title">
          {title}
        </Typography>
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
  const normalizeId = (s?: string) => (s ? s.replace(/^\/+|\/+$/g, "").toLowerCase() : "");
  const isSelected =
    active ??
    (activeItemId === id ||
      (Boolean(activeItemId) && Boolean(id) && normalizeId(activeItemId) === normalizeId(id)));
  const itemRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isSelected && itemRef.current) {
      const timer = setTimeout(() => {
        itemRef.current?.scrollIntoView({
          block: "nearest",
          inline: "nearest",
          behavior: "smooth",
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isSelected]);

  const btn = (
    <button
      ref={itemRef}
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
      {isCollapsed && badge && (
        <span
          className={`gy-sidebar-item-badge-dot gy-sidebar-item-badge-dot--${badgeColor}`}
          aria-label={typeof badge === "string" ? badge : "Notification"}
        />
      )}
      {!isCollapsed && (
        <Typography variant="span" className="gy-sidebar-item-label">
          {label}
        </Typography>
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
    const tooltipContent = badge
      ? `${typeof label === "string" ? label : ""} (${badge})`
      : label;

    return (
      <Tooltip
        content={tooltipContent}
        placement={position === "left" ? "right" : "left"}
        delay={40}
      >
        {btn}
      </Tooltip>
    );
  }

  return btn;
}
