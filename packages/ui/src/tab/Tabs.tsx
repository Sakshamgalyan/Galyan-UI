"use client";

import React, { useState } from "react";
import "./tab.css";

export type TabVariant = "classic" | "card" | "button";
export type TabSize = "sm" | "md" | "lg";

export interface TabItem {
  id: string;
  label: React.ReactNode;
  content?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  variant?: TabVariant;
  size?: TabSize;
  activeTab?: string;
  defaultTab?: string;
  onTabChange?: (id: string) => void;
  /** @deprecated use onTabChange */
  onChange?: (id: string) => void;
  fullWidth?: boolean;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function Tabs({
  items,
  variant = "classic",
  size = "md",
  activeTab,
  defaultTab,
  onTabChange,
  onChange,
  fullWidth = false,
  disabled = false,
  orientation = "horizontal",
  className = "",
}: TabsProps) {
  const [internalActive, setInternalActive] = useState<string>(
    defaultTab ?? items[0]?.id ?? "",
  );
  const current = activeTab ?? internalActive;

  const handleSelect = (id: string) => {
    setInternalActive(id);
    onTabChange?.(id);
    onChange?.(id);
  };

  const activeItem = items.find((i) => i.id === current);

  const rootClasses = [
    "gy-tabs",
    `gy-tabs--${variant}`,
    `gy-tabs--${size}`,
    orientation === "vertical" ? "gy-tabs--vertical" : "",
    fullWidth ? "gy-tabs--full-width" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClasses}>
      <div
        className="gy-tabs-list"
        role="tablist"
        aria-orientation={orientation}
      >
        {items.map((item) => {
          const isItemDisabled = disabled || item.disabled;
          return (
            <button
              key={item.id}
              role="tab"
              id={`gy-tab-${item.id}`}
              aria-controls={`gy-panel-${item.id}`}
              aria-selected={current === item.id}
              disabled={isItemDisabled}
              className={`gy-tabs-trigger ${current === item.id ? "gy-tabs-trigger--active" : ""}`}
              onClick={() => !isItemDisabled && handleSelect(item.id)}
            >
              {item.icon && (
                <span className="gy-tabs-trigger__icon" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              {item.label}
              {item.badge !== undefined && (
                <span className="gy-tabs-trigger-badge">{item.badge}</span>
              )}
            </button>
          );
        })}
      </div>

      {activeItem?.content && (
        <div
          key={current}
          id={`gy-panel-${current}`}
          role="tabpanel"
          aria-labelledby={`gy-tab-${current}`}
          className="gy-tabs-panel"
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
}
