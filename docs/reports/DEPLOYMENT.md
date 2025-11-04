# Deployment Guide - Elevate for Humanity

## Stack Overview

- **Frontend Hosting**: Netlify
- **CDN/Security/DNS**: Cloudflare (proxy + DDoS protection + caching + R2 storage)
- **Database + Auth + Backend API**: Supabase

## Netlify Configuration

### Site Information

- **Site Name**: elevateforhumanityfix2
- **Production URL**: https://elevateforhumanityfix2.netlify.app
- **Repository**: elevateforhumanity/fix2
- **Deploy URL**: https://app.netlify.com/projects/elevateforhumanityfix2

### Build Settings

**Build command:**

```bash
npm run build
```

**Publish directory:**

```
dist
```

**Node version:**

```
18.x or higher
```

### Environment Variables

Add these in Netlify Dashboard → Site Settings → Environment Variables:

```bash
VITE_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.DyFtzoKha_tuhKiSIPoQlKonIpaoSYrlhzntCUvLUnA
```

### Deploy Settings

- **Auto-deploy**: Enabled on `main` branch
- **Deploy previews**: Enabled for pull requests
- **Branch deploys**: Enabled

## Supabase Configuration

### Project Information

- **Project URL**: https://cuxzzpsyufcewtmicszk.supabase.co
- **Dashboard**: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk

### Features Used

- PostgreSQL Database
- Authentication (Email/Password, OAuth)
- Row Level Security (RLS)
- Storage (if applicable)
- Edge Functions (if applicable)

### Local Development

1. Install Supabase CLI:

```bash
npm install -g supabase
```

2. Link to project:

```bash
supabase link --project-ref cuxzzpsyufcewtmicszk
```

3. Pull schema:

```bash
supabase db pull
```

## Local Development

1. **Install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

```bash
cp .env.example .env
# Edit .env with your Supabase credentials
```

3. **Run development server:**

```bash
npm run dev
```

4. **Build for production:**

```bash
npm run build
```

5. **Preview production build:**

```bash
npm run preview
```

## Deployment Process

### Automatic Deployment

- Push to `main` branch triggers automatic deployment to Netlify
- Build logs available in Netlify dashboard

### Manual Deployment

1. Go to Netlify dashboard
2. Click "Trigger deploy" → "Deploy site"

### Deploy from CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## Troubleshooting

### Build Failures

1. Check Netlify build logs
2. Verify environment variables are set
3. Test build locally: `npm run build`
4. Check Node version compatibility

### Supabase Connection Issues

1. Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
2. Check Supabase project status
3. Verify RLS policies allow access
4. Check browser console for errors

### Routing Issues

- Netlify uses `public/_redirects` for SPA routing
- All routes fallback to `/index.html`
- Static assets served directly

## Cloudflare Configuration

Cloudflare is used for CDN, security, and DNS (NOT Cloudflare Pages).

### Setup:

1. **DNS Records** (in Cloudflare dashboard):
   - Point your domain to Netlify
   - Enable proxy (orange cloud icon) for CDN/security
2. **SSL/TLS Settings**:
   - Mode: Full (strict)
   - Always Use HTTPS: On
   - Automatic HTTPS Rewrites: On

3. **Security Settings**:
   - DDoS Protection: Enabled (automatic)
   - WAF (Web Application Firewall): Configure rules as needed
   - Bot Fight Mode: Consider enabling

4. **Caching**:
   - Browser Cache TTL: Respect Existing Headers
   - Caching Level: Standard
   - Page Rules: Configure for static assets

5. **R2 Storage** (if using):
   - Used for some file storage
   - Configure bucket and access keys

### Custom Domain Setup:

**On Netlify:**

1. Go to Site Settings → Domain Management
2. Add custom domain
3. Note the DNS target (e.g., `apex-loadbalancer.netlify.com`)

**On Cloudflare:**

1. Add DNS records:
   ```
   Type: CNAME
   Name: @ (or subdomain)
   Target: [your-site].netlify.app
   Proxy: Enabled (orange cloud)
   ```
2. SSL/TLS mode: Full (strict)
3. Verify site loads through Cloudflare

## Monitoring

- **Netlify Analytics**: Available in dashboard
- **Cloudflare Analytics**: Traffic, security events, caching stats
- **Supabase Logs**: Available in Supabase dashboard
- **Error Tracking**: Configure Sentry or similar (if needed)

## Architecture Summary

```
User Request
    ↓
Cloudflare (CDN/Security/DNS)
    ├─ DDoS Protection
    ├─ SSL/TLS Encryption
    ├─ Caching (static assets)
    ├─ WAF (firewall rules)
    └─ R2 Storage (some files)
    ↓
Netlify (Frontend Hosting)
    ├─ Static site serving
    ├─ Auto-deploy from GitHub
    └─ Build & optimization
    ↓
Supabase (Backend)
    ├─ PostgreSQL Database
    ├─ Authentication
    ├─ Storage
    └─ Edge Functions
```

## Support

- Netlify Docs: https://docs.netlify.com
- Supabase Docs: https://supabase.com/docs
- Repository Issues: https://github.com/elevateforhumanity/fix2/issues
