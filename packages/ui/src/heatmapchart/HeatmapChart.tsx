"use client";

import React, { useMemo, useState, useRef } from "react";
import { Skeleton } from "../skeleton/Skeleton";
import "./heatmap-chart.css";

export interface HeatmapDataCell {
  x: string;
  y: string;
  value: number;
}

export interface HeatmapChartProps {
  data: HeatmapDataCell[];
  xAxisLabels: string[];
  yAxisLabels: string[];
  height?: number | string;
  width?: number | string;
  baseColor?: string; // e.g. var(--gy-primary)
  loading?: boolean;
  className?: string;
}

export function HeatmapChart({
  data = [],
  xAxisLabels = [],
  yAxisLabels = [],
  height = 350,
  width = "100%",
  baseColor = "var(--gy-primary)",
  loading = false,
  className = "",
}: HeatmapChartProps) {
  const [hoveredCell, setHoveredCell] = useState<HeatmapDataCell | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Compute min and max values for color scaling
  const { minVal, maxVal } = useMemo(() => {
    if (data.length === 0) return { minVal: 0, maxVal: 1 };
    const values = data.map((d) => d.value);
    return {
      minVal: Math.min(...values),
      maxVal: Math.max(...values, 1),
    };
  }, [data]);

  // Index data for fast cell lookup
  const cellMap = useMemo(() => {
    const map = new Map<string, number>();
    data.forEach((d) => {
      map.set(`${d.x}-${d.y}`, d.value);
    });
    return map;
  }, [data]);

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
      <div className="gy-heatmap-grid-container">
        {/* Y Axis Labels Column */}
        <div className="gy-heatmap-y-labels">
          {yAxisLabels.map((yLabel) => (
            <div key={yLabel} className="gy-heatmap-y-label">
              {yLabel}
            </div>
          ))}
          {/* Empty spacer for bottom corner */}
          <div className="gy-heatmap-y-label-spacer" />
        </div>

        {/* Heatmap Grid Grid */}
        <div className="gy-heatmap-main-grid-wrapper">
          <div
            className="gy-heatmap-grid"
            style={{
              gridTemplateColumns: `repeat(${xAxisLabels.length}, 1fr)`,
              gridTemplateRows: `repeat(${yAxisLabels.length}, 1fr)`,
            }}
          >
            {yAxisLabels.map((yLabel) =>
              xAxisLabels.map((xLabel) => {
                const cellValue = cellMap.get(`${xLabel}-${yLabel}`) ?? 0;
                const range = maxVal - minVal || 1;
                const opacity = 0.1 + ((cellValue - minVal) / range) * 0.9;

                return (
                  <div
                    key={`${xLabel}-${yLabel}`}
                    className="gy-heatmap-cell"
                    style={{
                      backgroundColor: baseColor,
                      opacity,
                    }}
                    onMouseEnter={(e) =>
                      handleMouseEnter(xLabel, yLabel, cellValue, e)
                    }
                    onMouseLeave={handleMouseLeave}
                  />
                );
              }),
            )}
          </div>

          {/* X Axis Labels Row */}
          <div
            className="gy-heatmap-x-labels"
            style={{
              gridTemplateColumns: `repeat(${xAxisLabels.length}, 1fr)`,
            }}
          >
            {xAxisLabels.map((xLabel) => (
              <div key={xLabel} className="gy-heatmap-x-label">
                {xLabel}
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
      className={`gy-heatmap-wrapper ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    >
      {renderContent()}

      {/* Heatmap Cell Tooltip */}
      {hoveredCell && (
        <div
          className="gy-heatmap-tooltip"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
          }}
        >
          <div className="gy-heatmap-tooltip-title">
            {hoveredCell.x} × {hoveredCell.y}
          </div>
          <div className="gy-heatmap-tooltip-value">
            Value: {hoveredCell.value.toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
}
