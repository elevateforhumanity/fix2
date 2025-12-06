# Deployment Guide - Elevate For Humanity

**Status:** Ready to Deploy  
**Platform:** Vercel (Recommended)  
**Time Required:** 15-30 minutes

---

## Prerequisites Checklist

Before deploying, ensure you have:

- [ ] Supabase account and project created
- [ ] Database migrations applied
- [ ] Test data seeded
- [ ] Environment variables ready
- [ ] GitHub repository (optional but recommended)

---

## Option 1: Deploy via Vercel Dashboard (Easiest)

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub (recommended)
3. Verify your email

### Step 2: Import Project
1. Click "Add New Project"
2. Import from Git Repository
3. Select your GitHub repo: `elevateforhumanity/fix2`
4. Click "Import"

### Step 3: Configure Project
1. **Framework Preset:** Next.js (auto-detected)
2. **Root Directory:** `./` (leave as is)
3. **Build Command:** `pnpm build` (auto-detected)
4. **Output Directory:** `.next` (auto-detected)
5. **Install Command:** `pnpm install` (auto-detected)

### Step 4: Add Environment Variables
Click "Environment Variables" and add these:

**Required:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://your-domain.vercel.app
```

**Optional (for payments):**
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Optional (for emails):**
```bash
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM=noreply@yourdomain.com
```

### Step 5: Deploy
1. Click "Deploy"
2. Wait 3-5 minutes for build
3. Get your deployment URL: `https://your-project.vercel.app`

---

## Option 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login
```bash
vercel login
```

### Step 3: Link Project
```bash
cd /workspaces/fix2
vercel link
```

Follow prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N** (first time)
- Project name? `elevate-for-humanity`
- Directory? `./`

### Step 4: Add Environment Variables
```bash
# Add production environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add NEXT_PUBLIC_SITE_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production
```

Or add via dashboard: https://vercel.com/dashboard

### Step 5: Deploy
```bash
# Deploy to production
vercel --prod
```

---

## Option 3: Deploy via GitHub Integration (Recommended)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Connect Vercel to GitHub
1. Go to https://vercel.com/new
2. Import Git Repository
3. Select your repo
4. Configure as in Option 1
5. Deploy

### Benefits:
- ✅ Auto-deploy on every push
- ✅ Preview deployments for PRs
- ✅ Rollback capability
- ✅ CI/CD built-in

---

## Environment Variables Reference

### Critical (Must Have)

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public key | `eyJhbGc...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase admin key | `eyJhbGc...` |
| `NEXT_PUBLIC_SITE_URL` | Your domain | `https://yourdomain.com` |
| `NEXTAUTH_SECRET` | Auth secret | Generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Auth callback URL | Same as SITE_URL |

### Optional (Recommended)

| Variable | Description | When Needed |
|----------|-------------|-------------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key | For payments |
| `STRIPE_SECRET_KEY` | Stripe secret key | For payments |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | For payment webhooks |
| `SENDGRID_API_KEY` | SendGrid API key | For emails |
| `SENTRY_DSN` | Sentry error tracking | For monitoring |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics | For analytics |

---

## Post-Deployment Checklist

### Immediate (First 5 minutes)
- [ ] Visit deployment URL
- [ ] Check homepage loads
- [ ] Test navigation
- [ ] Verify images load
- [ ] Check mobile view

### Important (First 30 minutes)
- [ ] Test user registration
- [ ] Test login/logout
- [ ] Test course enrollment
- [ ] Check database connection
- [ ] Verify API routes work

### Critical (First Hour)
- [ ] Test payment flow (if enabled)
- [ ] Check email sending (if enabled)
- [ ] Verify SSL certificate
- [ ] Test all major routes
- [ ] Check error logging

---

## Custom Domain Setup

### Step 1: Add Domain in Vercel
1. Go to Project Settings > Domains
2. Add your domain: `www.elevateforhumanity.org`
3. Add apex domain: `elevateforhumanity.org`

### Step 2: Configure DNS
Add these records to your DNS provider:

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**For apex domain:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**Alternative (recommended):**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

### Step 3: Wait for DNS Propagation
- Usually takes 5-30 minutes
- Can take up to 48 hours
- Check status: https://www.whatsmydns.net

### Step 4: Enable SSL
- Vercel automatically provisions SSL
- Usually ready in 5-10 minutes
- Certificate auto-renews

---

## Troubleshooting

### Build Fails

**Error: "Module not found"**
```bash
# Solution: Clear cache and rebuild
vercel --force
```

**Error: "Environment variable not found"**
```bash
# Solution: Add missing env vars
vercel env add VARIABLE_NAME production
```

### Runtime Errors

**Error: "Database connection failed"**
- Check Supabase URL is correct
- Verify anon key is valid
- Ensure service role key is set
- Check Supabase project is active

**Error: "Authentication failed"**
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches deployment URL
- Ensure Supabase auth is enabled

### Performance Issues

**Slow page loads:**
- Enable Vercel Analytics
- Check image optimization
- Review bundle size
- Enable caching headers

---

## Monitoring Setup

### 1. Vercel Analytics (Built-in)
```bash
# Enable in Vercel dashboard
Project Settings > Analytics > Enable
```

### 2. Sentry Error Tracking
```bash
# Add to environment variables
SENTRY_DSN=https://xxx@sentry.io/xxx
SENTRY_ENVIRONMENT=production
```

### 3. Google Analytics
```bash
# Add to environment variables
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## Rollback Procedure

### Via Vercel Dashboard
1. Go to Deployments
2. Find previous working deployment
3. Click "..." menu
4. Select "Promote to Production"

### Via CLI
```bash
# List deployments
vercel ls

# Rollback to specific deployment
vercel rollback [deployment-url]
```

---

## Scaling Considerations

### Free Tier Limits
- 100GB bandwidth/month
- 100 deployments/day
- Serverless functions: 100GB-hours

### Pro Tier ($20/month)
- 1TB bandwidth/month
- Unlimited deployments
- Advanced analytics
- Team collaboration

### Enterprise
- Custom bandwidth
- SLA guarantees
- Dedicated support
- Advanced security

---

## Security Checklist

- [ ] All environment variables set
- [ ] No secrets in code
- [ ] HTTPS enabled
- [ ] CORS configured
- [ ] Rate limiting enabled
- [ ] Input validation active
- [ ] SQL injection protection
- [ ] XSS protection enabled

---

## Performance Optimization

### Before Deployment
- [ ] Run `pnpm build` locally
- [ ] Check bundle size
- [ ] Optimize images
- [ ] Enable compression
- [ ] Minify assets

### After Deployment
- [ ] Enable Vercel Analytics
- [ ] Set up CDN
- [ ] Configure caching
- [ ] Monitor Core Web Vitals
- [ ] Optimize database queries

---

## Backup Strategy

### Database Backups
- Supabase: Automatic daily backups (Pro plan)
- Manual: Export via Supabase dashboard
- Frequency: Daily recommended

### Code Backups
- GitHub: Automatic with every push
- Vercel: Keeps deployment history
- Local: Regular git commits

---

## Support Resources

**Vercel:**
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support
- Status: https://vercel-status.com

**Supabase:**
- Docs: https://supabase.com/docs
- Support: https://supabase.com/support
- Status: https://status.supabase.com

**Next.js:**
- Docs: https://nextjs.org/docs
- GitHub: https://github.com/vercel/next.js

---

## Quick Deploy Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Open in browser
vercel open
```

---

## Estimated Costs

### Development/Testing
- Vercel: Free
- Supabase: Free (500MB DB)
- **Total: $0/month**

### Production (Small)
- Vercel Pro: $20/month
- Supabase Pro: $25/month
- **Total: $45/month**

### Production (Medium)
- Vercel Pro: $20/month
- Supabase Pro: $25/month
- SendGrid: $15/month
- Sentry: $26/month
- **Total: $86/month**

---

## Next Steps After Deployment

1. **Test Everything**
   - All pages load
   - Forms work
   - Database connected
   - Payments work (if enabled)

2. **Set Up Monitoring**
   - Vercel Analytics
   - Sentry errors
   - Google Analytics

3. **Configure Domain**
   - Add custom domain
   - Set up SSL
   - Configure redirects

4. **Enable Features**
   - Email notifications
   - Payment processing
   - User authentication

5. **Launch Marketing**
   - Submit to Google
   - Social media
   - Email campaigns

---

**Ready to deploy?** Follow Option 1 (Vercel Dashboard) for the easiest deployment.

**Need help?** Check the troubleshooting section or contact support.

---

**Last Updated:** December 6, 2024
