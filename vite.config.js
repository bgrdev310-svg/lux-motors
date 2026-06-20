import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Enable CSS code splitting per async chunk
    cssCodeSplit: true,
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Smaller chunk size warning
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Split vendor chunks for better caching
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'react-vendor';
          }
          // Keep recharts + es-toolkit out of page chunks to avoid Rolldown minifier
          // name collisions that crash Analytics in production ("t is not a function").
          if (
            id.includes('node_modules/recharts') ||
            id.includes('node_modules/es-toolkit') ||
            id.includes('node_modules/d3-')
          ) {
            return 'recharts-vendor';
          }
        },
      },
    },
    // Inline small assets as base64 (under 4KB)
    assetsInlineLimit: 4096,
  },
})
