# 🚀 Deploying to Production

## Status: Ready to Deploy ✅

- ✅ Build passes
- ✅ Vercel project linked
- ✅ Vercel CLI installed
- ✅ Vercel token configured
- ✅ Migrations run (you confirmed)

---

## Deployment Command

```bash
cd /workspaces/fix2
vercel --prod --yes
```

This will:

1. Upload your build to Vercel
2. Deploy to production
3. Give you a live URL

**Time:** 2-5 minutes

---

## What Happens During Deployment

1. **Upload** - Code is uploaded to Vercel
2. **Build** - Vercel runs `npm run build` (we already verified this works)
3. **Deploy** - Site goes live
4. **URL** - You get a production URL

---

## After Deployment

### 1. Test Your Site

Visit your production URL and test:

- ✅ Homepage loads
- ✅ Navigation works
- ✅ Programs page loads
- ✅ Login works
- ✅ Stripe checkout works (if migrations ran)

### 2. Check Environment Variables

Make sure these are set in Vercel dashboard:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`

### 3. Set Up Stripe Webhook (Production)

1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-domain.com/api/stripe/webhook`
3. Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
4. Copy webhook secret
5. Add to Vercel env vars as `STRIPE_WEBHOOK_SECRET`

---

## Deployment Options

### Option 1: Deploy Now (Recommended)

```bash
vercel --prod --yes
```

### Option 2: Preview First

```bash
# Deploy to preview URL first
vercel

# Then promote to production
vercel --prod
```

### Option 3: Via Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click "Deploy"
4. Select branch: `main`
5. Click "Deploy"

---

## Expected Output

```
Vercel CLI 50.1.3
🔍 Inspect: https://vercel.com/...
✅ Production: https://fix2.vercel.app [2m]
```

---

## Troubleshooting

### Build Fails

- Check Vercel build logs
- Verify environment variables are set
- Check for missing dependencies

### Site Loads But Features Don't Work

- Check browser console for errors
- Verify Supabase credentials
- Check Stripe keys

### Stripe Checkout Fails

- Verify migrations ran in Supabase
- Check Stripe keys in Vercel
- Test webhook endpoint

---

## Post-Deployment Checklist

- [ ] Site loads at production URL
- [ ] Homepage displays correctly
- [ ] Navigation works
- [ ] Login/signup works
- [ ] Programs page loads
- [ ] Stripe checkout works
- [ ] Mobile responsive
- [ ] No console errors

---

## Custom Domain (Optional)

To add your own domain:

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add domain: `elevateforhumanity.com`
3. Follow DNS instructions
4. Wait for DNS propagation (5-60 minutes)

---

## 🎉 Ready to Deploy!

Run this command:

```bash
vercel --prod --yes
```

**Your site will be live in 2-5 minutes!**
