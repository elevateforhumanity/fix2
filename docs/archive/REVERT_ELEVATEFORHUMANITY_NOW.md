# REVERT elevateforhumanity.org DNS - DO THIS NOW

**Action Required:** Change DNS back to Durable
**Reason:** Keep marketing site on Durable, LMS on Netlify

---

## 🎯 CORRECT SETUP

### elevateforhumanity.org (Durable Marketing Site)

```
Purpose: Marketing website
Hosted by: Durable.co
DNS: Points to Durable servers
Status: REVERT DNS NOW
```

### elevateforhumanity.org (Netlify LMS)

```
Purpose: Student portal / LMS
Hosted by: Netlify
DNS: Points to Netlify (75.2.60.5) ✅ KEEP AS IS
Status: CORRECT - Leave alone
```

---

## 🔧 REVERT DNS NOW

### Step 1: Go to Durable DNS Settings

**Login:** https://durable.co/login

**Navigate to:** Domain Settings → elevateforhumanity.org → DNS

### Step 2: Remove Netlify DNS Records

**Delete these records:**

```
❌ DELETE: A      @    75.2.60.5
❌ DELETE: CNAME  www  elevateproduction.netlify.app
```

### Step 3: Let Durable Manage DNS

**Option A: Use Durable's Default DNS**

- Just delete the records you added
- Durable will automatically use its default settings
- Site will point back to Durable

**Option B: Add Durable's DNS (if needed)**

If Durable doesn't auto-configure, add:

```
A      @    172.66.0.42  (or Durable's IP)
CNAME  www  elevateforhumanity.org
```

**Keep these records:**

```
✅ KEEP: MX   @  SMTP.GOOGLE.COM  (email)
✅ KEEP: TXT  @  google-site-verification...
```

### Step 4: Save Changes

Click **Save** or **Update DNS**

---

## ✅ CORRECT FINAL DNS

### elevateforhumanity.org (Durable):

```
A      @    [Durable IP - managed by Durable]
CNAME  www  [Durable domain - managed by Durable]
MX     @    SMTP.GOOGLE.COM  ✅
TXT    @    google-site-verification...  ✅
```

### elevateforhumanity.org (Netlify):

```
A      @    75.2.60.5  ✅
CNAME  www  elevateproduction.netlify.app  ✅
```

---

## 🚀 AFTER REVERTING

### Step 1: Wait for DNS Propagation (10-15 minutes)

**Check:** https://dnschecker.org

**Enter:** elevateforhumanity.org

**Should show:** Durable's IP (NOT 75.2.60.5)

### Step 2: Verify Sites

**elevateforhumanity.org:**

- Should show: Durable marketing site
- Should NOT show: Netlify LMS

**elevateforhumanity.org:**

- Should show: Netlify LMS (with styling now!)
- Should have: SSL certificate

### Step 3: Add ONLY elevateforhumanity.org to Netlify

**Go to:** https://app.netlify.com/sites/elevateproduction/settings/domain

**Add domain:**

1. Click "Add custom domain"
2. Enter: `elevateforhumanity.org`
3. Click "Verify"
4. Wait for SSL (5-10 minutes)

**DO NOT add elevateforhumanity.org!**

---

## 📊 WHAT EACH DOMAIN DOES

### elevateforhumanity.org:

```
✅ Marketing website
✅ Public information
✅ Contact forms
✅ About us
✅ Hosted on Durable
✅ Managed by Durable
```

### elevateforhumanity.org:

```
✅ Student portal
✅ LMS courses
✅ Certificates
✅ User accounts
✅ Hosted on Netlify
✅ Managed by you
```

---

## 🔗 HOW THEY CONNECT

### On Durable Site (elevateforhumanity.org):

Add a button/link:

```html
<a href="https://www.elevateforhumanity.org" class="button">
  Access Student Portal
</a>
```

**That's it!** Simple link connects them.

---

## ⏱️ TIMELINE

```
Now:        Revert DNS in Durable
+10-15 min: DNS propagates
+2 min:     Add elevateforhumanity.org to Netlify
+5-10 min:  SSL provisions
+1 min:     Test both sites
---
Total:      ~20-30 minutes
```

---

## ✅ VERIFICATION CHECKLIST

### After Reverting:

- [ ] Removed A record (75.2.60.5) from elevateforhumanity.org
- [ ] Removed CNAME (elevateproduction.netlify.app) from elevateforhumanity.org
- [ ] Kept MX and TXT records
- [ ] Saved changes in Durable
- [ ] Waited for DNS propagation
- [ ] elevateforhumanity.org shows Durable site
- [ ] Added elevateforhumanity.org to Netlify
- [ ] SSL active on elevateforhumanity.org
- [ ] elevateforhumanity.org shows styled LMS

---

## 🆘 IF YOU NEED DURABLE'S IP

### Finding Durable's Default IP:

**Option 1: Check Durable Documentation**

- Look for default DNS settings
- Usually provided in domain settings

**Option 2: Contact Durable Support**

- Ask: "What IP should my domain point to?"
- They'll provide the correct A record

**Option 3: Let Durable Auto-Configure**

- Just delete your custom records
- Durable should auto-configure
- Wait 10-15 minutes

---

## 📞 QUICK REFERENCE

### Durable Login:

```
https://durable.co/login
```

### DNS Checker:

```
https://dnschecker.org
```

### Netlify Domain Settings:

```
https://app.netlify.com/sites/elevateproduction/settings/domain
```

---

## 🎯 IMMEDIATE ACTION

**Right now, do this:**

1. **Login to Durable:** https://durable.co/login
2. **Go to:** elevateforhumanity.org DNS settings
3. **Delete:** A record (75.2.60.5)
4. **Delete:** CNAME (elevateproduction.netlify.app)
5. **Save changes**
6. **Wait 10-15 minutes**
7. **Verify:** elevateforhumanity.org shows Durable site

**Then:**

1. **Go to Netlify:** https://app.netlify.com/sites/elevateproduction/settings/domain
2. **Add domain:** elevateforhumanity.org
3. **Wait for SSL**
4. **Test:** https://www.elevateforhumanity.org

---

**SUMMARY:**

**elevateforhumanity.org** = Durable marketing (revert DNS now)  
**elevateforhumanity.org** = Netlify LMS (keep DNS, add to Netlify)

**Two separate domains, two separate purposes!**

---

_Revert the DNS now so your Durable marketing site works again!_
