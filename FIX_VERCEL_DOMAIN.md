# Fix Vercel Domain Configuration

## Current Issue

The Vercel project `fix2-gpql` is NOT connected to `www.elevateforhumanity.org`.

**Current domains:**
- ❌ `fix2-gpql-git-main-elevate-48e460c9.vercel.app` (auto-generated)
- ❌ `fix2-gpql-raqq2ad4j-elevate-48e460c9.vercel.app` (deployment hash)

**Desired domain:**
- ✅ `www.elevateforhumanity.org`

---

## How to Fix This

### Option 1: Add Domain in Vercel Dashboard (Recommended)

1. **Go to Vercel Project Settings:**
   ```
   https://vercel.com/elevate-48e460c9/fix2-gpql/settings/domains
   ```

2. **Add Custom Domain:**
   - Click "Add Domain"
   - Enter: `www.elevateforhumanity.org`
   - Click "Add"

3. **Configure DNS:**
   
   Vercel will show you DNS records to add. You need to add a CNAME record:
   
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

4. **Wait for DNS Propagation:**
   - Usually takes 5-60 minutes
   - Vercel will automatically verify and issue SSL certificate

5. **Set as Production Domain:**
   - Once verified, click the 3 dots next to the domain
   - Select "Set as Production Domain"

---

### Option 2: Use Vercel CLI

```bash
# Add domain
npx vercel domains add www.elevateforhumanity.org fix2-gpql

# Check domain status
npx vercel domains ls
```

---

### Option 3: Check if Domain is Already Configured Elsewhere

The domain `www.elevateforhumanity.org` might be:
- Connected to a different Vercel project
- Pointing to Netlify or another host
- Not yet purchased/registered

**To check:**

1. **Check DNS records:**
   ```bash
   dig www.elevateforhumanity.org
   nslookup www.elevateforhumanity.org
   ```

2. **Check in Vercel:**
   - Go to: https://vercel.com/elevate-48e460c9/~/domains
   - See if `www.elevateforhumanity.org` is listed under any project

3. **If it's on another project:**
   - Remove it from the old project first
   - Then add it to `fix2-gpql`

---

## Current Project Info

- **Project Name:** fix2-gpql
- **Project ID:** prj_WSdzX00UNP1rcWNXQ3RrpeuVOkeA
- **Organization:** elevate-48e460c9
- **Current Branch:** main
- **Latest Commit:** 8e895e6 - 🔧 Fix build error: Merge proxy.ts into middleware.ts

---

## Quick Fix Steps

### Step 1: Check Current Domains

```bash
export VERCEL_TOKEN="rISeRdxyBGMTAEKI71HR8GnZ"
npx vercel domains ls --token=$VERCEL_TOKEN
```

### Step 2: Add www.elevateforhumanity.org

Go to Vercel dashboard:
```
https://vercel.com/elevate-48e460c9/fix2-gpql/settings/domains
```

Click "Add Domain" and enter: `www.elevateforhumanity.org`

### Step 3: Configure DNS

Add this CNAME record to your DNS provider:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

### Step 4: Verify

Wait 5-60 minutes, then check:

```bash
curl -I https://www.elevateforhumanity.org
```

Should return 200 OK (not 404 or DNS error)

---

## Troubleshooting

### "Domain is already in use"

The domain is connected to another Vercel project. You need to:

1. Find which project has it:
   ```bash
   npx vercel domains ls --token=$VERCEL_TOKEN
   ```

2. Remove it from that project:
   - Go to that project's settings
   - Remove the domain

3. Add it to fix2-gpql

### "DNS verification failed"

Your DNS records aren't configured correctly:

1. Check your DNS provider (GoDaddy, Cloudflare, Namecheap, etc.)
2. Make sure you added the CNAME record exactly as shown
3. Wait for DNS propagation (can take up to 48 hours, usually 5-60 minutes)
4. Use this tool to check: https://dnschecker.org

### "SSL certificate pending"

This is normal. Vercel automatically provisions SSL certificates:

1. Wait 5-10 minutes
2. Vercel will automatically issue a Let's Encrypt certificate
3. Once issued, your site will be available over HTTPS

---

## After Domain is Connected

### Update Documentation

Update these files with the correct domain:

1. `VERCEL_DEPLOYMENT_GUIDE.md`
2. `QUICK_DEPLOY.md`
3. `SMART_CACHE_STRATEGY.md`
4. `scripts/check-vercel-deployment.sh`

Replace `fix2-gpql.vercel.app` with `www.elevateforhumanity.org`

### Test the Deployment

```bash
# Check if domain is live
curl -I https://www.elevateforhumanity.org

# Look for build marker
curl -s https://www.elevateforhumanity.org | grep "BUILD:"

# Run verification script
pnpm verify:deployment
```

---

## Summary

**Current State:**
- ❌ Project has auto-generated Vercel domains
- ❌ Custom domain NOT connected

**Required Actions:**
1. Add `www.elevateforhumanity.org` in Vercel dashboard
2. Configure DNS CNAME record
3. Wait for verification
4. Set as production domain

**Expected Result:**
- ✅ `www.elevateforhumanity.org` → Your app
- ✅ SSL certificate auto-issued
- ✅ All deployments go to this domain

---

**Next Step:** Go to https://vercel.com/elevate-48e460c9/fix2-gpql/settings/domains and add the domain.
