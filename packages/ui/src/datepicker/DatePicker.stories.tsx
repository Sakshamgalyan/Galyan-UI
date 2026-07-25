import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';

/**
 * Popover date picker input with support for date range, formats, constraints, and custom triggers.
 */
const meta: Meta<typeof DatePicker> = {
  title: 'Galyan UI/DatePicker',
  component: DatePicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 360, minHeight: 380 }}><Story /></div>],
  argTypes: {
    placeholder: { control: 'text' },
    label: { control: 'text' },
    helperText: { control: 'text' },
    dateFormat: { control: 'select', options: ['YYYY-MM-DD', 'MM/DD/YYYY', 'DD/MM/YYYY'] },
    firstDayOfWeek: { control: 'inline-radio', options: [0, 1] },
    placement: { control: 'inline-radio', options: ['top', 'bottom'] },
    align: { control: 'inline-radio', options: ['left', 'right'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    hasError: { control: 'boolean' },
    disableFutureDates: { control: 'boolean' },
    usePortal: { control: 'boolean' },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Select Birthday',
    placeholder: 'Pick a date',
    dateFormat: 'YYYY-MM-DD',
    firstDayOfWeek: 0,
    placement: 'bottom',
    align: 'left',
    disabled: false,
    required: false,
    hasError: false,
    disableFutureDates: false,
  },
  render: (args) => {
    const [date, setDate] = useState<Date | null>(new Date());
    return <DatePicker {...args} value={date} onChange={setDate} />;
  },
};

export const CustomFormats: Story = {
  render: () => {
    const [d1, setD1] = useState<Date | null>(new Date());
    const [d2, setD2] = useState<Date | null>(new Date());
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <DatePicker
          label="US Format (MM/DD/YYYY)"
          dateFormat="MM/DD/YYYY"
          value={d1}
          onChange={setD1}
        />
        <DatePicker
          label="EU Format (DD/MM/YYYY)"
          dateFormat="DD/MM/YYYY"
          value={d2}
          onChange={setD2}
        />
      </div>
    );
  },
};

export const WithApplyCancelActions: Story = {
  args: {
    label: 'Event Start Date',
    placeholder: 'Select starting date',
  },
  render: (args) => {
    const [date, setDate] = useState<Date | null>(new Date());
    return (
      <DatePicker
        {...args}
        value={date}
        onApply={(d) => alert(`Applied date: ${d?.toLocaleDateString()}`)}
        onCancel={() => alert('Selection cancelled')}
      />
    );
  },
};

export const DisableFutureDates: Story = {
  args: {
    label: 'Date of Birth (No Future Dates)',
    disableFutureDates: true,
    placeholder: 'Pick a past date',
  },
  render: (args) => {
    const [date, setDate] = useState<Date | null>(new Date());
    return <DatePicker {...args} value={date} onChange={setDate} />;
  },
};

export const DisabledAndErrorStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <DatePicker
        label="Disabled DatePicker"
        placeholder="Cannot interact"
        disabled
        value={new Date()}
      />
      <DatePicker
        label="Required Appointment Date"
        placeholder="Pick date"
        required
        hasError
        helperText="Please select an available appointment slot"
      />
    </div>
  ),
};
