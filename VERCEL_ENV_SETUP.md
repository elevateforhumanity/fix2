# 🔧 Vercel Environment Variables Setup

**Purpose**: Configure environment variables so courses display correctly  
**Time**: 5 minutes  
**Result**: Courses visible in admin dashboard

---

## 🎯 Current Situation

### What's Happening:
Your Vercel deployment at `fix2-gpql-r0x49ne29-elevate-48e460c9.vercel.app` needs environment variables configured to:
1. Connect to Supabase database (for real courses)
2. OR use mock data fallback (for testing)

### Two Options:

**Option 1: Use Mock Data (Quick - Works Now)**
- No environment variables needed
- Shows 17 sample courses
- Good for testing/demos
- Blue banner shows "Using Mock Data"

**Option 2: Connect Real Database (Production)**
- Requires Supabase credentials
- Shows real courses from database
- Full enrollment functionality
- No mock data banner

---

## 🚀 Option 1: Deploy with Mock Data (Recommended First)

### Current Status:
✅ **Already working!** The code I just pushed includes mock data fallback.

### What You'll See:
When you visit: `https://fix2-gpql-r0x49ne29-elevate-48e460c9.vercel.app/admin/courses`

You should see:
- ✅ 17 courses displayed
- ✅ Blue banner: "Using Mock Course Data"
- ✅ All course details visible
- ✅ No errors

### No Action Needed:
The app automatically uses mock data when Supabase credentials aren't configured.

---

## 🔧 Option 2: Configure Supabase (For Production)

### Step 1: Access Vercel Dashboard
```
1. Go to: https://vercel.com/elevate-48e460c9/fix2-gpql
2. Click "Settings" tab
3. Click "Environment Variables" in left sidebar
```

### Step 2: Check Current Variables
Look for these variables:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

**If they exist**:
- Check if they're placeholders (contain "placeholder")
- If yes, update them with real credentials
- If no, they're already configured

**If they don't exist**:
- You need to add them (see Step 3)

### Step 3: Get Supabase Credentials

**A. Create Supabase Account** (if you don't have one):
```
1. Go to: https://supabase.com
2. Sign up (free tier available)
3. Create new project:
   - Name: elevate-for-humanity
   - Password: (choose strong password)
   - Region: East US (closest to you)
4. Wait 2 minutes for setup
```

**B. Get Your Credentials**:
```
1. In Supabase dashboard, click "Settings" (gear icon)
2. Click "API"
3. Copy these 3 values:
   
   Project URL:
   https://xxxxxxxxxxxxx.supabase.co
   
   anon/public key:
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxx...
   
   service_role key:
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.yyyyyy...
```

### Step 4: Add Variables to Vercel

**In Vercel Settings → Environment Variables**:

1. **Add NEXT_PUBLIC_SUPABASE_URL**:
   ```
   Name: NEXT_PUBLIC_SUPABASE_URL
   Value: https://xxxxxxxxxxxxx.supabase.co
   Environment: Production, Preview, Development (check all)
   ```

2. **Add NEXT_PUBLIC_SUPABASE_ANON_KEY**:
   ```
   Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxx...
   Environment: Production, Preview, Development (check all)
   ```

3. **Add SUPABASE_SERVICE_ROLE_KEY**:
   ```
   Name: SUPABASE_SERVICE_ROLE_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.yyyyyy...
   Environment: Production, Preview, Development (check all)
   ```

4. **Click "Save"**

### Step 5: Redeploy

After adding variables:
```
1. Go to: https://vercel.com/elevate-48e460c9/fix2-gpql
2. Click "Deployments" tab
3. Find latest deployment
4. Click "..." menu → "Redeploy"
5. Click "Redeploy" button
6. Wait 2-3 minutes
```

### Step 6: Run Database Migrations

**In Supabase SQL Editor**:
```
1. Go to Supabase dashboard
2. Click "SQL Editor"
3. Click "New query"
4. Copy contents of: supabase/COMPLETE_MIGRATION.sql
5. Paste and click "Run"
6. Wait for success message
```

### Step 7: Verify

Visit: `https://fix2-gpql-r0x49ne29-elevate-48e460c9.vercel.app/admin/courses`

You should see:
- ✅ 17 courses displayed
- ✅ NO blue banner (using real database)
- ✅ All course details visible
- ✅ Can enroll students

---

## 📋 Quick Check: What's Currently Configured

### Check Environment Variables:

**Method 1: Vercel Dashboard**
```
1. Go to: https://vercel.com/elevate-48e460c9/fix2-gpql/settings/environment-variables
2. Look for:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
3. Check if values are placeholders or real
```

**Method 2: Check Deployment Logs**
```
1. Go to latest deployment
2. Click "Build Logs"
3. Look for:
   "Using mock courses data" = No real credentials
   "Connected to Supabase" = Real credentials configured
```

---

## 🎯 Recommended Approach

### For Testing (Now):
1. ✅ **Do nothing** - mock data already works
2. ✅ Visit deployment URL
3. ✅ See 17 courses with blue banner
4. ✅ Test UI and functionality

### For Production (Later):
1. ⏳ Set up Supabase account
2. ⏳ Add environment variables to Vercel
3. ⏳ Redeploy
4. ⏳ Run database migrations
5. ✅ Full functionality with real database

---

## 🔍 How to Verify Current Status

### Visit Admin Courses Page:
```
https://fix2-gpql-r0x49ne29-elevate-48e460c9.vercel.app/admin/courses
```

### What You'll See:

**If Using Mock Data** (current state):
```
✅ Page loads
✅ Shows "17 courses in the system"
✅ Blue banner: "Using Mock Course Data"
✅ Link to "View Activation Guide"
✅ All 17 course cards display
```

**If Using Real Database** (after configuration):
```
✅ Page loads
✅ Shows "X courses in the system" (from database)
✅ NO blue banner
✅ All courses from database display
✅ Can create/edit/delete courses
```

---

## 📊 Environment Variables Reference

### Required for Real Database:
```bash
# Supabase Connection
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Optional (Recommended):
```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org

# OpenAI (for AI features)
OPENAI_API_KEY=sk-...

# Email (for notifications)
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@elevateforhumanity.org

# Analytics
NEXT_PUBLIC_GA_ID=G-EFHWORKFORCE01
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your-pixel-id
```

### Not Required (Mock Data Works):
If you don't set Supabase variables, the app automatically:
- ✅ Uses mock data
- ✅ Shows 17 sample courses
- ✅ Displays blue banner
- ✅ Works for testing/demos

---

## 🚨 Common Issues

### Issue 1: "No courses found"
**Cause**: Environment variables not set AND mock data not loading  
**Fix**: Check browser console for errors, redeploy

### Issue 2: "Database connection error"
**Cause**: Invalid Supabase credentials  
**Fix**: Double-check credentials in Vercel settings

### Issue 3: "Courses show but can't enroll"
**Cause**: Using mock data (by design)  
**Fix**: This is expected - add real Supabase credentials for enrollment

### Issue 4: Blue banner won't go away
**Cause**: Still using mock data  
**Fix**: Add Supabase credentials and redeploy

---

## ✅ Success Checklist

### Current Deployment (Mock Data):
- [ ] Visit deployment URL
- [ ] See admin courses page
- [ ] See 17 courses displayed
- [ ] See blue "Mock Data" banner
- [ ] All course details visible
- [ ] No errors in console

### After Adding Credentials:
- [ ] Environment variables added to Vercel
- [ ] Redeployed successfully
- [ ] Database migrations run
- [ ] Visit deployment URL
- [ ] NO blue banner
- [ ] Courses from database display
- [ ] Can enroll students

---

## 📞 Quick Links

### Vercel:
- **Dashboard**: https://vercel.com/elevate-48e460c9/fix2-gpql
- **Environment Variables**: https://vercel.com/elevate-48e460c9/fix2-gpql/settings/environment-variables
- **Deployments**: https://vercel.com/elevate-48e460c9/fix2-gpql/deployments

### Supabase:
- **Sign Up**: https://supabase.com
- **Dashboard**: https://app.supabase.com

### Test URLs:
- **Admin Courses**: https://fix2-gpql-r0x49ne29-elevate-48e460c9.vercel.app/admin/courses
- **Student Courses**: https://fix2-gpql-r0x49ne29-elevate-48e460c9.vercel.app/student/courses
- **Programs**: https://fix2-gpql-r0x49ne29-elevate-48e460c9.vercel.app/programs

---

## 🎉 Summary

### Current Status:
✅ **Code deployed with mock data fallback**  
✅ **Courses will display automatically**  
✅ **No environment variables required for testing**

### What to Do:
1. **Now**: Wait 3-4 minutes for deployment to complete
2. **Then**: Visit admin courses page
3. **See**: 17 courses with blue banner
4. **Later**: Add Supabase credentials when ready for production

### Result:
- ✅ Courses visible immediately (mock data)
- ✅ Can test UI and functionality
- ✅ Can show stakeholders
- ⏳ Add real database when ready

---

**Status**: ✅ **READY TO TEST**  
**Action**: Visit deployment URL in 3-4 minutes  
**Expected**: 17 courses with mock data banner

---

*Last Updated: November 19, 2025*  
*Document: VERCEL_ENV_SETUP.md*
