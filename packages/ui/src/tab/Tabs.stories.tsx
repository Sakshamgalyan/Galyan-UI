import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Galyan UI/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 500 }}><Story /></div>],
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

const demoItems = [
  { id: 'overview', label: 'Overview', content: <p>Overview content goes here. This is the main dashboard view.</p> },
  { id: 'analytics', label: 'Analytics', badge: 3, content: <p>Analytics data and charts would render in this panel.</p> },
  { id: 'reports', label: 'Reports', content: <p>Report generation tools and export options live here.</p> },
  { id: 'settings', label: 'Settings', disabled: true, content: <p>Settings (disabled)</p> },
];

export const Classic: Story = { args: { items: demoItems, variant: 'classic' } };
export const Card: Story = { args: { items: demoItems, variant: 'card' } };
export const Button: Story = { args: { items: demoItems, variant: 'button' } };

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Tabs items={demoItems} variant="classic" size="sm" />
      <Tabs items={demoItems} variant="card" size="md" />
      <Tabs items={demoItems} variant="button" size="lg" />
    </div>
  ),
};

export const FullWidth: Story = {
  args: { items: demoItems, variant: 'card', fullWidth: true },
};
