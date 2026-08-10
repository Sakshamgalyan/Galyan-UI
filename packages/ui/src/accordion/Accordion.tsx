"use client";

import React, { useRef, useState } from "react";
import "./accordion.css";

export type AccordionSize = "sm" | "md" | "lg";
export type AccordionVariant = "default" | "bordered" | "flush" | "separated";
export type ExpandIconPosition = "left" | "right";

export interface AccordionProps {
  size?: AccordionSize;
  variant?: AccordionVariant;
  disabled?: boolean;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onChange?: (expanded: boolean) => void;
  unmountOnExit?: boolean;
  expandIconPosition?: ExpandIconPosition;
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  items?: {
    id: string;
    title: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
  }[];
}

const ChevronIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="4,6 8,10 12,6" />
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
  title,
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
  const height = isExpanded ? (contentRef.current?.scrollHeight ?? "auto") : 0;

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
            title={item.title}
            unmountOnExit={unmountOnExit}
          >
            {item.content}
          </Accordion>
        ))}
      </div>
    );
  }

  return (
    <div className={rootClasses}>
      <button
        type="button"
        className={`gy-accordion__trigger gy-accordion__trigger--icon-${expandIconPosition}`}
        onClick={handleToggle}
        disabled={disabled}
        aria-expanded={isExpanded}
      >
        {expandIconPosition === "left" && (
          <span
            className={`gy-accordion__icon ${isExpanded ? "gy-accordion__icon--open" : ""}`}
          >
            <ChevronIcon />
          </span>
        )}
        <span className="gy-accordion__title">{title}</span>
        {expandIconPosition === "right" && (
          <span
            className={`gy-accordion__icon ${isExpanded ? "gy-accordion__icon--open" : ""}`}
          >
            <ChevronIcon />
          </span>
        )}
      </button>

      {(!unmountOnExit || isExpanded) && (
        <div
          className={`gy-accordion__panel ${isExpanded ? "gy-accordion__panel--expanded" : ""}`}
          style={{
            display: "grid",
            gridTemplateRows: isExpanded ? "1fr" : "0fr",
            transition: "grid-template-rows 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div className="gy-accordion__panel-inner" style={{ overflow: "hidden" }}>
            <div ref={contentRef} className="gy-accordion__content">
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
