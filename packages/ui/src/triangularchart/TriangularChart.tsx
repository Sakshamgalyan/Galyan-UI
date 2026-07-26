"use client";

import React, { useState, useRef } from "react";
import { Skeleton } from "../skeleton/Skeleton";
import "./triangular-chart.css";

export interface TriangularChartItem {
  a: number; // component A (e.g. Clay %)
  b: number; // component B (e.g. Silt %)
  c: number; // component C (e.g. Sand %)
  name: string;
}

export interface TriangularChartProps {
  data: TriangularChartItem[];
  labelA?: string;
  labelB?: string;
  labelC?: string;
  height?: number;
  width?: number;
  color?: string;
  loading?: boolean;
  className?: string;
}

export function TriangularChart({
  data = [],
  labelA = "Component A",
  labelB = "Component B",
  labelC = "Component C",
  height = 360,
  width = 400,
  color = "var(--gy-primary)",
  loading = false,
  className = "",
}: TriangularChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const padding = 50;
  const leftX = padding;
  const leftY = height - padding;
  const rightX = width - padding;
  const rightY = height - padding;
  const topX = width / 2;
  const topY = padding;

  const getCoords = (a: number, b: number, c: number) => {
    const total = a + b + c || 1;
    const na = a / total;
    const nb = b / total;
    const nc = c / total;

    // Linear combination of the three vertices
    const x = na * leftX + nb * rightX + nc * topX;
    const y = na * leftY + nb * rightY + nc * topY;
    return { x, y };
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

  // Generate ticks/gridlines for ternary plot (e.g. increments of 20%)
  const renderGridLines = () => {
    const increments = [0.2, 0.4, 0.6, 0.8];
    return increments.map((frac) => {
      // Lines parallel to side opposite to C (na + nb = fraction)
      const c1 = getCoords(1 - frac, 0, frac);
      const c2 = getCoords(0, 1 - frac, frac);

      // Lines parallel to side opposite to A (nb + nc = fraction)
      const a1 = getCoords(frac, 1 - frac, 0);
      const a2 = getCoords(frac, 0, 1 - frac);

      // Lines parallel to side opposite to B (na + nc = fraction)
      const b1 = getCoords(1 - frac, frac, 0);
      const b2 = getCoords(0, frac, 1 - frac);

      return (
        <g
          key={`grid-${frac}`}
          stroke="var(--gy-border)"
          strokeWidth="0.5"
          strokeDasharray="2 2"
        >
          <line x1={c1.x} y1={c1.y} x2={c2.x} y2={c2.y} />
          <line x1={a1.x} y1={a1.y} x2={a2.x} y2={a2.y} />
          <line x1={b1.x} y1={b1.y} x2={b2.x} y2={b2.y} />
        </g>
      );
    });
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
            variant="rectangular"
            width="80%"
            height="80%"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          />
        </div>
      );
    }

    return (
      <svg width={width} height={height} className="gy-triangular-svg">
        {/* Main Equilateral Triangle Polygon */}
        <polygon
          points={`${leftX},${leftY} ${rightX},${rightY} ${topX},${topY}`}
          fill="none"
          stroke="var(--gy-border-strong)"
          strokeWidth="2"
        />

        {/* Ticks Gridlines */}
        {renderGridLines()}

        {/* Vertex Labels */}
        <text
          x={leftX - 10}
          y={leftY + 15}
          textAnchor="end"
          className="gy-triangular-vertex-text"
        >
          {labelA}
        </text>
        <text
          x={rightX + 10}
          y={rightY + 15}
          textAnchor="start"
          className="gy-triangular-vertex-text"
        >
          {labelB}
        </text>
        <text
          x={topX}
          y={topY - 15}
          textAnchor="middle"
          className="gy-triangular-vertex-text"
        >
          {labelC}
        </text>

        {/* Data Plots */}
        {data.map((item, idx) => {
          const { x, y } = getCoords(item.a, item.b, item.c);
          const isHovered = hoveredIndex === idx;

          return (
            <circle
              key={idx}
              cx={x}
              cy={y}
              r={isHovered ? 8 : 6}
              fill={color}
              stroke="var(--gy-surface)"
              strokeWidth="2"
              className="gy-triangular-dot"
              onMouseEnter={(e) => handleMouseEnter(idx, e)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
      </svg>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`gy-triangular-wrapper ${className}`}
      style={{ width, height }}
    >
      {renderContent()}

      {/* Floating Hover Tooltip */}
      {hoveredIndex !== null && data[hoveredIndex] && (
        <div
          className="gy-triangular-tooltip"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
          }}
        >
          <div className="gy-triangular-tooltip-title">
            {data[hoveredIndex].name}
          </div>
          <div className="gy-triangular-tooltip-row">
            <span>{labelA}:</span>{" "}
            <strong>{data[hoveredIndex].a.toFixed(1)}%</strong>
          </div>
          <div className="gy-triangular-tooltip-row">
            <span>{labelB}:</span>{" "}
            <strong>{data[hoveredIndex].b.toFixed(1)}%</strong>
          </div>
          <div className="gy-triangular-tooltip-row">
            <span>{labelC}:</span>{" "}
            <strong>{data[hoveredIndex].c.toFixed(1)}%</strong>
          </div>
        </div>
      )}
    </div>
  );
}
