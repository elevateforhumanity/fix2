# LMS Domain Setup Complete

## 🎯 Domain Configuration

**Marketing Site**: `elevateforhumanity.org`  
**LMS Platform**: `elevateforhumanitylearning.durablesites.com`  
**Admin Portal**: `admin.elevateforhumanity.org` (optional)

---

## ✅ What's Been Configured:

### 1. Middleware Routing
- `elevateforhumanitylearning.durablesites.com` → Routes to `/lms`
- All LMS paths automatically handled
- Marketing site remains on main domain

### 2. Navigation Links Updated
- Header "LMS" link → Opens `elevateforhumanitylearning.durablesites.com` in new tab
- Footer "LMS Dashboard" → Opens LMS domain
- Mobile menu updated

### 3. Code Changes
- `middleware.ts` - Added subdomain routing
- `components/layout/MainNav.tsx` - External link handling
- `components/layout/Footer.tsx` - LMS link updated

---

## 🚀 Deployment Steps:

### Step 1: Add Domain to Vercel

1. Go to Vercel Dashboard: https://vercel.com/elevate-48e460c9/fix2-gpql
2. Click **Settings** → **Domains**
3. Add domain: `elevateforhumanitylearning.durablesites.com`
4. Vercel will provide DNS instructions

### Step 2: Configure DNS (if needed)

If you control the DNS for `durablesites.com`:

```
Type: CNAME
Name: elevateforhumanitylearning
Value: cname.vercel-dns.com
```

**OR** if Durable Sites manages it:
- Contact Durable Sites support
- Ask them to point `elevateforhumanitylearning.durablesites.com` to your Vercel project

### Step 3: Deploy Code

```bash
git add -A
git commit -m "Configure LMS subdomain routing"
git push origin main
```

Vercel will automatically deploy.

---

## 🔗 How It Works:

### User Journey:

1. **User visits**: `elevateforhumanity.org`
   - Sees marketing site (homepage, programs, about)

2. **User clicks "LMS"** in navigation
   - Opens: `elevateforhumanitylearning.durablesites.com`
   - Shows LMS landing page

3. **User navigates LMS**
   - `elevateforhumanitylearning.durablesites.com/` → LMS home
   - `elevateforhumanitylearning.durablesites.com/courses` → Course catalog
   - `elevateforhumanitylearning.durablesites.com/dashboard` → Student dashboard

### Technical Flow:

```
elevateforhumanitylearning.durablesites.com
    ↓
Middleware detects hostname
    ↓
Rewrites to /lms/* paths
    ↓
Serves LMS content
```

---

## 🧪 Testing:

### Local Testing:
```bash
# Add to /etc/hosts (Mac/Linux) or C:\Windows\System32\drivers\etc\hosts (Windows)
127.0.0.1 elevateforhumanitylearning.durablesites.com

# Start dev server
npm run dev

# Visit: http://elevateforhumanitylearning.durablesites.com:3000
```

### Production Testing:
Once DNS is configured:
1. Visit `elevateforhumanitylearning.durablesites.com`
2. Should see LMS landing page
3. Click "Browse Courses" → Should show course catalog
4. Click "Access Dashboard" → Should require login

---

## 📋 Checklist:

- [x] Middleware configured for subdomain routing
- [x] Navigation links updated to external LMS domain
- [x] Footer links updated
- [x] Mobile menu updated
- [ ] Domain added to Vercel
- [ ] DNS configured (if needed)
- [ ] Code deployed to production
- [ ] SSL certificate issued (automatic via Vercel)
- [ ] Test LMS access from marketing site

---

## 🔧 Troubleshooting:

### Issue: "Domain not found"
**Solution**: Add domain in Vercel dashboard first

### Issue: "SSL certificate error"
**Solution**: Wait 5-10 minutes for Vercel to issue certificate

### Issue: "404 on LMS domain"
**Solution**: Ensure middleware is deployed and domain is added to Vercel

### Issue: "Redirects to marketing site"
**Solution**: Check middleware hostname detection logic

---

## 🎯 Next Steps:

1. **Deploy this code** to production
2. **Add domain** in Vercel dashboard
3. **Configure DNS** (if you control it)
4. **Test** the LMS domain
5. **Add courses** to populate the LMS

---

## 📞 Support:

If `durablesites.com` is managed by Durable Sites:
- Contact their support to point the subdomain to Vercel
- Provide them: `cname.vercel-dns.com`
- They should create the CNAME record

---

**Status**: Code ready, awaiting domain configuration in Vercel
