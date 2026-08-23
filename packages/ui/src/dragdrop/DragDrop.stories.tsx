import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ReorderList, KanbanBoard, type KanbanColumnDef } from "./DragDrop";

const meta: Meta = {
  title: "Galyan UI/Drag & Drop",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

// ── Icons ───────────────────────────────────────────────────────────────────
const CheckCircleIcon = () => (
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
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ClockIcon = () => (
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
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const UserAvatar = ({ name, bg }: { name: string; bg: string }) => (
  <div
    style={{
      width: "24px",
      height: "24px",
      borderRadius: "50%",
      background: bg,
      color: "#ffffff",
      fontSize: "0.6875rem",
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    {name}
  </div>
);

// ── Stories ─────────────────────────────────────────────────────────────────

export const ReorderableTaskList: Story = {
  render: () => {
    interface TaskItem {
      id: string;
      title: string;
      category: string;
      priority: "high" | "medium" | "low";
      estTime: string;
    }

    const initialTasks: TaskItem[] = [
      {
        id: "task-1",
        title: "Implement smart floating position in dropdown & datepicker",
        category: "Frontend Architecture",
        priority: "high",
        estTime: "2 hrs",
      },
      {
        id: "task-2",
        title: "Integrate typography font-family customizer in ThemeProvider",
        category: "Design System",
        priority: "high",
        estTime: "1 hr",
      },
      {
        id: "task-3",
        title: "Update sticky column shadows and border-collapse in Table",
        category: "UI Polish",
        priority: "medium",
        estTime: "45 mins",
      },
      {
        id: "task-4",
        title: "Review automated test coverage across form inputs",
        category: "QA & Testing",
        priority: "low",
        estTime: "3 hrs",
      },
    ];

    const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);

    const getPriorityBadge = (p: TaskItem["priority"]) => {
      const colors = {
        high: { bg: "rgba(239, 68, 68, 0.12)", text: "#ef4444", border: "rgba(239, 68, 68, 0.25)" },
        medium: { bg: "rgba(245, 158, 11, 0.12)", text: "#f59e0b", border: "rgba(245, 158, 11, 0.25)" },
        low: { bg: "rgba(16, 185, 129, 0.12)", text: "#10b981", border: "rgba(16, 185, 129, 0.25)" },
      }[p];

      return (
        <span
          style={{
            fontSize: "0.7rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            padding: "2px 8px",
            borderRadius: "9999px",
            background: colors.bg,
            color: colors.text,
            border: `1px solid ${colors.border}`,
          }}
        >
          {p}
        </span>
      );
    };

    return (
      <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <h3 style={{ margin: "0 0 4px", fontSize: "1.125rem", fontWeight: 700, color: "var(--gy-text)" }}>
            Sprint Priority Reorder List
          </h3>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--gy-text-muted)" }}>
            Drag and drop items using the grab handle to reorder sprint priorities:
          </p>
        </div>

        <ReorderList
          items={tasks}
          onReorder={setTasks}
          keyExtractor={(t) => t.id}
          renderItem={(task, isDragging) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                width: "100%",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: 0 }}>
                <span
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "var(--gy-text)",
                  }}
                >
                  {task.title}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>
                  <span>{task.category}</span>
                  <span>•</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
                    <ClockIcon /> {task.estTime}
                  </span>
                </div>
              </div>

              <div>{getPriorityBadge(task.priority)}</div>
            </div>
          )}
        />
      </div>
    );
  },
};

export const KanbanSprintBoard: Story = {
  render: () => {
    interface KanbanTask {
      id: string;
      title: string;
      tag: string;
      assignee: { name: string; bg: string };
      commentsCount: number;
    }

    const initialColumns: KanbanColumnDef<KanbanTask>[] = [
      {
        id: "backlog",
        title: "Backlog",
        items: [
          {
            id: "kb-1",
            title: "Dark mode color tokens audit",
            tag: "Design System",
            assignee: { name: "AL", bg: "#6366f1" },
            commentsCount: 3,
          },
          {
            id: "kb-2",
            title: "Global tooltip collision resolution",
            tag: "Overlay",
            assignee: { name: "RK", bg: "#ec4899" },
            commentsCount: 1,
          },
        ],
      },
      {
        id: "in_progress",
        title: "In Progress",
        items: [
          {
            id: "kb-3",
            title: "Sticky column drop shadow and border separation",
            tag: "Table",
            assignee: { name: "JD", bg: "#10b981" },
            commentsCount: 5,
          },
          {
            id: "kb-4",
            title: "Smart positioning via Floating UI for pickers",
            tag: "Component",
            assignee: { name: "MG", bg: "#f59e0b" },
            commentsCount: 2,
          },
        ],
      },
      {
        id: "review",
        title: "In Review",
        items: [
          {
            id: "kb-5",
            title: "Font family customization in ThemeProvider",
            tag: "Theme",
            assignee: { name: "AL", bg: "#6366f1" },
            commentsCount: 4,
          },
        ],
      },
      {
        id: "done",
        title: "Done",
        items: [
          {
            id: "kb-6",
            title: "Button variant hover glows & brand palettes",
            tag: "Core UI",
            assignee: { name: "JD", bg: "#10b981" },
            commentsCount: 7,
          },
        ],
      },
    ];

    const [columns, setColumns] = useState(initialColumns);

    const handleMove = (
      itemKey: string,
      fromColId: string,
      toColId: string,
      toIndex: number,
    ) => {
      setColumns((prev) => {
        const next = prev.map((c) => ({ ...c, items: [...c.items] }));
        const sourceCol = next.find((c) => c.id === fromColId);
        const targetCol = next.find((c) => c.id === toColId);
        if (!sourceCol || !targetCol) return prev;

        const itemIdx = sourceCol.items.findIndex((it) => it.id === itemKey);
        if (itemIdx === -1) return prev;

        const [movedItem] = sourceCol.items.splice(itemIdx, 1);
        if (!movedItem) return prev;

        targetCol.items.splice(toIndex, 0, movedItem);
        return next;
      });
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <h3 style={{ margin: "0 0 4px", fontSize: "1.125rem", fontWeight: 700, color: "var(--gy-text)" }}>
            Product Engineering Kanban Board
          </h3>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--gy-text-muted)" }}>
            Drag cards between columns or reorder them within a column:
          </p>
        </div>

        <KanbanBoard
          columns={columns}
          onMove={handleMove}
          keyExtractor={(it) => it.id}
          renderCard={(task, isDragging) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    padding: "2px 8px",
                    borderRadius: "6px",
                    background: "color-mix(in srgb, var(--gy-primary) 12%, var(--gy-surface))",
                    color: "var(--gy-primary)",
                  }}
                >
                  {task.tag}
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>
                  💬 {task.commentsCount}
                </span>
              </div>

              <span
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--gy-text)",
                  lineHeight: 1.35,
                }}
              >
                {task.title}
              </span>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <UserAvatar name={task.assignee.name} bg={task.assignee.bg} />
              </div>
            </div>
          )}
        />
      </div>
    );
  },
};
