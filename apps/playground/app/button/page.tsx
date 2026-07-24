'use client';

import { useTheme, type ThemeRole, type ColorMode } from '@galyan/theme';
import { Button, Typography, useToast } from '@galyan/ui';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

// SVG Icon components for demo
function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export default function ButtonShowcasePage() {
  const { role, setRole, colorMode, setColorMode } = useTheme();
  const { toast } = useToast();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [clickCount, setClickCount] = useState(0);
  const [asyncLoading, setAsyncLoading] = useState(false);

  const handleSimulateAsync = () => {
    setAsyncLoading(true);
    setTimeout(() => {
      setAsyncLoading(false);
      toast({ title: 'Operation Completed!', variant: 'success' });
    }, 2000);
  };

  return (
    <main className={styles.container}>
      {/* ── Page Header ───────────────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div>
          <Typography variant="h1">Button Component Showcase ⚡</Typography>
          <Typography variant="body-md" color="muted" style={{ marginTop: '0.25rem' }}>
            Neumorphic default styling with 4-role theme system & dark mode support
          </Typography>
        </div>

        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <Typography variant="label">Theme Role:</Typography>
            <select
              className={styles.roleSelect}
              value={mounted ? role : 'customer'}
              onChange={(e) => setRole(e.target.value as ThemeRole)}
            >
              <option value="customer">Customer (Green)</option>
              <option value="professional">Professional (Blue)</option>
              <option value="agent">Agent (Coral/Red)</option>
              <option value="admin">Admin (Indigo)</option>
            </select>
          </div>

          <div className={styles.controlGroup}>
            <Typography variant="label">Color Mode:</Typography>
            <Button
              size="sm"
              variant="neumorphic"
              onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}
            >
              {mounted && colorMode === 'dark' ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
            </Button>
          </div>
        </div>
      </header>

      {/* ── 1. Default Neumorphic Button ──────────────────────────────────────── */}
      <section className={styles.section}>
        <Typography variant="h2">1. Default Variant (Neumorphic)</Typography>
        <Typography variant="body-sm" color="muted">
          By default, <code>&lt;Button /&gt;</code> renders with a soft raised neumorphic shadow that sinks on active click.
        </Typography>

        <div className={styles.card}>
          <div className={styles.row}>
            <div className={styles.itemCol}>
              <Button onClick={() => setClickCount((c) => c + 1)}>
                Default Neumorphic Button
              </Button>
              <span className={styles.label}>Default: variant=&quot;neumorphic&quot;</span>
            </div>

            <div className={styles.itemCol}>
              <Button leftIcon={<HeartIcon />} onClick={() => setClickCount((c) => c + 1)}>
                Like App
              </Button>
              <span className={styles.label}>With leftIcon</span>
            </div>

            <div className={styles.itemCol}>
              <Button rightIcon={<ArrowRightIcon />} onClick={() => setClickCount((c) => c + 1)}>
                Continue
              </Button>
              <span className={styles.label}>With rightIcon</span>
            </div>
          </div>

          <Typography variant="body-sm" style={{ color: 'var(--gy-primary)', fontWeight: 600 }}>
            Click Count (onClick handler demo): {clickCount}
          </Typography>
        </div>
      </section>

      {/* ── 2. All Variants ────────────────────────────────────────────────────── */}
      <section className={styles.section}>
        <Typography variant="h2">2. All Style Variants</Typography>
        <Typography variant="body-sm" color="muted">
          All legacy variants (solid, outline, ghost, soft, link, danger) are fully supported alongside neumorphic.
        </Typography>

        <div className={styles.card}>
          <div className={styles.row}>
            <div className={styles.itemCol}>
              <Button variant="neumorphic">Neumorphic</Button>
              <span className={styles.label}>variant=&quot;neumorphic&quot;</span>
            </div>

            <div className={styles.itemCol}>
              <Button variant="solid">Solid Primary</Button>
              <span className={styles.label}>variant=&quot;solid&quot;</span>
            </div>

            <div className={styles.itemCol}>
              <Button variant="outline">Outline</Button>
              <span className={styles.label}>variant=&quot;outline&quot;</span>
            </div>

            <div className={styles.itemCol}>
              <Button variant="soft">Soft Subtle</Button>
              <span className={styles.label}>variant=&quot;soft&quot;</span>
            </div>

            <div className={styles.itemCol}>
              <Button variant="ghost">Ghost</Button>
              <span className={styles.label}>variant=&quot;ghost&quot;</span>
            </div>

            <div className={styles.itemCol}>
              <Button variant="danger">Danger</Button>
              <span className={styles.label}>variant=&quot;danger&quot;</span>
            </div>

            <div className={styles.itemCol}>
              <Button variant="link">Text Link</Button>
              <span className={styles.label}>variant=&quot;link&quot;</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Outline Shorthand ────────────────────────────────────────────────── */}
      <section className={styles.section}>
        <Typography variant="h2">3. Convenience Prop: <code>outline</code></Typography>
        <Typography variant="body-sm" color="muted">
          Passing <code>&lt;Button outline /&gt;</code> is a quick shorthand for outline variant.
        </Typography>

        <div className={styles.card}>
          <div className={styles.row}>
            <div className={styles.itemCol}>
              <Button outline>Shorthand Outline</Button>
              <span className={styles.label}>&lt;Button outline /&gt;</span>
            </div>

            <div className={styles.itemCol}>
              <Button outline leftIcon={<DownloadIcon />}>
                Export PDF
              </Button>
              <span className={styles.label}>&lt;Button outline leftIcon=... /&gt;</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Sizes ───────────────────────────────────────────────────────────── */}
      <section className={styles.section}>
        <Typography variant="h2">4. Sizes (xs → xl)</Typography>
        <div className={styles.card}>
          <div className={styles.row} style={{ alignItems: 'flex-end' }}>
            <div className={styles.itemCol}>
              <Button size="xs">Extra Small</Button>
              <span className={styles.label}>size=&quot;xs&quot;</span>
            </div>

            <div className={styles.itemCol}>
              <Button size="sm">Small</Button>
              <span className={styles.label}>size=&quot;sm&quot;</span>
            </div>

            <div className={styles.itemCol}>
              <Button size="md">Medium (Default)</Button>
              <span className={styles.label}>size=&quot;md&quot;</span>
            </div>

            <div className={styles.itemCol}>
              <Button size="lg">Large</Button>
              <span className={styles.label}>size=&quot;lg&quot;</span>
            </div>

            <div className={styles.itemCol}>
              <Button size="xl">Extra Large</Button>
              <span className={styles.label}>size=&quot;xl&quot;</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Full Width ──────────────────────────────────────────────────────── */}
      <section className={styles.section}>
        <Typography variant="h2">5. Full Width</Typography>
        <div className={styles.card}>
          <Button fullWidth leftIcon={<DownloadIcon />}>
            Full Width Download Button
          </Button>
          <span className={styles.label}>fullWidth=true</span>
        </div>
      </section>

      {/* ── 6. Loading States ─────────────────────────────────────────────────── */}
      <section className={styles.section}>
        <Typography variant="h2">6. Loading States (isLoading & loadingText)</Typography>
        <Typography variant="body-sm" color="muted">
          When <code>isLoading</code> is true, children are replaced by the spinner + optional <code>loadingText</code>.
        </Typography>

        <div className={styles.card}>
          <div className={styles.row}>
            <div className={styles.itemCol}>
              <Button isLoading>Loading</Button>
              <span className={styles.label}>isLoading=true</span>
            </div>

            <div className={styles.itemCol}>
              <Button isLoading loadingText="Saving changes...">
                Save
              </Button>
              <span className={styles.label}>isLoading=true + loadingText</span>
            </div>

            <div className={styles.itemCol}>
              <Button
                isLoading={asyncLoading}
                loadingText="Processing request..."
                onClick={handleSimulateAsync}
              >
                Click to Simulate 2s Async
              </Button>
              <span className={styles.label}>Interactive async demo</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Disabled States ─────────────────────────────────────────────────── */}
      <section className={styles.section}>
        <Typography variant="h2">7. Disabled States</Typography>
        <div className={styles.card}>
          <div className={styles.row}>
            <Button disabled>Disabled Neumorphic</Button>
            <Button variant="solid" disabled>Disabled Solid</Button>
            <Button variant="outline" disabled>Disabled Outline</Button>
          </div>
        </div>
      </section>

      {/* ── 8. Per-Button Theme Role Overrides ─────────────────────────────────── */}
      <section className={styles.section}>
        <Typography variant="h2">8. Per-Button Theme Role Overrides (themeRole)</Typography>
        <Typography variant="body-sm" color="muted">
          You can override the theme role on specific buttons regardless of the global theme context.
        </Typography>

        <div className={styles.card}>
          <div className={styles.grid}>
            <div className={styles.itemCol}>
              <Button themeRole="customer">Customer Role (Green)</Button>
              <span className={styles.label}>themeRole=&quot;customer&quot;</span>
            </div>

            <div className={styles.itemCol}>
              <Button themeRole="professional">Professional Role (Blue)</Button>
              <span className={styles.label}>themeRole=&quot;professional&quot;</span>
            </div>

            <div className={styles.itemCol}>
              <Button themeRole="agent">Agent Role (Coral/Red)</Button>
              <span className={styles.label}>themeRole=&quot;agent&quot;</span>
            </div>

            <div className={styles.itemCol}>
              <Button themeRole="admin">Admin Role (Indigo)</Button>
              <span className={styles.label}>themeRole=&quot;admin&quot;</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. Per-Button Color Mode Overrides ─────────────────────────────────── */}
      <section className={styles.section}>
        <Typography variant="h2">9. Per-Button Color Mode Overrides (colorMode)</Typography>
        <Typography variant="body-sm" color="muted">
          Explicitly force a button into light or dark mode styling.
        </Typography>

        <div className={styles.card}>
          <div className={styles.row}>
            <div className={styles.itemCol}>
              <Button colorMode="light" themeRole="professional">
                Forced Light Mode
              </Button>
              <span className={styles.label}>colorMode=&quot;light&quot;</span>
            </div>

            <div className={styles.itemCol}>
              <Button colorMode="dark" themeRole="professional">
                Forced Dark Mode
              </Button>
              <span className={styles.label}>colorMode=&quot;dark&quot;</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
