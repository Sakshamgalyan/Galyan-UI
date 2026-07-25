import React from 'react';
import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@galyan/theme';
import { ToasterProvider } from '@galyan/ui';

import '@galyan/theme/css/reset';
import '@galyan/theme/css/variables';
import '@galyan/theme/css/globals';
import '@galyan/theme/css/fonts';
import '@galyan/ui/styles.css';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['INTRODUCTION', ['Welcome', 'Catalog'], 'Galyan UI', '*'],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        white: { name: 'white', value: '#ffffff' },
        "light-subtle": { name: 'light-subtle', value: '#f8fafc' },
        dark: { name: 'dark', value: '#0f172a' }
      }
    },
  },

  globalTypes: {
    themeRole: {
      description: 'Galyan Theme Role',
      defaultValue: 'customer',
      toolbar: {
        title: 'Theme Role',
        icon: 'paintbrush',
        items: [
          { value: 'customer', title: 'Customer (Green)' },
          { value: 'professional', title: 'Professional (Blue)' },
          { value: 'agent', title: 'Agent (Coral)' },
          { value: 'admin', title: 'Admin (Indigo)' },
        ],
        dynamicTitle: true,
      },
    },
    colorMode: {
      description: 'Color Mode',
      defaultValue: 'light',
      toolbar: {
        title: 'Color Mode',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const role = context.globals.themeRole || 'customer';
      const mode = context.globals.colorMode || 'light';

      return (
        <ThemeProvider key={`${role}-${mode}`} defaultRole={role} defaultColorMode={mode} storageKey={null}>
          <ToasterProvider>
            <div
              data-theme={role}
              data-color-mode={mode}
              style={{
                padding: '1.25rem 1rem',
                background: mode === 'dark' ? '#0f172a' : '#ffffff',
                color: mode === 'dark' ? '#f8fafc' : '#0f172a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                boxSizing: 'border-box',
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <Story />
            </div>
          </ToasterProvider>
        </ThemeProvider>
      );
    },
  ],

  initialGlobals: {
    themeRole: 'customer',
    colorMode: 'light',
    backgrounds: {
      value: 'white'
    }
  }
};

export default preview;
