# Image Replacement Guide
## How to Update Hero Banners & Profile Pictures

## 🎯 Quick Summary

Your site looks professional! Main improvements needed:
1. Replace stock photos with YOUR real photos
2. Use brighter, crystal-clear images
3. Show real students, facilities, instructors

## 📸 Where to Get Better Images

### Option 1: Take Your Own (RECOMMENDED)
**Equipment:** Modern smartphone (iPhone 11+, Samsung S20+)
**Cost:** FREE
**Quality:** Excellent if done right

**Tips for Great Photos:**
1. **Lighting is Everything**
   - Shoot during daytime near windows
   - Avoid harsh overhead lights
   - Golden hour (morning/evening) is best
   - Use natural light whenever possible

2. **Composition**
   - Keep subject in focus
   - Use rule of thirds
   - Leave space around edges
   - Avoid cluttered backgrounds

3. **Action Shots**
   - Students actively learning
   - Instructors teaching
   - Hands-on training
   - Real work being done

### Option 2: Hire a Photographer
**Cost:** $500-1500 for full shoot
**Best for:** Professional headshots, hero images
**Find:** Local photographers on Thumbtack, Upwork

### Option 3: Better Stock Photos
**Free:** Pexels, Unsplash, Pixabay
**Paid:** Shutterstock ($29/month), Adobe Stock ($30/month)
**Search for:** "vocational training", "apprenticeship", "career education"

## 🖼️ Images to Replace (Priority Order)

### 1. Homepage Hero Banner
**Current:** Generic students at table
**File:** `app/page.tsx` line 13
**URL:** `https://images.unsplash.com/photo-1522202176988-66273c2fd55f`

**Replace with:**
- YOUR students in YOUR facility
- Bright, well-lit, engaging
- Shows diversity and inclusion
- Action-oriented (learning, working)

**Specs:**
- Size: 2400x1350 pixels minimum
- Format: JPG or WebP
- Quality: High (85-90)
- File size: Under 300KB

### 2. Barber Program Hero
**Current:** Generic barber stock photo
**File:** `app/programs/barber-apprenticeship/page.tsx` line 10
**URL:** `https://images.unsplash.com/photo-1503951914875-452162b0f3f1`

**Replace with:**
- Real barber training in YOUR facility
- Student cutting hair
- Instructor demonstrating technique
- Professional barbershop environment

### 3. Healthcare/CNA Program Hero
**Current:** Generic healthcare stock photo
**File:** `app/programs/cna/page.tsx`
**URL:** Check the file

**Replace with:**
- Real CNA training
- Students practicing skills
- Clinical environment
- Professional healthcare setting

### 4. Profile Pictures
**Check these pages:**
- `/founder` - Founder headshot
- `/team` - Team member photos
- `/about` - About page photos

**Replace with:**
- Professional headshots
- Consistent background
- Good lighting
- Friendly, approachable

## 🔧 How to Replace Images

### Method 1: Use Unsplash (Quick Fix)
If you want better stock photos right now:

1. Go to [Unsplash.com](https://unsplash.com)
2. Search for specific terms:
   - "vocational training bright"
   - "apprenticeship workshop"
   - "career education diverse"
   - "professional training facility"
3. Look for:
   - Bright, well-lit images
   - Clear, sharp focus
   - Diverse people
   - Action/activity
4. Copy the image URL
5. Replace in code (see below)

### Method 2: Upload Your Own Photos

**Step 1: Prepare Your Images**
```bash
# Resize to correct dimensions
# For hero banners: 2400x1350
# For profiles: 800x800
# For program cards: 1200x800
```

**Step 2: Optimize File Size**
- Use [TinyPNG.com](https://tinypng.com) to compress
- Target: Under 300KB for heroes, 100KB for profiles

**Step 3: Upload to Project**
```bash
# Put images in public folder:
/public/images/hero/homepage.jpg
/public/images/hero/barber-program.jpg
/public/images/profiles/founder.jpg
```

**Step 4: Update Code**
Replace Unsplash URLs with your local images:

```typescript
// OLD:
src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop&q=90"

// NEW:
src="/images/hero/homepage.jpg"
```

## 📝 Specific Files to Edit

### Homepage Hero
**File:** `app/page.tsx`
**Line:** ~13
**Current:**
```typescript
src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop&q=90"
```

**Change to:**
```typescript
src="/images/hero/homepage.jpg"
// OR use better Unsplash image:
src="https://images.unsplash.com/photo-[BETTER-IMAGE-ID]?w=2400&h=1350&fit=crop&q=90"
```

### Barber Program Hero
**File:** `app/programs/barber-apprenticeship/page.tsx`
**Line:** ~10
**Current:**
```typescript
src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&h=1080&fit=crop&q=90"
```

**Change to:**
```typescript
src="/images/hero/barber-program.jpg"
```

## 🎨 Image Quality Checklist

Before using any image, check:
- [ ] Is it bright and well-lit?
- [ ] Is it crystal clear (not blurry)?
- [ ] Does it show real people/activity?
- [ ] Is the resolution high enough (2400x1350 for heroes)?
- [ ] Is the file size optimized (< 300KB)?
- [ ] Does it represent YOUR brand?
- [ ] Is it relevant to the content?

## 🚀 Quick Win: Better Unsplash Images

If you want immediate improvement without custom photos, here are better Unsplash searches:

### For Homepage Hero:
Search: "diverse students learning bright classroom"
Look for: Bright, engaging, diverse group actively learning

### For Barber Program:
Search: "barber training professional bright"
Look for: Clear barbering action, professional setting

### For Healthcare/CNA:
Search: "nursing student training bright"
Look for: Clinical training, professional environment

### For Skilled Trades:
Search: "vocational training workshop bright"
Look for: Hands-on work, professional tools

## 📞 Need Help?

If you have photos but need help:
1. Resizing: Use [Canva.com](https://canva.com) (free)
2. Compression: Use [TinyPNG.com](https://tinypng.com) (free)
3. Editing: Use [Photopea.com](https://photopea.com) (free Photoshop alternative)

## ✅ After Replacing Images

1. Test on mobile devices
2. Check loading speed
3. Verify images are sharp and clear
4. Ensure proper alt text
5. Test on slow connections

## 🎯 Priority Order

1. **Homepage hero** - Most visible, highest impact
2. **Top 3 program heroes** - Barber, CNA, HVAC
3. **Founder profile** - Builds trust
4. **Remaining program heroes**
5. **Team photos**
6. **Facility photos**

---

**Want me to help you replace specific images? Just let me know which ones and I'll update the code!**
