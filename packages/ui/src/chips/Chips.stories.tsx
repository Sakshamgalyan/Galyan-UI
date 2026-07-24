import type { Meta, StoryObj } from '@storybook/react';
import { Chip, ChipsInput } from './Chips';
import React, { useState } from 'react';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Chip variant="solid">Solid</Chip>
      <Chip variant="soft">Soft</Chip>
      <Chip variant="outline">Outline</Chip>
      <Chip variant="success">Success</Chip>
      <Chip variant="warning">Warning</Chip>
      <Chip variant="danger">Danger</Chip>
      <Chip variant="neutral">Neutral</Chip>
    </div>
  ),
};

export const Removable: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem' }}>
      <Chip variant="soft" removable onRemove={() => alert('Removed')}>React</Chip>
      <Chip variant="solid" removable onRemove={() => alert('Removed')}>TypeScript</Chip>
      <Chip variant="outline" removable onRemove={() => alert('Removed')}>Neumorphic</Chip>
    </div>
  ),
};

export const ChipsInputDemo: Story = {
  render: () => {
    const [tags, setTags] = useState(['React', 'TypeScript', 'UI Library']);
    return (
      <div style={{ maxWidth: '400px' }}>
        <ChipsInput values={tags} onChange={setTags} placeholder="Add technologies..." />
      </div>
    );
  },
};
