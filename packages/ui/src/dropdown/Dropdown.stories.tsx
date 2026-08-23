import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./Dropdown";
import { Button } from "../button/Button";

/**
 * Feature-rich select dropdown supporting search, multi-selection, select-all, grouping, async loading states, custom option rendering, and portal popovers.
 */
const meta: Meta<typeof Dropdown> = {
  title: "Galyan UI/Dropdown",
  component: Dropdown,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 380, minHeight: 340, padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    multiple: { control: "boolean" },
    searchable: { control: "boolean" },
    searchPlaceholder: { control: "text" },
    clearable: { control: "boolean" },
    loading: { control: "boolean" },
    hasError: { control: "boolean" },
    hasSuccess: { control: "boolean" },
    showSelectAll: { control: "boolean" },
    maxTagCount: { control: "number" },
    placement: { control: "inline-radio", options: ["top", "bottom"] },
    align: { control: "inline-radio", options: ["left", "right"] },
    dropdownWidth: { control: "text" },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const demoOptions = [
  { value: "react", label: "React.js", group: "Frontend" },
  { value: "vue", label: "Vue.js", group: "Frontend" },
  { value: "angular", label: "Angular", group: "Frontend" },
  { value: "node", label: "Node.js", group: "Backend" },
  { value: "python", label: "Python (FastAPI)", group: "Backend" },
  { value: "go", label: "Go (Golang)", group: "Backend" },
];

export const Default: Story = {
  args: {
    label: "Select Tech Stack",
    placeholder: "Select an option",
    options: demoOptions,
    size: "md",
    clearable: true,
    searchable: false,
    disabled: false,
    required: false,
    multiple: false,
  },
  render: (args) => {
    const [val, setVal] = useState("react");
    return <Dropdown {...args} value={val} onChange={setVal} />;
  },
};

export const AsyncLoadingShowcase: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true);
    const [val, setVal] = useState("");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setIsLoading((prev) => !prev)}
          >
            Toggle Loading State ({isLoading ? "Loading ON" : "Loading OFF"})
          </Button>
        </div>
        <Dropdown
          label="Server Repositories (Async)"
          loading={isLoading}
          placeholder={isLoading ? "Fetching data from API..." : "Choose repository"}
          options={isLoading ? [] : demoOptions}
          value={val}
          onChange={setVal}
          helperText={
            isLoading
              ? "Loading spinner active with wait cursor"
              : "Data resolved successfully"
          }
        />
      </div>
    );
  },
};

export const MultiSelectWithSelectAll: Story = {
  args: {
    label: "Select Frameworks",
    options: demoOptions,
    multiple: true,
    showSelectAll: true,
    searchable: true,
    clearable: true,
  },
  render: (args) => {
    const [val, setVal] = useState<string[]>(["react", "node"]);
    return <Dropdown {...args} value={val} onChange={setVal} />;
  },
};

export const MultiSelectWithTagRemoval: Story = {
  args: {
    label: "Selected Technologies (Click × on tag to remove)",
    options: demoOptions,
    multiple: true,
    clearable: true,
    maxTagCount: 3,
  },
  render: (args) => {
    const [val, setVal] = useState<string[]>([
      "react",
      "vue",
      "node",
      "python",
    ]);
    return <Dropdown {...args} value={val} onChange={setVal} />;
  },
};

export const CountryLanguagePicker: Story = {
  render: () => {
    const [country, setCountry] = useState("us");
    const countries = [
      { value: "us", label: "🇺🇸 United States (USD)", group: "Americas" },
      { value: "ca", label: "🇨🇦 Canada (CAD)", group: "Americas" },
      { value: "uk", label: "🇬🇧 United Kingdom (GBP)", group: "Europe" },
      { value: "de", label: "🇩🇪 Germany (EUR)", group: "Europe" },
      { value: "jp", label: "🇯🇵 Japan (JPY)", group: "Asia" },
      { value: "in", label: "🇮🇳 India (INR)", group: "Asia" },
    ];

    return (
      <Dropdown
        label="Billing Region"
        searchable
        searchPlaceholder="Search country or currency..."
        groupBy="group"
        options={countries}
        value={country}
        onChange={setCountry}
        helperText="Tax and currency rates adjust automatically"
      />
    );
  },
};

export const SearchableAndGrouped: Story = {
  args: {
    label: "Categorized Searchable Dropdown",
    options: demoOptions,
    searchable: true,
    searchPlaceholder: "Search frameworks or languages...",
    groupBy: "group",
    clearable: true,
  },
  render: (args) => {
    const [val, setVal] = useState("");
    return <Dropdown {...args} value={val} onChange={setVal} />;
  },
};

export const SizesShowcase: Story = {
  render: () => {
    const [v1, setV1] = useState("react");
    const [v2, setV2] = useState("node");
    const [v3, setV3] = useState("python");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <Dropdown
          size="sm"
          label="Small Dropdown (32px)"
          options={demoOptions}
          value={v1}
          onChange={setV1}
        />
        <Dropdown
          size="md"
          label="Medium Dropdown (40px Default)"
          options={demoOptions}
          value={v2}
          onChange={setV2}
        />
        <Dropdown
          size="lg"
          label="Large Dropdown (48px)"
          options={demoOptions}
          value={v3}
          onChange={setV3}
        />
      </div>
    );
  },
};

export const DisabledAndErrorStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Dropdown
        label="Disabled Dropdown"
        placeholder="Cannot interact"
        disabled
        options={demoOptions}
        value="react"
      />
      <Dropdown
        label="Required Field with Validation Error"
        options={demoOptions}
        hasError
        error="Please choose a valid framework option"
        required
      />
    </div>
  ),
};
