"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Checkbox } from "../checkbox/Checkbox";
import { Skeleton } from "../skeleton/Skeleton";
import { Tooltip } from "../tooltip/Tooltip";
import { EmptyState } from "../emptystate/EmptyState";
import "./table.css";
import { Typography } from "../typography";

export type SortDirection = "asc" | "desc";
export type TableResponsiveMode = "scroll" | "stack" | "cards" | boolean;

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  accessor: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  maxWidth?: string;
  align?: "left" | "center" | "right";
  headerAlign?: "left" | "center" | "right";
  ellipsis?: boolean;
  showTooltip?: boolean;
  /**
   * Fix column to left or right during horizontal scroll:
   * - "left" | true: Sticky fixed to left side
   * - "right": Sticky fixed to right side
   * - false | undefined: Normal scrolling column
   */
  fixed?: "left" | "right" | boolean;
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
  /**
   * Whether to render tree branch connecting lines for nested expandable child rows
   * @default true
   */
  treeLines?: boolean;
  /** Custom stroke color for tree branch connecting lines */
  treeLineColor?: string;
  isLoading?: boolean;
  skeletonRows?: number;
  skeletonContent?: React.ReactNode;
  showPaginationSkeleton?: boolean;
  paginationDisabled?: boolean;
  headerAlign?: "left" | "center" | "right";
  // Extra features for customizability
  ellipsis?: boolean;
  showTooltip?: boolean;
  paginationVariant?: "numbers" | "compact";
  pageSize?: number;
  stickyHeader?: boolean;
  /**
   * Responsive layout strategy:
   * - "scroll" | true (default): Fluid touch-friendly horizontal scroll with edge fade hints
   * - "stack" | "cards": Transforms table rows into mobile cards on screens <= 640px
   * - false: Unconstrained desktop table
   * @default "scroll"
   */
  responsive?: TableResponsiveMode;
  /** Accessible label for table / scrollable region */
  ariaLabel?: string;
  /**
   * Corner rounding style:
   * - "none" | false: Crisp sharp 0px corners
   * - true | "xl" (default): Standard 0.75rem rounded corners
   * - "sm" | "md" | "lg": Proportional rounded corners
   * @default "xl"
   */
  rounded?: boolean | "none" | "sm" | "md" | "lg" | "xl";
  /** Custom border radius if a specific CSS value is needed */
  borderRadius?: string | number;
  /** Custom style for table wrapper */
  style?: React.CSSProperties;
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

interface TableCellEllipsisProps {
  content: React.ReactNode;
  rawText?: string;
  maxWidth?: string | number;
  showTooltip?: boolean;
}

function TableCellEllipsis({
  content,
  rawText,
  maxWidth,
  showTooltip = true,
}: TableCellEllipsisProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const checkOverflow = useCallback(() => {
    const el = textRef.current;
    if (!el) return;
    // Text overflows when content width exceeds the rendered client width
    const hasOverflow = el.scrollWidth > el.clientWidth + 1;
    setIsOverflowing(hasOverflow);
  }, []);

  useEffect(() => {
    checkOverflow();
    const el = textRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const resizeObserver = new ResizeObserver(() => {
      checkOverflow();
    });
    resizeObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
    };
  }, [checkOverflow, content]);

  const handleMouseEnter = () => {
    checkOverflow();
  };

  return (
    <div
      className="gy-table-cell-ellipsis"
      style={{
        maxWidth: maxWidth || undefined,
      }}
      onMouseEnter={handleMouseEnter}
    >
      <Tooltip
        content={rawText}
        position="top"
        disabled={!showTooltip || !isOverflowing || !rawText}
      >
        <span ref={textRef} className="gy-table-cell-ellipsis-text">
          {content}
        </span>
      </Tooltip>
    </div>
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
  treeLines = true,
  treeLineColor,
  isLoading = false,
  skeletonRows = 5,
  skeletonContent,
  showPaginationSkeleton = true,
  paginationDisabled = false,
  headerAlign = "left",
  ellipsis = true,
  showTooltip = true,
  paginationVariant = "compact",
  pageSize = 10,
  stickyHeader = false,
  responsive = "scroll",
  ariaLabel,
  rounded = "xl",
  borderRadius,
  style,
  className = "",
}: TableProps<T>) {
  // Local states for uncontrolled modes
  const [localSortKey, setLocalSortKey] = useState<string | null>(null);
  const [localSortDir, setLocalSortDir] = useState<SortDirection>("asc");
  const [localPage, setLocalPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  // Container scroll hints for responsive mobile/tablet horizontal scroll
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollIndicators = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    updateScrollIndicators();
    el.addEventListener("scroll", updateScrollIndicators, { passive: true });
    window.addEventListener("resize", updateScrollIndicators, {
      passive: true,
    });
    return () => {
      el.removeEventListener("scroll", updateScrollIndicators);
      window.removeEventListener("resize", updateScrollIndicators);
    };
  }, [updateScrollIndicators, data, columns]);

  // Unified selections support
  const enableSelection = isRowSelection || selectable;
  const activeSelectedRows = selectedRows;
  const handleSelectionChange = (keys: string[]) => {
    onRowSelect?.(keys);
    onSelectionChange?.(keys);
  };

  // Helper to parse CSS width strings to px numbers for sticky positioning
  const parseWidthToPx = (width?: string): number => {
    if (!width) return 120;
    const match = String(width).match(/^([\d.]+)(px|rem|em)?$/);
    if (match && match[1]) {
      const val = parseFloat(match[1]);
      const unit = match[2] || "px";
      if (unit === "rem" || unit === "em") {
        return val * 16;
      }
      return val;
    }
    const parsed = parseFloat(width);
    return isNaN(parsed) ? 120 : parsed;
  };

  const {
    leftOffsets,
    rightOffsets,
    isFixedLeft,
    isFixedRight,
    isLastFixedLeft,
    isFirstFixedRight,
    hasFixedLeft,
    hasFixedRight,
  } = useMemo(() => {
    const leftOffsets: (number | undefined)[] = [];
    const rightOffsets: (number | undefined)[] = [];
    const isFixedLeftList: boolean[] = [];
    const isFixedRightList: boolean[] = [];

    let currentLeft = enableSelection ? 48 : 0;
    let lastLeftIdx = -1;

    columns.forEach((col, idx) => {
      const isLeft =
        col.fixed === "left" ||
        col.fixed === true ||
        (fixedLeftmost && idx === 0);
      isFixedLeftList[idx] = isLeft;
      if (isLeft) {
        leftOffsets[idx] = currentLeft;
        lastLeftIdx = idx;
        currentLeft += parseWidthToPx(col.width);
      } else {
        leftOffsets[idx] = undefined;
      }
    });

    let currentRight = 0;
    let firstRightIdx = -1;
    for (let idx = columns.length - 1; idx >= 0; idx--) {
      const col = columns[idx];
      if (!col) continue;
      const isRight =
        col.fixed === "right" || (fixedRightmost && idx === columns.length - 1);
      isFixedRightList[idx] = isRight;
      if (isRight) {
        rightOffsets[idx] = currentRight;
        firstRightIdx = idx;
        currentRight += parseWidthToPx(col.width);
      } else {
        rightOffsets[idx] = undefined;
      }
    }

    return {
      leftOffsets,
      rightOffsets,
      isFixedLeft: (idx: number) => isFixedLeftList[idx],
      isFixedRight: (idx: number) => isFixedRightList[idx],
      isLastFixedLeft: (idx: number) => idx === lastLeftIdx,
      isFirstFixedRight: (idx: number) => idx === firstRightIdx,
      hasFixedLeft: lastLeftIdx !== -1 || (enableSelection && fixedLeftmost),
      hasFixedRight: firstRightIdx !== -1,
    };
  }, [columns, enableSelection, fixedLeftmost, fixedRightmost]);

  const isCheckboxFixed = fixedLeftmost || hasFixedLeft;

  // Helper to extract row key
  const getRowKey = useCallback(
    (row: T, index: number): string => {
      if (rowKey) return rowKey(row);
      // Try accessing id property if exists
      if (row && typeof row === "object" && "id" in row)
        return String((row as { id: unknown }).id);
      return String(index);
    },
    [rowKey],
  );

  // Nested children accessor helper
  const getNestedChildren = useCallback(
    (row: T): T[] | undefined => {
      if (!nestedChildrenAccessor) return undefined;
      if (typeof nestedChildrenAccessor === "function") {
        return nestedChildrenAccessor(row);
      }
      return row[nestedChildrenAccessor] as unknown as T[] | undefined;
    },
    [nestedChildrenAccessor],
  );

  // Check if row is expanded
  const isRowExpanded = useCallback(
    (key: string): boolean => {
      if (expandedRows[key] !== undefined) {
        return expandedRows[key];
      }
      return !!nestedDefaultExpanded;
    },
    [expandedRows, nestedDefaultExpanded],
  );

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

  // Flattened hierarchical view of visible rows (handles nested expansion and tree lines)
  const visibleRows = useMemo(() => {
    const visible: {
      row: T;
      depth: number;
      key: string;
      hasChildren: boolean;
      isExpanded: boolean;
      isLastChild: boolean;
      ancestorHasNextSibling: boolean[];
    }[] = [];

    const process = (
      item: T,
      depth: number,
      isLast: boolean,
      ancestorsNext: boolean[],
    ) => {
      const key = getRowKey(item, visible.length);
      const children = getNestedChildren(item);
      const hasChildren = !!(children && children.length > 0);
      const isExpanded = isRowExpanded(key);

      visible.push({
        row: item,
        depth,
        key,
        hasChildren,
        isExpanded,
        isLastChild: isLast,
        ancestorHasNextSibling: ancestorsNext,
      });

      if (hasChildren && isExpanded) {
        children.forEach((child, idx) => {
          const childIsLast = idx === children.length - 1;
          process(child, depth + 1, childIsLast, [
            ...ancestorsNext,
            !childIsLast,
          ]);
        });
      }
    };

    paginatedRootRows.forEach((item, idx) =>
      process(item, 0, idx === paginatedRootRows.length - 1, []),
    );
    return visible;
  }, [paginatedRootRows, getRowKey, getNestedChildren, isRowExpanded]);

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

  const handlePageClick = useCallback(
    (page: number) => {
      if (paginationDisabled) return;
      if (isPaginationControlled) {
        onPageChange?.(page);
      } else {
        setLocalPage(page);
      }
    },
    [paginationDisabled, isPaginationControlled, onPageChange],
  );

  // Rendering empty state helper
  const renderEmptyState = () => {
    if (emptyState) return emptyState;

    return (
      <EmptyState
        title={emptyStateLabel}
        description={emptyStateMessage}
        icon={emptyStateIcon}
        size="md"
        className="gy-table-empty-container"
      />
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
                isCheckboxFixed ? "gy-table-td--fixed-left" : ""
              }`}
              style={{ left: isCheckboxFixed ? 0 : undefined }}
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
            const isLeft = isFixedLeft(cIdx);
            const isRight = isFixedRight(cIdx);
            const isLastLeft = isLastFixedLeft(cIdx);
            const isFirstRight = isFirstFixedRight(cIdx);
            const leftOffset = leftOffsets[cIdx];
            const rightOffset = rightOffsets[cIdx];

            const classes = [
              "gy-table-td",
              isLeft ? "gy-table-td--fixed-left" : "",
              isLastLeft ? "gy-table-td--fixed-left-last" : "",
              isRight ? "gy-table-td--fixed-right" : "",
              isFirstRight ? "gy-table-td--fixed-right-first" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <td
                key={col.key}
                className={classes}
                style={{
                  width: col.width,
                  maxWidth: col.maxWidth || col.width,
                  textAlign: col.align || "left",
                  left:
                    leftOffset !== undefined ? `${leftOffset}px` : undefined,
                  right:
                    rightOffset !== undefined ? `${rightOffset}px` : undefined,
                  zIndex: isLeft || isRight ? 2 : undefined,
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

    if (paginationVariant === "compact") {
      return (
        <div className="gy-table-pagination-controls gy-table-pagination-controls--compact">
          <button
            type="button"
            className="gy-table-pagination-btn"
            onClick={() => handlePageClick(1)}
            disabled={currentPage === 1 || paginationDisabled || isLoading}
            aria-label="First page"
            title="First page"
          >
            «
          </button>
          <button
            type="button"
            className="gy-table-pagination-btn"
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1 || paginationDisabled || isLoading}
            aria-label="Previous page"
            title="Previous page"
          >
            ‹
          </button>
          <span className="gy-table-pagination-indicator">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            className="gy-table-pagination-btn"
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={
              currentPage === totalPages || paginationDisabled || isLoading
            }
            aria-label="Next page"
            title="Next page"
          >
            ›
          </button>
          <button
            type="button"
            className="gy-table-pagination-btn"
            onClick={() => handlePageClick(totalPages)}
            disabled={
              currentPage === totalPages || paginationDisabled || isLoading
            }
            aria-label="Last page"
            title="Last page"
          >
            »
          </button>
        </div>
      );
    }

    const pageNums = Array.from({ length: totalPages }, (_, i) => i + 1);
    const visiblePages = pageNums.filter(
      (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1,
    );

    return (
      <div className="gy-table-pagination-controls">
        <button
          type="button"
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
              <Typography
                variant="span"
                className="gy-table-pagination-ellipsis"
              >
                …
              </Typography>
            )}
            <button
              type="button"
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
          type="button"
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
    paginationVariant,
    handlePageClick,
  ]);

  const activeSortKey =
    sortConfig !== undefined ? sortConfig?.key : localSortKey;
  const activeSortDir =
    sortConfig !== undefined ? sortConfig?.direction : localSortDir;

  const isResponsive = responsive !== false;
  const isStackedMode = responsive === "stack" || responsive === "cards";

  const wrapperClasses = [
    "gy-table-wrapper",
    rounded === true
      ? "gy-table-wrapper--rounded"
      : typeof rounded === "string" && rounded !== "none"
        ? `gy-table-wrapper--rounded-${rounded}`
        : "gy-table-wrapper--sharp",
    isResponsive ? "gy-table-wrapper--responsive" : "",
    isStackedMode
      ? "gy-table-wrapper--responsive-stack"
      : "gy-table-wrapper--responsive-scroll",
    hasFixedLeft ? "gy-table-wrapper--has-fixed-left" : "",
    hasFixedRight ? "gy-table-wrapper--has-fixed-right" : "",
    canScrollLeft ? "gy-table-wrapper--scroll-left" : "",
    canScrollRight ? "gy-table-wrapper--scroll-right" : "",
    noBorder ? "gy-table-wrapper--no-border" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const wrapperStyle: React.CSSProperties | undefined =
    borderRadius !== undefined ||
    style !== undefined ||
    treeLineColor !== undefined
      ? {
          ...(borderRadius !== undefined ? { borderRadius } : {}),
          ...(treeLineColor !== undefined
            ? ({ "--gy-tree-line-color": treeLineColor } as React.CSSProperties)
            : {}),
          ...style,
        }
      : undefined;

  // Compute minimum table width from declared column widths so columns
  // maintain their sizes and the container scrolls instead of crushing.
  const tableMinWidth = useMemo(() => {
    let total = enableSelection ? 48 : 0;
    columns.forEach((col) => {
      total += parseWidthToPx(col.width);
    });
    return total;
  }, [columns, enableSelection]);

  const tableClasses = [
    "gy-table",
    `gy-table--${size}`,
    `gy-table--variant-${variant}`,
    hoverable ? "gy-table--hoverable" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClasses} style={wrapperStyle}>
      <div
        ref={containerRef}
        className="gy-table-container"
        tabIndex={canScrollLeft || canScrollRight ? 0 : undefined}
        role="region"
        aria-label={ariaLabel || "Data table"}
      >
        <table
          className={tableClasses}
          aria-label={ariaLabel || "Data table"}
          style={{
            minWidth: tableMinWidth > 0 ? `${tableMinWidth}px` : undefined,
          }}
        >
          {showHeader && (
            <thead
              className={`gy-table-header ${stickyHeader ? "gy-table-header--sticky" : ""}`}
            >
              <tr>
                {enableSelection && (
                  <th
                    className={`gy-table-th gy-table-th--checkbox ${
                      isCheckboxFixed ? "gy-table-th--fixed-left" : ""
                    }`}
                    style={{
                      left: isCheckboxFixed ? 0 : undefined,
                      zIndex: isCheckboxFixed
                        ? stickyHeader
                          ? 14
                          : 13
                        : stickyHeader
                          ? 10
                          : undefined,
                    }}
                  >
                    {!isLoading && (
                      <Checkbox
                        checked={allSelected}
                        indeterminate={!allSelected && someSelected}
                        onChange={toggleAllSelection}
                        size="sm"
                        disabled={isLoading}
                        aria-label="Select all rows"
                      />
                    )}
                  </th>
                )}
                {columns.map((col, cIdx) => {
                  const isLeft = isFixedLeft(cIdx);
                  const isRight = isFixedRight(cIdx);
                  const isLastLeft = isLastFixedLeft(cIdx);
                  const isFirstRight = isFirstFixedRight(cIdx);
                  const leftOffset = leftOffsets[cIdx];
                  const rightOffset = rightOffsets[cIdx];
                  const align = col.align || headerAlign;

                  const isColSortable = sortable && col.sortable !== false;

                  const classes = [
                    "gy-table-th",
                    isColSortable ? "gy-table-th--sortable" : "",
                    isLeft ? "gy-table-th--fixed-left" : "",
                    isLastLeft ? "gy-table-th--fixed-left-last" : "",
                    isRight ? "gy-table-th--fixed-right" : "",
                    isFirstRight ? "gy-table-th--fixed-right-first" : "",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <th
                      key={col.key}
                      className={classes}
                      style={{
                        width: col.width,
                        maxWidth: col.maxWidth || col.width,
                        textAlign: align,
                        left:
                          leftOffset !== undefined
                            ? `${leftOffset}px`
                            : undefined,
                        right:
                          rightOffset !== undefined
                            ? `${rightOffset}px`
                            : undefined,
                        zIndex:
                          isLeft || isRight
                            ? stickyHeader
                              ? 14
                              : 12
                            : stickyHeader
                              ? 10
                              : undefined,
                      }}
                      onClick={
                        isColSortable ? () => handleSort(col.key) : undefined
                      }
                      onKeyDown={
                        isColSortable
                          ? (e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                handleSort(col.key);
                              }
                            }
                          : undefined
                      }
                      tabIndex={isColSortable ? 0 : undefined}
                      role={isColSortable ? "button" : undefined}
                      aria-label={
                        isColSortable
                          ? `Sort by ${typeof col.header === "string" ? col.header : col.key}`
                          : undefined
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
                ({
                  row,
                  depth,
                  key,
                  hasChildren,
                  isExpanded,
                  isLastChild,
                  ancestorHasNextSibling,
                }) => {
                  const isSelected = activeSelectedRows.includes(key);

                  const trClasses = [
                    "gy-table-tr",
                    isSelected ? "gy-table-tr--selected" : "",
                    hasChildren ? "gy-table-tr--parent" : "",
                    hasChildren && isExpanded ? "gy-table-tr--expanded" : "",
                    depth > 0 ? "gy-table-tr--nested" : "",
                    depth > 0 ? `gy-table-tr--depth-${depth}` : "",
                    isLastChild ? "gy-table-tr--last-child" : "",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <tr
                      key={key}
                      className={trClasses}
                      onClick={(e) => onRowClick?.(row, e)}
                      onKeyDown={
                        onRowClick
                          ? (e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                onRowClick(row, e as unknown as React.MouseEvent);
                              }
                            }
                          : undefined
                      }
                      tabIndex={onRowClick ? 0 : undefined}
                      role={onRowClick ? "button" : undefined}
                      style={{ cursor: onRowClick ? "pointer" : undefined }}
                      aria-selected={enableSelection ? isSelected : undefined}
                    >
                      {enableSelection && (
                        <td
                          className={`gy-table-td gy-table-td--checkbox ${
                            isCheckboxFixed ? "gy-table-td--fixed-left" : ""
                          }`}
                          style={{
                            left: isCheckboxFixed ? 0 : undefined,
                            zIndex: isCheckboxFixed ? 3 : undefined,
                          }}
                          onClick={(e) => e.stopPropagation()} // Stop triggering row clicks
                        >
                          <Typography
                            variant="span"
                            className="gy-table-cell-mobile-label"
                          >
                            Select
                          </Typography>
                          <Checkbox
                            checked={isSelected}
                            onChange={() => toggleRowSelection(key)}
                            size="sm"
                            aria-label={`Select row ${key}`}
                          />
                        </td>
                      )}
                      {columns.map((col, cIdx) => {
                        const isLeft = isFixedLeft(cIdx);
                        const isRight = isFixedRight(cIdx);
                        const isLastLeft = isLastFixedLeft(cIdx);
                        const isFirstRight = isFirstFixedRight(cIdx);
                        const leftOffset = leftOffsets[cIdx];
                        const rightOffset = rightOffsets[cIdx];

                        const cellValue = col.accessor(row);
                        const isText =
                          typeof cellValue === "string" ||
                          typeof cellValue === "number";
                        const rawText = isText ? String(cellValue) : undefined;
                        const shouldEllipsis =
                          isText && (col.ellipsis ?? ellipsis);

                        const cellNode = shouldEllipsis ? (
                          <TableCellEllipsis
                            content={cellValue}
                            rawText={rawText}
                            maxWidth={col.maxWidth || col.width || undefined}
                            showTooltip={col.showTooltip ?? showTooltip}
                          />
                        ) : (
                          cellValue
                        );

                        const classes = [
                          "gy-table-td",
                          shouldEllipsis ? "gy-table-td--ellipsis" : "",
                          isLeft ? "gy-table-td--fixed-left" : "",
                          isLastLeft ? "gy-table-td--fixed-left-last" : "",
                          isRight ? "gy-table-td--fixed-right" : "",
                          isFirstRight ? "gy-table-td--fixed-right-first" : "",
                        ]
                          .filter(Boolean)
                          .join(" ");

                        return (
                          <td
                            key={col.key}
                            className={classes}
                            data-label={
                              typeof col.header === "string"
                                ? col.header
                                : undefined
                            }
                            style={{
                              width: col.width,
                              maxWidth: col.maxWidth || col.width,
                              textAlign: col.align || "left",
                              left:
                                leftOffset !== undefined
                                  ? `${leftOffset}px`
                                  : undefined,
                              right:
                                rightOffset !== undefined
                                  ? `${rightOffset}px`
                                  : undefined,
                              zIndex: isLeft || isRight ? 2 : undefined,
                            }}
                          >
                            <span className="gy-table-cell-mobile-label">
                              {col.header}
                            </span>
                            {cIdx === 0 ? (
                              <div
                                className={[
                                  "gy-table-cell-first",
                                  treeLines && depth > 0
                                    ? "gy-table-cell-first--tree"
                                    : "",
                                  treeLines && hasChildren && isExpanded
                                    ? "gy-table-cell-first--tree-parent"
                                    : "",
                                ]
                                  .filter(Boolean)
                                  .join(" ")}
                                style={{
                                  ...(treeLines
                                    ? ({
                                        "--gy-tree-depth": String(depth),
                                      } as React.CSSProperties)
                                    : depth > 0
                                      ? { paddingLeft: `${depth * 28}px` }
                                      : {}),
                                }}
                              >
                                {treeLines && depth > 0 && (
                                  <div
                                    className={`gy-table-tree-branches ${
                                      hasChildren
                                        ? ""
                                        : "gy-table-tree-branches--leaf"
                                    }`}
                                    aria-hidden="true"
                                  >
                                    {ancestorHasNextSibling
                                      .slice(0, depth - 1)
                                      .map((hasNext, dIdx) => (
                                        <span
                                          key={dIdx}
                                          className={`gy-table-tree-line ${
                                            hasNext
                                              ? "gy-table-tree-line--vertical"
                                              : "gy-table-tree-line--blank"
                                          }`}
                                        />
                                      ))}
                                    <span
                                      className={`gy-table-tree-line ${
                                        isLastChild
                                          ? "gy-table-tree-line--corner"
                                          : "gy-table-tree-line--tee"
                                      }`}
                                    />
                                  </div>
                                )}
                                {hasChildren && (
                                  <button
                                    type="button"
                                    className={`gy-table-expand-btn ${
                                      isExpanded
                                        ? "gy-table-expand-btn--expanded"
                                        : ""
                                    }`}
                                    onClick={(e) => toggleRowExpansion(key, e)}
                                    aria-expanded={isExpanded}
                                    aria-label={
                                      isExpanded ? "Collapse row" : "Expand row"
                                    }
                                  >
                                    <svg
                                      width="12"
                                      height="12"
                                      viewBox="0 0 12 12"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="1.75"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="M2.5 4.5L6 8L9.5 4.5" />
                                    </svg>
                                  </button>
                                )}
                                {!hasChildren &&
                                  (depth > 0 || !!nestedChildrenAccessor) && (
                                    <span className="gy-table-expand-spacer" />
                                  )}
                                <span className="gy-table-cell-content">
                                  {cellNode}
                                </span>
                              </div>
                            ) : (
                              cellNode
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
              {/* Mirrors the info text's flex so the skeleton sits where the
                  real pagination row will. */}
              <Skeleton
                variant="text"
                width="120px"
                height="16px"
                style={{ flex: "1 1 auto" }}
              />
              <div style={{ display: "flex", gap: "4px", flex: "0 0 auto" }}>
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
                    Showing{" "}
                    {pagination.totalItems === 0
                      ? 0
                      : (currentPage - 1) *
                          (pagination.itemsPerPage || pageSize) +
                        1}{" "}
                    to{" "}
                    {Math.min(
                      currentPage * (pagination.itemsPerPage || pageSize),
                      pagination.totalItems || 0,
                    )}{" "}
                    of {pagination.totalItems ?? 0} entries
                  </>
                ) : (
                  <>
                    Showing{" "}
                    {sortedData.length === 0
                      ? 0
                      : (currentPage - 1) * pageSize + 1}{" "}
                    to {Math.min(currentPage * pageSize, sortedData.length)} of{" "}
                    {sortedData.length} entries
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
