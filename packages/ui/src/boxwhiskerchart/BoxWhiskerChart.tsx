"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Skeleton } from "../skeleton/Skeleton";
import { Tooltip } from "../tooltip/Tooltip";
import "./box-whisker-chart.css";

export interface BoxWhiskerItem {
  label: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  color?: string;
  [key: string]: any;
}

export interface BoxWhiskerTooltipConfig {
  show?: boolean;
  formatter?: (value: number) => string;
}

export interface BoxWhiskerChartProps {
  data: BoxWhiskerItem[];
  height?: number | string;
  width?: number | string;
  color?: string; // default: var(--gy-primary, #3b82f6)
  loading?: boolean;
  className?: string;
  responsive?: boolean;
  showGrid?: boolean;
  tooltipConfig?: BoxWhiskerTooltipConfig;
  tokens?: Record<string, string>;
  truncateCharacterAfter?: number;
}

export function BoxWhiskerChart({
  data = [],
  height = 350,
  width = "100%",
  color = "var(--gy-primary, #3b82f6)",
  loading = false,
  className = "",
  responsive = true,
  showGrid = true,
  tooltipConfig = { show: true },
  tokens,
  truncateCharacterAfter,
}: BoxWhiskerChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(
    typeof width === "number" ? width : 500
  );
  const [containerHeight, setContainerHeight] = useState<number>(
    typeof height === "number" ? height : 350
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // ResizeObserver for responsive width & height calculation
  useEffect(() => {
    if (!responsive) return;
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0) setContainerWidth(w);
        if (h > 0 && typeof height === "string" && height.includes("%")) {
          setContainerHeight(h);
        }
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [responsive, height]);

  const numHeight =
    typeof height === "number" ? height : containerHeight || 350;
  const numWidth = containerWidth || 500;

  const isMobile = numWidth < 480;

  const paddingLeft = isMobile ? 38 : 50;
  const paddingRight = isMobile ? 16 : 28;
  const paddingTop = 28;
  const paddingBottom = isMobile ? 38 : 44;

  const chartWidth = Math.max(numWidth - paddingLeft - paddingRight, 50);
  const chartHeight = Math.max(numHeight - paddingTop - paddingBottom, 50);

  // Calculate global min and max for scaling
  const { minVal, maxVal } = useMemo(() => {
    if (data.length === 0) return { minVal: 0, maxVal: 100 };
    const mins = data.map((d) => d.min);
    const maxs = data.map((d) => d.max);
    const rawMin = Math.min(...mins);
    const rawMax = Math.max(...maxs);
    const diff = rawMax - rawMin || 10;
    const pad = diff * 0.1;
    return {
      minVal: Math.floor(rawMin - pad),
      maxVal: Math.ceil(rawMax + pad),
    };
  }, [data]);

  const scaleY = (val: number) => {
    const range = maxVal - minVal || 1;
    return paddingTop + chartHeight - ((val - minVal) / range) * chartHeight;
  };

  const truncateLabel = (text: string) => {
    const limit = truncateCharacterAfter || (isMobile ? 8 : 16);
    if (text.length <= limit) return text;
    return text.substring(0, limit) + "...";
  };

  const renderTooltipContent = (item: BoxWhiskerItem) => {
    const format = (v: number) =>
      tooltipConfig?.formatter
        ? tooltipConfig.formatter(v)
        : v.toLocaleString();

    const iqr = item.q3 - item.q1;

    return (
      <div className="gy-boxwhisker-tooltip-content">
        <div className="gy-boxwhisker-tooltip-header">
          <span className="gy-boxwhisker-tooltip-title">{item.label}</span>
        </div>
        <div className="gy-boxwhisker-tooltip-grid">
          <div className="gy-boxwhisker-tooltip-row">
            <span className="gy-boxwhisker-tooltip-stat-label">Maximum</span>
            <span className="gy-boxwhisker-tooltip-stat-val">
              {format(item.max)}
            </span>
          </div>
          <div className="gy-boxwhisker-tooltip-row">
            <span className="gy-boxwhisker-tooltip-stat-label">
              Q3 (75th %)
            </span>
            <span className="gy-boxwhisker-tooltip-stat-val">
              {format(item.q3)}
            </span>
          </div>
          <div className="gy-boxwhisker-tooltip-row gy-boxwhisker-tooltip-row--highlight">
            <span className="gy-boxwhisker-tooltip-stat-label">Median</span>
            <span className="gy-boxwhisker-tooltip-stat-val">
              {format(item.median)}
            </span>
          </div>
          <div className="gy-boxwhisker-tooltip-row">
            <span className="gy-boxwhisker-tooltip-stat-label">
              Q1 (25th %)
            </span>
            <span className="gy-boxwhisker-tooltip-stat-val">
              {format(item.q1)}
            </span>
          </div>
          <div className="gy-boxwhisker-tooltip-row">
            <span className="gy-boxwhisker-tooltip-stat-label">Minimum</span>
            <span className="gy-boxwhisker-tooltip-stat-val">
              {format(item.min)}
            </span>
          </div>
          <div className="gy-boxwhisker-tooltip-row gy-boxwhisker-tooltip-row--subtle">
            <span className="gy-boxwhisker-tooltip-stat-label">IQR</span>
            <span className="gy-boxwhisker-tooltip-stat-val">
              {format(Number(iqr.toFixed(2)))}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderSkeletons = () => {
    const count = isMobile ? 3 : 5;
    return (
      <div
        className="gy-boxwhisker-skeleton-container"
        style={{
          display: "flex",
          gap: isMobile ? "16px" : "28px",
          height: "100%",
          width: "100%",
          alignItems: "flex-end",
          justifyContent: "space-around",
          padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
          boxSizing: "border-box",
        }}
      >
        {Array.from({ length: count }).map((_, i) => {
          const heights = ["55%", "75%", "45%", "85%", "60%"];
          const h = heights[i % heights.length];
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                flex: 1,
                height: "100%",
                justifyContent: "flex-end",
              }}
            >
              <Skeleton
                variant="rectangular"
                width={isMobile ? "24px" : "36px"}
                height={h}
                style={{ borderRadius: "6px" }}
              />
              <Skeleton
                variant="text"
                width={isMobile ? "40px" : "55px"}
                height="10px"
              />
            </div>
          );
        })}
      </div>
    );
  };

  const tickCount = isMobile ? 4 : 5;
  const gridTicks = useMemo(() => {
    return Array.from({ length: tickCount }).map((_, i) => {
      const val = minVal + ((maxVal - minVal) / (tickCount - 1)) * i;
      const y = scaleY(val);
      return { val, y };
    });
  }, [minVal, maxVal, tickCount, paddingTop, chartHeight]);

  const wrapperStyle: React.CSSProperties = {
    height: typeof height === "number" ? `${height}px` : height,
    width: typeof width === "number" ? `${width}px` : width,
    ...tokens,
  };

  const colWidth = data.length > 0 ? chartWidth / data.length : 0;

  return (
    <div
      ref={containerRef}
      className={`gy-boxwhisker-wrapper ${isMobile ? "gy-boxwhisker--compact" : ""} ${className}`}
      style={wrapperStyle}
    >
      {loading ? (
        renderSkeletons()
      ) : data.length === 0 ? (
        <div className="gy-boxwhisker-empty">No data available</div>
      ) : (
        <>
          <svg
            width={numWidth}
            height={numHeight}
            className="gy-boxwhisker-svg"
            viewBox={`0 0 ${numWidth} ${numHeight}`}
          >
            <defs>
              <filter
                id="gy-boxwhisker-shadow"
                x="-10%"
                y="-10%"
                width="130%"
                height="130%"
              >
                <feDropShadow
                  dx="0"
                  dy="4"
                  stdDeviation="4"
                  floodOpacity="0.12"
                />
              </filter>
            </defs>

            {/* Y Axis Gridlines */}
            {showGrid &&
              gridTicks.map((tick, i) => (
                <g key={i} className="gy-boxwhisker-grid-group">
                  <line
                    x1={paddingLeft}
                    y1={tick.y}
                    x2={numWidth - paddingRight}
                    y2={tick.y}
                    className="gy-boxwhisker-grid-line"
                  />
                  <text
                    x={paddingLeft - 8}
                    y={tick.y + 4}
                    textAnchor="end"
                    className="gy-boxwhisker-axis-text"
                  >
                    {tooltipConfig?.formatter
                      ? tooltipConfig.formatter(Math.round(tick.val))
                      : Math.round(tick.val).toLocaleString()}
                  </text>
                </g>
              ))}

            {/* Box & Whisker Items */}
            {data.map((item, idx) => {
              const x = paddingLeft + colWidth * idx + colWidth / 2;
              const yMin = scaleY(item.min);
              const yQ1 = scaleY(item.q1);
              const yMedian = scaleY(item.median);
              const yQ3 = scaleY(item.q3);
              const yMax = scaleY(item.max);

              const boxWidth = Math.min(
                isMobile ? 30 : 44,
                Math.max(14, colWidth * 0.48)
              );
              const capWidth = Math.min(16, Math.max(7, boxWidth * 0.45));
              const itemColor = item.color || color;
              const isHovered = hoveredIndex === idx;

              return (
                <g key={idx} className="gy-boxwhisker-item">
                  {/* Whisker Line (Min to Max) */}
                  <line
                    x1={x}
                    y1={yMin}
                    x2={x}
                    y2={yMax}
                    stroke={isHovered ? itemColor : "var(--gy-text, #0f172a)"}
                    strokeWidth={isHovered ? "2" : "1.5"}
                    className="gy-boxwhisker-whisker-line"
                  />

                  {/* Bottom Whisker Cap */}
                  <line
                    x1={x - capWidth}
                    y1={yMin}
                    x2={x + capWidth}
                    y2={yMin}
                    stroke={isHovered ? itemColor : "var(--gy-text, #0f172a)"}
                    strokeWidth={isHovered ? "2.5" : "2"}
                    strokeLinecap="round"
                    className="gy-boxwhisker-cap"
                  />

                  {/* Top Whisker Cap */}
                  <line
                    x1={x - capWidth}
                    y1={yMax}
                    x2={x + capWidth}
                    y2={yMax}
                    stroke={isHovered ? itemColor : "var(--gy-text, #0f172a)"}
                    strokeWidth={isHovered ? "2.5" : "2"}
                    strokeLinecap="round"
                    className="gy-boxwhisker-cap"
                  />

                  {/* Box (Q1 to Q3) */}
                  <rect
                    x={x - boxWidth / 2}
                    y={yQ3}
                    width={boxWidth}
                    height={Math.max(3, yQ1 - yQ3)}
                    rx={4}
                    ry={4}
                    fill={itemColor}
                    fillOpacity={isHovered ? 0.9 : 0.65}
                    stroke={isHovered ? itemColor : "var(--gy-text, #0f172a)"}
                    strokeWidth={isHovered ? "2" : "1.5"}
                    filter={
                      isHovered ? "url(#gy-boxwhisker-shadow)" : undefined
                    }
                    className={`gy-boxwhisker-rect ${isHovered ? "gy-boxwhisker-rect--hovered" : ""}`}
                  />

                  {/* Median Line */}
                  <line
                    x1={x - boxWidth / 2 + 1}
                    y1={yMedian}
                    x2={x + boxWidth / 2 - 1}
                    y2={yMedian}
                    stroke={isHovered ? "#ffffff" : "var(--gy-text, #0f172a)"}
                    strokeWidth={isHovered ? "3.5" : "2.5"}
                    strokeLinecap="round"
                    className="gy-boxwhisker-median-line"
                  />

                  {/* X Axis Label */}
                  <text
                    x={x}
                    y={numHeight - paddingBottom + (isMobile ? 18 : 22)}
                    textAnchor="middle"
                    className={`gy-boxwhisker-axis-text gy-boxwhisker-label-text ${
                      isHovered ? "gy-boxwhisker-label-text--hover" : ""
                    }`}
                  >
                    {truncateLabel(item.label)}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Interactive Tooltip Overlay */}
          <div className="gy-boxwhisker-overlay">
            {data.map((item, idx) => {
              const colLeft = paddingLeft + colWidth * idx;
              const yMin = scaleY(item.min);
              const yMax = scaleY(item.max);
              const topY = Math.min(yMax, yMin);
              const bottomY = Math.max(yMax, yMin);
              const boxHeight = Math.max(24, bottomY - topY);

              const boxWidth = Math.min(
                isMobile ? 30 : 44,
                Math.max(14, colWidth * 0.48)
              );

              return (
                <React.Fragment key={idx}>
                  {/* Box / Whisker Tooltip Trigger */}
                  <div
                    className="gy-boxwhisker-trigger-zone"
                    style={{
                      position: "absolute",
                      left: `${colLeft}px`,
                      width: `${colWidth}px`,
                      top: `${topY - 8}px`,
                      height: `${boxHeight + 16}px`,
                    }}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <Tooltip
                      content={renderTooltipContent(item)}
                      position="top"
                      disabled={tooltipConfig?.show === false}
                      delay={30}
                    >
                      <div
                        className="gy-boxwhisker-hotspot"
                        style={{
                          width: `${Math.max(boxWidth + 14, 36)}px`,
                          height: "100%",
                        }}
                      />
                    </Tooltip>
                  </div>

                  {/* Label Tooltip Trigger */}
                  <div
                    className="gy-boxwhisker-label-trigger"
                    style={{
                      position: "absolute",
                      left: `${colLeft}px`,
                      width: `${colWidth}px`,
                      bottom: "4px",
                      height: `${paddingBottom - 4}px`,
                    }}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <Tooltip content={item.label} position="bottom" delay={80}>
                      <div
                        className="gy-boxwhisker-label-hotspot"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </Tooltip>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
