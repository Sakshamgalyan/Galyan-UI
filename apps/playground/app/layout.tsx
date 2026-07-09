import type { Metadata } from "next";
import { ThemeProvider } from "@galyan/theme";
import "@galyan/theme/css/reset";
import "@galyan/theme/css/variables";
import "@galyan/theme/css/globals";
import "@galyan/theme/css/fonts";
import "./globals.css";
import { ToasterProvider } from "@galyan/ui";

export const metadata: Metadata = {
  title: "Galyan UI Playground",
  description: "Playground for Galyan Design System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultRole="customer">
          <ToasterProvider>
            {children}
          </ToasterProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
