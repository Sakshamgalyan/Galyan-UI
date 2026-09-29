import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";
import React from "react";

const meta: Meta<typeof Spinner> = {
  title: "Galyan UI/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Spinner size preset",
      table: {
        type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: "'md'" },
      },
    },
    color: {
      control: "select",
      options: ["default", "role", "primary", "neutral", "white"],
      description: "Spinner stroke color theme (default uses active role base theme color)",
      table: {
        type: { summary: "'default' | 'role' | 'primary' | 'neutral' | 'white'" },
        defaultValue: { summary: "'default'" },
      },
    },
    label: {
      control: "text",
      description: "Optional loading text label next to spinner",
      table: { type: { summary: "string" } },
    },
    className: {
      control: "text",
      description: "Additional CSS class names for custom styling override",
      table: { type: { summary: "string" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: "md",
    color: "default",
  },
};

export const WithLabel: Story = {
  args: {
    size: "md",
    color: "default",
    label: "Loading workspace details...",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
      <Spinner color="default" label="Default (Role Theme)" />
      <Spinner color="neutral" label="Neutral" />
      <div
        style={{
          background: "#0f172a",
          padding: "1rem",
          borderRadius: "0.5rem",
        }}
      >
        <Spinner color="white" label="White" />
      </div>
    </div>
  ),
};
