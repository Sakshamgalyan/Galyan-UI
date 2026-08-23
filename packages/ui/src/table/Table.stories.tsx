import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  type Column,
  type SortDirection,
  type TableProps,
} from "./Table";
import { Button } from "../button/Button";

const meta: Meta<TableProps<any>> = {
  title: "Galyan UI/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: 860, padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
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
  status: "active" | "inactive" | "pending";
  email?: string;
  department?: string;
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
              ? "color-mix(in srgb, #10b981 14%, var(--gy-surface))"
              : row.status === "pending"
                ? "color-mix(in srgb, #f59e0b 14%, var(--gy-surface))"
                : "color-mix(in srgb, #ef4444 14%, var(--gy-surface))",
          color:
            row.status === "active"
              ? "#10b981"
              : row.status === "pending"
                ? "#f59e0b"
                : "#ef4444",
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
  { id: "1", name: "Sophia Martinez", role: "Software Engineer", status: "active", revenue: 125000, email: "sophia@example.com", department: "Engineering" },
  { id: "2", name: "Jackson Miller", role: "Product Manager", status: "active", revenue: 142000, email: "jackson@example.com", department: "Product" },
  { id: "3", name: "Olivia Garcia", role: "UI/UX Designer", status: "inactive", revenue: 98000, email: "olivia@example.com", department: "Design" },
  { id: "4", name: "Liam Johnson", role: "DevOps Specialist", status: "active", revenue: 135000, email: "liam@example.com", department: "Infrastructure" },
  { id: "5", name: "Emma Davis", role: "Marketing Director", status: "active", revenue: 112000, email: "emma@example.com", department: "Marketing" },
  { id: "6", name: "Noah Wilson", role: "Security Analyst", status: "inactive", revenue: 118000, email: "noah@example.com", department: "Security" },
  { id: "7", name: "Mia Thomas", role: "Customer Success Manager", status: "active", revenue: 85000, email: "mia@example.com", department: "Support" },
  { id: "8", name: "Lucas Anderson", role: "Frontend Lead", status: "active", revenue: 148000, email: "lucas@example.com", department: "Engineering" },
  { id: "9", name: "Amelia White", role: "Data Scientist", status: "pending", revenue: 132000, email: "amelia@example.com", department: "AI Lab" },
  { id: "10", name: "Benjamin Taylor", role: "Backend Developer", status: "active", revenue: 119000, email: "ben@example.com", department: "Engineering" },
  { id: "11", name: "Harper Clark", role: "QA Engineer", status: "active", revenue: 92000, email: "harper@example.com", department: "QA" },
  { id: "12", name: "James Walker", role: "Cloud Architect", status: "active", revenue: 165000, email: "james@example.com", department: "Infrastructure" },
  { id: "13", name: "Evelyn Hall", role: "Growth Marketer", status: "pending", revenue: 104000, email: "evelyn@example.com", department: "Marketing" },
  { id: "14", name: "Alexander Young", role: "Mobile Engineer", status: "active", revenue: 128000, email: "alex@example.com", department: "Mobile" },
];

export const Default: Story = {
  args: {
    columns,
    data: sampleData.slice(0, 7),
    rowKey: (row) => row.id,
    variant: "default",
    size: "md",
    hoverable: true,
    showHeader: true,
    sortable: true,
  },
};

export const PaginationInternal: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ fontSize: "0.875rem", color: "var(--gy-text-muted)" }}>
        Client-side automatic pagination with 5 items per page across 14 records:
      </div>
      <Table
        columns={columns}
        data={sampleData}
        rowKey={(row) => row.id}
        pagination={true}
        pageSize={5}
        hoverable
        sortable
      />
    </div>
  ),
};

export const ControlledServerPagination: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const pageSize = 4;
    const totalItems = sampleData.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const currentRows = sampleData.slice((page - 1) * pageSize, page * pageSize);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--gy-text)" }}>
            Server-side Controlled Pagination (Page {page} of {totalPages})
          </span>
          <span style={{ fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>
            Total {totalItems} entries
          </span>
        </div>
        <Table
          columns={columns}
          data={currentRows}
          rowKey={(row) => row.id}
          pagination={{
            currentPage: page,
            totalPages,
            totalItems,
            itemsPerPage: pageSize,
          }}
          onPageChange={setPage}
          hoverable
          sortable
        />
      </div>
    );
  },
};

export const RowSelectionWithBulkActions: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["1", "3"]);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.75rem 1rem",
            background: "var(--gy-surface)",
            borderRadius: "0.5rem",
            border: "1px solid var(--gy-border)",
          }}
        >
          <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--gy-text)" }}>
            Selected: <span style={{ color: "var(--gy-primary)" }}>{selected.length}</span> / {sampleData.slice(0, 6).length} items
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Button
              size="xs"
              variant="secondary"
              disabled={selected.length === 0}
              onClick={() => alert(`Exporting ${selected.length} rows`)}
            >
              Export Selected
            </Button>
            <Button
              size="xs"
              variant="danger"
              disabled={selected.length === 0}
              onClick={() => {
                alert(`Deleting IDs: ${selected.join(", ")}`);
                setSelected([]);
              }}
            >
              Delete Selected
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          data={sampleData.slice(0, 6)}
          rowKey={(row) => row.id}
          isRowSelection
          selectedRows={selected}
          onRowSelect={setSelected}
          hoverable
        />
      </div>
    );
  },
};

const MoreVerticalIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ opacity: 0.8 }}
  >
    <circle cx="12" cy="5" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="12" cy="19" r="2" />
  </svg>
);

export const StickyHeaderAndFixedColumns: Story = {
  render: () => {
    const wideColumns: Column<User>[] = [
      { key: "id", header: "ID", accessor: (r) => `#${r.id}`, width: "70px" },
      { key: "name", header: "Full Name", accessor: (r) => r.name, width: "180px", sortable: true },
      { key: "email", header: "Email Address", accessor: (r) => r.email ?? "-", width: "200px" },
      { key: "department", header: "Department", accessor: (r) => r.department ?? "-", width: "150px" },
      { key: "role", header: "Role Title", accessor: (r) => r.role, width: "180px" },
      { key: "status", header: "Status", accessor: (r) => r.status, width: "110px", align: "center" },
      { key: "revenue", header: "Annual Revenue", accessor: (r) => `$${r.revenue.toLocaleString()}`, width: "140px", align: "right" },
      {
        key: "actions",
        header: "ACTIONS",
        width: "90px",
        align: "center",
        accessor: (r) => (
          <button
            type="button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              border: "1.5px solid color-mix(in srgb, var(--gy-primary) 30%, var(--gy-border))",
              background: "var(--gy-surface)",
              color: "var(--gy-primary)",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            onClick={(e) => {
              e.stopPropagation();
              alert(`Actions menu clicked for ${r.name}`);
            }}
            aria-label="Row actions"
          >
            <MoreVerticalIcon />
          </button>
        ),
      },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <div style={{ fontSize: "0.875rem", color: "var(--gy-text-muted)" }}>
          Horizontal scrolling table with <strong>fixed left checkbox & ID</strong> and <strong>fixed right ACTIONS column</strong>:
        </div>
        <div style={{ maxWidth: 640, overflowX: "auto" }}>
          <Table
            columns={wideColumns}
            data={sampleData.slice(0, 8)}
            rowKey={(r) => r.id}
            stickyHeader
            fixedLeftmost
            fixedRightmost
            isRowSelection
            hoverable
          />
        </div>
      </div>
    );
  },
};

const BuildingIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01" />
    <path d="M16 6h.01" />
    <path d="M12 6h.01" />
    <path d="M12 10h.01" />
    <path d="M12 14h.01" />
    <path d="M16 10h.01" />
    <path d="M16 14h.01" />
    <path d="M8 10h.01" />
    <path d="M8 14h.01" />
  </svg>
);

export const EnterpriseCompanyDirectory: Story = {
  render: () => {
    interface CompanyRecord {
      id: string;
      name: string;
      gst: string;
      contactPerson: string;
      email: string;
      phone: string;
      address: string;
    }

    const companyData: CompanyRecord[] = [
      {
        id: "1",
        name: "PRICOL LIMITED - PLANT 2",
        gst: "06AAGCP0139E1ZT",
        contactPerson: "NA",
        email: "dalbiryadav@pricol.com",
        phone: "-",
        address: "Plot No 34, 35, Sector 4, Innovation Park",
      },
      {
        id: "2",
        name: "Billion Engineers Pvt. Ltd.",
        gst: "06AAACB5289K",
        contactPerson: "Tiwari",
        email: "billionengineers@gmail.com",
        phone: "-",
        address: "Plot No 577, Sector 8, IMT Manesar Technology Hub",
      },
      {
        id: "3",
        name: "AISIN Automotive Haryana Ltd.",
        gst: "06AAACA0000A1Z5",
        contactPerson: "Rajesh Kumar (DGM Procurement)",
        email: "procurement@aisin-india.co.in",
        phone: "+91-124-4890100",
        address: "Plot 42, Sector 8, IMT Manesar Expressway",
      },
    ];

    const enterpriseColumns: Column<CompanyRecord>[] = [
      {
        key: "company",
        header: "COMPANY NAME",
        width: "310px",
        accessor: (r) => (
          <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "8px",
                background: "color-mix(in srgb, var(--gy-primary) 12%, var(--gy-surface))",
                color: "var(--gy-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                border: "1px solid color-mix(in srgb, var(--gy-primary) 20%, transparent)",
              }}
            >
              <BuildingIcon />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: 0 }}>
              <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--gy-text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {r.name}
              </span>
              <span style={{ fontSize: "0.7rem", color: "var(--gy-text-muted)", fontFamily: "monospace", letterSpacing: "0.03em" }}>
                GST: {r.gst}
              </span>
            </div>
          </div>
        ),
      },
      {
        key: "contact",
        header: "CONTACT PERSON",
        width: "210px",
        accessor: (r) => (
          <span style={{ color: "var(--gy-text)", fontSize: "0.85rem" }}>
            {r.contactPerson}
          </span>
        ),
      },
      {
        key: "email",
        header: "EMAIL",
        width: "230px",
        accessor: (r) => (
          <span style={{ color: "var(--gy-text)", fontSize: "0.85rem" }}>
            {r.email}
          </span>
        ),
      },
      {
        key: "phone",
        header: "PHONE",
        width: "140px",
        accessor: (r) => (
          <span style={{ color: "var(--gy-text)", fontSize: "0.85rem" }}>
            {r.phone}
          </span>
        ),
      },
      {
        key: "address",
        header: "ADDRESS",
        width: "220px",
        accessor: (r) => r.address,
      },
      {
        key: "actions",
        header: "ACTIONS",
        width: "80px",
        align: "center",
        accessor: (r) => (
          <button
            type="button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              border: "1.5px solid color-mix(in srgb, var(--gy-primary) 30%, var(--gy-border))",
              background: "var(--gy-surface)",
              color: "var(--gy-primary)",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            onClick={(e) => {
              e.stopPropagation();
              alert(`Action for ${r.name}`);
            }}
            aria-label="Actions menu"
          >
            <MoreVerticalIcon />
          </button>
        ),
      },
    ];

    return (
      <div style={{ width: "100%", maxWidth: "980px" }}>
        <Table
          columns={enterpriseColumns}
          data={companyData}
          rowKey={(r) => r.id}
          fixedRightmost
          pagination={true}
          pageSize={3}
          paginationVariant="compact"
          hoverable
        />
      </div>
    );
  },
};

export const TableSizesShowcase: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h4 style={{ margin: "0 0 0.5rem", color: "var(--gy-text)", fontSize: "0.875rem" }}>
          Small (sm) - Compact Data Density
        </h4>
        <Table columns={columns} data={sampleData.slice(0, 3)} size="sm" />
      </div>

      <div>
        <h4 style={{ margin: "0 0 0.5rem", color: "var(--gy-text)", fontSize: "0.875rem" }}>
          Medium (md) - Standard Default
        </h4>
        <Table columns={columns} data={sampleData.slice(0, 3)} size="md" />
      </div>

      <div>
        <h4 style={{ margin: "0 0 0.5rem", color: "var(--gy-text)", fontSize: "0.875rem" }}>
          Large (lg) - Spacious Presentation
        </h4>
        <Table columns={columns} data={sampleData.slice(0, 3)} size="lg" />
      </div>
    </div>
  ),
};

export const StripedVariant: Story = {
  args: {
    columns,
    data: sampleData.slice(0, 6),
    rowKey: (row) => row.id,
    variant: "striped",
    hoverable: true,
  },
};

export const SimpleVariant: Story = {
  args: {
    columns,
    data: sampleData.slice(0, 6),
    rowKey: (row) => row.id,
    variant: "simple",
  },
};

export const PrimaryBrandVariant: Story = {
  args: {
    columns,
    data: sampleData.slice(0, 6),
    rowKey: (row) => row.id,
    variant: "primary",
    hoverable: true,
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

export const LoadingSkeletonState: Story = {
  args: {
    columns,
    data: [],
    isLoading: true,
    skeletonRows: 5,
  },
};

export const EllipsisWithTooltipOnOverflow: Story = {
  render: () => {
    const longTextData = [
      {
        id: "1",
        name: "Sophia Martinez-Harding-Montgomery (Lead Staff Architect)",
        role: "Principal Infrastructure & Distributed Cloud Systems Engineer",
        status: "active" as const,
        revenue: 185000,
      },
      {
        id: "2",
        name: "Alexander Bartholomew Wellington III",
        role: "Senior Enterprise Product Strategy & Global Compliance Manager",
        status: "active" as const,
        revenue: 195000,
      },
      {
        id: "3",
        name: "Olivia-Genevieve Garcia-Vanderbilt",
        role: "Lead Creative Interaction & High-Fidelity UI/UX Design Specialist",
        status: "inactive" as const,
        revenue: 145000,
      },
    ];

    const ellipsisColumns: Column<User>[] = [
      {
        key: "name",
        header: "Name (Width 160px)",
        accessor: (r) => r.name,
        width: "160px",
      },
      {
        key: "role",
        header: "Role (Width 200px)",
        accessor: (r) => r.role,
        width: "200px",
      },
      {
        key: "status",
        header: "Status",
        accessor: (r) => r.status,
        width: "100px",
        align: "center",
      },
      {
        key: "revenue",
        header: "Revenue",
        accessor: (r) => `$${r.revenue.toLocaleString()}`,
        width: "120px",
        align: "right",
      },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ fontSize: "0.875rem", color: "var(--gy-text-muted)" }}>
          Columns with constrained widths automatically truncate with <strong>… (ellipsis)</strong> and display the full text in a <strong>soft connected Tooltip</strong> on hover:
        </div>
        <Table
          columns={ellipsisColumns}
          data={longTextData}
          rowKey={(r) => r.id}
          hoverable
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
      "Try adjusting your search query or reset active filters.",
    emptyStateIcon: (
      <svg
        width="36"
        height="36"
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
