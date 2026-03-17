import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Ayura/',
  root: 'frontend/ayura-ui',
  plugins: [react()],
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
  }
});
