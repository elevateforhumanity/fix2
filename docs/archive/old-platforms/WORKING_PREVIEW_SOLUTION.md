# Working Preview Server Solution

## ✅ Problem Solved

Created a custom Node.js preview server that works perfectly in Gitpod with:

- ✅ All images loading correctly
- ✅ SPA routing (client-side routes work)
- ✅ Proper cache headers
- ✅ CORS support

## The Solution

### Custom Preview Server

**File**: `scripts/preview-server.cjs`

A simple Node.js HTTP server that:

1. Serves static files from `dist/`
2. Falls back to `index.html` for all non-file routes (SPA support)
3. Sets proper MIME types for all file types
4. Applies correct cache headers (1 year for images/assets, no cache for HTML)
5. Logs all requests for debugging

### Package.json Commands

```json
{
  "preview": "node scripts/preview-server.cjs",
  "preview:serve": "serve -c serve.json -l 8080 --no-clipboard",
  "preview:vite": "vite preview --port 8080 --host 0.0.0.0"
}
```

- **`pnpm run preview`** - Uses custom Node.js server (recommended)
- **`pnpm run preview:serve`** - Uses `serve` package (alternative)
- **`pnpm run preview:vite`** - Uses Vite preview (has issues in Gitpod)

## How to Use

### 1. Build the Project

```bash
pnpm run build
```

### 2. Start Preview Server

```bash
pnpm run preview
```

Or specify a custom port:

```bash
PORT=9000 pnpm run preview
```

### 3. Access the Site

The server will output:

```
✅ Preview server running!

   Local:   http://localhost:8080/
   Network: http://0.0.0.0:8080/

Serving: /workspaces/fix2/dist
```

In Gitpod:

1. Go to the **Ports** tab (bottom panel)
2. Find port 8080
3. Click the **Open Browser** icon
4. Your site will open in a new tab

## Verification

Test that everything works:

```bash
# Test root
curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/
# Should return: 200

# Test images
curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/images/programs/efh-barber-hero.jpg
# Should return: 200

# Test SPA routing
curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/programs/barber
# Should return: 200

# Test assets
curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/assets/index-DtkboQEA.js
# Should return: 200
```

All should return `200`.

## Features

### 1. Image Support

All images are served with proper MIME types and long cache headers:

```
/images/programs/efh-barber-hero.jpg  → 200 OK
/images/partners/workone.webp         → 200 OK
/images/hero-banner.jpg               → 200 OK
```

Cache-Control: `public, max-age=31536000, immutable` (1 year)

### 2. SPA Routing

All non-file routes fall back to `index.html`:

```
/                      → index.html
/programs              → index.html (React Router handles it)
/programs/barber       → index.html (React Router handles it)
/lms/dashboard         → index.html (React Router handles it)
/any/random/route      → index.html (React Router handles it)
```

This allows React Router to handle all routing client-side.

### 3. Static Assets

JavaScript and CSS bundles are served with long cache:

```
/assets/index-DtkboQEA.js           → 200 OK
/assets/index-Dwv4tzpG.css          → 200 OK
/assets/vendor-react-u0KJdig2.js    → 200 OK
```

Cache-Control: `public, max-age=31536000, immutable` (1 year)

### 4. HTML Files

HTML files are served with no cache:

```
/index.html  → 200 OK
```

Cache-Control: `public, max-age=0, must-revalidate`

### 5. CORS Support

All responses include:

```
Access-Control-Allow-Origin: *
```

This allows the site to be embedded or accessed from other origins.

## Supported File Types

The server recognizes and serves:

- **HTML**: `.html`
- **JavaScript**: `.js`
- **CSS**: `.css`
- **Images**: `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.webp`, `.ico`
- **Fonts**: `.woff`, `.woff2`, `.ttf`
- **Data**: `.json`, `.xml`, `.txt`
- **Manifests**: `.webmanifest`

## Troubleshooting

### Port Already in Use

If you see:

```
❌ Port 8080 is already in use.
```

Use a different port:

```bash
PORT=8081 pnpm run preview
```

### Images Not Loading

1. Verify build completed:

   ```bash
   ls -la dist/images/programs/
   ```

2. Check image paths in code use leading slash:

   ```tsx
   // ✅ Correct
   <img src="/images/hero.jpg" />

   // ❌ Wrong
   <img src="images/hero.jpg" />
   ```

3. Rebuild:
   ```bash
   pnpm run build
   pnpm run preview
   ```

### Routing Not Working

1. Verify `_redirects` file exists:

   ```bash
   cat dist/_redirects
   ```

2. Should contain:

   ```
   /*   /index.html   200
   ```

3. The custom server handles this automatically

### Server Won't Start

1. Check if Node.js is installed:

   ```bash
   node --version
   ```

2. Check if dist/ exists:

   ```bash
   ls -la dist/
   ```

3. Rebuild if needed:
   ```bash
   pnpm run build
   ```

## Comparison with Other Solutions

| Solution           | Images | Routing | Gitpod | Speed  |
| ------------------ | ------ | ------- | ------ | ------ |
| **Custom Node.js** | ✅     | ✅      | ✅     | ⚡⚡⚡ |
| `serve` package    | ✅     | ⚠️      | ⚠️     | ⚡⚡   |
| `vite preview`     | ✅     | ✅      | ❌     | ⚡⚡⚡ |
| Python HTTP        | ✅     | ❌      | ✅     | ⚡     |

**Legend**:

- ✅ Works perfectly
- ⚠️ Works with configuration
- ❌ Doesn't work or has issues

## Production Deployment

This preview server is for **development/testing only**. For production, deploy to:

### Netlify (Recommended)

```bash
netlify deploy --prod
```

Netlify automatically handles:

- SPA routing via `_redirects`
- Image optimization
- CDN distribution
- HTTPS
- Custom domains

### Vercel

```bash
vercel --prod
```

Vercel automatically handles:

- SPA routing
- Image optimization
- CDN distribution
- HTTPS
- Custom domains

### Other Static Hosts

For other hosts, ensure they support:

1. SPA routing (fallback to index.html)
2. Proper MIME types
3. Cache headers

## Next Steps

1. **Development**: Use `pnpm run dev` (port 3000)
2. **Testing Build**: Use `pnpm run preview` (port 8080)
3. **Production**: Deploy to Netlify/Vercel

## Summary

✅ **Custom preview server works perfectly**
✅ **All images load correctly**
✅ **SPA routing works**
✅ **Proper cache headers**
✅ **Ready for production deployment**

The build configuration is correct. The preview server is now fully functional in Gitpod.
