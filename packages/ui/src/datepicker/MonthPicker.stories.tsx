import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MonthPicker } from './MonthPicker';

/**
 * Dedicated selector for month and year combinations.
 */
const meta: Meta<typeof MonthPicker> = {
  title: 'Galyan UI/MonthPicker',
  component: MonthPicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 340, minHeight: 320 }}><Story /></div>],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    minYear: { control: 'number' },
    maxYear: { control: 'number' },
    placement: { control: 'inline-radio', options: ['top', 'bottom'] },
    align: { control: 'inline-radio', options: ['left', 'right'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    hasError: { control: 'boolean' },
  },
} satisfies Meta<typeof MonthPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Billing Month',
    placeholder: 'Select month & year',
    minYear: 1970,
    maxYear: 2050,
    disabled: false,
    required: false,
    hasError: false,
  },
  render: (args) => {
    const [month, setMonth] = useState<{ year: number; month: number } | null>({ year: 2026, month: 6 });
    return <MonthPicker {...args} value={month} onChange={setMonth} />;
  },
};

export const WithApplyCancelActions: Story = {
  args: {
    label: 'Report Period',
    placeholder: 'Choose period',
  },
  render: (args) => {
    const [month, setMonth] = useState<{ year: number; month: number } | null>({ year: 2026, month: 0 });
    return (
      <MonthPicker
        {...args}
        value={month}
        onApply={(val) => {
          setMonth(val);
          alert(`Applied: ${val?.month !== undefined ? val.month + 1 : ''}/${val?.year}`);
        }}
        onCancel={() => alert('Cancelled')}
      />
    );
  },
};

export const MinAndMaxYears: Story = {
  args: {
    label: 'Recent Year (2020 - 2030)',
    placeholder: 'Select bounded month',
    minYear: 2020,
    maxYear: 2030,
  },
  render: (args) => {
    const [month, setMonth] = useState<{ year: number; month: number } | null>({ year: 2025, month: 3 });
    return <MonthPicker {...args} value={month} onChange={setMonth} />;
  },
};

export const DisabledAndErrorStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <MonthPicker
        label="Disabled MonthPicker"
        placeholder="Cannot interact"
        disabled
        value={{ year: 2026, month: 6 }}
      />
      <MonthPicker
        label="Required Field with Error"
        placeholder="Select month"
        hasError
        required
        helperText="Please select a valid billing month"
      />
    </div>
  ),
};
