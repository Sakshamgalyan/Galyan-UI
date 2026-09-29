import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
  Textarea,
  Dropdown,
  Checkbox,
  RadioGroup,
  Toggle,
  Chip,
  ProgressBar,
  Banner,
  Tabs,
  Accordion,
  Typography,
  DatePicker,
  TimePicker,
  Tooltip,
} from "@galyan/ui";

const meta: Meta = {
  title: "COMPOSITIONS/Showcase",
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj;

/* ── 1. Event & Appointment Scheduling Card ── */
export const AppointmentSchedulerCard: Story = {
  render: () => {
    const [clientName, setClientName] = useState("Acme Global Corp");
    const [service, setService] = useState("consultation");
    const [date, setDate] = useState<any>(new Date());
    const [startTime, setStartTime] = useState("10:00 AM");
    const [endTime, setEndTime] = useState("11:30 AM");
    const [smsReminder, setSmsReminder] = useState(true);
    const [emailFollowup, setEmailFollowup] = useState(true);
    const [selectedTags, setSelectedTags] = useState([
      "Executive",
      "Confidential",
    ]);

    const serviceOptions = [
      {
        value: "consultation",
        label: "Strategic Architecture Consultation",
        description: "1-on-1 session with Principal Cloud Architect",
      },
      {
        value: "audit",
        label: "Security & Penetration Audit",
        description: "Deep dive code & infrastructure vulnerability assessment",
      },
      {
        value: "training",
        label: "Design System Engineering Workshop",
        description: "Hands-on Storybook & component library adoption",
      },
    ];

    const availableTags = [
      "Executive",
      "Confidential",
      "Recorded",
      "Remote",
      "VIP",
    ];

    const toggleTag = (tag: string) => {
      setSelectedTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
      );
    };

    return (
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <Card variant="outlined" padding="lg">
          <CardHeader>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <div>
                <Typography variant="h4" weight="bold">
                  Schedule Technical Briefing
                </Typography>
                <Typography
                  variant="small"
                  style={{
                    color: "var(--gy-text-muted)",
                    marginTop: "0.25rem",
                  }}
                >
                  Book time with our specialist engineering squad.
                </Typography>
              </div>
              <Chip variant="success" size="sm">
                Slots Available
              </Chip>
            </div>
          </CardHeader>

          <CardBody>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                marginTop: "0.5rem",
              }}
            >
              <Banner
                variant="info"
                bannerStyle="subtle"
                title="Synchronized Calendar Booking"
                description="Selected slot instantly reserves Google Calendar and Zoom rooms."
              />

              <Input
                label="Organization / Client Name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Enter company name"
              />

              <Dropdown
                label="Select Engagement Type"
                options={serviceOptions}
                value={service}
                onChange={setService}
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr 1fr",
                  gap: "1rem",
                }}
              >
                <DatePicker
                  label="Meeting Date"
                  value={date}
                  onChange={setDate}
                />
                <TimePicker
                  label="Start Window"
                  value={startTime}
                  onChange={(t) => setStartTime(t)}
                  minuteStep={15}
                />
                <TimePicker
                  label="End Window"
                  value={endTime}
                  onChange={(t) => setEndTime(t)}
                  minuteStep={15}
                />
              </div>

              <div>
                <Typography
                  variant="label"
                  weight="medium"
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                >
                  Session Tags
                </Typography>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                >
                  {availableTags.map((tag) => {
                    const active = selectedTags.includes(tag);
                    return (
                      <Chip
                        key={tag}
                        clickable
                        selected={active}
                        variant={active ? "solid" : "soft"}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Chip>
                    );
                  })}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  borderTop: "1px solid var(--gy-border, #e2e8f0)",
                  paddingTop: "1rem",
                }}
              >
                <Toggle
                  label="Send SMS notifications to organizer"
                  checked={smsReminder}
                  withIcon
                  onChange={(e) => setSmsReminder(e.target.checked)}
                />
                <Checkbox
                  label="Generate briefing summary doc"
                  checked={emailFollowup}
                  onChange={(e) => setEmailFollowup(e.target.checked)}
                />
              </div>

              <ProgressBar
                progress={80}
                variant="primary"
                label="Consultant Schedule Capacity (80% full today)"
                showValue
              />
            </div>
          </CardBody>

          <CardFooter>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button variant="ghost" size="sm">
                Save Draft
              </Button>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() =>
                    alert(
                      `Confirmed appointment for ${clientName} on ${date ? date.toLocaleDateString() : ""} from ${startTime} to ${endTime}!`,
                    )
                  }
                >
                  Confirm & Reserve
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  },
};

/* ── 2. Settings Accordion With Multi-Component Panels ── */
export const SettingsAccordionWorkflow: Story = {
  render: () => {
    const [workStart, setWorkStart] = useState("08:30 AM");
    const [workEnd, setWorkEnd] = useState("05:30 PM");
    const [lunchStart, setLunchStart] = useState("12:30 PM");
    const [lunchEnd, setLunchEnd] = useState("01:30 PM");
    const [tier, setTier] = useState("pro");
    const [autoDeploy, setAutoDeploy] = useState(true);
    const [telemetry, setTelemetry] = useState(false);

    const tierOptions = [
      { value: "starter", label: "Starter (Solo Developer)" },
      { value: "pro", label: "Pro Team (Up to 15 Members)" },
      { value: "enterprise", label: "Enterprise Sovereign (Dedicated)" },
    ];

    const accordionItems = [
      {
        id: "hours",
        title: "Operational Hours & Availability",
        subtitle: "Define working hours, shift windows, and lunch breaks",
        content: (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              padding: "0.5rem 0",
            }}
          >
            <Typography
              variant="p"
              style={{ fontSize: "0.875rem", color: "var(--gy-text-muted)" }}
            >
              These operational windows automatically adjust SLA escalation
              timers and engineer on-call rotations.
            </Typography>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <TimePicker
                label="Shift Start"
                value={workStart}
                onChange={(t) => setWorkStart(t)}
                minuteStep={15}
              />
              <TimePicker
                label="Shift End"
                value={workEnd}
                onChange={(t) => setWorkEnd(t)}
                minuteStep={15}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <TimePicker
                label="Lunch Break Start"
                value={lunchStart}
                onChange={(t) => setLunchStart(t)}
                minuteStep={15}
              />
              <TimePicker
                label="Lunch Break End"
                value={lunchEnd}
                onChange={(t) => setLunchEnd(t)}
                minuteStep={15}
              />
            </div>

            <div
              style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}
            >
              <Chip variant="success" size="sm">
                9 Hours Shift
              </Chip>
              <Chip variant="neutral" size="sm">
                1 Hour Break
              </Chip>
            </div>
          </div>
        ),
      },
      {
        id: "subscription",
        title: "Subscription Tier & Cloud Quota",
        subtitle: "Manage billing tier, resource scaling, and compute ceilings",
        content: (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              padding: "0.5rem 0",
            }}
          >
            <RadioGroup
              name="accordion-tier"
              label="Select Service Tier"
              options={tierOptions}
              value={tier}
              onChange={setTier}
            />

            <ProgressBar
              progress={76}
              variant="indigo"
              label="Current Tier Memory Consumption (7.6GB / 10GB)"
              showValue
            />

            <Banner
              variant="warning"
              bannerStyle="subtle"
              title="Quota Warning"
              description="Approaching memory threshold. Scale to Enterprise to prevent container restarts."
            />
          </div>
        ),
      },
      {
        id: "governance",
        title: "Governance & Deployment Pipelines",
        subtitle:
          "Continuous integration flags and automated rollback safeguards",
        content: (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              padding: "0.5rem 0",
            }}
          >
            <Toggle
              label="Enable automated zero-downtime Canary deployments"
              checked={autoDeploy}
              withIcon
              onChange={(e) => setAutoDeploy(e.target.checked)}
            />
            <Toggle
              label="Stream anonymized OpenTelemetry metrics to CloudWatch"
              checked={telemetry}
              withIcon
              onChange={(e) => setTelemetry(e.target.checked)}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "0.5rem",
              }}
            >
              <Button variant="primary" size="sm">
                Save Governance Policy
              </Button>
            </div>
          </div>
        ),
      },
    ];

    return (
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <Typography
          variant="h4"
          weight="bold"
          style={{ marginBottom: "0.25rem" }}
        >
          Workspace Preferences
        </Typography>
        <Typography
          variant="small"
          style={{
            color: "var(--gy-text-muted)",
            marginBottom: "1.25rem",
            display: "block",
          }}
        >
          Accordion panels embedding TimePickers, RadioGroups, ProgressBars, and
          Toggles.
        </Typography>

        <Accordion items={accordionItems} defaultExpandedIds={["hours"]} />
      </div>
    );
  },
};
