import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';

/**
 * Feature-rich select dropdown supporting search, multi-selection, select-all, grouping, custom option rendering, and portal popovers.
 */
const meta: Meta<typeof Dropdown> = {
  title: 'Galyan UI/Dropdown',
  component: Dropdown,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 380, minHeight: 320 }}><Story /></div>],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    multiple: { control: 'boolean' },
    searchable: { control: 'boolean' },
    searchPlaceholder: { control: 'text' },
    clearable: { control: 'boolean' },
    loading: { control: 'boolean' },
    hasError: { control: 'boolean' },
    hasSuccess: { control: 'boolean' },
    showSelectAll: { control: 'boolean' },
    maxTagCount: { control: 'number' },
    placement: { control: 'inline-radio', options: ['top', 'bottom'] },
    align: { control: 'inline-radio', options: ['left', 'right'] },
    dropdownWidth: { control: 'text' },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const demoOptions = [
  { value: 'react', label: 'React.js', group: 'Frontend' },
  { value: 'vue', label: 'Vue.js', group: 'Frontend' },
  { value: 'angular', label: 'Angular', group: 'Frontend' },
  { value: 'node', label: 'Node.js', group: 'Backend' },
  { value: 'python', label: 'Python (FastAPI)', group: 'Backend' },
  { value: 'go', label: 'Go (Golang)', group: 'Backend' },
];

export const Default: Story = {
  args: {
    label: 'Select Tech Stack',
    placeholder: 'Select an option',
    options: demoOptions,
    size: 'md',
    clearable: true,
    searchable: false,
    disabled: false,
    required: false,
    multiple: false,
  },
  render: (args) => {
    const [val, setVal] = useState('react');
    return <Dropdown {...args} value={val} onChange={setVal} />;
  },
};

export const MultiSelectWithSelectAll: Story = {
  args: {
    label: 'Select Frameworks',
    options: demoOptions,
    multiple: true,
    showSelectAll: true,
    searchable: true,
    clearable: true,
  },
  render: (args) => {
    const [val, setVal] = useState<string[]>(['react', 'node']);
    return <Dropdown {...args} value={val} onChange={setVal} />;
  },
};

export const MultiSelectWithTagRemoval: Story = {
  args: {
    label: 'Selected Technologies (Click × on tag to remove)',
    options: demoOptions,
    multiple: true,
    clearable: true,
    maxTagCount: 4,
  },
  render: (args) => {
    const [val, setVal] = useState<string[]>(['react', 'vue', 'node', 'python']);
    return <Dropdown {...args} value={val} onChange={setVal} />;
  },
};

export const SearchableAndGrouped: Story = {
  args: {
    label: 'Categorized Searchable Dropdown',
    options: demoOptions,
    searchable: true,
    searchPlaceholder: 'Search frameworks or languages...',
    groupBy: 'group',
    clearable: true,
  },
  render: (args) => {
    const [val, setVal] = useState('');
    return <Dropdown {...args} value={val} onChange={setVal} />;
  },
};

export const LoadingAndErrorStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Dropdown
        label="Loading Options..."
        loading
        placeholder="Fetching data from API..."
        options={[]}
      />
      <Dropdown
        label="Invalid Field"
        options={demoOptions}
        hasError
        error="Please choose a valid framework option"
        required
      />
    </div>
  ),
};
