import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        popup: "index.html", // Entry for popup UI
        content: "src/content.ts", // Entry for content script
        background: "src/background.ts", // Entry for background script
      },
      output: {
        entryFileNames: "[name].js", // Ensures correct output files
      },
    },
  },
});
