import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BarChart, type BarChartItem } from "./BarChart";

const meta: Meta<typeof BarChart> = {
  title: "Galyan UI/BarChart",
  component: BarChart,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["cylindrical", "filled", "horizontal"],
      description: "Visual presentation style of the bar chart.",
    },
    height: {
      control: "number",
      description: "Total height of the chart in pixels.",
    },
    width: {
      control: "text",
      description: "Total width of the chart (e.g. '100%' or 500).",
    },
    barColor: {
      control: "color",
      description: "Default fallback color for all bars.",
    },
    textColor: {
      control: "color",
      description: "Custom text color for labels and values.",
    },
    barWidth: {
      control: "number",
      description: "Custom width for individual bars.",
    },
    barSpacing: {
      control: "number",
      description: "Custom gap/spacing between bars.",
    },
    showValues: {
      control: "boolean",
      description: "Whether to display value/percentage labels.",
    },
    loading: {
      control: "boolean",
      description: "Whether the chart is in a skeleton loading state.",
    },
    maxBars: {
      control: "number",
      description: "Maximum number of items to display.",
    },
    truncateCharacterAfter: {
      control: "number",
      description: "Maximum character length before truncating labels with ellipsis.",
    },
    responsive: {
      control: "boolean",
      description: "Whether to automatically adjust bar sizes for mobile viewports.",
    },
  },
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof BarChart>;

// Simple vector icon helper
const createIcon = (color: string) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const sampleData: BarChartItem[] = [
  { label: "E-commerce Store", value: 85000, icon: createIcon("#ffffff") },
  { label: "SaaS Subscriptions", value: 62000, icon: createIcon("#ffffff") },
  { label: "Consulting Services", value: 43000, icon: createIcon("#ffffff") },
  { label: "Mobile Apps Market", value: 71000, icon: createIcon("#ffffff") },
  { label: "Offline Retail Shop", value: 29000, icon: createIcon("#ffffff") },
];

const multiColorSampleData: BarChartItem[] = [
  {
    label: "E-commerce Store",
    value: 85000,
    color: "var(--gy-primary, #3b82f6)",
    icon: createIcon("#ffffff"),
  },
  {
    label: "SaaS Subscriptions",
    value: 62000,
    color: "var(--gy-success, #10b981)",
    icon: createIcon("#ffffff"),
  },
  {
    label: "Consulting Services",
    value: 43000,
    color: "var(--gy-warning, #f59e0b)",
    icon: createIcon("#ffffff"),
  },
  {
    label: "Mobile Apps Market",
    value: 71000,
    color: "var(--gy-danger, #ef4444)",
    icon: createIcon("#ffffff"),
  },
  {
    label: "Offline Retail Shop",
    value: 29000,
    color: "var(--gy-info, #06b6d4)",
    icon: createIcon("#ffffff"),
  },
];

const filledSampleData: BarChartItem[] = [
  {
    label: "E-commerce Store",
    value: 85000,
    color: "var(--gy-primary, #3b82f6)",
    icon: createIcon("var(--gy-primary, #3b82f6)"),
  },
  {
    label: "SaaS Subscriptions",
    value: 62000,
    color: "var(--gy-success, #10b981)",
    icon: createIcon("var(--gy-success, #10b981)"),
  },
  {
    label: "Consulting Services",
    value: 43000,
    color: "var(--gy-warning, #f59e0b)",
    icon: createIcon("var(--gy-warning, #f59e0b)"),
  },
  {
    label: "Mobile Apps Market",
    value: 71000,
    color: "var(--gy-danger, #ef4444)",
    icon: createIcon("var(--gy-danger, #ef4444)"),
  },
  {
    label: "Offline Retail Shop",
    value: 29000,
    color: "var(--gy-info, #06b6d4)",
    icon: createIcon("var(--gy-info, #06b6d4)"),
  },
];

const dataWithoutIcons: BarChartItem[] = [
  { label: "Quarter 1", value: 34000 },
  { label: "Quarter 2", value: 58000 },
  { label: "Quarter 3", value: 89000 },
  { label: "Quarter 4", value: 72000 },
];

export const Cylindrical: Story = {
  args: {
    variant: "cylindrical",
    data: sampleData,
    height: 300,
    barWidth: 40,
    barSpacing: 20,
    showValues: true,
  },
};

export const MultiColoredCylindrical: Story = {
  args: {
    variant: "cylindrical",
    data: multiColorSampleData,
    height: 300,
    barWidth: 40,
    barSpacing: 20,
    showValues: true,
  },
};

export const WithoutIcons: Story = {
  args: {
    variant: "cylindrical",
    data: dataWithoutIcons,
    height: 300,
    barWidth: 42,
    barSpacing: 24,
    showValues: true,
  },
};

export const Filled: Story = {
  args: {
    variant: "filled",
    data: filledSampleData,
    height: 300,
    barWidth: 24,
    barSpacing: 24,
    showValues: true,
  },
};

export const Horizontal: Story = {
  args: {
    variant: "horizontal",
    data: filledSampleData,
    height: 320,
    barWidth: 14,
    barSpacing: 16,
    showValues: true,
  },
};

export const CustomTooltipFormatter: Story = {
  args: {
    variant: "cylindrical",
    data: multiColorSampleData,
    height: 300,
    barWidth: 40,
    barSpacing: 20,
    showValues: true,
    tooltipConfig: {
      show: true,
      formatter: (val: number) => `$${val.toLocaleString()} USD`,
    },
  },
};

export const TruncatedLabels: Story = {
  args: {
    variant: "horizontal",
    data: [
      {
        label: "Enterprise Customer Relationship Management (CRM) Platform",
        value: 95000,
        color: "var(--gy-primary, #3b82f6)",
        icon: createIcon("var(--gy-primary, #3b82f6)"),
      },
      {
        label: "Automated Financial Reconciliation & Invoicing Engine",
        value: 78000,
        color: "var(--gy-success, #10b981)",
        icon: createIcon("var(--gy-success, #10b981)"),
      },
      {
        label: "Global Supply Chain Logistics & Fulfillment Network",
        value: 62000,
        color: "var(--gy-warning, #f59e0b)",
        icon: createIcon("var(--gy-warning, #f59e0b)"),
      },
      {
        label: "Cross-Platform Mobile Application Development Suite",
        value: 84000,
        color: "var(--gy-danger, #ef4444)",
        icon: createIcon("var(--gy-danger, #ef4444)"),
      },
      {
        label: "Omnichannel Offline Retail Store POS & Operations",
        value: 41000,
        color: "var(--gy-info, #06b6d4)",
        icon: createIcon("var(--gy-info, #06b6d4)"),
      },
    ],
    height: 340,
    truncateCharacterAfter: 24,
    showValues: true,
  },
};

export const CylindricalTruncatedLabels: Story = {
  args: {
    variant: "cylindrical",
    data: [
      { label: "North America Operations", value: 85000, icon: createIcon("#ffffff") },
      { label: "European Union Headquarters", value: 62000, icon: createIcon("#ffffff") },
      { label: "Asia-Pacific Emerging", value: 78000, icon: createIcon("#ffffff") },
      { label: "Latin America Hub", value: 43000, icon: createIcon("#ffffff") },
      { label: "Middle East Division", value: 51000, icon: createIcon("#ffffff") },
    ],
    height: 320,
    truncateCharacterAfter: 10,
    showValues: true,
  },
};

export const ResponsiveMobile: Story = {
  render: () => (
    <div
      style={{
        width: 270,
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
        Mobile Container Preview (270px)
      </div>
      <BarChart
        variant="cylindrical"
        data={sampleData}
        height={280}
        showValues
      />
    </div>
  ),
};

export const LoadingState: Story = {
  args: {
    variant: "cylindrical",
    data: [],
    loading: true,
    height: 300,
    maxBars: 5,
  },
};

export const HorizontalLoadingState: Story = {
  args: {
    variant: "horizontal",
    data: [],
    loading: true,
    height: 320,
    maxBars: 5,
  },
};

export const EmptyState: Story = {
  args: {
    variant: "cylindrical",
    data: [],
    loading: false,
    height: 250,
  },
};
