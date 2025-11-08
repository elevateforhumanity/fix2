import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import sitemap from 'vite-plugin-sitemap';
import { copyFileSync, mkdirSync } from 'fs';

// Define all routes for sitemap generation
const routes = [
  // Core pages
  '/',
  '/about',
  '/community',
  '/connect',
  '/contact',
  '/donate',
  '/apply',

  // Programs
  '/programs',
  '/programs/barber',
  '/programs/building-tech',
  '/programs/healthcare',
  '/programs/tax-business',
  '/programs/hvac',
  '/programs/cprs',
  '/programs/digital-skills',
  '/programs/drug-testing',
  '/programs/leadership',

  // LMS
  '/lms',
  '/lms/dashboard',
  '/lms/courses',
  '/lms/courses-index',
  '/student-portal-lms',

  // Certificates
  '/certificates',
  '/verify',

  // Auth
  '/auth/login',
  '/auth/signup',

  // Legal
  '/legal/terms',
  '/legal/privacy',
  '/legal/ip-notice',
  '/legal/dmca',

  // Additional
  '/partners',
  '/support',
  '/employers',
  '/blog',
  '/calendar',
];

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(process.env.VITE_BUILD_ID || 'dev'),
  },
  plugins: [
    react(),
    // Sitemap disabled - causing build issues
    // sitemap({
    //   hostname: 'https://elevateforhumanity.org',
    //   dynamicRoutes: routes,
    //   outDir: 'dist',
    //   changefreq: 'weekly',
    //   priority: 0.8,
    //   lastmod: new Date().toISOString(),
    //   robots: false,
    // }),
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
      external: ['workers/autopilot-worker.js', 'workers/start-autopilot.js'],
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
    host: true, // listen on 0.0.0.0
    port: 5173,
    strictPort: true,
    hmr: { clientPort: 443 },
  },
  preview: {
    host: true,
    port: 8080,
    strictPort: true,
  },
});
