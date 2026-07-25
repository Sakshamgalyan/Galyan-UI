import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calendar';

/**
 * Full-featured interactive grid calendar supporting single date selection and date range picking.
 */
const meta: Meta<typeof Calendar> = {
  title: 'Galyan UI/Calendar',
  component: Calendar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'inline-radio', options: ['single', 'range'] },
    firstDayOfWeek: { control: 'inline-radio', options: [0, 1] },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleMode: Story = {
  args: {
    mode: 'single',
    firstDayOfWeek: 0,
  },
  render: (args) => {
    const [date, setDate] = useState<Date | [Date, Date]>(new Date());
    return <Calendar {...args} value={date} onChange={setDate} />;
  },
};

export const RangeMode: Story = {
  args: {
    mode: 'range',
    firstDayOfWeek: 0,
  },
  render: (args) => {
    const [range, setRange] = useState<Date | [Date, Date]>([new Date(2026, 6, 10), new Date(2026, 6, 20)]);
    return <Calendar {...args} value={range} onChange={setRange} />;
  },
};
