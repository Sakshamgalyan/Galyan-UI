"use client";

import React from "react";
import {
  ScatterChart as ReChartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Skeleton } from "../skeleton/Skeleton";
import "./scatter-chart.css";

export interface ScatterChartItem {
  x: number;
  y: number;
  name?: string;
}

export interface ScatterChartProps {
  data: ScatterChartItem[];
  name?: string;
  xLabel?: string;
  yLabel?: string;
  height?: number | string;
  width?: number | string;
  barColor?: string;
  showGrid?: boolean;
  loading?: boolean;
  className?: string;
}

export function ScatterChart({
  data = [],
  name = "Scatter Dataset",
  xLabel,
  yLabel,
  height = 300,
  width = "100%",
  barColor = "var(--gy-primary)",
  showGrid = true,
  loading = false,
  className = "",
}: ScatterChartProps) {
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
        <ReChartsScatterChart
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke="var(--gy-border)" />
          )}
          <XAxis
            type="number"
            dataKey="x"
            name={xLabel ?? "X"}
            unit=""
            {...commonAxisProps}
          />
          <YAxis
            type="number"
            dataKey="y"
            name={yLabel ?? "Y"}
            unit=""
            {...commonAxisProps}
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            {...commonTooltipProps}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
          <Scatter name={name} data={data} fill={barColor} />
        </ReChartsScatterChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className={`gy-scatterchart ${className}`} style={{ width, height }}>
      {renderContent()}
    </div>
  );
}
