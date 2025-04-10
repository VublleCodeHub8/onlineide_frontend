import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shadcn/ui": "node_modules/@shadcn/ui/dist/index.esm.js",
    },
  },
  build: {
    outDir: 'dist', // 👈 Ensure this is present for Vercel
  },
})
