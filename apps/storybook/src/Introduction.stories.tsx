import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const IntroductionDoc = () => (
  <div style={{ maxWidth: 800, fontFamily: 'system-ui, sans-serif', color: '#0f172a', lineHeight: 1.6, padding: '1rem' }}>
    <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem', color: '#10b981' }}>
      Welcome to Galyan UI
    </h1>
    <p style={{ fontSize: '1.125rem', color: '#64748b', marginBottom: '2rem' }}>
      Galyan UI is a comprehensive, enterprise-grade React component library designed with modern aesthetics, dark mode support, fluid typography, and accessible interactive patterns.
    </p>

    <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
      <h3 style={{ margin: '0 0 0.75rem', fontSize: '1.125rem' }}>🚀 Quick Installation</h3>
      <pre style={{ background: '#0f172a', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', margin: 0 }}>
        <code>pnpm add @galyan/ui @galyan/theme</code>
      </pre>
    </div>

    <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
      <h3 style={{ margin: '0 0 0.75rem', fontSize: '1.125rem' }}>📦 Usage</h3>
      <pre style={{ background: '#0f172a', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', margin: 0 }}>
        <code>{`import { Button, Card, DatePicker } from '@galyan/ui';
import '@galyan/theme/css/variables';
import '@galyan/ui/styles.css';

export function App() {
  return (
    <Card padding="lg" shadow="md">
      <DatePicker label="Select Date" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}`}</code>
      </pre>
    </div>

    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>✨ Key Features</h3>
    <ul style={{ paddingLeft: '1.25rem', color: '#334155' }}>
      <li style={{ marginBottom: '0.5rem' }}><strong>Design Tokens:</strong> Harmonious color palettes, customer/professional/agent/admin roles, dark mode.</li>
      <li style={{ marginBottom: '0.5rem' }}><strong>Accessible:</strong> Full keyboard navigation, ARIA attributes, and 0 type errors across all packages.</li>
      <li style={{ marginBottom: '0.5rem' }}><strong>Interactive Controls:</strong> Live control manipulation for all component props in Storybook.</li>
      <li style={{ marginBottom: '0.5rem' }}><strong>30+ Components:</strong> Input, Button, Card, Modal, DatePicker, Table, Chart, and many more.</li>
    </ul>

    <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.75rem' }}>📚 Browse Components</h3>
    <p style={{ color: '#475569' }}>
      Use the sidebar to explore all components under <strong>Galyan UI</strong>. Each component has a <strong>Docs</strong> tab with auto-generated API reference and interactive controls.
    </p>
  </div>
);

const meta: Meta = {
  title: 'INTRODUCTION/Welcome',
  component: IntroductionDoc,
  parameters: {
    layout: 'padded',
    docs: { disable: true },
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
