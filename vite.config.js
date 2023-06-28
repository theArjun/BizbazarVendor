import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "./src/config/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 80,
    host: "172.16.0.48",
    proxy: {
      // "/api": "https://dev.bizbazar.com.np/",
      "/api": config.BASE_URL,
    },
  },

  preview: {
    port: 8080,
  },
});
