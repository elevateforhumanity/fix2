import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import sitemap from 'vite-plugin-sitemap';
import { copyFileSync, mkdirSync, cpSync, existsSync } from 'fs';

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
      name: 'copy-assets-and-bridge-files',
      closeBundle() {
        // Copy bridge files and ensure all public assets are in dist
        try {
          // Copy API config
          mkdirSync('dist/api', { recursive: true });
          copyFileSync(
            'public/api/efh-config.json',
            'dist/api/efh-config.json'
          );
          
          // NOTE: Durable.co injection files (efh-bridge.js, inject-bridge.js, auto-inject-bridge.html) 
          // have been removed as they are no longer needed
          
          // Ensure all images are copied (Vite should do this, but double-check)
          if (existsSync('public/images')) {
            mkdirSync('dist/images', { recursive: true });
            cpSync('public/images', 'dist/images', { recursive: true });
            console.log('✅ Images directory verified/copied to dist/');
          }
          
          console.log('✅ All bridge files and assets copied to dist/');
        } catch (err) {
          console.error('⚠️ Failed to copy files:', err.message);
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
    assetsInlineLimit: 0, // Don't inline any assets - keep them as separate files
    terserOptions: {
      compress: {
        drop_console: false, // Keep console for error tracking
        drop_debugger: true,
      },
    },
    rollupOptions: {
      external: ['workers/autopilot-worker.js', 'workers/start-autopilot.js'],
      output: {
        assetFileNames: (assetInfo) => {
          // Preserve original asset paths for images
          if (assetInfo.name && /\.(png|jpe?g|gif|svg|webp|ico)$/i.test(assetInfo.name)) {
            // Keep images in their original structure
            return 'images/[name][extname]';
          }
          // Default for other assets
          return 'assets/[name]-[hash][extname]';
        },
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
    host: '0.0.0.0', // listen on all interfaces
    port: 5173,
    strictPort: false, // allow fallback to other ports
    hmr: {
      clientPort: 443,
      host: process.env.GITPOD_WORKSPACE_URL
        ? process.env.GITPOD_WORKSPACE_URL.replace('https://', '5173-')
        : undefined,
    },
  },
  preview: {
    host: '0.0.0.0', // listen on all interfaces
    port: 8080,
    strictPort: false, // allow fallback to other ports
  },
});
