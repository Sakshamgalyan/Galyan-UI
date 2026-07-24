import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '@galyan/ui';
import React from 'react';

const meta: Meta<typeof Spinner> = {
  title: 'Galyan UI/Spinner',
  component: Spinner,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: 'md',
    color: 'primary',
  },
};

export const WithLabel: Story = {
  args: {
    size: 'md',
    color: 'primary',
    label: 'Loading workspace details...',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};
