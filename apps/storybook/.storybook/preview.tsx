import React from "react";
import type { Preview } from "@storybook/react";
import { ThemeProvider } from "@galyan/theme";
import type { CustomThemeConfig, ThemeBrand, ThemeRole } from "@galyan/theme";
import { ToasterProvider } from "@galyan/ui";

import "@galyan/theme/css/reset";
import "@galyan/theme/css/variables";
import "@galyan/theme/css/globals";
import "@galyan/theme/css/fonts";
import "@galyan/ui/styles.css";

/** Demo custom theme — orange brand */
const DEMO_CUSTOM_THEME: CustomThemeConfig = { primary: "#f97316" };

const preview: Preview = {
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
    options: {
      storySort: {
        order: ["INTRODUCTION", ["Welcome", "Catalog"], "Galyan UI", "*"],
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
        dark: { name: "Dark (Simantrix Ink)", value: "#06060a" },
        "dark-surface": { name: "Dark Surface", value: "#0a0a12" },
        white: { name: "White (Light Mode)", value: "#ffffff" },
        "light-subtle": { name: "Light Subtle", value: "#f8fafc" },
      },
    },
  },

  globalTypes: {
    themeBrand: {
      description: "App Brand / Company Identity",
      defaultValue: "simantrix",
      toolbar: {
        title: "Brand",
        icon: "paintbrush",
        items: [
          { value: "simantrix", title: "Simantrix (Flagship)" },
          { value: "easylife", title: "EasyLife (Legacy)" },
          { value: "metalixia", title: "Metalixia (Legacy)" },
          { value: "custom", title: "Custom Theme" },
        ],
        dynamicTitle: true,
      },
    },
    themeRole: {
      description: "Color Scheme / User Role",
      defaultValue: "simantrix",
      toolbar: {
        title: "Color Scheme",
        icon: "paintbrush",
        items: [
          // ── Direct Color Schemes ──────────────────────────────────────────
          { value: "simantrix", title: "Simantrix (#7c5cff - Signature Violet)" },
          { value: "coral", title: "Coral (#f43f5e - Rose / Crimson)" },
          { value: "green", title: "Green (#10b981 - Emerald)" },
          { value: "blue", title: "Blue (#3b82f6 - Cobalt)" },
          { value: "violet", title: "Violet (#6366f1 - Indigo)" },
          { value: "amber", title: "Amber (#f59e0b - Governance)" },
          { value: "cyan", title: "Cyan (#0ea5e9 - Sky Blue)" },
        ],
        dynamicTitle: true,
      },
    },
    colorMode: {
      description: "Color Mode (Light / Dark)",
      defaultValue: "dark",
      toolbar: {
        title: "Mode",
        icon: "circlehollow",
        items: [
          { value: "dark", title: "Dark Mode" },
          { value: "light", title: "Light Mode" },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const brand = (context.globals.themeBrand || "simantrix") as ThemeBrand;
      const role = (context.globals.themeRole || "simantrix") as ThemeRole;
      const mode = (context.globals.colorMode || "dark") as "light" | "dark";
      const themeAttr = brand === "easylife" ? role : `${brand}-${role}`;

      return (
        <ThemeProvider
          key={`${brand}-${role}-${mode}`}
          brand={brand}
          role={role}
          defaultColorMode={mode}
          storageKey={null}
          customTheme={brand === "custom" ? DEMO_CUSTOM_THEME : undefined}
        >
          <ToasterProvider>
            <div
              data-brand={brand}
              data-role={role}
              data-color-scheme={role}
              data-theme={themeAttr}
              data-color-mode={mode}
              style={{
                padding: "1.25rem 1rem",
                background: "var(--gy-background)",
                color: "var(--gy-text)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                boxSizing: "border-box",
                transition: "all 0.2s ease-in-out",
                minHeight: "100vh",
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
    themeBrand: "simantrix",
    themeRole: "simantrix",
    colorMode: "dark",
    backgrounds: {
      value: "#06060a",
    },
  },
};

export default preview;
