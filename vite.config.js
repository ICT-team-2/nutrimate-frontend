import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import envCompatible from 'vite-plugin-env-compatible';
import * as fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: 'REACT_APP_',
  plugins: [react(), envCompatible()],
  resolve: {
    alias: [
      {
        find: '@src', replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  server: {
    host: '0.0.0.0',
    port: 5555,
    open: true,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')),
    },
  },
});


