import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const hostUrl = 'http://developermwess-001-site1.qtempurl.com'
export default defineConfig({
  base: '/LibrarySystem_Frontend/',
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
