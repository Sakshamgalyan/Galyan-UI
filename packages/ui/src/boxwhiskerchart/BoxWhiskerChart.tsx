"use client";

import React, { useState, useRef } from "react";
import { Skeleton } from "../skeleton/Skeleton";
import "./box-whisker-chart.css";

export interface BoxWhiskerItem {
  label: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
}

export interface BoxWhiskerChartProps {
  data: BoxWhiskerItem[];
  height?: number;
  width?: number;
  color?: string; // default: var(--gy-primary)
  loading?: boolean;
  className?: string;
}

export function BoxWhiskerChart({
  data = [],
  height = 350,
  width = 500,
  color = "var(--gy-primary)",
  loading = false,
  className = "",
}: BoxWhiskerChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const padding = 50;
  const chartHeight = height - padding * 2;
  const chartWidth = width - padding * 2;

  // Calculate global min and max for scaling
  const { minVal, maxVal } = React.useMemo(() => {
    if (data.length === 0) return { minVal: 0, maxVal: 100 };
    const mins = data.map((d) => d.min);
    const maxs = data.map((d) => d.max);
    return {
      minVal: Math.min(...mins) * 0.9, // Add some padding below min
      maxVal: Math.max(...maxs) * 1.1, // Add some padding above max
    };
  }, [data]);

  const scaleY = (val: number) => {
    const range = maxVal - minVal || 1;
    // Map val to y-coordinate (Y increases downwards in SVG)
    return height - padding - ((val - minVal) / range) * chartHeight;
  };

  const handleMouseEnter = (idx: number, e: React.MouseEvent) => {
    setHoveredIndex(idx);
    const rect = (e.currentTarget as SVGElement).getBoundingClientRect();
    const container = containerRef.current;
    if (container) {
      const containerRect = container.getBoundingClientRect();
      setTooltipPos({
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            gap: "24px",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Skeleton
            variant="rectangular"
            width="40px"
            height="150px"
            style={{ borderRadius: "4px" }}
          />
          <Skeleton
            variant="rectangular"
            width="40px"
            height="180px"
            style={{ borderRadius: "4px" }}
          />
        </div>
      );
    }

    const colWidth = chartWidth / data.length;

    return (
      <svg width={width} height={height} className="gy-boxwhisker-svg">
        {/* Draw Y Axis Gridlines */}
        {Array.from({ length: 5 }).map((_, i) => {
          const val = minVal + ((maxVal - minVal) / 4) * i;
          const y = scaleY(val);
          return (
            <g key={i}>
              <line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="var(--gy-border)"
                strokeWidth="0.5"
                strokeDasharray="3 3"
              />
              <text
                x={padding - 8}
                y={y + 4}
                textAnchor="end"
                className="gy-boxwhisker-axis-text"
              >
                {val.toFixed(0)}
              </text>
            </g>
          );
        })}

        {/* Draw Boxes */}
        {data.map((item, idx) => {
          const x = padding + colWidth * idx + colWidth / 2;
          const yMin = scaleY(item.min);
          const yQ1 = scaleY(item.q1);
          const yMedian = scaleY(item.median);
          const yQ3 = scaleY(item.q3);
          const yMax = scaleY(item.max);

          const boxWidth = Math.min(40, colWidth * 0.6);

          return (
            <g
              key={idx}
              className="gy-boxwhisker-item"
              onMouseEnter={(e) => handleMouseEnter(idx, e)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Whisker Line */}
              <line
                x1={x}
                y1={yMin}
                x2={x}
                y2={yMax}
                stroke="var(--gy-text)"
                strokeWidth="1.5"
              />

              {/* Bottom Whisker Cap */}
              <line
                x1={x - 10}
                y1={yMin}
                x2={x + 10}
                y2={yMin}
                stroke="var(--gy-text)"
                strokeWidth="1.5"
              />

              {/* Top Whisker Cap */}
              <line
                x1={x - 10}
                y1={yMax}
                x2={x + 10}
                y2={yMax}
                stroke="var(--gy-text)"
                strokeWidth="1.5"
              />

              {/* Box (Q1 to Q3) */}
              <rect
                x={x - boxWidth / 2}
                y={yQ3}
                width={boxWidth}
                height={Math.max(2, yQ1 - yQ3)}
                fill={color}
                fillOpacity={0.65}
                stroke="var(--gy-text)"
                strokeWidth="1.5"
                className="gy-boxwhisker-rect"
              />

              {/* Median Line */}
              <line
                x1={x - boxWidth / 2}
                y1={yMedian}
                x2={x + boxWidth / 2}
                y2={yMedian}
                stroke="var(--gy-text)"
                strokeWidth="2.5"
              />

              {/* Label */}
              <text
                x={x}
                y={height - padding + 20}
                textAnchor="middle"
                className="gy-boxwhisker-axis-text"
              >
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`gy-boxwhisker-wrapper ${className}`}
      style={{ width, height }}
    >
      {renderContent()}

      {/* Boxplot Hover Tooltip */}
      {hoveredIndex !== null && data[hoveredIndex] && (
        <div
          className="gy-boxwhisker-tooltip"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
          }}
        >
          <div className="gy-boxwhisker-tooltip-title">
            {data[hoveredIndex].label}
          </div>
          <div className="gy-boxwhisker-tooltip-row">
            <span>Max:</span> <strong>{data[hoveredIndex].max}</strong>
          </div>
          <div className="gy-boxwhisker-tooltip-row">
            <span>Q3 (75%):</span> <strong>{data[hoveredIndex].q3}</strong>
          </div>
          <div className="gy-boxwhisker-tooltip-row">
            <span>Median:</span> <strong>{data[hoveredIndex].median}</strong>
          </div>
          <div className="gy-boxwhisker-tooltip-row">
            <span>Q1 (25%):</span> <strong>{data[hoveredIndex].q1}</strong>
          </div>
          <div className="gy-boxwhisker-tooltip-row">
            <span>Min:</span> <strong>{data[hoveredIndex].min}</strong>
          </div>
        </div>
      )}
    </div>
  );
}
