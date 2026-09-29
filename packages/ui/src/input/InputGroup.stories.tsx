import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  InputGroup,
  DropdownGroup,
  type InputGroupVariant,
} from "./InputGroup";
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
    variant: {
      control: "select",
      options: ["default", "filled", "glassmorphic"],
    },
    fullWidth: { control: "boolean" },
    leftAddon: { control: "text" },
    rightAddon: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Website Domain",
    size: "md",
    variant: "default",
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
  render: function Render() {
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

export const FilledDropdownGroup: Story = {
  render: function Render() {
    const [countryCode, setCountryCode] = useState("+91");
    const [phone, setPhone] = useState("");

    return (
      <DropdownGroup
        label="Phone Number (Filled Variant)"
        variant="filled"
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
        helperText="Dropdown and input automatically inherit the filled variant"
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

export const GlassmorphicDropdownGroup: Story = {
  render: function Render() {
    const [currency, setCurrency] = useState("USD");
    const [amount, setAmount] = useState("2500");

    return (
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "2rem",
          borderRadius: "1rem",
        }}
      >
        <DropdownGroup
          label={
            <span style={{ color: "#ffffff", fontWeight: 600 }}>
              Payment Amount (Glassmorphic)
            </span>
          }
          variant="glassmorphic"
          dropdownPosition="right"
          leftAddon={
            <span style={{ color: "#ffffff", fontWeight: 600 }}>$</span>
          }
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
          helperText="Glassmorphic theme adapts both dropdown and inputs"
        >
          <Input
            placeholder="0.00"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ color: "#ffffff" }}
          />
        </DropdownGroup>
      </div>
    );
  },
};

export const InteractiveVariantSwitcher: Story = {
  render: function Render() {
    const [variant, setVariant] = useState<InputGroupVariant>("default");
    const [category, setCategory] = useState("docs");
    const [query, setQuery] = useState("");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span
            style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#64748b" }}
          >
            Select Variant:
          </span>
          {(["default", "filled", "glassmorphic"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setVariant(v)}
              style={{
                padding: "4px 12px",
                borderRadius: "6px",
                border: "1px solid",
                borderColor: variant === v ? "#3b82f6" : "#cbd5e1",
                background: variant === v ? "#3b82f6" : "#ffffff",
                color: variant === v ? "#ffffff" : "#0f172a",
                cursor: "pointer",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "capitalize",
              }}
            >
              {v}
            </button>
          ))}
        </div>

        <div
          style={{
            padding: variant === "glassmorphic" ? "1.5rem" : "0",
            borderRadius: "1rem",
            background:
              variant === "glassmorphic"
                ? "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)"
                : "transparent",
            transition: "all 0.3s ease",
          }}
        >
          <DropdownGroup
            label={`Search Knowledgebase (${variant} variant)`}
            variant={variant}
            dropdownPosition="left"
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
            helperText={`Changing the group's variant automatically updates the Dropdown to "${variant}"`}
          >
            <Input
              placeholder="Search docs, APIs, tokens..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </DropdownGroup>
        </div>
      </div>
    );
  },
};

export const CurrencyAmountDropdownGroup: Story = {
  render: function Render() {
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
  render: function Render() {
    const [category, setCategory] = useState("all");
    const [query, setQuery] = useState("");

    return (
      <DropdownGroup
        label="Search Knowledgebase"
        dropdownPosition="left"
        rightAddon={
          <Button
            size="md"
            variant="primary"
            onClick={() => alert(`Searching: ${query}`)}
          >
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
  render: function Render(args) {
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
