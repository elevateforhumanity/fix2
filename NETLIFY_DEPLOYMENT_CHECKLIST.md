# Netlify Deployment Checklist

## ✅ Configuration Complete

### 1. Vite Server Config
- ✅ Fixed server.host conflicts (now using `host: true`)
- ✅ Removed duplicate `allowedHosts` configuration
- ✅ Preview port set to 8080 for consistency
- ✅ HMR configured for Gitpod (clientPort: 443)

### 2. SPA Routing
- ✅ `public/_redirects` exists with SPA fallback: `/* /index.html 200`
- ✅ Custom 404.html page with Tailwind styling
- ✅ netlify.toml SPA redirect configured

### 3. Security Headers
- ✅ Consolidated CSP in netlify.toml (removed duplicates from _headers)
- ✅ Single source of truth for security headers
- ✅ Includes Supabase, Stripe, Google Analytics, and API endpoints
- ✅ CORS headers preserved in _headers for API compatibility

### 4. Build Configuration
- ✅ Fixed netlify.toml: Changed from Next.js to Vite/React
- ✅ Build command: `npm install && npm run build`
- ✅ Publish directory: `dist` (was incorrectly `.next`)
- ✅ Node version: 20.11.1

### 5. Portal Domain Setup
- ✅ Created `scripts/setup-portal.sh` for automated domain configuration
- ✅ Supports both Netlify domain addition and Cloudflare DNS
- ✅ Graceful fallback with manual instructions if no Cloudflare token

### 6. Performance Optimizations
- ✅ Added @netlify/plugin-prerender for key routes
- ✅ Prerendering: /, /programs, /about, /support, /community, /connect

## 🔧 Required Actions in Netlify UI

### Environment Variables
Set these in Netlify → Site settings → Environment variables:

```bash
VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
VITE_API_URL=https://api.elevateforhumanity.org
VITE_STRIPE_PUBLISHABLE_KEY=pk_<your-key>  # if using Stripe
```

### Build Settings
Verify in Netlify → Site settings → Build & deploy:
- **Build command**: `npm install && npm run build`
- **Publish directory**: `dist`
- **Node version**: 20.11.1 (set in netlify.toml)

### Deploy
After setting environment variables:
1. Go to Deploys tab
2. Click "Trigger deploy" → "Clear cache and deploy site"
3. This ensures env vars are baked into the build

## 🌐 Portal Domain Setup

### Option 1: Automated (with tokens)
```bash
export NETLIFY_AUTH_TOKEN=<your-token>
export CLOUDFLARE_API_TOKEN=<your-token>  # optional
bash scripts/setup-portal.sh
```

### Option 2: Manual
1. **Netlify**: Site → Domains → Add custom domain → `portal.elevateforhumanity.org`
2. **Cloudflare**: Add DNS record:
   - Type: `CNAME`
   - Name: `portal`
   - Target: `elevateforhumanityfix.netlify.app`
   - TTL: 3600
   - Proxy: Off (orange cloud disabled)
3. Wait 5-10 minutes for DNS propagation
4. Netlify will auto-issue SSL certificate

## 🔍 Verification Steps

### After Deploy
1. ✅ Open DevTools → Network tab
2. ✅ Verify API requests go to `https://api.elevateforhumanity.org`
3. ✅ Check for CORS errors (should be none)
4. ✅ Test deep links (e.g., `/programs`, `/about`) - should not 404
5. ✅ Verify 404 page shows for invalid routes
6. ✅ Check that pages load with content (not just skeletons)

### Health Check
```bash
curl -I https://portal.elevateforhumanity.org/
# Should return 200 OK

curl -I https://portal.elevateforhumanity.org/programs
# Should return 200 OK (not 404)
```

## 📋 Common Issues & Fixes

### Still seeing 404s?
- ✅ Verify `_redirects` file is in `public/` directory
- ✅ Check Netlify build logs for "Copied _redirects"
- ✅ Ensure publish directory is `dist` not `.next`

### Skeleton screens / no data?
- ✅ Verify `VITE_API_URL` is set in Netlify env vars
- ✅ Check it's a public HTTPS URL (not localhost)
- ✅ Clear cache and redeploy after setting env vars

### CORS errors?
- ✅ Verify API server has CORS headers
- ✅ Check CSP in netlify.toml includes your API domain
- ✅ Ensure `connect-src` includes `https://api.elevateforhumanity.org`

### DNS not resolving?
- ✅ Wait 5-10 minutes for propagation
- ✅ Check DNS with: `dig portal.elevateforhumanity.org`
- ✅ Verify CNAME points to `elevateforhumanityfix.netlify.app`

## 🎯 Final Architecture

```
www.elevateforhumanity.org
  ↓ (Durable.co marketing site)
  ↓ "Get Started" button
  ↓
portal.elevateforhumanity.org
  ↓ (This Netlify React app)
  ↓ Full LMS/Portal functionality
```

## 📝 Files Modified

- `vite.config.js` - Fixed server config
- `netlify.toml` - Changed from Next.js to Vite, consolidated headers
- `public/_headers` - Removed duplicate CSP
- `public/404.html` - New branded 404 page
- `scripts/setup-portal.sh` - New portal domain automation

## 🚀 Next Steps

1. Set environment variables in Netlify UI
2. Clear cache and deploy
3. Run portal domain setup script (or configure manually)
4. Verify deployment with checklist above
5. Test all key routes and functionality
