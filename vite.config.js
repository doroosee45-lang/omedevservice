import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/omedevservice/', // ⚠️ nom exact du repo
  build: {
    outDir: 'docs'
  }
})