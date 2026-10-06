import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const LockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#10b981"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const meta: Meta<typeof Input> = {
  title: "Galyan UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "Label text above the input" },
    placeholder: { control: "text", description: "Placeholder text" },
    helperText: { control: "text", description: "Helper text below the input" },
    size: {
      control: "radio",
      options: ["xs", "sm", "md", "lg"],
      table: {
        type: { summary: "xs | sm | md | lg" },
        defaultValue: { summary: "md" },
      },
    },
    variant: {
      control: "select",
      options: [
        "default",
        "filled",
        "glass",
        "glassmorphic",
        "focused",
        "error",
        "success",
        "disabled",
      ],
      table: {
        type: {
          summary:
            "default | filled | glass | glassmorphic | focused | error | success | disabled",
        },
        defaultValue: { summary: "default" },
      },
    },
    themeRole: {
      control: "select",
      options: [
        "customer",
        "professional",
        "agent",
        "admin",
        "developer",
        "organization",
        "org-admin",
        "org-member",
      ],
      description: "Scoped role theme override (EasyLife & Samantrix)",
      table: {
        type: {
          summary:
            "'customer' | 'professional' | 'agent' | 'admin' | 'developer' | 'organization' | 'org-admin' | 'org-member'",
        },
      },
    },
    colorMode: {
      control: "radio",
      options: ["light", "dark"],
      description: "Color mode override for the input",
    },
    type: {
      control: "text",
      description: "Input type (text, password, email, etc.)",
    },
    fullWidth: { control: "boolean" },
    required: { control: "boolean" },
    hasError: { control: "boolean" },
    hasSuccess: { control: "boolean" },
    isDisabled: { control: "boolean" },
    isFocused: { control: "boolean" },
    disableBorderEffects: {
      control: "boolean",
      description: "Disables the focus ring and border color change",
    },
    borderRadius: {
      control: "text",
      description: "Custom border radius CSS value",
    },
    clearable: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Custom Icons for Helper Text ─────────────────────────────────────────── */

const QuestionIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const StarIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#f59e0b"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const Default: Story = {
  args: {
    label: "Field label",
    placeholder: "hint placeholder",
    helperText: "Text field in bottom",
  },
};

export const WithDifferentHelperIcons: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Input
        label="Default Info Icon"
        placeholder="hint placeholder"
        helperText="Text field in bottom with default info icon"
      />
      <Input
        label="Help / Question Icon"
        placeholder="Enter billing postal code"
        helperIcon={<QuestionIcon />}
        helperText="Used for tax calculation and verification"
      />
      <Input
        label="Security / Shield Icon"
        placeholder="Enter 2FA backup key"
        helperIcon={<ShieldIcon />}
        helperText="Stored with AES-256 end-to-end encryption"
      />
      <Input
        label="Star / Highlight Icon"
        placeholder="Referral code"
        helperIcon={<StarIcon />}
        helperText="Apply code to get 20% discount on your invoice"
      />
      <Input
        label="Required with Warning Icon"
        placeholder="admin@domain.com"
        required
        helperText="Required field must not be empty"
      />
      <Input
        label="Success with Checkmark Icon"
        placeholder="username_ready"
        hasSuccess
        value="galyan_enterprise"
        helperText="Username is available"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Input
        label="Extra Small (xs - 28px)"
        size="xs"
        placeholder="Extra small input"
      />
      <Input label="Small (sm - 32px)" size="sm" placeholder="Small input" />
      <Input
        label="Medium (md - 40px, Default)"
        size="md"
        placeholder="Medium input"
      />
      <Input label="Large (lg - 48px)" size="lg" placeholder="Large input" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Input label="Default" variant="default" placeholder="Default variant" />
      <Input label="Filled" variant="filled" placeholder="Filled variant" />
      <Input label="Glass" variant="glass" placeholder="Glass variant" />
      <Input
        label="Glassmorphic"
        variant="glassmorphic"
        placeholder="Glassmorphic variant"
      />
      <Input
        label="Focused"
        variant="focused"
        placeholder="Always focused variant"
      />
      <Input
        label="Error"
        variant="error"
        placeholder="Error variant"
        helperText="This field has an error"
      />
      <Input
        label="Success"
        variant="success"
        placeholder="Success variant"
        helperText="Looks good!"
        hasSuccess
      />
      <Input
        label="Disabled"
        variant="disabled"
        placeholder="Disabled variant"
      />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Input
        label="Search"
        placeholder="Search anything…"
        leftIcon={<SearchIcon />}
      />
      <Input
        label="Email"
        placeholder="you@example.com"
        type="email"
        leftIcon={<MailIcon />}
      />
      <Input
        label="Password"
        placeholder="Enter password"
        type="password"
        leftIcon={<LockIcon />}
        rightIcon={<EyeIcon />}
        onRightIconClick={() => alert("Toggle visibility!")}
      />
    </div>
  ),
};

export const ErrorState: Story = {
  args: {
    label: "Email Address",
    value: "invalid-email",
    hasError: true,
    helperText: "Please enter a valid email address.",
    leftIcon: <MailIcon />,
  },
};

export const SuccessState: Story = {
  args: {
    label: "Username",
    value: "available_user",
    hasSuccess: true,
    helperText: "This username is available!",
    rightIcon: <CheckCircleIcon />,
  },
};

export const ClearableDemo: Story = {
  render: function Render() {
    const [val, setVal] = useState("Type to search...");
    return (
      <Input
        label="Search"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        clearable
        onClear={() => setVal("")}
        leftIcon={<SearchIcon />}
      />
    );
  },
};

export const CustomBorderRadius: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Input label="Default Radius" placeholder="Standard corners" />
      <Input
        label="Full Round"
        placeholder="Pill shape"
        borderRadius="9999px"
      />
      <Input label="Sharp Corners" placeholder="No rounding" borderRadius="0" />
      <Input
        label="Extra Round"
        placeholder="1rem radius"
        borderRadius="1rem"
      />
    </div>
  ),
};

export const DisabledBorderEffects: Story = {
  args: {
    label: "No Focus Ring",
    placeholder: "Click me — no ring effect",
    disableBorderEffects: true,
    helperText: "Border effects are disabled on this input",
  },
};

export const RequiredField: Story = {
  args: {
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
    helperText: "This field is required",
  },
};

export const FilledVariant: Story = {
  render: function Render() {
    const [val, setVal] = useState("");
    return (
      <Input
        label="Notes"
        variant="filled"
        placeholder="Start typing here…"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        helperText="This uses the filled style variant"
      />
    );
  },
};

export const GlassAndGlassmorphic: Story = {
  render: () => (
    <div
      style={{
        background: "linear-gradient(135deg, #090d16 0%, #1e1b4b 50%, #312e81 100%)",
        padding: "2rem",
        borderRadius: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        width: "100%",
        maxWidth: 480,
      }}
    >
      <div style={{ marginBottom: "0.25rem" }}>
        <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 600, color: "#ffffff" }}>
          Glass & Glassmorphic Variants
        </h4>
        <p style={{ margin: "0.25rem 0 0", fontSize: "0.8125rem", color: "#94a3b8" }}>
          Translucent frosted background with backdrop filter for digital workplace UI.
        </p>
      </div>
      <Input
        label="Workspace Search (Glass)"
        variant="glass"
        placeholder="Search virtual offices, rooms, or members..."
        leftIcon={<SearchIcon />}
      />
      <Input
        label="API Secret Key (Glassmorphic)"
        variant="glassmorphic"
        placeholder="sam_live_sk_..."
        type="password"
        leftIcon={<LockIcon />}
        helperText="Encrypted and masked on the client"
      />
      <Input
        label="Quick Note (Glass XS)"
        variant="glass"
        size="xs"
        placeholder="Status tag..."
      />
    </div>
  ),
};

export const RoleThemedInputs: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => {
    const rolePresets = [
      {
        name: "Developer (Samantrix)",
        brand: "samantrix",
        role: "developer" as const,
        badge: "#7c5cff",
        desc: "Tailored for telemetry, internal operations, and developer API consoles.",
        placeholder: "ghp_xxxxxxxxxxxxxxxxxxxx",
        label: "GitHub Access Token",
      },
      {
        name: "Org Admin (Samantrix)",
        brand: "samantrix",
        role: "org-admin" as const,
        badge: "#f59e0b",
        desc: "Tenant configuration, user permissions, and custom room settings.",
        placeholder: "Acme Virtual HQ",
        label: "Organization Workspace Name",
      },
      {
        name: "Org Member (Samantrix)",
        brand: "samantrix",
        role: "org-member" as const,
        badge: "#10b981",
        desc: "Everyday virtual office collaboration, status broadcast, and proximity chat.",
        placeholder: "Available for pairing...",
        label: "Avatar Status Note",
      },
      {
        name: "Enterprise Org (Samantrix)",
        brand: "samantrix",
        role: "organization" as const,
        badge: "#4f46e5",
        desc: "Corporate tier tenant billing, contract quotas, and audit logs.",
        placeholder: "billing@acme-corp.com",
        label: "Enterprise Billing Email",
      },
      {
        name: "Customer (EasyLife)",
        brand: "easylife",
        role: "customer" as const,
        badge: "#22c55e",
        desc: "Default consumer role with signature emerald brand accents.",
        placeholder: "alex@example.com",
        label: "Customer Account Email",
      },
      {
        name: "Professional (EasyLife)",
        brand: "easylife",
        role: "professional" as const,
        badge: "#3b82f6",
        desc: "Service provider workflow with high-trust blue accents.",
        placeholder: "PRO-882194",
        label: "Professional License ID",
      },
      {
        name: "Agent (EasyLife)",
        brand: "easylife",
        role: "agent" as const,
        badge: "#f43f5e",
        desc: "Operations dispatcher and live concierge with rose/coral theme.",
        placeholder: "Queue route identifier",
        label: "Dispatch Route ID",
      },
      {
        name: "Admin (EasyLife)",
        brand: "easylife",
        role: "admin" as const,
        badge: "#f59e0b",
        desc: "Platform administration with amber highlight and elevated permissions.",
        placeholder: "System maintenance override",
        label: "Admin Authorization Note",
      },
    ];

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: "1.75rem",
          width: "100%",
          maxWidth: 1100,
        }}
      >
        {rolePresets.map((r) => (
          <div
            key={r.name}
            data-brand={r.brand}
            data-role={r.role}
            data-theme={r.brand === "easylife" ? r.role : r.brand}
            style={{
              padding: "1.25rem",
              borderRadius: "0.875rem",
              border: "1px solid var(--gy-border, #e2e8f0)",
              background: "var(--gy-surface, #ffffff)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.25rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    color: "var(--gy-text, #0f172a)",
                  }}
                >
                  {r.name}
                </span>
                <span
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    padding: "0.15rem 0.5rem",
                    borderRadius: "9999px",
                    background: `${r.badge}18`,
                    color: r.badge,
                    border: `1px solid ${r.badge}33`,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {r.role}
                </span>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.75rem",
                  color: "var(--gy-text-muted, #64748b)",
                  lineHeight: 1.4,
                }}
              >
                {r.desc}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <Input
                label={r.label}
                placeholder={r.placeholder}
                defaultValue=""
                helperText="Focus or type to see role-scoped brand colors & focus ring"
                leftIcon={<SearchIcon />}
                themeRole={r.role}
              />
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const RolePropsDemo: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: "100%", maxWidth: 460 }}>
      <div style={{ marginBottom: "0.25rem" }}>
        <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 600, color: "var(--gy-text)" }}>
          Direct `themeRole` Prop Overrides
        </h4>
        <p style={{ margin: "0.25rem 0 0", fontSize: "0.8125rem", color: "var(--gy-text-muted)" }}>
          Inputs with explicit themeRole props inherit role-specific focus rings and borders independently.
        </p>
      </div>
      <Input
        label="Developer Role (Violet Focus)"
        themeRole="developer"
        placeholder="Developer workspace command..."
        defaultValue="git checkout -b feature/realtime"
        leftIcon={<SearchIcon />}
        helperText="Focus ring uses Samantrix developer violet token"
      />
      <Input
        label="Org Admin Role (Amber Accent)"
        themeRole="org-admin"
        placeholder="Admin policy setting..."
        helperText="Focus ring uses org-admin role override"
      />
      <Input
        label="Org Member Role (Emerald Accent)"
        themeRole="org-member"
        placeholder="Member status..."
        helperText="Focus ring uses org-member presence green token"
      />
      <Input
        label="Professional Role (Blue Focus)"
        themeRole="professional"
        placeholder="Professional credential ID..."
        helperText="Focus ring uses professional role override"
      />
      <Input
        label="Agent Role (Rose Focus)"
        themeRole="agent"
        placeholder="Support ticket note..."
        helperText="Focus ring uses agent role override"
      />
    </div>
  ),
};

export const SamantrixWorkplaceInputs: Story = {
  render: () => (
    <div
      data-brand="samantrix"
      data-theme="samantrix"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        padding: "1.5rem",
        borderRadius: "0.75rem",
        background: "var(--gy-surface, #ffffff)",
        border: "1px solid var(--gy-border, #e2e8f0)",
        width: "100%",
        maxWidth: 480,
      }}
    >
      <div style={{ marginBottom: "0.25rem" }}>
        <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 600, color: "var(--gy-text)" }}>
          Samantrix Digital Workplace
        </h4>
        <p style={{ margin: "0.25rem 0 0", fontSize: "0.8125rem", color: "var(--gy-text-muted)" }}>
          Configured with Samantrix brand design tokens and role-specific workflows.
        </p>
      </div>

      <Input
        label="Console Command Input"
        size="xs"
        themeRole="developer"
        placeholder="pnpm dev --filter @galyan/ui"
        helperText="Extra compact input for internal tooling and telemetry"
      />

      <Input
        label="Virtual Office Room Name"
        size="sm"
        themeRole="org-admin"
        placeholder="e.g. Design Studio Alpha"
        helperText="Configurable room label in virtual 3D floor plan"
      />

      <Input
        label="Proximity Voice Status"
        size="md"
        themeRole="org-member"
        placeholder="Available for pair programming"
        leftIcon={<CheckCircleIcon />}
        helperText="Live presence indicator in digital workplace"
      />

      <Input
        label="Glassmorphic Dock Search"
        size="lg"
        variant="glassmorphic"
        themeRole="org-member"
        placeholder="Search colleagues, rooms, documents..."
        leftIcon={<SearchIcon />}
      />
    </div>
  ),
};
