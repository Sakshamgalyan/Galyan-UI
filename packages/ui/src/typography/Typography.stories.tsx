import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';
import React from 'react';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Headings: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Typography variant="h1">Heading 1 — 2.25rem</Typography>
      <Typography variant="h2">Heading 2 — 1.75rem</Typography>
      <Typography variant="h3">Heading 3 — 1.375rem</Typography>
      <Typography variant="h4">Heading 4 — 1.125rem</Typography>
    </div>
  ),
};

export const BodyVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Typography variant="body-lg">Body Large — Clean readable body font built for modern interfaces.</Typography>
      <Typography variant="body-md">Body Medium — Standard body text style in Galyan design tokens.</Typography>
      <Typography variant="body-sm">Body Small — Secondary descriptions and supporting card copy.</Typography>
    </div>
  ),
};
