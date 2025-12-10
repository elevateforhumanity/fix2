# Deployment Instructions

## Vercel Deployment (Manual)

Since Vercel CLI requires authentication, deploy using one of these methods:

### Option 1: Vercel Dashboard (Recommended)
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project: `elevateforhumanity/fix2`
3. Click "Deployments" tab
4. Click "Redeploy" on the latest deployment
5. Select "Use existing Build Cache" (optional)
6. Click "Redeploy"

### Option 2: Git Push (Automatic)
Vercel automatically deploys when you push to main:
```bash
git push origin main
```
✅ Already done - Latest commit: `4097fb4d2`

### Option 3: Vercel CLI (Requires Login)
```bash
# Login first
vercel login

# Then deploy
vercel --prod
```

## Deployment Checklist

### Pre-Deployment ✅
- [x] Build passes locally
- [x] All tests pass
- [x] Images optimized
- [x] Gradients removed
- [x] Logo consistent
- [x] TypeScript compiles
- [x] Working tree clean

### Environment Variables (Verify in Vercel)
Go to: Project Settings → Environment Variables

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_SITE_NAME`
- `NEXT_PUBLIC_SITE_URL`

### Post-Deployment Verification

Once deployed, verify these URLs:

1. **Homepage**
   - https://www.elevateforhumanity.org/
   - Check: Logo displays, hero loads, navigation works

2. **Programs**
   - https://www.elevateforhumanity.org/programs
   - Check: All programs listed, images load

3. **Apply Form**
   - https://www.elevateforhumanity.org/apply
   - Check: Form loads, validation works

4. **Contact**
   - https://www.elevateforhumanity.org/contact
   - Check: Contact info displays, form works

5. **Student Portal** (Protected)
   - https://www.elevateforhumanity.org/student/dashboard
   - Check: Redirects to login

6. **Admin Dashboard** (Protected)
   - https://www.elevateforhumanity.org/admin
   - Check: Redirects to login

## Build Output

Expected build results:
- ✅ 775 static pages generated
- ✅ No TypeScript errors
- ✅ No build warnings
- ✅ All routes compiled

## Deployment Status

**Current Status:** Ready to deploy
**Last Commit:** `4097fb4d2` - Add one-shot fix pack completion summary
**Branch:** main
**Build Status:** ✅ Passing

## Troubleshooting

### If build fails:
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### If images don't load:
- Check that images exist in `public/` directory
- Verify image paths are correct (no `/public/` prefix)
- Check Vercel logs for 404 errors

### If environment variables are missing:
- Go to Vercel Dashboard → Project Settings → Environment Variables
- Add missing variables for Production and Preview
- Redeploy after adding variables

## Next Steps After Deployment

1. ✅ Verify all pages load correctly
2. ✅ Test form submissions
3. ✅ Check mobile responsiveness
4. ✅ Run Lighthouse audit
5. ✅ Monitor error logs in Vercel dashboard
