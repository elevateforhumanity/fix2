import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import sitemap from 'vite-plugin-sitemap';
import { copyFileSync, mkdirSync } from 'fs';

// Define all routes for sitemap generation
const routes = [
  '/',
  '/programs',
  '/programs/barber',
  '/programs/building-tech',
  '/programs/cna',
  '/programs/cpr-aed-first-aid',
  '/programs/business-startup-marketing',
  '/programs/tax-office-startup',
  '/programs/esthetician-client-services',
  '/programs/beauty-career-educator',
  '/programs/public-safety-reentry',
  '/lms',
  '/lms/courses',
  '/certificates',
  '/verify',
  '/about',
  '/partners',
  '/support',
  '/community',
  '/connect',
  '/auth/login',
  '/auth/signup',
  '/legal/terms',
  '/legal/privacy',
  '/legal/ip-notice',
  '/legal/dmca',
];

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://elevateforhumanity.org',
      dynamicRoutes: routes,
      outDir: 'dist',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }),
    {
      name: 'copy-bridge-files',
      closeBundle() {
        // Copy bridge files to dist after build
        try {
          mkdirSync('dist/api', { recursive: true });
          copyFileSync('public/efh-bridge.js', 'dist/efh-bridge.js');
          copyFileSync('public/inject-bridge.js', 'dist/inject-bridge.js');
          copyFileSync(
            'public/auto-inject-bridge.html',
            'dist/auto-inject-bridge.html'
          );
          copyFileSync(
            'public/api/efh-config.json',
            'dist/api/efh-config.json'
          );
          console.log('✅ All bridge files copied to dist/');
        } catch (err) {
          console.error('⚠️ Failed to copy bridge files:', err.message);
        }
      },
    },
  ],
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
