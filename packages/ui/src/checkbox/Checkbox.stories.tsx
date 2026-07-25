import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Galyan UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the checkbox',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    color: {
      control: 'radio',
      options: ['primary', 'error'],
      description: 'Color theme of the checkbox',
      table: {
        type: { summary: 'primary | error' },
        defaultValue: { summary: 'primary' },
      },
    },
    variant: {
      control: 'radio',
      options: ['solid', 'outline', 'soft'],
      description: 'The variant style of the checkbox',
      table: {
        type: { summary: 'solid | outline | soft' },
        defaultValue: { summary: 'solid' },
      },
    },
    label: {
      control: 'text',
      description: 'Text label displayed next to the checkbox',
    },
    checked: {
      control: 'boolean',
      description: 'Controlled checked state',
    },
    indeterminate: {
      control: 'boolean',
      description: 'If true, renders the checkbox in an indeterminate state',
    },
    isDisabled: {
      control: 'boolean',
      description: 'If true, the checkbox will be disabled',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper for interactive states in Storybook
const InteractiveCheckbox = (args: any) => {
  const [checked, setChecked] = useState(args.checked || false);
  return (
    <Checkbox
      {...args}
      checked={args.checked !== undefined ? args.checked : checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
  render: (args) => <InteractiveCheckbox {...args} />,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <InteractiveCheckbox size="sm" label="Small checkbox" />
      <InteractiveCheckbox size="md" label="Medium checkbox" />
      <InteractiveCheckbox size="lg" label="Large checkbox" />
    </div>
  ),
};

export const ColorsAndVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <strong>Primary</strong>
        <InteractiveCheckbox color="primary" variant="solid" label="Solid" checked />
        <InteractiveCheckbox color="primary" variant="outline" label="Outline" checked />
        <InteractiveCheckbox color="primary" variant="soft" label="Soft" checked />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <strong>Error</strong>
        <InteractiveCheckbox color="error" variant="solid" label="Solid" checked />
        <InteractiveCheckbox color="error" variant="outline" label="Outline" checked />
        <InteractiveCheckbox color="error" variant="soft" label="Soft" checked />
      </div>
    </div>
  ),
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all',
    indeterminate: true,
  },
  render: (args) => <InteractiveCheckbox {...args} />,
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox label="Disabled unchecked" isDisabled />
      <Checkbox label="Disabled checked" isDisabled checked />
      <Checkbox label="Disabled indeterminate" isDisabled indeterminate />
    </div>
  ),
};
