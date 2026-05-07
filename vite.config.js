import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/omedevservice/', // ⚠️ nom du repo GitHub
  build: {
    outDir: 'dist'
  }
})