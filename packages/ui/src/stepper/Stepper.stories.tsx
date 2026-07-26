import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "./Stepper";

const meta: Meta<typeof Stepper> = {
  title: "Galyan UI/Stepper",
  component: Stepper,
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
    activeStep: { control: { type: "number", min: 0, max: 2 } },
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Stepper>;
export default meta;
type Story = StoryObj<typeof meta>;

const steps = [
  { id: "account", label: "Account", description: "Create your account" },
  { id: "profile", label: "Profile", description: "Set up your profile" },
  { id: "review", label: "Review", description: "Review and submit" },
];

export const Default: Story = {
  args: {
    activeStep: 1,
    orientation: "horizontal",
    size: "md",
  },
  render: (args) => {
    const [active, setActive] = useState(args.activeStep ?? 1);
    return (
      <div>
        <Stepper
          {...args}
          steps={steps}
          activeStep={active}
          onStepClick={setActive}
        />
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
          <button onClick={() => setActive(Math.max(0, active - 1))}>
            Back
          </button>
          <button
            onClick={() => setActive(Math.min(steps.length - 1, active + 1))}
          >
            Next
          </button>
        </div>
      </div>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    const [active, setActive] = useState(0);
    return (
      <Stepper
        steps={steps}
        activeStep={active}
        orientation="vertical"
        onStepClick={setActive}
      />
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <Stepper steps={steps} activeStep={1} size="sm" />
      <Stepper steps={steps} activeStep={1} size="md" />
      <Stepper steps={steps} activeStep={1} size="lg" />
    </div>
  ),
};
