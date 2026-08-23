import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "./Calendar";

/**
 * Full-featured interactive grid calendar supporting single date selection and date range picking.
 */
const meta: Meta<typeof Calendar> = {
  title: "Galyan UI/Calendar",
  component: Calendar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    mode: { control: "inline-radio", options: ["single", "range"] },
    firstDayOfWeek: { control: "inline-radio", options: [0, 1] },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleMode: Story = {
  args: {
    mode: "single",
    firstDayOfWeek: 0,
  },
  render: (args) => {
    const [date, setDate] = useState<Date | [Date, Date]>(new Date(2026, 6, 15));
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
        <Calendar {...args} value={date} onChange={setDate} />
        <span style={{ fontSize: "0.875rem", color: "var(--gy-text-muted)" }}>
          Selected: {Array.isArray(date) ? "" : date?.toLocaleDateString()}
        </span>
      </div>
    );
  },
};

export const RangeMode: Story = {
  args: {
    mode: "range",
    firstDayOfWeek: 0,
  },
  render: (args) => {
    const [range, setRange] = useState<Date | [Date, Date]>([
      new Date(2026, 6, 10),
      new Date(2026, 6, 20),
    ]);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
        <Calendar {...args} value={range} onChange={setRange} />
        <span style={{ fontSize: "0.875rem", color: "var(--gy-text-muted)" }}>
          Range: {Array.isArray(range) && range[0] ? range[0].toLocaleDateString() : ""} –{" "}
          {Array.isArray(range) && range[1] ? range[1].toLocaleDateString() : ""}
        </span>
      </div>
    );
  },
};

export const WithMinMaxConstraints: Story = {
  args: {
    mode: "single",
    firstDayOfWeek: 0,
  },
  render: (args) => {
    const today = new Date(2026, 6, 15);
    const min = new Date(2026, 6, 5);
    const max = new Date(2026, 6, 25);
    const [date, setDate] = useState<Date | [Date, Date]>(today);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
        <Calendar {...args} value={date} minDate={min} maxDate={max} onChange={setDate} />
        <span style={{ fontSize: "0.875rem", color: "var(--gy-text-muted)" }}>
          Selectable window: {min.toLocaleDateString()} to {max.toLocaleDateString()}
        </span>
      </div>
    );
  },
};

export const MondayFirst: Story = {
  args: {
    mode: "range",
    firstDayOfWeek: 1,
  },
  render: (args) => {
    const [range, setRange] = useState<Date | [Date, Date]>([
      new Date(2026, 6, 6),
      new Date(2026, 6, 12),
    ]);
    return <Calendar {...args} value={range} onChange={setRange} />;
  },
};

export const SoftRangeHighlightDarkCard: Story = {
  render: () => {
    const [range, setRange] = useState<Date | [Date, Date]>([
      new Date(2026, 6, 8),
      new Date(2026, 6, 22),
    ]);
    return (
      <div
        style={{
          padding: "2rem",
          background: "#0f172a",
          borderRadius: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
        data-color-mode="dark"
      >
        <h4 style={{ margin: 0, color: "#f8fafc", fontSize: "0.95rem" }}>
          Gentle & Soft Dark Range Highlight
        </h4>
        <Calendar mode="range" value={range} onChange={setRange} />
      </div>
    );
  },
};
