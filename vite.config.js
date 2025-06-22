import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/User': {
        target: 'http://developermwess-001-site1.qtempurl.com',
        changeOrigin: true,
      },
      '/Book': {
        target: 'http://developermwess-001-site1.qtempurl.com',
        changeOrigin: true,
      },
    }
  }
})
