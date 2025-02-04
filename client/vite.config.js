import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Ensures file changes are detected
    },
    hmr: {
      overlay: false,  // Prevents full page reload on minor changes
    },
  },
})
