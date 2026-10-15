import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SimantrixLogo } from "./Logo";
import { SimantrixMark } from "./Mark";

const meta: Meta<typeof SimantrixLogo> = {
  title: "Brand/SimantrixLogo",
  component: SimantrixLogo,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#07090e" },
        { name: "light", value: "#f8fafc" },
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    layout: {
      control: "select",
      options: ["horizontal", "stacked", "mark", "wordmark"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
    },
    colorMode: {
      control: "select",
      options: ["dark", "light", "transparent", "auto"],
    },
    markStyle: {
      control: "select",
      options: ["vector", "3d"],
    },
    withTagline: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SimantrixLogo>;

export const Default: Story = {
  args: {
    layout: "horizontal",
    size: "md",
    colorMode: "dark",
  },
};

export const StackedAuth: Story = {
  args: {
    layout: "stacked",
    size: "xl",
    colorMode: "dark",
    withTagline: true,
  },
};

export const MarkOnly: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <SimantrixMark size="sm" />
      <SimantrixMark size="md" />
      <SimantrixMark size="lg" />
      <SimantrixMark size="xl" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <SimantrixLogo size="xs" layout="horizontal" />
      <SimantrixLogo size="sm" layout="horizontal" />
      <SimantrixLogo size="md" layout="horizontal" />
      <SimantrixLogo size="lg" layout="horizontal" />
      <SimantrixLogo size="xl" layout="horizontal" />
    </div>
  ),
};

export const LightTheme: Story = {
  parameters: {
    backgrounds: { default: "light" },
  },
  args: {
    layout: "horizontal",
    size: "lg",
    colorMode: "light",
  },
};
