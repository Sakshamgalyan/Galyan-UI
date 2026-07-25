import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Galyan UI/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'] },
    variant: { control: 'select', options: ['default', 'sidebar', 'compact', 'fullscreen'] },
    position: { control: 'inline-radio', options: ['center', 'top', 'bottom'] },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    confirmText: { control: 'text' },
    cancelText: { control: 'text' },
    showCloseButton: { control: 'boolean' },
    closable: { control: 'boolean' },
    preventBackdropClose: { control: 'boolean' },
  },
} satisfies Meta<typeof Modal>;
export default meta;
type Story = StoryObj<typeof meta>;

const ModalDemo = ({ variant = 'default', size = 'md', position = 'center' }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open {variant} modal
      </Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Confirm Action"
        subtitle="This action cannot be undone."
        size={size}
        variant={variant}
        position={position}
        cancelText="Cancel"
        confirmText="Confirm Action"
        onConfirm={() => setOpen(false)}
      >
        <p style={{ margin: 0, color: '#64748b' }}>
          Are you sure you want to proceed? This will permanently delete the selected items from your account.
        </p>
      </Modal>
    </>
  );
};

export const Default: Story = { render: () => <ModalDemo /> };
export const Sidebar: Story = { render: () => <ModalDemo variant="sidebar" /> };
export const Compact: Story = { render: () => <ModalDemo variant="compact" size="sm" /> };
export const Fullscreen: Story = { render: () => <ModalDemo variant="fullscreen" /> };
export const TopPosition: Story = { render: () => <ModalDemo position="top" /> };
