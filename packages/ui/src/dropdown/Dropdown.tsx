'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import './dropdown.css';

export interface DropdownOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  group?: string;
  icon?: React.ReactNode;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  label?: string;
  error?: string;
  className?: string;
  id?: string;
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  searchable = false,
  disabled = false,
  label,
  error,
  className = '',
  id,
}: DropdownProps) {
  const uid = useId();
  const inputId = id ?? uid;
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = options.find((o) => o.value === value);

  const filtered = searchable && search
    ? options.filter((o) => String(o.label).toLowerCase().includes(search.toLowerCase()))
    : options;

  // Group options
  const groups = filtered.reduce<Record<string, DropdownOption[]>>((acc, opt) => {
    const g = opt.group ?? '__default__';
    acc[g] = [...(acc[g] ?? []), opt];
    return acc;
  }, {});

  useEffect(() => {
    if (!open) { setSearch(''); setFocused(0); return; }
    if (searchable) setTimeout(() => searchRef.current?.focus(), 50);
  }, [open, searchable]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (opt: DropdownOption) => {
    if (opt.disabled) return;
    onChange?.(opt.value);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const flat = filtered.filter((o) => !o.disabled);
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocused((f) => Math.min(f + 1, flat.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setFocused((f) => Math.max(f - 1, 0)); }
    if (e.key === 'Enter' && open) { e.preventDefault(); const opt = flat[focused]; if (opt) handleSelect(opt); }
    if (e.key === 'Escape') setOpen(false);
    if (!open && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); setOpen(true); }
  };

  return (
    <div ref={rootRef} className={`gy-dropdown-root ${className}`} onKeyDown={handleKeyDown}>
      {label && <label className="gy-input-label" htmlFor={inputId}>{label}</label>}

      <button
        id={inputId}
        type="button"
        className={[
          'gy-dropdown-trigger',
          open ? 'gy-dropdown-trigger--open' : '',
          disabled ? 'gy-dropdown-trigger--disabled' : '',
          !selected ? 'gy-dropdown-trigger--placeholder' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span>{selected ? selected.label : placeholder}</span>
        <span className={`gy-dropdown-chevron ${open ? 'gy-dropdown-chevron--open' : ''}`} aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3,5 7,9 11,5" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="gy-dropdown-menu" role="listbox">
          {searchable && (
            <div className="gy-dropdown-search">
              <input
                ref={searchRef}
                className="gy-dropdown-search-input"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setFocused(0); }}
                placeholder="Search..."
                aria-label="Search options"
              />
            </div>
          )}
          <div className="gy-dropdown-options">
            {filtered.length === 0 ? (
              <div className="gy-dropdown-empty">No options found</div>
            ) : (
              Object.entries(groups).map(([group, opts]) => (
                <div key={group}>
                  {group !== '__default__' && (
                    <div className="gy-dropdown-group-label">{group}</div>
                  )}
                  {opts.map((opt, i) => (
                    <div
                      key={opt.value}
                      className={[
                        'gy-dropdown-option',
                        opt.value === value ? 'gy-dropdown-option--selected' : '',
                        focused === i ? 'gy-dropdown-option--focused' : '',
                        opt.disabled ? 'gy-dropdown-option--disabled' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      role="option"
                      aria-selected={opt.value === value}
                      onClick={() => handleSelect(opt)}
                    >
                      {opt.icon && <span aria-hidden="true">{opt.icon}</span>}
                      {opt.label}
                      {opt.value === value && (
                        <span className="gy-dropdown-check" aria-hidden="true">
                          <svg width="14" height="11" viewBox="0 0 14 11" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="1,5 5,9 13,1" />
                          </svg>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {error && <span className="gy-input-helper gy-input-helper--error" role="alert">{error}</span>}
    </div>
  );
}
