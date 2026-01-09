import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. 테일윈드 플러그인 가져오기

export default defineConfig({
  plugins: [
    tailwindcss(), // 2. 여기에 추가해야 CSS가 작동합니다!
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})