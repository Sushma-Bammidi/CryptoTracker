import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Replit plugins are only needed on Replit platform
// They're commented out for local development to avoid import errors
// Uncomment and configure if deploying to Replit
const plugins = [
  react(),
  // Replit plugins (only needed on Replit platform)
  // ...(process.env.NODE_ENV !== "production" && process.env.REPL_ID
  //   ? [
  //       (await import("@replit/vite-plugin-runtime-error-modal")).default(),
  //       (await import("@replit/vite-plugin-cartographer")).default(),
  //       (await import("@replit/vite-plugin-dev-banner")).default(),
  //     ]
  //   : []),
];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});

