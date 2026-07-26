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
import "./donut-chart.css";

export interface DonutChartItem {
  name: string;
  value: number;
  color?: string;
}

export interface DonutChartProps {
  data: DonutChartItem[];
  variant?: "standard" | "semi";
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

export function DonutChart({
  data = [],
  variant = "standard",
  height = 300,
  width = "100%",
  showLegend = true,
  innerRadius = "60%",
  outerRadius = "80%",
  loading = false,
  className = "",
}: DonutChartProps) {
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

  const isSemi = variant === "semi";
  const startAngle = isSemi ? 180 : 90;
  const endAngle = isSemi ? 0 : -270;
  const cy = isSemi ? "80%" : "50%";

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
        <ReChartsPieChart>
          <Tooltip {...commonTooltipProps} />
          {showLegend && (
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: isSemi ? 0 : 10 }}
            />
          )}
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy={cy}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            stroke="var(--gy-surface)"
            strokeWidth={2}
            paddingAngle={2}
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
    <div className={`gy-donutchart ${className}`} style={{ width, height }}>
      {renderContent()}
    </div>
  );
}
