# 🔧 How to Fix "It's a Mess" on Durable.co

## What I Found

I checked your Durable.co site and **the bridge script is NOT there yet**.

This means either:

1. You haven't added it yet
2. You added it but it didn't save
3. You added it in the wrong place
4. Durable stripped it out

## ✅ CORRECT Way to Add Bridge to Durable

### Step 1: Log into Durable.co

Go to https://durable.co and log in

### Step 2: Go to Site Settings

1. Click on your site: **Elevate for Humanity Career and Technical Institute**
2. Look for one of these:
   - **Settings** button
   - **Edit Site** button
   - **Customize** button

### Step 3: Find Custom Code Section

Look for:

- **Custom Code**
- **Head Code**
- **Advanced Settings** → **Custom Code**
- **SEO & Code** → **Custom Code**

### Step 4: Add ONLY the Script Tag

**Copy this EXACTLY:**

```html
<script
  src="https://main--elevateforhumanityfix.netlify.app/efh-bridge.js"
  data-efh-org="elevate-for-humanity"
  data-env="prod"
  defer
></script>
```

**Paste it in the HEAD section** (not body, not footer)

### Step 5: Save and Publish

Click **Save** then **Publish**

---

## ⚠️ Common Mistakes (Why It's "A Mess")

### Mistake 1: Adding Too Much Code

**DON'T add:**

- The entire HTML file
- Multiple script tags
- Content slots in the custom code section

**ONLY add:**

- The single script tag above

### Mistake 2: Adding Content Slots in Wrong Place

Content slots (`<div data-efh-slot="hero"></div>`) should be added:

- **In page editor** (not custom code)
- **As HTML blocks** on specific pages
- **Where you want content to appear**

### Mistake 3: Wrong URL

Make sure you use:

```
https://main--elevateforhumanityfix.netlify.app/efh-bridge.js
```

NOT:

- ~~https://elevateforhumanityfix2.netlify.app~~ (wrong site)
- ~~https://github.io~~ (wrong host)
- ~~http://~~ (needs https)

---

## 🎯 Simple 2-Step Process

### STEP 1: Add Script (Custom Code Section)

```html
<script
  src="https://main--elevateforhumanityfix.netlify.app/efh-bridge.js"
  data-efh-org="elevate-for-humanity"
  data-env="prod"
  defer
></script>
```

### STEP 2: Add ONE Content Slot (Page Editor)

On your homepage, add an HTML block with:

```html
<div data-efh-slot="programs"></div>
```

That's it! Just these 2 things.

---

## 🧪 How to Test

### After adding script + one slot:

1. **Save and Publish** in Durable
2. **Visit** your site: www.elevateforhumanity.org
3. **Right-click** → **View Page Source**
4. **Search** (Ctrl+F) for "efh-bridge"
5. **Should see:** The script tag in the HTML

### Check Browser Console:

1. Press **F12** (or right-click → Inspect)
2. Go to **Console** tab
3. **Look for:** `[EFH Bridge] Initializing...`
4. **Should see:** `[EFH Bridge] Config loaded`

### What You Should See:

If you added the programs slot, you should see:

- **7 program cards** in a grid
- Each with name, description, and "Learn more" link
- Including **CPRS** program

---

## 🚨 If It's Still "A Mess"

### Tell me EXACTLY what you see:

1. **Where did you add the code?**
   - Custom Code section?
   - Page editor?
   - Somewhere else?

2. **What does "a mess" mean?**
   - Nothing shows up?
   - Shows raw HTML code?
   - Shows broken layout?
   - Shows error messages?

3. **Can you take a screenshot?**
   - Of what you see on the site
   - Of where you added the code in Durable

---

## 💡 Alternative: Test First

### Before adding to Durable, test locally:

1. **Download** the test file: `test-bridge-working.html`
2. **Open it** in your browser
3. **See if** the bridge works
4. **If it works** → problem is with Durable
5. **If it doesn't work** → problem is with bridge

---

## 🎯 What Should Happen (When Done Right)

### You add script:

```html
<script
  src="https://main--elevateforhumanityfix.netlify.app/efh-bridge.js"
  data-efh-org="elevate-for-humanity"
  data-env="prod"
  defer
></script>
```

### You add ONE slot on homepage:

```html
<div data-efh-slot="programs"></div>
```

### You see:

- **7 program cards** appear where you put the slot
- **Styled nicely** with purple accents
- **"Learn more" buttons** on each card
- **CPRS program** included

### You DON'T see:

- Raw HTML code
- Broken layout
- Error messages
- Nothing at all

---

## 📞 Next Steps

**Tell me:**

1. Did you add the script to Custom Code section?
2. Did you add a content slot to a page?
3. What exactly do you see that's "a mess"?

**I'll help you fix it based on what you tell me.**

---

## 🔑 Key Points

1. **Script goes in Custom Code** (head section)
2. **Slots go in Page Editor** (HTML blocks)
3. **Only add the script tag** (not entire HTML file)
4. **Use correct URL** (main--elevateforhumanityfix.netlify.app)
5. **Test in browser console** (F12 → Console)

**The bridge is working. We just need to add it to Durable correctly.** 🚀
