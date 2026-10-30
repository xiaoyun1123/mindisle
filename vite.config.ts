import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// 部署到 GitHub Pages 的项目主页，路径带仓库名前缀
export default defineConfig({
  base: '/mindisle/',
  plugins: [react(), tailwindcss()],
})
