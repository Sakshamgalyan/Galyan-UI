"use client";

import React, { useMemo, useState } from "react";
import { Checkbox } from "../checkbox/Checkbox";
import { Skeleton } from "../skeleton/Skeleton";
import "./table.css";

export type SortDirection = "asc" | "desc";

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  accessor: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  headerAlign?: "left" | "center" | "right";
}

export interface TablePaginationConfig {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey?: (row: T) => string;
  variant?: "default" | "striped" | "simple" | "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  hoverable?: boolean;
  showHeader?: boolean;
  sortable?: boolean;
  emptyState?: React.ReactNode;
  emptyStateLabel?: string;
  emptyStateMessage?: string;
  emptyStateIcon?: React.ReactNode;
  noBorder?: boolean;
  sortConfig?: { key: string; direction: SortDirection } | null;
  onSort?: (key: string, direction: SortDirection) => void;
  fixedLeftmost?: boolean;
  fixedRightmost?: boolean;
  isRowSelection?: boolean;
  selectable?: boolean; // For backwards compatibility
  selectedRows?: string[];
  onRowSelect?: (keys: string[]) => void;
  onSelectionChange?: (keys: string[]) => void; // For backwards compatibility
  onRowClick?: (row: T, event: React.MouseEvent) => void;
  pagination?: boolean | TablePaginationConfig;
  onPageChange?: (page: number) => void;
  nestedChildrenAccessor?: keyof T | ((row: T) => T[] | undefined);
  nestedDefaultExpanded?: boolean;
  isLoading?: boolean;
  skeletonRows?: number;
  skeletonContent?: React.ReactNode;
  showPaginationSkeleton?: boolean;
  paginationDisabled?: boolean;
  headerAlign?: "left" | "center" | "right";
  // Extra features for customizability
  pageSize?: number;
  stickyHeader?: boolean;
  className?: string;
}

function SortIcon({ dir }: { dir?: SortDirection }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="currentColor"
      className={`gy-table-sort-icon ${dir ? "gy-table-sort-icon--active" : ""}`}
    >
      {dir === "asc" ? (
        <path d="M6 2L10 8H2L6 2z" />
      ) : dir === "desc" ? (
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
  data = [],
  rowKey,
  variant = "default",
  size = "md",
  hoverable = true,
  showHeader = true,
  sortable = true,
  emptyState,
  emptyStateLabel = "No data available",
  emptyStateMessage,
  emptyStateIcon,
  noBorder = false,
  sortConfig,
  onSort,
  fixedLeftmost = false,
  fixedRightmost = false,
  isRowSelection = false,
  selectable = false,
  selectedRows = [],
  onRowSelect,
  onSelectionChange,
  onRowClick,
  pagination = false,
  onPageChange,
  nestedChildrenAccessor,
  nestedDefaultExpanded = false,
  isLoading = false,
  skeletonRows = 5,
  skeletonContent,
  showPaginationSkeleton = true,
  paginationDisabled = false,
  headerAlign = "left",
  pageSize = 10,
  stickyHeader = false,
  className = "",
}: TableProps<T>) {
  // Local states for uncontrolled modes
  const [localSortKey, setLocalSortKey] = useState<string | null>(null);
  const [localSortDir, setLocalSortDir] = useState<SortDirection>("asc");
  const [localPage, setLocalPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  // Unified selections support
  const enableSelection = isRowSelection || selectable;
  const activeSelectedRows = selectedRows;
  const handleSelectionChange = (keys: string[]) => {
    onRowSelect?.(keys);
    onSelectionChange?.(keys);
  };

  // Helper to extract row key
  const getRowKey = (row: T, index: number): string => {
    if (rowKey) return rowKey(row);
    // Try accessing id property if exists
    if (row && typeof row === "object" && "id" in row)
      return String((row as any).id);
    return String(index);
  };

  // Nested children accessor helper
  const getNestedChildren = (row: T): T[] | undefined => {
    if (!nestedChildrenAccessor) return undefined;
    if (typeof nestedChildrenAccessor === "function") {
      return nestedChildrenAccessor(row);
    }
    return row[nestedChildrenAccessor] as unknown as T[] | undefined;
  };

  // Check if row is expanded
  const isRowExpanded = (key: string): boolean => {
    if (expandedRows[key] !== undefined) {
      return expandedRows[key];
    }
    return !!nestedDefaultExpanded;
  };

  const toggleRowExpansion = (key: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setExpandedRows((prev) => ({
      ...prev,
      [key]: !isRowExpanded(key),
    }));
  };

  // Uncontrolled or controlled sorting logic
  const handleSort = (key: string) => {
    if (!sortable) return;
    const isControlled = sortConfig !== undefined;
    let nextDir: SortDirection = "asc";

    const currentKey = isControlled ? sortConfig?.key : localSortKey;
    const currentDir = isControlled ? sortConfig?.direction : localSortDir;

    if (currentKey === key) {
      nextDir = currentDir === "asc" ? "desc" : "asc";
    }

    if (isControlled) {
      onSort?.(key, nextDir);
    } else {
      setLocalSortKey(key);
      setLocalSortDir(nextDir);
    }
    setLocalPage(1);
  };

  // Local sorting calculations
  const sortedData = useMemo(() => {
    const activeSortKey =
      sortConfig !== undefined ? sortConfig?.key : localSortKey;
    const activeSortDir =
      sortConfig !== undefined ? sortConfig?.direction : localSortDir;

    if (!activeSortKey || !sortable) return data;

    const col = columns.find((c) => c.key === activeSortKey);
    if (!col) return data;

    return [...data].sort((a, b) => {
      const av = col.accessor(a);
      const bv = col.accessor(b);

      const aVal =
        typeof av === "string" || typeof av === "number"
          ? av
          : String(av ?? "");
      const bVal =
        typeof bv === "string" || typeof bv === "number"
          ? bv
          : String(bv ?? "");

      if (typeof aVal === "number" && typeof bVal === "number") {
        return activeSortDir === "asc" ? aVal - bVal : bVal - aVal;
      }

      const cmp = String(aVal).localeCompare(String(bVal), undefined, {
        numeric: true,
      });
      return activeSortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortConfig, localSortKey, localSortDir, columns, sortable]);

  // Pagination states
  const isPaginationEnabled = !!pagination;
  const isPaginationControlled = typeof pagination === "object";

  const currentPage = isPaginationControlled
    ? pagination.currentPage
    : localPage;
  const totalPages = isPaginationControlled
    ? pagination.totalPages
    : Math.max(1, Math.ceil(sortedData.length / pageSize));

  // visible root rows after local pagination (if uncontrolled)
  const paginatedRootRows = useMemo(() => {
    if (!isPaginationEnabled || isPaginationControlled) {
      return sortedData;
    }
    return sortedData.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize,
    );
  }, [
    sortedData,
    isPaginationEnabled,
    isPaginationControlled,
    currentPage,
    pageSize,
  ]);

  // Flattened hierarchical view of visible rows (handles nested expansion)
  const visibleRows = useMemo(() => {
    const visible: {
      row: T;
      depth: number;
      key: string;
      hasChildren: boolean;
      isExpanded: boolean;
    }[] = [];

    const process = (item: T, depth: number) => {
      const key = getRowKey(item, visible.length);
      const children = getNestedChildren(item);
      const hasChildren = !!(children && children.length > 0);
      const isExpanded = isRowExpanded(key);

      visible.push({ row: item, depth, key, hasChildren, isExpanded });

      if (hasChildren && isExpanded) {
        children.forEach((child) => process(child, depth + 1));
      }
    };

    paginatedRootRows.forEach((item) => process(item, 0));
    return visible;
  }, [paginatedRootRows, expandedRows, nestedDefaultExpanded]);

  // Selection states
  const allPageKeys = useMemo(
    () => visibleRows.map((r) => r.key),
    [visibleRows],
  );
  const allSelected =
    allPageKeys.length > 0 &&
    allPageKeys.every((key) => activeSelectedRows.includes(key));
  const someSelected = allPageKeys.some((key) =>
    activeSelectedRows.includes(key),
  );

  const toggleAllSelection = () => {
    if (allSelected) {
      handleSelectionChange(
        activeSelectedRows.filter((k) => !allPageKeys.includes(k)),
      );
    } else {
      const combined = [...new Set([...activeSelectedRows, ...allPageKeys])];
      handleSelectionChange(combined);
    }
  };

  const toggleRowSelection = (key: string) => {
    const next = activeSelectedRows.includes(key)
      ? activeSelectedRows.filter((k) => k !== key)
      : [...activeSelectedRows, key];
    handleSelectionChange(next);
  };

  const handlePageClick = (page: number) => {
    if (paginationDisabled) return;
    if (isPaginationControlled) {
      onPageChange?.(page);
    } else {
      setLocalPage(page);
    }
  };

  // Rendering empty state helper
  const renderEmptyState = () => {
    if (emptyState) return emptyState;

    return (
      <div className="gy-table-empty-container">
        {emptyStateIcon && (
          <div className="gy-table-empty-icon">{emptyStateIcon}</div>
        )}
        <h4 className="gy-table-empty-label">{emptyStateLabel}</h4>
        {emptyStateMessage && (
          <p className="gy-table-empty-message">{emptyStateMessage}</p>
        )}
      </div>
    );
  };

  // Render skeletons
  const renderSkeletons = () => {
    const randomWidths = ["60%", "80%", "70%", "85%", "75%"];
    return Array.from({ length: skeletonRows }).map((_, rIdx) => {
      const key = `skeleton-row-${rIdx}`;
      return (
        <tr key={key} className="gy-table-tr gy-table-tr--skeleton">
          {enableSelection && (
            <td
              className={`gy-table-td gy-table-td--checkbox ${
                fixedLeftmost ? "gy-table-td--fixed-left" : ""
              }`}
              style={{ left: fixedLeftmost ? 0 : undefined }}
            >
              <Skeleton
                variant="rectangular"
                width="16px"
                height="16px"
                style={{ borderRadius: "4px" }}
              />
            </td>
          )}
          {columns.map((col, cIdx) => {
            const isLeftFixed = fixedLeftmost && cIdx === 0;
            const isRightFixed = fixedRightmost && cIdx === columns.length - 1;
            const leftOffset = isLeftFixed
              ? enableSelection
                ? 40
                : 0
              : undefined;

            const classes = [
              "gy-table-td",
              isLeftFixed ? "gy-table-td--fixed-left" : "",
              isRightFixed ? "gy-table-td--fixed-right" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <td
                key={col.key}
                className={classes}
                style={{
                  textAlign: col.align || "left",
                  left:
                    leftOffset !== undefined ? `${leftOffset}px` : undefined,
                  right: isRightFixed ? 0 : undefined,
                }}
              >
                {skeletonContent ? (
                  skeletonContent
                ) : (
                  <Skeleton
                    variant="text"
                    width={randomWidths[(rIdx + cIdx) % randomWidths.length]}
                    height="16px"
                  />
                )}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  // Pagination page buttons generator
  const paginationControls = useMemo(() => {
    if (!isPaginationEnabled) return null;
    const pageNums = Array.from({ length: totalPages }, (_, i) => i + 1);
    const visiblePages = pageNums.filter(
      (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1,
    );

    return (
      <div className="gy-table-pagination-controls">
        <button
          className="gy-table-pagination-btn"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1 || paginationDisabled || isLoading}
          aria-label="Previous page"
        >
          ‹
        </button>
        {visiblePages.map((p, i, arr) => (
          <React.Fragment key={p}>
            {i > 0 && arr[i - 1] !== p - 1 && (
              <span className="gy-table-pagination-ellipsis">…</span>
            )}
            <button
              className={`gy-table-pagination-btn ${
                currentPage === p ? "gy-table-pagination-btn--active" : ""
              }`}
              onClick={() => handlePageClick(p)}
              disabled={paginationDisabled || isLoading}
              aria-label={`Page ${p}`}
              aria-current={currentPage === p ? "page" : undefined}
            >
              {p}
            </button>
          </React.Fragment>
        ))}
        <button
          className="gy-table-pagination-btn"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={
            currentPage === totalPages || paginationDisabled || isLoading
          }
          aria-label="Next page"
        >
          ›
        </button>
      </div>
    );
  }, [
    currentPage,
    totalPages,
    isPaginationEnabled,
    paginationDisabled,
    isLoading,
  ]);

  const activeSortKey =
    sortConfig !== undefined ? sortConfig?.key : localSortKey;
  const activeSortDir =
    sortConfig !== undefined ? sortConfig?.direction : localSortDir;

  const wrapperClasses = [
    "gy-table-wrapper",
    noBorder ? "gy-table-wrapper--no-border" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const tableClasses = [
    "gy-table",
    `gy-table--${size}`,
    `gy-table--variant-${variant}`,
    hoverable ? "gy-table--hoverable" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClasses}>
      <div className="gy-table-container">
        <table className={tableClasses} aria-label="Data table">
          {showHeader && (
            <thead
              className={`gy-table-header ${stickyHeader ? "gy-table-header--sticky" : ""}`}
            >
              <tr>
                {enableSelection && (
                  <th
                    className={`gy-table-th gy-table-th--checkbox ${
                      fixedLeftmost ? "gy-table-th--fixed-left" : ""
                    }`}
                    style={{ left: fixedLeftmost ? 0 : undefined }}
                  >
                    {!isLoading && (
                      <Checkbox
                        checked={allSelected}
                        indeterminate={!allSelected && someSelected}
                        onChange={toggleAllSelection}
                        size="sm"
                        disabled={isLoading}
                      />
                    )}
                  </th>
                )}
                {columns.map((col, cIdx) => {
                  const isLeftFixed = fixedLeftmost && cIdx === 0;
                  const isRightFixed =
                    fixedRightmost && cIdx === columns.length - 1;
                  const leftOffset = isLeftFixed
                    ? enableSelection
                      ? 40
                      : 0
                    : undefined;
                  const align = col.align || headerAlign;

                  const isColSortable = sortable && col.sortable !== false;

                  const classes = [
                    "gy-table-th",
                    isColSortable ? "gy-table-th--sortable" : "",
                    isLeftFixed ? "gy-table-th--fixed-left" : "",
                    isRightFixed ? "gy-table-th--fixed-right" : "",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <th
                      key={col.key}
                      className={classes}
                      style={{
                        width: col.width,
                        textAlign: align,
                        left:
                          leftOffset !== undefined
                            ? `${leftOffset}px`
                            : undefined,
                        right: isRightFixed ? 0 : undefined,
                      }}
                      onClick={
                        isColSortable ? () => handleSort(col.key) : undefined
                      }
                      aria-sort={
                        activeSortKey === col.key
                          ? activeSortDir === "asc"
                            ? "ascending"
                            : "descending"
                          : undefined
                      }
                    >
                      <span
                        className="gy-table-th-inner"
                        style={{
                          justifyContent:
                            align === "right"
                              ? "flex-end"
                              : align === "center"
                                ? "center"
                                : "flex-start",
                        }}
                      >
                        {col.header}
                        {isColSortable && (
                          <SortIcon
                            dir={
                              activeSortKey === col.key
                                ? activeSortDir
                                : undefined
                            }
                          />
                        )}
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
          )}
          <tbody>
            {isLoading ? (
              renderSkeletons()
            ) : visibleRows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (enableSelection ? 1 : 0)}
                  className="gy-table-empty"
                >
                  {renderEmptyState()}
                </td>
              </tr>
            ) : (
              visibleRows.map(
                ({ row, depth, key, hasChildren, isExpanded }) => {
                  const isSelected = activeSelectedRows.includes(key);

                  const trClasses = [
                    "gy-table-tr",
                    isSelected ? "gy-table-tr--selected" : "",
                    hasChildren ? "gy-table-tr--parent" : "",
                    depth > 0 ? "gy-table-tr--nested" : "",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <tr
                      key={key}
                      className={trClasses}
                      onClick={(e) => onRowClick?.(row, e)}
                      style={{ cursor: onRowClick ? "pointer" : undefined }}
                      aria-selected={enableSelection ? isSelected : undefined}
                    >
                      {enableSelection && (
                        <td
                          className={`gy-table-td gy-table-td--checkbox ${
                            fixedLeftmost ? "gy-table-td--fixed-left" : ""
                          }`}
                          style={{ left: fixedLeftmost ? 0 : undefined }}
                          onClick={(e) => e.stopPropagation()} // Stop triggering row clicks
                        >
                          <Checkbox
                            checked={isSelected}
                            onChange={() => toggleRowSelection(key)}
                            size="sm"
                          />
                        </td>
                      )}
                      {columns.map((col, cIdx) => {
                        const isLeftFixed = fixedLeftmost && cIdx === 0;
                        const isRightFixed =
                          fixedRightmost && cIdx === columns.length - 1;
                        const leftOffset = isLeftFixed
                          ? enableSelection
                            ? 40
                            : 0
                          : undefined;

                        const classes = [
                          "gy-table-td",
                          isLeftFixed ? "gy-table-td--fixed-left" : "",
                          isRightFixed ? "gy-table-td--fixed-right" : "",
                        ]
                          .filter(Boolean)
                          .join(" ");

                        const cellValue = col.accessor(row);

                        return (
                          <td
                            key={col.key}
                            className={classes}
                            style={{
                              textAlign: col.align || "left",
                              left:
                                leftOffset !== undefined
                                  ? `${leftOffset}px`
                                  : undefined,
                              right: isRightFixed ? 0 : undefined,
                            }}
                          >
                            {cIdx === 0 ? (
                              <div
                                className="gy-table-cell-first"
                                style={{ paddingLeft: `${depth * 20}px` }}
                              >
                                {hasChildren && (
                                  <button
                                    type="button"
                                    className={`gy-table-expand-btn ${
                                      isExpanded
                                        ? "gy-table-expand-btn--expanded"
                                        : ""
                                    }`}
                                    onClick={(e) => toggleRowExpansion(key, e)}
                                    aria-label={
                                      isExpanded ? "Collapse row" : "Expand row"
                                    }
                                  >
                                    <svg
                                      width="10"
                                      height="10"
                                      viewBox="0 0 10 10"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="M3 1l4 4-4 4" />
                                    </svg>
                                  </button>
                                )}
                                {!hasChildren && depth > 0 && (
                                  <span className="gy-table-expand-spacer" />
                                )}
                                <span className="gy-table-cell-content">
                                  {cellValue}
                                </span>
                              </div>
                            ) : (
                              cellValue
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                },
              )
            )}
          </tbody>
        </table>
      </div>

      {isPaginationEnabled && (
        <div className="gy-table-pagination">
          {isLoading && showPaginationSkeleton ? (
            <>
              <Skeleton variant="text" width="120px" height="16px" />
              <div style={{ display: "flex", gap: "4px" }}>
                <Skeleton
                  variant="rectangular"
                  width="32px"
                  height="32px"
                  style={{ borderRadius: "6px" }}
                />
                <Skeleton
                  variant="rectangular"
                  width="32px"
                  height="32px"
                  style={{ borderRadius: "6px" }}
                />
                <Skeleton
                  variant="rectangular"
                  width="32px"
                  height="32px"
                  style={{ borderRadius: "6px" }}
                />
              </div>
            </>
          ) : (
            <>
              <span className="gy-table-pagination-info">
                {isPaginationControlled ? (
                  <>
                    Page {currentPage} of {totalPages}
                    {pagination.totalItems !== undefined &&
                      ` (${pagination.totalItems} items)`}
                  </>
                ) : (
                  <>
                    Showing{" "}
                    {Math.min(
                      (currentPage - 1) * pageSize + 1,
                      sortedData.length,
                    )}
                    –{Math.min(currentPage * pageSize, sortedData.length)} of{" "}
                    {sortedData.length}
                  </>
                )}
              </span>
              {paginationControls}
            </>
          )}
        </div>
      )}
    </div>
  );
}
