import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import React, { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    helperText: 'Must be unique across your organization',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    value: 'invalid-email',
    error: 'Please enter a valid email address.',
  },
};

export const ClearableDemo: Story = {
  render: () => {
    const [val, setVal] = useState('Type to search...');
    return (
      <div style={{ maxWidth: '400px' }}>
        <Input
          label="Search"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          clearable
          onClear={() => setVal('')}
        />
      </div>
    );
  },
};
