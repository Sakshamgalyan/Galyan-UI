"use client";

import React from "react";
import {
  AreaChart as ReChartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Skeleton } from "../skeleton/Skeleton";
import "./area-chart.css";

export interface AreaChartSeries {
  key: string;
  name?: string;
  color?: string;
}

export interface AreaChartProps {
  data: any[];
  series: AreaChartSeries[];
  xAxisKey: string;
  variant?: "gradient" | "solid";
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

export function AreaChart({
  data = [],
  series = [],
  xAxisKey,
  variant = "gradient",
  height = 300,
  width = "100%",
  showGrid = true,
  showLegend = true,
  loading = false,
  className = "",
}: AreaChartProps) {
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
        <ReChartsAreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          <defs>
            {series.map((s, i) => {
              const color =
                s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];
              return (
                <linearGradient
                  key={`grad-${s.key}`}
                  id={`area-grad-${s.key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={color}
                    stopOpacity={variant === "gradient" ? 0.35 : 0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={color}
                    stopOpacity={variant === "gradient" ? 0 : 0.8}
                  />
                </linearGradient>
              );
            })}
          </defs>
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
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.name ?? s.key}
                stroke={color}
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#area-grad-${s.key})`}
              />
            );
          })}
        </ReChartsAreaChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className={`gy-areachart ${className}`} style={{ width, height }}>
      {renderContent()}
    </div>
  );
}
