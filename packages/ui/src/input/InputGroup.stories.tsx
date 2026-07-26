import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InputGroup, DropdownGroup } from "./InputGroup";
import { Input } from "./Input";
import { Button } from "../button/Button";
import { Dropdown } from "../dropdown/Dropdown";

/**
 * Combine input controls seamlessly with left/right text addons, buttons, or dropdown selects.
 */
const meta: Meta<typeof InputGroup> = {
  title: "Galyan UI/InputGroup",
  component: InputGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    fullWidth: { control: "boolean" },
    leftAddon: { control: "text" },
    rightAddon: { control: "text" },
  },
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Website Domain",
    size: "md",
    fullWidth: true,
    leftAddon: "https://",
    rightAddon: ".com",
    helperText: "Enter your custom subdomain",
  },
  render: (args) => (
    <InputGroup {...args}>
      <Input placeholder="my-domain" />
    </InputGroup>
  ),
};

export const WithButtonAddon: Story = {
  args: {
    label: "Newsletter Subscription",
    size: "md",
    fullWidth: true,
  },
  render: (args) => {
    const [email, setEmail] = useState("");
    return (
      <InputGroup
        {...args}
        rightAddon={
          <Button
            variant="primary"
            onClick={() => alert(`Subscribed ${email}`)}
          >
            Subscribe
          </Button>
        }
      >
        <Input
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputGroup>
    );
  },
};

export const DropdownGroupLeft: Story = {
  render: () => {
    const [proto, setProto] = useState("https://");
    return (
      <DropdownGroup
        label="Server Address"
        dropdownPosition="left"
        dropdown={
          <Dropdown
            options={[
              { value: "https://", label: "https://" },
              { value: "http://", label: "http://" },
              { value: "ftp://", label: "ftp://" },
            ]}
            value={proto}
            onChange={setProto}
          />
        }
      >
        <Input placeholder="api.example.com/v1" />
      </DropdownGroup>
    );
  },
};

export const DropdownGroupRight: Story = {
  render: () => {
    const [currency, setCurrency] = useState("USD");
    return (
      <DropdownGroup
        label="Pricing Plan"
        dropdownPosition="right"
        leftAddon="$"
        dropdown={
          <Dropdown
            options={[
              { value: "USD", label: "USD" },
              { value: "EUR", label: "EUR" },
              { value: "GBP", label: "GBP" },
            ]}
            value={currency}
            onChange={setCurrency}
          />
        }
      >
        <Input placeholder="99.00" type="number" />
      </DropdownGroup>
    );
  },
};

export const ErrorState: Story = {
  render: () => (
    <InputGroup
      label="Repository URL"
      leftAddon="git@github.com:"
      rightAddon=".git"
      hasError
      required
      helperText="Repository name cannot contain special characters"
    >
      <Input placeholder="username/repo" hasError />
    </InputGroup>
  ),
};
