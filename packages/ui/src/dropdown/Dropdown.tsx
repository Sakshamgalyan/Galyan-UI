"use client";

import React, { useEffect, useRef, useState, useId } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  size as floatingSize,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  Placement as FloatingPlacement,
} from "@floating-ui/react";
import { Checkbox } from "../checkbox/Checkbox";
import { Spinner } from "../spinner/Spinner";
import { ClearButton } from "../clearbutton/ClearButton";
import { Tooltip } from "../tooltip/Tooltip";
import "./dropdown.css";
import { Typography } from "../typography";

export interface DropdownOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  group?: string;
  icon?: React.ReactNode;
  [key: string]: unknown;
}

export type DropdownValue = string | string[];

/**
 * `V` is inferred from `value` / `onChange`, so `onChange={setX}` works with a
 * `useState<string>` (single) or `useState<string[]>` (multiple) setter.
 */
export interface DropdownProps<V extends DropdownValue = DropdownValue> {
  id?: string;
  options: DropdownOption[];
  value?: V;
  /** Receives a `string` in single mode and a `string[]` when `multiple` is set */
  onChange?: (val: V) => void;
  placeholder?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "filled" | "glassmorphic" | "glass";
  multiple?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  clearable?: boolean;
  disabled?: boolean;
  loading?: boolean;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  error?: string;
  errorMessage?: string;
  hasError?: boolean;
  hasSuccess?: boolean;
  helperText?: string;
  className?: string;
  onSearch?: (query: string) => void;
  filterOption?: (option: DropdownOption, query: string) => boolean;
  renderOption?: (option: DropdownOption) => React.ReactNode;
  renderValue?: (value: V) => React.ReactNode;
  renderDropdown?: (options: DropdownOption[]) => React.ReactNode;
  maxTagCount?: number;
  placement?: "top" | "bottom";
  align?: "left" | "right";
  /**
   * Whether to enable smart positioning that automatically flips between top and bottom.
   * Restricts placement strictly to top and bottom to avoid unwanted horizontal flips.
   * @default true
   */
  smartPosition?: boolean;
  dropdownWidth?: string | number;
  /** Alias for dropdownWidth to set a custom width for the dropdown menu */
  customWidth?: string | number;
  showSelectAll?: boolean;
  groupBy?: string;
  zIndex?: number;
  expandedMenu?: boolean;
  usePortal?: boolean;
  /**
   * Whether to show a tooltip on hover when an option's text is truncated with ellipsis
   * @default true
   */
  showOptionTooltips?: boolean;
}

interface DropdownOptionItemProps {
  opt: DropdownOption;
  selected: boolean;
  multiple?: boolean;
  renderOption?: (opt: DropdownOption) => React.ReactNode;
  onSelect: (opt: DropdownOption) => void;
  showTooltip?: boolean;
}

function DropdownOptionItem({
  opt,
  selected,
  multiple,
  renderOption,
  onSelect,
  showTooltip = true,
}: DropdownOptionItemProps) {
  const labelRef = useRef<HTMLSpanElement>(null);
  const [isEllipsis, setIsEllipsis] = useState(false);

  const checkEllipsis = () => {
    const el = labelRef.current;
    if (el) {
      const truncated = el.scrollWidth > el.clientWidth;
      setIsEllipsis(truncated);
    }
  };

  useEffect(() => {
    checkEllipsis();
    const el = labelRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => {
      checkEllipsis();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [opt.label, opt.description]);

  const renderedContent = renderOption ? renderOption(opt) : opt.label;
  const tooltipContent = opt.description ? (
    <div className="gy-dropdown-option-tooltip">
      <Typography
        variant="span"
        as="div"
        className="gy-dropdown-option-tooltip-label"
      >
        {typeof opt.label === "string" ? opt.label : renderedContent}
      </Typography>
      <Typography
        variant="span"
        as="div"
        className="gy-dropdown-option-tooltip-desc"
      >
        {opt.description}
      </Typography>
    </div>
  ) : typeof opt.label === "string" ? (
    opt.label
  ) : (
    renderedContent
  );

  const renderLabel = () => (
    <Tooltip
      content={tooltipContent}
      disabled={!showTooltip || !isEllipsis}
      placement="top"
      size="xs"
      delay={120}
      className="gy-dropdown-ellipsis-tooltip"
    >
      <span ref={labelRef} className="gy-dropdown-option-label">
        {renderedContent}
      </span>
    </Tooltip>
  );

  return (
    <div
      className={[
        "gy-dropdown-option",
        selected ? "gy-dropdown-option--selected" : "",
        opt.disabled ? "gy-dropdown-option--disabled" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      role="option"
      aria-selected={selected}
      onClick={() => onSelect(opt)}
      onMouseEnter={checkEllipsis}
    >
      {multiple ? (
        <div className="gy-dropdown-option-checkbox-wrap">
          <Checkbox
            size="sm"
            checked={selected}
            isDisabled={opt.disabled}
            onChange={() => {}}
            label={
              <div className="gy-dropdown-option-content">
                {renderLabel()}
                {opt.description && (
                  <Typography
                    variant="span"
                    className="gy-dropdown-option-description"
                  >
                    {opt.description}
                  </Typography>
                )}
              </div>
            }
          />
        </div>
      ) : (
        <>
          <div className="gy-dropdown-option-content">
            <div className="gy-dropdown-option-header">
              {opt.icon && (
                <span className="gy-dropdown-option-icon">{opt.icon}</span>
              )}
              {renderLabel()}
            </div>
            {opt.description && (
              <Typography
                variant="span"
                className="gy-dropdown-option-description"
              >
                {opt.description}
              </Typography>
            )}
          </div>
          {selected && (
            <span className="gy-dropdown-check">
              <svg
                width="12"
                height="10"
                viewBox="0 0 12 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <polyline points="1,5 4,8 11,1" />
              </svg>
            </span>
          )}
        </>
      )}
    </div>
  );
}

export function Dropdown<V extends DropdownValue = DropdownValue>({
  id,
  options,
  value: valueProp,
  onChange,
  placeholder = "Select option",
  label,
  size = "md",
  variant = "default",
  multiple = false,
  searchable = false,
  searchPlaceholder = "Search...",
  clearable = false,
  disabled = false,
  loading = false,
  required = false,
  leftIcon,
  rightIcon,
  onOpen,
  onClose,
  error,
  errorMessage,
  hasError = false,
  hasSuccess = false,
  helperText,
  className = "",
  onSearch,
  filterOption,
  renderOption,
  renderValue,
  renderDropdown,
  maxTagCount,
  placement = "bottom",
  align = "left",
  smartPosition = true,
  dropdownWidth: propDropdownWidth,
  customWidth,
  showSelectAll = false,
  groupBy,
  zIndex = 10050,
  expandedMenu = false,
  usePortal = true,
  showOptionTooltips = true,
}: DropdownProps<V>) {
  // The runtime shape follows `multiple`; callers pick V to match it.
  const value: DropdownValue | undefined = valueProp;
  const emit = (val: DropdownValue) => onChange?.(val as V);
  const effectiveDropdownWidth = customWidth ?? propDropdownWidth;
  const uid = useId();
  const inputId = id ?? uid;
  const [open, setOpen] = useState(expandedMenu);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isMenuOpen = open || expandedMenu;
  const desiredPlacement: FloatingPlacement =
    `${placement}-${align === "right" ? "end" : "start"}` as FloatingPlacement;

  const fallbackPlacements: FloatingPlacement[] =
    placement === "top"
      ? [
          align === "right" ? "bottom-end" : "bottom-start",
          align === "right" ? "top-start" : "top-end",
          align === "right" ? "bottom-start" : "bottom-end",
        ]
      : [
          align === "right" ? "top-end" : "top-start",
          align === "right" ? "bottom-end" : "bottom-start",
          align === "right" ? "top-start" : "top-end",
        ];

  const { refs, floatingStyles, context, isPositioned } = useFloating({
    open: isMenuOpen,
    onOpenChange: (val) => {
      if (!expandedMenu) setOpen(val);
    },
    placement: desiredPlacement,
    whileElementsMounted: autoUpdate,
    strategy: "fixed",
    transform: false,
    middleware: [
      offset(6),
      ...(smartPosition
        ? [
            flip({
              fallbackPlacements,
              fallbackAxisSideDirection: "none",
              crossAxis: false,
              padding: 8,
            }),
          ]
        : []),
      shift({ padding: 8 }),
      floatingSize({
        apply({ rects, elements }) {
          if (effectiveDropdownWidth) {
            const w =
              typeof effectiveDropdownWidth === "number"
                ? `${effectiveDropdownWidth}px`
                : effectiveDropdownWidth;
            Object.assign(elements.floating.style, {
              width: w,
            });
          } else {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`,
              minWidth: `${rects.reference.width}px`,
            });
          }
        },
      }),
    ],
  });

  const dismiss = useDismiss(context, {
    enabled: !expandedMenu,
  });
  const role = useRole(context, { role: "listbox" });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    dismiss,
    role,
  ]);

  useEffect(() => {
    if (open) {
      onOpen?.();
      if (searchable) {
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
    } else {
      onClose?.();
      setSearchQuery("");
    }
  }, [open, onOpen, onClose, searchable]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    onSearch?.(q);
  };

  // Filter options
  const filteredOptions = options.filter((opt) => {
    if (!searchQuery) return true;
    if (filterOption) return filterOption(opt, searchQuery);
    return String(opt.label).toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Group options if groupBy or group in option
  const groupedOptions = filteredOptions.reduce<
    Record<string, DropdownOption[]>
  >((acc, opt) => {
    const groupKey = groupBy
      ? String(opt[groupBy] ?? "__default__")
      : (opt.group ?? "__default__");
    acc[groupKey] = [...(acc[groupKey] ?? []), opt];
    return acc;
  }, {});

  const isSelected = (val: string) => {
    if (Array.isArray(value)) return value.includes(val);
    return value === val;
  };

  const handleOptionSelect = (opt: DropdownOption) => {
    if (opt.disabled || loading) return;

    if (multiple) {
      const current = Array.isArray(value) ? [...value] : [];
      const idx = current.indexOf(opt.value);
      if (idx > -1) current.splice(idx, 1);
      else current.push(opt.value);
      emit(current);
    } else {
      emit(opt.value);
      if (!expandedMenu) setOpen(false);
    }
  };

  const handleSelectAll = () => {
    if (loading) return;
    const selectable = filteredOptions
      .filter((o) => !o.disabled)
      .map((o) => o.value);
    const current = Array.isArray(value) ? value : [];
    const isAll = selectable.every((val) => current.includes(val));

    if (isAll) {
      emit(current.filter((val) => !selectable.includes(val)));
    } else {
      const combined = Array.from(new Set([...current, ...selectable]));
      emit(combined);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (loading || disabled) return;
    emit(multiple ? [] : "");
  };

  const renderTriggerContent = () => {
    if (renderValue && value) return renderValue(value as V);

    if (multiple && Array.isArray(value) && value.length > 0) {
      const selectedOpts = options.filter((o) => value.includes(o.value));
      const hasCap = typeof maxTagCount === "number" && maxTagCount > 0;
      const visibleTags = hasCap
        ? selectedOpts.slice(0, maxTagCount)
        : selectedOpts;
      const remaining = hasCap ? selectedOpts.length - maxTagCount : 0;

      return (
        <div className="gy-dropdown-tags">
          {visibleTags.map((opt) => {
            const tagTitle =
              typeof opt.label === "string" ? opt.label : undefined;
            return (
              <span
                key={opt.value}
                className="gy-dropdown-tag"
                title={tagTitle}
              >
                <span>{opt.label}</span>
                <ClearButton
                  size="xs"
                  ariaLabel={`Remove ${typeof opt.label === "string" ? opt.label : "option"}`}
                  className="gy-dropdown-tag-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOptionSelect(opt);
                  }}
                />
              </span>
            );
          })}
          {remaining > 0 && (
            <span className="gy-dropdown-tag-more">+{remaining}</span>
          )}
        </div>
      );
    }

    if (!multiple && value) {
      const selOpt = options.find((o) => o.value === value);
      if (selOpt) {
        const valTitle =
          typeof selOpt.label === "string" ? selOpt.label : undefined;
        return (
          <span className="gy-dropdown-value" title={valTitle}>
            {selOpt.icon && (
              <span className="gy-dropdown-value-icon">{selOpt.icon}</span>
            )}
            <Typography variant="span" className="gy-dropdown-value-text">
              {selOpt.label}
            </Typography>
          </span>
        );
      }
    }

    return (
      <Typography variant="span" className="gy-dropdown-placeholder">
        {placeholder}
      </Typography>
    );
  };

  const isErrorState = hasError || Boolean(error || errorMessage);
  const displayErrorMsg = error || errorMessage;

  const triggerClasses = [
    "gy-dropdown-trigger",
    `gy-dropdown-trigger--${size}`,
    variant !== "default" ? `gy-dropdown-trigger--${variant}` : "",
    open ? "gy-dropdown-trigger--open" : "",
    disabled ? "gy-dropdown-trigger--disabled" : "",
    loading ? "gy-dropdown-trigger--loading" : "",
    isErrorState ? "gy-dropdown-trigger--error" : "",
    hasSuccess ? "gy-dropdown-trigger--success" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const isGlassVariant = variant === "glassmorphic" || variant === "glass";
  const menuNode = (
    <div
      ref={refs.setFloating}
      className={`gy-dropdown-menu gy-dropdown-menu--${size} ${isPositioned ? "gy-dropdown-menu--positioned" : ""} ${isGlassVariant ? `gy-dropdown-menu--${variant}` : ""}`.trim()}
      style={{
        ...floatingStyles,
        zIndex,
        visibility: isPositioned ? "visible" : "hidden",
        opacity: isPositioned ? undefined : 0,
        pointerEvents: isPositioned ? undefined : "none",
        ...(effectiveDropdownWidth
          ? {
              width:
                typeof effectiveDropdownWidth === "number"
                  ? `${effectiveDropdownWidth}px`
                  : effectiveDropdownWidth,
            }
          : {}),
      }}
      role="listbox"
      {...getFloatingProps()}
    >
      {searchable && !loading && (
        <div className="gy-dropdown-search">
          <input
            ref={searchInputRef}
            type="text"
            className="gy-dropdown-search-input"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={searchPlaceholder}
          />
        </div>
      )}

      {multiple &&
        showSelectAll &&
        options.length > 0 &&
        !loading &&
        (() => {
          const selectableOpts = filteredOptions.filter((o) => !o.disabled);
          const currentVals = Array.isArray(value) ? value : [];
          const selectedCount = selectableOpts.filter((o) =>
            currentVals.includes(o.value),
          ).length;
          const isAllSel =
            selectableOpts.length > 0 &&
            selectedCount === selectableOpts.length;
          const isIndet =
            selectedCount > 0 && selectedCount < selectableOpts.length;

          return (
            <div className="gy-dropdown-select-all" onClick={handleSelectAll}>
              <Checkbox
                size="sm"
                checked={isAllSel}
                indeterminate={isIndet}
                onChange={() => {}}
                label={
                  <Typography
                    variant="span"
                    className="gy-dropdown-select-all-label"
                  >
                    Select All ({selectedCount}/{selectableOpts.length})
                  </Typography>
                }
              />
            </div>
          );
        })()}

      {renderDropdown ? (
        renderDropdown(filteredOptions)
      ) : (
        <div className="gy-dropdown-options">
          {loading ? (
            <div className="gy-dropdown-loading">
              <Spinner size="sm" />
              <Typography variant="span">Loading options...</Typography>
            </div>
          ) : filteredOptions.length === 0 ? (
            <Typography variant="span" as="div" className="gy-dropdown-empty">
              No options available
            </Typography>
          ) : (
            Object.entries(groupedOptions).map(([group, opts]) => (
              <div key={group} className="gy-dropdown-group">
                {group !== "__default__" && (
                  <div className="gy-dropdown-group-header">
                    <span>{group}</span>
                    <Typography
                      variant="span"
                      className="gy-dropdown-group-count"
                    >
                      {opts.length}
                    </Typography>
                  </div>
                )}
                {opts.map((opt) => (
                  <DropdownOptionItem
                    key={opt.value}
                    opt={opt}
                    selected={isSelected(opt.value)}
                    multiple={multiple}
                    renderOption={renderOption}
                    onSelect={handleOptionSelect}
                    showTooltip={showOptionTooltips}
                  />
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className={`gy-dropdown-root gy-dropdown-root--${size} ${className}`}>
      {label && (
        <Typography
          variant="span"
          as="label"
          className={`gy-input-label ${required ? "gy-input-label--required" : ""}`}
          htmlFor={inputId}
        >
          {label}
        </Typography>
      )}

      <button
        ref={refs.setReference}
        id={inputId}
        type="button"
        className={triggerClasses}
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-busy={loading}
        {...getReferenceProps({
          onClick: () =>
            !disabled && !loading && !expandedMenu && setOpen((o) => !o),
        })}
      >
        {leftIcon && (
          <span className="gy-dropdown-icon gy-dropdown-icon--left">
            {leftIcon}
          </span>
        )}
        <div className="gy-dropdown-trigger-body">{renderTriggerContent()}</div>
        <div className="gy-dropdown-right-addons">
          {loading && (
            <span className="gy-dropdown-spinner">
              <Spinner size="xs" />
            </span>
          )}
          {clearable &&
            value &&
            !loading &&
            (Array.isArray(value) ? value.length > 0 : true) && (
              <ClearButton
                size={size === "lg" ? "md" : "sm"}
                variant="subtle"
                ariaLabel="Clear selection"
                className="gy-dropdown-clear"
                onClick={handleClear}
              />
            )}
          {rightIcon ? (
            <span className="gy-dropdown-icon gy-dropdown-icon--right">
              {rightIcon}
            </span>
          ) : (
            <span
              className={`gy-dropdown-chevron ${open ? "gy-dropdown-chevron--open" : ""}`}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="2,4 6,8 10,4" />
              </svg>
            </span>
          )}
        </div>
      </button>

      {isMenuOpen &&
        (usePortal ? <FloatingPortal>{menuNode}</FloatingPortal> : menuNode)}

      {(displayErrorMsg || helperText) && (
        <Typography
          variant="span"
          as="div"
          className={`gy-input-helper ${isErrorState ? "gy-input-helper--error" : ""}`}
        >
          {displayErrorMsg || helperText}
        </Typography>
      )}
    </div>
  );
}

Dropdown.displayName = "Dropdown";
