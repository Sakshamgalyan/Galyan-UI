'use client';

import React, { useMemo, useState } from 'react';
import { Checkbox } from '../checkbox/Checkbox';
import './table.css';

export type SortDirection = 'asc' | 'desc';

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  accessor: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  selectable?: boolean;
  selectedRows?: string[];
  onSelectionChange?: (keys: string[]) => void;
  pageSize?: number;
  emptyMessage?: React.ReactNode;
  className?: string;
  stickyHeader?: boolean;
}

function SortIcon({ dir }: { dir?: SortDirection }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className={`gy-table-sort-icon ${dir ? 'gy-table-sort-icon--active' : ''}`}>
      {dir === 'asc' ? (
        <path d="M6 2L10 8H2L6 2z" />
      ) : dir === 'desc' ? (
        <path d="M6 10L2 4H10L6 10z" />
      ) : (
        <>
          <path d="M6 1L9 5H3L6 1z" opacity=".5" />
          <path d="M6 11L3 7H9L6 11z" opacity=".5" />
        </>
      )}
    </svg>
  );
}

export function Table<T>({
  columns,
  data,
  rowKey,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  pageSize = 10,
  emptyMessage = 'No data available',
  className = '',
  stickyHeader = false,
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>('asc');
  const [page, setPage] = useState(1);

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    const col = columns.find((c) => c.key === sortKey);
    if (!col) return data;
    return [...data].sort((a, b) => {
      const av = String(col.accessor(a) ?? '');
      const bv = String(col.accessor(b) ?? '');
      const cmp = av.localeCompare(bv, undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir, columns]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const paged = sortedData.slice((page - 1) * pageSize, page * pageSize);

  const allSelected = paged.length > 0 && paged.every((r) => selectedRows.includes(rowKey(r)));
  const someSelected = paged.some((r) => selectedRows.includes(rowKey(r)));

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(1);
  };

  const toggleRow = (key: string) => {
    const next = selectedRows.includes(key)
      ? selectedRows.filter((k) => k !== key)
      : [...selectedRows, key];
    onSelectionChange?.(next);
  };

  const toggleAll = () => {
    const pageKeys = paged.map(rowKey);
    if (allSelected) {
      onSelectionChange?.(selectedRows.filter((k) => !pageKeys.includes(k)));
    } else {
      const combined = [...new Set([...selectedRows, ...pageKeys])];
      onSelectionChange?.(combined);
    }
  };

  const pageNums = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pageNums.filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  return (
    <div className={`gy-table-wrapper ${className}`}>
      <table className="gy-table" aria-label="Data table">
        <thead className="gy-table-header">
          <tr>
            {selectable && (
              <th className="gy-table-th gy-table-th--checkbox">
                <Checkbox
                  checked={allSelected}
                  indeterminate={!allSelected && someSelected}
                  onChange={toggleAll}
                  size="sm"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className={`gy-table-th ${col.sortable ? 'gy-table-th--sortable' : ''}`}
                style={{ width: col.width, textAlign: col.align }}
                onClick={col.sortable ? () => toggleSort(col.key) : undefined}
                aria-sort={sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}
              >
                <span className="gy-table-th-inner">
                  {col.header}
                  {col.sortable && <SortIcon dir={sortKey === col.key ? sortDir : undefined} />}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paged.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="gy-table-empty">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            paged.map((row) => {
              const key = rowKey(row);
              const isSelected = selectedRows.includes(key);
              return (
                <tr
                  key={key}
                  className={`gy-table-tr ${isSelected ? 'gy-table-tr--selected' : ''}`}
                  aria-selected={selectable ? isSelected : undefined}
                >
                  {selectable && (
                    <td className="gy-table-td gy-table-td--checkbox">
                      <Checkbox checked={isSelected} onChange={() => toggleRow(key)} size="sm" />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className="gy-table-td" style={{ textAlign: col.align }}>
                      {col.accessor(row)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="gy-table-pagination">
          <span className="gy-table-pagination-info">
            Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, sortedData.length)} of {sortedData.length}
          </span>
          <div className="gy-table-pagination-controls">
            <button className="gy-table-pagination-btn" onClick={() => setPage((p) => p - 1)} disabled={page === 1} aria-label="Previous page">‹</button>
            {visiblePages.map((p, i, arr) => (
              <React.Fragment key={p}>
                {i > 0 && arr[i - 1] !== p - 1 && <span style={{ padding: '0 4px', color: 'var(--gy-text-subtle)' }}>…</span>}
                <button
                  className={`gy-table-pagination-btn ${page === p ? 'gy-table-pagination-btn--active' : ''}`}
                  onClick={() => setPage(p)}
                  aria-label={`Page ${p}`}
                  aria-current={page === p ? 'page' : undefined}
                >
                  {p}
                </button>
              </React.Fragment>
            ))}
            <button className="gy-table-pagination-btn" onClick={() => setPage((p) => p + 1)} disabled={page === totalPages} aria-label="Next page">›</button>
          </div>
        </div>
      )}
    </div>
  );
}
