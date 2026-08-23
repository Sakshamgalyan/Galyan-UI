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
  backButtonLabel?: string;
  onBackClick?: () => void;
  size?: BreadcrumbSize;
  variant?: BreadcrumbVariant;
  maxItems?: number;
  className?: string;
}

const BackArrow = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="gy-breadcrumb-back-icon"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const DefaultSlash = () => (
  <span className="gy-breadcrumb-separator-char" aria-hidden="true">
    /
  </span>
);

export function Breadcrumb({
  items,
  separator = <DefaultSlash />,
  onItemClick,
  showBackButton = false,
  backButtonLabel,
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
              aria-label={backButtonLabel || "Go back"}
            >
              <BackArrow />
              {backButtonLabel && (
                <span className="gy-breadcrumb-back-label">
                  {backButtonLabel}
                </span>
              )}
            </button>
            <span className="gy-breadcrumb-divider" aria-hidden="true" />
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
