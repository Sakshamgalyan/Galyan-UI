import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Banner } from './Banner';

/**
 * Prominent contextual feedback messages, alerts, and system notices.
 */
const meta: Meta<typeof Banner> = {
  title: 'Galyan UI/Banner',
  component: Banner,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 620 }}><Story /></div>],
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'danger', 'neutral'] },
    bannerStyle: { control: 'select', options: ['subtle', 'solid', 'outline'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    title: { control: 'text' },
    description: { control: 'text' },
    fullWidth: { control: 'boolean' },
    bordered: { control: 'boolean' },
    dismissible: { control: 'boolean' },
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'System Maintenance Scheduled',
    description: 'We will be performing routine server maintenance on Sunday at 02:00 UTC.',
    variant: 'info',
    bannerStyle: 'subtle',
    size: 'md',
    fullWidth: true,
    bordered: true,
    dismissible: true,
  },
};

export const SolidStyle: Story = {
  args: {
    title: 'Subscription Expiring Soon',
    description: 'Your pro plan subscription will expire in 3 days.',
    variant: 'warning',
    bannerStyle: 'solid',
    dismissible: true,
  },
};
