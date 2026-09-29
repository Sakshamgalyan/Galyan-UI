"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  RadarChart as ReChartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  type TooltipProps,
} from "recharts";
import type { ValueType } from "recharts/types/component/DefaultTooltipContent";
import { Skeleton } from "../skeleton/Skeleton";
import { EmptyState } from "../emptystate/EmptyState";
import "./radar-chart.css";
import { Typography } from "../typography";

export interface RadarChartSeries {
  key: string;
  name?: string;
  color?: string;
}

export interface RadarChartTooltipConfig {
  show?: boolean;
  formatter?: (value: number, name?: string) => string;
}

export interface RadarChartProps {
  data: object[];
  series: RadarChartSeries[];
  angleKey: string;
  variant?: "standard" | "filled" | "dots";
  height?: number | string;
  width?: number | string;
  showGrid?: boolean;
  showLegend?: boolean;
  gridType?: "polygon" | "circle";
  loading?: boolean;
  className?: string;
  responsive?: boolean;
  tooltipConfig?: RadarChartTooltipConfig;
  tokens?: Record<string, string>;
  onSeriesClick?: (series: RadarChartSeries, index: number) => void;
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

export function RadarChart({
  data = [],
  series = [],
  angleKey,
  variant = "filled",
  height = 340,
  width = "100%",
  showGrid = true,
  showLegend = true,
  gridType = "polygon",
  loading = false,
  className = "",
  responsive = true,
  tooltipConfig = { show: true },
  tokens,
  onSeriesClick,
  animate = true,
  animationDuration = 1000,
  animationEasing = "ease-out",
  animationBegin,
}: RadarChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSeriesKey, setActiveSeriesKey] = useState<string | null>(null);
  const [isCompact, setIsCompact] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // ResizeObserver for responsive observation and reliable animation mount
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
      setIsCompact(el.clientWidth < 440);
      setIsReady(true);
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          setIsCompact(w < 440);
          setIsReady(true);
        }
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [responsive]);

  const effectiveOuterRadius = isCompact ? "70%" : "78%";

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<ValueType, string>) => {
    if (
      tooltipConfig?.show === false ||
      !active ||
      !payload ||
      !payload.length
    ) {
      return null;
    }

    return (
      <div className="gy-radarchart-tooltip">
        <div className="gy-radarchart-tooltip-header">
          <Typography variant="span" className="gy-radarchart-tooltip-title">
            {label}
          </Typography>
        </div>
        <div className="gy-radarchart-tooltip-body">
          {payload.map((entry, i) => {
            const val = Number(entry.value) || 0;
            const formattedVal = tooltipConfig?.formatter
              ? tooltipConfig.formatter(val, entry.name)
              : val.toLocaleString();
            const seriesColor = entry.color || entry.stroke || entry.fill;
            const isHighlighted = activeSeriesKey === entry.dataKey;

            return (
              <div
                key={`tooltip-row-${i}`}
                className={`gy-radarchart-tooltip-row ${
                  isHighlighted ? "gy-radarchart-tooltip-row--highlight" : ""
                }`}
              >
                <div className="gy-radarchart-tooltip-series">
                  <span
                    className="gy-radarchart-tooltip-badge"
                    style={{ backgroundColor: seriesColor }}
                  />
                  <Typography
                    variant="span"
                    className="gy-radarchart-tooltip-name"
                  >
                    {entry.name}
                  </Typography>
                </div>
                <Typography
                  variant="span"
                  className="gy-radarchart-tooltip-val"
                >
                  {formattedVal}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div
          className="gy-radarchart-skeleton-container"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Skeleton
            variant="circular"
            width={isCompact ? "140px" : "180px"}
            height={isCompact ? "140px" : "180px"}
            style={{ borderRadius: "50%" }}
          />
          <div style={{ display: "flex", gap: "8px" }}>
            <Skeleton variant="text" width="70px" height="14px" />
            <Skeleton variant="text" width="70px" height="14px" />
          </div>
        </div>
      );
    }

    if (data.length === 0) {
      return <EmptyState size="sm" variant="subtle" />;
    }

    return (
      <div className="gy-radarchart-body">
        <div className="gy-radarchart-chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <ReChartsRadarChart
              cx="50%"
              cy="50%"
              outerRadius={effectiveOuterRadius}
              data={data}
            >
              {showGrid && (
                <PolarGrid
                  gridType={gridType}
                  stroke="var(--gy-border, #e2e8f0)"
                />
              )}
              <PolarAngleAxis
                dataKey={angleKey}
                tick={{
                  fill: "var(--gy-text-muted, #64748b)",
                  fontSize: isCompact ? 10 : 11,
                  fontWeight: 500,
                }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, "auto"]}
                tick={{
                  fill: "var(--gy-text-muted, #64748b)",
                  fontSize: isCompact ? 9 : 10,
                }}
                stroke="var(--gy-border, #e2e8f0)"
              />

              {tooltipConfig?.show !== false && (
                <RechartsTooltip
                  content={<CustomTooltip />}
                  wrapperStyle={{ outline: "none", zIndex: 100 }}
                />
              )}

              {series.map((s, i) => {
                const color =
                  s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];
                const isHovered = activeSeriesKey === s.key;
                const isDimmed = activeSeriesKey !== null && !isHovered;

                const strokeWidth = isHovered ? 3.5 : 2;
                const fillOpacity =
                  variant === "filled"
                    ? isHovered
                      ? 0.55
                      : isDimmed
                        ? 0.15
                        : 0.35
                    : 0;

                return (
                  <Radar
                    key={
                      isReady ? `radar-${s.key}-ready` : `radar-${s.key}-init`
                    }
                    name={s.name ?? s.key}
                    dataKey={s.key}
                    stroke={color}
                    fill={color}
                    strokeWidth={strokeWidth}
                    fillOpacity={fillOpacity}
                    isAnimationActive={animate}
                    animationDuration={animationDuration}
                    animationEasing={animationEasing}
                    animationBegin={animationBegin ?? i * 150}
                    dot={
                      variant === "dots" || isHovered
                        ? {
                            r: isHovered ? 5 : 3.5,
                            fill: color,
                            stroke: "var(--gy-surface, #ffffff)",
                            strokeWidth: 2,
                          }
                        : false
                    }
                    style={{
                      transition: "opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                      opacity: isDimmed ? 0.35 : 1,
                      cursor: "pointer",
                      filter: isHovered
                        ? "drop-shadow(0 4px 10px rgba(0, 0, 0, 0.18))"
                        : "none",
                    }}
                    onMouseEnter={() => setActiveSeriesKey(s.key)}
                    onMouseLeave={() => setActiveSeriesKey(null)}
                    onClick={() => onSeriesClick?.(s, i)}
                  />
                );
              })}
            </ReChartsRadarChart>
          </ResponsiveContainer>
        </div>

        {/* Responsive Interactive Legend */}
        {showLegend && series.length > 0 && (
          <div className="gy-radarchart-legend">
            {series.map((s, index) => {
              const itemColor =
                s.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length];
              const isHovered = activeSeriesKey === s.key;

              return (
                <button
                  key={`legend-${index}`}
                  type="button"
                  className={`gy-radarchart-legend-item ${
                    isHovered ? "gy-radarchart-legend-item--active" : ""
                  } ${
                    activeSeriesKey !== null && !isHovered
                      ? "gy-radarchart-legend-item--dimmed"
                      : ""
                  }`}
                  onMouseEnter={() => setActiveSeriesKey(s.key)}
                  onMouseLeave={() => setActiveSeriesKey(null)}
                  onClick={() => onSeriesClick?.(s, index)}
                >
                  <span
                    className="gy-radarchart-legend-dot"
                    style={{ backgroundColor: itemColor }}
                  />
                  <Typography
                    variant="span"
                    className="gy-radarchart-legend-label"
                  >
                    {s.name ?? s.key}
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

  return (
    <div
      ref={containerRef}
      className={`gy-radarchart ${isCompact ? "gy-radarchart--compact" : ""} ${className}`}
      style={wrapperStyle}
    >
      {renderContent()}
    </div>
  );
}
