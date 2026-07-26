import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardBody, CardFooter, CardInfo } from "./Card";
import { Button } from "../button/Button";

/**
 * Versatile container for grouping related content and actions.
 */
const meta: Meta<typeof Card> = {
  title: "Galyan UI/Card",
  component: Card,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "elevated", "outlined", "filled"],
    },
    padding: { control: "select", options: ["none", "sm", "md", "lg"] },
    shadow: { control: "select", options: ["none", "sm", "md", "lg"] },
    hoverEffect: {
      control: "select",
      options: ["none", "lift", "glow", "border"],
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "full"],
    },
    border: { control: "boolean" },
    isLoading: { control: "boolean" },
    skeletonLines: { control: "number" },
    bgColor: { control: "color" },
    customPadding: { control: "text" },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    padding: "md",
    shadow: "sm",
    hoverEffect: "none",
    radius: "lg",
    border: true,
    isLoading: false,
    skeletonLines: 3,
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <h3 style={{ margin: 0 }}>Project Overview</h3>
      </CardHeader>
      <CardBody>
        <p style={{ margin: 0, color: "#64748b" }}>
          This card displays essential project details and quick summary
          metrics.
        </p>
      </CardBody>
      <CardFooter>
        <Button size="sm" variant="primary">
          View Project
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const CardInfoMetric: Story = {
  render: () => (
    <Card padding="md" shadow="sm">
      <CardInfo
        title="Monthly Active Users"
        value="48,290"
        trend={{ value: 14.2, label: "vs last month" }}
        footer="Updated 5 mins ago"
      />
    </Card>
  ),
};
