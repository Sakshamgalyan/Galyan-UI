"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import { Skeleton } from "../skeleton/Skeleton";
import { Tooltip } from "../tooltip/Tooltip";
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

export type BarValueFormat =
  | "percentage"
  | "value"
  | "both"
  | ((value: number, percentage: number, item: BarChartItem) => string);

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
  valueFormat?: BarValueFormat;
  borderless?: boolean;
  horizontalAlignment?: "stacked" | "inline";
  tokens?: Record<string, string>;
  className?: string;
  loading?: boolean;
  skeletonContent?: React.ReactNode;
  truncateCharacterAfter?: number;
  tooltipConfig?: BarChartTooltipConfig;
  responsive?: boolean;
}

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
  valueFormat = "percentage",
  borderless = false,
  horizontalAlignment = "stacked",
  tokens,
  className = "",
  loading = false,
  skeletonContent,
  truncateCharacterAfter,
  tooltipConfig = { show: true },
  responsive = true,
}: BarChartProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isCompact, setIsCompact] = useState(false);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleResetHover = () => {
    setHoveredIndex(null);
  };

  // Responsive observation for scaling bar widths & spacing on mobile
  useEffect(() => {
    if (!responsive) return;
    const el = wrapperRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        setIsCompact(w > 0 && w < 480);
        setContainerHeight(h);
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [responsive]);

  const effectiveBarWidth = useMemo(() => {
    if (variant === "horizontal") return undefined;
    if (!barWidth) return isCompact ? 28 : 36;
    if (typeof barWidth === "number") {
      return isCompact ? Math.min(barWidth, 30) : barWidth;
    }
    return barWidth;
  }, [variant, barWidth, isCompact]);

  const effectiveHorizontalBarHeight = useMemo(() => {
    if (variant !== "horizontal") return undefined;
    if (barWidth !== undefined) {
      return typeof barWidth === "number" ? `${barWidth}px` : barWidth;
    }
    return isCompact ? 8 : 10;
  }, [variant, barWidth, isCompact]);

  const effectiveBarSpacing = useMemo(() => {
    if (barSpacing === undefined) {
      return variant === "horizontal"
        ? (isCompact ? 6 : 10)
        : (isCompact ? 8 : 16);
    }
    if (typeof barSpacing === "number") {
      return isCompact ? Math.min(barSpacing, 12) : barSpacing;
    }
    return barSpacing;
  }, [barSpacing, isCompact, variant]);

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

  // Truncate labels helper: cleanly trims trailing whitespace before ellipsis
  const truncateLabel = (text: string) => {
    if (!text) return "";
    if (!truncateCharacterAfter || truncateCharacterAfter <= 0) return text;
    if (text.length <= truncateCharacterAfter) return text;
    return text.substring(0, truncateCharacterAfter).trimEnd() + "...";
  };

  const getDisplayLabel = (item: BarChartItem, index: number) => {
    const rawLabel = item.label ?? item.name ?? "";
    if (rawLabel.trim() !== "") {
      return truncateLabel(rawLabel);
    }
    return `Item ${index + 1}`;
  };

  const renderFormattedValue = (item: BarChartItem, percentage: number) => {
    if (typeof valueFormat === "function") {
      return valueFormat(item.value, percentage, item);
    }
    if (valueFormat === "value") {
      return tooltipConfig?.formatter
        ? tooltipConfig.formatter(item.value)
        : item.value.toLocaleString();
    }
    if (valueFormat === "both") {
      const valStr = tooltipConfig?.formatter
        ? tooltipConfig.formatter(item.value)
        : item.value.toLocaleString();
      return `${percentage}% (${valStr})`;
    }
    return `${percentage}%`;
  };

  const getBarTooltip = (item: BarChartItem, percentage: number) => {
    const formattedValue = tooltipConfig?.formatter
      ? tooltipConfig.formatter(item.value)
      : item.value.toLocaleString();

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2px", textAlign: "center" }}>
        <span style={{ fontWeight: 600, fontSize: "0.8125rem" }}>{item.label}</span>
        <span style={{ fontSize: "0.75rem", opacity: 0.9 }}>
          {formattedValue} ({percentage}%)
        </span>
      </div>
    );
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
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-around",
          height: "100%",
          width: "100%",
        }}
      >
        {Array.from({ length: count }).map((_, i) => {
          const heights = ["40%", "75%", "50%", "90%", "60%"];
          const barH = heights[i % heights.length];
          const calculatedWidth = effectiveBarWidth || 36;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: "1 1 0",
                height: "100%",
                justifyContent: "flex-end",
                paddingBottom: "36px",
                position: "relative",
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
                width="60px"
                height="10px"
                style={{ position: "absolute", bottom: "8px" }}
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

  const isShort = containerHeight > 0 && containerHeight <= 280;

  const rootClasses = [
    "gy-barchart-wrapper",
    isCompact ? "gy-barchart--compact" : "",
    isShort ? "gy-barchart--short" : "",
    borderless ? "gy-barchart--borderless" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={wrapperRef}
      className={rootClasses}
      style={wrapperStyle}
      onMouseLeave={handleResetHover}
      onPointerLeave={handleResetHover}
    >
      <div
        className={`gy-barchart-container gy-barchart--${variant}`}
        onMouseLeave={handleResetHover}
        style={{
          gap:
            effectiveBarSpacing !== undefined
              ? typeof effectiveBarSpacing === "number"
                ? `${effectiveBarSpacing}px`
                : effectiveBarSpacing
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
            const isHovered = hoveredIndex === index;
            const isDimmed = hoveredIndex !== null && !isHovered;

            if (variant === "cylindrical") {
              const barStyle: React.CSSProperties = {
                height: `${percentage}%`,
                width:
                  typeof effectiveBarWidth === "number"
                    ? `${effectiveBarWidth}px`
                    : effectiveBarWidth,
                backgroundColor: rawColor,
              };

              return (
                <div
                  key={index}
                  className={`gy-barchart-col--cylindrical ${
                    isHovered ? "gy-barchart-col--active" : ""
                  } ${isDimmed ? "gy-barchart-col--dimmed" : ""}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={handleResetHover}
                >
                  <div className="gy-barchart-bar-wrapper">
                    <Tooltip
                      content={getBarTooltip(item, percentage)}
                      position="top"
                      delay={40}
                      disabled={tooltipConfig?.show === false}
                    >
                      <div
                        className="gy-barchart-bar--cylindrical"
                        style={barStyle}
                      >
                        {item.icon && (
                          <span className="gy-barchart-bar-icon--cylindrical">
                            {item.icon}
                          </span>
                        )}
                        {showValues && percentage >= (item.icon ? 26 : 14) && (
                          <span className="gy-barchart-bar-percentage--cylindrical">
                            {percentage}%
                          </span>
                        )}
                      </div>
                    </Tooltip>
                  </div>
                  <div className="gy-barchart-label-wrapper">
                    {item.label &&
                    item.label.length > (truncateCharacterAfter || 10) ? (
                      <Tooltip content={item.label} position="bottom" delay={60}>
                        <span
                          className="gy-barchart-label--cylindrical"
                          style={{ color: textColor }}
                        >
                          {truncateLabel(item.label)}
                        </span>
                      </Tooltip>
                    ) : (
                      <span
                        className="gy-barchart-label--cylindrical"
                        style={{ color: textColor }}
                      >
                        {item.label}
                      </span>
                    )}
                  </div>
                </div>
              );
            }

            if (variant === "filled") {
              const fillStyle: React.CSSProperties = {
                height: `${percentage}%`,
                backgroundColor: rawColor,
              };

              const trackStyle: React.CSSProperties = {
                height: "70%",
                width:
                  typeof effectiveBarWidth === "number"
                    ? `${effectiveBarWidth}px`
                    : effectiveBarWidth,
              };

              return (
                <div
                  key={index}
                  className={`gy-barchart-col--filled ${
                    isHovered ? "gy-barchart-col--active" : ""
                  } ${isDimmed ? "gy-barchart-col--dimmed" : ""}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={handleResetHover}
                >
                  {showValues && (
                    <span
                      className="gy-barchart-bar-value--filled"
                      style={{ color: textColor }}
                    >
                      {percentage}%
                    </span>
                  )}
                  <div className="gy-barchart-bar-wrapper">
                    <Tooltip
                      content={getBarTooltip(item, percentage)}
                      position="top"
                      delay={40}
                      disabled={tooltipConfig?.show === false}
                    >
                      <div className="gy-barchart-track--filled" style={trackStyle}>
                        <div
                          className="gy-barchart-bar--filled"
                          style={fillStyle}
                        />
                      </div>
                    </Tooltip>
                  </div>
                  {item.icon && (
                    <span className="gy-barchart-bar-icon--filled">
                      {item.icon}
                    </span>
                  )}
                  <div className="gy-barchart-label-wrapper">
                    {item.label &&
                    item.label.length > (truncateCharacterAfter || 10) ? (
                      <Tooltip content={item.label} position="bottom" delay={60}>
                        <span
                          className="gy-barchart-label--filled"
                          style={{ color: textColor }}
                        >
                          {truncateLabel(item.label)}
                        </span>
                      </Tooltip>
                    ) : (
                      <span
                        className="gy-barchart-label--filled"
                        style={{ color: textColor }}
                      >
                        {item.label}
                      </span>
                    )}
                  </div>
                </div>
              );
            }

            // Horizontal layout
            const displayLabel = getDisplayLabel(item, index);
            const fullLabel = item.label ?? item.name ?? displayLabel;
            const isTruncated = displayLabel !== fullLabel;
            const formattedValue = renderFormattedValue(item, percentage);

            const progressStyle: React.CSSProperties = {
              width: `${percentage}%`,
              backgroundColor: rawColor,
            };

            const customBarHeight = effectiveHorizontalBarHeight
              ? { height: effectiveHorizontalBarHeight }
              : {};

            if (horizontalAlignment === "inline") {
              return (
                <div
                  key={index}
                  className={`gy-barchart-row--horizontal gy-barchart-row--inline ${
                    isHovered ? "gy-barchart-row--active" : ""
                  } ${isDimmed ? "gy-barchart-row--dimmed" : ""}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={handleResetHover}
                >
                  {item.icon && (
                    <div className="gy-barchart-icon-square--horizontal">
                      {item.icon}
                    </div>
                  )}
                  <div className="gy-barchart-content--horizontal">
                    {isTruncated ? (
                      <Tooltip content={fullLabel} position="top" delay={60}>
                        <span
                          className="gy-barchart-label--horizontal"
                          style={{ color: textColor }}
                          title={fullLabel}
                        >
                          {displayLabel}
                        </span>
                      </Tooltip>
                    ) : (
                      <span
                        className="gy-barchart-label--horizontal"
                        style={{ color: textColor }}
                      >
                        {displayLabel}
                      </span>
                    )}
                    <div className="gy-barchart-bar-wrapper">
                      <Tooltip
                        content={getBarTooltip(item, percentage)}
                        position="top"
                        delay={40}
                        disabled={tooltipConfig?.show === false}
                      >
                        <div
                          className="gy-barchart-track--horizontal"
                          style={customBarHeight}
                        >
                          <div
                            className="gy-barchart-bar--horizontal"
                            style={progressStyle}
                          />
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                  {showValues && (
                    <span
                      className="gy-barchart-value--horizontal"
                      style={{ color: textColor }}
                    >
                      {formattedValue}
                    </span>
                  )}
                </div>
              );
            }

            // Default modern stacked layout (matches Card 1 & premium design systems)
            return (
              <div
                key={index}
                className={`gy-barchart-row--horizontal gy-barchart-row--stacked ${
                  isHovered ? "gy-barchart-row--active" : ""
                } ${isDimmed ? "gy-barchart-row--dimmed" : ""}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={handleResetHover}
              >
                {item.icon && (
                  <div className="gy-barchart-icon-square--horizontal">
                    {item.icon}
                  </div>
                )}
                <div className="gy-barchart-content--horizontal">
                  <div className="gy-barchart-row-header--horizontal">
                    {isTruncated ? (
                      <Tooltip content={fullLabel} position="top" delay={60}>
                        <span
                          className="gy-barchart-label--horizontal"
                          style={{ color: textColor }}
                          title={fullLabel}
                        >
                          {displayLabel}
                        </span>
                      </Tooltip>
                    ) : (
                      <span
                        className="gy-barchart-label--horizontal"
                        style={{ color: textColor }}
                      >
                        {displayLabel}
                      </span>
                    )}
                    {showValues && (
                      <span
                        className="gy-barchart-value--horizontal"
                        style={{ color: textColor }}
                      >
                        {formattedValue}
                      </span>
                    )}
                  </div>
                  <div className="gy-barchart-bar-wrapper">
                    <Tooltip
                      content={getBarTooltip(item, percentage)}
                      position="top"
                      delay={40}
                      disabled={tooltipConfig?.show === false}
                    >
                      <div
                        className="gy-barchart-track--horizontal"
                        style={customBarHeight}
                      >
                        <div
                          className="gy-barchart-bar--horizontal"
                          style={progressStyle}
                        />
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
