import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

/**
 * Collapsible panels for presenting hierarchical or grouped information.
 */
const meta: Meta<typeof Accordion> = {
  title: 'Galyan UI/Accordion',
  component: Accordion,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 550 }}><Story /></div>],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['default', 'bordered', 'flush', 'separated'] },
    disabled: { control: 'boolean' },
    defaultExpanded: { control: 'boolean' },
    expanded: { control: 'boolean' },
    unmountOnExit: { control: 'boolean' },
    expandIconPosition: { control: 'inline-radio', options: ['left', 'right'] },
    title: { control: 'text' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'What is Galyan UI?',
    children: 'Galyan UI is a modern, accessible React component library built with design tokens and high-performance CSS.',
    defaultExpanded: true,
    size: 'md',
    variant: 'default',
    expandIconPosition: 'right',
  },
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem' }}>Bordered Group</h4>
        <Accordion
          {...args}
          variant="bordered"
          items={[
            { id: '1', title: 'First Section', content: 'Content for the first section in a bordered group.' },
            { id: '2', title: 'Second Section', content: 'Content for the second section in a bordered group.' },
          ]}
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem' }}>Separated Group</h4>
        <Accordion
          {...args}
          variant="separated"
          items={[
            { id: '1', title: 'Payment Method', content: 'Manage your credit card and payment details here.' },
            { id: '2', title: 'Billing Address', content: 'Set your primary billing and invoice address.' },
          ]}
        />
      </div>
    </div>
  ),
};
