"use client";

import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "../skeleton/Skeleton";
import "./pareto-chart.css";

export interface ParetoItem {
  name: string;
  value: number;
}

export interface ParetoChartProps {
  data: ParetoItem[];
  height?: number | string;
  width?: number | string;
  barColor?: string; // default: var(--gy-primary)
  lineColor?: string; // default: var(--gy-danger)
  showGrid?: boolean;
  loading?: boolean;
  className?: string;
}

export function ParetoChart({
  data = [],
  height = 350,
  width = "100%",
  barColor = "var(--gy-primary)",
  lineColor = "var(--gy-danger)",
  showGrid = true,
  loading = false,
  className = "",
}: ParetoChartProps) {
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

  // Sort descending and calculate cumulative percentages
  const processedData = React.useMemo(() => {
    if (data.length === 0) return [];
    const sorted = [...data].sort((a, b) => b.value - a.value);
    const total = sorted.reduce((sum, item) => sum + item.value, 0);

    let runningSum = 0;
    return sorted.map((item) => {
      runningSum += item.value;
      return {
        ...item,
        cumulative: parseFloat(((runningSum / (total || 1)) * 100).toFixed(1)),
      };
    });
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
        <ComposedChart
          data={processedData}
          margin={{ top: 10, right: -5, left: -10, bottom: 0 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--gy-border)"
              vertical={false}
            />
          )}
          <XAxis dataKey="name" {...commonAxisProps} />
          {/* Left Y Axis for raw frequency counts */}
          <YAxis yAxisId="left" orientation="left" {...commonAxisProps} />
          {/* Right Y Axis for cumulative percentages */}
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 100]}
            unit="%"
            {...commonAxisProps}
          />
          <Tooltip {...commonTooltipProps} />
          <Bar
            yAxisId="left"
            dataKey="value"
            fill={barColor}
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
            name="Count"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="cumulative"
            stroke={lineColor}
            strokeWidth={3}
            dot={{ r: 4 }}
            name="Cumulative Percent"
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className={`gy-paretochart ${className}`} style={{ width, height }}>
      {renderContent()}
    </div>
  );
}
