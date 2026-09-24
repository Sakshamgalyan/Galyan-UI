"use client";

import React, { useRef, useState } from "react";
import "./accordion.css";

export type AccordionSize = "sm" | "md" | "lg";
export type AccordionVariant = "default" | "bordered" | "flush" | "separated";
export type ExpandIconPosition = "left" | "right" | "start" | "end";

export interface AccordionItemData {
  id: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
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
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  items?: AccordionItemData[];
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
  title,
  subtitle,
  description,
  children,
  items,
  className = "",
}: AccordionProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isExpanded =
    controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const handleToggle = () => {
    if (disabled) return;
    const next = !isExpanded;
    if (controlledExpanded === undefined) {
      setInternalExpanded(next);
    }
    onChange?.(next);
  };

  const contentRef = useRef<HTMLDivElement>(null);

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

  // If `items` prop is passed, render list of items
  if (items && items.length > 0) {
    return (
      <div
        className={`gy-accordion-group gy-accordion-group--${variant} ${className}`}
      >
        {items.map((item) => (
          <Accordion
            key={item.id}
            size={size}
            variant={variant}
            disabled={disabled || item.disabled}
            expandIconPosition={expandIconPosition}
            expandIcon={expandIcon}
            title={item.title}
            subtitle={item.subtitle}
            description={item.description}
            unmountOnExit={unmountOnExit}
          >
            {item.content}
          </Accordion>
        ))}
      </div>
    );
  }

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
      <button
        type="button"
        className={`gy-accordion__trigger gy-accordion__trigger--icon-${expandIconPosition}`}
        onClick={handleToggle}
        disabled={disabled}
        aria-expanded={isExpanded}
      >
        {isIconLeft && (
          <span
            className={`gy-accordion__icon ${isExpanded ? "gy-accordion__icon--open" : ""}`}
          >
            {renderIcon()}
          </span>
        )}
        <div className="gy-accordion__header-content">
          <span className="gy-accordion__title">{title}</span>
          {sub && <span className="gy-accordion__subtitle">{sub}</span>}
        </div>
        {isIconRight && (
          <span
            className={`gy-accordion__icon ${isExpanded ? "gy-accordion__icon--open" : ""}`}
          >
            {renderIcon()}
          </span>
        )}
      </button>

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
