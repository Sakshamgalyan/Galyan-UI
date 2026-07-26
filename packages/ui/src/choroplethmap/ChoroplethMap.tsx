"use client";

import React, { useState, useMemo, useRef } from "react";
import { Skeleton } from "../skeleton/Skeleton";
import "./choropleth-map.css";

export interface MapRegionItem {
  id: string; // state abbreviation, e.g. "CA"
  value: number;
}

export interface ChoroplethMapProps {
  data: MapRegionItem[];
  height?: number | string;
  width?: number | string;
  colorScale?: string[]; // array of colors for low to high values
  loading?: boolean;
  className?: string;
}

interface StateGridPosition {
  id: string;
  name: string;
  row: number;
  col: number;
}

// US State Grid coordinates for modern tile grid map layout
const STATE_GRID: StateGridPosition[] = [
  { id: "AK", name: "Alaska", row: 0, col: 0 },
  { id: "ME", name: "Maine", row: 0, col: 11 },
  { id: "WA", name: "Washington", row: 1, col: 1 },
  { id: "ID", name: "Idaho", row: 1, col: 2 },
  { id: "MT", name: "Montana", row: 1, col: 3 },
  { id: "ND", name: "North Dakota", row: 1, col: 4 },
  { id: "MN", name: "Minnesota", row: 1, col: 5 },
  { id: "WI", name: "Wisconsin", row: 1, col: 6 },
  { id: "MI", name: "Michigan", row: 1, col: 7 },
  { id: "NY", name: "New York", row: 1, col: 9 },
  { id: "MA", name: "Massachusetts", row: 1, col: 10 },
  { id: "OR", name: "Oregon", row: 2, col: 1 },
  { id: "NV", name: "Nevada", row: 2, col: 2 },
  { id: "WY", name: "Wyoming", row: 2, col: 3 },
  { id: "SD", name: "South Dakota", row: 2, col: 4 },
  { id: "IA", name: "Iowa", row: 2, col: 5 },
  { id: "IL", name: "Illinois", row: 2, col: 6 },
  { id: "IN", name: "Indiana", row: 2, col: 7 },
  { id: "OH", name: "Ohio", row: 2, col: 8 },
  { id: "PA", name: "Pennsylvania", row: 2, col: 9 },
  { id: "NJ", name: "New Jersey", row: 2, col: 10 },
  { id: "CT", name: "Connecticut", row: 2, col: 11 },
  { id: "CA", name: "California", row: 3, col: 0 },
  { id: "UT", name: "Utah", row: 3, col: 2 },
  { id: "CO", name: "Colorado", row: 3, col: 3 },
  { id: "NE", name: "Nebraska", row: 3, col: 4 },
  { id: "MO", name: "Missouri", row: 3, col: 5 },
  { id: "KY", name: "Kentucky", row: 3, col: 6 },
  { id: "WV", name: "West Virginia", row: 3, col: 7 },
  { id: "VA", name: "Virginia", row: 3, col: 8 },
  { id: "MD", name: "Maryland", row: 3, col: 9 },
  { id: "DE", name: "Delaware", row: 3, col: 10 },
  { id: "RI", name: "Rhode Island", row: 3, col: 11 },
  { id: "AZ", name: "Arizona", row: 4, col: 2 },
  { id: "NM", name: "New Mexico", row: 4, col: 3 },
  { id: "KS", name: "Kansas", row: 4, col: 4 },
  { id: "AR", name: "Arkansas", row: 4, col: 5 },
  { id: "TN", name: "Tennessee", row: 4, col: 6 },
  { id: "NC", name: "North Carolina", row: 4, col: 7 },
  { id: "SC", name: "South Carolina", row: 4, col: 8 },
  { id: "DC", name: "District of Columbia", row: 4, col: 9 },
  { id: "TX", name: "Texas", row: 5, col: 3 },
  { id: "OK", name: "Oklahoma", row: 5, col: 4 },
  { id: "LA", name: "Louisiana", row: 5, col: 5 },
  { id: "MS", name: "Mississippi", row: 5, col: 6 },
  { id: "AL", name: "Alabama", row: 5, col: 7 },
  { id: "GA", name: "Georgia", row: 5, col: 8 },
  { id: "HI", name: "Hawaii", row: 6, col: 0 },
  { id: "FL", name: "Florida", row: 6, col: 9 },
];

const DEFAULT_SCALE = [
  "var(--gy-primary-light)",
  "var(--gy-primary-hover)",
  "var(--gy-primary-deep)",
];

export function ChoroplethMap({
  data = [],
  height = 360,
  width = "100%",
  colorScale = DEFAULT_SCALE,
  loading = false,
  className = "",
}: ChoroplethMapProps) {
  const [hoveredState, setHoveredState] = useState<{
    id: string;
    name: string;
    value: number;
  } | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Map values for fast state lookup
  const valMap = useMemo(() => {
    const map = new Map<string, number>();
    data.forEach((d) => map.set(d.id.toUpperCase(), d.value));
    return map;
  }, [data]);

  // Compute min/max for dynamic scaling
  const { minVal, maxVal } = useMemo(() => {
    if (data.length === 0) return { minVal: 0, maxVal: 100 };
    const vals = data.map((d) => d.value);
    return {
      minVal: Math.min(...vals),
      maxVal: Math.max(...vals, 1),
    };
  }, [data]);

  const getColor = (val: number) => {
    const range = maxVal - minVal || 1;
    const fraction = (val - minVal) / range;

    if (fraction <= 0.33) return colorScale[0];
    if (fraction <= 0.66) return colorScale[1] || colorScale[0];
    return colorScale[2] || colorScale[1] || colorScale[0];
  };

  const handleMouseEnter = (
    state: StateGridPosition,
    value: number,
    e: React.MouseEvent,
  ) => {
    setHoveredState({ id: state.id, name: state.name, value });
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
    setHoveredState(null);
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
            style={{ borderRadius: "12px" }}
          />
        </div>
      );
    }

    return (
      <div className="gy-choropleth-grid">
        {STATE_GRID.map((state) => {
          const val = valMap.get(state.id) ?? 0;
          const bg = valMap.has(state.id)
            ? getColor(val)
            : "var(--gy-surface-disabled)";
          const hasValue = valMap.has(state.id);

          return (
            <div
              key={state.id}
              className="gy-choropleth-tile"
              style={{
                gridRow: state.row + 1,
                gridColumn: state.col + 1,
                backgroundColor: bg,
              }}
              onMouseEnter={(e) => handleMouseEnter(state, val, e)}
              onMouseLeave={handleMouseLeave}
            >
              <span
                className={`gy-choropleth-tile-text ${hasValue ? "gy-choropleth-tile-text--active" : ""}`}
              >
                {state.id}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`gy-choropleth-wrapper ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    >
      {renderContent()}

      {/* Floating State Tooltip */}
      {hoveredState && (
        <div
          className="gy-choropleth-tooltip"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
          }}
        >
          <div className="gy-choropleth-tooltip-title">
            {hoveredState.name} ({hoveredState.id})
          </div>
          <div className="gy-choropleth-tooltip-value">
            Value: {hoveredState.value.toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
}
