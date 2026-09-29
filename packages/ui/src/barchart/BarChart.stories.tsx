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
      description: "Default fallback fill color for all bars.",
    },
    trackColor: {
      control: "color",
      description: "Custom track/tube background color.",
    },
    maxValue: {
      control: "number",
      description: "Optional custom max value for scaling fill heights.",
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
      description:
        "Maximum character length before truncating labels with ellipsis.",
    },
    responsive: {
      control: "boolean",
      description:
        "Whether to automatically adjust bar sizes for mobile viewports.",
    },
  },
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof BarChart>;

// ── Payment Icons / Badges matching screenshot ──────────────────────────────
const VisaLogo = () => (
  <svg width="36" height="18" viewBox="0 0 50 18" fill="none">
    <path
      d="M19.5 2L14.2 15.5H10.5L6.4 5.2C6.1 4.2 5.8 3.8 5 3.3C3.7 2.6 1.7 2 0 1.6L0.2 0.8H7.3C8.2 0.8 9 1.4 9.2 2.5L11 12.2L15.6 0.8H19.5ZM37.2 10.6C37.2 6.2 31.1 6 31.2 4C31.2 3.4 31.8 2.7 33.1 2.5C33.7 2.4 35.5 2.4 37.3 3.2L38 0C37 -0.4 35.7 -0.7 34.1 -0.7C29.9 -0.7 27 1.6 27 4.8C26.9 7.2 29.1 8.5 30.7 9.3C32.4 10.1 32.9 10.6 32.9 11.4C32.9 12.5 31.5 13 30.2 13C28 13 26.8 12.4 25.8 11.9L25.1 15.3C26.1 15.8 28 16.2 29.9 16.2C34.4 16.2 37.2 14 37.2 10.6ZM48 15.5H51.4L48.4 0.8H45.2C44.4 0.8 43.8 1.3 43.5 2L37.2 15.5H41.2L42 13.3H46.8L47.3 15.5H48ZM43.1 10.3L45 5.1L46.1 10.3H43.1ZM25.8 0.8L22.6 15.5H18.8L22 0.8H25.8Z"
      fill="#1A1F71"
    />
  </svg>
);

const MastercardLogo = () => (
  <svg width="30" height="20" viewBox="0 0 36 24" fill="none">
    <circle cx="13" cy="12" r="10" fill="#EB001B" />
    <circle cx="23" cy="12" r="10" fill="#F79E1B" />
    <path
      d="M18 5.68a9.96 9.96 0 0 0-4.32 6.32 9.96 9.96 0 0 0 4.32 6.32 9.96 9.96 0 0 0 4.32-6.32A9.96 9.96 0 0 0 18 5.68Z"
      fill="#FF5F00"
    />
  </svg>
);

const NetbankingBadge = () => (
  <div
    style={{
      width: 30,
      height: 30,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid #e2e8f0",
      borderRadius: 7,
      background: "#ffffff",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
    }}
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="5" r="2.8" stroke="#4C1D95" strokeWidth="1.8" />
      <circle cx="5" cy="18" r="2.8" stroke="#4C1D95" strokeWidth="1.8" />
      <circle cx="19" cy="18" r="2.8" stroke="#4C1D95" strokeWidth="1.8" />
      <path
        d="M12 8v3.5m-5 3.5l3-2.5m4 0l3 2.5"
        stroke="#6D28D9"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12.5" r="1.5" fill="#7C3AED" />
    </svg>
  </div>
);

const UpiBadge = () => (
  <div
    style={{
      width: 30,
      height: 30,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid #e2e8f0",
      borderRadius: 7,
      background: "#ffffff",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
      <span
        style={{
          fontSize: "9px",
          fontWeight: 800,
          color: "#475569",
          letterSpacing: "-0.5px",
        }}
      >
        UPI
      </span>
      <svg width="7" height="10" viewBox="0 0 8 12" fill="none">
        <path
          d="M1 1L7 6L1 11"
          stroke="#F97316"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 3.5L7 6L4 8.5"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </div>
);

const QrisBadge = () => (
  <div
    style={{
      width: 32,
      height: 32,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid #bae6fd",
      borderRadius: 8,
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
      boxShadow: "0 1px 3px rgba(3, 105, 161, 0.08)",
    }}
  >
    <span
      style={{
        fontSize: "11px",
        fontWeight: 800,
        color: "#0c4a6e",
        letterSpacing: "0.5px",
      }}
    >
      QR
    </span>
  </div>
);

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

// Payment Methods Data matching user screenshot
const paymentMethodsData: BarChartItem[] = [
  {
    label: "VISA",
    value: 1.52,
    icon: <VisaLogo />,
  },
  {
    label: "MASTER",
    value: 2.24,
    icon: <MastercardLogo />,
  },
  {
    label: "NETBANKING",
    value: 0,
    icon: <NetbankingBadge />,
  },
  {
    label: "UPI",
    value: 4.08,
    icon: <UpiBadge />,
  },
  {
    label: "QRIS",
    value: 2.33,
    icon: <QrisBadge />,
  },
];

// Payment Methods Horizontal Data matching user screenshot
const paymentMethodsHorizontalData: BarChartItem[] = [
  {
    label: "MASTER",
    value: 23.14,
    icon: <MastercardLogo />,
  },
  {
    label: "VISA",
    value: 19.83,
    icon: <VisaLogo />,
  },
  {
    label: "NETBANKING",
    value: 6.03,
    icon: <NetbankingBadge />,
  },
  {
    label: "UPI",
    value: 4.28,
    icon: <UpiBadge />,
  },
  {
    label: "QRIS",
    value: 3.93,
    icon: <QrisBadge />,
  },
];

const sampleData: BarChartItem[] = [
  { label: "E-commerce Store", value: 85, icon: createIcon("#ffffff") },
  { label: "SaaS Subscriptions", value: 62, icon: createIcon("#ffffff") },
  { label: "Consulting Services", value: 43, icon: createIcon("#ffffff") },
  { label: "Mobile Apps Market", value: 71, icon: createIcon("#ffffff") },
  { label: "Offline Retail Shop", value: 29, icon: createIcon("#ffffff") },
];

const multiColorSampleData: BarChartItem[] = [
  {
    label: "VISA",
    value: 1.52,
    color: "#3b82f6",
    icon: <VisaLogo />,
  },
  {
    label: "MASTER",
    value: 2.24,
    color: "#ef4444",
    icon: <MastercardLogo />,
  },
  {
    label: "NETBANKING",
    value: 0,
    color: "#8b5cf6",
    icon: <NetbankingBadge />,
  },
  {
    label: "UPI",
    value: 4.08,
    color: "#10b981",
    icon: <UpiBadge />,
  },
  {
    label: "QRIS",
    value: 2.33,
    color: "#06b6d4",
    icon: <QrisBadge />,
  },
];

const filledSampleData: BarChartItem[] = [
  {
    label: "E-commerce Store",
    value: 85,
    color: "var(--gy-primary, #3b82f6)",
    icon: createIcon("var(--gy-primary, #3b82f6)"),
  },
  {
    label: "SaaS Subscriptions",
    value: 62,
    color: "var(--gy-success, #10b981)",
    icon: createIcon("var(--gy-success, #10b981)"),
  },
  {
    label: "Consulting Services",
    value: 43,
    color: "var(--gy-warning, #f59e0b)",
    icon: createIcon("var(--gy-warning, #f59e0b)"),
  },
  {
    label: "Mobile Apps Market",
    value: 71,
    color: "var(--gy-danger, #ef4444)",
    icon: createIcon("var(--gy-danger, #ef4444)"),
  },
  {
    label: "Offline Retail Shop",
    value: 29,
    color: "var(--gy-info, #06b6d4)",
    icon: createIcon("var(--gy-info, #06b6d4)"),
  },
];

const dataWithoutIcons: BarChartItem[] = [
  { label: "Quarter 1", value: 34 },
  { label: "Quarter 2", value: 58 },
  { label: "Quarter 3", value: 89 },
  { label: "Quarter 4", value: 72 },
];

/**
 * Exact replica of the 3D Glass Cylinder Payment Methods Bar Chart.
 */
export const PaymentGateways3DCylinder: Story = {
  name: "Payment Gateways 3D Cylinder (User Upload Match)",
  args: {
    variant: "cylindrical",
    data: paymentMethodsData,
    height: 330,
    width: 480,
    barWidth: 44,
    barSpacing: 22,
    maxValue: 12,
    truncateCharacterAfter: 8,
    showValues: true,
  },
};

/**
 * Exact replica of the Horizontal Payment Methods Bar Chart with inline badges, 3D cylinder fills, and percentages.
 */
export const PaymentGatewaysHorizontalInline: Story = {
  name: "Payment Gateways Horizontal Inline (User Upload Match)",
  args: {
    variant: "horizontal",
    horizontalAlignment: "inline",
    data: paymentMethodsHorizontalData,
    width: 600,
    maxValue: 100,
    barWidth: 26,
    barSpacing: 16,
    truncateCharacterAfter: 8,
    showValues: true,
  },
};

export const Cylindrical: Story = {
  args: {
    variant: "cylindrical",
    data: sampleData,
    height: 320,
    barWidth: 42,
    barSpacing: 20,
    showValues: true,
  },
};

export const MultiColoredCylindrical: Story = {
  args: {
    variant: "cylindrical",
    data: multiColorSampleData,
    height: 330,
    barWidth: 44,
    barSpacing: 20,
    maxValue: 12,
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
    barWidth: 14,
    barSpacing: 16,
    showValues: true,
  },
};

export const CustomTooltipFormatter: Story = {
  args: {
    variant: "cylindrical",
    data: multiColorSampleData,
    height: 320,
    barWidth: 42,
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
        value: 95,
        color: "var(--gy-primary, #3b82f6)",
        icon: createIcon("var(--gy-primary, #3b82f6)"),
      },
      {
        label: "Automated Financial Reconciliation & Invoicing Engine",
        value: 78,
        color: "var(--gy-success, #10b981)",
        icon: createIcon("var(--gy-success, #10b981)"),
      },
      {
        label: "Global Supply Chain Logistics & Fulfillment Network",
        value: 62,
        color: "var(--gy-warning, #f59e0b)",
        icon: createIcon("var(--gy-warning, #f59e0b)"),
      },
      {
        label: "Cross-Platform Mobile Application Development Suite",
        value: 84,
        color: "var(--gy-danger, #ef4444)",
        icon: createIcon("var(--gy-danger, #ef4444)"),
      },
      {
        label: "Omnichannel Offline Retail Store POS & Operations",
        value: 41,
        color: "var(--gy-info, #06b6d4)",
        icon: createIcon("var(--gy-info, #06b6d4)"),
      },
    ],
    truncateCharacterAfter: 24,
    showValues: true,
  },
};

export const CylindricalTruncatedLabels: Story = {
  args: {
    variant: "cylindrical",
    data: [
      {
        label: "North America Operations",
        value: 85,
        icon: createIcon("#ffffff"),
      },
      {
        label: "European Union Headquarters",
        value: 62,
        icon: createIcon("#ffffff"),
      },
      {
        label: "Asia-Pacific Emerging",
        value: 78,
        icon: createIcon("#ffffff"),
      },
      { label: "Latin America Hub", value: 43, icon: createIcon("#ffffff") },
      { label: "Middle East Division", value: 51, icon: createIcon("#ffffff") },
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
      <BarChart
        variant="cylindrical"
        data={paymentMethodsData}
        height={280}
        maxValue={12}
        truncateCharacterAfter={8}
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
    height: 320,
    maxBars: 5,
  },
};

export const HorizontalLoadingState: Story = {
  args: {
    variant: "horizontal",
    data: [],
    loading: true,
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

export const HorizontalBothFormat: Story = {
  args: {
    variant: "horizontal",
    data: filledSampleData,
    showValues: true,
    valueFormat: "both",
  },
};

export const HorizontalScrollable: Story = {
  args: {
    variant: "horizontal",
    data: [
      ...filledSampleData,
      {
        label: "Direct Corporate Sales",
        value: 55,
        color: "var(--gy-primary, #3b82f6)",
        icon: createIcon("var(--gy-primary, #3b82f6)"),
      },
      {
        label: "Partner Referrals Network",
        value: 41,
        color: "var(--gy-success, #10b981)",
        icon: createIcon("var(--gy-success, #10b981)"),
      },
      {
        label: "Affiliate & Reseller Channels",
        value: 32,
        color: "var(--gy-warning, #f59e0b)",
        icon: createIcon("var(--gy-warning, #f59e0b)"),
      },
    ],
    height: 280,
    showValues: true,
  },
};

export const DashboardCardPreview: Story = {
  render: () => {
    return (
      <div
        style={{
          width: 480,
          background: "#ffffff",
          borderRadius: "1.5rem",
          padding: "1.25rem",
          border: "1px solid #e2e8f0",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{ fontWeight: 700, fontSize: "1rem", color: "#0f172a" }}
            >
              Payment Methods Breakdown
            </div>
            <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
              Distribution of transaction conversion rates
            </div>
          </div>
          <span
            style={{
              padding: "4px 10px",
              borderRadius: "9999px",
              background: "rgba(124, 58, 237, 0.1)",
              color: "#7c3aed",
              fontSize: "0.6875rem",
              fontWeight: 700,
            }}
          >
            Live Feed
          </span>
        </div>

        <div style={{ width: "100%", height: 320 }}>
          <BarChart
            variant="cylindrical"
            data={paymentMethodsData}
            height={320}
            maxValue={12}
            barWidth={44}
            barSpacing={20}
            truncateCharacterAfter={8}
            borderless
            showValues
          />
        </div>
      </div>
    );
  },
};
