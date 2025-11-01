# 🔗 Durable.co Integration - Step by Step

## Why You Don't See Anything Yet

The bridge is **working and ready**, but you need to:

1. Add the bridge script to your Durable.co site
2. Add content slots where you want the content to appear

**The bridge doesn't automatically appear - you control where content goes!**

---

## Step 1: Add Bridge Script to Durable.co

### Go to Durable.co Dashboard

1. Log in to https://durable.co
2. Go to your site: **www.elevateforhumanity.org**
3. Click **Settings** or **Edit Site**
4. Find **Custom Code** or **Head Code** section

### Add This Script

```html
<script
  src="https://main--elevateforhumanityfix.netlify.app/efh-bridge.js"
  data-efh-org="elevate-for-humanity"
  data-env="prod"
  defer
></script>
```

**Where to add it:**

- In the `<head>` section
- Or in "Custom Code" → "Head Code"
- Or in "Settings" → "Advanced" → "Custom Code"

---

## Step 2: Add Content Slots to Your Pages

### What Are Content Slots?

Content slots are HTML elements with `data-efh-slot` attributes. The bridge finds these and injects content into them.

### Available Slots

#### 1. Hero Section

```html
<div data-efh-slot="hero"></div>
```

**What it shows:**

- Title: "Elevate for Humanity Empowerment Center"
- Subtitle with program highlights
- "Apply Now" button

#### 2. Programs Grid (7 programs including CPRS)

```html
<div data-efh-slot="programs"></div>
```

**What it shows:**

- Barber Apprenticeship
- HVAC & Welding
- Healthcare (CNA/QMA)
- Drug Testing Business
- Digital Skills
- Leadership Development
- **Certified Peer Recovery Specialist (CPRS)** ⭐

#### 3. Features Section

```html
<div data-efh-slot="features"></div>
```

**What it shows:**

- Job Placement
- Industry Certifications
- Financial Support
- Mentorship
- Flexible Scheduling
- Fast Track

#### 4. Testimonials

```html
<div data-efh-slot="testimonials"></div>
```

**What it shows:**

- 4 graduate success stories

#### 5. Call to Action

```html
<div data-efh-slot="cta"></div>
```

**What it shows:**

- "Ready to Transform Your Future?"
- Application button

---

## Step 3: Where to Add Slots in Durable

### Option A: Edit Page Directly

1. Go to your Durable page editor
2. Click **Add Element** or **Add HTML Block**
3. Paste one of the slot divs above
4. Save and publish

### Option B: Add to Template

1. Go to **Theme** or **Template** settings
2. Find where you want content
3. Add HTML blocks with slot divs
4. Save template

### Example: Full Page Layout

```html
<!-- Add this to your Durable page -->

<div data-efh-slot="hero"></div>

<h2>Our Programs</h2>
<div data-efh-slot="programs"></div>

<h2>Why Choose Us</h2>
<div data-efh-slot="features"></div>

<h2>Success Stories</h2>
<div data-efh-slot="testimonials"></div>

<div data-efh-slot="cta"></div>
```

---

## Step 4: Test It

### After Adding Script + Slots:

1. **Save** your changes in Durable
2. **Publish** your site
3. **Visit** www.elevateforhumanity.org
4. **Open browser console** (F12)
5. **Look for:** `[EFH Bridge] Initializing...`

### What You Should See:

✅ Hero section with purple gradient background  
✅ 7 program cards in a grid  
✅ 6 feature icons with descriptions  
✅ 4 testimonial quotes  
✅ Call-to-action button

---

## Troubleshooting

### "I don't see anything"

**Check 1: Is the script added?**

- View page source (Ctrl+U)
- Search for "efh-bridge.js"
- Should see: `<script src="https://main--elevateforhumanityfix.netlify.app/efh-bridge.js"`

**Check 2: Are slots added?**

- View page source
- Search for "data-efh-slot"
- Should see: `<div data-efh-slot="hero"></div>`

**Check 3: Browser console**

- Press F12
- Go to Console tab
- Look for `[EFH Bridge]` messages
- Should see: "Initializing..." and "Config loaded"

### "Script is there but no content"

**Possible issues:**

1. Slots are missing - add `<div data-efh-slot="hero"></div>` etc.
2. Script hasn't loaded yet - wait a few seconds
3. JavaScript error - check console for red errors
4. Durable is blocking scripts - check Durable settings

### "I see errors in console"

**Common errors:**

- `Config fetch failed: 404` - Bridge can't find config (shouldn't happen now)
- `CORS error` - Cross-origin issue (shouldn't happen, we have CORS enabled)
- `currentScript is null` - Script loaded incorrectly

---

## Quick Test (Without Durable)

Want to see it working first? Open this file in a browser:

**File:** `test-bridge-working.html` (in repository)

This shows exactly what will appear on Durable once you add the script and slots.

---

## What the Bridge Does

1. **Loads** when page loads
2. **Finds** all elements with `data-efh-slot` attributes
3. **Fetches** content from `/api/efh-config.json`
4. **Injects** HTML into each slot
5. **Styles** the content with inline CSS

---

## Current Bridge Status

✅ **Script URL:** https://main--elevateforhumanityfix.netlify.app/efh-bridge.js  
✅ **Config URL:** https://main--elevateforhumanityfix.netlify.app/api/efh-config.json  
✅ **Programs:** 7 (including CPRS)  
✅ **Status:** Working and ready

---

## Next Steps

1. **Add script to Durable** (Step 1 above)
2. **Add at least one slot** (Step 2 above)
3. **Publish and test**
4. **Check browser console** for confirmation
5. **Add more slots** as needed

---

## Need Help?

**To verify bridge is working:**

```bash
# Test the bridge script
curl https://main--elevateforhumanityfix.netlify.app/efh-bridge.js

# Test the config
curl https://main--elevateforhumanityfix.netlify.app/api/efh-config.json
```

**Both should return content (not 404).**

---

**The bridge is ready and waiting for you to add it to Durable!** 🚀
