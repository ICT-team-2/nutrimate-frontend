import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import envCompatible from 'vite-plugin-env-compatible';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  envPrefix: 'REACT_APP_',
  plugins: [react(), envCompatible()],
  resolve: {
    alias: [
      { find: '@src', replacement: path.resolve(__dirname, 'src') },
      { find: '@image', replacement: path.resolve(__dirname, 'src/asset/image') },
    ],
  },
  server: {
    host: '0.0.0.0',
    port: 5555,
    open: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'asset',
  },
});