# Connect www.elevateforhumanity.org to Vercel - DO THIS NOW

## 🚨 Current Problem

Your Vercel project `fix2-gpql` is NOT connected to `www.elevateforhumanity.org`.

**What you're seeing:**
- Deployments go to: `fix2-gpql-git-main-elevate-48e460c9.vercel.app`
- You want them to go to: `www.elevateforhumanity.org`

---

## ✅ 3-Step Fix (Takes 5 Minutes)

### Step 1: Open Vercel Domain Settings

Click this link:
```
https://vercel.com/elevate-48e460c9/fix2-gpql/settings/domains
```

Or manually:
1. Go to https://vercel.com
2. Click on project: `fix2-gpql`
3. Click "Settings" tab
4. Click "Domains" in left sidebar

### Step 2: Add Your Domain

1. You'll see a text box that says "Add Domain"
2. Type: `www.elevateforhumanity.org`
3. Click "Add" button

Vercel will check if the domain is available.

### Step 3: Configure DNS

Vercel will show you DNS instructions. You need to add a CNAME record:

**Go to your DNS provider** (GoDaddy, Cloudflare, Namecheap, etc.) and add:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Auto (or 3600)
```

**Save the DNS record.**

---

## ⏱️ Wait for Verification

- DNS propagation: 5-60 minutes (usually fast)
- Vercel will automatically verify
- SSL certificate will be auto-issued
- You'll see a green checkmark when ready

---

## 🎯 After Domain is Connected

### Set as Production Domain

1. In Vercel domains settings, find `www.elevateforhumanity.org`
2. Click the 3 dots (⋮) next to it
3. Select "Set as Production Domain"

Now all deployments will go to this domain!

### Test It

```bash
# Check if it's live
curl -I https://www.elevateforhumanity.org

# Should return 200 OK
```

Open in browser:
```
https://www.elevateforhumanity.org
```

Look for the build marker in the bottom-right corner: `BUILD: 2025-11-20-10:25`

---

## 🔍 Troubleshooting

### "Domain is already in use"

The domain might be connected to another Vercel project.

**Fix:**
1. Go to: https://vercel.com/elevate-48e460c9/~/domains
2. Find `www.elevateforhumanity.org`
3. See which project it's connected to
4. Remove it from that project
5. Add it to `fix2-gpql`

### "DNS verification failed"

Your DNS isn't configured correctly.

**Fix:**
1. Double-check the CNAME record in your DNS provider
2. Make sure it's exactly: `cname.vercel-dns.com`
3. Wait 10-15 minutes
4. Click "Refresh" in Vercel

### "Where do I find my DNS provider?"

Common DNS providers:
- **GoDaddy:** https://dcc.godaddy.com/manage/dns
- **Cloudflare:** https://dash.cloudflare.com
- **Namecheap:** https://ap.www.namecheap.com/domains/list
- **Google Domains:** https://domains.google.com

If you don't know, check where you bought the domain.

---

## 📋 Quick Checklist

- [ ] Open Vercel domain settings
- [ ] Add `www.elevateforhumanity.org`
- [ ] Add CNAME record to DNS provider
- [ ] Wait for verification (5-60 min)
- [ ] Set as production domain
- [ ] Test: https://www.elevateforhumanity.org
- [ ] Verify build marker shows: `BUILD: 2025-11-20-10:25`

---

## 🎉 Success Criteria

When done correctly, you should see:

✅ Green checkmark next to domain in Vercel
✅ SSL certificate issued (🔒 padlock in browser)
✅ Site loads at https://www.elevateforhumanity.org
✅ Build marker visible in bottom-right corner
✅ All future deployments go to this domain

---

**Start here:** https://vercel.com/elevate-48e460c9/fix2-gpql/settings/domains

**Do this now - it takes 5 minutes!**
