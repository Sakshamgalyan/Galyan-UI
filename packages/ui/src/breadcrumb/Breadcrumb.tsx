'use client';

import React, { useState } from 'react';
import './breadcrumb.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  className?: string;
}

const DefaultSeparator = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4,2 8,6 4,10" />
  </svg>
);

export function Breadcrumb({
  items,
  separator = <DefaultSeparator />,
  maxItems,
  className = '',
}: BreadcrumbProps) {
  const [expanded, setExpanded] = useState(false);

  const shouldCollapse = maxItems && items.length > maxItems + 1 && !expanded;
  const displayed: React.ReactNode[] = [];

  if (shouldCollapse) {
    // Always show first and last
    const first = items[0]!;
    const last = items[items.length - 1]!;

    displayed.push(renderItem(first, false, separator));
    displayed.push(
      <li key="ellipsis" className="gy-breadcrumb-item">
        <span className="gy-breadcrumb-separator">{separator}</span>
        <button
          className="gy-breadcrumb-ellipsis"
          onClick={() => setExpanded(true)}
          aria-label="Show more breadcrumbs"
        >
          •••
        </button>
      </li>
    );
    displayed.push(renderItem(last, true, separator));
  } else {
    items.forEach((item, i) => {
      displayed.push(renderItem(item, i === items.length - 1, separator, i));
    });
  }

  return (
    <nav aria-label="Breadcrumb">
      <ol className={`gy-breadcrumb ${className}`}>
        {displayed}
      </ol>
    </nav>
  );
}

function renderItem(
  item: BreadcrumbItem,
  isCurrent: boolean,
  separator: React.ReactNode,
  key?: number
) {
  return (
    <li key={key ?? item.label} className="gy-breadcrumb-item">
      {key !== 0 && key !== undefined && (
        <span className="gy-breadcrumb-separator" aria-hidden="true">{separator}</span>
      )}
      {isCurrent ? (
        <span className="gy-breadcrumb-current" aria-current="page">{item.label}</span>
      ) : (
        <a
          className="gy-breadcrumb-link"
          href={item.href ?? '#'}
          onClick={item.onClick ? (e) => { e.preventDefault(); item.onClick?.(); } : undefined}
        >
          {item.label}
        </a>
      )}
    </li>
  );
}
