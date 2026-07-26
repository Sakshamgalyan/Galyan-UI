import { defineConfig } from "tsup";
import fs from "fs";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  banner: {
    js: '"use client";',
  },
  onSuccess: async () => {
    fs.cpSync("src/css", "dist/css", { recursive: true });
  },
});
