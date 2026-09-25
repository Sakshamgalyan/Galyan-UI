import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  DatePicker,
  DatePickerValue,
  DatePickerRangeValue,
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
  render: (args) => {
    const [date, setDate] = useState<DatePickerValue>(new Date());
    return <DatePicker {...args} value={date} onChange={setDate} />;
  },
};

export const RangeWithPresentFeature: Story = {
  render: () => {
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
          onChange={setRange}
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
  render: () => {
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
        onChange={setRange}
        helperText="Past dates are disabled for booking"
      />
    );
  },
};

export const WithQuickPresets: Story = {
  render: () => {
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
  render: () => {
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
  render: () => {
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
  render: () => {
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
  render: (args) => {
    const [date, setDate] = useState<DatePickerValue>(new Date());
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
  render: (args) => {
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
