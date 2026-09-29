import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RadarChart } from "./RadarChart";

const meta: Meta<typeof RadarChart> = {
  title: "Galyan UI/RadarChart",
  component: RadarChart,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["standard", "filled", "dots"],
    },
    gridType: {
      control: "select",
      options: ["polygon", "circle"],
    },
    height: { control: "number" },
    width: { control: "text" },
    showGrid: { control: "boolean" },
    showLegend: { control: "boolean" },
    loading: { control: "boolean" },
    responsive: { control: "boolean" },
    animate: { control: "boolean" },
    animationDuration: { control: "number" },
    animationEasing: {
      control: "select",
      options: ["ease", "ease-in", "ease-out", "ease-in-out", "linear"],
    },
  },
} satisfies Meta<typeof RadarChart>;

export default meta;
type Story = StoryObj<typeof RadarChart>;

const radarData = [
  { subject: "Speed", playerA: 120, playerB: 110 },
  { subject: "Shooting", playerA: 98, playerB: 130 },
  { subject: "Passing", playerA: 86, playerB: 95 },
  { subject: "Dribbling", playerA: 99, playerB: 90 },
  { subject: "Defending", playerA: 85, playerB: 115 },
  { subject: "Physical", playerA: 65, playerB: 85 },
];

const seriesConfig = [
  { key: "playerA", name: "Player A", color: "var(--gy-primary, #3b82f6)" },
  { key: "playerB", name: "Player B", color: "var(--gy-success, #10b981)" },
];

export const Filled: Story = {
  args: {
    variant: "filled",
    data: radarData,
    angleKey: "subject",
    series: seriesConfig,
    height: 350,
    width: "100%",
  },
};

export const Standard: Story = {
  args: {
    ...Filled.args,
    variant: "standard",
  },
};

export const InteractiveAnimation: Story = {
  render: function InteractiveRadar() {
    const dataSets = [
      [
        { subject: "Speed", playerA: 120, playerB: 110 },
        { subject: "Shooting", playerA: 98, playerB: 130 },
        { subject: "Passing", playerA: 86, playerB: 95 },
        { subject: "Dribbling", playerA: 99, playerB: 90 },
        { subject: "Defending", playerA: 85, playerB: 115 },
        { subject: "Physical", playerA: 65, playerB: 85 },
      ],
      [
        { subject: "Speed", playerA: 70, playerB: 140 },
        { subject: "Shooting", playerA: 135, playerB: 85 },
        { subject: "Passing", playerA: 115, playerB: 120 },
        { subject: "Dribbling", playerA: 60, playerB: 130 },
        { subject: "Defending", playerA: 130, playerB: 70 },
        { subject: "Physical", playerA: 110, playerB: 65 },
      ],
      [
        { subject: "Speed", playerA: 105, playerB: 100 },
        { subject: "Shooting", playerA: 110, playerB: 115 },
        { subject: "Passing", playerA: 125, playerB: 90 },
        { subject: "Dribbling", playerA: 115, playerB: 105 },
        { subject: "Defending", playerA: 95, playerB: 100 },
        { subject: "Physical", playerA: 90, playerB: 110 },
      ],
    ];

    const [datasetIndex, setDatasetIndex] = React.useState(0);
    const [replayKey, setReplayKey] = React.useState(0);
    const activeData = dataSets[datasetIndex] ?? radarData;

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
            onClick={() =>
              setDatasetIndex((prev) => (prev + 1) % dataSets.length)
            }
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
            Smooth Morph Stats ({datasetIndex + 1}/{dataSets.length})
          </button>
          <button
            type="button"
            onClick={() => setReplayKey((k) => k + 1)}
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
            Replay Entrance Animation
          </button>
        </div>
        <div style={{ width: 400, height: 380 }}>
          <RadarChart
            key={replayKey}
            variant="filled"
            data={activeData}
            angleKey="subject"
            series={seriesConfig}
            height={380}
            width="100%"
            animate={true}
            animationDuration={1000}
            animationEasing="ease-out"
            showLegend
          />
        </div>
      </div>
    );
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
      <RadarChart
        variant="filled"
        data={radarData}
        angleKey="subject"
        series={seriesConfig}
        height={320}
        width="100%"
        showLegend
      />
    </div>
  ),
};

export const CircleGridWithDots: Story = {
  args: {
    variant: "dots",
    gridType: "circle",
    data: radarData,
    angleKey: "subject",
    series: seriesConfig,
    height: 350,
    width: "100%",
  },
};

export const CustomFormatter: Story = {
  args: {
    ...Filled.args,
    tooltipConfig: {
      formatter: (val: number, name?: string) => `${val} pts (${name})`,
    },
  },
};

export const LoadingState: Story = {
  args: {
    ...Filled.args,
    loading: true,
    data: [],
  },
};

export const EmptyState: Story = {
  args: {
    ...Filled.args,
    data: [],
  },
};
