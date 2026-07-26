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
import "./financial-chart.css";

export interface FinancialChartItem {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface FinancialChartProps {
  data: FinancialChartItem[];
  xAxisKey?: string;
  height?: number | string;
  width?: number | string;
  showGrid?: boolean;
  loading?: boolean;
  className?: string;
}

export function FinancialChart({
  data = [],
  xAxisKey = "date",
  height = 350,
  width = "100%",
  showGrid = true,
  loading = false,
  className = "",
}: FinancialChartProps) {
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

  // Format data for range bars:
  // body range is [open, close], wick range is [low, high]
  const formattedData = React.useMemo(() => {
    return data.map((d) => ({
      ...d,
      body: [d.open, d.close],
      wick: [d.low, d.high],
      isUp: d.close >= d.open,
    }));
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
          data={formattedData}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          barGap={-16} // Overlay the wick and body bars directly on top of each other!
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--gy-border)"
              vertical={false}
            />
          )}
          <XAxis dataKey={xAxisKey} {...commonAxisProps} />
          <YAxis domain={["auto", "auto"]} {...commonAxisProps} />
          <Tooltip {...commonTooltipProps} />
          {/* Wick Bar (Thin, full range from low to high) */}
          <Bar dataKey="wick" barSize={2}>
            {formattedData.map((entry, index) => (
              <Cell
                key={`wick-${index}`}
                fill={entry.isUp ? "var(--gy-success)" : "var(--gy-danger)"}
              />
            ))}
          </Bar>
          {/* Body Bar (Thicker, range from open to close) */}
          <Bar dataKey="body" barSize={16}>
            {formattedData.map((entry, index) => (
              <Cell
                key={`body-${index}`}
                fill={entry.isUp ? "var(--gy-success)" : "var(--gy-danger)"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className={`gy-financialchart ${className}`} style={{ width, height }}>
      {renderContent()}
    </div>
  );
}
