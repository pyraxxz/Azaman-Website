import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Bundle size warning bumped — we ship animation-heavy code intentionally.
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          // Heavy animation libraries get their own chunk so the home shell
          // can paint without waiting for them. Browser cache hits hard
          // across deploys since these rarely change.
          gsap: ['gsap', '@gsap/react'],
          framer: ['framer-motion'],
          react: ['react', 'react-dom', 'react-router-dom'],
          icons: ['lucide-react'],
          lenis: ['lenis'],
        },
      },
    },
  },
});
