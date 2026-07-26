"use client";

import React, { useMemo, useState, useRef } from "react";
import { Skeleton } from "../skeleton/Skeleton";
import "./bar-chart.css";

export type BarChartVariant = "cylindrical" | "filled" | "horizontal";

export interface BarChartItem {
  label: string;
  value: number;
  icon?: React.ReactNode;
  color?: string;
  [key: string]: any;
}

export interface BarChartTooltipConfig {
  show?: boolean;
  formatter?: (value: number) => string;
}

export interface BarChartProps {
  variant: BarChartVariant;
  data: BarChartItem[];
  height?: number | string;
  width?: number | string;
  barColor?: string;
  maxBars?: number;
  backgroundColor?: string;
  textColor?: string;
  barWidth?: number | string;
  barSpacing?: number | string;
  showValues?: boolean;
  tokens?: Record<string, string>;
  className?: string;
  loading?: boolean;
  skeletonContent?: React.ReactNode;
  truncateCharacterAfter?: number;
  tooltipConfig?: BarChartTooltipConfig;
}

const DEFAULT_COLORS = [
  "var(--gy-primary)",
  "var(--gy-success)",
  "var(--gy-warning)",
  "var(--gy-danger)",
  "var(--gy-info)",
  "#8b5cf6",
  "#ec4899",
];

export function BarChart({
  variant,
  data = [],
  height = 300,
  width = "100%",
  barColor,
  maxBars,
  backgroundColor,
  textColor,
  barWidth,
  barSpacing,
  showValues = true,
  tokens,
  className = "",
  loading = false,
  skeletonContent,
  truncateCharacterAfter,
  tooltipConfig = { show: true },
}: BarChartProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Filter & limit data
  const processedData = useMemo(() => {
    let result = [...data];
    if (maxBars && maxBars > 0) {
      result = result.slice(0, maxBars);
    }
    return result;
  }, [data, maxBars]);

  // Max value for scaling
  const maxValue = useMemo(() => {
    if (processedData.length === 0) return 1;
    return Math.max(...processedData.map((d) => d.value), 1);
  }, [processedData]);

  // Truncate labels helper
  const truncateLabel = (text: string) => {
    if (!truncateCharacterAfter) return text;
    if (text.length <= truncateCharacterAfter) return text;
    return text.substring(0, truncateCharacterAfter) + "...";
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const barElement = e.currentTarget as HTMLElement;
    const rect = barElement.getBoundingClientRect();
    const wrapper = wrapperRef.current;
    if (wrapper) {
      const wrapperRect = wrapper.getBoundingClientRect();
      setTooltipPos({
        x: rect.left - wrapperRect.left + rect.width / 2,
        y: rect.top - wrapperRect.top,
      });
    }
  };

  // Rendering skeletons helper
  const renderSkeletons = () => {
    if (skeletonContent) return skeletonContent;

    const count = maxBars || 5;

    if (variant === "horizontal") {
      return (
        <div
          className="gy-barchart-skeleton-container"
          style={{ flexDirection: "column", gap: "16px", width: "100%" }}
        >
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                width: "100%",
              }}
            >
              <Skeleton
                variant="rectangular"
                width="36px"
                height="36px"
                style={{ borderRadius: "8px" }}
              />
              <div
                style={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <Skeleton variant="text" width="120px" height="12px" />
                <Skeleton
                  variant="rectangular"
                  width="85%"
                  height="12px"
                  style={{ borderRadius: "6px" }}
                />
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div
        className="gy-barchart-skeleton-container"
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-around",
          height: "100%",
        }}
      >
        {Array.from({ length: count }).map((_, i) => {
          const heights = ["40%", "75%", "50%", "90%", "60%"];
          const barH = heights[i % heights.length];
          const calculatedWidth = barWidth || 32;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                justifyContent: "flex-end",
              }}
            >
              <Skeleton
                variant="rectangular"
                width={
                  typeof calculatedWidth === "number"
                    ? `${calculatedWidth}px`
                    : calculatedWidth
                }
                height={barH}
                style={{ borderRadius: "9999px 9999px 0 0" }}
              />
              <Skeleton
                variant="text"
                width="40px"
                height="10px"
                style={{ marginTop: "8px" }}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const wrapperStyle: React.CSSProperties = {
    height: typeof height === "number" ? `${height}px` : height,
    width: typeof width === "number" ? `${width}px` : width,
    backgroundColor: backgroundColor || undefined,
    color: textColor || undefined,
    ...tokens,
  };

  return (
    <div
      ref={wrapperRef}
      className={`gy-barchart-wrapper ${className}`}
      style={wrapperStyle}
    >
      <div
        className={`gy-barchart-container gy-barchart--${variant}`}
        style={{
          gap:
            barSpacing !== undefined
              ? typeof barSpacing === "number"
                ? `${barSpacing}px`
                : barSpacing
              : undefined,
        }}
      >
        {loading ? (
          renderSkeletons()
        ) : processedData.length === 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              color: "var(--gy-text-subtle)",
              fontSize: "var(--gy-font-size-sm)",
            }}
          >
            No data available
          </div>
        ) : (
          processedData.map((item, index) => {
            const percentage = Math.round((item.value / maxValue) * 100);
            const rawColor = item.color || barColor || "var(--gy-primary)";

            if (variant === "cylindrical") {
              const currentBarWidth = barWidth || 36;
              const barStyle: React.CSSProperties = {
                height: `${percentage}%`,
                width:
                  typeof currentBarWidth === "number"
                    ? `${currentBarWidth}px`
                    : currentBarWidth,
                backgroundColor: rawColor,
              };

              return (
                <div key={index} className="gy-barchart-col--cylindrical">
                  <div
                    className="gy-barchart-bar--cylindrical"
                    style={barStyle}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                  >
                    {showValues && percentage > 15 && (
                      <span className="gy-barchart-bar-percentage--cylindrical">
                        {percentage}%
                      </span>
                    )}
                    {item.icon && (
                      <span className="gy-barchart-bar-icon--cylindrical">
                        {item.icon}
                      </span>
                    )}
                  </div>
                  <span
                    className="gy-barchart-label--cylindrical"
                    style={{ color: textColor }}
                  >
                    {truncateLabel(item.label)}
                  </span>
                </div>
              );
            }

            if (variant === "filled") {
              const currentBarWidth = barWidth || 20;
              const fillStyle: React.CSSProperties = {
                height: `${percentage}%`,
                backgroundColor: rawColor,
              };

              const trackStyle: React.CSSProperties = {
                height: "70%",
                width:
                  typeof currentBarWidth === "number"
                    ? `${currentBarWidth}px`
                    : currentBarWidth,
              };

              return (
                <div key={index} className="gy-barchart-col--filled">
                  {showValues && (
                    <span
                      className="gy-barchart-bar-value--filled"
                      style={{ color: textColor }}
                    >
                      {percentage}%
                    </span>
                  )}
                  <div className="gy-barchart-track--filled" style={trackStyle}>
                    <div
                      className="gy-barchart-bar--filled"
                      style={fillStyle}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                      onMouseMove={handleMouseMove}
                    />
                  </div>
                  {item.icon && (
                    <span className="gy-barchart-bar-icon--filled">
                      {item.icon}
                    </span>
                  )}
                  <span
                    className="gy-barchart-label--filled"
                    style={{ color: textColor }}
                  >
                    {truncateLabel(item.label)}
                  </span>
                </div>
              );
            }

            // Horizontal layout
            const progressStyle: React.CSSProperties = {
              width: `${percentage}%`,
              backgroundColor: rawColor,
            };

            const customBarHeight = barWidth ? { height: barWidth } : {};

            return (
              <div key={index} className="gy-barchart-row--horizontal">
                {item.icon && (
                  <div className="gy-barchart-icon-square--horizontal">
                    {item.icon}
                  </div>
                )}
                <div className="gy-barchart-content--horizontal">
                  <span
                    className="gy-barchart-label--horizontal"
                    style={{ color: textColor }}
                  >
                    {truncateLabel(item.label)}
                  </span>
                  <div
                    className="gy-barchart-track--horizontal"
                    style={customBarHeight}
                  >
                    <div
                      className="gy-barchart-bar--horizontal"
                      style={progressStyle}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                      onMouseMove={handleMouseMove}
                    />
                  </div>
                </div>
                {showValues && (
                  <span
                    className="gy-barchart-value--horizontal"
                    style={{ color: textColor }}
                  >
                    {percentage}%
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Floating Interactive Tooltip */}
      {!loading &&
        tooltipConfig?.show &&
        hoveredIndex !== null &&
        processedData[hoveredIndex] && (
          <div
            className="gy-barchart-tooltip"
            style={{
              left: `${tooltipPos.x}px`,
              top: `${tooltipPos.y}px`,
              opacity: hoveredIndex !== null ? 1 : 0,
            }}
          >
            <div className="gy-barchart-tooltip-label">
              {processedData[hoveredIndex].label}
            </div>
            <div className="gy-barchart-tooltip-value">
              {tooltipConfig.formatter
                ? tooltipConfig.formatter(processedData[hoveredIndex].value)
                : processedData[hoveredIndex].value.toLocaleString()}
            </div>
          </div>
        )}
    </div>
  );
}
