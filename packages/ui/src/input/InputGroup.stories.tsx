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
      <div style={{ width: 480, padding: "1rem" }}>
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

export const PhoneCodeDropdownGroup: Story = {
  render: () => {
    const [countryCode, setCountryCode] = useState("+1");
    const [phone, setPhone] = useState("");

    return (
      <DropdownGroup
        label="Phone Number"
        dropdownPosition="left"
        dropdown={
          <Dropdown
            options={[
              { value: "+1", label: "🇺🇸 +1" },
              { value: "+44", label: "🇬🇧 +44" },
              { value: "+91", label: "🇮🇳 +91" },
              { value: "+49", label: "🇩🇪 +49" },
            ]}
            value={countryCode}
            onChange={setCountryCode}
          />
        }
        helperText="Select your country calling code"
      >
        <Input
          placeholder="(555) 000-0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </DropdownGroup>
    );
  },
};

export const CurrencyAmountDropdownGroup: Story = {
  render: () => {
    const [currency, setCurrency] = useState("USD");
    const [amount, setAmount] = useState("1500");

    return (
      <DropdownGroup
        label="Payment Amount"
        dropdownPosition="right"
        leftAddon="$"
        dropdown={
          <Dropdown
            options={[
              { value: "USD", label: "USD" },
              { value: "EUR", label: "EUR" },
              { value: "GBP", label: "GBP" },
              { value: "JPY", label: "JPY" },
              { value: "INR", label: "INR" },
            ]}
            value={currency}
            onChange={setCurrency}
          />
        }
        helperText="Enter transaction total and billing currency"
      >
        <Input
          placeholder="0.00"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </DropdownGroup>
    );
  },
};

export const SearchCategoryDropdownGroup: Story = {
  render: () => {
    const [category, setCategory] = useState("all");
    const [query, setQuery] = useState("");

    return (
      <DropdownGroup
        label="Search Knowledgebase"
        dropdownPosition="left"
        rightAddon={
          <Button size="md" variant="primary" onClick={() => alert(`Searching: ${query}`)}>
            Search
          </Button>
        }
        dropdown={
          <Dropdown
            options={[
              { value: "all", label: "All Items" },
              { value: "docs", label: "Documentation" },
              { value: "components", label: "Components" },
              { value: "articles", label: "Articles" },
            ]}
            value={category}
            onChange={setCategory}
          />
        }
      >
        <Input
          placeholder="Search docs, APIs, tokens..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </DropdownGroup>
    );
  },
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
