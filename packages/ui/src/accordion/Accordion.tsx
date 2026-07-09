'use client';

import React, { useRef, useState } from 'react';
import './accordion.css';

export interface AccordionItemDef {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItemDef[];
  /** 'single' = only one open at a time, 'multiple' = multiple can be open */
  type?: 'single' | 'multiple';
  defaultOpen?: string | string[];
  flush?: boolean;
  className?: string;
}

function AccordionPanel({ open, children }: { open: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const height = open ? (ref.current?.scrollHeight ?? 0) : 0;

  return (
    <div
      className="gy-accordion-panel"
      style={{ height, transition: `height 250ms cubic-bezier(0.4, 0, 0.2, 1)`, overflow: 'hidden' }}
      aria-hidden={!open}
    >
      <div ref={ref} className="gy-accordion-panel-inner">
        {children}
      </div>
    </div>
  );
}

export function Accordion({ items, type = 'single', defaultOpen, flush = false, className = '' }: AccordionProps) {
  const initOpen = defaultOpen
    ? Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen]
    : [];

  const [openIds, setOpenIds] = useState<Set<string>>(new Set(initOpen));

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (type === 'single') next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={`gy-accordion ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div
            key={item.id}
            className={`gy-accordion-item ${flush ? 'gy-accordion-item--flush' : ''}`}
          >
            <button
              type="button"
              className={`gy-accordion-trigger ${isOpen ? 'gy-accordion-trigger--open' : ''}`}
              onClick={() => !item.disabled && toggle(item.id)}
              aria-expanded={isOpen}
              disabled={item.disabled}
            >
              <span className="gy-accordion-title">{item.title}</span>
              <span className={`gy-accordion-icon ${isOpen ? 'gy-accordion-icon--open' : ''}`} aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4,6 8,10 12,6" />
                </svg>
              </span>
            </button>
            <AccordionPanel open={isOpen}>{item.content}</AccordionPanel>
          </div>
        );
      })}
    </div>
  );
}
