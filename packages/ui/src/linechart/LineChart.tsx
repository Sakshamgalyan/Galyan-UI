"use client";

import React from "react";
import {
  LineChart as ReChartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Skeleton } from "../skeleton/Skeleton";
import "./line-chart.css";

export interface LineChartSeries {
  key: string;
  name?: string;
  color?: string;
}

export interface LineChartProps {
  data: any[];
  series: LineChartSeries[];
  xAxisKey: string;
  variant?: "monotone" | "straight" | "stepped";
  height?: number | string;
  width?: number | string;
  showGrid?: boolean;
  showLegend?: boolean;
  dotSize?: number;
  strokeWidth?: number;
  loading?: boolean;
  className?: string;
}

export function LineChart({
  data = [],
  series = [],
  xAxisKey,
  variant = "monotone",
  height = 300,
  width = "100%",
  showGrid = true,
  showLegend = true,
  dotSize = 4,
  strokeWidth = 2,
  loading = false,
  className = "",
}: LineChartProps) {
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

  const lineType =
    variant === "monotone"
      ? "monotone"
      : variant === "stepped"
        ? "step"
        : "linear";

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
        <ReChartsLineChart
          data={data}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--gy-border)"
              vertical={false}
            />
          )}
          <XAxis dataKey={xAxisKey} {...commonAxisProps} />
          <YAxis {...commonAxisProps} />
          <Tooltip {...commonTooltipProps} />
          {showLegend && (
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
          )}
          {series.map((s, i) => (
            <Line
              key={s.key}
              type={lineType}
              dataKey={s.key}
              name={s.name ?? s.key}
              stroke={s.color ?? `var(--gy-primary)`}
              strokeWidth={strokeWidth}
              dot={{ r: dotSize, strokeWidth: 2, fill: "var(--gy-surface)" }}
              activeDot={{ r: dotSize + 2, strokeWidth: 0 }}
            />
          ))}
        </ReChartsLineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className={`gy-linechart ${className}`} style={{ width, height }}>
      {renderContent()}
    </div>
  );
}
