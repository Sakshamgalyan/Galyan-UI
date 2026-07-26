import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { StepTab } from "./StepTab";

const meta: Meta<typeof StepTab> = {
  title: "Galyan UI/StepTab",
  component: StepTab,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 680 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    header: { control: "text" },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof StepTab>;
export default meta;
type Story = StoryObj<typeof meta>;

const timelineItems = [
  {
    id: "step1",
    title: "Received order creation request",
    timestamp: "05:15:20 AM (IST)",
    description: "Order creation payload received and validated.",
  },
  {
    id: "step2",
    title: "Reviewed transaction parameters",
    timestamp: "05:15:23 AM (IST)",
    description: "Transaction risk evaluation completed with score 0.02.",
  },
  {
    id: "step3",
    title: "Cashier loaded",
    timestamp: "05:15:23 AM (IST)",
    description: "Payment iframe initialized for customer checkout.",
  },
  {
    id: "step4",
    title: "Received customer payment method details",
    timestamp: "05:15:23 AM (IST)",
    details: [
      { label: "Payment method", value: "Credit card" },
      { label: "Card network", value: "VISA" },
      { label: "Issuing bank", value: "HDFC Bank" },
      { label: "Expiry date", value: "12/27" },
      { label: "Masked card number", value: "************2761" },
    ],
  },
  {
    id: "step5",
    title: "Checking rule engine for a match",
    timestamp: "05:15:23 AM (IST)",
    description:
      "Checking whether there’s any smart routing rule that matches the transaction parameters.",
  },
];

export const Default: Story = {
  args: {
    header: "Timeline",
    size: "md",
  },
  render: (args) => {
    const [active, setActive] = useState("step4");
    return (
      <StepTab
        {...args}
        items={timelineItems}
        activeId={active}
        onStepChange={setActive}
      />
    );
  },
};
