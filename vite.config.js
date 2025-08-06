import { defineConfig } from 'vite'; // ✅ WAJIB ADA!
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import path from 'path'; // kalau kamu pakai path.resolve

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.jsx'],
      refresh: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      ziggy: 'ziggy-js', // atau path.resolve(...) sesuai solusi yang kamu pilih
    },
  },
});
