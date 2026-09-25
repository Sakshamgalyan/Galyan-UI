import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TreemapChart } from "./TreemapChart";

const meta: Meta<typeof TreemapChart> = {
  title: "Galyan UI/TreemapChart",
  component: TreemapChart,
  tags: ["autodocs"],
  argTypes: {
    height: { control: "number" },
    width: { control: "text" },
    showSummaryHeader: { control: "boolean" },
    loading: { control: "boolean" },
    responsive: { control: "boolean" },
  },
} satisfies Meta<typeof TreemapChart>;

export default meta;
type Story = StoryObj<typeof TreemapChart>;

const treemapData = [
  { name: "Electronics", value: 45000, color: "var(--gy-primary, #3b82f6)" },
  { name: "Home & Garden", value: 32000, color: "var(--gy-success, #10b981)" },
  { name: "Fashion Apparel", value: 24000, color: "var(--gy-warning, #f59e0b)" },
  { name: "Automotive", value: 18000, color: "var(--gy-danger, #ef4444)" },
  { name: "Sports & Outdoors", value: 14000, color: "var(--gy-info, #06b6d4)" },
  { name: "Beauty & Health", value: 9500, color: "#8b5cf6" },
  { name: "Books & Media", value: 6500, color: "#ec4899" },
];

export const Default: Story = {
  args: {
    data: treemapData,
    height: 360,
    width: "100%",
    summaryTitle: "Product Sales Volume",
  },
};

export const ResponsiveMobile: Story = {
  render: () => (
    <div
      style={{
        width: 320,
        border: "1px dashed #cbd5e1",
        padding: "0.75rem",
        borderRadius: "1rem",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          fontSize: "0.75rem",
          color: "#64748b",
          marginBottom: "0.5rem",
          fontWeight: 600,
        }}
      >
        Mobile Container Preview (320px)
      </div>
      <TreemapChart
        data={treemapData.slice(0, 5)}
        height={300}
        width="100%"
        summaryTitle="Mobile Sales"
      />
    </div>
  ),
};

export const CustomCurrencyFormatter: Story = {
  args: {
    data: treemapData,
    height: 360,
    width: "100%",
    summaryTitle: "Q3 Department Revenue",
    tooltipConfig: {
      formatter: (v: number) => `$${v.toLocaleString()}`,
    },
  },
};

export const LoadingState: Story = {
  args: {
    ...Default.args,
    loading: true,
    data: [],
  },
};

export const EmptyState: Story = {
  args: {
    ...Default.args,
    data: [],
  },
};
