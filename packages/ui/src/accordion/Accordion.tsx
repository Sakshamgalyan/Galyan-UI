"use client";

import React, { useRef, useState } from "react";
import "./accordion.css";

export type AccordionSize = "sm" | "md" | "lg";
export type AccordionVariant =
  | "default"
  | "bordered"
  | "flush"
  | "separated"
  | "filled";
export type ExpandIconPosition = "left" | "right" | "start" | "end";

export interface AccordionItemData {
  id: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  defaultExpanded?: boolean;
  expanded?: boolean;
  expandIconPosition?: ExpandIconPosition;
  expandIcon?: React.ReactNode | ((expanded: boolean) => React.ReactNode);
}

export interface AccordionProps {
  size?: AccordionSize;
  variant?: AccordionVariant;
  disabled?: boolean;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onChange?: (expanded: boolean) => void;
  unmountOnExit?: boolean;
  expandIconPosition?: ExpandIconPosition;
  expandIcon?: React.ReactNode | ((expanded: boolean) => React.ReactNode);
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  items?: AccordionItemData[];
  allowMultiple?: boolean;
  defaultExpandedIds?: string[];
  expandedIds?: string[];
  onExpandedChange?: (expandedIds: string[]) => void;
}

const ChevronIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="3.5,6 8,10.5 12.5,6" />
  </svg>
);

export function Accordion({
  size = "md",
  variant = "default",
  disabled = false,
  defaultExpanded = false,
  expanded: controlledExpanded,
  onChange,
  unmountOnExit = false,
  expandIconPosition = "right",
  expandIcon,
  icon,
  actions,
  title,
  subtitle,
  description,
  children,
  items,
  allowMultiple = true,
  defaultExpandedIds,
  expandedIds: controlledExpandedIds,
  onExpandedChange,
  className = "",
}: AccordionProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isExpanded =
    controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  // Group state for `items`
  const getInitialExpandedIds = (): string[] => {
    if (defaultExpandedIds) return defaultExpandedIds;
    if (items) {
      return items
        .filter((item) => item.defaultExpanded || item.expanded)
        .map((item) => item.id);
    }
    return [];
  };

  const [internalExpandedIds, setInternalExpandedIds] = useState<string[]>(
    getInitialExpandedIds,
  );

  const currentExpandedIds =
    controlledExpandedIds !== undefined
      ? controlledExpandedIds
      : internalExpandedIds;

  const handleToggle = () => {
    if (disabled) return;
    const next = !isExpanded;
    if (controlledExpanded === undefined) {
      setInternalExpanded(next);
    }
    onChange?.(next);
  };

  const handleGroupItemToggle = (itemId: string, itemDisabled?: boolean) => {
    if (disabled || itemDisabled) return;

    let nextIds: string[];
    const isCurrentlyExpanded = currentExpandedIds.includes(itemId);

    if (allowMultiple) {
      if (isCurrentlyExpanded) {
        nextIds = currentExpandedIds.filter((id) => id !== itemId);
      } else {
        nextIds = [...currentExpandedIds, itemId];
      }
    } else {
      if (isCurrentlyExpanded) {
        nextIds = [];
      } else {
        nextIds = [itemId];
      }
    }

    if (controlledExpandedIds === undefined) {
      setInternalExpandedIds(nextIds);
    }
    onExpandedChange?.(nextIds);
  };

  const contentRef = useRef<HTMLDivElement>(null);

  // If `items` prop is passed, render list of items with group state management
  if (items && items.length > 0) {
    return (
      <div
        className={`gy-accordion-group gy-accordion-group--${variant} ${className}`}
      >
        {items.map((item) => {
          const isItemExpanded =
            item.expanded !== undefined
              ? item.expanded
              : currentExpandedIds.includes(item.id);

          return (
            <Accordion
              key={item.id}
              size={size}
              variant={variant}
              disabled={disabled || item.disabled}
              expandIconPosition={item.expandIconPosition || expandIconPosition}
              expandIcon={item.expandIcon || expandIcon}
              icon={item.icon}
              actions={item.actions}
              title={item.title}
              subtitle={item.subtitle}
              description={item.description}
              unmountOnExit={unmountOnExit}
              expanded={isItemExpanded}
              onChange={() => handleGroupItemToggle(item.id, item.disabled)}
            >
              {item.content}
            </Accordion>
          );
        })}
      </div>
    );
  }

  const rootClasses = [
    "gy-accordion",
    `gy-accordion--${size}`,
    `gy-accordion--${variant}`,
    disabled ? "gy-accordion--disabled" : "",
    isExpanded ? "gy-accordion--expanded" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const sub = subtitle ?? description;
  const isIconLeft =
    expandIconPosition === "left" || expandIconPosition === "start";
  const isIconRight =
    expandIconPosition === "right" || expandIconPosition === "end";

  const renderIcon = () => {
    if (expandIcon) {
      return typeof expandIcon === "function"
        ? expandIcon(isExpanded)
        : expandIcon;
    }
    return <ChevronIcon />;
  };

  return (
    <div className={rootClasses}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        className={`gy-accordion__trigger gy-accordion__trigger--icon-${expandIconPosition}`}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle();
          }
        }}
        aria-expanded={isExpanded}
        aria-disabled={disabled}
      >
        {isIconLeft && (
          <span
            className={`gy-accordion__icon ${isExpanded ? "gy-accordion__icon--open" : ""}`}
          >
            {renderIcon()}
          </span>
        )}
        {icon && <span className="gy-accordion__leading-icon">{icon}</span>}
        <div className="gy-accordion__header-content">
          <span className="gy-accordion__title">{title}</span>
          {sub && <span className="gy-accordion__subtitle">{sub}</span>}
        </div>
        {actions && (
          <div
            className="gy-accordion__actions"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            {actions}
          </div>
        )}
        {isIconRight && (
          <span
            className={`gy-accordion__icon ${isExpanded ? "gy-accordion__icon--open" : ""}`}
          >
            {renderIcon()}
          </span>
        )}
      </div>

      {(!unmountOnExit || isExpanded) && (
        <div
          className={`gy-accordion__panel ${isExpanded ? "gy-accordion__panel--expanded" : ""}`}
        >
          <div className="gy-accordion__panel-inner">
            <div ref={contentRef} className="gy-accordion__content">
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
