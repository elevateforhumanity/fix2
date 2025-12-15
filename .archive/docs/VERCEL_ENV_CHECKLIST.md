# Vercel Environment Variables Checklist

## ✅ Required Variables (Must be in Vercel)

### Database & Authentication
- [x] `NEXT_PUBLIC_SUPABASE_URL`
- [x] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [x] `SUPABASE_SERVICE_ROLE_KEY`
- [x] `SUPABASE_DB_URL`

### Stripe Payments
- [x] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [x] `STRIPE_SECRET_KEY`

### Site Configuration
- [x] `NEXT_PUBLIC_SITE_URL` (should be https://www.elevateforhumanity.org)
- [x] `NEXT_PUBLIC_ORGANIZATION_NAME`

### Authentication
- [x] `NEXTAUTH_SECRET`
- [x] `NEXTAUTH_URL` (should be https://www.elevateforhumanity.org)

### Email
- [x] `RESEND_API_KEY`
- [x] `SMTP_FROM_EMAIL`

### Analytics
- [x] `NEXT_PUBLIC_GA_MEASUREMENT_ID`

### AI Features (Optional)
- [x] `OPENAI_API_KEY`

## 🔍 Verify in Vercel Dashboard

1. Go to: https://vercel.com/dashboard
2. Select project: elevateforhumanity/fix2
3. Go to: Settings → Environment Variables
4. Check all variables above are present for:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

## ⚠️ Important Notes

- Production `NEXT_PUBLIC_SITE_URL` must be `https://www.elevateforhumanity.org`
- Production `NEXTAUTH_URL` must be `https://www.elevateforhumanity.org`
- All secrets should be different from development values
