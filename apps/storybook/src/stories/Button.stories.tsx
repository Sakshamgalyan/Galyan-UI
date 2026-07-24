import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@galyan/ui';
import React from 'react';

const meta: Meta<typeof Button> = {
  title: 'Galyan UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'success',
        'warning',
        'danger',
        'danger-soft',
        'soft',
        'ghost',
        'link',
      ],
      description: 'Enterprise button variant preset',
      table: {
        type: {
          summary:
            "'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'danger-soft' | 'soft' | 'ghost' | 'link'",
        },
        defaultValue: { summary: "'primary'" },
      },
    },
    outline: {
      control: 'boolean',
      description: 'Render outlined styling for the selected variant',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Button size preset',
      table: {
        type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: "'md'" },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Show loading spinner state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button interactions',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretch to full width of parent container',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names for custom styling override',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: 'text',
      description: 'Button label content',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Action',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Soft Action',
    variant: 'secondary',
    size: 'md',
  },
};

export const Tertiary: Story = {
  args: {
    children: 'Tertiary Neutral Gray',
    variant: 'tertiary',
    size: 'md',
  },
};

export const Success: Story = {
  args: {
    children: 'Success Action',
    variant: 'success',
    size: 'md',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning Action',
    variant: 'warning',
    size: 'md',
  },
};

export const Danger: Story = {
  args: {
    children: 'Delete Account',
    variant: 'danger',
    size: 'md',
  },
};

export const DangerSoft: Story = {
  args: {
    children: 'Remove Item',
    variant: 'danger-soft',
    size: 'md',
  },
};

export const PrimaryOutline: Story = {
  args: {
    children: 'Primary Outlined',
    variant: 'primary',
    outline: true,
  },
};

export const SecondaryOutline: Story = {
  args: {
    children: 'Secondary Outlined',
    variant: 'secondary',
    outline: true,
  },
};

export const SuccessOutline: Story = {
  args: {
    children: 'Success Outlined',
    variant: 'success',
    outline: true,
  },
};

export const WarningOutline: Story = {
  args: {
    children: 'Warning Outlined',
    variant: 'warning',
    outline: true,
  },
};

export const DangerOutline: Story = {
  args: {
    children: 'Danger Red Outlined',
    variant: 'danger',
    outline: true,
  },
};

export const DangerSoftOutline: Story = {
  args: {
    children: 'Danger Soft Outlined',
    variant: 'danger-soft',
    outline: true,
  },
};

export const Soft: Story = {
  args: {
    children: 'Soft Accent',
    variant: 'soft',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Action',
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    children: 'Learn More',
    variant: 'link',
  },
};

export const EnterpriseShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem', width: '100%', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
        <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Standard Filled Variants
        </h4>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button variant="primary">Primary (Green)</Button>
          <Button variant="secondary">Secondary (Teal Soft)</Button>
          <Button variant="tertiary">Tertiary (Gray)</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="danger-soft">Danger Soft</Button>
          <Button variant="soft">Soft Tint</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
        <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Context-Aware Outlined Variants (outline=true)
        </h4>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button variant="primary" outline>Primary Outline</Button>
          <Button variant="secondary" outline>Secondary Outline</Button>
          <Button variant="tertiary" outline>Tertiary Outline</Button>
          <Button variant="success" outline>Success Outline</Button>
          <Button variant="warning" outline>Warning Outline</Button>
          <Button variant="danger" outline>Danger Outline</Button>
          <Button variant="danger-soft" outline>Danger Soft Outline</Button>
          <Button variant="soft" outline>Soft Outline</Button>
        </div>
      </div>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    children: 'Saving Changes...',
    variant: 'primary',
    isLoading: true,
    loadingText: 'Saving...',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
      <Button size="xs" variant="primary">Extra Small</Button>
      <Button size="sm" variant="primary">Small</Button>
      <Button size="md" variant="primary">Medium</Button>
      <Button size="lg" variant="primary">Large</Button>
      <Button size="xl" variant="primary">Extra Large</Button>
    </div>
  ),
};

export const CustomStylingWithClassName: Story = {
  args: {
    children: 'Custom Gradient Button',
    className: 'custom-btn-example',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`
        .custom-btn-example {
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%) !important;
          color: #ffffff !important;
          border-radius: 9999px !important;
          padding: 0 2rem !important;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4) !important;
          transition: all 0.2s ease-in-out !important;
        }
        .custom-btn-example:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.55) !important;
        }
      `}</style>
      <Button {...args} />
      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
        Custom styled using: <code>className="custom-btn-example"</code>
      </span>
    </div>
  ),
};

export const TailwindCSSStyling: Story = {
  args: {
    children: 'Tailwind Styled Button',
    className: 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-full px-6 py-2 shadow-lg shadow-indigo-500/30 active:scale-95 transition-all duration-200',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center', justifyContent: 'center' }}>
      <Button {...args} />
      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
        Tailwind utility classes passed directly via <code>className</code>
      </span>
    </div>
  ),
};

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const IconOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <Button variant="primary" leftIcon={<PlusIcon />} aria-label="Add item" />
        <Button variant="secondary" leftIcon={<PlusIcon />} aria-label="Add item" />
        <Button variant="tertiary" leftIcon={<PlusIcon />} aria-label="Add item" />
        <Button variant="danger" leftIcon={<PlusIcon />} aria-label="Add item" />
        <Button variant="primary" outline leftIcon={<PlusIcon />} aria-label="Add item" />
      </div>
      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
        Icon-only button rendered via <code>{'<Button leftIcon={<Icon />} />'}</code> (without children)
      </span>
    </div>
  ),
};
