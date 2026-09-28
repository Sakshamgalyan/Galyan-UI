import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ListItemGroup, ListItem, type ListItemData } from "./ListItemGroup";

const meta: Meta<typeof ListItemGroup> = {
  title: "Galyan UI/ListItemGroup",
  component: ListItemGroup,
  tags: ["autodocs"],
  argTypes: {
    selectedVariant: {
      control: "select",
      options: ["accent-bar", "subtle", "pill", "outline"],
      description: "Visual style of the selected state.",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the list items.",
    },
    multiple: {
      control: "boolean",
      description: "Allow multiple selections.",
    },
    bordered: {
      control: "boolean",
      description: "Show card border and drop shadow.",
    },
    width: {
      control: "text",
      description: "Width of the list item group container.",
    },
  },
} satisfies Meta<typeof ListItemGroup>;

export default meta;
type Story = StoryObj<typeof ListItemGroup>;

// Data matching user's uploaded screenshot
const screenshotFilterItems: ListItemData[] = [
  { id: "merchant", label: "Merchant" },
  { id: "payment_method", label: "Payment Method", hasDot: true },
  { id: "status", label: "Status" },
  { id: "settlement_date_range", label: "Settlement date range" },
];

/**
 * Exact replica of the ListItemGroup component from the user's uploaded screenshot.
 * Features:
 * - "Payment Method" with an indicator dot on the right.
 * - "Status" actively selected with a left purple accent bar and light purple background.
 */
export const FilterListMatch: Story = {
  name: "Filter List (User Upload Match)",
  render: () => {
    const [selected, setSelected] = useState<string>("status");

    return (
      <div style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
        <ListItemGroup
          width={240}
          value={selected}
          onChange={(val) => setSelected(val as string)}
          selectedVariant="accent-bar"
          items={screenshotFilterItems}
        />
      </div>
    );
  },
};

/**
 * Composable JSX usage example with <ListItem> children.
 */
export const ComposableJSX: Story = {
  render: () => {
    const [active, setActive] = useState<string>("status");

    return (
      <div style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
        <ListItemGroup
          width={240}
          value={active}
          onChange={(val) => setActive(val as string)}
        >
          <ListItem value="merchant">Merchant</ListItem>
          <ListItem value="payment_method" hasDot>
            Payment Method
          </ListItem>
          <ListItem value="status">Status</ListItem>
          <ListItem value="settlement_date_range">
            Settlement date range
          </ListItem>
        </ListItemGroup>
      </div>
    );
  },
};

export const MultiSelectMode: Story = {
  render: () => {
    const [selectedList, setSelectedList] = useState<(string | number)[]>([
      "payment_method",
      "status",
    ]);

    return (
      <div style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
        <ListItemGroup
          width={260}
          multiple
          value={selectedList}
          onChange={(val) => setSelectedList(val as (string | number)[])}
          items={[
            { id: "merchant", label: "Merchant", badge: "12" },
            { id: "payment_method", label: "Payment Method", hasDot: true },
            { id: "status", label: "Status", badge: "Active" },
            { id: "settlement_date_range", label: "Settlement date range" },
          ]}
        />
      </div>
    );
  },
};

export const PillVariant: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>("status");

    return (
      <div style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
        <ListItemGroup
          width={250}
          selectedVariant="pill"
          value={selected}
          onChange={(val) => setSelected(val as string)}
          items={screenshotFilterItems}
        />
      </div>
    );
  },
};

export const WithIconsAndDescriptions: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>("account");

    return (
      <div style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
        <ListItemGroup
          width={300}
          value={selected}
          onChange={(val) => setSelected(val as string)}
          items={[
            {
              id: "profile",
              label: "Personal Profile",
              description: "Manage your personal information",
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              ),
            },
            {
              id: "account",
              label: "Account Settings",
              description: "Security and preferences",
              hasDot: true,
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              ),
            },
            {
              id: "notifications",
              label: "Notifications",
              description: "Email and SMS alerts",
              badge: "New",
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              ),
            },
          ]}
        />
      </div>
    );
  },
};
