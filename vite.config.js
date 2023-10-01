import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "./src/config/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // "/api": "https://dev.bizbazar.com.np/",
      "/api": config.BASE_URL,
    },
  },

  preview: {
    port: 4000,
  },
});
