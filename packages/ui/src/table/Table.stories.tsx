import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  type Column,
  type SortDirection,
  type TableProps,
} from "./Table";

const meta: Meta<TableProps<any>> = {
  title: "Galyan UI/Table",
  component: Table,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "striped", "simple", "primary", "secondary"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    hoverable: { control: "boolean" },
    showHeader: { control: "boolean" },
    sortable: { control: "boolean" },
    noBorder: { control: "boolean" },
    fixedLeftmost: { control: "boolean" },
    fixedRightmost: { control: "boolean" },
    isRowSelection: { control: "boolean" },
    isLoading: { control: "boolean" },
    skeletonRows: { control: "number" },
    paginationDisabled: { control: "boolean" },
    headerAlign: {
      control: "select",
      options: ["left", "center", "right"],
    },
  },
};

export default meta;
type Story = StoryObj<TableProps<User>>;

// Define sample data structure
interface User {
  id: string;
  name: string;
  role: string;
  status: "active" | "inactive";
  revenue: number;
  subRows?: User[];
}

const columns: Column<User>[] = [
  {
    key: "name",
    header: "Name",
    accessor: (row) => row.name,
    sortable: true,
  },
  {
    key: "role",
    header: "Role",
    accessor: (row) => row.role,
    sortable: true,
  },
  {
    key: "status",
    header: "Status",
    accessor: (row) => (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "2px 8px",
          borderRadius: "9999px",
          fontSize: "0.75rem",
          fontWeight: 600,
          background:
            row.status === "active"
              ? "var(--gy-success-subtle)"
              : "var(--gy-neutral-100)",
          color:
            row.status === "active"
              ? "var(--gy-success-emphasis)"
              : "var(--gy-neutral-600)",
        }}
      >
        {row.status}
      </span>
    ),
    align: "center",
  },
  {
    key: "revenue",
    header: "Annual Revenue",
    accessor: (row) => `$${row.revenue.toLocaleString()}`,
    align: "right",
    sortable: true,
  },
];

const sampleData: User[] = [
  {
    id: "1",
    name: "Sophia Martinez",
    role: "Software Engineer",
    status: "active",
    revenue: 125000,
  },
  {
    id: "2",
    name: "Jackson Miller",
    role: "Product Manager",
    status: "active",
    revenue: 142000,
  },
  {
    id: "3",
    name: "Olivia Garcia",
    role: "UI/UX Designer",
    status: "inactive",
    revenue: 98000,
  },
  {
    id: "4",
    name: "Liam Johnson",
    role: "DevOps Specialist",
    status: "active",
    revenue: 135000,
  },
  {
    id: "5",
    name: "Emma Davis",
    role: "Marketing Director",
    status: "active",
    revenue: 112000,
  },
  {
    id: "6",
    name: "Noah Wilson",
    role: "Security Analyst",
    status: "inactive",
    revenue: 118000,
  },
  {
    id: "7",
    name: "Mia Thomas",
    role: "Customer Success Manager",
    status: "active",
    revenue: 85000,
  },
];

export const Default: Story = {
  args: {
    columns,
    data: sampleData,
    rowKey: (row) => row.id,
    variant: "default",
    size: "md",
    hoverable: true,
    showHeader: true,
    sortable: true,
  },
};

export const Striped: Story = {
  args: {
    ...Default.args,
    variant: "striped",
  },
};

export const Simple: Story = {
  args: {
    ...Default.args,
    variant: "simple",
  },
};

export const InteractiveSelection: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div style={{ width: "100%", maxWidth: "800px" }}>
        <div style={{ marginBottom: "10px", fontSize: "0.875rem" }}>
          <strong>Selected rows:</strong> {selected.join(", ") || "None"}
        </div>
        <Table
          {...args}
          columns={columns}
          data={sampleData}
          rowKey={(row) => row.id}
          isRowSelection
          selectedRows={selected}
          onRowSelect={setSelected}
        />
      </div>
    );
  },
};

const hierarchicalData: User[] = [
  {
    id: "1",
    name: "Sophia Martinez",
    role: "VP Engineering",
    status: "active",
    revenue: 250000,
    subRows: [
      {
        id: "1-1",
        name: "Liam Johnson",
        role: "DevOps Lead",
        status: "active",
        revenue: 165000,
      },
      {
        id: "1-2",
        name: "Olivia Garcia",
        role: "Design Manager",
        status: "active",
        revenue: 155000,
        subRows: [
          {
            id: "1-2-1",
            name: "Chloe Brown",
            role: "Junior Designer",
            status: "active",
            revenue: 75000,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Jackson Miller",
    role: "Director of Product",
    status: "active",
    revenue: 195000,
    subRows: [
      {
        id: "2-1",
        name: "Emma Davis",
        role: "Senior Product Manager",
        status: "inactive",
        revenue: 142000,
      },
    ],
  },
];

export const TreeNestedGrid: Story = {
  args: {
    columns,
    data: hierarchicalData,
    rowKey: (row) => row.id,
    nestedChildrenAccessor: "subRows",
    nestedDefaultExpanded: true,
  },
};

export const LoadingState: Story = {
  args: {
    columns,
    data: [],
    isLoading: true,
    skeletonRows: 5,
  },
};

export const ControlledSorting: Story = {
  render: (args) => {
    const [sort, setSort] = useState<{
      key: string;
      direction: SortDirection;
    } | null>({
      key: "name",
      direction: "asc",
    });

    const handleSortChange = (key: string, direction: SortDirection) => {
      setSort({ key, direction });
    };

    const sorted = [...sampleData].sort((a, b) => {
      if (!sort) return 0;
      const col = columns.find((c) => c.key === sort.key);
      if (!col) return 0;
      const av = String(col.accessor(a));
      const bv = String(col.accessor(b));
      const cmp = av.localeCompare(bv, undefined, { numeric: true });
      return sort.direction === "asc" ? cmp : -cmp;
    });

    return (
      <div style={{ width: "100%", maxWidth: "800px" }}>
        <div style={{ marginBottom: "10px", fontSize: "0.875rem" }}>
          <strong>Controlled Sort state:</strong>{" "}
          {sort ? `${sort.key} (${sort.direction})` : "None"}
        </div>
        <Table
          {...args}
          columns={columns}
          data={sorted}
          rowKey={(row) => row.id}
          sortConfig={sort}
          onSort={handleSortChange}
        />
      </div>
    );
  },
};

export const CustomEmptyState: Story = {
  args: {
    columns,
    data: [],
    emptyStateLabel: "No customers match your criteria",
    emptyStateMessage:
      "Try adjusting your filters or search terms to locate what you are looking for.",
    emptyStateIcon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
};
