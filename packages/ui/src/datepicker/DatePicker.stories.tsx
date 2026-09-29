import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  DatePicker,
  DatePickerValue,
  DatePickerRangeValue,
  DatePickerChangeContext,
} from "./DatePicker";

/**
 * Popover date picker input with support for single date, date range, "Present" ongoing feature, formats, presets, constraints, and custom triggers.
 */
const meta: Meta<typeof DatePicker> = {
  title: "Galyan UI/DatePicker",
  component: DatePicker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 380, minHeight: 460, padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    placeholder: { control: "text" },
    label: { control: "text" },
    helperText: { control: "text" },
    dateFormat: {
      control: "select",
      options: ["YYYY-MM-DD", "MM/DD/YYYY", "DD/MM/YYYY"],
    },
    firstDayOfWeek: { control: "inline-radio", options: [0, 1] },
    placement: { control: "inline-radio", options: ["top", "bottom"] },
    align: { control: "inline-radio", options: ["left", "right"] },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    hasError: { control: "boolean" },
    disableFutureDates: { control: "boolean" },
    usePortal: { control: "boolean" },
    showPresent: { control: "boolean" },
    showClear: { control: "boolean" },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Select Date",
    placeholder: "Pick a date",
    dateFormat: "YYYY-MM-DD",
    firstDayOfWeek: 0,
    placement: "bottom",
    align: "left",
    disabled: false,
    required: false,
    hasError: false,
    disableFutureDates: false,
    showPresent: true,
    showClear: true,
  },
  render: function Render(args) {
    const [date, setDate] = useState<DatePickerValue>(new Date());
    return <DatePicker {...args} value={date} onChange={setDate} />;
  },
};

export const RangeMode: Story = {
  args: {
    mode: "range",
    label: "Date Range Selection",
    placeholder: "Select date range",
    firstDayOfWeek: 0,
    showClear: true,
  },
  render: function Render(args) {
    // Initial value: July 10, 2026 to July 20, 2026 (matching Calendar reference)
    const [range, setRange] = useState<DatePickerRangeValue>([
      new Date(2026, 6, 10),
      new Date(2026, 6, 20),
    ]);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <DatePicker
          {...args}
          value={range}
          onChange={(v) => setRange(v as DatePickerRangeValue)}
          helperText="Seamless connected capsule ribbon range selection matching Calendar"
        />
        <div style={{ fontSize: "0.85rem", color: "var(--gy-text-muted)" }}>
          Selected:{" "}
          <code>
            {Array.isArray(range) && range[0] instanceof Date
              ? range[0].toLocaleDateString()
              : "none"}{" "}
            –{" "}
            {Array.isArray(range) && range[1] instanceof Date
              ? range[1].toLocaleDateString()
              : "none"}
          </code>
        </div>
      </div>
    );
  },
};

export const RangeVariant: Story = {
  render: function Render() {
    const [range, setRange] = useState<DatePickerRangeValue>([
      new Date(2026, 6, 10),
      new Date(2026, 6, 20),
    ]);
    return (
      <DatePicker
        variant="range"
        label="Range Variant (variant='range')"
        placeholder="Pick date range"
        value={range}
        onChange={(v) => setRange(v as DatePickerRangeValue)}
        showClear
      />
    );
  },
};

export const RangeWithPresentFeature: Story = {
  render: function Render() {
    // Initial value: Start date Jan 15, 2022 to Present
    const [range, setRange] = useState<DatePickerRangeValue>([
      new Date(2022, 0, 15),
      "present",
    ]);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <DatePicker
          mode="range"
          label="Employment Period (Supports 'Present')"
          placeholder="Select start and end date"
          value={range}
          onChange={(v) => setRange(v as DatePickerRangeValue)}
          showPresent
          showClear
          helperText="Click 'Present' in the popover to indicate currently active role"
        />
        <div style={{ fontSize: "0.85rem", color: "var(--gy-text-muted)" }}>
          Current Selected Value: <code>{JSON.stringify(range)}</code>
        </div>
      </div>
    );
  },
};

export const HotelBookingRange: Story = {
  render: function Render() {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 5);

    const [range, setRange] = useState<DatePickerRangeValue>([today, nextWeek]);

    return (
      <DatePicker
        mode="range"
        label="Hotel Reservation (Check-in & Check-out)"
        placeholder="Select check-in & check-out dates"
        value={range}
        minDate={today}
        onChange={(v) => setRange(v as DatePickerRangeValue)}
        helperText="Past dates are disabled for booking"
      />
    );
  },
};

export const WithQuickPresets: Story = {
  render: function Render() {
    const [date, setDate] = useState<DatePickerValue>(null);

    const presets = [
      {
        label: "Today",
        getValue: () => new Date(),
      },
      {
        label: "Yesterday",
        getValue: () => {
          const d = new Date();
          d.setDate(d.getDate() - 1);
          return d;
        },
      },
      {
        label: "Last 7 Days",
        getValue: () => {
          const start = new Date();
          start.setDate(start.getDate() - 7);
          return [start, new Date()] as DatePickerRangeValue;
        },
      },
      {
        label: "This Month",
        getValue: () => {
          const now = new Date();
          const start = new Date(now.getFullYear(), now.getMonth(), 1);
          return [start, now] as DatePickerRangeValue;
        },
      },
    ];

    return (
      <DatePicker
        mode="range"
        label="Analytics Date Filter"
        placeholder="Filter by date range..."
        value={date}
        onChange={setDate}
        presets={presets}
      />
    );
  },
};

export const MinAndMaxConstraints: Story = {
  render: function Render() {
    const now = new Date();
    const minDate = new Date(now.getFullYear(), now.getMonth(), 5);
    const maxDate = new Date(now.getFullYear(), now.getMonth(), 25);
    const [date, setDate] = useState<DatePickerValue>(
      new Date(now.getFullYear(), now.getMonth(), 12),
    );

    return (
      <DatePicker
        label="Delivery Window (5th - 25th this month)"
        placeholder="Select within delivery window"
        value={date}
        onChange={setDate}
        minDate={minDate}
        maxDate={maxDate}
        helperText="Dates outside 5th-25th are disabled"
      />
    );
  },
};

export const MondayFirstDayOfWeek: Story = {
  render: function Render() {
    const [date, setDate] = useState<DatePickerValue>(new Date());
    return (
      <DatePicker
        label="EU Calendar (Monday Start)"
        firstDayOfWeek={1}
        dateFormat="DD/MM/YYYY"
        value={date}
        onChange={setDate}
        helperText="Week begins on Monday (Mo, Tu, We, Th, Fr, Sa, Su)"
      />
    );
  },
};

export const CustomFormats: Story = {
  render: function Render() {
    const [d1, setD1] = useState<DatePickerValue>(new Date());
    const [d2, setD2] = useState<DatePickerValue>(new Date());
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <DatePicker
          label="US Format (MM/DD/YYYY)"
          dateFormat="MM/DD/YYYY"
          value={d1}
          onChange={setD1}
        />
        <DatePicker
          label="EU Format (DD/MM/YYYY)"
          dateFormat="DD/MM/YYYY"
          value={d2}
          onChange={setD2}
        />
      </div>
    );
  },
};

export const WithApplyCancelActions: Story = {
  args: {
    label: "Event Start Date",
    placeholder: "Select starting date",
  },
  render: function Render(args) {
    const [date] = useState<DatePickerValue>(new Date());
    return (
      <DatePicker
        {...args}
        value={date}
        onApply={(d) => alert(`Applied date: ${JSON.stringify(d)}`)}
        onCancel={() => alert("Selection cancelled")}
      />
    );
  },
};

export const DisableFutureDates: Story = {
  args: {
    label: "Date of Birth (No Future Dates)",
    disableFutureDates: true,
    placeholder: "Pick a past date",
  },
  render: function Render(args) {
    const [date, setDate] = useState<DatePickerValue>(new Date());
    return <DatePicker {...args} value={date} onChange={setDate} />;
  },
};

export const DisabledAndErrorStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <DatePicker
        label="Disabled DatePicker"
        placeholder="Cannot interact"
        disabled
        value={new Date()}
      />
      <DatePicker
        label="Required Appointment Date"
        placeholder="Pick date"
        required
        hasError
        helperText="Please select an available appointment slot"
      />
    </div>
  ),
};

export const DateTimeSelector: Story = {
  render: function Render() {
    const [dateTime, setDateTime] = useState<DatePickerValue>(new Date());
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <DatePicker
          mode="datetime"
          label="Event Schedule (Date & Time)"
          placeholder="Select date & time..."
          value={dateTime}
          onChange={setDateTime}
          helperText="Includes scrollable time dropdown for hours, minutes, and AM/PM with quick 'Now' button"
        />
        <div style={{ fontSize: "0.8125rem", color: "var(--gy-text-muted)" }}>
          Selected value: <code>{String(dateTime)}</code>
        </div>
      </div>
    );
  },
};

export const DateTimeWithSeconds24h: Story = {
  render: function Render() {
    const [dateTime, setDateTime] = useState<DatePickerValue>(new Date());
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <DatePicker
          mode="datetime"
          timeFormat="24h"
          showSeconds
          dateFormat="YYYY-MM-DD HH:mm:ss"
          label="Server Audit Log Timestamp (24h with Seconds)"
          placeholder="YYYY-MM-DD HH:mm:ss"
          value={dateTime}
          onChange={setDateTime}
          helperText="High-precision timestamp selector with seconds down to the exact second"
        />
        <div style={{ fontSize: "0.8125rem", color: "var(--gy-text-muted)" }}>
          Formatted value: <code>{String(dateTime)}</code>
        </div>
      </div>
    );
  },
};

export const EpochTimestampSelection: Story = {
  render: function Render() {
    // Initial value given as a numeric unix epoch timestamp (ms)
    const [epochValue, setEpochValue] = useState<number | null>(Date.now());
    const [contextInfo, setContextInfo] = useState<DatePickerChangeContext | null>(null);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <DatePicker
          mode="datetime"
          valueFormat="epoch"
          label="Telemetry Snapshot (Epoch Value)"
          placeholder="Pick date & exact time"
          value={epochValue}
          onChange={(val, ctx) => {
            setEpochValue(val as number | null);
            setContextInfo(ctx ?? null);
          }}
          helperText="Select exact date & time; returns value as a Unix epoch timestamp (milliseconds)"
        />

        <div
          style={{
            padding: "0.875rem",
            background: "var(--gy-background-subtle, #f8fafc)",
            border: "1px solid var(--gy-border, #e2e8f0)",
            borderRadius: "0.5rem",
            fontSize: "0.8125rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.375rem",
          }}
        >
          <div>
            <strong>Epoch Timestamp (ms):</strong>{" "}
            <code
              style={{ color: "var(--gy-primary, #6366f1)", fontWeight: 700 }}
            >
              {epochValue ?? "null"}
            </code>
          </div>
          <div>
            <strong>Readable ISO:</strong>{" "}
            <code>
              {epochValue ? new Date(epochValue).toISOString() : "null"}
            </code>
          </div>
          <div>
            <strong>Context Formatted:</strong>{" "}
            <code>
              {contextInfo?.formatted ||
                (epochValue ? new Date(epochValue).toLocaleString() : "")}
            </code>
          </div>
        </div>
      </div>
    );
  },
};

export const CustomDateFormatWithTime: Story = {
  render: function Render() {
    const [d1, setD1] = useState<DatePickerValue>(new Date());
    const [d2, setD2] = useState<DatePickerValue>(new Date());
    const [d3, setD3] = useState<DatePickerValue>(Date.now());

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <DatePicker
          mode="datetime"
          dateFormat="MM/DD/YYYY hh:mm A"
          label="US Format with Time (MM/DD/YYYY hh:mm A)"
          value={d1}
          onChange={setD1}
        />
        <DatePicker
          mode="datetime"
          dateFormat="D MMM YYYY, h:mm A"
          label="Friendly Verbal Format (D MMM YYYY, h:mm A)"
          value={d2}
          onChange={setD2}
        />
        <DatePicker
          mode="datetime"
          dateFormat="epoch"
          valueFormat="epoch"
          label="Direct Epoch Input Display (dateFormat='epoch')"
          value={d3}
          onChange={setD3}
          helperText="Displays Unix epoch milliseconds directly in the input box"
        />
      </div>
    );
  },
};
