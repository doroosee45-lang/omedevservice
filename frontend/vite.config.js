import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Servi depuis https://doroosee45-lang.github.io/omedevservice/ (GitHub Pages)
  base: '/omedevservice/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
