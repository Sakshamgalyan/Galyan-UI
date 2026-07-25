import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'Galyan UI/RadioGroup',
  component: RadioGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
  argTypes: {
    label: { control: 'text' },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
    hasError: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    helperText: { control: 'text' },
  },
} satisfies Meta<typeof RadioGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: 'free', label: 'Free Plan' },
  { value: 'pro', label: 'Pro Plan' },
  { value: 'enterprise', label: 'Enterprise Plan' },
];

export const Default: Story = {
  args: {
    label: 'Select a plan',
    size: 'md',
    orientation: 'vertical',
    helperText: 'You can change this later',
    hasError: false,
    isRequired: false,
    isDisabled: false,
  },
  render: (args) => {
    const [val, setVal] = useState('pro');
    return <RadioGroup {...args} options={options} value={val} onChange={setVal} />;
  },
};

export const Horizontal: Story = {
  render: () => {
    const [val, setVal] = useState('free');
    return <RadioGroup label="Plan" options={options} value={val} onChange={setVal} orientation="horizontal" />;
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <RadioGroup label="Small" options={options} size="sm" defaultValue="free" />
      <RadioGroup label="Medium" options={options} size="md" defaultValue="pro" />
      <RadioGroup label="Large" options={options} size="lg" defaultValue="enterprise" />
    </div>
  ),
};

export const ErrorState: Story = {
  args: {
    label: 'Required Selection',
    options,
    hasError: true,
    helperText: 'Please select a plan to continue',
    isRequired: true,
  },
};

export const DisabledOptions: Story = {
  args: {
    label: 'Plan',
    options: [
      { value: 'free', label: 'Free Plan' },
      { value: 'pro', label: 'Pro Plan', disabled: true },
      { value: 'enterprise', label: 'Enterprise Plan' },
    ],
    defaultValue: 'free',
  },
};
