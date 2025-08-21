import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react(),
    eslint({
      overrideConfigFile: './eslint.config.js', // <-- مهم جدًا
      failOnError: true,
      include: ['src/**/*.js', 'src/**/*.jsx'],
    }),
  ],
});
