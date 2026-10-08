import { defineConfig } from "tsup";
import fs from "node:fs";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  onSuccess: async () => {
    fs.cpSync("src/css", "dist/css", { recursive: true });
  },
});
