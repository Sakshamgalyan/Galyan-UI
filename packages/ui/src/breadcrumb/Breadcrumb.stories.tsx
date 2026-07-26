import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";

/**
 * Navigation aid showing hierarchical location path.
 */
const meta: Meta<typeof Breadcrumb> = {
  title: "Galyan UI/Breadcrumb",
  component: Breadcrumb,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 600 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: { control: "select", options: ["default", "subtle", "ghost"] },
    showBackButton: { control: "boolean" },
    maxItems: { control: "number" },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

const demoItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Electronics", href: "/products/electronics" },
  { label: "Smartphones" },
];

export const Default: Story = {
  args: {
    items: demoItems,
    size: "md",
    variant: "default",
    showBackButton: false,
  },
};

export const WithBackButton: Story = {
  args: {
    items: demoItems,
    showBackButton: true,
    size: "md",
    variant: "default",
  },
};
