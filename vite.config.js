import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // en el pre-render (SSR) se empaquetan en su versión ESM
  // cada ruta como carpeta/index.html: funciona en cualquier hosting estático
  ssgOptions: {
    dirStyle: 'nested',
  },
  ssr: {
    noExternal: ['gsap', '@gsap/react', 'lenis'],
  },
})
