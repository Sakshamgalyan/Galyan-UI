import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

const CatalogDoc = () => (
  <div
    style={{
      maxWidth: 850,
      fontFamily: "system-ui, sans-serif",
      color: "#0f172a",
      padding: "1rem",
    }}
  >
    <h1
      style={{
        fontSize: "2rem",
        fontWeight: 800,
        marginBottom: "1rem",
        color: "#0f172a",
      }}
    >
      Component Catalog
    </h1>
    <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>
      Full index of available UI components categorized by functional usage.
    </p>

    <table
      style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}
    >
      <thead>
        <tr
          style={{ background: "#f1f5f9", borderBottom: "2px solid #cbd5e1" }}
        >
          <th style={{ padding: "0.75rem 1rem", width: "30%" }}>Category</th>
          <th style={{ padding: "0.75rem 1rem" }}>Components</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
          <td style={{ padding: "0.875rem 1rem", fontWeight: 600 }}>
            Forms & Inputs
          </td>
          <td style={{ padding: "0.875rem 1rem", color: "#475569" }}>
            Input, Textarea, Checkbox, Radio, Toggle, Dropdown, DatePicker,
            MonthPicker, FileUpload, InputGroup, DropdownGroup
          </td>
        </tr>
        <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
          <td style={{ padding: "0.875rem 1rem", fontWeight: 600 }}>
            Navigation
          </td>
          <td style={{ padding: "0.875rem 1rem", color: "#475569" }}>
            Menu, Breadcrumb, Tabs, StepTab, Stepper
          </td>
        </tr>
        <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
          <td style={{ padding: "0.875rem 1rem", fontWeight: 600 }}>
            Data Display
          </td>
          <td style={{ padding: "0.875rem 1rem", color: "#475569" }}>
            Card, Table, Accordion, Banner, Chips, AnimatedNumber, Typography
          </td>
        </tr>
        <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
          <td style={{ padding: "0.875rem 1rem", fontWeight: 600 }}>
            Feedback & Status
          </td>
          <td style={{ padding: "0.875rem 1rem", color: "#475569" }}>
            Toaster, Modal, Tooltip, Spinner, ProgressBar, Skeleton
          </td>
        </tr>
        <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
          <td style={{ padding: "0.875rem 1rem", fontWeight: 600 }}>Layout</td>
          <td style={{ padding: "0.875rem 1rem", color: "#475569" }}>
            DragDrop, Calendar, Chart
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

const meta: Meta = {
  title: "INTRODUCTION/Catalog",
  component: CatalogDoc,
  parameters: {
    layout: "padded",
    docs: { disable: true },
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
