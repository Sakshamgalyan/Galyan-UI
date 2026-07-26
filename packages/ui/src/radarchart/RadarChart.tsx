"use client";

import React from "react";
import {
  RadarChart as ReChartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Skeleton } from "../skeleton/Skeleton";
import "./radar-chart.css";

export interface RadarChartSeries {
  key: string;
  name?: string;
  color?: string;
}

export interface RadarChartProps {
  data: any[];
  series: RadarChartSeries[];
  angleKey: string;
  variant?: "standard" | "filled";
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

export function RadarChart({
  data = [],
  series = [],
  angleKey,
  variant = "filled",
  height = 300,
  width = "100%",
  showGrid = true,
  showLegend = true,
  loading = false,
  className = "",
}: RadarChartProps) {
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
            alignItems: "center",
          }}
        >
          <Skeleton
            variant="circular"
            width="160px"
            height="160px"
            style={{ margin: "auto", borderRadius: "50%" }}
          />
          <div
            style={{ display: "flex", gap: "8px", justifyContent: "center" }}
          >
            <Skeleton variant="text" width="60px" height="12px" />
            <Skeleton variant="text" width="60px" height="12px" />
          </div>
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <ReChartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          {showGrid && <PolarGrid stroke="var(--gy-border)" />}
          <PolarAngleAxis
            dataKey={angleKey}
            tick={{ fill: "var(--gy-text-subtle)", fontSize: 11 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, "auto"]}
            tick={{ fill: "var(--gy-text-subtle)", fontSize: 10 }}
            stroke="var(--gy-border-muted)"
          />
          <Tooltip {...commonTooltipProps} />
          {showLegend && (
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
          )}
          {series.map((s, i) => {
            const color = s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];
            return (
              <Radar
                key={s.key}
                name={s.name ?? s.key}
                dataKey={s.key}
                stroke={color}
                fill={color}
                fillOpacity={variant === "filled" ? 0.35 : 0}
              />
            );
          })}
        </ReChartsRadarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className={`gy-radarchart ${className}`} style={{ width, height }}>
      {renderContent()}
    </div>
  );
}
