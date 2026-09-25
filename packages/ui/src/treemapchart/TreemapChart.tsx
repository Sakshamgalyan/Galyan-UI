"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Treemap,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import { Skeleton } from "../skeleton/Skeleton";
import "./treemap-chart.css";

export interface TreemapChartItem {
  name: string;
  value: number;
  color?: string;
  children?: TreemapChartItem[];
  [key: string]: any;
}

export interface TreemapChartTooltipConfig {
  show?: boolean;
  formatter?: (value: number, item?: TreemapChartItem) => string;
}

export interface TreemapChartProps {
  data: TreemapChartItem[];
  dataKey?: string;
  height?: number | string;
  width?: number | string;
  colorScale?: string[];
  showSummaryHeader?: boolean;
  summaryTitle?: string;
  aspectRatio?: number;
  loading?: boolean;
  className?: string;
  responsive?: boolean;
  tooltipConfig?: TreemapChartTooltipConfig;
  tokens?: Record<string, string>;
  onItemClick?: (item: TreemapChartItem, index: number) => void;
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

interface CustomContentProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  index?: number;
  name?: string;
  value?: number;
  color?: string;
  payload?: any;
  colors?: string[];
  hoveredIndex?: number | null;
  onHover?: (index: number | null) => void;
  onClick?: (item: TreemapChartItem, index: number) => void;
  totalValue?: number;
}

function CustomTreemapTile({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  index = 0,
  name = "",
  value = 0,
  color,
  payload,
  colors = DEFAULT_COLORS,
  hoveredIndex,
  onHover,
  onClick,
  totalValue = 0,
}: CustomContentProps) {
  const itemColor =
    color ?? payload?.color ?? colors[index % colors.length];
  const isHovered = hoveredIndex === index;
  const isDimmed = hoveredIndex !== null && !isHovered;

  const percentage =
    totalValue > 0 ? Math.round((value / totalValue) * 100) : 0;

  const pad = 2;
  const tileX = x + pad;
  const tileY = y + pad;
  const tileW = Math.max(0, width - pad * 2);
  const tileH = Math.max(0, height - pad * 2);

  if (tileW <= 0 || tileH <= 0) return null;

  return (
    <g
      className="gy-treemap-tile"
      onMouseEnter={() => onHover?.(index)}
      onMouseLeave={() => onHover?.(null)}
      onClick={() => onClick?.(payload || { name, value, color: itemColor }, index)}
      style={{ cursor: "pointer" }}
    >
      <rect
        x={tileX}
        y={tileY}
        width={tileW}
        height={tileH}
        rx={5}
        ry={5}
        fill={itemColor}
        fillOpacity={isHovered ? 1 : isDimmed ? 0.45 : 0.88}
        stroke="var(--gy-surface, #ffffff)"
        strokeWidth={isHovered ? 2.5 : 1.5}
        style={{
          transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          filter: isHovered
            ? "drop-shadow(0 6px 14px rgba(0, 0, 0, 0.22))"
            : "none",
        }}
      />
      {tileW > 48 && tileH > 28 && (
        <text
          x={tileX + 8}
          y={tileY + 18}
          fill="#ffffff"
          fontSize={tileW < 80 ? 10 : 12}
          fontWeight="600"
          style={{
            userSelect: "none",
            pointerEvents: "none",
            textShadow: "0 1px 2px rgba(0,0,0,0.4)",
          }}
        >
          {name.length > Math.floor(tileW / 8)
            ? `${name.substring(0, Math.floor(tileW / 8))}...`
            : name}
        </text>
      )}
      {tileW > 64 && tileH > 46 && (
        <text
          x={tileX + 8}
          y={tileY + 34}
          fill="rgba(255, 255, 255, 0.9)"
          fontSize={11}
          fontWeight="500"
          style={{
            userSelect: "none",
            pointerEvents: "none",
            textShadow: "0 1px 2px rgba(0,0,0,0.4)",
          }}
        >
          {value.toLocaleString()} ({percentage}%)
        </text>
      )}
    </g>
  );
}

export function TreemapChart({
  data = [],
  dataKey = "value",
  height = 340,
  width = "100%",
  colorScale = DEFAULT_COLORS,
  showSummaryHeader = true,
  summaryTitle = "Hierarchical Breakdown",
  aspectRatio = 4 / 3,
  loading = false,
  className = "",
  responsive = true,
  tooltipConfig = { show: true },
  tokens,
  onItemClick,
}: TreemapChartProps) {
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

  const totalValue = useMemo(() => {
    return data.reduce((acc, curr) => acc + (curr.value || 0), 0);
  }, [data]);

  const topCategory = useMemo(() => {
    if (!data || data.length === 0) return null;
    return data.reduce(
      (max, d) => (!max || d.value > max.value ? d : max),
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
    const itemData = current.payload as TreemapChartItem;
    const val = Number(itemData.value) || 0;
    const percentage =
      totalValue > 0 ? ((val / totalValue) * 100).toFixed(1) : "0";
    const formattedVal = tooltipConfig?.formatter
      ? tooltipConfig.formatter(val, itemData)
      : val.toLocaleString();

    const itemColor =
      itemData.color ??
      colorScale[
        (data.findIndex((d) => d.name === itemData.name) >= 0
          ? data.findIndex((d) => d.name === itemData.name)
          : 0) % colorScale.length
      ];

    return (
      <div className="gy-treemap-tooltip">
        <div className="gy-treemap-tooltip-header">
          <span
            className="gy-treemap-tooltip-badge"
            style={{ backgroundColor: itemColor }}
          />
          <span className="gy-treemap-tooltip-title">{itemData.name}</span>
        </div>
        <div className="gy-treemap-tooltip-body">
          <div className="gy-treemap-tooltip-row">
            <span className="gy-treemap-tooltip-label">Value:</span>
            <span className="gy-treemap-tooltip-val">{formattedVal}</span>
          </div>
          <div className="gy-treemap-tooltip-row gy-treemap-tooltip-row--highlight">
            <span className="gy-treemap-tooltip-label">Share:</span>
            <span className="gy-treemap-tooltip-val">{percentage}%</span>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div
          className="gy-treemap-skeleton-container"
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
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              gridTemplateRows: "1fr 1fr",
              gap: "6px",
              height: "78%",
              width: "100%",
            }}
          >
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              style={{ gridRow: "span 2", borderRadius: "6px" }}
            />
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              style={{ borderRadius: "6px" }}
            />
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              style={{ borderRadius: "6px" }}
            />
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              style={{ borderRadius: "6px" }}
            />
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              style={{ borderRadius: "6px" }}
            />
          </div>
        </div>
      );
    }

    if (data.length === 0) {
      return <div className="gy-treemap-empty">No data available</div>;
    }

    return (
      <div className="gy-treemap-body">
        {showSummaryHeader && (
          <div className="gy-treemap-header">
            <span className="gy-treemap-title">{summaryTitle}</span>
            <div className="gy-treemap-badges">
              <span className="gy-treemap-badge">
                Total:{" "}
                <strong>
                  {tooltipConfig?.formatter
                    ? tooltipConfig.formatter(totalValue)
                    : totalValue.toLocaleString()}
                </strong>
              </span>
              {topCategory && (
                <span className="gy-treemap-badge gy-treemap-badge--top">
                  Top: <strong>{topCategory.name}</strong>
                </span>
              )}
            </div>
          </div>
        )}

        <div className="gy-treemap-chart-area">
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={data}
              dataKey={dataKey}
              aspectRatio={aspectRatio}
              stroke="var(--gy-surface, #ffffff)"
              content={
                <CustomTreemapTile
                  colors={colorScale}
                  hoveredIndex={hoveredIndex}
                  onHover={setHoveredIndex}
                  onClick={onItemClick}
                  totalValue={totalValue}
                />
              }
            >
              {tooltipConfig?.show !== false && (
                <RechartsTooltip
                  content={<CustomTooltip />}
                  wrapperStyle={{ outline: "none", zIndex: 100 }}
                />
              )}
            </Treemap>
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
      className={`gy-treemapchart ${isCompact ? "gy-treemapchart--compact" : ""} ${className}`}
      style={wrapperStyle}
    >
      {renderContent()}
    </div>
  );
}
