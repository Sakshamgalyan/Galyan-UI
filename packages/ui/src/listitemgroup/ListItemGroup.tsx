"use client";

import React, { createContext, useContext } from "react";
import "./list-item-group.css";

export type ListItemSelectedVariant = "accent-bar" | "subtle" | "pill" | "outline";
export type ListItemGroupSize = "sm" | "md" | "lg";

export interface ListItemData {
  id: string | number;
  label: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  suffix?: React.ReactNode;
  hasDot?: boolean;
  dotColor?: string;
  badge?: React.ReactNode;
  disabled?: boolean;
  color?: string;
  onClick?: () => void;
  [key: string]: any;
}

interface ListItemGroupContextValue {
  selectedValue?: string | number | (string | number)[];
  onSelect?: (value: string | number, item?: ListItemData) => void;
  selectedVariant: ListItemSelectedVariant;
  size: ListItemGroupSize;
  accentColor?: string;
  multiple?: boolean;
}

const ListItemGroupContext = createContext<ListItemGroupContextValue | null>(null);

export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string | number;
  label?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  suffix?: React.ReactNode;
  hasDot?: boolean;
  dotColor?: string;
  badge?: React.ReactNode;
  disabled?: boolean;
  selected?: boolean;
  selectedVariant?: ListItemSelectedVariant;
  accentColor?: string;
  size?: ListItemGroupSize;
  children?: React.ReactNode;
}

export const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  (
    {
      value,
      label,
      description,
      icon,
      suffix,
      hasDot = false,
      dotColor,
      badge,
      disabled = false,
      selected,
      selectedVariant,
      accentColor,
      size,
      className = "",
      style,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const context = useContext(ListItemGroupContext);

    const isSelected = (() => {
      if (selected !== undefined) return selected;
      if (!context || value === undefined) return false;
      if (Array.isArray(context.selectedValue)) {
        return context.selectedValue.includes(value);
      }
      return context.selectedValue === value;
    })();

    const effectiveVariant = selectedVariant ?? context?.selectedVariant ?? "accent-bar";
    const effectiveSize = size ?? context?.size ?? "md";
    const effectiveAccent = accentColor ?? context?.accentColor;

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      onClick?.(e);
      if (value !== undefined) {
        context?.onSelect?.(value);
      }
    };

    const itemClasses = [
      "gy-list-item",
      `gy-list-item--size-${effectiveSize}`,
      `gy-list-item--variant-${effectiveVariant}`,
      isSelected ? "gy-list-item--selected" : "",
      disabled ? "gy-list-item--disabled" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const customStyles: React.CSSProperties = {
      ...style,
      ...(effectiveAccent
        ? ({
            "--gy-list-item-accent": effectiveAccent,
          } as React.CSSProperties)
        : {}),
    };

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-selected={isSelected}
        aria-disabled={disabled}
        className={itemClasses}
        style={customStyles}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick(e as any);
          }
        }}
        {...props}
      >
        {/* Left Accent Bar Indicator for "accent-bar" variant */}
        {effectiveVariant === "accent-bar" && (
          <span className="gy-list-item-accent-bar" aria-hidden="true" />
        )}

        {/* Optional Prefix Icon */}
        {icon && <span className="gy-list-item-icon">{icon}</span>}

        {/* Content Container */}
        <div className="gy-list-item-content">
          <div className="gy-list-item-label">{children ?? label}</div>
          {description && (
            <div className="gy-list-item-description">{description}</div>
          )}
        </div>

        {/* Right Side Slot (Dot Indicator / Badge / Suffix) */}
        <div className="gy-list-item-suffix-slot">
          {hasDot && (
            <span
              className="gy-list-item-dot"
              style={{ backgroundColor: dotColor }}
              aria-hidden="true"
            />
          )}
          {badge && <span className="gy-list-item-badge">{badge}</span>}
          {suffix && <span className="gy-list-item-suffix">{suffix}</span>}
        </div>
      </div>
    );
  }
);

ListItem.displayName = "ListItem";

export interface ListItemGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  items?: ListItemData[];
  value?: string | number | (string | number)[];
  defaultValue?: string | number | (string | number)[];
  onChange?: (value: any, item?: ListItemData) => void;
  multiple?: boolean;
  selectedVariant?: ListItemSelectedVariant;
  size?: ListItemGroupSize;
  accentColor?: string;
  bordered?: boolean;
  width?: string | number;
  className?: string;
  children?: React.ReactNode;
}

export function ListItemGroup({
  items,
  value,
  defaultValue,
  onChange,
  multiple = false,
  selectedVariant = "accent-bar",
  size = "md",
  accentColor,
  bordered = true,
  width,
  className = "",
  style,
  children,
  ...props
}: ListItemGroupProps) {
  const [internalValue, setInternalValue] = React.useState<
    string | number | (string | number)[] | undefined
  >(defaultValue);

  const activeValue = value !== undefined ? value : internalValue;

  const handleSelect = (itemValue: string | number, item?: ListItemData) => {
    let nextValue: string | number | (string | number)[];

    if (multiple) {
      const currentList = Array.isArray(activeValue) ? [...activeValue] : [];
      const index = currentList.indexOf(itemValue);
      if (index >= 0) {
        currentList.splice(index, 1);
      } else {
        currentList.push(itemValue);
      }
      nextValue = currentList;
    } else {
      nextValue = itemValue;
    }

    if (value === undefined) {
      setInternalValue(nextValue);
    }
    onChange?.(nextValue, item);
  };

  const containerClasses = [
    "gy-list-item-group",
    bordered ? "gy-list-item-group--bordered" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const containerStyle: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    ...style,
  };

  const contextValue: ListItemGroupContextValue = {
    selectedValue: activeValue,
    onSelect: handleSelect,
    selectedVariant,
    size,
    accentColor,
    multiple,
  };

  return (
    <ListItemGroupContext.Provider value={contextValue}>
      <div
        role="group"
        className={containerClasses}
        style={containerStyle}
        {...props}
      >
        {items
          ? items.map((item) => (
              <ListItem
                key={item.id}
                value={item.id}
                label={item.label}
                description={item.description}
                icon={item.icon}
                suffix={item.suffix}
                hasDot={item.hasDot}
                dotColor={item.dotColor}
                badge={item.badge}
                disabled={item.disabled}
                accentColor={item.color}
                onClick={item.onClick}
              />
            ))
          : children}
      </div>
    </ListItemGroupContext.Provider>
  );
}

ListItemGroup.displayName = "ListItemGroup";
