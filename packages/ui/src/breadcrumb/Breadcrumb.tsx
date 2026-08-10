"use client";

import React, { useState } from "react";
import "./breadcrumb.css";

export type BreadcrumbSize = "sm" | "md" | "lg";
export type BreadcrumbVariant = "default" | "subtle" | "ghost";

export interface BreadcrumbItemDef {
  id?: string;
  label: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItemDef[];
  separator?: React.ReactNode;
  onItemClick?: (item: BreadcrumbItemDef, index: number) => void;
  showBackButton?: boolean;
  onBackClick?: () => void;
  size?: BreadcrumbSize;
  variant?: BreadcrumbVariant;
  maxItems?: number;
  className?: string;
}

const DefaultChevron = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="4,2 8,6 4,10" />
  </svg>
);

const BackArrow = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9,3 4,7 9,11" />
    <line x1="4" y1="7" x2="13" y2="7" />
  </svg>
);

export function Breadcrumb({
  items,
  separator = "/",
  onItemClick,
  showBackButton = false,
  onBackClick,
  size = "md",
  variant = "default",
  maxItems,
  className = "",
}: BreadcrumbProps) {
  const [expanded, setExpanded] = useState(false);

  const shouldCollapse = maxItems && items.length > maxItems + 1 && !expanded;

  const handleItemClick = (
    item: BreadcrumbItemDef,
    index: number,
    e: React.MouseEvent,
  ) => {
    if (item.disabled) {
      e.preventDefault();
      return;
    }
    if (!item.href) {
      e.preventDefault();
    }
    onItemClick?.(item, index);
  };

  const rootClasses = [
    "gy-breadcrumb-nav",
    `gy-breadcrumb-nav--${size}`,
    `gy-breadcrumb-nav--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  let visibleItems = items;
  if (shouldCollapse) {
    visibleItems = [items[0]!, items[items.length - 1]!];
  }

  return (
    <nav aria-label="Breadcrumb" className={rootClasses}>
      <ol className="gy-breadcrumb-list">
        {showBackButton && (
          <li className="gy-breadcrumb-item gy-breadcrumb-back-wrapper">
            <button
              type="button"
              className="gy-breadcrumb-back-btn"
              onClick={onBackClick}
              aria-label="Go back"
            >
              <BackArrow />
            </button>
          </li>
        )}

        {shouldCollapse ? (
          <>
            <li className="gy-breadcrumb-item">
              <a
                className="gy-breadcrumb-link"
                href={items[0]?.href ?? "#"}
                onClick={(e) => handleItemClick(items[0]!, 0, e)}
              >
                {items[0]?.icon && (
                  <span className="gy-breadcrumb-icon">{items[0].icon}</span>
                )}
                <span>{items[0]?.label}</span>
              </a>
              <span className="gy-breadcrumb-separator" aria-hidden="true">
                {separator}
              </span>
            </li>
            <li className="gy-breadcrumb-item">
              <button
                type="button"
                className="gy-breadcrumb-ellipsis"
                onClick={() => setExpanded(true)}
                aria-label="Show all breadcrumb items"
              >
                •••
              </button>
              <span className="gy-breadcrumb-separator" aria-hidden="true">
                {separator}
              </span>
            </li>
            <li className="gy-breadcrumb-item">
              <span className="gy-breadcrumb-current" aria-current="page">
                {items[items.length - 1]?.icon && (
                  <span className="gy-breadcrumb-icon">
                    {items[items.length - 1]!.icon}
                  </span>
                )}
                <span>{items[items.length - 1]?.label}</span>
              </span>
            </li>
          </>
        ) : (
          items.map((item, idx) => {
            const isLast = idx === items.length - 1;

            return (
              <li key={item.id ?? idx} className="gy-breadcrumb-item">
                {isLast ? (
                  <span className="gy-breadcrumb-current" aria-current="page">
                    {item.icon && (
                      <span className="gy-breadcrumb-icon">{item.icon}</span>
                    )}
                    <span>{item.label}</span>
                  </span>
                ) : (
                  <>
                    <a
                      className={`gy-breadcrumb-link ${item.disabled ? "gy-breadcrumb-link--disabled" : ""}`}
                      href={item.href ?? "#"}
                      onClick={(e) => handleItemClick(item, idx, e)}
                    >
                      {item.icon && (
                        <span className="gy-breadcrumb-icon">{item.icon}</span>
                      )}
                      <span>{item.label}</span>
                    </a>
                    <span
                      className="gy-breadcrumb-separator"
                      aria-hidden="true"
                    >
                      {separator}
                    </span>
                  </>
                )}
              </li>
            );
          })
        )}
      </ol>
    </nav>
  );
}
