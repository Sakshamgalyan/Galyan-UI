import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MonthPicker, MonthPickerValue } from "./MonthPicker";

/**
 * Dedicated selector for month and year combinations with support for min/max month/year constraints, custom formats, and action buttons.
 */
const meta: Meta<typeof MonthPicker> = {
  title: "Galyan UI/MonthPicker",
  component: MonthPicker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 360, minHeight: 380, padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    minYear: { control: "number" },
    maxYear: { control: "number" },
    placement: { control: "inline-radio", options: ["top", "bottom"] },
    align: { control: "inline-radio", options: ["left", "right"] },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    hasError: { control: "boolean" },
  },
} satisfies Meta<typeof MonthPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Billing Month",
    placeholder: "Select month & year",
    minYear: 1970,
    maxYear: 2050,
    disabled: false,
    required: false,
    hasError: false,
  },
  render: (args) => {
    const [month, setMonth] = useState<MonthPickerValue | null>({
      year: 2026,
      month: 6,
    });
    return <MonthPicker {...args} value={month} onChange={setMonth} />;
  },
};

export const MinAndMaxMonthConstraints: Story = {
  render: () => {
    // Only allow April 2026 (index 3) to August 2026 (index 7)
    const [month, setMonth] = useState<MonthPickerValue | null>({
      year: 2026,
      month: 4,
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <MonthPicker
          label="Fiscal Quarter (Apr 2026 - Aug 2026 Only)"
          placeholder="Choose allowed month"
          value={month}
          onChange={setMonth}
          minMonth={{ year: 2026, month: 3 }}
          maxMonth={{ year: 2026, month: 7 }}
          helperText="Months before April and after August are disabled and greyed out"
        />
        <div style={{ fontSize: "0.85rem", color: "var(--gy-text-muted)" }}>
          Selected Month: <code>{JSON.stringify(month)}</code>
        </div>
      </div>
    );
  },
};

export const FutureMonthsOnly: Story = {
  render: () => {
    const now = new Date();
    const [month, setMonth] = useState<MonthPickerValue | null>({
      year: now.getFullYear(),
      month: now.getMonth(),
    });

    return (
      <MonthPicker
        label="Subscription Renewal (Future Months)"
        placeholder="Select renewal month"
        value={month}
        onChange={setMonth}
        minDate={now}
        maxYear={now.getFullYear() + 3}
        helperText="Past months are disabled and greyed out"
      />
    );
  },
};

export const HistoricalArchiveOnly: Story = {
  render: () => {
    const [month, setMonth] = useState<MonthPickerValue | null>({
      year: 2024,
      month: 5,
    });

    return (
      <MonthPicker
        label="Archived Tax Filings (2020 - 2025)"
        placeholder="Select filing period"
        value={month}
        onChange={setMonth}
        minYear={2020}
        maxYear={2025}
        helperText="Years outside 2020-2025 are disabled in both month and decade view"
      />
    );
  },
};

export const WithApplyCancelActions: Story = {
  args: {
    label: "Report Period",
    placeholder: "Choose period",
  },
  render: (args) => {
    const [month, setMonth] = useState<MonthPickerValue | null>({
      year: 2026,
      month: 0,
    });
    return (
      <MonthPicker
        {...args}
        value={month}
        onApply={(val) => {
          setMonth(val);
          alert(
            `Applied: ${val?.month !== undefined ? val.month + 1 : ""}/${val?.year}`,
          );
        }}
        onCancel={() => alert("Cancelled")}
      />
    );
  },
};

export const DisabledAndErrorStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <MonthPicker
        label="Disabled MonthPicker"
        placeholder="Cannot interact"
        disabled
        value={{ year: 2026, month: 6 }}
      />
      <MonthPicker
        label="Required Field with Error"
        placeholder="Select month"
        hasError
        required
        helperText="Please select a valid billing month"
      />
    </div>
  ),
};

export const InlineBorderless: Story = {
  render: () => {
    const [month, setMonth] = useState<MonthPickerValue | null>({
      year: 2026,
      month: 6,
    });
    return (
      <div
        style={{
          width: 320,
          padding: "1rem",
          backgroundColor: "#ffffff",
          borderRadius: "1rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          border: "1px solid #e2e8f0",
        }}
      >
        <MonthPicker
          inline
          borderless
          value={month}
          onChange={setMonth}
          maxMonth={{ year: 2026, month: 8 }}
        />
      </div>
    );
  },
};
