# FIX YOUR DNS NOW - 2 MINUTES
**Problem:** CNAME points to wrong domain
**Fix:** Simple change in Durable.co

---

## 🚨 THE PROBLEM

Your CNAME currently says:
```
CNAME  www  elevateforhumanity.org  ❌ WRONG!
```

Should say:
```
CNAME  www  elevateproduction.netlify.app  ✅ CORRECT!
```

---

## ✅ THE FIX (2 minutes)

### Step 1: Delete Wrong CNAME

In your Durable DNS table, find this row:
```
CNAME  www  elevateforhumanity.org
```

Click the **Delete** button (trash icon) → Confirm

### Step 2: Add Correct CNAME

Click **Add** button, enter:
```
Type: CNAME
Name: www
Content: elevateproduction.netlify.app
```

Click **Save**

### Step 3: Verify

Your DNS should now show:
```
A      @    75.2.60.5                    ✅
CNAME  www  elevateproduction.netlify.app ✅
```

**Done!**

---

## 🎯 WHAT THIS DOES

### Before Fix:
```
www.elevateconnectsdirectory.org → elevateforhumanity.org (wrong site)
```

### After Fix:
```
www.elevateconnectsdirectory.org → elevateproduction.netlify.app (your LMS)
```

---

## ⏱️ TIMELINE

- **Fix DNS:** 2 minutes
- **DNS propagation:** 10-60 minutes
- **SSL certificate:** 5-10 minutes after DNS
- **Total:** 15-70 minutes

---

## 🔍 VERIFY IT WORKED

After 10-15 minutes:

1. Visit: https://dnschecker.org
2. Enter: www.elevateconnectsdirectory.org
3. Select: CNAME
4. Should show: elevateproduction.netlify.app ✅

---

**DO THIS NOW:**

1. Go to Durable DNS settings
2. Delete: CNAME www → elevateforhumanity.org
3. Add: CNAME www → elevateproduction.netlify.app
4. Save
5. Done!

---

*Then proceed to add domain in Netlify (see DURABLE_DOMAIN_SETUP.md)*
