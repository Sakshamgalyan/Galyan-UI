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
import "./donut-chart.css";

export interface DonutChartItem {
  name: string;
  value: number;
  color?: string;
  [key: string]: any;
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
  paddingAngle = 3,
  cornerRadius = 4,
  loading = false,
  borderless = false,
  className = "",
  responsive = true,
  showCenterMetric = true,
  centerMetric,
  tooltipConfig = { show: true },
  tokens,
  onItemClick,
}: DonutChartProps) {
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

  const isSemi = variant === "semi";
  const startAngle = isSemi ? 180 : 90;
  const endAngle = isSemi ? 0 : -270;
  const cy = isSemi ? "80%" : "50%";

  // Determine available chart area height and width dynamically
  const measuredW = containerSize.width || (typeof width === "number" ? width : 320);
  const measuredH = containerSize.height || (typeof height === "number" ? height : 320);

  const padX = isCompact || borderless ? 16 : 28;
  const padY = isCompact || borderless ? 14 : 24;
  const legendH = showLegend && data.length > 0 ? (data.length > 4 ? 60 : 42) : 0;
  const availableChartW = Math.max(60, measuredW - padX);
  const availableChartH = Math.max(60, measuredH - padY - legendH);

  // Maximum safe outer radius that guarantees NO clipping on hover, stroke, or shadows
  const maxSafeOuter = isSemi
    ? Math.max(25, Math.floor(Math.min(availableChartW / 2, availableChartH) - 12))
    : Math.max(25, Math.floor(Math.min(availableChartW, availableChartH) / 2) - 12);

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

  // Elevated Active Sector shape on hover
  const renderActiveShape = (props: any) => {
    const {
      cx,
      cy: activeCy,
      innerRadius: inRad,
      outerRadius: outRad,
      startAngle: sAngle,
      endAngle: eAngle,
      fill,
    } = props;

    const hoverExpansion = isCompact ? 4 : 6;
    const numInRad =
      typeof inRad === "number" ? Math.max(0, inRad - 1) : inRad;
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
          stroke="var(--gy-surface, #ffffff)"
          strokeWidth={2}
          cornerRadius={cornerRadius}
          onMouseLeave={handleResetActive}
          onClick={(entry) => onItemClick?.(props.payload ?? entry, activeIndex ?? 0)}
          style={{
            filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.16))",
            cursor: "pointer",
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
    const itemData = current.payload as DonutChartItem;
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
      <div className="gy-donutchart-tooltip">
        <div className="gy-donutchart-tooltip-header">
          <span
            className="gy-donutchart-tooltip-badge"
            style={{ backgroundColor: itemColor }}
          />
          <span className="gy-donutchart-tooltip-title">{itemData.name}</span>
        </div>
        <div className="gy-donutchart-tooltip-row">
          <span className="gy-donutchart-tooltip-value">{formattedVal}</span>
          <span className="gy-donutchart-tooltip-percentage">
            ({percentage}%)
          </span>
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
      return (
        <div className="gy-donutchart-empty">No data available</div>
      );
    }

    const hoveredPct =
      hoveredItem && total > 0
        ? Math.round((hoveredItem.value / total) * 100)
        : null;

    return (
      <div className="gy-donutchart-body" onMouseLeave={handleResetActive}>
        <div className="gy-donutchart-chart-wrapper" onMouseLeave={handleResetActive}>
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
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={effectiveInnerRadius}
                outerRadius={effectiveOuterRadius}
                stroke="var(--gy-surface, #ffffff)"
                strokeWidth={2}
                paddingAngle={paddingAngle}
                cornerRadius={cornerRadius}
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
              <span className="gy-donutchart-center-value">
                {hoveredItem
                  ? tooltipConfig?.formatter
                    ? tooltipConfig.formatter(hoveredItem.value)
                    : hoveredItem.value.toLocaleString()
                  : centerMetric?.value ??
                    (tooltipConfig?.formatter
                      ? tooltipConfig.formatter(total)
                      : total.toLocaleString())}
              </span>
              <span className="gy-donutchart-center-label">
                {hoveredItem
                  ? `${hoveredItem.name}${hoveredPct !== null ? ` (${hoveredPct}%)` : ""}`
                  : centerMetric?.label ?? "Total"}
              </span>
            </div>
          )}

          {showCenterMetric && variant === "semi" && (
            <div
              className="gy-donutchart-center-metric gy-donutchart-center-metric--semi"
              onMouseEnter={handleResetActive}
            >
              <span className="gy-donutchart-center-value">
                {hoveredItem
                  ? tooltipConfig?.formatter
                    ? tooltipConfig.formatter(hoveredItem.value)
                    : hoveredItem.value.toLocaleString()
                  : centerMetric?.value ??
                    (tooltipConfig?.formatter
                      ? tooltipConfig.formatter(total)
                      : total.toLocaleString())}
              </span>
              <span className="gy-donutchart-center-label">
                {hoveredItem
                  ? `${hoveredItem.name}${hoveredPct !== null ? ` (${hoveredPct}%)` : ""}`
                  : centerMetric?.label ?? "Total"}
              </span>
            </div>
          )}
        </div>

        {/* Responsive Interactive Legend */}
        {showLegend && data.length > 0 && (
          <div className="gy-donutchart-legend" onMouseLeave={handleResetActive}>
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
                  <span className="gy-donutchart-legend-label" title={entry.name}>
                    {entry.name}
                  </span>
                  <span className="gy-donutchart-legend-percentage">
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
