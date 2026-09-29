import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TimePicker } from "./TimePicker";
import { Card } from "../card/Card";
import { Typography } from "../typography/Typography";
import { Button } from "../button/Button";
import { DatePicker, type DatePickerValue } from "../datepicker/DatePicker";
import { Dropdown } from "../dropdown/Dropdown";

const meta: Meta<typeof TimePicker> = {
  title: "Galyan UI/TimePicker",
  component: TimePicker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    format: { control: "inline-radio", options: ["12h", "24h"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: {
      control: "select",
      options: ["default", "filled", "glassmorphic"],
    },
    showSeconds: { control: "boolean" },
    minuteStep: { control: "number" },
    hourStep: { control: "number" },
    clearable: { control: "boolean" },
    showActions: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    hasError: { control: "boolean" },
    label: { control: "text" },
    helperText: { control: "text" },
    placeholder: { control: "text" },
  },
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [time, setTime] = useState("09:30 AM");
    return (
      <div style={{ width: 300 }}>
        <TimePicker
          label="Meeting Start Time"
          value={time}
          onChange={(formatted) => setTime(formatted)}
          helperText={`Selected time: ${time || "None"}`}
        />
      </div>
    );
  },
};

export const TwentyFourHour: Story = {
  render: function Render() {
    const [time, setTime] = useState("14:45");
    return (
      <div style={{ width: 300 }}>
        <TimePicker
          label="Shift Start (24h Mode)"
          format="24h"
          value={time}
          onChange={(formatted) => setTime(formatted)}
          helperText={`Selected: ${time}`}
        />
      </div>
    );
  },
};

export const WithSeconds: Story = {
  render: function Render() {
    const [time, setTime] = useState("08:15:30 AM");
    return (
      <div style={{ width: 320 }}>
        <TimePicker
          label="Precision Timestamp"
          format="12h"
          showSeconds
          value={time}
          onChange={(formatted) => setTime(formatted)}
          helperText="Includes hours, minutes, and seconds."
        />
      </div>
    );
  },
};

export const FifteenMinuteSteps: Story = {
  render: function Render() {
    const [time, setTime] = useState("10:00 AM");
    return (
      <div style={{ width: 300 }}>
        <TimePicker
          label="Calendar Slot (15-min Intervals)"
          minuteStep={15}
          value={time}
          onChange={(formatted) => setTime(formatted)}
          helperText="Select in 15-minute blocks (00, 15, 30, 45)."
        />
      </div>
    );
  },
};

export const WithQuickPresets: Story = {
  render: function Render() {
    const [time, setTime] = useState("12:00 PM");
    return (
      <div style={{ width: 320 }}>
        <TimePicker
          label="Workday Alarm"
          presets={["Now", "08:30 AM", "12:00 PM", "05:30 PM", "08:00 PM"]}
          value={time}
          onChange={(formatted) => setTime(formatted)}
          helperText="Choose a quick preset pill or pick custom columns."
        />
      </div>
    );
  },
};

export const Glassmorphic: Story = {
  render: function Render() {
    const [time, setTime] = useState("03:15 PM");
    return (
      <div
        style={{
          padding: "2rem",
          background:
            "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
          borderRadius: "1rem",
          width: 340,
        }}
      >
        <TimePicker
          label="Departure Window"
          variant="glassmorphic"
          value={time}
          onChange={(formatted) => setTime(formatted)}
          helperText="Frosted glass popover styling"
        />
      </div>
    );
  },
};

export const GlassmorphicDarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: function Render() {
    const [time, setTime] = useState("09:45 PM");
    return (
      <div
        className="gy-dark"
        data-color-mode="dark"
        style={{
          padding: "2.5rem",
          background:
            "radial-gradient(ellipse at top left, #1e1b4b 0%, #0f172a 60%, #020617 100%)",
          borderRadius: "1rem",
          width: 360,
        }}
      >
        <TimePicker
          label="Night Shift Slot"
          variant="glassmorphic"
          value={time}
          onChange={(formatted) => setTime(formatted)}
          helperText="Dark frosted glassmorphic popover and trigger"
          presets={["Now", "09:00 PM", "10:00 PM", "12:00 AM"]}
        />
      </div>
    );
  },
};

export const DateTimePickerComposition: Story = {
  render: function Render() {
    const [date, setDate] = useState<DatePickerValue>(new Date());
    const [time, setTime] = useState("02:00 PM");

    return (
      <Card variant="outlined" padding="lg" style={{ width: 440 }}>
        <Typography
          variant="h5"
          weight="semibold"
          style={{ marginBottom: "0.25rem" }}
        >
          Schedule Event
        </Typography>
        <Typography
          variant="small"
          style={{
            color: "var(--gy-text-muted)",
            marginBottom: "1.25rem",
            display: "block",
          }}
        >
          Select date and time for your team meeting.
        </Typography>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginBottom: "1.25rem",
          }}
        >
          <DatePicker label="Date" value={date} onChange={(d) => setDate(d)} />
          <TimePicker
            label="Time"
            value={time}
            onChange={(t) => setTime(t)}
            minuteStep={15}
          />
        </div>

        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}
        >
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              alert(
                `Scheduled for: ${date instanceof Date ? date.toLocaleDateString() : ""} at ${time}`,
              )
            }
          >
            Confirm Schedule
          </Button>
        </div>
      </Card>
    );
  },
};

export const PickersAndDropdownAlignment: Story = {
  render: function Render() {
    const [date, setDate] = useState<DatePickerValue>(new Date());
    const [time, setTime] = useState("09:30 AM");
    const [zone, setZone] = useState("utc");

    return (
      <Card variant="outlined" padding="lg" style={{ width: 680 }}>
        <Typography
          variant="h5"
          weight="semibold"
          style={{ marginBottom: "0.25rem" }}
        >
          Consistent Alignment Showcase
        </Typography>
        <Typography
          variant="small"
          style={{
            color: "var(--gy-text-muted)",
            marginBottom: "1.25rem",
            display: "block",
          }}
        >
          DatePicker, TimePicker, and Dropdown sharing identical
          label/trigger/helper alignment and floating popover offset.
        </Typography>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "1rem",
          }}
        >
          <DatePicker
            label="Date"
            value={date}
            onChange={(d) => setDate(d)}
            helperText="Event date"
          />
          <TimePicker
            label="Time"
            value={time}
            onChange={(t) => setTime(t)}
            helperText="Event time"
          />
          <Dropdown
            label="Timezone"
            value={zone}
            onChange={(val) => setZone(val as string)}
            options={[
              { value: "utc", label: "UTC (GMT+0)" },
              { value: "est", label: "New York (EST)" },
              { value: "pst", label: "San Francisco (PST)" },
              { value: "ist", label: "India (IST)" },
            ]}
            helperText="Preferred zone"
          />
        </div>
      </Card>
    );
  },
};
