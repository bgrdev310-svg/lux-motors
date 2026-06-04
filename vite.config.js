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
        },
      },
    },
    // Inline small assets as base64 (under 4KB)
    assetsInlineLimit: 4096,
  },
})
