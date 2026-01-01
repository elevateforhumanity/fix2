# Enable Domain Auto-Assignment in Vercel

## 🎯 THE ISSUE

**Error:** "Custom domains won't be assigned—auto-assignment is disabled."

**What this means:** Vercel won't automatically assign your custom domain (www.elevateforhumanity.org) to new deployments.

---

## ✅ HOW TO FIX

### Step 1: Go to Vercel Dashboard

1. Open [https://vercel.com](https://vercel.com)
2. Log in to your account
3. Select your project: **fix2**

---

### Step 2: Go to Settings

1. Click **Settings** tab (top navigation)
2. Scroll down to **Domains** section

---

### Step 3: Enable Auto-Assignment

Look for one of these options:

**Option A: "Automatically assign domains to Production"**

- Toggle this **ON**

**Option B: "Production Branch"**

- Make sure it's set to: **main**
- Check "Automatically assign domains"

**Option C: Domain Settings**

- Click on your domain: **www.elevateforhumanity.org**
- Look for "Auto-assign to Production"
- Enable it

---

## 🔍 ALTERNATIVE: Manual Assignment

If you can't find auto-assignment, manually assign the domain:

### In Vercel Dashboard:

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **3 dots** menu (⋮)
4. Select **"Assign Domain"**
5. Choose: **www.elevateforhumanity.org**
6. Click **Assign**

---

## 📋 WHAT TO CHECK

### 1. Production Branch Setting

**Location:** Settings → Git  
**Should be:** `main`

### 2. Domain Configuration

**Location:** Settings → Domains  
**Should show:**

- ✅ www.elevateforhumanity.org (Production)
- ✅ elevateforhumanity.org (Redirect to www)

### 3. Deployment Settings

**Location:** Settings → Git  
**Should have:**

- ✅ "Deploy on push to main" enabled
- ✅ "Auto-assign domains" enabled

---

## 🚨 COMMON CAUSES

### Cause 1: Preview Deployments Only

**Problem:** Vercel is only creating preview deployments, not production  
**Fix:** Set production branch to `main`

### Cause 2: Domain Not Verified

**Problem:** Domain ownership not verified  
**Fix:** Verify domain in Vercel dashboard

### Cause 3: Multiple Projects

**Problem:** Domain assigned to different project  
**Fix:** Remove from other project, assign to fix2

### Cause 4: Auto-Assignment Disabled

**Problem:** Setting is turned off  
**Fix:** Enable in Settings → Domains

---

## 📊 VERIFICATION

After enabling, check:

1. **Push a new commit** (any small change)
2. **Wait for deployment** (2-3 minutes)
3. **Check domain assignment:**
   - Go to Deployments tab
   - Latest deployment should show: "www.elevateforhumanity.org"

---

## 🔧 QUICK FIX (If Urgent)

If you need the site working NOW:

1. Go to latest deployment
2. Click **"Promote to Production"**
3. Domain will be assigned immediately

---

## 📋 STEP-BY-STEP SCREENSHOTS GUIDE

### 1. Open Vercel Dashboard

```
https://vercel.com/[your-account]/fix2
```

### 2. Click "Settings"

```
Top navigation bar → Settings
```

### 3. Find "Domains" Section

```
Left sidebar → Domains
OR
Scroll down to "Domains"
```

### 4. Look for These Settings:

```
☐ Automatically assign domains to Production
☐ Auto-assign custom domains
☐ Production branch: main
```

### 5. Enable All Checkboxes

```
✅ Automatically assign domains to Production
✅ Auto-assign custom domains
✅ Production branch: main
```

---

## ✅ AFTER ENABLING

**What happens:**

1. Every push to `main` creates a production deployment
2. Domain automatically assigned to new deployment
3. Site updates at www.elevateforhumanity.org

**No more manual assignment needed!**

---

## 🎯 SUMMARY

**Problem:** Auto-assignment disabled  
**Location:** Vercel Dashboard → Settings → Domains  
**Fix:** Enable "Automatically assign domains to Production"  
**Result:** Domain auto-assigns on every deployment

---

**Go to Vercel Dashboard now and enable this setting.**

Then your deployments will automatically go to www.elevateforhumanity.org.
