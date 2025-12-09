# 🔧 Environment Variables - Ready to Add

## ✅ Google Analytics ID Confirmed

**Your Google Analytics ID**: `G-SWPG2HVYVH`

---

## 📋 Add These to Vercel Dashboard

### Go to: https://vercel.com/dashboard
### Project: fix2-gpql
### Path: Settings → Environment Variables

---

## 🚨 REQUIRED (Add These First)

### 1. Supabase URL
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: [Get from https://supabase.com/dashboard → Settings → API]
Environments: ✅ Production ✅ Preview ✅ Development
```

### 2. Supabase Anon Key
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: [Get from https://supabase.com/dashboard → Settings → API]
Environments: ✅ Production ✅ Preview ✅ Development
```

### 3. Supabase Service Role Key
```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: [Get from https://supabase.com/dashboard → Settings → API]
Environments: ✅ Production ✅ Preview ✅ Development
```

### 4. Site URL
```
Name: NEXT_PUBLIC_SITE_URL
Value: https://www.elevateforhumanity.org
Environments: ✅ Production ✅ Preview ✅ Development
```

---

## ✅ ANALYTICS (Add These Next)

### 5. Google Analytics ✅ YOU HAVE THIS
```
Name: NEXT_PUBLIC_GA_MEASUREMENT_ID
Value: G-SWPG2HVYVH
Environments: ✅ Production ✅ Preview ✅ Development
```

### 6. Facebook Pixel (Optional)
```
Name: NEXT_PUBLIC_FACEBOOK_PIXEL_ID
Value: [Get from https://business.facebook.com/events_manager]
Environments: ✅ Production ✅ Preview ✅ Development
```

---

## 💳 STRIPE (Optional - Only if using payments)

### 7. Stripe Publishable Key
```
Name: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
Value: [Get from https://dashboard.stripe.com/apikeys]
Environments: ✅ Production ✅ Preview ✅ Development
```

### 8. Stripe Secret Key
```
Name: STRIPE_SECRET_KEY
Value: [Get from https://dashboard.stripe.com/apikeys]
Environments: ✅ Production ✅ Preview ✅ Development
```

---

## 🎯 Quick Action Steps

### Step 1: Get Supabase Credentials (5 minutes)
1. Go to: https://supabase.com/dashboard
2. Sign in or create account
3. Select your project (or create new one)
4. Go to: Settings → API
5. Copy these 3 values:
   - Project URL
   - anon public key
   - service_role key

### Step 2: Add to Vercel (5 minutes)
1. Go to: https://vercel.com/dashboard
2. Click on project: **fix2-gpql**
3. Click: Settings → Environment Variables
4. Add each variable:
   - Click "Add New"
   - Enter Name
   - Paste Value
   - Check all 3 environments
   - Click "Save"
5. Repeat for all variables

### Step 3: Redeploy (2 minutes)
1. Go to: Deployments tab
2. Click "..." on latest deployment
3. Click "Redeploy"
4. Wait for completion

---

## ✅ Checklist

### Required Variables (Must Add)
- [ ] NEXT_PUBLIC_SUPABASE_URL
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
- [ ] SUPABASE_SERVICE_ROLE_KEY
- [ ] NEXT_PUBLIC_SITE_URL

### Analytics (Recommended)
- [ ] NEXT_PUBLIC_GA_MEASUREMENT_ID (Value: G-SWPG2HVYVH)
- [ ] NEXT_PUBLIC_FACEBOOK_PIXEL_ID (if you have it)

### Payments (Optional)
- [ ] NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (if using payments)
- [ ] STRIPE_SECRET_KEY (if using payments)

### After Adding
- [ ] Trigger redeploy
- [ ] Wait for deployment to complete
- [ ] Visit site to verify

---

## 🔍 Where to Get Supabase Credentials

### If You Have a Supabase Project:
1. Go to: https://supabase.com/dashboard
2. Click on your project
3. Click Settings (gear icon)
4. Click API
5. Copy the values

### If You DON'T Have a Supabase Project:
1. Go to: https://supabase.com/dashboard
2. Click "New Project"
3. Fill in:
   - Name: Elevate For Humanity
   - Database Password: (create strong password - save it!)
   - Region: US East (or closest to you)
4. Click "Create new project"
5. Wait 2-3 minutes for project to be ready
6. Go to Settings → API
7. Copy the values

---

## 📊 Expected Result

After adding variables and redeploying:

✅ Site loads at: https://www.elevateforhumanity.org
✅ No console errors
✅ Google Analytics tracking works
✅ Forms work (if Supabase configured)
✅ Database features work

---

## 🆘 Troubleshooting

### "I don't have Supabase credentials"
**Solution**: Create a new Supabase project (free) at https://supabase.com

### "I can't find my Vercel project"
**Solution**: Make sure you're logged into the correct Vercel account

### "Deployment still failing"
**Solution**: Check Vercel deployment logs for specific error message

### "Site loads but forms don't work"
**Solution**: Make sure all 4 required Supabase variables are added

---

## ⏱️ Total Time: ~12 minutes

- Get Supabase credentials: 5 minutes
- Add to Vercel: 5 minutes
- Redeploy: 2 minutes

---

**Your Google Analytics is ready to go!**
**Just need to add Supabase credentials and you're live!** 🚀
