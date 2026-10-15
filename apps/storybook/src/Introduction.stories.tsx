import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Badge, Avatar, Card } from "@galyan/ui";

const COLOR_SCHEME_PRESETS = [
  {
    scheme: "Simantrix Color Scheme",
    roles: "simantrix (default identity)",
    colorHex: "#7c5cff",
    colorName: "Signature Violet (Default)",
    brand: "simantrix",
    role: "simantrix",
    theme: "simantrix-simantrix",
    description: "Platform core default identity, digital workplace default, and signature brand presence.",
  },
  {
    scheme: "Coral Color Scheme",
    roles: "coral",
    colorHex: "#f43f5e",
    colorName: "Coral / Crimson Rose",
    brand: "simantrix",
    role: "coral",
    theme: "simantrix-coral",
    description: "Primary authority tier with sovereign workspace permissions and tenant ownership.",
  },
  {
    scheme: "Green Color Scheme",
    roles: "green",
    colorHex: "#10b981",
    colorName: "Emerald Green",
    brand: "simantrix",
    role: "green",
    theme: "simantrix-green",
    description: "Collaborative member tier with active workplace presence and productivity tools.",
  },
  {
    scheme: "Blue Color Scheme",
    roles: "blue",
    colorHex: "#3b82f6",
    colorName: "Cobalt Blue",
    brand: "simantrix",
    role: "blue",
    theme: "simantrix-blue",
    description: "Management & engineering lead tier with project orchestration and operational governance.",
  },
  {
    scheme: "Violet Color Scheme",
    roles: "violet",
    colorHex: "#6366f1",
    colorName: "Platform Violet / Indigo",
    brand: "simantrix",
    role: "violet",
    theme: "simantrix-violet",
    description: "Platform engineering console, developer tools, and organizational tier.",
  },
  {
    scheme: "Amber Color Scheme",
    roles: "amber",
    colorHex: "#f59e0b",
    colorName: "Governance Amber",
    brand: "simantrix",
    role: "amber",
    theme: "simantrix-amber",
    description: "Organization administrators with full management access except billing & deletion.",
  },
  {
    scheme: "Cyan Color Scheme",
    roles: "cyan",
    colorHex: "#0ea5e9",
    colorName: "Sky Blue / Cyan",
    brand: "simantrix",
    role: "cyan",
    theme: "simantrix-cyan",
    description: "Read-only workspace viewers, compliance auditors, and registered platform users.",
  },
];

const IntroductionDoc = () => (
  <div
    style={{
      maxWidth: 900,
      fontFamily: "system-ui, sans-serif",
      color: "var(--gy-text, #0f172a)",
      lineHeight: 1.6,
      padding: "1rem",
    }}
  >
    <h1
      style={{
        fontSize: "2.25rem",
        fontWeight: 800,
        marginBottom: "0.5rem",
        color: "var(--gy-primary, #7c5cff)",
      }}
    >
      Welcome to Simantrix Design System & Galyan UI
    </h1>
    <p style={{ fontSize: "1.125rem", color: "var(--gy-text-muted, #64748b)", marginBottom: "2rem" }}>
      Comprehensive, enterprise-grade React component library powered by
      Simantrix design tokens, dark glassmorphism, multi-tenant role taxonomy,
      and accessible interactive patterns.
    </p>

    <div
      style={{
        background: "var(--gy-surface-muted, #f8fafc)",
        padding: "1.5rem",
        borderRadius: "0.75rem",
        border: "1px solid var(--gy-border, #e2e8f0)",
        marginBottom: "2rem",
      }}
    >
      <h3 style={{ margin: "0 0 0.75rem", fontSize: "1.125rem" }}>
        🚀 Quick Installation
      </h3>
      <pre
        style={{
          background: "var(--gy-background-inverse, #0f172a)",
          color: "var(--gy-text-inverse, #f8fafc)",
          padding: "1rem",
          borderRadius: "0.5rem",
          overflowX: "auto",
          margin: 0,
        }}
      >
        <code>pnpm add @galyan/ui @galyan/theme</code>
      </pre>
    </div>

    <div
      style={{
        background: "var(--gy-surface-muted, #f8fafc)",
        padding: "1.5rem",
        borderRadius: "0.75rem",
        border: "1px solid var(--gy-border, #e2e8f0)",
        marginBottom: "2rem",
      }}
    >
      <h3 style={{ margin: "0 0 0.75rem", fontSize: "1.125rem" }}>📦 Usage</h3>
      <pre
        style={{
          background: "var(--gy-background-inverse, #0f172a)",
          color: "var(--gy-text-inverse, #f8fafc)",
          padding: "1rem",
          borderRadius: "0.5rem",
          overflowX: "auto",
          margin: 0,
        }}
      >
        <code>{`import { Button, Card, DatePicker } from '@galyan/ui';
import { ThemeProvider } from '@galyan/theme';
import '@galyan/theme/css/variables';
import '@galyan/theme/css/globals';
import '@galyan/ui/styles.css';

export function App() {
  return (
    <ThemeProvider brand="simantrix" role="simantrix" defaultColorMode="dark">
      <Card padding="lg" shadow="md">
        <DatePicker label="Select Date" />
        <Button variant="primary">Submit</Button>
      </Card>
    </ThemeProvider>
  );
}`}</code>
      </pre>
    </div>

    <h3 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>
      ✨ Key Features
    </h3>
    <ul style={{ paddingLeft: "1.25rem", color: "var(--gy-text-muted, #334155)" }}>
      <li style={{ marginBottom: "0.5rem" }}>
        <strong>Design Tokens & Direct Color Schemes:</strong> 7 dedicated
        semantic color schemes (Simantrix #7c5cff, Coral #f43f5e, Green
        #10b981, Blue #3b82f6, Violet #6366f1, Amber #f59e0b, Cyan #0ea5e9)
        with full Light Mode and Dark Mode token support.
      </li>
      <li style={{ marginBottom: "0.5rem" }}>
        <strong>Accessible:</strong> Full keyboard navigation, ARIA attributes,
        and 0 type errors across all packages.
      </li>
      <li style={{ marginBottom: "0.5rem" }}>
        <strong>Interactive Controls:</strong> Live control manipulation for all
        component props in Storybook.
      </li>
      <li style={{ marginBottom: "0.5rem" }}>
        <strong>30+ Components:</strong> Input, Button, Card, Modal, DatePicker,
        Table, Chart, Avatar with role rings, and Badge with role presets.
      </li>
    </ul>

    <h3
      style={{
        fontSize: "1.25rem",
        marginTop: "1.5rem",
        marginBottom: "0.75rem",
      }}
    >
      📚 Browse Components
    </h3>
    <p style={{ color: "var(--gy-text-muted, #475569)" }}>
      Use the sidebar to explore all components under <strong>Galyan UI</strong>
      . Each component has a <strong>Docs</strong> tab with auto-generated API
      reference and interactive controls.
    </p>
  </div>
);

const meta: Meta = {
  title: "INTRODUCTION/Welcome",
  component: IntroductionDoc,
  parameters: {
    layout: "padded",
    docs: { disable: true },
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const ColorSchemes: Story = {
  render: () => (
    <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h2 style={{ fontSize: "1.75rem", fontWeight: 800, margin: "0 0 0.5rem" }}>
          Simantrix Color Schemes
        </h2>
        <p style={{ margin: 0, color: "var(--gy-text-muted)", fontSize: "0.9375rem" }}>
          Live demonstration of all 7 color schemes under <code>brand=&quot;simantrix&quot;</code>: Simantrix (#7c5cff), Coral (#f43f5e), Green (#10b981), Blue (#3b82f6), Violet (#6366f1), Amber (#f59e0b), and Cyan (#0ea5e9). Each scheme applies its designated primary color to Buttons, Badges, Avatars, and interactive states.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {COLOR_SCHEME_PRESETS.map((preset) => (
          <div
            key={preset.scheme}
            data-brand={preset.brand}
            data-role={preset.role}
            data-theme={preset.theme}
            style={{
              padding: "1.5rem",
              borderRadius: "0.75rem",
              border: "1px solid var(--gy-border)",
              background: "var(--gy-surface)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    borderRadius: "50%",
                    background: preset.colorHex,
                    display: "inline-block",
                    boxShadow: `0 0 10px ${preset.colorHex}66`,
                  }}
                />
                <h3 style={{ margin: 0, fontSize: "1.125rem", fontWeight: 700 }}>
                  {preset.scheme}
                </h3>
                <span
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "0.25rem",
                    background: "var(--gy-surface-muted)",
                    color: "var(--gy-text-muted)",
                    fontWeight: 600,
                  }}
                >
                  {preset.colorName} ({preset.colorHex})
                </span>
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--gy-text-muted)", fontFamily: "monospace" }}>
                Scheme: {preset.role}
              </span>
            </div>

            <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--gy-text-muted)" }}>
              {preset.description}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
                flexWrap: "wrap",
                padding: "1rem",
                borderRadius: "0.5rem",
                background: "var(--gy-background-subtle)",
                border: "1px solid var(--gy-border-muted)",
              }}
            >
              <Button variant="primary">Primary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Badge variant="primary" content="Active" />
              <Badge variant="secondary" content="Role" />
              <Avatar name={preset.role} size="md" role={preset.role as any} status="online" />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
