"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Skeleton } from "../skeleton/Skeleton";
import "./timeline-chart.css";

export interface TimelineItem {
  label: string;
  start: number; // numeric timestamp or relative day/unit
  end: number;
  color?: string;
  progress?: number; // optional 0-100%
  [key: string]: any;
}

export interface TimelineTooltipConfig {
  show?: boolean;
  unit?: string;
  formatter?: (
    start: number,
    end: number,
    item: TimelineItem
  ) => React.ReactNode;
}

export interface TimelineChartProps {
  data: TimelineItem[];
  height?: number | string;
  width?: number | string;
  showGrid?: boolean;
  showSummaryHeader?: boolean;
  summaryTitle?: string;
  unit?: string; // default "Day" or "d"
  loading?: boolean;
  className?: string;
  responsive?: boolean;
  tooltipConfig?: TimelineTooltipConfig;
  tokens?: Record<string, string>;
  onItemClick?: (item: TimelineItem, index: number) => void;
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

export function TimelineChart({
  data = [],
  height = 340,
  width = "100%",
  showGrid = true,
  showSummaryHeader = true,
  summaryTitle = "Project Timeline",
  unit = "Day",
  loading = false,
  className = "",
  responsive = true,
  tooltipConfig = { show: true },
  tokens,
  onItemClick,
}: TimelineChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isCompact, setIsCompact] = useState(false);

  // ResizeObserver for responsive observation
  useEffect(() => {
    if (!responsive) return;
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        setIsCompact(w > 0 && w < 480);
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [responsive]);

  const { minStart, maxEnd, totalSpan } = useMemo(() => {
    if (data.length === 0) return { minStart: 0, maxEnd: 0, totalSpan: 0 };
    const starts = data.map((d) => d.start);
    const ends = data.map((d) => d.end);
    const minS = Math.min(...starts);
    const maxE = Math.max(...ends);
    return { minStart: minS, maxEnd: maxE, totalSpan: maxE - minS };
  }, [data]);

  // Formatted data converting start/end into floating range bar structure
  const formattedData = useMemo(() => {
    return data.map((d, index) => {
      const duration = Math.max(0, d.end - d.start);
      return {
        ...d,
        start: d.start,
        duration,
        color: d.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length],
      };
    });
  }, [data]);

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
    const itemData = current.payload as TimelineItem & { duration: number };
    const start = itemData.start;
    const end = itemData.end;
    const duration = itemData.duration;
    const itemColor =
      itemData.color ??
      DEFAULT_COLORS[
        data.findIndex((d) => d.label === itemData.label) %
          DEFAULT_COLORS.length
      ];

    if (tooltipConfig?.formatter) {
      return (
        <div className="gy-timeline-tooltip">
          {tooltipConfig.formatter(start, end, itemData)}
        </div>
      );
    }

    return (
      <div className="gy-timeline-tooltip">
        <div className="gy-timeline-tooltip-header">
          <span
            className="gy-timeline-tooltip-badge"
            style={{ backgroundColor: itemColor }}
          />
          <span className="gy-timeline-tooltip-title">{itemData.label}</span>
        </div>
        <div className="gy-timeline-tooltip-body">
          <div className="gy-timeline-tooltip-row">
            <span className="gy-timeline-tooltip-label">Start:</span>
            <span className="gy-timeline-tooltip-val">
              {unit ? `${unit} ${start}` : start}
            </span>
          </div>
          <div className="gy-timeline-tooltip-row">
            <span className="gy-timeline-tooltip-label">End:</span>
            <span className="gy-timeline-tooltip-val">
              {unit ? `${unit} ${end}` : end}
            </span>
          </div>
          <div className="gy-timeline-tooltip-row gy-timeline-tooltip-row--highlight">
            <span className="gy-timeline-tooltip-label">Duration:</span>
            <span className="gy-timeline-tooltip-val">
              {duration} {duration === 1 ? unit : `${unit}s`}
            </span>
          </div>
          {itemData.progress !== undefined && (
            <div className="gy-timeline-tooltip-row">
              <span className="gy-timeline-tooltip-label">Progress:</span>
              <span className="gy-timeline-tooltip-val">
                {itemData.progress}%
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div
          className="gy-timeline-skeleton-container"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            height: "100%",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Skeleton variant="text" width="100px" height="14px" />
            <Skeleton variant="text" width="60px" height="14px" />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              height: "75%",
              width: "100%",
              justifyContent: "space-around",
            }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  width: "100%",
                }}
              >
                <Skeleton variant="text" width="70px" height="12px" />
                <Skeleton
                  variant="rectangular"
                  width={`${40 + ((i * 13) % 45)}%`}
                  height="16px"
                  style={{
                    borderRadius: "4px",
                    marginLeft: `${(i * 10) % 30}%`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (data.length === 0) {
      return <div className="gy-timeline-empty">No data available</div>;
    }

    const yAxisWidth = isCompact ? 75 : 110;

    return (
      <div className="gy-timeline-body">
        {showSummaryHeader && (
          <div className="gy-timeline-header">
            <span className="gy-timeline-title">{summaryTitle}</span>
            <div className="gy-timeline-badges">
              <span className="gy-timeline-badge">
                Tasks: <strong>{data.length}</strong>
              </span>
              <span className="gy-timeline-badge gy-timeline-badge--span">
                Span:{" "}
                <strong>
                  {totalSpan} {unit ? `${unit}s` : ""}
                </strong>
              </span>
            </div>
          </div>
        )}

        <div className="gy-timeline-chart-area">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={formattedData}
              layout="vertical"
              margin={{
                top: 4,
                right: 16,
                left: 0,
                bottom: 0,
              }}
            >
              {showGrid && (
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--gy-border, #e2e8f0)"
                  horizontal={false}
                />
              )}

              <XAxis
                type="number"
                stroke="var(--gy-border, #e2e8f0)"
                tick={{
                  fill: "var(--gy-text-muted, #64748b)",
                  fontSize: isCompact ? 10 : 11,
                }}
                tickLine={{ stroke: "var(--gy-border, #e2e8f0)" }}
                unit={unit ? ` ${unit.slice(0, 1)}` : undefined}
              />

              <YAxis
                dataKey="label"
                type="category"
                width={yAxisWidth}
                stroke="var(--gy-border, #e2e8f0)"
                tick={{
                  fill: "var(--gy-text-muted, #64748b)",
                  fontSize: isCompact ? 10 : 11,
                  fontWeight: 500,
                }}
                tickLine={{ stroke: "var(--gy-border, #e2e8f0)" }}
              />

              {tooltipConfig?.show !== false && (
                <RechartsTooltip
                  content={<CustomTooltip />}
                  cursor={{
                    fill: "var(--gy-background-subtle, rgba(0,0,0,0.03))",
                  }}
                  wrapperStyle={{ outline: "none", zIndex: 100 }}
                />
              )}

              {/* Transparent spacer bar to float the task duration bar */}
              <Bar
                dataKey="start"
                stackId="timeline"
                fill="transparent"
                isAnimationActive={false}
              />

              {/* Floating Task Bar with Hover Elevation */}
              <Bar
                dataKey="duration"
                stackId="timeline"
                radius={[4, 4, 4, 4]}
                maxBarSize={isCompact ? 18 : 22}
                onMouseEnter={(_, index) => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={(entry, index) =>
                  onItemClick?.(data[index]!, index)
                }
              >
                {formattedData.map((entry, index) => {
                  const isHovered = hoveredIndex === index;

                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      fillOpacity={
                        hoveredIndex === null
                          ? 0.92
                          : isHovered
                            ? 1
                            : 0.45
                      }
                      stroke={
                        isHovered ? "var(--gy-text, #0f172a)" : "none"
                      }
                      strokeWidth={isHovered ? 1.5 : 0}
                      style={{
                        transition:
                          "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                        cursor: "pointer",
                        filter: isHovered
                          ? "drop-shadow(0 4px 10px rgba(0, 0, 0, 0.18))"
                          : "none",
                      }}
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
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
      className={`gy-timelinechart ${isCompact ? "gy-timelinechart--compact" : ""} ${className}`}
      style={wrapperStyle}
    >
      {renderContent()}
    </div>
  );
}
