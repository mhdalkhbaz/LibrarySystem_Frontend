import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const hostUrl = 'http://developermwess-001-site1.qtempurl.com'
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/User': {
        target:  hostUrl,
        changeOrigin: true,
      },
      '/Book': {
        target: hostUrl,
        changeOrigin: true,
      },
    }
  }
})
