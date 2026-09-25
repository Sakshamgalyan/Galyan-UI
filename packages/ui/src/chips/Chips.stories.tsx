import type { Meta, StoryObj } from "@storybook/react";
import { Chip, ChipsInput } from "./Chips";
import React, { useState } from "react";

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const UserAvatar = () => (
  <span
    style={{
      width: 16,
      height: 16,
      borderRadius: "50%",
      background: "var(--gy-primary)",
      color: "white",
      fontSize: "0.6rem",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
    }}
  >
    A
  </span>
);

const meta: Meta<typeof Chip> = {
  title: "Galyan UI/Chip",
  component: Chip,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "solid",
        "soft",
        "outline",
        "success",
        "warning",
        "danger",
        "neutral",
      ],
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
    removable: { control: "boolean" },
    clickable: { control: "boolean" },
    selected: { control: "boolean" },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    children: "Interactive Chip",
    variant: "soft",
    radius: "full",
    size: "md",
    removable: false,
    clickable: true,
    selected: false,
  },
};

export const RadiusVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <span
          style={{
            width: 60,
            fontSize: "0.8rem",
            color: "var(--gy-text-muted)",
          }}
        >
          none:
        </span>
        <Chip radius="none" variant="soft">
          Square Tag
        </Chip>
        <Chip radius="none" variant="solid">
          Featured
        </Chip>
        <Chip radius="none" variant="outline" removable>
          Delete me
        </Chip>
      </div>
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <span
          style={{
            width: 60,
            fontSize: "0.8rem",
            color: "var(--gy-text-muted)",
          }}
        >
          sm:
        </span>
        <Chip radius="sm" variant="soft">
          Slightly Rounded
        </Chip>
        <Chip radius="sm" variant="success">
          Active
        </Chip>
      </div>
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <span
          style={{
            width: 60,
            fontSize: "0.8rem",
            color: "var(--gy-text-muted)",
          }}
        >
          md:
        </span>
        <Chip radius="md" variant="soft">
          Medium Rounded
        </Chip>
        <Chip radius="md" variant="warning">
          In Review
        </Chip>
      </div>
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <span
          style={{
            width: 60,
            fontSize: "0.8rem",
            color: "var(--gy-text-muted)",
          }}
        >
          lg:
        </span>
        <Chip radius="lg" variant="soft">
          Large Rounded
        </Chip>
        <Chip radius="lg" variant="danger">
          Blocked
        </Chip>
      </div>
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <span
          style={{
            width: 60,
            fontSize: "0.8rem",
            color: "var(--gy-text-muted)",
          }}
        >
          full:
        </span>
        <Chip radius="full" variant="soft">
          Pill (Default)
        </Chip>
        <Chip radius="full" variant="solid" removable>
          Badge
        </Chip>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      <Chip variant="solid">Solid</Chip>
      <Chip variant="soft">Soft</Chip>
      <Chip variant="outline">Outline</Chip>
      <Chip variant="success">Success</Chip>
      <Chip variant="warning">Warning</Chip>
      <Chip variant="danger">Danger</Chip>
      <Chip variant="neutral">Neutral</Chip>
    </div>
  ),
};

export const WithIconsAndAvatars: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "0.75rem",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Chip variant="solid" icon={<StarIcon />}>
        Starred
      </Chip>
      <Chip variant="soft" icon={<UserAvatar />}>
        Alex Morgan
      </Chip>
      <Chip
        variant="outline"
        icon={<StarIcon />}
        removable
        onRemove={() => alert("Removed")}
      >
        Favorite
      </Chip>
    </div>
  ),
};

export const SelectableFilterGroup: Story = {
  render: () => {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([
      "design",
      "react",
    ]);

    const toggle = (tag: string) => {
      setSelectedFilters((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
      );
    };

    const tags = [
      { id: "all", label: "All Items" },
      { id: "design", label: "Design System" },
      { id: "react", label: "React" },
      { id: "typescript", label: "TypeScript" },
      { id: "storybook", label: "Storybook" },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <span style={{ fontSize: "0.85rem", color: "var(--gy-text-muted)" }}>
          Click chips to toggle selection:
        </span>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {tags.map((t) => {
            const isSelected = selectedFilters.includes(t.id);
            return (
              <Chip
                key={t.id}
                variant={isSelected ? "solid" : "soft"}
                clickable
                selected={isSelected}
                onClick={() => toggle(t.id)}
              >
                {t.label}
              </Chip>
            );
          })}
        </div>
      </div>
    );
  },
};

export const Removable: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem" }}>
      <Chip variant="soft" removable onRemove={() => alert("Removed React")}>
        React
      </Chip>
      <Chip
        variant="solid"
        removable
        onRemove={() => alert("Removed TypeScript")}
      >
        TypeScript
      </Chip>
      <Chip
        variant="outline"
        removable
        onRemove={() => alert("Removed Design")}
      >
        Design
      </Chip>
    </div>
  ),
};

export const ChipsInputDemo: Story = {
  render: () => {
    const [tags, setTags] = useState(["React", "TypeScript", "Galyan UI"]);
    return (
      <div style={{ width: "380px" }}>
        <ChipsInput
          values={tags}
          onChange={setTags}
          placeholder="Type and press Enter..."
        />
      </div>
    );
  },
};
