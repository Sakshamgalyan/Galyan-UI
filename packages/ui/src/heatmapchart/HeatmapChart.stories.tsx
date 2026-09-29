import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { HeatmapChart } from "./HeatmapChart";

const meta: Meta<typeof HeatmapChart> = {
  title: "Galyan UI/HeatmapChart",
  component: HeatmapChart,
  tags: ["autodocs"],
  argTypes: {
    height: { control: "number" },
    loading: { control: "boolean" },
    animate: { control: "boolean" },
    animationDuration: { control: "number" },
    animationEasing: {
      control: "select",
      options: ["ease", "ease-in", "ease-out", "ease-in-out", "linear"],
    },
    stagger: { control: "boolean" },
  },
} satisfies Meta<typeof HeatmapChart>;

export default meta;
type Story = StoryObj<typeof HeatmapChart>;

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const hours = ["Morning", "Afternoon", "Evening", "Night"];

const heatmapData = [
  { x: "Mon", y: "Morning", value: 12 },
  { x: "Mon", y: "Afternoon", value: 45 },
  { x: "Mon", y: "Evening", value: 78 },
  { x: "Mon", y: "Night", value: 3 },
  { x: "Tue", y: "Morning", value: 24 },
  { x: "Tue", y: "Afternoon", value: 50 },
  { x: "Tue", y: "Evening", value: 85 },
  { x: "Tue", y: "Night", value: 8 },
  { x: "Wed", y: "Morning", value: 31 },
  { x: "Wed", y: "Afternoon", value: 40 },
  { x: "Wed", y: "Evening", value: 92 },
  { x: "Wed", y: "Night", value: 10 },
  { x: "Thu", y: "Morning", value: 15 },
  { x: "Thu", y: "Afternoon", value: 62 },
  { x: "Thu", y: "Evening", value: 70 },
  { x: "Thu", y: "Night", value: 5 },
  { x: "Fri", y: "Morning", value: 40 },
  { x: "Fri", y: "Afternoon", value: 88 },
  { x: "Fri", y: "Evening", value: 110 },
  { x: "Fri", y: "Night", value: 18 },
];

export const Default: Story = {
  args: {
    data: heatmapData,
    xAxisLabels: days,
    yAxisLabels: hours,
    height: 300,
    animate: true,
    animationDuration: 700,
    stagger: true,
  },
};

export const InteractiveAnimation: Story = {
  render: function Render() {
    const [multiplier, setMultiplier] = React.useState(1);
    const [key, setKey] = React.useState(0);

    const dynamicData = React.useMemo(() => {
      return heatmapData.map((d, i) => ({
        ...d,
        value: Math.round(
          ((d.value * multiplier * (1 + (i % 3) * 0.4)) % 120) + 5,
        ),
      }));
    }, [multiplier]);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            type="button"
            onClick={() => setMultiplier((m) => (m === 3 ? 1 : m + 1))}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              background: "#ffffff",
              cursor: "pointer",
              fontSize: "0.8125rem",
              fontWeight: 600,
            }}
          >
            Smooth Morph Intensity
          </button>
          <button
            type="button"
            onClick={() => setKey((k) => k + 1)}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              background: "#ffffff",
              cursor: "pointer",
              fontSize: "0.8125rem",
              fontWeight: 600,
            }}
          >
            Replay Ripple Wave
          </button>
        </div>
        <div style={{ width: "100%", maxWidth: 600 }}>
          <HeatmapChart
            key={key}
            data={dynamicData}
            xAxisLabels={days}
            yAxisLabels={hours}
            height={300}
            animate={true}
            animationDuration={700}
            stagger={true}
          />
        </div>
      </div>
    );
  },
};

export const LoadingState: Story = {
  args: {
    ...Default.args,
    loading: true,
    data: [],
  },
};
