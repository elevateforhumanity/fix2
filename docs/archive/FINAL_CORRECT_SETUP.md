# FINAL CORRECT SETUP ✅
**Status:** Clear instructions for proper configuration

---

## 🎯 YOUR TWO DOMAINS

### Domain 1: elevateforhumanity.org
```
Purpose:     Marketing website
Hosted by:   Durable.co
DNS:         Points to Durable (NOT Netlify)
Action:      REVERT DNS if you changed it
```

### Domain 2: elevateconnectsdirectory.org
```
Purpose:     LMS / Student Portal
Hosted by:   Netlify
DNS:         Points to Netlify (75.2.60.5)
Action:      Add to Netlify, wait for SSL
```

---

## 📋 STEP-BY-STEP SETUP

### Step 1: Fix elevateforhumanity.org DNS (5 minutes)

**Go to:** Durable.co → DNS Settings → elevateforhumanity.org

**Remove these if you added them:**
```
❌ A      @    75.2.60.5
❌ CNAME  www  elevateproduction.netlify.app
```

**Let Durable manage DNS automatically**

**Result:** elevateforhumanity.org → Durable marketing site

---

### Step 2: Verify elevateconnectsdirectory.org DNS (already done)

**In Durable.co → DNS Settings → elevateconnectsdirectory.org**

**Should have:**
```
✅ A      @    75.2.60.5
✅ CNAME  www  elevateproduction.netlify.app
```

**Result:** elevateconnectsdirectory.org → Ready for Netlify

---

### Step 3: Add elevateconnectsdirectory.org to Netlify (5 minutes)

**Go to:** https://app.netlify.com/sites/elevateproduction/settings/domain

**Click:** "Add custom domain"

**Enter:** `elevateconnectsdirectory.org`

**Click:** "Verify"

**Wait:** 5-10 minutes for SSL

**Result:** elevateconnectsdirectory.org → Netlify LMS with SSL

---

### Step 4: Test Both Sites (2 minutes)

**Test Durable site:**
- Visit: https://elevateforhumanity.org
- Should show: Durable marketing website
- Should NOT show: Netlify LMS

**Test Netlify site:**
- Visit: https://elevateconnectsdirectory.org
- Should show: Netlify LMS (fully styled now!)
- Should have: SSL padlock (🔒)

---

## 🏗️ FINAL ARCHITECTURE

```
USER VISITS: elevateforhumanity.org
    ↓
DNS (Durable) → Durable servers
    ↓
Shows: Marketing website
    ↓
User clicks: "Access Student Portal"
    ↓
Links to: elevateconnectsdirectory.org
    ↓
DNS (Durable) → Netlify servers (75.2.60.5)
    ↓
Shows: LMS with courses
```

---

## ✅ CORRECT DNS CONFIGURATION

### elevateforhumanity.org (Durable):
```
A      @    [Durable IP]
CNAME  www  [Durable domain]
MX     @    SMTP.GOOGLE.COM
TXT    @    google-site-verification...
```

### elevateconnectsdirectory.org (Netlify):
```
A      @    75.2.60.5
CNAME  www  elevateproduction.netlify.app
```

---

## 🔗 CONNECTING THE SITES

### On Durable Marketing Site:

Add a prominent button:
```html
<a href="https://elevateconnectsdirectory.org" 
   style="display: inline-block;
          background: #0066CC;
          color: white;
          padding: 16px 32px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 18px;
          font-weight: 600;">
  🎓 Access Student Portal
</a>
```

**That's the only connection needed!**

---

## 💰 COSTS

```
elevateforhumanity.org:
  Domain: Included with Durable
  Hosting: Included with Durable
  Total: $0 extra

elevateconnectsdirectory.org:
  Domain: Included with Durable
  Hosting: FREE (Netlify)
  SSL: FREE (Let's Encrypt)
  Total: $0

Grand Total: $0/month
```

---

## ⏱️ COMPLETE TIMELINE

```
Step 1: Revert elevateforhumanity.org DNS    (5 min)
        Wait for DNS propagation              (10-15 min)
        
Step 2: Verify elevateconnectsdirectory.org  (1 min)
        
Step 3: Add to Netlify                       (2 min)
        Wait for SSL                          (5-10 min)
        
Step 4: Test both sites                      (2 min)
---
Total:                                        ~25-35 minutes
```

---

## 📊 WHAT EACH SITE SHOWS

### elevateforhumanity.org (Durable):
```
✅ Homepage
✅ About Us
✅ Programs Overview
✅ Contact Information
✅ Blog/News
✅ Button: "Access Student Portal"
```

### elevateconnectsdirectory.org (Netlify):
```
✅ Login/Signup
✅ Student Dashboard
✅ Course Catalog
✅ Enrolled Courses
✅ Certificates
✅ Profile Settings
```

---

## 🎯 SUCCESS CRITERIA

### You'll know it's correct when:

**elevateforhumanity.org:**
- ✅ Shows Durable marketing site
- ✅ Has button to student portal
- ✅ SSL works (🔒)
- ✅ Loads quickly

**elevateconnectsdirectory.org:**
- ✅ Shows Netlify LMS
- ✅ Fully styled (Tailwind CSS)
- ✅ SSL works (🔒)
- ✅ All features work

**DNS Check:**
- ✅ elevateforhumanity.org → Durable IP
- ✅ elevateconnectsdirectory.org → 75.2.60.5

---

## 🆘 TROUBLESHOOTING

### If elevateforhumanity.org shows Netlify LMS:
- DNS still pointing to Netlify
- Revert DNS in Durable
- Wait 10-15 minutes for propagation

### If elevateconnectsdirectory.org shows error:
- DNS not propagated yet
- Wait longer (up to 24 hours)
- Check dnschecker.org

### If SSL doesn't work:
- Wait 10-15 minutes after adding to Netlify
- Click "Verify DNS" in Netlify
- Check DNS is fully propagated

---

## 📞 QUICK LINKS

**Durable Login:**
https://durable.co/login

**Netlify Dashboard:**
https://app.netlify.com/sites/elevateproduction

**DNS Checker:**
https://dnschecker.org

**Netlify Deploys:**
https://app.netlify.com/sites/elevateproduction/deploys

---

## ✅ FINAL CHECKLIST

- [ ] Reverted elevateforhumanity.org DNS to Durable
- [ ] Verified elevateconnectsdirectory.org DNS points to Netlify
- [ ] Added elevateconnectsdirectory.org to Netlify
- [ ] SSL certificate active
- [ ] elevateforhumanity.org shows Durable site
- [ ] elevateconnectsdirectory.org shows Netlify LMS
- [ ] Both sites have SSL (🔒)
- [ ] Link/button connects them
- [ ] Everything works!

---

**CURRENT STATUS:**

**elevateforhumanity.org** = Durable marketing ✅  
**elevateconnectsdirectory.org** = Netlify LMS ✅  
**Styling** = Fixed and deploying ✅  
**Ready** = Almost there! Just revert DNS and add domain ✅  

---

*Two domains, two purposes, zero confusion!*
