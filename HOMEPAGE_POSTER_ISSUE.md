# 🔍 Homepage Poster Image Issue - Analysis

**Date:** January 2, 2026  
**Issue:** Poster images visible behind hero banner

---

## 🎯 What's Happening

The video hero banner on the homepage has a **poster image** that shows:
1. Before the video loads
2. If the video fails to load
3. While the video is buffering

**Poster image:** `/images/heroes/hero-homepage.jpg`

---

## 📊 Current Setup

### VideoHeroBanner Component

```typescript
<video
  poster="/images/heroes/hero-homepage.jpg"  // ← This is the poster
  className="absolute inset-0 w-full h-full object-cover"
  autoPlay
  loop
  muted
  playsInline
>
  <source src="/videos/hero-homepage.mp4" type="video/mp4" />
</video>
```

---

## 🔍 Possible Issues

### 1. Video Not Loading
**Symptom:** Poster stays visible  
**Cause:** Video file missing or not loading  
**Check:**
```bash
curl -I https://www.elevateforhumanity.org/videos/hero-homepage.mp4
```

### 2. Autoplay Blocked
**Symptom:** Video doesn't start, poster remains  
**Cause:** Browser autoplay policy  
**Solution:** Video must be muted for autoplay (already is)

### 3. Z-Index Issue
**Symptom:** Poster shows through video  
**Cause:** CSS layering problem  
**Check:** Inspect element z-index values

### 4. Video Transparency
**Symptom:** Poster visible through video  
**Cause:** Video has transparency or alpha channel  
**Solution:** Re-encode video without alpha

### 5. Loading State
**Symptom:** Poster flashes before video  
**Cause:** Normal behavior during load  
**Solution:** Preload video or use loading state

---

## ✅ Verified Working

- ✅ Poster image exists: `/images/heroes/hero-homepage.jpg`
- ✅ Poster image accessible: HTTP 200
- ✅ Image size: 244KB (reasonable)
- ✅ Component has proper attributes

---

## 🔧 Potential Fixes

### Fix 1: Remove Poster (If Video Always Loads)

```typescript
<video
  // Remove poster attribute
  className="absolute inset-0 w-full h-full object-cover bg-black"
  autoPlay
  loop
  muted
  playsInline
>
```

### Fix 2: Add Loading State

```typescript
const [videoLoaded, setVideoLoaded] = useState(false);

<video
  poster="/images/heroes/hero-homepage.jpg"
  onLoadedData={() => setVideoLoaded(true)}
  className={`absolute inset-0 w-full h-full object-cover ${
    videoLoaded ? 'opacity-100' : 'opacity-0'
  }`}
>
```

### Fix 3: Preload Video

```typescript
<video
  poster="/images/heroes/hero-homepage.jpg"
  preload="auto"  // ← Add this
  className="absolute inset-0 w-full h-full object-cover"
>
```

### Fix 4: Hide Poster After Load

```typescript
<video
  poster="/images/heroes/hero-homepage.jpg"
  onPlay={() => {
    // Hide poster when video starts
    const video = videoRef.current;
    if (video) video.removeAttribute('poster');
  }}
>
```

### Fix 5: Use Background Image Instead

```typescript
<div 
  className="absolute inset-0 bg-cover bg-center"
  style={{ backgroundImage: 'url(/images/heroes/hero-homepage.jpg)' }}
>
  <video
    className="absolute inset-0 w-full h-full object-cover"
    autoPlay
    loop
    muted
    playsInline
  >
```

---

## 🧪 How to Diagnose

### Check Video Loading

1. Open homepage: https://www.elevateforhumanity.org
2. Open browser DevTools (F12)
3. Go to Network tab
4. Filter by "Media"
5. Look for `hero-homepage.mp4`
6. Check if it loads successfully

### Check Console Errors

1. Open browser console
2. Look for video-related errors:
   - "Failed to load resource"
   - "Autoplay blocked"
   - "Video format not supported"

### Check Video Element

1. Right-click on hero banner
2. Inspect element
3. Find the `<video>` tag
4. Check:
   - Is video playing? (look for `paused` attribute)
   - Is poster still showing?
   - What's the `readyState`?

---

## 📝 Questions to Answer

1. **Is the video loading at all?**
   - Check Network tab for video file

2. **Is the video playing?**
   - Check if video element shows `paused: false`

3. **Is the poster supposed to be visible?**
   - Poster should only show before video loads

4. **Is this happening on all browsers?**
   - Test Chrome, Firefox, Safari

5. **Is this happening on mobile?**
   - Mobile may have different autoplay rules

---

## 🎯 Most Likely Cause

Based on typical issues:

**#1: Video file not loading**
- Check if `/videos/hero-homepage.mp4` exists
- Check file size (might be too large)
- Check if video is in correct format

**#2: Autoplay policy**
- Some browsers block autoplay
- Video must be muted (already is)
- User interaction may be required

**#3: Normal loading behavior**
- Poster shows briefly while video loads
- This is expected behavior
- Can be improved with preload or loading state

---

## 🚀 Recommended Action

### Step 1: Check if video exists

```bash
ls -la public/videos/hero-homepage.mp4
```

### Step 2: Test video loading

```bash
curl -I https://www.elevateforhumanity.org/videos/hero-homepage.mp4
```

### Step 3: If video doesn't exist

Create or upload the video file to `public/videos/`

### Step 4: If video is too large

Optimize video:
- Reduce resolution
- Compress with H.264
- Target < 5MB for hero videos

---

## 📊 Current Status

- ✅ Poster image: Working
- ❓ Video file: Unknown (need to check)
- ❓ Video loading: Unknown (need to test)
- ❓ Autoplay: Unknown (need to verify)

---

**Next step:** Check if video file exists and is loading properly.

**If you can describe what you're seeing, I can provide a more specific fix!**

Are you seeing:
- A static image instead of video?
- Video playing but poster showing through?
- Poster flashing before video starts?
- Something else?
