import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';
import React from 'react';

const meta: Meta<typeof Skeleton> = {
  title: 'Galyan UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular'],
      description: 'Skeleton element shape variant',
      table: {
        type: { summary: "'text' | 'circular' | 'rectangular'" },
        defaultValue: { summary: "'text'" },
      },
    },
    width: {
      control: 'text',
      description: 'Custom width specification (e.g. "100%", "48px", "200px")',
      table: { type: { summary: 'string' } },
    },
    height: {
      control: 'text',
      description: 'Custom height specification (e.g. "20px", "48px", "120px")',
      table: { type: { summary: 'string' } },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names for custom styling override',
      table: { type: { summary: 'string' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    variant: 'text',
    width: '100%',
    height: '20px',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '400px' }}>
      <div>
        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Text Variant:</span>
        <Skeleton variant="text" />
      </div>
      <div>
        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Circular Variant:</span>
        <Skeleton variant="circular" width="48px" height="48px" />
      </div>
      <div>
        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Rectangular Variant:</span>
        <Skeleton variant="rectangular" height="120px" />
      </div>
    </div>
  ),
};

export const CardSkeletonComposition: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '12px', maxWidth: '400px' }}>
      <Skeleton variant="circular" width="56px" height="56px" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Skeleton variant="text" width="60%" height="18px" />
        <Skeleton variant="text" width="90%" height="14px" />
      </div>
    </div>
  ),
};
