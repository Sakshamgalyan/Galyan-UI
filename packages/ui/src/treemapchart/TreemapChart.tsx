"use client";

import React from "react";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";
import { Skeleton } from "../skeleton/Skeleton";
import "./treemap-chart.css";

export interface TreemapChartItem {
  name: string;
  value: number;
  children?: TreemapChartItem[];
}

export interface TreemapChartProps {
  data: TreemapChartItem[];
  dataKey?: string;
  height?: number | string;
  width?: number | string;
  colorScale?: string[];
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

interface CustomContentProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  index?: number;
  name?: string;
  value?: number;
  depth?: number;
  colors?: string[];
}

function CustomTreemapContent({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  index = 0,
  name = "",
  value = 0,
  depth = 0,
  colors = DEFAULT_COLORS,
}: CustomContentProps) {
  const fill = colors[index % colors.length];

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill,
          stroke: "var(--gy-surface)",
          strokeWidth: 2 / (depth + 1),
          strokeOpacity: 1,
        }}
      />
      {width > 60 && height > 35 && (
        <>
          <text
            x={x + 8}
            y={y + 20}
            fill="#ffffff"
            fontSize={12}
            fontWeight="600"
            style={{ userSelect: "none" }}
          >
            {name}
          </text>
          <text
            x={x + 8}
            y={y + 36}
            fill="rgba(255, 255, 255, 0.8)"
            fontSize={11}
            style={{ userSelect: "none" }}
          >
            {value.toLocaleString()}
          </text>
        </>
      )}
    </g>
  );
}

export function TreemapChart({
  data = [],
  dataKey = "value",
  height = 350,
  width = "100%",
  colorScale = DEFAULT_COLORS,
  loading = false,
  className = "",
}: TreemapChartProps) {
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
        <Treemap
          data={data}
          dataKey={dataKey}
          aspectRatio={4 / 3}
          stroke="var(--gy-surface)"
          content={<CustomTreemapContent colors={colorScale} />}
        >
          <Tooltip {...commonTooltipProps} />
        </Treemap>
      </ResponsiveContainer>
    );
  };

  return (
    <div className={`gy-treemapchart ${className}`} style={{ width, height }}>
      {renderContent()}
    </div>
  );
}
