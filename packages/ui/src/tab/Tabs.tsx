'use client';

import React, { useState } from 'react';
import './tab.css';

export interface TabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  activeTab?: string;
  onChange?: (id: string) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Tabs({ items, defaultTab, activeTab, onChange, orientation = 'horizontal', className = '' }: TabsProps) {
  const [internalActive, setInternalActive] = useState<string>(defaultTab ?? items[0]?.id ?? '');
  const current = activeTab ?? internalActive;

  const handleSelect = (id: string) => {
    setInternalActive(id);
    onChange?.(id);
  };

  const activeItem = items.find((i) => i.id === current);

  return (
    <div className={`gy-tabs ${orientation === 'vertical' ? 'gy-tabs--vertical' : ''} ${className}`}>
      <div className="gy-tabs-list" role="tablist" aria-orientation={orientation}>
        {items.map((item) => (
          <button
            key={item.id}
            role="tab"
            id={`gy-tab-${item.id}`}
            aria-controls={`gy-panel-${item.id}`}
            aria-selected={current === item.id}
            disabled={item.disabled}
            className={`gy-tabs-trigger ${current === item.id ? 'gy-tabs-trigger--active' : ''}`}
            onClick={() => !item.disabled && handleSelect(item.id)}
          >
            {item.icon && <span aria-hidden="true">{item.icon}</span>}
            {item.label}
            {item.badge !== undefined && (
              <span className="gy-tabs-trigger-badge">{item.badge}</span>
            )}
          </button>
        ))}
      </div>

      {activeItem && (
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
