# Vercel Deployment Guide

## Why Vercel Instead of Netlify?

**Vercel is the ONLY recommended platform for this Next.js 16 application.**

### Why Vercel Wins:
- ✅ **Built by the Next.js team** - Vercel created Next.js
- ✅ **Native App Router support** - Optimized for Next.js 16 with Turbopack
- ✅ **Zero configuration** - Automatically detects Next.js settings
- ✅ **Better error reporting** - Clear build logs and debugging
- ✅ **Edge Functions** - Proper serverless runtime for API routes
- ✅ **Automatic optimization** - Image optimization, caching, CDN

### Why Netlify Fails:
- ❌ Not optimized for Next.js 16 with Turbopack
- ❌ Serverless functions have different runtime than Vercel Edge
- ❌ Build process doesn't handle App Router as well
- ❌ More configuration required
- ❌ Slower builds and deployments

## Quick Deploy to Vercel

### Option 1: Deploy from GitHub (Recommended)

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Go to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**:
   Add these in Vercel dashboard under Settings → Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx
   SUPABASE_SERVICE_ROLE_KEY=eyJxxx
   RESEND_API_KEY=re_xxxxx
   EMAIL_FROM=Elevate for Humanity <noreply@elevateforhumanity.org>
   MOU_ARCHIVE_EMAIL=agreements@elevateforhumanity.org
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
   STRIPE_SECRET_KEY=sk_live_xxx
   STRIPE_WEBHOOK_SECRET=whsec_xxx
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

4. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy
   - Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Deploy to production
vercel --prod
```

## Build Configuration

Vercel automatically detects Next.js projects. No configuration needed!

The following files are already configured:
- ✅ `next.config.ts` - Next.js configuration
- ✅ `package.json` - Build scripts
- ✅ `tsconfig.json` - TypeScript configuration

## Environment Variables

### Required Variables:
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### Optional but Recommended:
```env
RESEND_API_KEY=
EMAIL_FROM=
MOU_ARCHIVE_EMAIL=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

## Custom Domain

1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `elevateconnectsdirectory.org`)
4. Follow DNS configuration instructions
5. Vercel automatically provisions SSL certificate

## Continuous Deployment

Once connected to GitHub:
- ✅ Every push to `main` automatically deploys to production
- ✅ Pull requests get preview deployments
- ✅ Automatic rollback if build fails
- ✅ Preview URLs for testing before merge

## Monitoring and Analytics

Vercel provides built-in:
- 📊 Real-time analytics
- 🚀 Performance metrics
- 🐛 Error tracking
- 📈 Usage statistics

Access at: `https://vercel.com/[your-username]/[project-name]/analytics`

## Troubleshooting

### Build Fails
1. Check build logs in Vercel dashboard
2. Verify all environment variables are set
3. Test build locally: `pnpm build`

### Environment Variables Not Working
- Make sure to redeploy after adding/changing variables
- Check variable names match exactly (case-sensitive)
- Verify `NEXT_PUBLIC_` prefix for client-side variables

### Database Connection Issues
- Verify Supabase URL and keys are correct
- Check Supabase project is not paused
- Ensure service role key has proper permissions

## Migration from Netlify

If you're currently on Netlify:

1. **Export environment variables** from Netlify
2. **Import to Vercel** via dashboard or CLI
3. **Update DNS** to point to Vercel
4. **Delete Netlify deployment** once verified

## Support

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)
- Vercel Support: [vercel.com/support](https://vercel.com/support)

---

**Your site is already deployed on Vercel**: [fix2-one.vercel.app](https://fix2-one.vercel.app)

To update it, just push to your GitHub repository!
