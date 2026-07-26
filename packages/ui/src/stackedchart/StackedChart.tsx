"use client";

import React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Skeleton } from "../skeleton/Skeleton";
import "./stacked-chart.css";

export interface StackedChartSeries {
  key: string;
  name?: string;
  color?: string;
}

export interface StackedChartProps {
  data: any[];
  series: StackedChartSeries[];
  xAxisKey: string;
  variant?: "bar" | "area";
  height?: number | string;
  width?: number | string;
  showGrid?: boolean;
  showLegend?: boolean;
  loading?: boolean;
  className?: string;
}

const DEFAULT_COLORS = [
  "var(--gy-primary)",
  "var(--gy-success)",
  "var(--gy-warning)",
  "var(--gy-danger)",
  "var(--gy-info)",
  "#8b5cf6",
  "#ec4899",
];

export function StackedChart({
  data = [],
  series = [],
  xAxisKey,
  variant = "bar",
  height = 300,
  width = "100%",
  showGrid = true,
  showLegend = true,
  loading = false,
  className = "",
}: StackedChartProps) {
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

    if (variant === "area") {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
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
            {series.map((s, i) => {
              const color =
                s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];
              return (
                <Area
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  stackId="1"
                  name={s.name ?? s.key}
                  stroke={color}
                  fill={color}
                  fillOpacity={0.4}
                />
              );
            })}
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
          {series.map((s, i) => {
            const color = s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];
            return (
              <Bar
                key={s.key}
                dataKey={s.key}
                stackId="a"
                name={s.name ?? s.key}
                fill={color}
                maxBarSize={40}
              />
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className={`gy-stackedchart ${className}`} style={{ width, height }}>
      {renderContent()}
    </div>
  );
}
