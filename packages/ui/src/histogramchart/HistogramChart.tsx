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
import "./histogram-chart.css";

export interface HistogramItem {
  bin: string; // e.g. "0-10", "10-20"
  frequency: number;
  color?: string;
  [key: string]: any;
}

export interface HistogramTooltipConfig {
  show?: boolean;
  formatter?: (value: number) => string;
}

export interface HistogramChartProps {
  data: HistogramItem[];
  height?: number | string;
  width?: number | string;
  color?: string; // default: var(--gy-primary, #3b82f6)
  showGrid?: boolean;
  showSummaryHeader?: boolean;
  summaryTitle?: string;
  loading?: boolean;
  className?: string;
  responsive?: boolean;
  barCategoryGap?: number | string;
  tooltipConfig?: HistogramTooltipConfig;
  tokens?: Record<string, string>;
  onBarClick?: (item: HistogramItem, index: number) => void;
}

export function HistogramChart({
  data = [],
  height = 320,
  width = "100%",
  color = "var(--gy-primary, #3b82f6)",
  showGrid = true,
  showSummaryHeader = true,
  summaryTitle = "Distribution",
  loading = false,
  className = "",
  responsive = true,
  barCategoryGap = 2,
  tooltipConfig = { show: true },
  tokens,
  onBarClick,
}: HistogramChartProps) {
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

  const totalCount = useMemo(() => {
    return data.reduce((acc, curr) => acc + (curr.frequency || 0), 0);
  }, [data]);

  const peakItem = useMemo(() => {
    if (!data || data.length === 0) return null;
    return data.reduce(
      (max, d) => (!max || d.frequency > max.frequency ? d : max),
      data[0]
    );
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
    const itemData = current.payload as HistogramItem;
    const count = Number(itemData.frequency) || 0;
    const percentage =
      totalCount > 0
        ? ((count / totalCount) * 100).toFixed(1)
        : "0";
    const formattedCount = tooltipConfig?.formatter
      ? tooltipConfig.formatter(count)
      : count.toLocaleString();

    const barColor = itemData.color || color;

    return (
      <div className="gy-histogram-tooltip">
        <div className="gy-histogram-tooltip-header">
          <span
            className="gy-histogram-tooltip-badge"
            style={{ backgroundColor: barColor }}
          />
          <span className="gy-histogram-tooltip-title">
            Bin: {itemData.bin}
          </span>
        </div>
        <div className="gy-histogram-tooltip-body">
          <div className="gy-histogram-tooltip-row">
            <span className="gy-histogram-tooltip-label">Frequency:</span>
            <span className="gy-histogram-tooltip-val">
              {formattedCount}
            </span>
          </div>
          <div className="gy-histogram-tooltip-row gy-histogram-tooltip-row--highlight">
            <span className="gy-histogram-tooltip-label">Share:</span>
            <span className="gy-histogram-tooltip-val">{percentage}%</span>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div
          className="gy-histogram-skeleton-container"
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
            <Skeleton variant="text" width="90px" height="14px" />
            <Skeleton variant="text" width="60px" height="14px" />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "4px",
              height: "75%",
              width: "100%",
            }}
          >
            {["30%", "60%", "90%", "70%", "40%", "20%"].map((h, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                width="100%"
                height={h}
                style={{ borderRadius: "4px 4px 0 0" }}
              />
            ))}
          </div>
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div className="gy-histogram-empty">No data available</div>
      );
    }

    const isRotated = isCompact && data.length > 5;

    return (
      <div className="gy-histogram-body">
        {showSummaryHeader && (
          <div className="gy-histogram-header">
            <span className="gy-histogram-title">{summaryTitle}</span>
            <div className="gy-histogram-badges">
              <span className="gy-histogram-badge">
                Total:{" "}
                <strong>
                  {tooltipConfig?.formatter
                    ? tooltipConfig.formatter(totalCount)
                    : totalCount.toLocaleString()}
                </strong>
              </span>
              {peakItem && (
                <span className="gy-histogram-badge gy-histogram-badge--peak">
                  Peak: <strong>{peakItem.bin}</strong>
                </span>
              )}
            </div>
          </div>
        )}

        <div className="gy-histogram-chart-area">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 8,
                right: 8,
                left: isCompact ? -18 : -10,
                bottom: isRotated ? 18 : 0,
              }}
              barCategoryGap={barCategoryGap}
            >
              <defs>
                <linearGradient
                  id="gy-histogram-grad"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={color} stopOpacity={0.95} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.7} />
                </linearGradient>
              </defs>

              {showGrid && (
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--gy-border, #e2e8f0)"
                  vertical={false}
                />
              )}

              <XAxis
                dataKey="bin"
                stroke="var(--gy-border, #e2e8f0)"
                angle={isRotated ? -30 : 0}
                textAnchor={isRotated ? "end" : "middle"}
                tick={{
                  fill: "var(--gy-text-muted, #64748b)",
                  fontSize: isCompact ? 10 : 11,
                }}
                tickLine={{ stroke: "var(--gy-border, #e2e8f0)" }}
              />

              <YAxis
                stroke="var(--gy-border, #e2e8f0)"
                tick={{
                  fill: "var(--gy-text-muted, #64748b)",
                  fontSize: isCompact ? 10 : 11,
                }}
                tickLine={{ stroke: "var(--gy-border, #e2e8f0)" }}
                allowDecimals={false}
              />

              {tooltipConfig?.show !== false && (
                <RechartsTooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "var(--gy-background-subtle, rgba(0,0,0,0.03))" }}
                  wrapperStyle={{ outline: "none", zIndex: 100 }}
                />
              )}

              <Bar
                dataKey="frequency"
                radius={[4, 4, 0, 0]}
                onMouseEnter={(_, index) => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={(entry, index) => onBarClick?.(entry, index)}
              >
                {data.map((entry, index) => {
                  const barColor = entry.color ?? color;
                  const isHovered = hoveredIndex === index;

                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={barColor}
                      fillOpacity={
                        hoveredIndex === null
                          ? 0.9
                          : isHovered
                            ? 1
                            : 0.55
                      }
                      stroke={isHovered ? "var(--gy-text, #0f172a)" : "none"}
                      strokeWidth={isHovered ? 1.5 : 0}
                      style={{
                        transition:
                          "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                        cursor: "pointer",
                        filter: isHovered
                          ? "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.14))"
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
      className={`gy-histogramchart ${isCompact ? "gy-histogramchart--compact" : ""} ${className}`}
      style={wrapperStyle}
    >
      {renderContent()}
    </div>
  );
}
