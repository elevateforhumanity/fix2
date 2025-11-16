# Build Configuration & Asset Handling

## Overview

This document explains how the build system handles assets (images, fonts, etc.) and how it's configured to work with both standalone deployment and potential Moodle/LMS integration.

## Build System: Vite

The project uses **Vite** as its build tool, which provides:

- Fast development server with HMR (Hot Module Replacement)
- Optimized production builds with code splitting
- Automatic asset handling and optimization
- Modern ES modules support

## Asset Handling Strategy

### Public Directory (`/public`)

Assets in the `public/` directory are:

- **Copied as-is** to the `dist/` directory during build
- **Not processed** by Vite (no minification, no hashing)
- **Referenced with absolute paths** from root: `/images/file.jpg`

```
public/
├── images/
│   ├── programs/
│   │   ├── efh-barber-hero.jpg
│   │   ├── efh-barber-card.jpg
│   │   └── ...
│   ├── partners/
│   └── ...
├── _headers          # Netlify headers configuration
├── _redirects        # Netlify redirects
└── ...

→ Builds to →

dist/
├── images/           # Exact copy of public/images/
├── _headers
├── _redirects
└── ...
```

### Source Assets (`/src/assets`)

Assets imported in source code are:

- **Processed by Vite** (optimized, potentially hashed)
- **Bundled with the application**
- **Referenced via imports**: `import logo from './logo.svg'`

## Key Configuration (vite.config.js)

### Base URL

```javascript
base: '/';
```

- All assets are served from the root path
- Works for both standalone deployment and subdirectory deployment
- Can be changed to `/subdirectory/` if needed for Moodle integration

### Asset Handling

```javascript
build: {
  assetsInlineLimit: 0,  // Don't inline assets - keep as separate files
  rollupOptions: {
    output: {
      assetFileNames: (assetInfo) => {
        // Images keep their original paths
        if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(assetInfo.name)) {
          return 'images/[name][extname]';
        }
        // Other assets go to /assets/ with hash
        return 'assets/[name]-[hash][extname]';
      }
    }
  }
}
```

### Custom Plugin: Asset Verification

```javascript
{
  name: 'copy-assets-and-bridge-files',
  closeBundle() {
    // Ensures all public/images are copied to dist/images
    cpSync('public/images', 'dist/images', { recursive: true });
  }
}
```

## Image Path Conventions

### ✅ Correct Usage

```tsx
// In React components - use absolute paths from root
<img src="/images/programs/efh-barber-hero.jpg" alt="Barber Program" />

// In data files
const program = {
  heroSrc: '/images/programs/efh-barber-hero.jpg',
  cardSrc: '/images/programs/efh-barber-card.jpg',
};

// In CSS (if needed)
background-image: url('/images/hero-banner.jpg');
```

### ❌ Incorrect Usage

```tsx
// Don't use relative paths without leading slash
<img src="images/hero.jpg" />  // ❌ Won't work

// Don't use relative paths from component location
<img src="../../images/hero.jpg" />  // ❌ Fragile

// Don't import public images (they're not processed)
import hero from '/images/hero.jpg';  // ❌ Wrong approach
```

## Caching Strategy

### Images & Static Assets

```
Cache-Control: public, max-age=31536000, immutable
```

- 1 year cache (31536000 seconds)
- Immutable flag tells browsers the file will never change
- Safe because we use content hashing for versioned assets

### HTML Files

```
Cache-Control: public, max-age=0, must-revalidate
```

- No caching - always fetch fresh
- Ensures users get latest version of the app

### JavaScript & CSS Bundles

```
Cache-Control: public, max-age=31536000, immutable
```

- Long cache because filenames include content hash
- When code changes, filename changes, cache is bypassed

## Moodle Integration Considerations

### Option 1: Standalone Deployment (Current)

- Deploy to Netlify/Vercel/GitHub Pages
- Moodle embeds via iframe or links to external site
- **Pros**: Full control, independent deployment
- **Cons**: Separate domain, iframe limitations

### Option 2: Moodle Theme Integration

If integrating directly into Moodle theme:

1. **Change base URL**:

   ```javascript
   base: '/theme/efh/'; // or wherever Moodle expects assets
   ```

2. **Update image paths** in source code:

   ```tsx
   // Change from:
   heroSrc: '/images/programs/efh-barber-hero.jpg';

   // To:
   heroSrc: '/theme/efh/images/programs/efh-barber-hero.jpg';
   ```

3. **Copy dist/ contents** to Moodle theme directory:
   ```bash
   cp -r dist/* /path/to/moodle/theme/efh/
   ```

### Option 3: Hybrid (Recommended - Current Architecture)

- Frontend deployed independently (Netlify)
- Backend uses Open LMS (Moodle) via API
- Communication via REST API (see `src/services/openLmsService.ts`)
- **Pros**: Best of both worlds, modern UI + robust LMS backend
- **Cons**: Requires API integration

## Build Output Structure

```
dist/
├── index.html                    # Main entry point
├── assets/
│   ├── index-[hash].js          # Main app bundle
│   ├── index-[hash].css         # Main styles
│   ├── vendor-react-[hash].js   # React vendor bundle
│   ├── vendor-supabase-[hash].js
│   └── ...
├── images/
│   ├── programs/
│   │   ├── efh-barber-hero.jpg
│   │   ├── efh-barber-card.jpg
│   │   └── ...
│   ├── partners/
│   └── ...
├── _headers                      # Netlify headers
├── _redirects                    # Netlify redirects
├── robots.txt
├── sitemap.xml
└── ...
```

## Verification Commands

### Check if images are in dist

```bash
ls -la dist/images/programs/
```

### Verify image paths in built JS

```bash
grep -o '"/images/[^"]*"' dist/assets/*.js | head -20
```

### Test build locally

```bash
pnpm run build
pnpm run preview  # Serves dist/ on http://localhost:8080
```

### Check for broken image links

```bash
# After starting preview server
pnpm run check:links
```

## Common Issues & Solutions

### Issue: Images not loading in production

**Cause**: Incorrect path (missing leading slash)
**Solution**: Always use `/images/...` not `images/...`

### Issue: Images work in dev but not in build

**Cause**: Dev server serves from different location than build
**Solution**: Use absolute paths from root (`/images/...`)

### Issue: Images have wrong MIME type

**Cause**: Server not configured to serve images correctly
**Solution**: Check `_headers` file and server configuration

### Issue: Images not cached properly

**Cause**: Missing or incorrect cache headers
**Solution**: Verify `_headers` file includes image extensions

## Performance Optimization

### Current Optimizations

- ✅ Images in public/ (not bundled, served directly)
- ✅ Long cache times for images (1 year)
- ✅ Code splitting (vendor chunks separated)
- ✅ Minification (Terser for JS)
- ✅ No source maps in production

### Future Optimizations

- [ ] Image optimization (WebP conversion)
- [ ] Responsive images (srcset)
- [ ] Lazy loading for below-fold images
- [ ] CDN integration for images

## Testing Checklist

Before deploying:

- [ ] Run `pnpm run build` successfully
- [ ] Verify `dist/images/` contains all expected images
- [ ] Check image paths in built JS files have leading slash
- [ ] Test preview server (`pnpm run preview`)
- [ ] Verify images load in preview
- [ ] Check browser network tab for 404s
- [ ] Verify cache headers are correct
- [ ] Test on mobile devices

## Related Files

- `vite.config.js` - Main build configuration
- `netlify.toml` - Netlify deployment config
- `public/_headers` - HTTP headers for assets
- `public/_redirects` - URL redirects
- `src/services/openLmsService.ts` - Moodle API integration
- `OPEN_LMS_INFRASTRUCTURE.md` - Moodle architecture docs

## Support

For build issues:

1. Check this document first
2. Review `vite.config.js` configuration
3. Verify `public/` directory structure
4. Test with `pnpm run preview`
5. Check browser console for errors
