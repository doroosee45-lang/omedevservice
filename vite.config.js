// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   base: '/omedevservice/',  // ⚠️ IMPORTANT : avec les slashs
//   build: {
//     outDir: 'docs'
//   }
// })


cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'docs'
  }
})
EOF