# Vercel Domain Setup for www.elevateforhumanity.org

## 🎯 CORRECT DEPLOYMENT TARGET

**Vercel Project**: fix2-gpql (or fix2-i3z8)
- Organization: elevate-48e460c9
- Project URL: https://vercel.com/elevate-48e460c9/fix2-gpql
- Repository: elevateforhumanity/fix2

## 📋 CURRENT SITUATION

This repository (`fix2`) should deploy to Vercel and serve **www.elevateforhumanity.org**.

### Issue:
The domain www.elevateforhumanity.org is NOT configured in the Vercel project, causing the SSL handshake failure.

## ✅ HOW TO FIX

### Step 1: Add Domain in Vercel

1. Go to: https://vercel.com/elevate-48e460c9/fix2-gpql/settings/domains
2. Click "Add Domain"
3. Enter: `www.elevateforhumanity.org`
4. Click "Add"

### Step 2: Configure DNS

Vercel will provide DNS instructions. You need to add:

```
Type   Name   Target
CNAME  www    cname.vercel-dns.com
```

OR if using Cloudflare proxy:

```
Type   Name   Target                     Proxy
CNAME  www    cname.vercel-dns.com       Yes (orange cloud)
```

### Step 3: Wait for SSL Certificate

- Vercel will automatically provision an SSL certificate
- This takes 5-10 minutes
- You'll see a green checkmark when ready

### Step 4: Set as Production Domain (Optional)

If you want www.elevateforhumanity.org to be the primary domain:

1. In Vercel domain settings
2. Click the three dots next to www.elevateforhumanity.org
3. Select "Set as Production Domain"

## 🔧 ALTERNATIVE: Update DNS to Point to Vercel

If the domain is currently pointing to Cloudflare but not configured:

### Current DNS (Cloudflare):
```
www.elevateforhumanity.org → 104.18.23.157 (Cloudflare)
```

### Change to Vercel:
```
Type   Name   Target
CNAME  www    cname.vercel-dns.com
```

Then add the domain in Vercel as described above.

## 📊 VERCEL PROJECT CONFIGURATION

Based on `.vercel-autopilot-config.json`:

```json
{
  "vercel_org_id": "team_Xj2yJdLklcMExBxDPK7I2G4w",
  "vercel_project_id": "prj_I89m6xUtwJlmA3qSE8Su7jIF7Xg7",
  "vercel_project_name": "fix2-i3z8"
}
```

**Note**: The config shows `fix2-i3z8` but you mentioned `fix2-gpql`. These might be:
- Different projects
- Same project with different names
- Old vs new project

## 🚀 DEPLOYMENT STATUS

Once the domain is added to Vercel:

1. **Automatic Deployments**: Every push to `main` branch will deploy
2. **Production URL**: https://www.elevateforhumanity.org
3. **Preview URLs**: Each PR gets a unique preview URL
4. **SSL**: Automatically managed by Vercel

## ⚡ QUICK CHECKLIST

- [ ] Go to Vercel project: https://vercel.com/elevate-48e460c9/fix2-gpql
- [ ] Navigate to Settings → Domains
- [ ] Add domain: www.elevateforhumanity.org
- [ ] Update DNS to point to Vercel (if not already)
- [ ] Wait for SSL certificate (5-10 minutes)
- [ ] Test: https://www.elevateforhumanity.org
- [ ] Verify deployment is working

## 🔍 VERIFY DEPLOYMENT

After adding the domain:

```bash
# Check if site loads
curl -I https://www.elevateforhumanity.org

# Should return:
# HTTP/2 200
# server: Vercel
```

## 📝 ENVIRONMENT VARIABLES

Make sure these are set in Vercel project settings:

```
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org
NEXT_PUBLIC_SUPABASE_URL=[your-supabase-url]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=[your-stripe-key]
STRIPE_SECRET_KEY=[your-stripe-secret]
```

## 🎯 EXPECTED RESULT

After configuration:

- ✅ www.elevateforhumanity.org loads the site
- ✅ SSL certificate is valid
- ✅ Automatic deployments on push to main
- ✅ Site is indexed by Google

## 📞 NEXT STEPS

1. **Add domain in Vercel** (most important)
2. **Update DNS if needed** (point to Vercel)
3. **Wait for SSL** (5-10 minutes)
4. **Test site** (https://www.elevateforhumanity.org)
5. **Submit to Google Search Console** (once working)

---

**Summary**: Add www.elevateforhumanity.org as a custom domain in the Vercel project settings. This will fix the SSL handshake failure and make the site accessible.
