"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  PieChart as ReChartsPieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Sector,
  type TooltipProps,
} from "recharts";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import type { CategoricalChartState } from "recharts/types/chart/types";
import { Skeleton } from "../skeleton/Skeleton";
import { EmptyState } from "../emptystate/EmptyState";
import "./pie-chart.css";
import { Typography } from "../typography";

export interface PieChartItem {
  name: string;
  value: number;
  color?: string;
  [key: string]: unknown;
}

/** Sector props Recharts passes to `activeShape` (the subset used here). */
interface ActiveSectorShapeProps {
  cx?: number;
  cy?: number;
  innerRadius?: number;
  outerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  fill?: string;
  payload?: PieChartItem;
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
  cornerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  stroke?: string;
  strokeWidth?: number;
  loading?: boolean;
  borderless?: boolean;
  className?: string;
  responsive?: boolean;
  tooltipConfig?: PieChartTooltipConfig;
  tokens?: Record<string, string>;
  onItemClick?: (item: PieChartItem, index: number) => void;
  animate?: boolean;
  animationDuration?: number;
  animationEasing?: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear";
  animationBegin?: number;
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
  paddingAngle = 0,
  cornerRadius = 0,
  startAngle = 0,
  endAngle = 360,
  stroke,
  strokeWidth,
  loading = false,
  borderless = false,
  className = "",
  responsive = true,
  tooltipConfig = { show: true },
  tokens,
  onItemClick,
  animate = true,
  animationDuration = 1000,
  animationEasing = "ease-out",
  animationBegin = 0,
}: PieChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isCompact, setIsCompact] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const handleResetActive = () => {
    setActiveIndex(null);
  };

  // ResizeObserver for responsive observation of width & height
  useEffect(() => {
    if (!responsive) {
      setIsReady(true);
      return;
    }
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") {
      setIsReady(true);
      return;
    }

    if (el.clientWidth > 0 && el.clientHeight > 0) {
      setContainerSize({ width: el.clientWidth, height: el.clientHeight });
      setIsCompact(el.clientWidth < 440);
      setIsReady(true);
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          setContainerSize({ width: w, height: h });
          setIsCompact(w < 440);
          setIsReady(true);
        }
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [responsive]);

  const total = useMemo(() => {
    return data.reduce((acc, curr) => acc + (curr.value || 0), 0);
  }, [data]);

  const effectivePaddingAngle =
    paddingAngle !== undefined ? paddingAngle : variant === "segmented" ? 4 : 0;

  const effectiveStroke =
    stroke ??
    (strokeWidth && strokeWidth > 0 ? "var(--gy-surface, #ffffff)" : "none");
  const effectiveStrokeWidth =
    strokeWidth ?? (stroke && stroke !== "none" ? 1 : 0);

  // Determine available chart area height and width dynamically
  const measuredW =
    containerSize.width || (typeof width === "number" ? width : 320);
  const measuredH =
    containerSize.height || (typeof height === "number" ? height : 320);

  const isSmall = isCompact || (measuredW > 0 && measuredW < 440);

  // Dynamically estimate legend height based on item count and container width
  const legendH = useMemo(() => {
    if (!showLegend || data.length === 0) return 0;
    if (isSmall || measuredW < 380) {
      if (data.length <= 2) return 36;
      if (data.length <= 4) return 66;
      if (data.length <= 6) return 92;
      return 110;
    }
    if (data.length <= 3) return 36;
    if (data.length <= 6) return 64;
    return 88;
  }, [showLegend, data.length, isSmall, measuredW]);

  const padX = containerSize.width ? 8 : borderless ? 0 : isSmall ? 20 : 32;
  const padY = containerSize.height ? 8 : borderless ? 0 : isSmall ? 20 : 32;

  const availableChartW = Math.max(60, measuredW - padX);
  const availableChartH = Math.max(60, measuredH - padY - legendH);

  // Maximum safe outer radius that guarantees NO clipping on hover expansion or shadow
  const maxSafeOuter = Math.max(
    25,
    Math.floor(Math.min(availableChartW, availableChartH) / 2) - 8,
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
  const renderActiveShape = ({
    cx,
    cy,
    innerRadius: inRad,
    outerRadius: outRad,
    startAngle,
    endAngle,
    fill,
    payload,
  }: ActiveSectorShapeProps) => {
    const hoverExpansion = isCompact ? 4 : 6;
    const numOutRad =
      typeof outRad === "number" ? outRad + hoverExpansion : outRad;
    const numInRad = typeof inRad === "number" ? Math.max(0, inRad - 1) : inRad;

    return (
      <g className="gy-piechart-active-slice" onMouseLeave={handleResetActive}>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={numInRad}
          outerRadius={numOutRad}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          stroke={effectiveStroke}
          strokeWidth={effectiveStrokeWidth}
          cornerRadius={cornerRadius}
          onMouseLeave={handleResetActive}
          onClick={() => {
            if (payload) onItemClick?.(payload, activeIndex ?? 0);
          }}
          style={{
            filter: "drop-shadow(0 6px 14px rgba(0, 0, 0, 0.16))",
            cursor: "pointer",
            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </g>
    );
  };

  const CustomTooltip = ({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) => {
    if (
      tooltipConfig?.show === false ||
      !active ||
      !payload ||
      !payload.length
    ) {
      return null;
    }

    const current = payload[0];
    if (!current) return null;
    const itemData = current.payload as PieChartItem;
    const val = Number(current.value) || 0;
    const percentage = total > 0 ? Math.round((val / total) * 100) : 0;
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
          <Typography variant="span" className="gy-piechart-tooltip-title">
            {itemData.name}
          </Typography>
        </div>
        <div className="gy-piechart-tooltip-row">
          <Typography variant="span" className="gy-piechart-tooltip-value">
            {formattedVal}
          </Typography>
          <Typography variant="span" className="gy-piechart-tooltip-percentage">
            ({percentage}%)
          </Typography>
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
      return <EmptyState size="sm" variant="subtle" />;
    }

    return (
      <div className="gy-piechart-body" onMouseLeave={handleResetActive}>
        <div
          className="gy-piechart-chart-wrapper"
          onMouseLeave={handleResetActive}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ReChartsPieChart
              onMouseMove={(state: CategoricalChartState) => {
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
                  wrapperStyle={{
                    outline: "none",
                    zIndex: 100,
                    pointerEvents: "none",
                  }}
                />
              )}
              <Pie
                key={isReady ? "piechart-ready" : "piechart-init"}
                activeIndex={activeIndex !== null ? activeIndex : undefined}
                activeShape={renderActiveShape}
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={innerRadius}
                outerRadius={effectiveOuterRadius}
                stroke={effectiveStroke}
                strokeWidth={effectiveStrokeWidth}
                paddingAngle={effectivePaddingAngle}
                cornerRadius={cornerRadius}
                isAnimationActive={animate}
                animationDuration={animationDuration}
                animationEasing={animationEasing}
                animationBegin={animationBegin}
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
                    stroke={effectiveStroke}
                    strokeWidth={effectiveStrokeWidth}
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
                  <Typography
                    variant="span"
                    className="gy-piechart-legend-label"
                  >
                    {entry.name}
                  </Typography>
                  <Typography
                    variant="span"
                    className="gy-piechart-legend-percentage"
                  >
                    {percentage}%
                  </Typography>
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
