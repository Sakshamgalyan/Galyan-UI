"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import { Skeleton } from "../skeleton/Skeleton";
import { Tooltip } from "../tooltip/Tooltip";
import { EmptyState } from "../emptystate/EmptyState";
import "./bar-chart.css";

export type BarChartVariant = "cylindrical" | "filled" | "horizontal";

export interface BarChartItem {
  label: string;
  value: number;
  icon?: React.ReactNode;
  color?: string;
  fillColor?: string;
  trackColor?: string;
  displayValue?: string | number;
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
  trackColor?: string;
  maxValue?: number;
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
  animate?: boolean;
  animationDuration?: number;
  animationEasing?: string;
}

export function BarChart({
  variant,
  data = [],
  height,
  width = "100%",
  barColor,
  trackColor,
  maxValue,
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
  animate = true,
  animationDuration = 900,
  animationEasing = "cubic-bezier(0.16, 1, 0.3, 1)",
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
    if (!barWidth) return isCompact ? (variant === "cylindrical" ? 32 : 28) : (variant === "cylindrical" ? 42 : 36);
    if (typeof barWidth === "number") {
      return isCompact ? Math.min(barWidth, 32) : barWidth;
    }
    return barWidth;
  }, [variant, barWidth, isCompact]);

  const effectiveHorizontalBarHeight = useMemo(() => {
    if (variant !== "horizontal") return undefined;
    if (barWidth !== undefined) {
      return typeof barWidth === "number" ? `${barWidth}px` : barWidth;
    }
    return horizontalAlignment === "inline" ? (isCompact ? 18 : 26) : (isCompact ? 8 : 10);
  }, [variant, barWidth, horizontalAlignment, isCompact]);

  const effectiveBarSpacing = useMemo(() => {
    if (barSpacing === undefined) {
      return variant === "horizontal"
        ? (horizontalAlignment === "inline" ? (isCompact ? 8 : 14) : (isCompact ? 8 : 12))
        : (isCompact ? 10 : 18);
    }
    if (typeof barSpacing === "number") {
      return isCompact ? Math.min(barSpacing, 12) : barSpacing;
    }
    return barSpacing;
  }, [barSpacing, isCompact, variant, horizontalAlignment]);

  // Filter & limit data
  const processedData = useMemo(() => {
    let result = [...data];
    if (maxBars && maxBars > 0) {
      result = result.slice(0, maxBars);
    }
    return result;
  }, [data, maxBars]);

  // Max value for scaling
  const calculatedMaxValue = useMemo(() => {
    if (maxValue !== undefined && maxValue > 0) return maxValue;
    if (processedData.length === 0) return 1;
    const maxVal = Math.max(...processedData.map((d) => d.value));
    return maxVal > 0 ? maxVal : 1;
  }, [processedData, maxValue]);

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

  const renderFormattedValue = (item: BarChartItem, calculatedPercentage: number) => {
    if (item.displayValue !== undefined) {
      return String(item.displayValue);
    }
    if (typeof valueFormat === "function") {
      return valueFormat(item.value, calculatedPercentage, item);
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
      return `${item.value}% (${valStr})`;
    }
    // Default percentage
    if (typeof item.value === "number") {
      return `${item.value}%`;
    }
    return `${Math.round(calculatedPercentage)}%`;
  };

  const getBarTooltip = (item: BarChartItem, calculatedPercentage: number) => {
    const formattedValue = tooltipConfig?.formatter
      ? tooltipConfig.formatter(item.value)
      : item.value.toLocaleString();

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2px", textAlign: "center" }}>
        <span style={{ fontWeight: 600, fontSize: "0.8125rem" }}>{item.label}</span>
        <span style={{ fontSize: "0.75rem", opacity: 0.9 }}>
          {formattedValue} {typeof item.value === "number" && item.value % 1 !== 0 ? `(${item.value}%)` : `(${Math.round(calculatedPercentage)}%)`}
        </span>
      </div>
    );
  };

  // Rendering skeletons helper
  const renderSkeletons = () => {
    if (skeletonContent) return skeletonContent;

    const count = maxBars || 5;

    if (variant === "horizontal") {
      const iconSize = isCompact ? "30px" : "36px";
      const barHeight = effectiveHorizontalBarHeight
        ? typeof effectiveHorizontalBarHeight === "number"
          ? `${effectiveHorizontalBarHeight}px`
          : effectiveHorizontalBarHeight
        : horizontalAlignment === "inline"
        ? (isCompact ? "18px" : "24px")
        : isCompact
        ? "8px"
        : "10px";
      const hasIcons = data.length > 0 ? data.some((d) => Boolean(d.icon)) : true;
      const labelWidths = ["42%", "55%", "38%", "50%", "45%"];

      return Array.from({ length: count }).map((_, i) => {
        const labelWidth = labelWidths[i % labelWidths.length];

        if (horizontalAlignment === "inline") {
          return (
            <div
              key={i}
              className="gy-barchart-row--horizontal gy-barchart-row--inline gy-barchart-row--skeleton"
              style={{ pointerEvents: "none", cursor: "default" }}
            >
              {hasIcons && (
                <Skeleton
                  variant="rectangular"
                  width={iconSize}
                  height={iconSize}
                  style={{
                    borderRadius: "var(--gy-radius-lg, 0.5rem)",
                    flexShrink: 0,
                  }}
                />
              )}
              <div className="gy-barchart-label-col--horizontal">
                <Skeleton
                  variant="text"
                  width="70px"
                  height={isCompact ? "12px" : "14px"}
                  style={{ borderRadius: "4px" }}
                />
              </div>
              <div className="gy-barchart-bar-wrapper">
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={barHeight}
                  style={{ borderRadius: "6px" }}
                />
              </div>
              {showValues && (
                <Skeleton
                  variant="text"
                  width={isCompact ? "36px" : "48px"}
                  height={isCompact ? "12px" : "14px"}
                  style={{ borderRadius: "4px" }}
                />
              )}
            </div>
          );
        }

        return (
          <div
            key={i}
            className="gy-barchart-row--horizontal gy-barchart-row--stacked gy-barchart-row--skeleton"
            style={{ pointerEvents: "none", cursor: "default" }}
          >
            {hasIcons && (
              <Skeleton
                variant="rectangular"
                width={iconSize}
                height={iconSize}
                style={{
                  borderRadius: "var(--gy-radius-lg, 0.5rem)",
                  flexShrink: 0,
                }}
              />
            )}
            <div className="gy-barchart-content--horizontal">
              <div className="gy-barchart-row-header--horizontal">
                <Skeleton
                  variant="text"
                  width={labelWidth}
                  height={isCompact ? "12px" : "13px"}
                  style={{ borderRadius: "4px", margin: "2px 0" }}
                />
                {showValues && (
                  <Skeleton
                    variant="text"
                    width={isCompact ? "28px" : "34px"}
                    height={isCompact ? "12px" : "13px"}
                    style={{ borderRadius: "4px", margin: "2px 0" }}
                  />
                )}
              </div>
              <div className="gy-barchart-bar-wrapper">
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={barHeight}
                  style={{ borderRadius: "9999px" }}
                />
              </div>
            </div>
          </div>
        );
      });
    }

    if (variant === "cylindrical") {
      return (
        <div
          className="gy-barchart-skeleton-container"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            justifyContent: "space-around",
            height: "100%",
            width: "100%",
          }}
        >
          {Array.from({ length: count }).map((_, i) => {
            const calculatedWidth = effectiveBarWidth || 42;

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flex: "1 1 0",
                  height: "100%",
                  padding: "0 4px",
                }}
              >
                {showValues && (
                  <Skeleton
                    variant="text"
                    width="36px"
                    height="12px"
                    style={{ borderRadius: "4px", marginBottom: "8px" }}
                  />
                )}
                <div
                  style={{
                    flex: "1 1 0",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width={
                      typeof calculatedWidth === "number"
                        ? `${calculatedWidth}px`
                        : calculatedWidth
                    }
                    height="100%"
                    style={{ borderRadius: "20px" }}
                  />
                </div>
                <Skeleton
                  variant="rectangular"
                  width="28px"
                  height="28px"
                  style={{ borderRadius: "6px", marginTop: "12px" }}
                />
                <Skeleton
                  variant="text"
                  width="44px"
                  height="10px"
                  style={{ borderRadius: "4px", marginTop: "6px" }}
                />
              </div>
            );
          })}
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

  const isHorizontal = variant === "horizontal";
  const defaultHeight = isHorizontal ? "auto" : 320;
  const resolvedHeight = height !== undefined ? height : defaultHeight;
  const isAutoHeight = resolvedHeight === "auto";

  const wrapperStyle: React.CSSProperties = {
    height: typeof resolvedHeight === "number" ? `${resolvedHeight}px` : resolvedHeight,
    width: typeof width === "number" ? `${width}px` : width,
    backgroundColor: backgroundColor || undefined,
    color: textColor || undefined,
    ...tokens,
  };

  const isShort = !isHorizontal && !isAutoHeight && containerHeight > 0 && containerHeight <= 280;

  const rootClasses = [
    "gy-barchart-wrapper",
    isHorizontal ? "gy-barchart-wrapper--horizontal" : "",
    isAutoHeight ? "gy-barchart--auto-height" : "",
    isCompact ? "gy-barchart--compact" : "",
    isShort ? "gy-barchart--short" : "",
    borderless ? "gy-barchart--borderless" : "",
    animate ? "gy-barchart--animate" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={wrapperRef}
      className={rootClasses}
      style={{
        ...wrapperStyle,
        ["--gy-bar-duration" as any]: `${animationDuration}ms`,
        ["--gy-bar-easing" as any]: animationEasing,
      }}
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
          <EmptyState
            size={isShort || isCompact ? "sm" : "md"}
            variant="subtle"
          />
        ) : (
          processedData.map((item, index) => {
            const percentage = calculatedMaxValue > 0
              ? Math.min(100, Math.max(0, (item.value / calculatedMaxValue) * 100))
              : 0;
            const rawColor = item.color || item.fillColor || barColor;
            const isHovered = hoveredIndex === index;
            const isDimmed = hoveredIndex !== null && !isHovered;

            if (variant === "cylindrical") {
              const itemTrackColor = item.trackColor || trackColor;
              const formattedVal = renderFormattedValue(item, percentage);
              const calculatedWidth =
                typeof effectiveBarWidth === "number"
                  ? `${effectiveBarWidth}px`
                  : effectiveBarWidth;

              return (
                <div
                  key={index}
                  className={`gy-barchart-col--cylindrical ${
                    isHovered ? "gy-barchart-col--active" : ""
                  } ${isDimmed ? "gy-barchart-col--dimmed" : ""}`}
                  style={{
                    ["--gy-bar-index" as any]: index,
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={handleResetHover}
                >
                  {/* Top Value / Percentage */}
                  {showValues && (
                    <span
                      className="gy-barchart-bar-value--cylindrical"
                      style={{ color: textColor }}
                    >
                      {formattedVal}
                    </span>
                  )}

                  {/* 3D Glass Cylinder Tube */}
                  <div className="gy-barchart-bar-wrapper gy-barchart-bar-wrapper--cylindrical">
                    <Tooltip
                      content={getBarTooltip(item, percentage)}
                      position="top"
                      delay={40}
                      disabled={tooltipConfig?.show === false}
                    >
                      <div
                        className="gy-barchart-cylinder-3d"
                        style={{
                          width: calculatedWidth,
                          ...(itemTrackColor
                            ? ({ "--gy-cylinder-track": itemTrackColor } as React.CSSProperties)
                            : {}),
                          ...(rawColor
                            ? ({ "--gy-cylinder-fill": rawColor } as React.CSSProperties)
                            : {}),
                        }}
                      >
                        {/* Top 3D Elliptical Cap */}
                        <div className="gy-barchart-cylinder-cap gy-barchart-cylinder-cap--top" />

                        {/* Glass Sheen Specular Highlight */}
                        <div className="gy-barchart-cylinder-sheen" />

                        {/* Cylinder Tube Body */}
                        <div className="gy-barchart-cylinder-body">
                          {/* Liquid Fill Column */}
                          <div
                            className="gy-barchart-cylinder-fill"
                            style={{
                              height: `${percentage}%`,
                              ...(rawColor ? { background: rawColor } : {}),
                            }}
                          >
                            {/* Meniscus Top Ellipse of Liquid */}
                            {percentage > 0 && (
                              <div
                                className="gy-barchart-cylinder-meniscus"
                                style={{
                                  ...(rawColor ? { background: rawColor } : {}),
                                }}
                              />
                            )}
                          </div>
                        </div>

                        {/* Bottom 3D Cap / Base Disk */}
                        <div
                          className={`gy-barchart-cylinder-cap gy-barchart-cylinder-cap--bottom ${
                            percentage > 0
                              ? "gy-barchart-cylinder-cap--filled"
                              : "gy-barchart-cylinder-cap--empty"
                          }`}
                          style={{
                            ...(rawColor && percentage > 0
                              ? { background: rawColor }
                              : {}),
                          }}
                        />
                      </div>
                    </Tooltip>
                  </div>

                  {/* Dedicated Icon slot */}
                  {item.icon && (
                    <div className="gy-barchart-icon-slot--cylindrical">
                      {item.icon}
                    </div>
                  )}

                  {/* Bottom Category Label */}
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
                backgroundColor: rawColor || "var(--gy-primary)",
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
                  style={{
                    ["--gy-bar-index" as any]: index,
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={handleResetHover}
                >
                  {showValues && (
                    <span
                      className="gy-barchart-bar-value--filled"
                      style={{ color: textColor }}
                    >
                      {renderFormattedValue(item, percentage)}
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
              backgroundColor: rawColor || "var(--gy-primary)",
            };

            const customBarHeight = effectiveHorizontalBarHeight
              ? { height: effectiveHorizontalBarHeight }
              : {};

            if (horizontalAlignment === "inline") {
              const itemTrackBg = item.trackColor || trackColor;
              const itemFillBg = item.fillColor || item.color || barColor;

              return (
                <div
                  key={index}
                  className={`gy-barchart-row--horizontal gy-barchart-row--inline ${
                    isHovered ? "gy-barchart-row--active" : ""
                  } ${isDimmed ? "gy-barchart-row--dimmed" : ""}`}
                  style={{
                    ["--gy-bar-index" as any]: index,
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={handleResetHover}
                >
                  {item.icon && (
                    <div className="gy-barchart-icon-square--horizontal">
                      {item.icon}
                    </div>
                  )}
                  <div className="gy-barchart-label-col--horizontal">
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
                  </div>
                  <div className="gy-barchart-bar-wrapper">
                    <Tooltip
                      content={getBarTooltip(item, percentage)}
                      position="top"
                      delay={40}
                      disabled={tooltipConfig?.show === false}
                    >
                      <div
                        className="gy-barchart-track--horizontal gy-barchart-track--inline"
                        style={{
                          ...customBarHeight,
                          ...(itemTrackBg ? { backgroundColor: itemTrackBg } : {}),
                        }}
                      >
                        <div
                          className="gy-barchart-bar--horizontal gy-barchart-bar--inline"
                          style={{
                            width: `${percentage}%`,
                            ...(itemFillBg ? { background: itemFillBg } : {}),
                          }}
                        />
                      </div>
                    </Tooltip>
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
                style={{
                  ["--gy-bar-index" as any]: index,
                }}
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

