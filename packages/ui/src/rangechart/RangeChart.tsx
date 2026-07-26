"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "../skeleton/Skeleton";
import "./range-chart.css";

export interface RangeChartProps {
  data: any[];
  xAxisKey: string;
  lowKey: string;
  highKey: string;
  name?: string;
  color?: string;
  height?: number | string;
  width?: number | string;
  showGrid?: boolean;
  loading?: boolean;
  className?: string;
}

export function RangeChart({
  data = [],
  xAxisKey,
  lowKey,
  highKey,
  name = "Range Band",
  color = "var(--gy-primary)",
  height = 300,
  width = "100%",
  showGrid = true,
  loading = false,
  className = "",
}: RangeChartProps) {
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

  // Convert low and high to range array for Recharts Area
  const rangeData = React.useMemo(() => {
    return data.map((d) => ({
      ...d,
      __range: [d[lowKey], d[highKey]],
    }));
  }, [data, lowKey, highKey]);

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
        <AreaChart
          data={rangeData}
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
          <Area
            name={name}
            dataKey="__range"
            stroke={color}
            fill={color}
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className={`gy-rangechart ${className}`} style={{ width, height }}>
      {renderContent()}
    </div>
  );
}
