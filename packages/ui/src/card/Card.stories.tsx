import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardBody, CardFooter, CardInfo } from "./Card";
import { Button } from "../button/Button";
import { Chip } from "../chips/Chips";

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
      <div style={{ width: 440, padding: "1rem" }}>
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
    radius: "xl",
    border: true,
    isLoading: false,
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0, fontSize: "1.125rem" }}>Project Overview</h3>
          <Chip size="sm" variant="success">Active</Chip>
        </div>
      </CardHeader>
      <CardBody>
        <p style={{ margin: "0 0 1rem", color: "var(--gy-text-muted)", fontSize: "0.875rem", lineHeight: 1.6 }}>
          This card displays essential project details, timeline milestones, and quick team summaries.
        </p>
      </CardBody>
      <CardFooter>
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
          <Button size="sm" variant="ghost">Dismiss</Button>
          <Button size="sm" variant="primary">View Details</Button>
        </div>
      </CardFooter>
    </Card>
  ),
};

export const InteractiveHoverCard: Story = {
  render: () => (
    <Card
      variant="elevated"
      hoverEffect="lift"
      padding="md"
      onClick={() => alert("Card clicked!")}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "0.75rem",
            background: "color-mix(in srgb, var(--gy-primary) 15%, transparent)",
            color: "var(--gy-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "1.25rem",
            flexShrink: 0,
          }}
        >
          ⚡
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: "0 0 0.25rem", fontSize: "1rem" }}>Interactive Workflow</h4>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--gy-text-muted)" }}>
            Hover over this card to preview the subtle 3D lift, border highlight, and elevation shadow.
          </p>
        </div>
      </div>
    </Card>
  ),
};

export const PricingCard: Story = {
  render: () => (
    <Card variant="elevated" padding="lg" shadow="md" hoverEffect="lift">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
        <h3 style={{ margin: 0, fontSize: "1.25rem" }}>Professional</h3>
        <Chip variant="solid" size="sm">POPULAR</Chip>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", margin: "1rem 0" }}>
        <span style={{ fontSize: "2.25rem", fontWeight: "800" }}>$29</span>
        <span style={{ color: "var(--gy-text-muted)", fontSize: "0.875rem" }}>/ user / month</span>
      </div>
      <p style={{ color: "var(--gy-text-muted)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
        Ideal for growing engineering teams needing advanced theming and zero-latency UI components.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.75rem", fontSize: "0.875rem" }}>
        <div>✓ Unlimited multi-brand roles</div>
        <div>✓ Dark mode & custom color engine</div>
        <div>✓ Storybook docs & Figma sync</div>
      </div>
      <Button fullWidth variant="primary" size="md">
        Get Started
      </Button>
    </Card>
  ),
};

export const CardInfoMetric: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Card padding="md" shadow="sm" hoverEffect="lift">
        <CardInfo
          title="Monthly Active Users"
          value="48,290"
          trend={{ value: 14.2, label: "vs last month" }}
          footer="Updated 5 mins ago"
        />
      </Card>

      <Card padding="md" shadow="sm" hoverEffect="lift">
        <CardInfo
          title="Server Error Rate"
          value="0.04%"
          trend={{ value: -42.8, label: "reduction" }}
          footer="All systems operating normally"
        />
      </Card>
    </div>
  ),
};

export const LoadingSkeletonCard: Story = {
  args: {
    isLoading: true,
    padding: "md",
    skeletonLines: 3,
  },
};
