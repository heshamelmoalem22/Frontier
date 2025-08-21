import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react(),
    eslint({
      overrideConfigFile: './eslint.config.js', // يشير مباشرة إلى ملف ESLint الخاص بك
      failOnError: true, // يفشل البناء إذا كان هناك أخطاء ESLint
      include: ['src/**/*.js', 'src/**/*.jsx'],
    }),
  ],
});
