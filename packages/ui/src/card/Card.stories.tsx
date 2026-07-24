import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardFooter, CardInfo } from './Card';
import { Button } from '../button/Button';
import React from 'react';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const DefaultNeumorphic: Story = {
  render: () => (
    <Card style={{ maxWidth: '400px' }}>
      <CardHeader>
        <h3 style={{ margin: 0 }}>Neumorphic Card</h3>
      </CardHeader>
      <CardBody>
        Soft raised surface elevation built with Galyan design system neumorphism guidelines.
      </CardBody>
      <CardFooter style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
        <Button variant="solid" size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const CardInfoDemo: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', maxWidth: '800px' }}>
      <CardInfo title="Total Revenue" value="$45,231.89" trend={{ value: 12.5, label: 'vs last month' }} />
      <CardInfo title="Active Users" value="+2,350" trend={{ value: -3.2, label: 'vs last week' }} />
    </div>
  ),
};
