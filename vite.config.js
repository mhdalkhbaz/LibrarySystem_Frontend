import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// const hostUrl = 'http://developermwess-001-site1.qtempurl.com'
const hostUrl = 'http://localhost:5187' // local

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/User': {
        target:  hostUrl,
      },
      '/Book': {
        target: hostUrl,
      },
    }
  }
})
