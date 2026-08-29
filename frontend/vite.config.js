import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // En dev (npm run dev), le serveur sert depuis la racine "/".
  // En build (npm run build / deploy), le site est servi depuis
  // https://doroosee45-lang.github.io/omedevservice/ — un sous-chemin —
  // donc les assets doivent être préfixés en conséquence.
  base: command === 'build' ? '/omedevservice/' : '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
}))
