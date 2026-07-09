'use client';

import React, { useEffect, useRef, useState } from 'react';
import './menu.css';

// ── Tooltip ───────────────────────────────────────────────────────────────────
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: TooltipPosition;
  delay?: number;
  disabled?: boolean;
}

export function Tooltip({ content, children, position = 'top', delay = 300, disabled = false }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const show = () => { timerRef.current = setTimeout(() => setVisible(true), delay); };
  const hide = () => { clearTimeout(timerRef.current); setVisible(false); };

  return (
    <span className="gy-tooltip-wrapper" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {children}
      {visible && !disabled && content && (
        <span className={`gy-tooltip gy-tooltip--${position}`} role="tooltip">
          {content}
        </span>
      )}
    </span>
  );
}

// ── Menu ──────────────────────────────────────────────────────────────────────
export interface MenuItemDef {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
  badge?: string;
  separator?: never;
  groupLabel?: never;
}

export interface MenuSeparator { separator: true; id: string; }
export interface MenuGroupLabel { groupLabel: string; id: string; }

export type MenuEntry = MenuItemDef | MenuSeparator | MenuGroupLabel;

export interface MenuProps {
  items: MenuEntry[];
  trigger: React.ReactElement;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  className?: string;
}

const posStyle: Record<string, React.CSSProperties> = {
  'bottom-left': { top: 'calc(100% + 4px)', left: 0 },
  'bottom-right': { top: 'calc(100% + 4px)', right: 0 },
  'top-left': { bottom: 'calc(100% + 4px)', left: 0 },
  'top-right': { bottom: 'calc(100% + 4px)', right: 0 },
};

export function Menu({ items, trigger, position = 'bottom-left', className = '' }: MenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={rootRef} className="gy-menu-trigger" style={{ position: 'relative' }}>
      {React.cloneElement(trigger as React.ReactElement<any>, { onClick: () => setOpen((o) => !o) })}
      {open && (
        <div className={`gy-menu gy-menu--absolute ${className}`} style={posStyle[position]} role="menu">
          {items.map((entry) => {
            if ('separator' in entry && entry.separator) {
              return <div key={entry.id} className="gy-menu-separator" role="separator" />;
            }
            if ('groupLabel' in entry && entry.groupLabel) {
              return <div key={entry.id} className="gy-menu-group-label">{entry.groupLabel}</div>;
            }
            const item = entry as MenuItemDef;
            return (
              <button
                key={item.id}
                type="button"
                className={[
                  'gy-menu-item',
                  item.danger ? 'gy-menu-item--danger' : '',
                  item.disabled ? 'gy-menu-item--disabled' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                role="menuitem"
                disabled={item.disabled}
                onClick={() => { item.onClick?.(); setOpen(false); }}
              >
                {item.icon && <span className="gy-menu-item__icon" aria-hidden="true">{item.icon}</span>}
                {item.label}
                {item.badge && <span className="gy-menu-item__badge">{item.badge}</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
