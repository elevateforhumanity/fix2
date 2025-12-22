# Deploy Webhook Fix to Vercel

## Issue Fixed

Webhook endpoints were returning 403 Forbidden due to incorrect signature verification logic.

## Changes Made

- Updated `/app/api/webhooks/partners/[partner]/route.ts`
- Changed from complex partner-specific signature verification to simple secret comparison
- Now uses `X-Webhook-Secret` header with direct string comparison

## Deployment Steps

### Option 1: Push to GitHub (Automatic Deployment)

```bash
git push origin main
```

Vercel will automatically deploy the changes.

### Option 2: Manual Deployment via Vercel CLI

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Deploy
vercel --prod
```

### Option 3: Redeploy via Vercel Dashboard

1. Go to https://vercel.com/elevateforhumanity/fix2
2. Click on the latest deployment
3. Click "Redeploy" button
4. Select "Use existing Build Cache" (faster)
5. Click "Redeploy"

## After Deployment

### Test Webhooks Again

```bash
cd /workspaces/fix2
./test-webhooks.sh
```

### Expected Results

All 5 endpoints should return:

```
{"success":true}
HTTP Status: 200
```

### If Still Getting Errors

**403 Forbidden:**

- Check PARTNER_WEBHOOK_SECRET is set in Vercel
- Verify secret matches: `PGd3vzck5RBRP+SIv6t4+LSpsGIkcra9ZaKCy8hCvRU=`

**401 Unauthorized:**

- Secret mismatch
- Check header is `X-Webhook-Secret` (capital X)

**500 Internal Server Error:**

- Check Vercel logs
- Verify SUPABASE_SERVICE_ROLE_KEY is set

## Verification

After successful deployment:

1. Test all 5 webhook endpoints
2. Check Vercel function logs
3. Verify no errors in logs
4. Ready for partner configuration!

---

**Status:** Ready to deploy
**Time:** ~2-5 minutes (automatic deployment)
