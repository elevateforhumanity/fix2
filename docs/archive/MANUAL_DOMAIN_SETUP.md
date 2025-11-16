# MANUAL DOMAIN SETUP - KEEP SEPARATE

**Status:** Ready for you to add domain manually
**Approach:** Keep everything separate and independent

---

## ✅ CURRENT STATUS

### What's Done:

- ✅ Repository cleaned (200+ files removed)
- ✅ Tailwind CSS fixed and working
- ✅ New build deployed to Netlify
- ✅ elevateforhumanity.org reverted to Durable
- ✅ elevateconnectsdirectory.org DNS pointing to Netlify

### What's Left:

- ⏳ Add elevateconnectsdirectory.org to Netlify (manual)
- ⏳ Wait for SSL certificate
- ⏳ Test the site

---

## 🎯 MANUAL STEPS

### Step 1: Add Domain in Netlify (2 minutes)

**Go to:** https://app.netlify.com/sites/elevateproduction/settings/domain

**Click:** "Add custom domain" button

**Enter:** `elevateconnectsdirectory.org`

**Click:** "Verify"

**Netlify will:**

- Check DNS records
- Confirm they're correct
- Show "DNS configured correctly" ✅

---

### Step 2: Wait for SSL (5-10 minutes)

**Netlify will automatically:**

- Request SSL certificate from Let's Encrypt
- Verify domain ownership
- Install certificate
- Enable HTTPS

**You'll see:**

```
⏳ Provisioning SSL certificate...
```

**Then:**

```
✅ SSL certificate active
```

---

### Step 3: Test Your Site (1 minute)

**After SSL shows "Active":**

**Visit:** https://www.elevateconnectsdirectory.org

**Should show:**

- ✅ Your LMS
- ✅ Fully styled (Tailwind CSS)
- ✅ SSL padlock (🔒)
- ✅ All features working

**Also test:**

- https://www.elevateconnectsdirectory.org
- Should redirect to apex domain

---

## 🏗️ FINAL ARCHITECTURE (SEPARATE)

```
DURABLE.CO
├── Domain: elevateforhumanity.org
├── Purpose: Marketing website
├── Hosted by: Durable.co
├── Managed by: Durable
└── Status: Independent ✅

NETLIFY
├── Domain: elevateconnectsdirectory.org
├── Purpose: LMS / Student Portal
├── Hosted by: Netlify
├── Managed by: You
└── Status: Independent ✅

CONNECTION
└── Simple link/button (optional)
```

---

## 📊 TWO SEPARATE SYSTEMS

### elevateforhumanity.org:

```
Registrar: Durable.co
DNS: Managed by Durable
Hosting: Durable.co
Content: Marketing website
Control: Durable dashboard
```

### elevateconnectsdirectory.org:

```
Registrar: Durable.co (domain only)
DNS: Points to Netlify
Hosting: Netlify
Content: LMS application
Control: Netlify dashboard + GitHub
```

---

## ⏱️ TIMELINE

```
Now:        Add domain in Netlify (2 min)
+5-10 min:  SSL certificate provisions
+1 min:     Test site
---
Total:      ~10-15 minutes
```

---

## ✅ VERIFICATION

### Check DNS Propagation:

**Go to:** https://dnschecker.org

**Check elevateforhumanity.org:**

- Should show: Durable IP (NOT 75.2.60.5)
- Status: Points to Durable ✅

**Check elevateconnectsdirectory.org:**

- Should show: 75.2.60.5 (Netlify)
- Status: Points to Netlify ✅

---

## 🎯 SUCCESS CRITERIA

### You'll know it's working when:

**elevateforhumanity.org:**

- ✅ Shows Durable marketing site
- ✅ Has SSL (🔒)
- ✅ Completely independent

**elevateconnectsdirectory.org:**

- ✅ Shows Netlify LMS
- ✅ Fully styled with Tailwind
- ✅ Has SSL (🔒)
- ✅ Completely independent

**Both:**

- ✅ Work independently
- ✅ No dependencies
- ✅ Can be updated separately
- ✅ No confusion

---

## 📞 QUICK LINKS

**Add Domain:**
https://app.netlify.com/sites/elevateproduction/settings/domain

**Check DNS:**
https://dnschecker.org

**Monitor Deploys:**
https://app.netlify.com/sites/elevateproduction/deploys

**Durable Dashboard:**
https://durable.co/login

---

## 💡 OPTIONAL: CONNECT WITH LINK

### If you want to link them:

**On Durable site (elevateforhumanity.org):**

Add a button or link:

```html
<a href="https://www.elevateconnectsdirectory.org"> Access Student Portal </a>
```

**That's it!** Simple link, no technical connection needed.

---

## 🎉 WHAT YOU'VE ACCOMPLISHED

### Repository:

- ✅ 200+ files cleaned
- ✅ All old platforms removed
- ✅ Single deployment platform (Netlify)
- ✅ Single styling system (Tailwind)
- ✅ Production ready

### Domains:

- ✅ elevateforhumanity.org on Durable (separate)
- ✅ elevateconnectsdirectory.org ready for Netlify
- ✅ DNS configured correctly
- ✅ No confusion

### Deployment:

- ✅ Clean build deployed
- ✅ Styling fixed
- ✅ SSL ready to provision
- ✅ Ready to go live

---

## 📋 FINAL CHECKLIST

- [x] Repository cleaned
- [x] Styling fixed
- [x] Build deployed
- [x] elevateforhumanity.org reverted to Durable
- [x] elevateconnectsdirectory.org DNS configured
- [ ] Add domain in Netlify (do this now)
- [ ] Wait for SSL
- [ ] Test site
- [ ] Done!

---

**NEXT ACTION:**

**Go to:** https://app.netlify.com/sites/elevateproduction/settings/domain

**Add:** elevateconnectsdirectory.org

**Wait:** 5-10 minutes for SSL

**Test:** https://www.elevateconnectsdirectory.org

---

**STATUS:** ✅ Ready for you to add domain manually  
**TIME:** ~10-15 minutes total  
**RESULT:** Two independent sites, zero confusion

---

_Everything is ready. Just add the domain in Netlify and you're done!_
