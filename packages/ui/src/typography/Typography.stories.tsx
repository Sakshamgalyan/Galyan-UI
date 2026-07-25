import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';
import React from 'react';

const meta: Meta<typeof Typography> = {
  title: 'Galyan UI/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'label', 'small'],
      description: 'Typography variant element & scale preset',
      table: {
        type: { summary: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label' | 'small'" },
        defaultValue: { summary: "'p'" },
      },
    },
    weight: {
      control: 'select',
      options: ['light', 'normal', 'medium', 'semibold', 'bold', 'extrabold'],
      description: 'Font weight specification',
      table: {
        type: { summary: "'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'" },
      },
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
      table: {
        type: { summary: "'left' | 'center' | 'right' | 'justify'" },
      },
    },
    margin: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Bottom margin spacing preset',
      table: {
        type: { summary: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: "'none'" },
      },
    },
    textColor: {
      control: 'color',
      description: 'Custom text color hex/rgb',
      table: { type: { summary: 'string' } },
    },
    bgColor: {
      control: 'color',
      description: 'Custom background color hex/rgb',
      table: { type: { summary: 'string' } },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names for custom styling override',
      table: { type: { summary: 'string' } },
    },
    children: {
      control: 'text',
      description: 'Text content',
      table: { type: { summary: 'ReactNode' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: 'Interactive Typography Component',
    variant: 'p',
    weight: 'normal',
    align: 'left',
    margin: 'none',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Typography variant="h1">Heading 1 (h1)</Typography>
      <Typography variant="h2">Heading 2 (h2)</Typography>
      <Typography variant="h3">Heading 3 (h3)</Typography>
      <Typography variant="h4">Heading 4 (h4)</Typography>
      <Typography variant="h5">Heading 5 (h5)</Typography>
      <Typography variant="h6">Heading 6 (h6)</Typography>
      <Typography variant="p">Paragraph text element (p)</Typography>
      <Typography variant="span">Span inline element (span)</Typography>
      <Typography variant="label">Form Label element (label)</Typography>
      <Typography variant="small">Small text element (small)</Typography>
    </div>
  ),
};

export const WeightsAndAlignments: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Typography variant="p" weight="light">Light weight (300)</Typography>
      <Typography variant="p" weight="normal">Normal weight (400)</Typography>
      <Typography variant="p" weight="medium">Medium weight (500)</Typography>
      <Typography variant="p" weight="semibold">Semibold weight (600)</Typography>
      <Typography variant="p" weight="bold">Bold weight (700)</Typography>
      <Typography variant="p" weight="extrabold">Extrabold weight (800)</Typography>
      <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '1rem 0' }} />
      <Typography variant="p" align="left">Left aligned text</Typography>
      <Typography variant="p" align="center">Center aligned text</Typography>
      <Typography variant="p" align="right">Right aligned text</Typography>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Typography variant="h3" textColor="#f43f5e">Custom Rose Text Color</Typography>
      <Typography variant="p" textColor="#0284c7" bgColor="#e0f2fe" style={{ padding: '0.5rem 1rem', borderRadius: '6px' }}>
        Custom Blue Text with Sky Blue Background
      </Typography>
      <Typography variant="p" as="div" weight="semibold" textColor="#10b981">
        Rendered as HTML &lt;div&gt; element via <code>as="div"</code>
      </Typography>
    </div>
  ),
};
