import path from 'path'
import react from '@vitejs/plugin-react-swc'
/// <reference types="vitest" />
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // @ts-ignore
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
})
