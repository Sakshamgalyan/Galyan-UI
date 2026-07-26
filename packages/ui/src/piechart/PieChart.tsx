"use client";

import React from "react";
import {
  PieChart as ReChartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Skeleton } from "../skeleton/Skeleton";
import "./pie-chart.css";

export interface PieChartItem {
  name: string;
  value: number;
  color?: string;
}

export interface PieChartProps {
  data: PieChartItem[];
  variant?: "standard" | "segmented";
  height?: number | string;
  width?: number | string;
  showLegend?: boolean;
  innerRadius?: number | string;
  outerRadius?: number | string;
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

export function PieChart({
  data = [],
  variant = "standard",
  height = 300,
  width = "100%",
  showLegend = true,
  innerRadius = 0,
  outerRadius = "80%",
  loading = false,
  className = "",
}: PieChartProps) {
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

  const paddingAngle = variant === "segmented" ? 4 : 0;

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
            style={{ margin: "auto" }}
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
        <ReChartsPieChart>
          <Tooltip {...commonTooltipProps} />
          {showLegend && (
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
          )}
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            stroke="var(--gy-surface)"
            strokeWidth={2}
            paddingAngle={paddingAngle}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length]
                }
              />
            ))}
          </Pie>
        </ReChartsPieChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className={`gy-piechart ${className}`} style={{ width, height }}>
      {renderContent()}
    </div>
  );
}
