"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import { Skeleton } from "../skeleton/Skeleton";
import { EmptyState } from "../emptystate/EmptyState";
import "./heatmap-chart.css";
import { Typography } from "../typography";

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
  animate?: boolean;
  animationDuration?: number;
  animationEasing?: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear";
  stagger?: boolean;
  tokens?: Record<string, string>;
  onCellClick?: (cell: HeatmapDataCell) => void;
}

const EASING_MAP: Record<string, string> = {
  ease: "ease",
  "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
  "ease-out": "cubic-bezier(0.16, 1, 0.3, 1)",
  "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
  linear: "linear",
};

export function HeatmapChart({
  data = [],
  xAxisLabels = [],
  yAxisLabels = [],
  height = 350,
  width = "100%",
  baseColor = "var(--gy-primary)",
  loading = false,
  className = "",
  animate = true,
  animationDuration = 700,
  animationEasing = "ease-out",
  stagger = true,
  tokens,
  onCellClick,
}: HeatmapChartProps) {
  const [hoveredCell, setHoveredCell] = useState<HeatmapDataCell | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const cssEasing =
    EASING_MAP[animationEasing] || "cubic-bezier(0.16, 1, 0.3, 1)";

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

    if (data.length === 0) {
      return <EmptyState size="md" variant="subtle" />;
    }

    return (
      <div className="gy-heatmap-grid-container">
        {/* Y Axis Labels Column */}
        <div className="gy-heatmap-y-labels">
          {yAxisLabels.map((yLabel) => (
            <Typography
              variant="span"
              as="div"
              key={yLabel}
              className="gy-heatmap-y-label"
            >
              {yLabel}
            </Typography>
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
            {yAxisLabels.map((yLabel, rowIdx) =>
              xAxisLabels.map((xLabel, colIdx) => {
                const cellValue = cellMap.get(`${xLabel}-${yLabel}`) ?? 0;
                const range = maxVal - minVal || 1;
                const targetOpacity =
                  0.12 + ((cellValue - minVal) / range) * 0.88;
                const isHovered =
                  hoveredCell?.x === xLabel && hoveredCell?.y === yLabel;
                const isDimmed = hoveredCell !== null && !isHovered;

                const maxSteps = Math.max(
                  1,
                  xAxisLabels.length + yAxisLabels.length - 2,
                );
                const step = rowIdx + colIdx;
                const delayMs = stagger
                  ? Math.min(
                      400,
                      Math.round((step / maxSteps) * (animationDuration * 0.5)),
                    )
                  : 0;

                const cellDuration = Math.round(animationDuration * 0.6);

                return (
                  <div
                    key={`${xLabel}-${yLabel}`}
                    className={`gy-heatmap-cell ${isHovered ? "gy-heatmap-cell--hovered" : ""} ${isDimmed ? "gy-heatmap-cell--dimmed" : ""}`}
                    style={{
                      backgroundColor: baseColor,
                      opacity:
                        isMounted || !animate
                          ? isDimmed
                            ? targetOpacity * 0.45
                            : targetOpacity
                          : 0,
                      transform:
                        isMounted || !animate ? undefined : "scale(0.65)",
                      transition: animate
                        ? `opacity ${cellDuration}ms ${cssEasing} ${isMounted ? 0 : delayMs}ms, transform ${cellDuration}ms ${cssEasing} ${isMounted ? 0 : delayMs}ms, filter 0.2s ease, box-shadow 0.2s ease`
                        : undefined,
                    }}
                    onMouseEnter={(e) =>
                      handleMouseEnter(xLabel, yLabel, cellValue, e)
                    }
                    onMouseLeave={handleMouseLeave}
                    onClick={() =>
                      onCellClick?.({ x: xLabel, y: yLabel, value: cellValue })
                    }
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
              <Typography
                variant="span"
                as="div"
                key={xLabel}
                className="gy-heatmap-x-label"
              >
                {xLabel}
              </Typography>
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
        ...tokens,
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
          <Typography
            variant="span"
            as="div"
            className="gy-heatmap-tooltip-title"
          >
            {hoveredCell.x} × {hoveredCell.y}
          </Typography>
          <Typography
            variant="span"
            as="div"
            className="gy-heatmap-tooltip-value"
          >
            Value: {hoveredCell.value.toLocaleString()}
          </Typography>
        </div>
      )}
    </div>
  );
}
