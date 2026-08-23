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
import "./dropdown.css";

export interface DropdownOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  group?: string;
  icon?: React.ReactNode;
  [key: string]: any;
}

export interface DropdownProps {
  id?: string;
  options: DropdownOption[];
  value?: string | string[];
  onChange?: (val: any) => void;
  placeholder?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
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
  renderValue?: (value: string | string[]) => React.ReactNode;
  renderDropdown?: (options: DropdownOption[]) => React.ReactNode;
  maxTagCount?: number;
  placement?: "top" | "bottom";
  align?: "left" | "right";
  dropdownWidth?: string | number;
  showSelectAll?: boolean;
  groupBy?: string;
  zIndex?: number;
  expandedMenu?: boolean;
  usePortal?: boolean;
}

export function Dropdown({
  id,
  options,
  value,
  onChange,
  placeholder = "Select option",
  label,
  size = "md",
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
  maxTagCount = 3,
  placement = "bottom",
  align = "left",
  dropdownWidth,
  showSelectAll = false,
  groupBy,
  zIndex = 1000,
  expandedMenu = false,
  usePortal = true,
}: DropdownProps) {
  const uid = useId();
  const inputId = id ?? uid;
  const [open, setOpen] = useState(expandedMenu);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isMenuOpen = open || expandedMenu;
  const desiredPlacement: FloatingPlacement = `${placement}-${align === "right" ? "end" : "start"}` as FloatingPlacement;

  const { refs, floatingStyles, context } = useFloating({
    open: isMenuOpen,
    onOpenChange: (val) => {
      if (!expandedMenu) setOpen(val);
    },
    placement: desiredPlacement,
    whileElementsMounted: autoUpdate,
    strategy: "fixed",
    middleware: [
      offset(4),
      flip({
        fallbackAxisSideDirection: "start",
        padding: 8,
      }),
      shift({ padding: 8 }),
      floatingSize({
        apply({ rects, elements }) {
          if (!dropdownWidth) {
            Object.assign(elements.floating.style, {
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
      ? (opt[groupBy] ?? "__default__")
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
      onChange?.(current);
    } else {
      onChange?.(opt.value);
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
      onChange?.(current.filter((val) => !selectable.includes(val)));
    } else {
      const combined = Array.from(new Set([...current, ...selectable]));
      onChange?.(combined);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (loading || disabled) return;
    onChange?.(multiple ? [] : "");
  };

  const renderTriggerContent = () => {
    if (renderValue && value) return renderValue(value);

    if (multiple && Array.isArray(value) && value.length > 0) {
      const selectedOpts = options.filter((o) => value.includes(o.value));
      const visibleTags = selectedOpts.slice(0, maxTagCount);
      const remaining = selectedOpts.length - maxTagCount;

      return (
        <div className="gy-dropdown-tags">
          {visibleTags.map((opt) => {
            const tagTitle = typeof opt.label === "string" ? opt.label : undefined;
            return (
              <span key={opt.value} className="gy-dropdown-tag" title={tagTitle}>
                <span>{opt.label}</span>
                <span
                  className="gy-dropdown-tag-remove"
                  role="button"
                  tabIndex={0}
                  aria-label={`Remove ${opt.label}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOptionSelect(opt);
                  }}
                >
                  ×
                </span>
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
        const valTitle = typeof selOpt.label === "string" ? selOpt.label : undefined;
        return (
          <span className="gy-dropdown-value" title={valTitle}>
            {selOpt.icon && (
              <span className="gy-dropdown-value-icon">{selOpt.icon}</span>
            )}
            <span className="gy-dropdown-value-text">{selOpt.label}</span>
          </span>
        );
      }
    }

    return <span className="gy-dropdown-placeholder">{placeholder}</span>;
  };

  const isErrorState = hasError || Boolean(error || errorMessage);
  const displayErrorMsg = error || errorMessage;

  const triggerClasses = [
    "gy-dropdown-trigger",
    `gy-dropdown-trigger--${size}`,
    open ? "gy-dropdown-trigger--open" : "",
    disabled ? "gy-dropdown-trigger--disabled" : "",
    loading ? "gy-dropdown-trigger--loading" : "",
    isErrorState ? "gy-dropdown-trigger--error" : "",
    hasSuccess ? "gy-dropdown-trigger--success" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const menuNode = (
    <div
      ref={refs.setFloating}
      className={`gy-dropdown-menu gy-dropdown-menu--${size}`}
      style={{
        ...floatingStyles,
        zIndex,
        ...(dropdownWidth ? { width: dropdownWidth } : {}),
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

      {multiple && showSelectAll && options.length > 0 && !loading && (() => {
        const selectableOpts = filteredOptions.filter((o) => !o.disabled);
        const currentVals = Array.isArray(value) ? value : [];
        const selectedCount = selectableOpts.filter((o) => currentVals.includes(o.value)).length;
        const isAllSel = selectableOpts.length > 0 && selectedCount === selectableOpts.length;
        const isIndet = selectedCount > 0 && selectedCount < selectableOpts.length;

        return (
          <div className="gy-dropdown-select-all" onClick={handleSelectAll}>
            <Checkbox
              size="sm"
              checked={isAllSel}
              indeterminate={isIndet}
              onChange={() => {}}
              label="Select All"
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
              <span>Loading options...</span>
            </div>
          ) : filteredOptions.length === 0 ? (
            <div className="gy-dropdown-empty">No options available</div>
          ) : (
            Object.entries(groupedOptions).map(([group, opts]) => (
              <div key={group}>
                {group !== "__default__" && (
                  <div className="gy-dropdown-group-header">{group}</div>
                )}
                {opts.map((opt) => {
                  const selected = isSelected(opt.value);
                  const optTitle = typeof opt.label === "string" ? opt.label : undefined;

                  return (
                    <div
                      key={opt.value}
                      className={[
                        "gy-dropdown-option",
                        selected ? "gy-dropdown-option--selected" : "",
                        opt.disabled ? "gy-dropdown-option--disabled" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      role="option"
                      aria-selected={selected}
                      title={optTitle}
                      onClick={() => handleOptionSelect(opt)}
                    >
                      {multiple ? (
                        <Checkbox
                          size="sm"
                          checked={selected}
                          isDisabled={opt.disabled}
                          onChange={() => {}}
                          label={
                            <span title={optTitle}>
                              {renderOption ? renderOption(opt) : opt.label}
                            </span>
                          }
                        />
                      ) : (
                        <>
                          {opt.icon && (
                            <span className="gy-dropdown-option-icon">
                              {opt.icon}
                            </span>
                          )}
                          <span className="gy-dropdown-option-label" title={optTitle}>
                            {renderOption ? renderOption(opt) : opt.label}
                          </span>
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
                })}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`gy-dropdown-root gy-dropdown-root--${size} ${className}`}
    >
      {label && (
        <label
          className={`gy-input-label ${required ? "gy-input-label--required" : ""}`}
          htmlFor={inputId}
        >
          {label}
        </label>
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
          onClick: () => !disabled && !loading && !expandedMenu && setOpen((o) => !o),
        })}
      >
        {leftIcon && (
          <span className="gy-dropdown-icon gy-dropdown-icon--left">
            {leftIcon}
          </span>
        )}
        <div className="gy-dropdown-trigger-body">{renderTriggerContent()}</div>
        {loading && (
          <span className="gy-dropdown-spinner">
            <Spinner size="xs" />
          </span>
        )}
        {clearable &&
          value &&
          !loading &&
          (Array.isArray(value) ? value.length > 0 : true) && (
            <span className="gy-dropdown-clear" onClick={handleClear}>
              ×
            </span>
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
      </button>

      {isMenuOpen && (
        <FloatingPortal>
          {menuNode}
        </FloatingPortal>
      )}

      {(displayErrorMsg || helperText) && (
        <div
          className={`gy-input-helper ${isErrorState ? "gy-input-helper--error" : ""}`}
        >
          {displayErrorMsg || helperText}
        </div>
      )}
    </div>
  );
}
