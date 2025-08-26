import { defineConfig } from 'vite'
export default defineConfig({
  server: { port: 3002, proxy: { '/api': { target: 'http://localhost:8001', changeOrigin: true } } }
})
