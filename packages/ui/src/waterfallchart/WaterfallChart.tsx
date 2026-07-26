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
  Cell,
} from "recharts";
import { Skeleton } from "../skeleton/Skeleton";
import "./waterfall-chart.css";

export interface WaterfallItem {
  label: string;
  value: number;
  isTotal?: boolean;
}

export interface WaterfallChartProps {
  data: WaterfallItem[];
  height?: number | string;
  width?: number | string;
  showGrid?: boolean;
  loading?: boolean;
  className?: string;
}

export function WaterfallChart({
  data = [],
  height = 350,
  width = "100%",
  showGrid = true,
  loading = false,
  className = "",
}: WaterfallChartProps) {
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

  // Process data to calculate support offsets and heights
  const processedData = React.useMemo(() => {
    let runningSum = 0;
    return data.map((d) => {
      if (d.isTotal) {
        const start = 0;
        const val = d.value;
        runningSum = d.value;
        return {
          label: d.label,
          start,
          val,
          raw: d.value,
          color: "var(--gy-primary)",
        };
      } else {
        const start = d.value >= 0 ? runningSum : runningSum + d.value;
        const val = Math.abs(d.value);
        const raw = d.value;
        runningSum += d.value;
        return {
          label: d.label,
          start,
          val,
          raw,
          color: d.value >= 0 ? "var(--gy-success)" : "var(--gy-danger)",
        };
      }
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
        <BarChart
          data={processedData}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          stackOffset="sign"
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--gy-border)"
              vertical={false}
            />
          )}
          <XAxis dataKey="label" {...commonAxisProps} />
          <YAxis {...commonAxisProps} />
          {/* Custom tooltip to show original raw changes */}
          <Tooltip
            {...commonTooltipProps}
            formatter={(value: any, name: any, props: any) => {
              if (name === "val") {
                return [props.payload.raw.toLocaleString(), "Change"];
              }
              return null;
            }}
            labelFormatter={(label) => label}
          />
          {/* Transparent Support Bar to push the change bars up */}
          <Bar dataKey="start" stackId="a" fill="transparent" />
          {/* Visible Floating Bar */}
          <Bar dataKey="val" stackId="a" maxBarSize={45}>
            {processedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className={`gy-waterfallchart ${className}`} style={{ width, height }}>
      {renderContent()}
    </div>
  );
}
