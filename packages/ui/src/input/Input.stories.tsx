import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const meta: Meta<typeof Input> = {
  title: 'Galyan UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label text above the input' },
    placeholder: { control: 'text', description: 'Placeholder text' },
    helperText: { control: 'text', description: 'Helper text below the input' },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      table: { type: { summary: 'sm | md | lg' }, defaultValue: { summary: 'md' } },
    },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'focused', 'error', 'success', 'disabled'],
      table: { type: { summary: 'default | filled | focused | error | success | disabled' }, defaultValue: { summary: 'default' } },
    },
    type: { control: 'text', description: 'Input type (text, password, email, etc.)' },
    fullWidth: { control: 'boolean' },
    required: { control: 'boolean' },
    hasError: { control: 'boolean' },
    hasSuccess: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    isFocused: { control: 'boolean' },
    disableBorderEffects: { control: 'boolean', description: 'Disables the focus ring and border color change' },
    borderRadius: { control: 'text', description: 'Custom border radius CSS value' },
    clearable: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    helperText: 'Must be unique across your organization',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Input label="Small" size="sm" placeholder="Small input" />
      <Input label="Medium (Default)" size="md" placeholder="Medium input" />
      <Input label="Large" size="lg" placeholder="Large input" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Input label="Default" variant="default" placeholder="Default variant" />
      <Input label="Filled" variant="filled" placeholder="Filled variant" />
      <Input label="Focused" variant="focused" placeholder="Always focused variant" />
      <Input label="Error" variant="error" placeholder="Error variant" helperText="This field has an error" />
      <Input label="Success" variant="success" placeholder="Success variant" helperText="Looks good!" hasSuccess />
      <Input label="Disabled" variant="disabled" placeholder="Disabled variant" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Input
        label="Search"
        placeholder="Search anything…"
        leftIcon={<SearchIcon />}
      />
      <Input
        label="Email"
        placeholder="you@example.com"
        type="email"
        leftIcon={<MailIcon />}
      />
      <Input
        label="Password"
        placeholder="Enter password"
        type="password"
        leftIcon={<LockIcon />}
        rightIcon={<EyeIcon />}
        onRightIconClick={() => alert('Toggle visibility!')}
      />
    </div>
  ),
};

export const ErrorState: Story = {
  args: {
    label: 'Email Address',
    value: 'invalid-email',
    hasError: true,
    helperText: 'Please enter a valid email address.',
    leftIcon: <MailIcon />,
  },
};

export const SuccessState: Story = {
  args: {
    label: 'Username',
    value: 'available_user',
    hasSuccess: true,
    helperText: 'This username is available!',
    rightIcon: <CheckCircleIcon />,
  },
};

export const ClearableDemo: Story = {
  render: () => {
    const [val, setVal] = useState('Type to search...');
    return (
      <Input
        label="Search"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        clearable
        onClear={() => setVal('')}
        leftIcon={<SearchIcon />}
      />
    );
  },
};

export const CustomBorderRadius: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Input label="Default Radius" placeholder="Standard corners" />
      <Input label="Full Round" placeholder="Pill shape" borderRadius="9999px" />
      <Input label="Sharp Corners" placeholder="No rounding" borderRadius="0" />
      <Input label="Extra Round" placeholder="1rem radius" borderRadius="1rem" />
    </div>
  ),
};

export const DisabledBorderEffects: Story = {
  args: {
    label: 'No Focus Ring',
    placeholder: 'Click me — no ring effect',
    disableBorderEffects: true,
    helperText: 'Border effects are disabled on this input',
  },
};

export const RequiredField: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
    helperText: 'This field is required',
  },
};

export const FilledVariant: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return (
      <Input
        label="Notes"
        variant="filled"
        placeholder="Start typing here…"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        helperText="This uses the filled style variant"
      />
    );
  },
};
