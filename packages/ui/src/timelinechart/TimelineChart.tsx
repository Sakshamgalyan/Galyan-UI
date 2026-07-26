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
import "./timeline-chart.css";

export interface TimelineItem {
  label: string;
  start: number; // numeric timestamp or relative day (e.g. Day 0, Day 5)
  end: number;
  color?: string;
}

export interface TimelineChartProps {
  data: TimelineItem[];
  height?: number | string;
  width?: number | string;
  showGrid?: boolean;
  loading?: boolean;
  className?: string;
}

const DEFAULT_COLORS = [
  "var(--gy-primary)",
  "var(--gy-success)",
  "var(--gy-warning)",
  "var(--gy-danger)",
  "var(--gy-info)",
];

export function TimelineChart({
  data = [],
  height = 300,
  width = "100%",
  showGrid = true,
  loading = false,
  className = "",
}: TimelineChartProps) {
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

  // Convert start/end to range array for horizontal bars
  const formattedData = React.useMemo(() => {
    return data.map((d, index) => ({
      label: d.label,
      range: [d.start, d.end],
      color: d.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    }));
  }, [data]);

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
          data={formattedData}
          layout="vertical"
          margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--gy-border)"
              horizontal={false}
            />
          )}
          <XAxis type="number" {...commonAxisProps} />
          <YAxis dataKey="label" type="category" {...commonAxisProps} />
          <Tooltip
            {...commonTooltipProps}
            formatter={(value: any) => {
              if (Array.isArray(value)) {
                return [`From Day ${value[0]} to Day ${value[1]}`, "Duration"];
              }
              return value;
            }}
          />
          <Bar
            dataKey="range"
            fill="var(--gy-primary)"
            radius={[4, 4, 4, 4]}
            maxBarSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className={`gy-timelinechart ${className}`} style={{ width, height }}>
      {renderContent()}
    </div>
  );
}
