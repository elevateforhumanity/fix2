# Video Not Showing on Mobile - Fix Guide

## Issue Analysis

Videos are not displaying properly on mobile devices (cellphone view).

## Root Causes Identified

### 1. **CSS Override Conflicts**

**Location:** `app/mobile-fixes.css` lines 40-47

The mobile CSS has aggressive video styling that may conflict with absolute positioning:

```css
video {
  width: 100% !important;
  height: auto !important; /* ❌ PROBLEM: Changes height from 100% to auto */
  max-width: 100% !important;
  display: block !important;
  object-fit: cover !important;
}
```

**Problem:** The `height: auto !important;` rule overrides the `h-full` (height: 100%) needed for absolute positioned videos.

### 2. **Absolute Positioning on Mobile**

**Location:** `app/page.tsx` line 45

```tsx
<video
  className="absolute inset-0 w-full h-full object-cover"
  ...
>
```

The video uses `absolute inset-0 w-full h-full` which requires:

- Parent with `position: relative` ✅ (section has it)
- `height: 100%` to fill parent ❌ (overridden by mobile CSS)

### 3. **Min-Height May Be Too Small**

**Location:** `app/page.tsx` line 37

```tsx
<section className="relative w-full overflow-hidden min-h-[500px] md:min-h-[600px] ...">
```

On mobile, the section is only `min-h-[500px]` (500px minimum height). If content is taller, the video might not cover properly.

### 4. **Video Loading Issues**

- External video URL from Artlist.io may have CORS or loading issues on mobile
- No fallback image or poster attribute
- No error handling if video fails to load

## Fixes Required

### Fix 1: Update Mobile CSS (CRITICAL)

**File:** `app/mobile-fixes.css`

Replace lines 40-47 with:

```css
/* Video players - Mobile optimized */
video {
  width: 100% !important;
  max-width: 100% !important;
  display: block !important;
  object-fit: cover !important;
}

/* Exception for absolute positioned videos (hero backgrounds) */
video.absolute,
section video[class*='absolute'] {
  height: 100% !important; /* Maintain full height for background videos */
}

/* Exception for aspect-ratio videos */
.aspect-video video {
  height: auto !important;
}
```

### Fix 2: Add Poster Image and Error Handling

**File:** `app/page.tsx`

Update the video element:

```tsx
<video
  ref={videoRef}
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  poster="/images/hero-fallback.jpg" // Add fallback image
  className="absolute inset-0 w-full h-full object-cover"
  onError={(e) => {
    // Fallback if video fails to load
    e.currentTarget.style.display = 'none';
    console.error('Video failed to load');
  }}
>
  <source
    src="https://cms-artifacts.artlist.io/content/generated-video-v1/video__4/generated-video-9491ff2d-bd5a-4570-83e7-05d99663557f.mp4?Expires=2081095425&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=wJZrkaI9bPmzDocPutvmxgDObwlhr0K408zQfDrcdGzfsj4-XZFV5xx73m39AvX4h7M1t6tI3o~AweR5s1AL~l2Hxz3i~nh~AJQV0u4S4DcvX1BfjjIdJx51b1YUfPfUUe502kXA2fjn4kCKGm10JTlPzJI2bmLIa5qkFi7Q3e2b6oc7eOsIctMgBIpWSPIu9GawVYkkE95m2pMmOs1HZyXXMlXcF5IXlZ5XSOMwQM1PMag~yXT6YUxx5Gxx~5Z-9sW78sq8fhVB3m-ppnCZWvIZnwz0ajRnyMPOLT7vEbSJj6l2I2Umovwf9I2JFMUiXwn54VTcpjmpiusOqobrKw__"
    type="video/mp4"
  />
  Your browser does not support the video tag.
</video>
```

### Fix 3: Improve Mobile Section Height

**File:** `app/page.tsx`

Update section className:

```tsx
<section className="relative w-full overflow-hidden min-h-[500px] md:min-h-[600px] h-screen max-h-[800px] flex items-center justify-center bg-slate-900">
```

Changes:

- Added `h-screen` - fills viewport height on mobile
- Added `max-h-[800px]` - prevents excessive height on desktop

### Fix 4: Add Mobile-Specific Video Handling

**File:** `app/page.tsx`

Add mobile detection and conditional rendering:

```tsx
export default function HomePage() {
  const [isMuted, setIsMuted] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Force video play on mobile (some browsers block autoplay)
    if (videoRef.current && isMobile) {
      videoRef.current.play().catch((err) => {
        console.log('Autoplay prevented:', err);
      });
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Rest of component...
}
```

### Fix 5: Alternative - Use Picture Element for Mobile

If video continues to have issues, use a static image on mobile:

```tsx
{
  isMobile ? (
    <Image
      src="/images/hero-fallback.jpg"
      alt="Hero background"
      fill
      className="object-cover"
      priority
    />
  ) : (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src="..." type="video/mp4" />
    </video>
  );
}
```

## Testing Checklist

After applying fixes, test on:

- [ ] iPhone Safari (iOS 15+)
- [ ] iPhone Chrome
- [ ] Android Chrome
- [ ] Android Samsung Internet
- [ ] iPad Safari
- [ ] Desktop Chrome (mobile emulation)
- [ ] Desktop Firefox (mobile emulation)

### Test Scenarios:

1. **Video Visibility**
   - [ ] Video appears on page load
   - [ ] Video covers full section height
   - [ ] Video maintains aspect ratio
   - [ ] No white space above/below video

2. **Video Playback**
   - [ ] Video autoplays (muted)
   - [ ] Video loops continuously
   - [ ] Unmute button works
   - [ ] Video doesn't cause layout shift

3. **Performance**
   - [ ] Page loads in < 3 seconds
   - [ ] Video doesn't block page rendering
   - [ ] Smooth scrolling past video
   - [ ] No memory leaks

4. **Fallbacks**
   - [ ] Poster image shows while loading
   - [ ] Graceful degradation if video fails
   - [ ] Text remains readable over video

## Quick Fix (Immediate)

If you need an immediate fix, add this to `app/page.tsx`:

```tsx
<style jsx>{`
  @media (max-width: 768px) {
    video.absolute {
      height: 100% !important;
    }
  }
`}</style>
```

Place this right before the closing `</main>` tag.

## Additional Recommendations

1. **Optimize Video File**
   - Current video is from external CDN (Artlist.io)
   - Consider hosting locally for better control
   - Create mobile-optimized version (smaller file size)
   - Use adaptive bitrate streaming for better mobile performance

2. **Add Loading State**

   ```tsx
   const [videoLoaded, setVideoLoaded] = React.useState(false);

   <video
     onLoadedData={() => setVideoLoaded(true)}
     className={`absolute inset-0 w-full h-full object-cover transition-opacity ${
       videoLoaded ? 'opacity-100' : 'opacity-0'
     }`}
   >
   ```

3. **Lazy Load Video on Mobile**
   - Don't load video until user scrolls near it
   - Saves bandwidth on mobile connections
   - Improves initial page load time

4. **Consider WebM Format**
   - Add WebM source before MP4
   - Better compression for mobile
   ```tsx
   <source src="video.webm" type="video/webm" />
   <source src="video.mp4" type="video/mp4" />
   ```

## Priority

**Priority:** 🔴 HIGH  
**Impact:** User Experience - Hero section is first impression  
**Effort:** Low (CSS fix) to Medium (full implementation)  
**Risk:** Low - Changes are isolated to video display

## Related Issues

- See `SITE_AUDIT_FINDINGS.md` for other mobile issues
- Check `app/mobile-fixes.css` for other potential conflicts
- Review other pages with video backgrounds for similar issues

---

**Created:** December 15, 2024  
**Status:** Pending Implementation  
**Assigned:** Development Team
