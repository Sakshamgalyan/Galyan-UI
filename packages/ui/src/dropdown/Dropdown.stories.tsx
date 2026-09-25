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
    variant: { control: "inline-radio", options: ["default", "filled", "glassmorphic"] },
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

const defaultOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4 (Disabled)", disabled: true },
];

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
    placeholder: "Select an option",
    options: defaultOptions,
    size: "md",
    clearable: false,
    searchable: false,
    disabled: false,
    required: false,
    multiple: false,
  },
  render: (args) => {
    const [val, setVal] = useState("");
    return <Dropdown {...args} value={val} onChange={setVal} />;
  },
};

export const FilledVariant: Story = {
  args: {
    label: "Filled Dropdown",
    placeholder: "Select an option",
    variant: "filled",
    options: demoOptions,
    size: "md",
    clearable: true,
  },
  render: (args) => {
    const [val, setVal] = useState("");
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
          placeholder={
            isLoading ? "Fetching data from API..." : "Choose repository"
          }
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

const frameworkOptions = [
  { value: "react", label: "React.js", group: "FRONTEND" },
  { value: "vue", label: "Vue.js", group: "FRONTEND" },
  { value: "angular", label: "Angular", group: "FRONTEND" },
  { value: "node", label: "Node.js", group: "BACKEND" },
  { value: "python", label: "Python", group: "BACKEND" },
  { value: "go", label: "Go", group: "BACKEND" },
];

const languageOptions = [
  { value: "javascript", label: "JavaScript", description: "Programming Language" },
  { value: "typescript", label: "TypeScript", description: "Programming Language" },
  { value: "react", label: "React", description: "UI Library" },
  { value: "vue", label: "Vue", description: "Progressive Framework" },
  { value: "angular", label: "Angular", description: "Web Framework" },
  { value: "node", label: "Node.js", description: "JavaScript Runtime" },
  { value: "python", label: "Python", description: "Programming Language" },
  { value: "go", label: "Go", description: "Programming Language" },
];

export const SelectAllStatesDemo: Story = {
  args: {
    label: "Select All States Demo",
    options: languageOptions,
    multiple: true,
    showSelectAll: true,
    searchable: true,
    searchPlaceholder: "Search...",
    clearable: true,
  },
  render: (args) => {
    const [val, setVal] = useState<string[]>(["javascript", "react"]);
    return <Dropdown {...args} value={val} onChange={setVal} />;
  },
};

export const MultiSelectWithSelectAll: Story = {
  args: {
    label: "Select Frameworks",
    options: frameworkOptions,
    groupBy: "group",
    multiple: true,
    showSelectAll: true,
    searchable: true,
    searchPlaceholder: "Search...",
    clearable: true,
  },
  render: (args) => {
    const [val, setVal] = useState<string[]>(["react", "angular", "node"]);
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

const foodOptions = [
  { value: "apple", label: "Apple", group: "FRUITS" },
  { value: "banana", label: "Banana", group: "FRUITS" },
  { value: "orange", label: "Orange", group: "FRUITS" },
  { value: "carrot", label: "Carrot", group: "VEGETABLES" },
  { value: "broccoli", label: "Broccoli", group: "VEGETABLES" },
  { value: "spinach", label: "Spinach", group: "VEGETABLES" },
];

export const FoodItemsMultiSelect: Story = {
  args: {
    placeholder: "Select food items",
    options: foodOptions,
    groupBy: "group",
    multiple: true,
    showSelectAll: true,
    searchable: true,
    searchPlaceholder: "Search...",
    clearable: true,
  },
  render: (args) => {
    const [val, setVal] = useState<string[]>([]);
    return <Dropdown {...args} value={val} onChange={setVal} />;
  },
};

export const CategorizedSearchable: Story = {
  args: {
    label: "Categorized Searchable Dropdown",
    placeholder: "Select option",
    options: frameworkOptions,
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

export const WithIcons: Story = {
  render: () => {
    const [val, setVal] = useState("database");
    const serviceOptions = [
      {
        value: "database",
        label: "PostgreSQL Database",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5V19A9 3 0 0 0 21 19V5" />
            <path d="M3 12A9 3 0 0 0 21 12" />
          </svg>
        ),
      },
      {
        value: "cloud",
        label: "AWS Cloud Storage",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          </svg>
        ),
      },
      {
        value: "server",
        label: "Kubernetes Cluster",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
            <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
            <line x1="6" x2="6.01" y1="6" y2="6" />
            <line x1="6" x2="6.01" y1="18" y2="18" />
          </svg>
        ),
      },
      {
        value: "security",
        label: "OAuth2 & SSO Gateway",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          </svg>
        ),
      },
    ];

    return (
      <Dropdown
        label="Infrastructure Service"
        leftIcon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
          </svg>
        }
        options={serviceOptions}
        value={val}
        onChange={setVal}
        helperText="Select a target cloud backend service"
      />
    );
  },
};

export const CustomUserProfilePicker: Story = {
  render: () => {
    const [user, setUser] = useState("alex");
    const users = [
      {
        value: "alex",
        label: "Alex Rivera",
        email: "alex.rivera@samantrix.io",
        role: "Lead Architect",
        color: "#6366F1",
      },
      {
        value: "sarah",
        label: "Sarah Chen",
        email: "sarah.chen@samantrix.io",
        role: "Product Design Lead",
        color: "#EC4899",
      },
      {
        value: "marcus",
        label: "Marcus Vance",
        email: "marcus.v@samantrix.io",
        role: "DevOps Engineer",
        color: "#22C55E",
      },
      {
        value: "elena",
        label: "Elena Rostova",
        email: "elena.r@samantrix.io",
        role: "Security Specialist",
        color: "#F59E0B",
      },
    ];

    return (
      <Dropdown
        label="Assign Reviewer"
        searchable
        searchPlaceholder="Search team member..."
        options={users}
        value={user}
        onChange={setUser}
        renderOption={(opt: any) => (
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", width: "100%" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: opt.color,
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                fontSize: "0.75rem",
                flexShrink: 0,
              }}
            >
              {opt.label.charAt(0)}
            </div>
            <div style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
              <span style={{ fontWeight: 500, fontSize: "0.875rem", color: "var(--gy-text)" }}>{opt.label}</span>
              <span style={{ fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>{opt.role} • {opt.email}</span>
            </div>
          </div>
        )}
        renderValue={(selectedVal) => {
          const u = users.find((item) => item.value === selectedVal);
          if (!u) return <span>Select reviewer</span>;
          return (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: u.color,
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                  fontSize: "0.6875rem",
                }}
              >
                {u.label.charAt(0)}
              </div>
              <span>{u.label}</span>
              <span style={{ fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>({u.role})</span>
            </div>
          );
        }}
      />
    );
  },
};

export const PriorityStatusPicker: Story = {
  render: () => {
    const [priority, setPriority] = useState("high");
    const priorityOptions = [
      { value: "critical", label: "P0 - Critical Blocker", color: "#EF4444" },
      { value: "high", label: "P1 - High Priority", color: "#F97316" },
      { value: "medium", label: "P2 - Medium", color: "#EAB308" },
      { value: "low", label: "P3 - Low", color: "#22C55E" },
    ];

    return (
      <Dropdown
        label="Ticket Severity"
        options={priorityOptions}
        value={priority}
        onChange={setPriority}
        renderOption={(opt: any) => (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: opt.color,
                boxShadow: `0 0 6px ${opt.color}`,
              }}
            />
            <span style={{ fontWeight: 500 }}>{opt.label}</span>
          </div>
        )}
        renderValue={(val) => {
          const opt = priorityOptions.find((o) => o.value === val);
          return (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: opt?.color,
                }}
              />
              <span>{opt?.label}</span>
            </div>
          );
        }}
      />
    );
  },
};

export const SuccessState: Story = {
  render: () => (
    <Dropdown
      label="Validated Database Connection"
      hasSuccess
      options={demoOptions}
      value="node"
      helperText="Verified and connected to remote cluster"
    />
  ),
};

export const TopPlacement: Story = {
  render: () => {
    const [val, setVal] = useState("");
    const countriesWithSubtitles = [
      { value: "us", label: "United States", description: "North America" },
      { value: "ca", label: "Canada", description: "North America" },
      { value: "uk", label: "United Kingdom", description: "Europe" },
      { value: "fr", label: "France", description: "Europe" },
      { value: "de", label: "Germany", description: "Europe" },
      { value: "jp", label: "Japan", description: "Asia" },
    ];

    return (
      <div style={{ paddingTop: "260px" }}>
        <Dropdown
          placeholder="Search countries..."
          searchable
          searchPlaceholder="Search..."
          placement="top"
          options={countriesWithSubtitles}
          value={val}
          onChange={setVal}
        />
      </div>
    );
  },
};

export const DarkModeShowcase: Story = {
  render: () => {
    const [val, setVal] = useState("react");
    const [tags, setTags] = useState(["react", "node", "python"]);

    return (
      <div
        style={{
          padding: "2rem",
          background: "#0f172a",
          borderRadius: "1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          width: 380,
          boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
        }}
        data-color-mode="dark"
      >
        <div style={{ textAlign: "center" }}>
          <h4 style={{ margin: "0 0 0.25rem", color: "#f8fafc", fontSize: "1rem", fontWeight: 600 }}>
            Dark Mode Dropdown
          </h4>
          <span style={{ fontSize: "0.8125rem", color: "#94a3b8" }}>
            Luminous dark styling with filled hover highlights
          </span>
        </div>

        <Dropdown
          label="Single Select (Dark)"
          options={demoOptions}
          value={val}
          onChange={setVal}
          searchable
          clearable
        />

        <Dropdown
          label="Multi-Select Tags (Dark)"
          options={demoOptions}
          value={tags}
          onChange={setTags}
          multiple
          showSelectAll
          clearable
        />
      </div>
    );
  },
};

export const Glassmorphic: Story = {
  render: function Render() {
    const [val, setVal] = useState<string>("react");
    const [tags, setTags] = useState<string[]>(["react", "node"]);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          padding: "2rem",
          background: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #8b5cf6 100%)",
          borderRadius: "1.25rem",
          boxShadow: "0 20px 40px -10px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h4 style={{ margin: "0 0 0.25rem", color: "#ffffff", fontSize: "1rem", fontWeight: 600 }}>
            Glassmorphic Dropdown
          </h4>
          <span style={{ fontSize: "0.8125rem", color: "rgba(255, 255, 255, 0.85)" }}>
            Frosted translucent trigger and floating popover menu
          </span>
        </div>

        <Dropdown
          label="Glassmorphic Single Select"
          variant="glassmorphic"
          options={demoOptions}
          value={val}
          onChange={setVal}
          searchable
          clearable
        />

        <Dropdown
          label="Glassmorphic Multi-Select"
          variant="glassmorphic"
          options={demoOptions}
          value={tags}
          onChange={setTags}
          multiple
          showSelectAll
          clearable
        />
      </div>
    );
  },
};


