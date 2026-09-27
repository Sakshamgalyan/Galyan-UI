import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";
import { Button } from "../button/Button";

const meta: Meta<typeof EmptyState> = {
  title: "Galyan UI/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Main heading of the empty state.",
    },
    description: {
      control: "text",
      description: "Subordinate description or helper text.",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size scale (sm for compact charts, md for tables/standard, lg for full views).",
    },
    variant: {
      control: "select",
      options: ["default", "subtle", "card"],
      description: "Visual appearance style.",
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "No data available",
  },
};

export const WithDescription: Story = {
  args: {
    title: "No data available",
    description: "There are no records matching your query at this time.",
    size: "md",
  },
};

export const WithAction: Story = {
  args: {
    title: "No orders found",
    description: "Try adjusting your filters or date range to find transactions.",
    size: "md",
    action: (
      <Button variant="primary" size="sm">
        Create New Order
      </Button>
    ),
  },
};

export const CompactForCharts: Story = {
  args: {
    title: "No data available",
    size: "sm",
    variant: "subtle",
  },
  render: (args) => (
    <div
      style={{
        width: 320,
        height: 200,
        border: "1px dashed var(--gy-border, #e2e8f0)",
        borderRadius: "0.75rem",
        display: "flex",
      }}
    >
      <EmptyState {...args} />
    </div>
  ),
};

export const CardVariant: Story = {
  args: {
    title: "No metrics recorded",
    description: "Telemetry will populate automatically once your service starts receiving traffic.",
    variant: "card",
    size: "md",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "0.5rem" }}>
          Small (for compact charts & widgets):
        </div>
        <div style={{ width: 300, height: 160, border: "1px solid #e2e8f0", borderRadius: "0.75rem" }}>
          <EmptyState size="sm" variant="subtle" title="No data available" />
        </div>
      </div>
      <div>
        <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "0.5rem" }}>
          Medium (default for tables & standard charts):
        </div>
        <div style={{ width: 450, height: 220, border: "1px solid #e2e8f0", borderRadius: "0.75rem" }}>
          <EmptyState
            size="md"
            title="No records found"
            description="Your search criteria did not match any items in the database."
          />
        </div>
      </div>
      <div>
        <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "0.5rem" }}>
          Large (for full-page or section empty views):
        </div>
        <div style={{ width: 600, height: 320, border: "1px solid #e2e8f0", borderRadius: "0.75rem" }}>
          <EmptyState
            size="lg"
            title="No activity recorded yet"
            description="Connect your data source or import a dataset to see analytics in real time."
            action={<Button variant="primary">Connect Data Source</Button>}
          />
        </div>
      </div>
    </div>
  ),
};
