# DURABLE DNS CONFIGURATION - CORRECTED

**Issue Found:** CNAME pointing to wrong domain
**Status:** ✅ Easy fix

---

## 🚨 CURRENT PROBLEM

### Your Current DNS:

```
✅ A      @    75.2.60.5                    (CORRECT)
❌ CNAME  www  elevateforhumanity.org       (WRONG!)
❌ AAAA   @    (Can't add - Durable limitation)
```

### What's Wrong:

- CNAME for www points to `elevateforhumanity.org` (wrong domain)
- Should point to `elevateproduction.netlify.app` (your Netlify site)

---

## ✅ CORRECT DNS CONFIGURATION

### Step 1: Fix the CNAME Record

**In Durable.co DNS settings:**

1. **Delete the existing CNAME:**
   - Find: CNAME www → elevateforhumanity.org
   - Click: Delete/Remove

2. **Add correct CNAME:**

   ```
   Type: CNAME
   Name: www
   Content: elevateproduction.netlify.app
   ```

3. **Save changes**

### Step 2: Verify Your DNS

**Your DNS should look like this:**

```
Type    Name    Content
A       @       75.2.60.5
CNAME   www     elevateproduction.netlify.app
```

**That's it! You don't need the AAAA record.**

---

## 📋 COMPLETE DNS SETUP

### In Durable.co Dashboard:

**Current (WRONG):**

```
A      @    75.2.60.5                    ✅ Keep this
CNAME  www  elevateforhumanity.org       ❌ Delete this
```

**Correct (RIGHT):**

```
A      @    75.2.60.5                    ✅ Keep this
CNAME  www  elevateproduction.netlify.app ✅ Add this
```

---

## 🔧 STEP-BY-STEP FIX

### 1. Delete Wrong CNAME:

In your Durable DNS settings:

- Find the row: `CNAME www elevateforhumanity.org`
- Click the **Action** button (trash icon or delete)
- Confirm deletion

### 2. Add Correct CNAME:

Click **Add** button:

```
Type: CNAME
Name: www
Content: elevateproduction.netlify.app
Priority: (leave blank)
```

Click **Save** or **Add Record**

### 3. Verify:

Your DNS table should show:

```
Type    Name    Content                         Priority    Action
A       @       75.2.60.5                                   [Delete]
CNAME   www     elevateproduction.netlify.app               [Delete]
```

---

## ⚠️ ABOUT THE AAAA RECORD

### Durable's Limitation:

```
"You can't add AAAA record for root"
```

**This is normal and OK!**

- AAAA records are for IPv6
- Not all providers allow AAAA for root domain
- The A record (IPv4) is sufficient
- Your site will work perfectly without it

### What This Means:

- ✅ Your site will work fine
- ✅ Most users use IPv4 anyway
- ✅ Netlify handles both IPv4 and IPv6
- ✅ No action needed

---

## 🔍 VERIFICATION

### After Fixing DNS:

1. **Check DNS Propagation:**
   - Go to: https://dnschecker.org
   - Enter: elevateconnectsdirectory.org
   - Select: A Record
   - Should show: 75.2.60.5

2. **Check CNAME:**
   - Go to: https://dnschecker.org
   - Enter: www.elevateconnectsdirectory.org
   - Select: CNAME
   - Should show: elevateproduction.netlify.app

3. **Wait for Propagation:**
   - Minimum: 5-10 minutes
   - Average: 1-2 hours
   - Maximum: 24-48 hours

---

## 🚀 NETLIFY CONFIGURATION

### After DNS is Fixed:

1. **Go to Netlify:**
   https://app.netlify.com/sites/elevateproduction/settings/domain

2. **Add Custom Domain:**
   - Click: "Add custom domain"
   - Enter: `elevateconnectsdirectory.org`
   - Click: "Verify"

3. **Netlify Will Check:**

   ```
   ✅ DNS configured correctly
   ⏳ Provisioning SSL certificate...
   ```

4. **Wait for SSL:**
   - Takes 5-10 minutes
   - Automatic (Let's Encrypt)
   - Free

5. **Test:**
   - Visit: https://www.elevateconnectsdirectory.org
   - Should show: Your LMS
   - SSL: Should be secure (🔒)

---

## 📊 CORRECT vs INCORRECT

### ❌ INCORRECT (What you have now):

```
A      @    75.2.60.5                    ✅
CNAME  www  elevateforhumanity.org       ❌ WRONG DOMAIN!

Result:
- elevateconnectsdirectory.org → Works (points to Netlify)
- www.elevateconnectsdirectory.org → BROKEN (points to wrong site)
```

### ✅ CORRECT (What you need):

```
A      @    75.2.60.5                    ✅
CNAME  www  elevateproduction.netlify.app ✅ CORRECT!

Result:
- elevateconnectsdirectory.org → Works (points to Netlify)
- www.elevateconnectsdirectory.org → Works (points to Netlify)
```

---

## 🎯 WHY THIS MATTERS

### Current Problem:

```
User types: www.elevateconnectsdirectory.org
DNS says: Go to elevateforhumanity.org
User sees: Wrong site (or error)
```

### After Fix:

```
User types: www.elevateconnectsdirectory.org
DNS says: Go to elevateproduction.netlify.app
Netlify serves: Your LMS
User sees: Your site ✅
```

---

## ✅ FINAL CHECKLIST

### In Durable.co:

- [ ] Deleted CNAME: www → elevateforhumanity.org
- [ ] Added CNAME: www → elevateproduction.netlify.app
- [ ] Kept A record: @ → 75.2.60.5
- [ ] Saved changes

### In Netlify:

- [ ] Added custom domain: elevateconnectsdirectory.org
- [ ] Verified DNS
- [ ] SSL certificate provisioned
- [ ] Domain shows as "Active"

### Testing:

- [ ] Checked DNS propagation (dnschecker.org)
- [ ] Visited https://www.elevateconnectsdirectory.org
- [ ] Visited https://www.elevateconnectsdirectory.org
- [ ] Both URLs work
- [ ] SSL works (🔒)

---

## 🆘 TROUBLESHOOTING

### If www still doesn't work:

1. **Clear DNS cache:**

   ```bash
   # On Mac/Linux
   sudo dscacheutil -flushcache

   # On Windows
   ipconfig /flushdns
   ```

2. **Check DNS propagation:**
   - Use: https://dnschecker.org
   - Check: www.elevateconnectsdirectory.org
   - Should show: elevateproduction.netlify.app

3. **Wait longer:**
   - DNS can take up to 48 hours
   - Be patient

4. **Verify in Durable:**
   - Double-check CNAME is correct
   - Should be: elevateproduction.netlify.app
   - NOT: elevateforhumanity.org

---

## 📝 QUICK REFERENCE

### Correct DNS Records:

```
A      @    75.2.60.5
CNAME  www  elevateproduction.netlify.app
```

### Netlify Site:

```
elevateproduction.netlify.app
```

### Your Domain:

```
elevateconnectsdirectory.org
```

### DNS Checker:

```
https://dnschecker.org
```

---

## 🎉 AFTER FIX

### What Will Work:

```
✅ https://www.elevateconnectsdirectory.org
✅ https://www.elevateconnectsdirectory.org
✅ http://elevateconnectsdirectory.org (redirects to https)
✅ http://www.elevateconnectsdirectory.org (redirects to https)
```

### All URLs will:

- Point to your Netlify LMS
- Have SSL (🔒)
- Work correctly

---

**SUMMARY:**

**Problem:** CNAME points to wrong domain  
**Fix:** Change www CNAME to elevateproduction.netlify.app  
**Time:** 2 minutes to fix + 10-60 minutes for DNS  
**Result:** Everything works perfectly

---

_Fix the CNAME and you're done!_
