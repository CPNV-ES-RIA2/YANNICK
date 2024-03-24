import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';
import path from 'path';

const parentEnvPath = path.resolve(__dirname, '../.env');
const envDir = fs.existsSync(parentEnvPath) ? '../' : './';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
  },
  envDir,
  build: {
    rollupOptions: {
      output: {
        dir: 'dist',
        entryFileNames: 'assets/plugin.js',
        chunkFileNames: 'assets/chunk.js',
        assetFileNames: 'assets/styles.css',
      },
    }
  },
})
