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
import "./donut-chart.css";
import { Typography } from "../typography";

export interface DonutChartItem {
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
  payload?: DonutChartItem;
}

export interface DonutChartTooltipConfig {
  show?: boolean;
  formatter?: (value: number) => string;
}

export interface DonutChartProps {
  data: DonutChartItem[];
  variant?: "standard" | "semi";
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
  showCenterMetric?: boolean;
  centerMetric?: {
    label?: string;
    value?: string | number;
  };
  tooltipConfig?: DonutChartTooltipConfig;
  tokens?: Record<string, string>;
  onItemClick?: (item: DonutChartItem, index: number) => void;
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

export function DonutChart({
  data = [],
  variant = "standard",
  height = 320,
  width = "100%",
  showLegend = true,
  innerRadius,
  outerRadius,
  paddingAngle = 4,
  cornerRadius = 6,
  startAngle: customStartAngle,
  endAngle: customEndAngle,
  stroke = "var(--gy-surface, #ffffff)",
  strokeWidth = 2,
  loading = false,
  borderless = false,
  className = "",
  responsive = true,
  showCenterMetric = true,
  centerMetric,
  tooltipConfig = { show: true },
  tokens,
  onItemClick,
  animate = true,
  animationDuration = 1000,
  animationEasing = "ease-out",
  animationBegin = 0,
}: DonutChartProps) {
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

  const isSemi = variant === "semi";
  const startAngle = customStartAngle ?? (isSemi ? 180 : 90);
  const endAngle = customEndAngle ?? (isSemi ? 0 : -270);
  const cy = isSemi ? "80%" : "50%";

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

  // Maximum safe outer radius that guarantees NO clipping on hover, stroke, or shadows
  const maxSafeOuter = isSemi
    ? Math.max(
        25,
        Math.floor(Math.min(availableChartW / 2, availableChartH) - 10),
      )
    : Math.max(
        25,
        Math.floor(Math.min(availableChartW, availableChartH) / 2) - 10,
      );

  const { effectiveInnerRadius, effectiveOuterRadius } = useMemo(() => {
    let outRad: number | string;
    let inRad: number | string;

    if (typeof outerRadius === "number") {
      // Scale down proportionally if provided pixel radius exceeds safe container bounds
      outRad = Math.min(outerRadius, maxSafeOuter);
      if (typeof innerRadius === "number") {
        const scale = outRad / outerRadius;
        inRad = Math.max(12, Math.round(innerRadius * scale));
      } else if (typeof innerRadius === "string") {
        inRad = innerRadius;
      } else {
        inRad = Math.round(outRad * 0.65);
      }
    } else if (typeof outerRadius === "string") {
      outRad = outerRadius;
      inRad = innerRadius ?? (isCompact ? "55%" : "60%");
    } else {
      // Automatic responsive radius computation
      outRad = maxSafeOuter;
      if (typeof innerRadius === "number") {
        inRad = Math.min(innerRadius, Math.max(12, Math.round(outRad * 0.75)));
      } else {
        inRad = Math.round(outRad * (isCompact ? 0.62 : 0.66));
      }
    }

    return { effectiveInnerRadius: inRad, effectiveOuterRadius: outRad };
  }, [outerRadius, innerRadius, maxSafeOuter, isCompact]);

  const effectiveStroke =
    stroke ??
    (strokeWidth && strokeWidth > 0 ? "var(--gy-surface, #ffffff)" : "none");
  const effectiveStrokeWidth =
    strokeWidth ?? (stroke && stroke !== "none" ? 1 : 0);

  // Elevated Active Sector shape on hover
  const renderActiveShape = ({
    cx,
    cy: activeCy,
    innerRadius: inRad,
    outerRadius: outRad,
    startAngle: sAngle,
    endAngle: eAngle,
    fill,
    payload,
  }: ActiveSectorShapeProps) => {
    const hoverExpansion = isCompact ? 4 : 6;
    const numInRad = typeof inRad === "number" ? Math.max(0, inRad - 1) : inRad;
    const numOutRad =
      typeof outRad === "number" ? outRad + hoverExpansion : outRad;

    return (
      <g
        className="gy-donutchart-active-slice"
        onMouseLeave={handleResetActive}
      >
        <Sector
          cx={cx}
          cy={activeCy}
          innerRadius={numInRad}
          outerRadius={numOutRad}
          startAngle={sAngle}
          endAngle={eAngle}
          fill={fill}
          stroke={effectiveStroke}
          strokeWidth={effectiveStrokeWidth}
          cornerRadius={cornerRadius}
          onMouseLeave={handleResetActive}
          onClick={() => {
            if (payload) onItemClick?.(payload, activeIndex ?? 0);
          }}
          style={{
            filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.16))",
            cursor: "pointer",
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
    const itemData = current.payload as DonutChartItem;
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
      <div className="gy-donutchart-tooltip">
        <div className="gy-donutchart-tooltip-header">
          <span
            className="gy-donutchart-tooltip-badge"
            style={{ backgroundColor: itemColor }}
          />
          <Typography variant="span" className="gy-donutchart-tooltip-title">
            {itemData.name}
          </Typography>
        </div>
        <div className="gy-donutchart-tooltip-row">
          <Typography variant="span" className="gy-donutchart-tooltip-value">
            {formattedVal}
          </Typography>
          <Typography
            variant="span"
            className="gy-donutchart-tooltip-percentage"
          >
            ({percentage}%)
          </Typography>
        </div>
      </div>
    );
  };

  const hoveredItem =
    activeIndex !== null && data[activeIndex] ? data[activeIndex] : null;

  const renderContent = () => {
    if (loading) {
      return (
        <div
          className="gy-donutchart-skeleton-container"
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

    const hoveredPct =
      hoveredItem && total > 0
        ? Math.round((hoveredItem.value / total) * 100)
        : null;

    return (
      <div className="gy-donutchart-body" onMouseLeave={handleResetActive}>
        <div
          className="gy-donutchart-chart-wrapper"
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
                key={isReady ? "donutchart-ready" : "donutchart-init"}
                activeIndex={activeIndex !== null ? activeIndex : undefined}
                activeShape={renderActiveShape}
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={effectiveInnerRadius}
                outerRadius={effectiveOuterRadius}
                stroke={effectiveStroke}
                strokeWidth={effectiveStrokeWidth}
                paddingAngle={paddingAngle}
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
                    style={{
                      transition:
                        "opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s ease, filter 0.25s ease",
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

          {/* Center Metric */}
          {showCenterMetric && variant === "standard" && (
            <div
              className="gy-donutchart-center-metric"
              onMouseEnter={handleResetActive}
            >
              <Typography variant="span" className="gy-donutchart-center-value">
                {hoveredItem
                  ? tooltipConfig?.formatter
                    ? tooltipConfig.formatter(hoveredItem.value)
                    : hoveredItem.value.toLocaleString()
                  : (centerMetric?.value ??
                    (tooltipConfig?.formatter
                      ? tooltipConfig.formatter(total)
                      : total.toLocaleString()))}
              </Typography>
              <Typography variant="span" className="gy-donutchart-center-label">
                {hoveredItem
                  ? `${hoveredItem.name}${hoveredPct !== null ? ` (${hoveredPct}%)` : ""}`
                  : (centerMetric?.label ?? "Total")}
              </Typography>
            </div>
          )}

          {showCenterMetric && variant === "semi" && (
            <div
              className="gy-donutchart-center-metric gy-donutchart-center-metric--semi"
              onMouseEnter={handleResetActive}
            >
              <Typography variant="span" className="gy-donutchart-center-value">
                {hoveredItem
                  ? tooltipConfig?.formatter
                    ? tooltipConfig.formatter(hoveredItem.value)
                    : hoveredItem.value.toLocaleString()
                  : (centerMetric?.value ??
                    (tooltipConfig?.formatter
                      ? tooltipConfig.formatter(total)
                      : total.toLocaleString()))}
              </Typography>
              <Typography variant="span" className="gy-donutchart-center-label">
                {hoveredItem
                  ? `${hoveredItem.name}${hoveredPct !== null ? ` (${hoveredPct}%)` : ""}`
                  : (centerMetric?.label ?? "Total")}
              </Typography>
            </div>
          )}
        </div>

        {/* Responsive Interactive Legend */}
        {showLegend && data.length > 0 && (
          <div
            className="gy-donutchart-legend"
            onMouseLeave={handleResetActive}
          >
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
                  className={`gy-donutchart-legend-item ${
                    isHovered ? "gy-donutchart-legend-item--active" : ""
                  } ${
                    activeIndex !== null && !isHovered
                      ? "gy-donutchart-legend-item--dimmed"
                      : ""
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={handleResetActive}
                  onClick={() => onItemClick?.(entry, index)}
                >
                  <span
                    className="gy-donutchart-legend-dot"
                    style={{ backgroundColor: itemColor }}
                  />
                  <Typography
                    variant="span"
                    className="gy-donutchart-legend-label"
                    title={entry.name}
                  >
                    {entry.name}
                  </Typography>
                  <Typography
                    variant="span"
                    className="gy-donutchart-legend-percentage"
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
    "gy-donutchart",
    isCompact ? "gy-donutchart--compact" : "",
    borderless ? "gy-donutchart--borderless" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={containerRef}
      className={rootClasses}
      style={wrapperStyle}
      onMouseLeave={() => setActiveIndex(null)}
      onPointerLeave={() => setActiveIndex(null)}
    >
      {renderContent()}
    </div>
  );
}
