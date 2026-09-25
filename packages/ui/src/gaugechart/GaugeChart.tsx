"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Skeleton } from "../skeleton/Skeleton";
import { Tooltip } from "../tooltip/Tooltip";
import "./gauge-chart.css";

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
}

const DEFAULT_SEGMENTS: GaugeSegment[] = [
  { value: 33, color: "var(--gy-success, #10b981)", label: "Low" },
  { value: 66, color: "var(--gy-warning, #f59e0b)", label: "Medium" },
  { value: 100, color: "var(--gy-danger, #ef4444)", label: "High" },
];

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
}: GaugeChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(
    typeof width === "number" ? width : 300
  );
  const [containerHeight, setContainerHeight] = useState<number>(
    typeof height === "number" ? height : 220
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

  const numWidth = containerWidth || 300;
  const numHeight =
    typeof height === "number" ? height : containerHeight || 220;
  const isCompact = numWidth < 360;

  const cx = numWidth / 2;
  const cy = numHeight - (showLegend ? 58 : 42);
  const outerRadius = Math.max(40, Math.min(numWidth / 2 - 24, cy - 20));
  const innerRadius = Math.max(20, outerRadius - (isCompact ? 22 : 30));

  // Normalized value (min to max)
  const normValue = Math.max(min, Math.min(max, value));
  const maxRange = max - min || 1;

  // Math helper to convert polar to cartesian coordinates (0 deg = 9 o'clock, 180 deg = 3 o'clock)
  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
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
    inRad: number
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
      const isCurrent = normValue >= startVal && normValue <= endVal;

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
  }, [segments, min, maxRange, outerRadius, innerRadius, cx, cy, normValue]);

  const currentSegment = useMemo(() => {
    return (
      computedSegments.find((s) => s.isCurrent) || computedSegments[0]
    );
  }, [computedSegments]);

  const formatValue = (v: number) => {
    if (tooltipConfig?.formatter) return tooltipConfig.formatter(v);
    return `${v}${unit}`;
  };

  const renderSegmentTooltip = (
    seg: (typeof computedSegments)[0]
  ) => {
    return (
      <div className="gy-gauge-tooltip">
        <div className="gy-gauge-tooltip-header">
          <span
            className="gy-gauge-tooltip-badge"
            style={{ backgroundColor: seg.color }}
          />
          <span className="gy-gauge-tooltip-title">
            {seg.label || `Segment ${seg.idx + 1}`}
          </span>
        </div>
        <div className="gy-gauge-tooltip-range">
          <span>Range:</span>
          <strong>
            {formatValue(seg.startVal)} – {formatValue(seg.endVal)}
          </strong>
        </div>
        {seg.isCurrent && (
          <div className="gy-gauge-tooltip-current">
            <span>Current Value:</span>
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
    const needleTip = polarToCartesian(cx, cy, needleLen, needleAngle);

    return (
      <div className="gy-gauge-body">
        <div className="gy-gauge-svg-container">
          <svg
            width={numWidth}
            height={numHeight - (showLegend ? 32 : 0)}
            className="gy-gauge-svg"
            viewBox={`0 0 ${numWidth} ${numHeight - (showLegend ? 32 : 0)}`}
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
              const segOuter = isHovered
                ? outerRadius + 8
                : outerRadius;
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
                    segInner
                  )}
                  fill={seg.color}
                  fillOpacity={
                    hoveredIndex === null
                      ? 0.92
                      : isHovered
                        ? 1
                        : 0.55
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
              <g className="gy-gauge-needle-group">
                <line
                  x1={cx}
                  y1={cy}
                  x2={needleTip.x}
                  y2={needleTip.y}
                  stroke="var(--gy-text, #0f172a)"
                  strokeWidth={isCompact ? "3" : "3.5"}
                  strokeLinecap="round"
                  className="gy-gauge-needle-line"
                />
                {/* Pivot Outer Ring */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isCompact ? 9 : 11}
                  fill="var(--gy-surface, #ffffff)"
                  stroke="var(--gy-text, #0f172a)"
                  strokeWidth={isCompact ? "2.5" : "3"}
                />
                {/* Pivot Center Pin */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isCompact ? 4 : 5}
                  fill={currentSegment?.color || "var(--gy-primary, #3b82f6)"}
                />
              </g>
            )}

            {/* Value Label */}
            {showValue && (
              <g>
                <text
                  x={cx}
                  y={cy + (isCompact ? 22 : 26)}
                  textAnchor="middle"
                  className="gy-gauge-value-text"
                >
                  {formatValue(normValue)}
                </text>
                {currentSegment?.label && (
                  <text
                    x={cx}
                    y={cy + (isCompact ? 35 : 40)}
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
                >
                  <span
                    className="gy-gauge-legend-dot"
                    style={{ backgroundColor: seg.color }}
                  />
                  <span className="gy-gauge-legend-label">
                    {seg.label || `Segment ${seg.idx + 1}`}
                  </span>
                  <span className="gy-gauge-legend-range">
                    ({formatValue(seg.startVal)}–{formatValue(seg.endVal)})
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
