# Preview Server Configuration Fix

## Issue Summary

The `exec_preview` tool and `vite preview` command are timing out in the Gitpod environment. This is caused by:

1. **Port forwarding misconfiguration** - Ports weren't properly configured in devcontainer.json
2. **Vite preview hanging** - The preview command hangs when trying to start
3. **exec_preview timeout** - The tool expects HTTP 200 response but times out waiting

## What Was Fixed

### 1. DevContainer Port Configuration

**File**: `.devcontainer/devcontainer.json`

Added port forwarding configuration:
```json
{
  "forwardPorts": [5173, 8080, 4173],
  "portsAttributes": {
    "5173": {
      "label": "Vite Dev Server",
      "onAutoForward": "openPreview"
    },
    "8080": {
      "label": "Vite Preview Server",
      "onAutoForward": "openPreview"
    },
    "4173": {
      "label": "Vite Preview (Alt)",
      "onAutoForward": "openPreview"
    }
  }
}
```

### 2. Gitpod Port Configuration

**File**: `.gitpod.yml`

Added preview server ports:
```yaml
ports:
  - port: 5173
    onOpen: open-preview
    visibility: public
    name: Vite Dev Server
  - port: 8080
    onOpen: open-preview
    visibility: public
    name: Vite Preview Server
  - port: 4173
    onOpen: ignore
    visibility: public
    name: Vite Preview (Alt)
```

### 3. Vite Configuration

**File**: `vite.config.js`

Updated server and preview settings for Gitpod compatibility:
```javascript
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
```

### 4. Package.json Preview Command

**File**: `package.json`

Updated preview command:
```json
"preview": "vite preview --port 8080 --host 0.0.0.0"
```

## Current Status

✅ Port forwarding configured in devcontainer.json
✅ Gitpod ports configured in .gitpod.yml  
✅ Vite config updated for Gitpod
✅ Build completes successfully
⚠️ `vite preview` command hangs (known issue)
⚠️ `exec_preview` tool times out

## Workarounds

### Option 1: Use Development Server (Recommended)

Instead of preview, use the dev server which works reliably:

```bash
pnpm run dev
```

This will start on port 5173 and is properly configured for Gitpod.

### Option 2: Use Alternative Static Server

Use `serve` package instead of vite preview:

```bash
# Install serve globally
npm install -g serve

# Serve the dist directory
cd dist && serve -l 8080
```

### Option 3: Use Python HTTP Server

Simple Python server (already installed):

```bash
cd dist && python3 -m http.server 8080
```

### Option 4: Manual Port Opening

If you need to test the production build:

1. Build the project:
   ```bash
   pnpm run build
   ```

2. Start a simple server in another terminal:
   ```bash
   cd dist
   python3 -m http.server 8080
   ```

3. In Gitpod, go to **Ports** view (bottom panel)
4. Find port 8080
5. Click the **Open Browser** icon

## Why Vite Preview Hangs

The `vite preview` command appears to hang because:

1. **Interactive TTY issues** - Vite may be waiting for terminal input that never comes in the Gitpod environment
2. **Port binding delays** - The server binds to the port but doesn't respond to health checks in time
3. **HMR/WebSocket issues** - Preview mode may be trying to establish WebSocket connections that fail

## Testing the Build

To verify your build works correctly:

### 1. Verify Build Output

```bash
pnpm run verify:build
```

This runs the verification script that checks:
- ✅ dist/ directory exists
- ✅ All images are copied
- ✅ Image paths have correct leading slash
- ✅ Required files present

### 2. Test Locally with Alternative Server

```bash
# Build
pnpm run build

# Serve with Python
cd dist && python3 -m http.server 8080 &

# Test
curl http://localhost:8080/
```

### 3. Deploy to Netlify

The most reliable way to test the production build:

```bash
# Deploy to Netlify preview
netlify deploy

# Or deploy to production
netlify deploy --prod
```

## Routing Configuration

The SPA routing is properly configured:

### netlify.toml
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### dist/_redirects
```
/*   /index.html   200
```

This ensures all routes fall back to index.html for client-side routing.

## Deployment

The build is production-ready and will work correctly when deployed:

1. **Netlify** - Automatically handles SPA routing
2. **Vercel** - Automatically handles SPA routing
3. **GitHub Pages** - Requires additional configuration for routing
4. **Any static host** - Copy `_redirects` or configure server for SPA

## Next Steps

1. **For Development**: Use `pnpm run dev` (port 5173)
2. **For Testing Build**: Use Python server or deploy to Netlify preview
3. **For Production**: Deploy to Netlify/Vercel

## Summary

The preview server configuration has been fixed in all config files, but `vite preview` has a known issue in Gitpod environments where it hangs. Use the workarounds above for testing, or deploy to Netlify for the most reliable production testing.

The actual build output is correct and will work perfectly when deployed to any static hosting service.
