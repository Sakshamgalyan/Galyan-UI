"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Skeleton } from "../skeleton/Skeleton";
import { Tooltip } from "../tooltip/Tooltip";
import "./gauge-chart.css";
import { Typography } from "../typography";

export interface GaugeSegment {
  value: number; // upper limit of segment
  color: string;
  label?: string;
  min?: number;
}

export interface GaugeChartTooltipConfig {
  show?: boolean;
  formatter?: (value: number) => string;
}

export interface GaugeChartProps {
  value: number; // 0 to max (default 0 to 100)
  min?: number; // default 0
  max?: number; // default 100
  segments?: GaugeSegment[];
  height?: number | string;
  width?: number | string;
  needle?: boolean;
  loading?: boolean;
  className?: string;
  responsive?: boolean;
  showValue?: boolean;
  showLegend?: boolean;
  unit?: string;
  tooltipConfig?: GaugeChartTooltipConfig;
  tokens?: Record<string, string>;
  onSegmentClick?: (segment: GaugeSegment, index: number) => void;
  animate?: boolean;
  animationDuration?: number;
  animationEasing?:
    | "ease"
    | "ease-in"
    | "ease-out"
    | "ease-in-out"
    | "linear"
    | "spring";
}

const DEFAULT_SEGMENTS: GaugeSegment[] = [
  { value: 33, color: "var(--gy-success, #10b981)", label: "Low" },
  { value: 66, color: "var(--gy-warning, #f59e0b)", label: "Medium" },
  { value: 100, color: "var(--gy-danger, #ef4444)", label: "High" },
];

const EASING_MAP: Record<string, string> = {
  ease: "ease",
  "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
  "ease-out": "cubic-bezier(0.16, 1, 0.3, 1)",
  "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
  linear: "linear",
  spring: "cubic-bezier(0.34, 1.45, 0.64, 1)",
};

export function GaugeChart({
  value = 0,
  min = 0,
  max = 100,
  segments = DEFAULT_SEGMENTS,
  height = 220,
  width = "100%",
  needle = true,
  loading = false,
  className = "",
  responsive = true,
  showValue = true,
  showLegend = true,
  unit = "%",
  tooltipConfig = { show: true },
  tokens,
  onSegmentClick,
  animate = true,
  animationDuration = 1000,
  animationEasing = "ease-out",
}: GaugeChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(
    typeof width === "number" ? width : 300,
  );
  const [containerHeight, setContainerHeight] = useState<number>(
    typeof height === "number" ? height : 220,
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Normalized value (min to max)
  const normValue = Math.max(min, Math.min(max, value));
  const [displayValue, setDisplayValue] = useState<number>(
    animate ? min : normValue,
  );
  const prevValueRef = useRef<number>(animate ? min : normValue);

  // Mount effect to trigger needle sweep
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Animated counter for value
  useEffect(() => {
    if (!animate) {
      setDisplayValue(normValue);
      prevValueRef.current = normValue;
      return;
    }

    const startVal = prevValueRef.current;
    const endVal = normValue;
    if (startVal === endVal) {
      setDisplayValue(endVal);
      return;
    }

    const startTime = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / animationDuration);
      const eased =
        animationEasing === "linear"
          ? progress
          : animationEasing === "ease-in"
            ? progress * progress * progress
            : animationEasing === "ease-in-out"
              ? progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2
              : 1 - Math.pow(1 - progress, 3);

      const current = Math.round(startVal + (endVal - startVal) * eased);
      setDisplayValue(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        prevValueRef.current = endVal;
        setDisplayValue(endVal);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [normValue, animate, animationDuration, animationEasing]);

  // ResizeObserver for responsive width & height calculation
  useEffect(() => {
    if (!responsive) return;
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0) setContainerWidth(w);
        if (h > 0) setContainerHeight(h);
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [responsive, height]);

  const numWidth = containerWidth || 300;
  const numHeight =
    typeof height === "number" ? height : containerHeight || 220;
  const isCompact = numWidth < 360;

  // Available vertical space inside wrapper (accounting for wrapper padding: 1rem or 0.75rem)
  const wrapperPaddingY = isCompact ? 24 : 32;
  const availHeight = Math.max(
    100,
    containerHeight > 0 ? containerHeight : numHeight - wrapperPaddingY,
  );

  // Top clearance for arc stroke / hover elevation
  const topClearance = isCompact ? 8 : 12;

  // Space reserved below pivot for value text & status label
  const valueAreaHeight = showValue ? (isCompact ? 42 : 50) : 8;

  // Space reserved for legend at the bottom
  const legendAreaHeight =
    showLegend && segments.length > 0 ? (isCompact ? 24 : 32) : 0;

  // Radius calculation guaranteeing that arc, pivot, value, and legend all fit without overlap
  const maxRadiusByHeight = Math.max(
    30,
    availHeight -
      topClearance -
      valueAreaHeight -
      (showLegend ? legendAreaHeight + 6 : 0),
  );
  const maxRadiusByWidth = Math.max(30, numWidth / 2 - (isCompact ? 16 : 24));
  const outerRadius = Math.min(maxRadiusByWidth, maxRadiusByHeight);
  const strokeWidth = isCompact ? 18 : 24;
  const innerRadius = Math.max(16, outerRadius - strokeWidth);

  // Exact center pivot
  const cx = numWidth / 2;
  const cy = topClearance + outerRadius;

  // Dedicated SVG height containing the arc and the value label
  const svgHeight = cy + (showValue ? valueAreaHeight : 6);
  const maxRange = max - min || 1;

  // Math helper to convert polar to cartesian coordinates (0 deg = 9 o'clock, 180 deg = 3 o'clock)
  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number,
  ) => {
    const angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  // Generate SVG path for a ring segment
  const getArcPath = (
    startAngle: number,
    endAngle: number,
    outRad: number,
    inRad: number,
  ) => {
    const gap = segments.length > 1 ? 1 : 0;
    const sAngle = Math.min(startAngle + gap, endAngle);
    const eAngle = Math.max(endAngle - gap, startAngle);

    const startOuter = polarToCartesian(cx, cy, outRad, sAngle);
    const endOuter = polarToCartesian(cx, cy, outRad, eAngle);
    const startInner = polarToCartesian(cx, cy, inRad, sAngle);
    const endInner = polarToCartesian(cx, cy, inRad, eAngle);

    const largeArcFlag = eAngle - sAngle <= 180 ? "0" : "1";

    return [
      `M ${startOuter.x} ${startOuter.y}`,
      `A ${outRad} ${outRad} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y}`,
      `L ${endInner.x} ${endInner.y}`,
      `A ${inRad} ${inRad} 0 ${largeArcFlag} 0 ${startInner.x} ${startInner.y}`,
      "Z",
    ].join(" ");
  };

  const activeVal = animate ? displayValue : normValue;
  const cssEasing =
    EASING_MAP[animationEasing] || "cubic-bezier(0.16, 1, 0.3, 1)";

  const computedSegments = useMemo(() => {
    let prevVal = min;
    return segments.map((seg, idx) => {
      const startVal = seg.min !== undefined ? seg.min : prevVal;
      const endVal = seg.value;
      prevVal = endVal;

      const startAngle = ((startVal - min) / maxRange) * 180;
      const endAngle = ((endVal - min) / maxRange) * 180;
      const midAngle = (startAngle + endAngle) / 2;
      const midRadius = (outerRadius + innerRadius) / 2;
      const hotspotPos = polarToCartesian(cx, cy, midRadius, midAngle);
      const isCurrent = activeVal >= startVal && activeVal <= endVal;

      return {
        ...seg,
        startVal,
        endVal,
        startAngle,
        endAngle,
        midAngle,
        hotspotPos,
        isCurrent,
        idx,
      };
    });
  }, [segments, min, maxRange, outerRadius, innerRadius, cx, cy, activeVal]);

  const currentSegment = useMemo(() => {
    return (
      computedSegments.find((s) => s.isCurrent) ||
      (activeVal > max
        ? computedSegments[computedSegments.length - 1]
        : computedSegments[0])
    );
  }, [computedSegments, activeVal, max]);

  const formatValue = (v: number) => {
    if (tooltipConfig?.formatter) return tooltipConfig.formatter(v);
    return `${v}${unit}`;
  };

  const renderSegmentTooltip = (seg: (typeof computedSegments)[0]) => {
    return (
      <div className="gy-gauge-tooltip">
        <div className="gy-gauge-tooltip-header">
          <span
            className="gy-gauge-tooltip-badge"
            style={{ backgroundColor: seg.color }}
          />
          <Typography variant="span" className="gy-gauge-tooltip-title">
            {seg.label || `Segment ${seg.idx + 1}`}
          </Typography>
        </div>
        <div className="gy-gauge-tooltip-range">
          <Typography variant="span">Range:</Typography>
          <strong>
            {formatValue(seg.startVal)} – {formatValue(seg.endVal)}
          </strong>
        </div>
        {seg.isCurrent && (
          <div className="gy-gauge-tooltip-current">
            <Typography variant="span">Current Value:</Typography>
            <strong>{formatValue(normValue)}</strong>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div
          className="gy-gauge-skeleton-container"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
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
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 55%, 0% 55%)",
              borderRadius: "50%",
            }}
          />
          <Skeleton variant="text" width="60px" height="16px" />
        </div>
      );
    }

    // Needle calculations
    const needleAngle = ((normValue - min) / maxRange) * 180;
    const needleLen = outerRadius - 6;

    return (
      <div className="gy-gauge-body">
        <div
          className="gy-gauge-svg-container"
          style={{ height: `${svgHeight}px` }}
        >
          <svg
            width={numWidth}
            height={svgHeight}
            className="gy-gauge-svg"
            viewBox={`0 0 ${numWidth} ${svgHeight}`}
            style={{
              width: "100%",
              height: `${svgHeight}px`,
              maxWidth: "100%",
            }}
          >
            <defs>
              <filter
                id="gy-gauge-shadow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feDropShadow
                  dx="0"
                  dy="4"
                  stdDeviation="5"
                  floodOpacity="0.25"
                />
              </filter>
            </defs>

            {/* Gauge Background Base Track */}
            <path
              d={getArcPath(0, 180, outerRadius, innerRadius)}
              fill="var(--gy-background-muted, #f1f5f9)"
            />

            {/* Segment Arcs */}
            {computedSegments.map((seg) => {
              const isHovered = hoveredIndex === seg.idx;
              const segOuter = isHovered ? outerRadius + 8 : outerRadius;
              const segInner = isHovered
                ? Math.max(10, innerRadius - 2)
                : innerRadius;

              return (
                <path
                  key={seg.idx}
                  d={getArcPath(
                    seg.startAngle,
                    seg.endAngle,
                    segOuter,
                    segInner,
                  )}
                  fill={seg.color}
                  fillOpacity={
                    hoveredIndex === null ? 0.92 : isHovered ? 1 : 0.55
                  }
                  stroke="var(--gy-surface, #ffffff)"
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  filter={isHovered ? "url(#gy-gauge-shadow)" : undefined}
                  className={`gy-gauge-segment-path ${isHovered ? "gy-gauge-segment-path--hovered" : ""}`}
                  onMouseEnter={() => setHoveredIndex(seg.idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => onSegmentClick?.(seg, seg.idx)}
                />
              );
            })}

            {/* Gauge Needle */}
            {needle && (
              <g
                className="gy-gauge-needle-group"
                style={{
                  transform: `rotate(${isMounted || !animate ? needleAngle : 0}deg)`,
                  transformOrigin: `${cx}px ${cy}px`,
                  transition: animate
                    ? `transform ${animationDuration}ms ${cssEasing}`
                    : "none",
                }}
              >
                <line
                  x1={cx}
                  y1={cy}
                  x2={cx - needleLen}
                  y2={cy}
                  stroke="var(--gy-text, #0f172a)"
                  strokeWidth={isCompact ? "2.5" : "3.5"}
                  strokeLinecap="round"
                  className="gy-gauge-needle-line"
                />
                {/* Pivot Outer Ring */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isCompact ? 7 : 9}
                  fill="var(--gy-surface, #ffffff)"
                  stroke="var(--gy-text, #0f172a)"
                  strokeWidth={isCompact ? "2" : "2.5"}
                />
                {/* Pivot Center Pin */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isCompact ? 3 : 4}
                  fill={currentSegment?.color || "var(--gy-primary, #3b82f6)"}
                  className="gy-gauge-needle-pin"
                />
              </g>
            )}

            {/* Value Label */}
            {showValue && (
              <g className="gy-gauge-value-group">
                <text
                  x={cx}
                  y={cy + (isCompact ? 24 : 28)}
                  textAnchor="middle"
                  className="gy-gauge-value-text"
                >
                  {formatValue(animate ? displayValue : normValue)}
                </text>
                {currentSegment?.label && (
                  <text
                    x={cx}
                    y={cy + (isCompact ? 37 : 43)}
                    textAnchor="middle"
                    className="gy-gauge-value-subtext"
                    fill={currentSegment.color}
                  >
                    {currentSegment.label}
                  </text>
                )}
              </g>
            )}
          </svg>

          {/* Floating Tooltip Hitbox Overlay */}
          <div className="gy-gauge-overlay">
            {computedSegments.map((seg) => (
              <div
                key={seg.idx}
                className="gy-gauge-hotspot-wrapper"
                style={{
                  position: "absolute",
                  left: `${seg.hotspotPos.x}px`,
                  top: `${seg.hotspotPos.y}px`,
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "auto",
                }}
                onMouseEnter={() => setHoveredIndex(seg.idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Tooltip
                  content={renderSegmentTooltip(seg)}
                  position="top"
                  disabled={tooltipConfig?.show === false}
                  delay={30}
                >
                  <div
                    className="gy-gauge-hotspot"
                    style={{
                      width: `${Math.max(36, (outerRadius - innerRadius) * 1.5)}px`,
                      height: `${Math.max(28, (outerRadius - innerRadius) * 1.2)}px`,
                    }}
                  />
                </Tooltip>
              </div>
            ))}
          </div>
        </div>

        {/* Responsive Legend */}
        {showLegend && segments.length > 0 && (
          <div className="gy-gauge-legend">
            {computedSegments.map((seg) => {
              const isHovered = hoveredIndex === seg.idx;
              return (
                <button
                  key={seg.idx}
                  type="button"
                  className={`gy-gauge-legend-item ${
                    isHovered ? "gy-gauge-legend-item--active" : ""
                  } ${
                    hoveredIndex !== null && !isHovered
                      ? "gy-gauge-legend-item--dimmed"
                      : ""
                  }`}
                  onMouseEnter={() => setHoveredIndex(seg.idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => onSegmentClick?.(seg, seg.idx)}
                  title={`${seg.label || "Segment"}: ${formatValue(seg.startVal)} – ${formatValue(seg.endVal)}`}
                >
                  <span
                    className="gy-gauge-legend-dot"
                    style={{ backgroundColor: seg.color }}
                  />
                  <Typography variant="span" className="gy-gauge-legend-label">
                    {seg.label || `Segment ${seg.idx + 1}`}
                  </Typography>
                  <Typography variant="span" className="gy-gauge-legend-range">
                    ({formatValue(seg.startVal)}–{formatValue(seg.endVal)})
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
      className={`gy-gaugechart-wrapper ${isCompact ? "gy-gaugechart--compact" : ""} ${className}`}
      style={wrapperStyle}
    >
      {renderContent()}
    </div>
  );
}
