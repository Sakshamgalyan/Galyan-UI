"use client";

import React, { useState, useRef } from "react";
import { Skeleton } from "../skeleton/Skeleton";
import "./correlation-chart.css";

export interface CorrelationChartProps {
  variables: string[];
  matrix: number[][]; // values between -1 and 1
  height?: number | string;
  width?: number | string;
  positiveColor?: string; // default: var(--gy-primary)
  negativeColor?: string; // default: var(--gy-danger)
  loading?: boolean;
  className?: string;
}

export function CorrelationChart({
  variables = [],
  matrix = [],
  height = 350,
  width = "100%",
  positiveColor = "var(--gy-primary)",
  negativeColor = "var(--gy-danger)",
  loading = false,
  className = "",
}: CorrelationChartProps) {
  const [hoveredCell, setHoveredCell] = useState<{
    x: string;
    y: string;
    value: number;
  } | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (
    x: string,
    y: string,
    value: number,
    e: React.MouseEvent,
  ) => {
    setHoveredCell({ x, y, value });
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
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
    setHoveredCell(null);
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
          }}
        >
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            style={{ borderRadius: "8px" }}
          />
        </div>
      );
    }

    return (
      <div className="gy-correlation-grid-container">
        {/* Y Axis Labels Column */}
        <div className="gy-correlation-y-labels">
          {variables.map((v) => (
            <div key={v} className="gy-correlation-y-label">
              {v}
            </div>
          ))}
          {/* Spacer */}
          <div className="gy-correlation-y-label-spacer" />
        </div>

        {/* Matrix Grid Wrapper */}
        <div className="gy-correlation-main-grid-wrapper">
          <div
            className="gy-correlation-grid"
            style={{
              gridTemplateColumns: `repeat(${variables.length}, 1fr)`,
              gridTemplateRows: `repeat(${variables.length}, 1fr)`,
            }}
          >
            {variables.map((yVar, yIdx) =>
              variables.map((xVar, xIdx) => {
                const val = matrix[yIdx]?.[xIdx] ?? 0;
                const opacity = Math.abs(val);
                const bg = val >= 0 ? positiveColor : negativeColor;

                return (
                  <div
                    key={`${xVar}-${yVar}`}
                    className="gy-correlation-cell"
                    style={{
                      backgroundColor: bg,
                      opacity: opacity === 0 ? 0.05 : 0.1 + opacity * 0.9,
                    }}
                    onMouseEnter={(e) => handleMouseEnter(xVar, yVar, val, e)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span className="gy-correlation-cell-text">
                      {val.toFixed(2)}
                    </span>
                  </div>
                );
              }),
            )}
          </div>

          {/* X Axis Labels Row */}
          <div
            className="gy-correlation-x-labels"
            style={{
              gridTemplateColumns: `repeat(${variables.length}, 1fr)`,
            }}
          >
            {variables.map((v) => (
              <div key={v} className="gy-correlation-x-label">
                {v}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`gy-correlation-wrapper ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    >
      {renderContent()}

      {/* Correlation Tooltip */}
      {hoveredCell && (
        <div
          className="gy-correlation-tooltip"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
          }}
        >
          <div className="gy-correlation-tooltip-title">
            r({hoveredCell.x}, {hoveredCell.y})
          </div>
          <div className="gy-correlation-tooltip-value">
            Correlation: {hoveredCell.value.toFixed(4)}
          </div>
        </div>
      )}
    </div>
  );
}
