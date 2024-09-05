import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCss from 'unocss/vite'
import {resolve} from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), UnoCss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, "src")
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  build: {
    chunkSizeWarningLimit: 1500,
  }
})
