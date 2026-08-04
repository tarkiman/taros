import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Dev server proxies /api and /static to the real Go backend (see
// docs/03-tech-stack.md) so `npm run dev` works against live data without
// CORS/cookie headaches. Production build output (dist/) is embedded into
// the Go binary via web/embed.go — see docs/09-deployment.md.
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': { target: 'http://127.0.0.1:8090', changeOrigin: true },
      '/static': { target: 'http://127.0.0.1:8090', changeOrigin: true },
    },
  },
})
