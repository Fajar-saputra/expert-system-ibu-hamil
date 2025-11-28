import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Menambahkan konfigurasi proxy
    proxy: {
      // Ketika frontend melihat request yang dimulai dengan '/api'
      '/api': {
        // Arahkan request tersebut ke backend kita
        target: 'http://localhost:5000',
        changeOrigin: true, // Ubah host header ke target backend
        // rewrite: (path) => path.replace(/^\/api/, ''), // Tidak perlu rewrite karena rute kita sudah berawalan /api
      },
    },
  },
})