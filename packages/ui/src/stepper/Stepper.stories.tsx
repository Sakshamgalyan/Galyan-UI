import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "./Stepper";
import { Button } from "../button/Button";

const UserIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CreditCardIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const meta: Meta<typeof Stepper> = {
  title: "Galyan UI/Stepper",
  component: Stepper,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 700, padding: "1rem" }}>
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
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <Stepper
          {...args}
          steps={steps}
          activeStep={active}
          onStepClick={setActive}
        />
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Button
            size="sm"
            variant="secondary"
            disabled={active === 0}
            onClick={() => setActive(Math.max(0, active - 1))}
          >
            Back
          </Button>
          <Button
            size="sm"
            variant="primary"
            disabled={active === steps.length - 1}
            onClick={() => setActive(Math.min(steps.length - 1, active + 1))}
          >
            Next Step
          </Button>
        </div>
      </div>
    );
  },
};

export const WithCustomIcons: Story = {
  render: () => {
    const [active, setActive] = useState(1);
    const iconSteps = [
      {
        id: "user",
        label: "Personal Info",
        description: "Name & email",
        icon: <UserIcon />,
      },
      {
        id: "billing",
        label: "Billing Method",
        description: "Credit card / PayPal",
        icon: <CreditCardIcon />,
      },
      {
        id: "security",
        label: "2FA Verification",
        description: "Secure your account",
        icon: <ShieldCheckIcon />,
      },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <Stepper
          steps={iconSteps}
          activeStep={active}
          onStepClick={setActive}
        />
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Button
            size="sm"
            variant="secondary"
            disabled={active === 0}
            onClick={() => setActive(Math.max(0, active - 1))}
          >
            Previous
          </Button>
          <Button
            size="sm"
            variant="primary"
            disabled={active === iconSteps.length - 1}
            onClick={() =>
              setActive(Math.min(iconSteps.length - 1, active + 1))
            }
          >
            Continue
          </Button>
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      <div>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--gy-text-subtle)",
            display: "block",
            marginBottom: "0.75rem",
          }}
        >
          Small (sm)
        </span>
        <Stepper steps={steps} activeStep={1} size="sm" />
      </div>
      <div>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--gy-text-subtle)",
            display: "block",
            marginBottom: "0.75rem",
          }}
        >
          Medium (md Default)
        </span>
        <Stepper steps={steps} activeStep={1} size="md" />
      </div>
      <div>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--gy-text-subtle)",
            display: "block",
            marginBottom: "0.75rem",
          }}
        >
          Large (lg)
        </span>
        <Stepper steps={steps} activeStep={1} size="lg" />
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => {
    const [active, setActive] = useState(1);
    return (
      <div style={{ maxWidth: 360 }}>
        <Stepper
          steps={steps}
          activeStep={active}
          orientation="vertical"
          onStepClick={setActive}
        />
      </div>
    );
  },
};

export const WithStepContent: Story = {
  render: () => {
    const [active, setActive] = useState(0);
    const contentSteps = [
      {
        id: "account",
        label: "Account Details",
        description: "Email & Password",
        content: (
          <div
            style={{
              padding: "1.25rem",
              background: "var(--gy-surface-raised, rgba(255,255,255,0.05))",
              borderRadius: "0.5rem",
              border: "1px solid var(--gy-border)",
            }}
          >
            <h4 style={{ margin: "0 0 0.5rem", color: "var(--gy-text)" }}>
              Step 1: Account Credentials
            </h4>
            <p
              style={{
                margin: 0,
                color: "var(--gy-text-muted)",
                fontSize: "0.875rem",
              }}
            >
              Fill in your personal email and choose a secure password.
            </p>
          </div>
        ),
      },
      {
        id: "profile",
        label: "Profile Information",
        description: "Company & Role",
        content: (
          <div
            style={{
              padding: "1.25rem",
              background: "var(--gy-surface-raised, rgba(255,255,255,0.05))",
              borderRadius: "0.5rem",
              border: "1px solid var(--gy-border)",
            }}
          >
            <h4 style={{ margin: "0 0 0.5rem", color: "var(--gy-text)" }}>
              Step 2: Profile Setup
            </h4>
            <p
              style={{
                margin: 0,
                color: "var(--gy-text-muted)",
                fontSize: "0.875rem",
              }}
            >
              Set your organization name, profile photo, and job title.
            </p>
          </div>
        ),
      },
      {
        id: "review",
        label: "Confirm & Launch",
        description: "Final Review",
        content: (
          <div
            style={{
              padding: "1.25rem",
              background: "var(--gy-surface-raised, rgba(255,255,255,0.05))",
              borderRadius: "0.5rem",
              border: "1px solid var(--gy-border)",
            }}
          >
            <h4 style={{ margin: "0 0 0.5rem", color: "var(--gy-text)" }}>
              Step 3: Ready to Launch
            </h4>
            <p
              style={{
                margin: 0,
                color: "var(--gy-text-muted)",
                fontSize: "0.875rem",
              }}
            >
              Everything looks great! Click Complete to activate your workspace.
            </p>
          </div>
        ),
      },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <Stepper
          steps={contentSteps}
          activeStep={active}
          onStepClick={setActive}
        />
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Button
            size="sm"
            variant="secondary"
            disabled={active === 0}
            onClick={() => setActive(Math.max(0, active - 1))}
          >
            Back
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              if (active < contentSteps.length - 1) setActive(active + 1);
              else alert("Workflow Completed!");
            }}
          >
            {active === contentSteps.length - 1 ? "Complete" : "Continue"}
          </Button>
        </div>
      </div>
    );
  },
};
