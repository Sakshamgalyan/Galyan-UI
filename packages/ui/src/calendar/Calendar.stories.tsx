import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Calendar, CalendarValue } from "./Calendar";

/**
 * Full-featured interactive grid calendar with exquisite Light and Dark theme styling,
 * single date selection, dynamic range picking, and month/year navigation.
 */
const meta: Meta<typeof Calendar> = {
  title: "Galyan UI/Calendar",
  component: Calendar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "glassmorphic"] },
    mode: { control: "inline-radio", options: ["single", "range"] },
    firstDayOfWeek: { control: "inline-radio", options: [0, 1] },
    showTodayButton: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mode: "single",
    firstDayOfWeek: 0,
    showTodayButton: true,
  },
  render: function Render(args) {
    const [date, setDate] = useState<CalendarValue>(
      new Date(2026, 6, 15),
    );
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        }}
      >
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
  render: function Render(args) {
    const [range, setRange] = useState<CalendarValue>([
      new Date(2026, 6, 10),
      new Date(2026, 6, 20),
    ]);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <Calendar {...args} value={range} onChange={setRange} />
        <span style={{ fontSize: "0.875rem", color: "var(--gy-text-muted)" }}>
          Range:{" "}
          {Array.isArray(range) && range[0]
            ? range[0].toLocaleDateString()
            : ""}{" "}
          –{" "}
          {Array.isArray(range) && range[1]
            ? range[1].toLocaleDateString()
            : ""}
        </span>
      </div>
    );
  },
};

export const DarkModeSingle: Story = {
  render: function Render() {
    const [date, setDate] = useState<CalendarValue>(
      new Date(2026, 6, 15),
    );
    return (
      <div
        style={{
          padding: "2.5rem",
          background: "#0f172a",
          borderRadius: "1.25rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.25rem",
          boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
        }}
        data-color-mode="dark"
      >
        <div style={{ textAlign: "center" }}>
          <h4
            style={{
              margin: "0 0 0.25rem",
              color: "#f8fafc",
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            Dark Mode Calendar (Single)
          </h4>
          <span style={{ fontSize: "0.8125rem", color: "#94a3b8" }}>
            Rich slate background with vibrant glowing highlights
          </span>
        </div>
        <Calendar
          mode="single"
          value={date}
          onChange={setDate}
          showTodayButton
        />
        <span style={{ fontSize: "0.875rem", color: "#94a3b8" }}>
          Selected: {Array.isArray(date) ? "" : date?.toLocaleDateString()}
        </span>
      </div>
    );
  },
};

export const DarkModeRange: Story = {
  render: function Render() {
    const [range, setRange] = useState<CalendarValue>([
      new Date(2026, 6, 8),
      new Date(2026, 6, 22),
    ]);
    return (
      <div
        style={{
          padding: "2.5rem",
          background: "#0f172a",
          borderRadius: "1.25rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.25rem",
          boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
        }}
        data-color-mode="dark"
      >
        <div style={{ textAlign: "center" }}>
          <h4
            style={{
              margin: "0 0 0.25rem",
              color: "#f8fafc",
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            Dark Mode Calendar (Range)
          </h4>
          <span style={{ fontSize: "0.8125rem", color: "#94a3b8" }}>
            Connected capsule range ribbon with luminous endpoints
          </span>
        </div>
        <Calendar mode="range" value={range} onChange={setRange} />
        <span style={{ fontSize: "0.875rem", color: "#94a3b8" }}>
          Range:{" "}
          {Array.isArray(range) && range[0]
            ? range[0].toLocaleDateString()
            : ""}{" "}
          –{" "}
          {Array.isArray(range) && range[1]
            ? range[1].toLocaleDateString()
            : ""}
        </span>
      </div>
    );
  },
};

export const LightAndDarkComparison: Story = {
  render: function Render() {
    const [range1, setRange1] = useState<CalendarValue>([
      new Date(2026, 6, 12),
      new Date(2026, 6, 24),
    ]);
    const [range2, setRange2] = useState<CalendarValue>([
      new Date(2026, 6, 12),
      new Date(2026, 6, 24),
    ]);

    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {/* Light Theme Container */}
        <div
          style={{
            padding: "2rem",
            background: "#f8fafc",
            borderRadius: "1.25rem",
            border: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <h4
            style={{
              margin: 0,
              color: "#0f172a",
              fontSize: "0.95rem",
              fontWeight: 600,
            }}
          >
            Light Theme
          </h4>
          <Calendar
            mode="range"
            value={range1}
            onChange={setRange1}
            showTodayButton
          />
        </div>

        {/* Dark Theme Container */}
        <div
          style={{
            padding: "2rem",
            background: "#0f172a",
            borderRadius: "1.25rem",
            border: "1px solid #1e293b",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
          }}
          data-color-mode="dark"
        >
          <h4
            style={{
              margin: 0,
              color: "#f8fafc",
              fontSize: "0.95rem",
              fontWeight: 600,
            }}
          >
            Dark Theme
          </h4>
          <Calendar
            mode="range"
            value={range2}
            onChange={setRange2}
            showTodayButton
          />
        </div>
      </div>
    );
  },
};

export const WithMinMaxConstraints: Story = {
  args: {
    mode: "single",
    firstDayOfWeek: 0,
  },
  render: function Render(args) {
    const today = new Date(2026, 6, 15);
    const min = new Date(2026, 6, 5);
    const max = new Date(2026, 6, 25);
    const [date, setDate] = useState<CalendarValue>(today);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <Calendar
          {...args}
          value={date}
          minDate={min}
          maxDate={max}
          onChange={setDate}
        />
        <span style={{ fontSize: "0.875rem", color: "var(--gy-text-muted)" }}>
          Selectable window: {min.toLocaleDateString()} to{" "}
          {max.toLocaleDateString()}
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
  render: function Render(args) {
    const [range, setRange] = useState<CalendarValue>([
      new Date(2026, 6, 6),
      new Date(2026, 6, 12),
    ]);
    return <Calendar {...args} value={range} onChange={setRange} />;
  },
};

export const Glassmorphic: Story = {
  args: {
    variant: "glassmorphic",
    mode: "single",
    showTodayButton: true,
  },
  render: function Render(args) {
    const [date, setDate] = useState<CalendarValue>(new Date(2026, 6, 15));
    return (
      <div
        style={{
          padding: "2.5rem",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "1.5rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Calendar {...args} value={date} onChange={setDate} />
      </div>
    );
  },
};

