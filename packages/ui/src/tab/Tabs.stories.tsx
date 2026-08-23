import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";

const HomeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ActivityIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const FileTextIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const meta: Meta<typeof Tabs> = {
  title: "Galyan UI/Tabs",
  component: Tabs,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 560, padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

const demoItems = [
  {
    id: "overview",
    label: "Overview",
    icon: <HomeIcon />,
    content: (
      <p style={{ color: "var(--gy-text-muted)", margin: "0.5rem 0" }}>
        Overview content goes here. This is the main dashboard view.
      </p>
    ),
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <ActivityIcon />,
    badge: 3,
    content: (
      <p style={{ color: "var(--gy-text-muted)", margin: "0.5rem 0" }}>
        Analytics data and charts would render in this panel.
      </p>
    ),
  },
  {
    id: "reports",
    label: "Reports",
    icon: <FileTextIcon />,
    content: (
      <p style={{ color: "var(--gy-text-muted)", margin: "0.5rem 0" }}>
        Report generation tools and export options live here.
      </p>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    disabled: true,
    content: <p>Settings (disabled)</p>,
  },
];

export const Classic: Story = {
  args: { items: demoItems, variant: "classic" },
};

export const Card: Story = { args: { items: demoItems, variant: "card" } };

export const ButtonPill: Story = { args: { items: demoItems, variant: "button" } };

export const VerticalTabs: Story = {
  args: {
    items: demoItems,
    variant: "classic",
    orientation: "vertical",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      <div>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--gy-text-subtle)", display: "block", marginBottom: "0.5rem" }}>
          Small (sm)
        </span>
        <Tabs items={demoItems} variant="classic" size="sm" />
      </div>
      <div>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--gy-text-subtle)", display: "block", marginBottom: "0.5rem" }}>
          Medium (md Default)
        </span>
        <Tabs items={demoItems} variant="card" size="md" />
      </div>
      <div>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--gy-text-subtle)", display: "block", marginBottom: "0.5rem" }}>
          Large (lg)
        </span>
        <Tabs items={demoItems} variant="button" size="lg" />
      </div>
    </div>
  ),
};

export const FullWidth: Story = {
  args: { items: demoItems, variant: "card", fullWidth: true },
};
