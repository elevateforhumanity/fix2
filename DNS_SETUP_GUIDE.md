# DNS Setup Guide for elevateforhumanityeducation.com

## ✅ Current Status

**What's Working:**
- Domain added to Vercel ✅
- SSL certificate issued ✅
- Code deployed ✅
- Middleware configured ✅

**What's NOT Working:**
- DNS not pointing to Vercel ❌
- Domain not resolving properly ❌

---

## 🎯 What You Need To Do

### Step 1: Find Your Domain Registrar

Where did you buy `elevateforhumanityeducation.com`?
- GoDaddy?
- Namecheap?
- Google Domains?
- Cloudflare?
- Other?

### Step 2: Configure DNS Records

**Go to your domain registrar's DNS settings and add:**

#### Option A: Using Vercel DNS (Recommended)

**Change Nameservers to:**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

#### Option B: Using Your Registrar's DNS

**Add these records:**

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Step 3: Verify in Vercel

1. Go to: https://vercel.com/elevate-48e460c9/fix2-gpql/settings/domains
2. Find: `elevateforhumanityeducation.com`
3. Should show: "Valid Configuration" ✅

### Step 4: Wait for Propagation

- DNS changes take 5-60 minutes
- Sometimes up to 24 hours
- Check status: https://dnschecker.org/#A/elevateforhumanityeducation.com

---

## 🔧 Current DNS Status

**What I see:**
- Domain resolves to: `216.150.1.1`
- This IP is responding but not serving your site
- Likely a parking page or registrar default

**What it should be:**
- Vercel IP: `76.76.21.21`
- Or CNAME to: `cname.vercel-dns.com`

---

## 📋 Quick Fix Checklist

- [ ] Log into domain registrar
- [ ] Go to DNS settings for elevateforhumanityeducation.com
- [ ] Add A record: @ → 76.76.21.21
- [ ] Add CNAME record: www → cname.vercel-dns.com
- [ ] Save changes
- [ ] Wait 10-30 minutes
- [ ] Test: https://elevateforhumanityeducation.com

---

## 🆘 Alternative: Use Main Domain

**If DNS is too complicated, use:**
- `www.elevateforhumanity.org/lms` ✅ Works now!

I can update all navigation to use this instead.

---

## 📞 Need Help?

Tell me:
1. Where you bought the domain
2. If you have access to DNS settings
3. If you want me to update navigation to use `/lms` path instead

I'll give you exact step-by-step instructions for your specific registrar.
