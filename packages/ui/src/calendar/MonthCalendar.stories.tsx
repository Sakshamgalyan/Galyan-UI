import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MonthCalendar, MonthCalendarValue } from "./MonthCalendar";

/**
 * Interactive inline Month and Year Calendar component with full decade navigation, min/max constraints, and dark mode support.
 */
const meta: Meta<typeof MonthCalendar> = {
  title: "Galyan UI/MonthCalendar",
  component: MonthCalendar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    minYear: { control: "number" },
    maxYear: { control: "number" },
    showTodayButton: { control: "boolean" },
    defaultView: { control: "inline-radio", options: ["months", "years"] },
  },
} satisfies Meta<typeof MonthCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    showTodayButton: true,
    minYear: 1970,
    maxYear: 2050,
  },
  render: (args) => {
    const [month, setMonth] = useState<MonthCalendarValue>({
      year: 2026,
      month: 6,
    });
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <MonthCalendar {...args} value={month} onChange={setMonth} />
        <span style={{ fontSize: "0.875rem", color: "var(--gy-text-muted)" }}>
          Selected: {months[month.month]} {month.year}
        </span>
      </div>
    );
  },
};

export const MinMaxConstraints: Story = {
  render: () => {
    const [month, setMonth] = useState<MonthCalendarValue>({
      year: 2026,
      month: 4,
    });
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <MonthCalendar
          value={month}
          onChange={setMonth}
          minMonth={{ year: 2026, month: 2 }}
          maxMonth={{ year: 2026, month: 8 }}
          showTodayButton
        />
        <span style={{ fontSize: "0.875rem", color: "var(--gy-text-muted)" }}>
          Allowed Range: Mar 2026 - Sep 2026
        </span>
      </div>
    );
  },
};

export const DecadeYearView: Story = {
  render: () => {
    const [month, setMonth] = useState<MonthCalendarValue>({
      year: 2026,
      month: 0,
    });
    return (
      <MonthCalendar
        value={month}
        onChange={setMonth}
        defaultView="years"
        showTodayButton
      />
    );
  },
};

export const DarkMode: Story = {
  render: () => {
    const [month, setMonth] = useState<MonthCalendarValue>({
      year: 2026,
      month: 8,
    });
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
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
            Dark Mode Month Calendar
          </h4>
          <span style={{ fontSize: "0.8125rem", color: "#94a3b8" }}>
            Luminous year and month selection grid
          </span>
        </div>
        <MonthCalendar value={month} onChange={setMonth} showTodayButton />
        <span style={{ fontSize: "0.875rem", color: "#94a3b8" }}>
          Selected: {months[month.month]} {month.year}
        </span>
      </div>
    );
  },
};
