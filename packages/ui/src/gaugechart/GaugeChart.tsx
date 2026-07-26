"use client";

import React from "react";
import { Skeleton } from "../skeleton/Skeleton";
import "./gauge-chart.css";

export interface GaugeSegment {
  value: number; // upper limit of segment
  color: string;
  label?: string;
}

export interface GaugeChartProps {
  value: number; // 0 to 100
  segments?: GaugeSegment[];
  height?: number;
  width?: number;
  needle?: boolean;
  loading?: boolean;
  className?: string;
}

const DEFAULT_SEGMENTS: GaugeSegment[] = [
  { value: 33, color: "var(--gy-success)", label: "Low" },
  { value: 66, color: "var(--gy-warning)", label: "Medium" },
  { value: 100, color: "var(--gy-danger)", label: "High" },
];

export function GaugeChart({
  value = 0,
  segments = DEFAULT_SEGMENTS,
  height = 200,
  width = 300,
  needle = true,
  loading = false,
  className = "",
}: GaugeChartProps) {
  const cx = width / 2;
  const cy = height - 40;
  const outerRadius = Math.min(width / 2 - 20, height - 60);
  const innerRadius = outerRadius - 30;

  // Normalized value (0 to 100)
  const normValue = Math.max(0, Math.min(100, value));

  // Math helper to convert polar to cartesian coordinates
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
  const getArcPath = (startAngle: number, endAngle: number) => {
    const startOuter = polarToCartesian(cx, cy, outerRadius, startAngle);
    const endOuter = polarToCartesian(cx, cy, outerRadius, endAngle);
    const startInner = polarToCartesian(cx, cy, innerRadius, startAngle);
    const endInner = polarToCartesian(cx, cy, innerRadius, endAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      `M ${startOuter.x} ${startOuter.y}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y}`,
      `L ${endInner.x} ${endInner.y}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${startInner.x} ${startInner.y}`,
      "Z",
    ].join(" ");
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Skeleton
            variant="circular"
            width="120px"
            height="120px"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          />
        </div>
      );
    }

    // Render needle coordinates
    const needleAngle = (normValue / 100) * 180; // 0 to 180 degrees
    const needleLen = outerRadius - 10;
    const needleTip = polarToCartesian(cx, cy, needleLen, needleAngle);

    // Compute segments start/end angles
    let prevVal = 0;
    const renderedSegments = segments.map((seg, idx) => {
      const startAngle = (prevVal / 100) * 180;
      const endAngle = (seg.value / 100) * 180;
      prevVal = seg.value;
      return (
        <path key={idx} d={getArcPath(startAngle, endAngle)} fill={seg.color} />
      );
    });

    return (
      <svg width={width} height={height} className="gy-gauge-svg">
        {/* Render Segment Arcs */}
        {renderedSegments}

        {/* Gauge Needle (Speedometer arm) */}
        {needle && (
          <g>
            <line
              x1={cx}
              y1={cy}
              x2={needleTip.x}
              y2={needleTip.y}
              stroke="var(--gy-text)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Center Pivot Circle */}
            <circle
              cx={cx}
              cy={cy}
              r="8"
              fill="var(--gy-surface)"
              stroke="var(--gy-text)"
              strokeWidth="3.5"
            />
          </g>
        )}

        {/* Value Label */}
        <text
          x={cx}
          y={cy + 30}
          textAnchor="middle"
          className="gy-gauge-value-text"
        >
          {normValue}%
        </text>
      </svg>
    );
  };

  return (
    <div
      className={`gy-gaugechart-wrapper ${className}`}
      style={{ width, height }}
    >
      {renderContent()}
    </div>
  );
}
