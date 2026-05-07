import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // ブラウザが /api/emotions にアクセスしたら、
      // 実際にAPIが動いているサーバー（例: ポート3001）へ転送する設定
      '/api': {
        target: 'http://localhost:3001', 
        changeOrigin: true,
      },
    },
  },
})