import type { Meta, StoryObj } from "@storybook/react";
import { ChoroplethMap, type MapRegionItem } from "./ChoroplethMap";

const meta: Meta<typeof ChoroplethMap> = {
  title: "Galyan UI/ChoroplethMap",
  component: ChoroplethMap,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["world", "tiles"],
      description:
        "Map presentation variant: vector world map or US state grid tiles.",
    },
    height: { control: "number" },
    loading: { control: "boolean" },
    showZoomControls: { control: "boolean" },
    showBeacons: { control: "boolean" },
    showGraticule: { control: "boolean" },
    animate: { control: "boolean" },
    highlightColor: { control: "color" },
    activeColor: { control: "color" },
    baseColor: { control: "color" },
  },
} satisfies Meta<typeof ChoroplethMap>;

export default meta;
type Story = StoryObj<typeof ChoroplethMap>;

// Exact data matching user's uploaded screenshot
const screenshotWorldData: MapRegionItem[] = [
  { id: "CA", name: "Canada", value: 45 },
  { id: "RU", name: "Russia", value: 60 },
  { id: "CN", name: "China", value: 75 },
  { id: "IN", name: "India", value: 50 },
  { id: "BR", name: "Brazil", value: 40 },
  { id: "AU", name: "Australia", value: 35 },
  { id: "ZA", name: "South Africa", value: 92 },
];

const sampleGlobalMarketData: MapRegionItem[] = [
  { id: "US", name: "United States", value: 95000 },
  { id: "CA", name: "Canada", value: 42000 },
  { id: "GB", name: "United Kingdom", value: 68000 },
  { id: "DE", name: "Germany", value: 72000 },
  { id: "FR", name: "France", value: 54000 },
  { id: "IN", name: "India", value: 89000 },
  { id: "CN", name: "China", value: 98000 },
  { id: "JP", name: "Japan", value: 61000 },
  { id: "AU", name: "Australia", value: 48000 },
  { id: "BR", name: "Brazil", value: 39000 },
  { id: "ZA", name: "South Africa", value: 33000 },
  { id: "SA", name: "Saudi Arabia", value: 27000 },
  { id: "NG", name: "Nigeria", value: 21000 },
  { id: "EG", name: "Egypt", value: 18000 },
  { id: "MX", name: "Mexico", value: 31000 },
];

const sampleStateData: MapRegionItem[] = [
  { id: "CA", value: 92000 },
  { id: "TX", value: 84000 },
  { id: "NY", value: 71000 },
  { id: "FL", value: 65000 },
  { id: "IL", value: 43000 },
  { id: "PA", value: 39000 },
  { id: "OH", value: 29000 },
  { id: "GA", value: 31000 },
  { id: "NC", value: 24000 },
  { id: "MI", value: 18000 },
];

/**
 * Exact replica of the World Region Map Chart from the uploaded screenshot.
 * Features soft periwinkle regions with South Africa highlighted in deep purple and zoom controls.
 */
export const WorldRegionMapMatch: Story = {
  name: "World Region Map (User Upload Match)",
  args: {
    variant: "world",
    data: screenshotWorldData,
    selectedRegion: "ZA",
    activeColor: "#e0e7ff",
    highlightColor: "#4338ca",
    baseColor: "#ffffff",
    borderColor: "#e2e8f0",
    height: 480,
    showZoomControls: true,
  },
};

export const InteractiveWorldMap: Story = {
  name: "Interactive Global Distribution",
  args: {
    variant: "world",
    data: sampleGlobalMarketData,
    colorScale: ["#e0e7ff", "#a5b4fc", "#6366f1", "#4338ca"],
    height: 480,
    showZoomControls: true,
  },
};

export const USTileGridMap: Story = {
  name: "US State Grid Tiles",
  args: {
    variant: "tiles",
    data: sampleStateData,
    height: 380,
    colorScale: ["#e0e7ff", "#818cf8", "#4f46e5"],
  },
};

export const AnimatedRealWorldMap: Story = {
  name: "Animated Real Map with Radar Beacons",
  args: {
    variant: "world",
    data: sampleGlobalMarketData,
    selectedRegion: "US",
    showBeacons: true,
    showGraticule: true,
    animate: true,
    activeColor: "#bfdbfe",
    highlightColor: "#3b82f6",
    baseColor: "#f1f5f9",
    borderColor: "#cbd5e1",
    height: 520,
    showZoomControls: true,
  },
};

export const LoadingState: Story = {
  args: {
    variant: "world",
    data: [],
    loading: true,
    height: 420,
  },
};

