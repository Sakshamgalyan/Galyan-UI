'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Spinner } from '../spinner/Spinner';
import { Checkbox } from '../checkbox/Checkbox';
import './dropdown.css';

export interface DropdownOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  group?: string;
  icon?: React.ReactNode;
  [key: string]: any;
}

export type DropdownSize = 'sm' | 'md' | 'lg';

export interface DropdownProps {
  options: DropdownOption[];
  placeholder?: string;
  onChange?: (value: any) => void;
  onOpen?: () => void;
  onClose?: () => void;
  size?: DropdownSize;
  id?: string;
  value?: string | string[];
  label?: React.ReactNode;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  clearable?: boolean;
  loading?: boolean;
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
  placement?: 'top' | 'bottom';
  align?: 'left' | 'right';
  dropdownWidth?: string;
  showSelectAll?: boolean;
  groupBy?: string;
  zIndex?: number;
  expandedMenu?: boolean;
  usePortal?: boolean;
}

export function Dropdown({
  options = [],
  placeholder = 'Select an option',
  onChange,
  onOpen,
  onClose,
  size = 'md',
  id,
  value,
  label,
  required = false,
  leftIcon,
  rightIcon,
  disabled = false,
  multiple = false,
  searchable = false,
  searchPlaceholder = 'Search...',
  clearable = false,
  loading = false,
  error,
  errorMessage,
  hasError = false,
  hasSuccess = false,
  helperText,
  className = '',
  onSearch,
  filterOption,
  renderOption,
  renderValue,
  renderDropdown,
  maxTagCount = 3,
  placement = 'bottom',
  align = 'left',
  dropdownWidth,
  showSelectAll = false,
  groupBy,
  zIndex = 1000,
  expandedMenu = false,
  usePortal = false,
}: DropdownProps) {
  const uid = useId();
  const inputId = id ?? uid;
  const [open, setOpen] = useState(expandedMenu);
  const [searchQuery, setSearchQuery] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      onOpen?.();
      if (searchable) {
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
    } else {
      onClose?.();
      setSearchQuery('');
    }
  }, [open, onOpen, onClose, searchable]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!expandedMenu && !rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [expandedMenu]);

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
  const groupedOptions = filteredOptions.reduce<Record<string, DropdownOption[]>>((acc, opt) => {
    const groupKey = groupBy ? (opt[groupBy] ?? '__default__') : (opt.group ?? '__default__');
    acc[groupKey] = [...(acc[groupKey] ?? []), opt];
    return acc;
  }, {});

  const isSelected = (val: string) => {
    if (Array.isArray(value)) return value.includes(val);
    return value === val;
  };

  const handleOptionSelect = (opt: DropdownOption) => {
    if (opt.disabled) return;
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : value ? [value] : [];
      const nextValues = currentValues.includes(opt.value)
        ? currentValues.filter((v) => v !== opt.value)
        : [...currentValues, opt.value];
      onChange?.(nextValues);
    } else {
      onChange?.(opt.value);
      if (!expandedMenu) setOpen(false);
    }
  };

  const handleSelectAll = () => {
    const allSelectable = filteredOptions.filter((o) => !o.disabled).map((o) => o.value);
    const currentValues = Array.isArray(value) ? value : [];
    if (currentValues.length === allSelectable.length) {
      onChange?.([]);
    } else {
      onChange?.(allSelectable);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(multiple ? [] : '');
  };

  const renderTriggerContent = () => {
    if (renderValue) return renderValue(value ?? (multiple ? [] : ''));

    if (multiple && Array.isArray(value) && value.length > 0) {
      const selectedOpts = options.filter((o) => value.includes(o.value));
      const visibleTags = selectedOpts.slice(0, maxTagCount);
      const remaining = selectedOpts.length - maxTagCount;

      return (
        <div className="gy-dropdown-tags">
          {visibleTags.map((opt) => (
            <span key={opt.value} className="gy-dropdown-tag">
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
          ))}
          {remaining > 0 && <span className="gy-dropdown-tag-more">+{remaining}</span>}
        </div>
      );
    }

    if (!multiple && value) {
      const selOpt = options.find((o) => o.value === value);
      if (selOpt) {
        return (
          <span className="gy-dropdown-value">
            {selOpt.icon && <span className="gy-dropdown-value-icon">{selOpt.icon}</span>}
            {selOpt.label}
          </span>
        );
      }
    }

    return <span className="gy-dropdown-placeholder">{placeholder}</span>;
  };

  const isErrorState = hasError || Boolean(error || errorMessage);
  const displayErrorMsg = error || errorMessage;

  const triggerClasses = [
    'gy-dropdown-trigger',
    `gy-dropdown-trigger--${size}`,
    open ? 'gy-dropdown-trigger--open' : '',
    disabled ? 'gy-dropdown-trigger--disabled' : '',
    isErrorState ? 'gy-dropdown-trigger--error' : '',
    hasSuccess ? 'gy-dropdown-trigger--success' : '',
  ].filter(Boolean).join(' ');

  const menuNode = (
    <div
      className={`gy-dropdown-menu gy-dropdown-menu--${placement} gy-dropdown-menu--${align}`}
      style={{ zIndex, ...(dropdownWidth ? { width: dropdownWidth } : {}) }}
      role="listbox"
    >
      {searchable && (
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

      {multiple && showSelectAll && options.length > 0 && (
        <div className="gy-dropdown-select-all" onClick={handleSelectAll}>
          <Checkbox
            size="sm"
            checked={Array.isArray(value) && value.length === filteredOptions.length && filteredOptions.length > 0}
            onChange={() => {}}
            label="Select All"
          />
        </div>
      )}

      {renderDropdown ? (
        renderDropdown(filteredOptions)
      ) : (
        <div className="gy-dropdown-options">
          {loading ? (
            <div className="gy-dropdown-loading">
              <Spinner size="sm" />
              <span>Loading...</span>
            </div>
          ) : filteredOptions.length === 0 ? (
            <div className="gy-dropdown-empty">No options available</div>
          ) : (
            Object.entries(groupedOptions).map(([group, opts]) => (
              <div key={group}>
                {group !== '__default__' && (
                  <div className="gy-dropdown-group-header">{group}</div>
                )}
                {opts.map((opt) => {
                  const selected = isSelected(opt.value);
                  return (
                    <div
                      key={opt.value}
                      className={[
                        'gy-dropdown-option',
                        selected ? 'gy-dropdown-option--selected' : '',
                        opt.disabled ? 'gy-dropdown-option--disabled' : '',
                      ].filter(Boolean).join(' ')}
                      role="option"
                      aria-selected={selected}
                      onClick={() => handleOptionSelect(opt)}
                    >
                      {multiple ? (
                        <Checkbox
                          size="sm"
                          checked={selected}
                          isDisabled={opt.disabled}
                          onChange={() => {}}
                          label={renderOption ? renderOption(opt) : opt.label}
                        />
                      ) : (
                        <>
                          {opt.icon && <span className="gy-dropdown-option-icon">{opt.icon}</span>}
                          <span className="gy-dropdown-option-label">
                            {renderOption ? renderOption(opt) : opt.label}
                          </span>
                          {selected && (
                            <span className="gy-dropdown-check">
                              <svg width="12" height="10" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
    <div ref={rootRef} className={`gy-dropdown-root gy-dropdown-root--${size} ${className}`}>
      {label && (
        <label className={`gy-input-label ${required ? 'gy-input-label--required' : ''}`} htmlFor={inputId}>
          {label}
        </label>
      )}

      <button
        id={inputId}
        type="button"
        className={triggerClasses}
        onClick={() => !disabled && !expandedMenu && setOpen((o) => !o)}
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {leftIcon && <span className="gy-dropdown-icon gy-dropdown-icon--left">{leftIcon}</span>}
        <div className="gy-dropdown-trigger-body">{renderTriggerContent()}</div>
        {loading && <Spinner size="xs" />}
        {clearable && (value && (Array.isArray(value) ? value.length > 0 : true)) && (
          <span className="gy-dropdown-clear" onClick={handleClear}>
            ×
          </span>
        )}
        {rightIcon ? (
          <span className="gy-dropdown-icon gy-dropdown-icon--right">{rightIcon}</span>
        ) : (
          <span className={`gy-dropdown-chevron ${open ? 'gy-dropdown-chevron--open' : ''}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="2,4 6,8 10,4" />
            </svg>
          </span>
        )}
      </button>

      {(open || expandedMenu) && (usePortal ? createPortal(menuNode, document.body) : menuNode)}

      {(displayErrorMsg || helperText) && (
        <div className={`gy-input-helper ${isErrorState ? 'gy-input-helper--error' : ''}`}>
          {displayErrorMsg || helperText}
        </div>
      )}
    </div>
  );
}
