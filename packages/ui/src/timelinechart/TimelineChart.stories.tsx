import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TimelineChart } from "./TimelineChart";

const meta: Meta<typeof TimelineChart> = {
  title: "Galyan UI/TimelineChart",
  component: TimelineChart,
  tags: ["autodocs"],
  argTypes: {
    height: { control: "number" },
    width: { control: "text" },
    showGrid: { control: "boolean" },
    showSummaryHeader: { control: "boolean" },
    unit: { control: "text" },
    loading: { control: "boolean" },
    responsive: { control: "boolean" },
  },
} satisfies Meta<typeof TimelineChart>;

export default meta;
type Story = StoryObj<typeof TimelineChart>;

const sprintTasks = [
  { label: "Planning", start: 0, end: 3, color: "var(--gy-primary, #3b82f6)" },
  { label: "Design", start: 2, end: 6, color: "var(--gy-info, #06b6d4)" },
  { label: "DB Setup", start: 4, end: 8, color: "var(--gy-warning, #f59e0b)" },
  { label: "Backend API", start: 6, end: 13, color: "var(--gy-success, #10b981)" },
  { label: "Frontend UI", start: 8, end: 15, color: "#8b5cf6" },
  { label: "Testing", start: 13, end: 17, color: "#ec4899" },
  { label: "Deployment", start: 16, end: 18, color: "var(--gy-danger, #ef4444)" },
];

export const Default: Story = {
  args: {
    data: sprintTasks,
    height: 360,
    width: "100%",
    unit: "Day",
    summaryTitle: "Sprint 42 Roadmap",
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
      <TimelineChart
        data={sprintTasks.slice(0, 5)}
        height={300}
        width="100%"
        unit="Day"
        summaryTitle="Mobile Sprint"
      />
    </div>
  ),
};

export const CustomHoursUnit: Story = {
  args: {
    data: [
      { label: "Keynote", start: 9, end: 11, color: "var(--gy-primary, #3b82f6)" },
      { label: "Tech Session", start: 11, end: 13, color: "var(--gy-success, #10b981)" },
      { label: "Lunch & Networking", start: 13, end: 14, color: "var(--gy-warning, #f59e0b)" },
      { label: "Workshops", start: 14, end: 17, color: "#8b5cf6" },
      { label: "Afterparty", start: 17, end: 21, color: "#ec4899" },
    ],
    height: 320,
    width: "100%",
    unit: "Hour",
    summaryTitle: "Conference Schedule",
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
