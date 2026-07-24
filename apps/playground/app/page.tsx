'use client';

import { useTheme } from '@galyan/theme';
import { 
  Button, Typography, Card, Input, Checkbox, 
  RadioGroup, Toggle, Spinner, Skeleton, ProgressBar, 
  Banner, Accordion, ChipsInput, Tabs, Modal,
  useToast
} from '@galyan/ui';
import { useState } from 'react';

export default function Home() {
  const { role, setRole } = useTheme();
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [chips, setChips] = useState<string[]>(['React', 'Next.js']);
  const [progress, setProgress] = useState(30);

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <Typography variant="h1">Galyan UI Playground</Typography>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Button as="a" href="/button" variant="neumorphic">
            Go to /button Showcase ⚡
          </Button>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Typography variant="body-md" color="muted">Role Theme:</Typography>
            <Toggle 
              checked={role === 'professional'} 
              onChange={(c) => setRole(c ? 'professional' : 'customer')} 
              label="Professional"
            />
          </div>
        </div>
      </header>

      <section>
        <Typography variant="h2" style={{ marginBottom: '1rem' }}>Typography & Buttons</Typography>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="solid" onClick={() => toast({ title: 'Action successful!', variant: 'success' })}>Primary Button</Button>
          <Button variant="soft">Secondary Button</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </section>

      <section>
        <Typography variant="h2" style={{ marginBottom: '1rem' }}>Forms & Inputs</Typography>
        <Card style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input label="Email Address" placeholder="you@example.com" />
          <Input label="Password" type="password" placeholder="••••••••" helperText="Must be at least 8 characters" />
          <Checkbox label="I agree to the terms and conditions" />
          <RadioGroup 
            name="plan"
            options={[
              { value: 'basic', label: 'Basic Plan ($10/mo)' },
              { value: 'pro', label: 'Pro Plan ($20/mo)' }
            ]}
            value="basic"
          />
          <Toggle label="Enable notifications" checked />
          
          <Typography variant="label" style={{ marginTop: '0.5rem' }}>Skills (Chips)</Typography>
          <ChipsInput values={chips} onChange={setChips} placeholder="Type and press enter..." />
        </Card>
      </section>

      <section>
        <Typography variant="h2" style={{ marginBottom: '1rem' }}>Feedback & Loaders</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Banner variant="info" title="System Update" description="We are rolling out a new update tonight." dismissible />
          <Banner variant="warning" title="Warning" description="Your subscription is about to expire." />
          
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Spinner size="md" />
            <div style={{ flex: 1, maxWidth: '300px' }}>
              <ProgressBar value={progress} label="Uploading..." />
              <Button size="sm" onClick={() => setProgress(p => Math.min(100, p + 10))} style={{ marginTop: '0.5rem' }}>
                Increase Progress
              </Button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
              <Skeleton width="100%" height="20px" />
              <Skeleton width="80%" height="20px" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <Typography variant="h2" style={{ marginBottom: '1rem' }}>Overlays & Complex</Typography>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
        </div>

        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Example Modal">
          <Typography variant="body-md" style={{ marginBottom: '1.5rem' }}>
            This is a modal built with Galyan UI. You can put forms, details, or confirmations here.
          </Typography>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="solid" onClick={() => setModalOpen(false)}>Confirm</Button>
          </div>
        </Modal>

        <div style={{ marginTop: '2rem' }}>
          <Tabs 
            items={[
              { id: 'tab1', label: 'Overview', content: <div style={{ padding: '1rem' }}>Overview content...</div> },
              { id: 'tab2', label: 'Settings', content: <div style={{ padding: '1rem' }}>Settings content...</div> }
            ]}
          />
        </div>

        <div style={{ marginTop: '2rem' }}>
          <Accordion 
            items={[
              { id: 'faq1', title: 'What is this?', content: 'This is the Galyan UI Playground.' },
              { id: 'faq2', title: 'How do I use it?', content: 'Just import components from @galyan/ui.' }
            ]}
          />
        </div>
      </section>
      
    </main>
  );
}
