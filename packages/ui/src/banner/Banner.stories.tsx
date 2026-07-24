import type { Meta, StoryObj } from '@storybook/react';
import { Banner } from './Banner';
import React from 'react';

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Update Available',
    children: 'A new software update is available for your application.',
    dismissible: true,
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Order Confirmed',
    children: 'Your payment was processed successfully.',
    dismissible: true,
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Storage Nearly Full',
    children: 'You are using 95% of your available storage quota.',
    dismissible: true,
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    title: 'Connection Error',
    children: 'Failed to reach the authentication service.',
    dismissible: true,
  },
};
