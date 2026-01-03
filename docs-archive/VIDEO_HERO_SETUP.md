# 🎥 Video Hero Banner - Setup Guide

**Status:** ✅ Component Installed  
**Location:** Homepage (`/`)  
**Component:** `/components/home/VideoHeroBanner.tsx`

---

## ✅ What's Already Done

The video hero banner is **fully implemented and active** on the homepage with:

- ✅ Full-screen responsive video background
- ✅ Auto-play functionality (muted)
- ✅ Video controls (Play/Pause, Mute/Unmute, Fullscreen)
- ✅ Smooth gradient overlay
- ✅ Content overlay with CTAs
- ✅ Fallback poster image
- ✅ Mobile-optimized
- ✅ Accessibility features

---

## 📹 Add Your Video (2 Options)

### Option 1: Self-Hosted Video (Recommended)

**Step 1:** Prepare your video file

- Resolution: 1920x1080 (Full HD) or higher
- Duration: 10-30 seconds
- Format: MP4 (H.264 codec)
- File size: Under 10MB (compress if needed)

**Step 2:** Compress video (optional but recommended)

```bash
# Using FFmpeg
ffmpeg -i your-video.mp4 -c:v libx264 -crf 28 -preset slow -vf scale=1920:1080 -an hero-banner.mp4
```

**Step 3:** Upload to `/public/videos/`

```bash
# Place your video file here:
/public/videos/hero-banner.mp4

# Optional WebM version for better compression:
/public/videos/hero-banner.webm
```

**Step 4:** Done! Video will auto-play on homepage

---

### Option 2: YouTube/Vimeo Embed

If you prefer YouTube or Vimeo, update the component:

**File:** `/components/home/VideoHeroBanner.tsx`

Replace the `<video>` tag with:

```tsx
{
  /* YouTube Embed */
}
<iframe
  className="absolute inset-0 w-full h-full"
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=YOUR_VIDEO_ID&controls=0&showinfo=0&rel=0&modestbranding=1"
  allow="autoplay; fullscreen"
  frameBorder="0"
/>;

{
  /* OR Vimeo Embed */
}
<iframe
  className="absolute inset-0 w-full h-full"
  src="https://player.vimeo.com/video/YOUR_VIDEO_ID?autoplay=1&muted=1&loop=1&background=1"
  allow="autoplay; fullscreen"
  frameBorder="0"
/>;
```

---

## 🎨 Current Fallback

**Until you add a video, the component displays:**

- Poster image: `/images/heroes/hero-homepage.jpg`
- All text and CTAs still visible
- Fully functional (just no video background)

---

## ⚙️ Customization Options

### Change Video Source

Edit `/components/home/VideoHeroBanner.tsx` line 52-55:

```tsx
<source src="/videos/your-video.mp4" type="video/mp4" />
<source src="/videos/your-video.webm" type="video/webm" />
```

### Change Overlay Text

Edit lines 71-85 in the same file:

```tsx
<h1>Your Custom Headline</h1>
<p>Your custom description</p>
```

### Change CTA Buttons

Edit lines 87-100:

```tsx
<Link href="/your-link">Your Button Text</Link>
```

### Adjust Overlay Darkness

Edit line 67:

```tsx
{
  /* Lighter overlay */
}
<div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />;

{
  /* Darker overlay */
}
<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />;
```

### Disable Auto-Play

Edit line 18 in the component:

```tsx
const [isPlaying, setIsPlaying] = useState(false); // Changed from true
```

---

## 📱 Mobile Behavior

The video hero is fully responsive:

- **Mobile (< 640px):** 400px height
- **Tablet (640-768px):** 500px height
- **Desktop (768-1024px):** 600px height
- **Large Desktop (> 1024px):** 700px height

Video controls appear on hover (desktop) or are always visible (mobile).

---

## 🎬 Video Recommendations

### Best Practices:

1. **Keep it short:** 10-20 seconds is ideal
2. **Show action:** People, training, success stories
3. **No audio needed:** Video is muted by default
4. **High quality:** Use 1080p minimum
5. **Optimize file size:** Compress to under 10MB

### Content Ideas:

- Students in training
- Graduation ceremonies
- Success stories
- Facility tours
- Instructor demonstrations
- Student testimonials
- Program highlights

---

## 🔧 Troubleshooting

### Video not playing?

1. Check file exists at `/public/videos/hero-banner.mp4`
2. Check file format (must be MP4 with H.264 codec)
3. Check file size (under 50MB)
4. Clear browser cache and reload

### Video too large?

Compress using FFmpeg:

```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -vf scale=1920:1080 -an output.mp4
```

### Controls not showing?

- Desktop: Hover over video
- Mobile: Controls always visible

---

## 📊 Performance

**Current Setup:**

- ✅ Lazy loading enabled
- ✅ Poster image for instant display
- ✅ Compressed video recommended
- ✅ Multiple format support (MP4 + WebM)
- ✅ Mobile-optimized

**Expected Load Time:**

- Poster image: < 1 second
- Video (10MB): 2-5 seconds on good connection
- Video (5MB compressed): 1-3 seconds

---

## ✅ Quick Start Checklist

- [x] Component installed
- [x] Homepage updated
- [x] Fallback poster working
- [ ] Add video file to `/public/videos/hero-banner.mp4`
- [ ] Test on desktop
- [ ] Test on mobile
- [ ] Verify auto-play works
- [ ] Check video loops correctly

---

## 🎉 You're Done!

The video hero banner is **live and working** on your homepage.

**To activate video:**

1. Add `hero-banner.mp4` to `/public/videos/`
2. Refresh homepage
3. Video plays automatically!

**Current URL:** [https://www.elevateforhumanity.org](https://www.elevateforhumanity.org)

---

**Need help?** Check `/public/videos/README.md` for detailed video specs.
