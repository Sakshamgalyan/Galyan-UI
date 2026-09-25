"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  PieChart as ReChartsPieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Sector,
} from "recharts";
import { Skeleton } from "../skeleton/Skeleton";
import "./pie-chart.css";

export interface PieChartItem {
  name: string;
  value: number;
  color?: string;
  [key: string]: any;
}

export interface PieChartTooltipConfig {
  show?: boolean;
  formatter?: (value: number) => string;
}

export interface PieChartProps {
  data: PieChartItem[];
  variant?: "standard" | "segmented";
  height?: number | string;
  width?: number | string;
  showLegend?: boolean;
  innerRadius?: number | string;
  outerRadius?: number | string;
  paddingAngle?: number;
  loading?: boolean;
  borderless?: boolean;
  className?: string;
  responsive?: boolean;
  tooltipConfig?: PieChartTooltipConfig;
  tokens?: Record<string, string>;
  onItemClick?: (item: PieChartItem, index: number) => void;
}

const DEFAULT_COLORS = [
  "var(--gy-primary, #3b82f6)",
  "var(--gy-success, #10b981)",
  "var(--gy-warning, #f59e0b)",
  "var(--gy-danger, #ef4444)",
  "var(--gy-info, #06b6d4)",
  "#8b5cf6",
  "#ec4899",
];

export function PieChart({
  data = [],
  variant = "standard",
  height = 320,
  width = "100%",
  showLegend = true,
  innerRadius = 0,
  outerRadius,
  paddingAngle,
  loading = false,
  borderless = false,
  className = "",
  responsive = true,
  tooltipConfig = { show: true },
  tokens,
  onItemClick,
}: PieChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isCompact, setIsCompact] = useState(false);

  const handleResetActive = () => {
    setActiveIndex(null);
  };

  // ResizeObserver for responsive observation of width & height
  useEffect(() => {
    if (!responsive) return;
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        setContainerSize({ width: w, height: h });
        setIsCompact(w > 0 && w < 440);
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [responsive]);

  const total = useMemo(() => {
    return data.reduce((acc, curr) => acc + (curr.value || 0), 0);
  }, [data]);

  const effectivePaddingAngle =
    paddingAngle !== undefined
      ? paddingAngle
      : variant === "segmented"
        ? 4
        : 1.5;

  // Determine available chart area height and width dynamically
  const measuredW =
    containerSize.width || (typeof width === "number" ? width : 320);
  const measuredH =
    containerSize.height || (typeof height === "number" ? height : 320);

  const padX = isCompact || borderless ? 16 : 28;
  const padY = isCompact || borderless ? 14 : 24;
  const legendH =
    showLegend && data.length > 0 ? (data.length > 4 ? 60 : 42) : 0;
  const availableChartW = Math.max(60, measuredW - padX);
  const availableChartH = Math.max(60, measuredH - padY - legendH);

  // Maximum safe outer radius that guarantees NO clipping on hover expansion or shadow
  const maxSafeOuter = Math.max(
    25,
    Math.floor(Math.min(availableChartW, availableChartH) / 2) - 10
  );

  const effectiveOuterRadius = useMemo(() => {
    if (typeof outerRadius === "number") {
      return Math.min(outerRadius, maxSafeOuter);
    }
    if (typeof outerRadius === "string") {
      return outerRadius;
    }
    return maxSafeOuter;
  }, [outerRadius, maxSafeOuter]);

  // Elevated Active Sector shape on hover
  const renderActiveShape = (props: any) => {
    const {
      cx,
      cy,
      innerRadius: inRad,
      outerRadius: outRad,
      startAngle,
      endAngle,
      fill,
    } = props;

    const hoverExpansion = isCompact ? 4 : 6;
    const numOutRad =
      typeof outRad === "number" ? outRad + hoverExpansion : outRad;
    const numInRad =
      typeof inRad === "number" ? Math.max(0, inRad - 1) : inRad;

    return (
      <g
        className="gy-piechart-active-slice"
        onMouseLeave={handleResetActive}
      >
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={numInRad}
          outerRadius={numOutRad}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          stroke="var(--gy-surface, #ffffff)"
          strokeWidth={2.5}
          onMouseLeave={handleResetActive}
          onClick={(entry) =>
            onItemClick?.(props.payload ?? entry, activeIndex ?? 0)
          }
          style={{
            filter: "drop-shadow(0 6px 14px rgba(0, 0, 0, 0.16))",
            cursor: "pointer",
            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </g>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (
      tooltipConfig?.show === false ||
      !active ||
      !payload ||
      !payload.length
    ) {
      return null;
    }

    const current = payload[0];
    const itemData = current.payload as PieChartItem;
    const val = Number(current.value) || 0;
    const percentage =
      total > 0 ? Math.round((val / total) * 100) : 0;
    const formattedVal = tooltipConfig?.formatter
      ? tooltipConfig.formatter(val)
      : val.toLocaleString();

    const itemColor =
      itemData.color ??
      DEFAULT_COLORS[
        data.findIndex((d) => d.name === itemData.name) % DEFAULT_COLORS.length
      ];

    return (
      <div className="gy-piechart-tooltip">
        <div className="gy-piechart-tooltip-header">
          <span
            className="gy-piechart-tooltip-badge"
            style={{ backgroundColor: itemColor }}
          />
          <span className="gy-piechart-tooltip-title">{itemData.name}</span>
        </div>
        <div className="gy-piechart-tooltip-row">
          <span className="gy-piechart-tooltip-value">{formattedVal}</span>
          <span className="gy-piechart-tooltip-percentage">
            ({percentage}%)
          </span>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div
          className="gy-piechart-skeleton-container"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Skeleton
            variant="circular"
            width={isCompact ? "130px" : "160px"}
            height={isCompact ? "130px" : "160px"}
            style={{ borderRadius: "50%" }}
          />
          <div
            style={{
              display: "flex",
              gap: "8px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Skeleton variant="text" width="60px" height="14px" />
            <Skeleton variant="text" width="80px" height="14px" />
            <Skeleton variant="text" width="70px" height="14px" />
          </div>
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div className="gy-piechart-empty">No data available</div>
      );
    }

    return (
      <div className="gy-piechart-body" onMouseLeave={handleResetActive}>
        <div className="gy-piechart-chart-wrapper" onMouseLeave={handleResetActive}>
          <ResponsiveContainer width="100%" height="100%">
            <ReChartsPieChart
              onMouseMove={(state: any) => {
                if (
                  !state ||
                  state.isTooltipActive === false ||
                  !state.activePayload ||
                  state.activePayload.length === 0
                ) {
                  if (activeIndex !== null) {
                    handleResetActive();
                  }
                }
              }}
              onMouseLeave={handleResetActive}
            >
              {tooltipConfig?.show !== false && (
                <RechartsTooltip
                  content={<CustomTooltip />}
                  allowEscapeViewBox={{ x: true, y: true }}
                  wrapperStyle={{ outline: "none", zIndex: 100, pointerEvents: "none" }}
                />
              )}
              <Pie
                activeIndex={activeIndex !== null ? activeIndex : undefined}
                activeShape={renderActiveShape}
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={innerRadius}
                outerRadius={effectiveOuterRadius}
                stroke="var(--gy-surface, #ffffff)"
                strokeWidth={2}
                paddingAngle={effectivePaddingAngle}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={handleResetActive}
                onClick={(entry, index) => onItemClick?.(entry, index)}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.color ??
                      DEFAULT_COLORS[index % DEFAULT_COLORS.length]
                    }
                    style={{
                      transition:
                        "opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s ease",
                      opacity:
                        activeIndex !== null && activeIndex !== index
                          ? 0.55
                          : 1,
                      cursor: "pointer",
                    }}
                  />
                ))}
              </Pie>
            </ReChartsPieChart>
          </ResponsiveContainer>
        </div>

        {/* Responsive Interactive Legend */}
        {showLegend && data.length > 0 && (
          <div className="gy-piechart-legend" onMouseLeave={handleResetActive}>
            {data.map((entry, index) => {
              const itemColor =
                entry.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length];
              const isHovered = activeIndex === index;
              const percentage =
                total > 0 ? Math.round((entry.value / total) * 100) : 0;

              return (
                <button
                  key={`legend-${index}`}
                  type="button"
                  className={`gy-piechart-legend-item ${
                    isHovered ? "gy-piechart-legend-item--active" : ""
                  } ${
                    activeIndex !== null && !isHovered
                      ? "gy-piechart-legend-item--dimmed"
                      : ""
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={handleResetActive}
                  onClick={() => onItemClick?.(entry, index)}
                >
                  <span
                    className="gy-piechart-legend-dot"
                    style={{ backgroundColor: itemColor }}
                  />
                  <span className="gy-piechart-legend-label">
                    {entry.name}
                  </span>
                  <span className="gy-piechart-legend-percentage">
                    {percentage}%
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const wrapperStyle: React.CSSProperties = {
    height: typeof height === "number" ? `${height}px` : height,
    width: typeof width === "number" ? `${width}px` : width,
    ...tokens,
  };

  const rootClasses = [
    "gy-piechart",
    isCompact ? "gy-piechart--compact" : "",
    borderless ? "gy-piechart--borderless" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={containerRef}
      className={rootClasses}
      style={wrapperStyle}
      onMouseLeave={handleResetActive}
      onPointerLeave={handleResetActive}
    >
      {renderContent()}
    </div>
  );
}
