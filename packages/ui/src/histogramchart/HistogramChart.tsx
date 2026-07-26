"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "../skeleton/Skeleton";
import "./histogram-chart.css";

export interface HistogramItem {
  bin: string; // e.g. "0-10", "10-20"
  frequency: number;
}

export interface HistogramChartProps {
  data: HistogramItem[];
  height?: number | string;
  width?: number | string;
  color?: string; // default: var(--gy-primary)
  showGrid?: boolean;
  loading?: boolean;
  className?: string;
}

export function HistogramChart({
  data = [],
  height = 300,
  width = "100%",
  color = "var(--gy-primary)",
  showGrid = true,
  loading = false,
  className = "",
}: HistogramChartProps) {
  const commonAxisProps = {
    stroke: "var(--gy-border-strong)",
    tick: { fill: "var(--gy-text-subtle)", fontSize: 12 },
    tickLine: { stroke: "var(--gy-border)" },
  };

  const commonTooltipProps = {
    contentStyle: {
      backgroundColor: "var(--gy-surface)",
      borderColor: "var(--gy-border)",
      borderRadius: "var(--gy-radius-lg)",
      boxShadow: "var(--gy-shadow-md)",
      color: "var(--gy-text)",
      fontSize: 13,
    },
    itemStyle: { color: "var(--gy-text)" },
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            <Skeleton variant="text" width="60px" height="12px" />
            <Skeleton variant="text" width="80px" height="12px" />
          </div>
          <Skeleton
            variant="rectangular"
            width="100%"
            height="70%"
            style={{ borderRadius: "8px" }}
          />
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          barCategoryGap={1} // Very small gap to represent continuous frequency distribution bins!
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--gy-border)"
              vertical={false}
            />
          )}
          <XAxis dataKey="bin" {...commonAxisProps} />
          <YAxis {...commonAxisProps} />
          <Tooltip {...commonTooltipProps} />
          <Bar dataKey="frequency" fill={color} name="Frequency" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className={`gy-histogramchart ${className}`} style={{ width, height }}>
      {renderContent()}
    </div>
  );
}
