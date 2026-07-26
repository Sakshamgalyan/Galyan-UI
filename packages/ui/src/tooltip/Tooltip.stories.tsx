import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { Button } from "../button/Button";
import React from "react";

const meta: Meta<typeof Tooltip> = {
  title: "Galyan UI/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Tooltip popup positioning relative to target",
      table: {
        type: { summary: "'top' | 'bottom' | 'left' | 'right'" },
        defaultValue: { summary: "'top'" },
      },
    },
    delay: {
      control: "number",
      description: "Delay in milliseconds before showing tooltip on hover",
    },
    width: {
      control: "text",
      description: "Custom max width for the tooltip container",
    },
    content: {
      control: "text",
      description: "Content inside the tooltip popup",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: "Helpful tooltip information",
    position: "top",
    delay: 150,
  },
};

export const WithCustomTarget: Story = {
  args: {
    content: "Clicking or hovering this button shows additional context",
    position: "top",
    children: <Button variant="primary">Hover Me</Button>,
  },
};

export const Positions: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "1.5rem",
        justifyContent: "center",
        padding: "3rem 1rem",
      }}
    >
      <Tooltip content="Tooltip on top" position="top">
        <Button variant="secondary">Hover Top</Button>
      </Tooltip>
      <Tooltip content="Tooltip on bottom" position="bottom">
        <Button variant="secondary">Hover Bottom</Button>
      </Tooltip>
      <Tooltip content="Tooltip on left" position="left">
        <Button variant="secondary">Hover Left</Button>
      </Tooltip>
      <Tooltip content="Tooltip on right" position="right">
        <Button variant="secondary">Hover Right</Button>
      </Tooltip>
    </div>
  ),
};

export const StandaloneWithoutChildren: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "2rem",
      }}
    >
      <span>Feature info</span>
      <Tooltip
        content="Standalone tooltip without children prop!"
        position="right"
      />
    </div>
  ),
};
