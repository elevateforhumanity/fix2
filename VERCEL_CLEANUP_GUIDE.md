# Vercel Cleanup Guide

**Purpose**: Remove old deployments and clean up Vercel project

---

## 🗑️ What to Clean Up

### 1. Old Deployments
- Previous failed builds
- Test deployments
- Preview deployments from old commits
- Deployments from deleted branches

### 2. Old Domains
- Unused preview domains
- Old custom domains
- Duplicate domain configurations

### 3. Old Environment Variables
- Deprecated variables
- Test/development variables in production
- Duplicate variables

---

## 🚀 Quick Cleanup via Vercel Dashboard

### Step 1: Access Your Project
1. Go to https://vercel.com/dashboard
2. Select your project: `fix2`
3. You should see your deployments list

### Step 2: Delete Old Deployments

**Option A: Bulk Delete (Recommended)**
1. Click "Deployments" tab
2. Filter by status: "Failed" or "Canceled"
3. Select multiple deployments (checkbox)
4. Click "Delete" button
5. Confirm deletion

**Option B: Individual Delete**
1. Click on a deployment
2. Click "..." menu (top right)
3. Select "Delete Deployment"
4. Confirm

**What to Delete**:
- ❌ All failed builds
- ❌ Canceled deployments
- ❌ Old preview deployments (keep last 5-10)
- ✅ Keep: Latest production deployment
- ✅ Keep: Recent successful previews

---

### Step 3: Clean Up Domains

1. Go to "Settings" → "Domains"
2. Review all domains listed
3. Delete unused domains:
   - Old preview domains
   - Test domains
   - Duplicate entries

**Keep**:
- ✅ `fix2-one.vercel.app` (production)
- ✅ Your custom domain (if configured)
- ✅ Active preview domains

**Delete**:
- ❌ `fix2-tlr1.vercel.app` (if unused)
- ❌ `fix2-i3z8.vercel.app` (if unused)
- ❌ Any other old preview domains

---

### Step 4: Clean Up Environment Variables

1. Go to "Settings" → "Environment Variables"
2. Review all variables
3. Delete duplicates or unused variables

**Check for**:
- Duplicate `NEXT_PUBLIC_*` variables
- Old API keys
- Test/development variables in production
- Variables with wrong values

**Keep**:
```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_FACEBOOK_PIXEL_ID
NEXT_PUBLIC_FACEBOOK_APP_ID
NEXT_PUBLIC_GA_MEASUREMENT_ID
RESEND_API_KEY
EMAIL_FROM
NEXT_PUBLIC_APP_URL
```

**Delete**:
- Old Netlify variables
- Duplicate entries
- Test variables
- Deprecated keys

---

## 🔧 Cleanup via Vercel CLI

### Install Vercel CLI
```bash
npm i -g vercel
vercel login
```

### List All Deployments
```bash
vercel ls
```

### Delete Specific Deployment
```bash
vercel rm <deployment-url>
```

### Delete Multiple Deployments (Script)
```bash
# List all deployments and filter failed ones
vercel ls --json | jq -r '.[] | select(.state == "ERROR") | .url' | while read url; do
  vercel rm "$url" --yes
done
```

---

## 📊 Recommended Cleanup Strategy

### Keep:
- ✅ **Latest production deployment** (1)
- ✅ **Recent successful previews** (last 5-10)
- ✅ **Active branch previews** (main, develop)

### Delete:
- ❌ **Failed builds** (all)
- ❌ **Canceled deployments** (all)
- ❌ **Old previews** (older than 30 days)
- ❌ **Deployments from deleted branches**

---

## 🎯 Step-by-Step Cleanup Process

### Phase 1: Delete Failed Builds (5 minutes)
1. Go to Deployments
2. Filter: Status = "Failed"
3. Select all
4. Delete
5. Confirm

**Result**: Remove all failed builds

---

### Phase 2: Delete Old Previews (10 minutes)
1. Go to Deployments
2. Sort by date (oldest first)
3. Select deployments older than 30 days
4. Keep only recent previews
5. Delete selected
6. Confirm

**Result**: Keep only recent deployments

---

### Phase 3: Clean Domains (5 minutes)
1. Go to Settings → Domains
2. Review list
3. Delete unused domains
4. Keep only active domains

**Result**: Clean domain list

---

### Phase 4: Clean Environment Variables (10 minutes)
1. Go to Settings → Environment Variables
2. Review each variable
3. Delete duplicates
4. Delete unused variables
5. Verify production variables are correct

**Result**: Clean, organized environment variables

---

## 🔍 What to Look For

### Red Flags:
- 🚩 100+ deployments (too many)
- 🚩 Multiple failed builds in a row
- 🚩 Duplicate environment variables
- 🚩 Old preview domains still active
- 🚩 Variables with "test" or "dev" in production

### Good Signs:
- ✅ <50 total deployments
- ✅ Latest deployment is successful
- ✅ Clean environment variables
- ✅ Only active domains listed
- ✅ No failed builds in recent history

---

## 📋 Cleanup Checklist

### Deployments:
- [ ] Delete all failed builds
- [ ] Delete all canceled deployments
- [ ] Delete old preview deployments (>30 days)
- [ ] Keep latest production deployment
- [ ] Keep recent successful previews (5-10)

### Domains:
- [ ] Review all domains
- [ ] Delete unused preview domains
- [ ] Delete old custom domains
- [ ] Keep production domain
- [ ] Keep active custom domain

### Environment Variables:
- [ ] Review all variables
- [ ] Delete duplicates
- [ ] Delete test/dev variables from production
- [ ] Verify all required variables are set
- [ ] Check for typos in variable names

### Settings:
- [ ] Review build settings
- [ ] Check deployment protection
- [ ] Verify Git integration
- [ ] Review team access

---

## 🚨 Before You Delete

### Backup Important Data:
1. **Environment Variables**: Copy to `.env.production.backup`
2. **Domain Settings**: Screenshot domain configuration
3. **Build Settings**: Note any custom build commands

### Verify:
- ✅ Latest deployment is working
- ✅ Production site is accessible
- ✅ No active users on preview deployments
- ✅ All required environment variables are set

---

## 💾 Backup Environment Variables

```bash
# Create backup of current environment variables
cat > .env.production.backup << 'EOF'
# Vercel Environment Variables Backup
# Date: $(date)

NEXT_PUBLIC_SUPABASE_URL=your_value_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_value_here
SUPABASE_SERVICE_ROLE_KEY=your_value_here
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_value_here
NEXT_PUBLIC_FACEBOOK_APP_ID=your_value_here
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_value_here
RESEND_API_KEY=your_value_here
EMAIL_FROM=your_value_here
NEXT_PUBLIC_APP_URL=your_value_here
EOF
```

---

## 🔄 After Cleanup

### Verify Everything Works:
1. Visit production site
2. Test key features:
   - Homepage loads
   - Login works
   - Programs page loads
   - Images display
3. Check console for errors
4. Test on mobile

### Monitor:
- Check deployment logs
- Monitor error rates
- Verify analytics working
- Test form submissions

---

## 📈 Maintenance Schedule

### Weekly:
- Delete failed builds
- Review recent deployments

### Monthly:
- Clean old preview deployments
- Review environment variables
- Check domain configuration

### Quarterly:
- Full cleanup
- Review team access
- Update documentation

---

## 🆘 Troubleshooting

### "Can't delete deployment"
- Check if it's the production deployment (can't delete)
- Verify you have admin access
- Try via CLI instead of dashboard

### "Domain still showing after delete"
- DNS propagation takes time (24-48 hours)
- Clear browser cache
- Check DNS settings

### "Environment variable not working"
- Redeploy after changing variables
- Check variable name (case-sensitive)
- Verify it's set for correct environment

---

## 📞 Need Help?

**Vercel Support**:
- Dashboard: https://vercel.com/support
- Docs: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions

**Common Issues**:
- Deployment errors: Check build logs
- Domain issues: Verify DNS settings
- Environment variables: Redeploy after changes

---

## ✅ Success Criteria

After cleanup, you should have:
- ✅ <50 total deployments
- ✅ 0 failed builds
- ✅ Clean domain list (2-3 domains max)
- ✅ Organized environment variables
- ✅ Working production deployment
- ✅ Fast dashboard loading

---

## 🎯 Quick Cleanup (15 minutes)

**Fastest way to clean up**:

1. **Delete Failed Builds** (5 min)
   - Deployments → Filter: Failed → Select All → Delete

2. **Delete Old Previews** (5 min)
   - Deployments → Sort: Oldest → Select old ones → Delete

3. **Clean Domains** (3 min)
   - Settings → Domains → Delete unused

4. **Review Variables** (2 min)
   - Settings → Environment Variables → Delete duplicates

**Done!** ✅

---

**Start Here**: https://vercel.com/dashboard → Select `fix2` project → Begin cleanup
