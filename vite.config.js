import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import autoprefixer from 'autoprefixer'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(() => {
  return {
    base: '/',
    build: {
      outDir: 'dist',
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({}),
        ],
      },
    },
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
      exclude: [],
    },
    plugins: [react(),tailwindcss()],
    server : {
      host: true,
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: [
        {
          find: 'src/',
          replacement: `${path.resolve(__dirname, 'src')}/`,
        },
      ],
    },
  }
})
