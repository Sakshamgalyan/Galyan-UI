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
        white: { name: "white", value: "#ffffff" },
        "light-subtle": { name: "light-subtle", value: "#f8fafc" },
        dark: { name: "dark", value: "#0f172a" },
      },
    },
  },

  globalTypes: {
    themeBrand: {
      description: "App Brand / Company Identity",
      defaultValue: "easylife",
      toolbar: {
        title: "Brand",
        icon: "paintbrush",
        items: [
          { value: "easylife", title: "EasyLife (Green)" },
          { value: "metalixia", title: "Metalixia (Lavender-Blue)" },
          { value: "samantrix", title: "Samantrix (Violet/Dark)" },
          { value: "custom", title: "Custom (Orange demo)" },
        ],
        dynamicTitle: true,
      },
    },
    themeRole: {
      description: "User Role",
      defaultValue: "customer",
      toolbar: {
        title: "Role",
        icon: "user",
        items: [
          { value: "customer", title: "Customer" },
          { value: "professional", title: "Professional" },
          { value: "agent", title: "Agent" },
          { value: "admin", title: "Admin" },
        ],
        dynamicTitle: true,
      },
    },
    colorMode: {
      description: "Color Mode",
      defaultValue: "light",
      toolbar: {
        title: "Color Mode",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const brand = (context.globals.themeBrand || "easylife") as ThemeBrand;
      const role = (context.globals.themeRole || "customer") as ThemeRole;
      const mode = context.globals.colorMode || "light";

      // Samantrix is always dark; resolve wrapper background accordingly
      const isDark = mode === "dark" || brand === "samantrix";

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
              data-theme={brand === "easylife" ? role : brand}
              data-color-mode={isDark ? "dark" : "light"}
              style={{
                padding: "1.25rem 1rem",
                background: isDark ? "#0f172a" : "#ffffff",
                color: isDark ? "#f8fafc" : "#0f172a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                boxSizing: "border-box",
                transition: "all 0.2s ease-in-out",
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
    themeBrand: "easylife",
    themeRole: "customer",
    colorMode: "light",
    backgrounds: {
      value: "white",
    },
  },
};

export default preview;
