# REVERT elevateforhumanity.org DNS - URGENT
**Issue:** You changed DNS to point to Netlify
**Problem:** This breaks your Durable marketing site
**Solution:** Revert DNS back to Durable

---

## 🚨 WHAT HAPPENED

You changed elevateforhumanity.org DNS to:
```
A      @    75.2.60.5                    (Netlify)
CNAME  www  elevateproduction.netlify.app (Netlify)
```

**This broke your Durable marketing site!**

---

## ✅ CORRECT SETUP

### elevateforhumanity.org (Durable Marketing Site)
```
Should point to: Durable.co servers
Purpose: Public-facing marketing website
Hosted by: Durable.co
```

### elevateconnectsdirectory.org (Netlify LMS)
```
Should point to: Netlify servers
Purpose: Student portal / LMS
Hosted by: Netlify
```

**Two separate domains, two separate purposes!**

---

## 🔧 FIX IT NOW

### Step 1: Revert elevateforhumanity.org DNS

**Go to:** Durable.co → Domain Settings → elevateforhumanity.org

**Change A record back:**
```
Delete: A  @  75.2.60.5
Add:    A  @  172.66.0.42  (or whatever Durable's IP was)
```

**Change CNAME back:**
```
Delete: CNAME  www  elevateproduction.netlify.app
Add:    CNAME  www  elevateforhumanity.org  (or leave as Durable default)
```

**Or simply:**
- Delete the A and CNAME records you added
- Let Durable use its default DNS

---

## 📋 CORRECT DNS CONFIGURATION

### elevateforhumanity.org (KEEP AT DURABLE):
```
A      @    [Durable IP - let Durable manage]
CNAME  www  [Durable domain - let Durable manage]
MX     @    SMTP.GOOGLE.COM  (keep email)
TXT    @    google-site-verification...  (keep)
```

**Don't point to Netlify!**

### elevateconnectsdirectory.org (POINT TO NETLIFY):
```
A      @    75.2.60.5  ✅
CNAME  www  elevateproduction.netlify.app  ✅
```

**This one points to Netlify!**

---

## 🎯 FINAL ARCHITECTURE

```
DURABLE.CO
├── Domain: elevateforhumanity.org
├── Purpose: Marketing website
├── Hosted by: Durable.co
└── DNS: Managed by Durable (default)

NETLIFY
├── Domain: elevateconnectsdirectory.org
├── Purpose: LMS / Student Portal
├── Hosted by: Netlify
└── DNS: Points to Netlify (75.2.60.5)

CONNECTION
└── Link on Durable site → elevateconnectsdirectory.org
```

---

## 🚀 WHAT TO DO

### 1. Revert elevateforhumanity.org DNS (NOW)

**In Durable DNS settings:**
- Remove A record: 75.2.60.5
- Remove CNAME: elevateproduction.netlify.app
- Let Durable use default DNS

### 2. Keep elevateconnectsdirectory.org DNS (CORRECT)

**Leave as is:**
- A: 75.2.60.5
- CNAME: elevateproduction.netlify.app

### 3. Only Add elevateconnectsdirectory.org to Netlify

**Don't add elevateforhumanity.org to Netlify!**

---

## 🤖 UPDATED AUTOPILOT

### Only Add ONE Domain to Netlify:

```bash
# Only add elevateconnectsdirectory.org
netlify domains:add elevateconnectsdirectory.org
```

**Don't add elevateforhumanity.org!**

---

## ✅ CORRECT FINAL STATE

### elevateforhumanity.org:
- ✅ Points to Durable
- ✅ Shows Durable marketing site
- ✅ Has button: "Access Student Portal"
- ✅ Button links to: elevateconnectsdirectory.org

### elevateconnectsdirectory.org:
- ✅ Points to Netlify
- ✅ Shows Netlify LMS
- ✅ Students use this for courses

---

## 📞 IMMEDIATE ACTION

**Right now:**

1. Go to Durable DNS for elevateforhumanity.org
2. Delete A record: 75.2.60.5
3. Delete CNAME: elevateproduction.netlify.app
4. Save changes
5. Let Durable manage DNS automatically

**Then:**

Only add elevateconnectsdirectory.org to Netlify (not elevateforhumanity.org)

---

**SUMMARY:**

**elevateforhumanity.org** = Durable marketing site (revert DNS)  
**elevateconnectsdirectory.org** = Netlify LMS (keep DNS as is)  

**Don't point elevateforhumanity.org to Netlify!**
