import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // En dev (npm run dev), le serveur sert depuis la racine "/".
  // Sur Render (env RENDER=true, injecté automatiquement par leur plateforme),
  // le site est servi depuis la racine de son propre domaine → base "/".
  // Un build local (npm run build / gh-pages deploy) sert depuis
  // https://doroosee45-lang.github.io/omedevservice/ — un sous-chemin —
  // donc les assets doivent être préfixés en conséquence.
  base: command === 'build' && !process.env.RENDER ? '/omedevservice/' : '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
}))
