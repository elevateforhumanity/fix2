import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps for production
    target: 'es2019',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Keep console for error tracking
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router')) return 'vendor-router';
            if (id.includes('@supabase')) return 'vendor-supabase';
            if (id.includes('stripe')) return 'vendor-stripe';
            if (id.includes('react') || id.includes('react-dom'))
              return 'vendor-react';
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 5173,
    host: true, // Listen on 0.0.0.0 for Gitpod
    strictPort: true,
    hmr: {
      clientPort: 443, // Gitpod previews are HTTPS
    },
  },
  preview: {
    port: 8080,
    host: '0.0.0.0',
    strictPort: false,
    allowedHosts: ['.gitpod.dev', '.gitpod.io', 'localhost'],
  },
});
