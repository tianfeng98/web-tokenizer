import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: /^@\/(.*)/, replacement: resolve(__dirname, "src/$1") }],
  },
  build: {
    lib: {
      entry: "src/Tokenizer/index.ts",
      name: "Tokenizer",
      formats: ["iife", "es", "cjs"],
    },
  },
  worker: {
    format: "es",
  },
  server: {
    port: 8000,
    host: "0.0.0.0",
  },
});
