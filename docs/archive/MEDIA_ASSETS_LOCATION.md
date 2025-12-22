# Media Assets Location Guide

## Summary

**Total Images:** 779 files  
**Total Videos:** 70 files  
**Total Size:** 234 MB  
**Location:** `/public/` directory

---

## 📁 Images (779 files)

### Main Location: `public/images/`

**Total:** 696 images organized by category

#### Categories

```
public/images/
├── artlist/              - Stock images from Artlist
├── beauty/               - Beauty/cosmetology program images
├── bio/                  - Biography/profile images
├── business/             - Business program images
├── courses/              - Course-specific images
├── culinary/             - Culinary program images
├── efh/                  - Elevate for Humanity branding
├── employers/            - Employer partner logos
├── facilities-new/       - Facility photos
├── funding/              - Funding partner images
├── gallery/              - General gallery images
├── general/              - General purpose images
├── healthcare/           - Healthcare program images
├── hero/                 - Hero section images
├── heroes/               - Program hero images
│   └── programs/         - Program-specific heroes
│       └── healthcare/   - Healthcare heroes
├── highlights/           - Feature highlights
├── learners/             - Student/learner photos
├── partners/             - Partner logos
├── programs-new/         - New program images
├── team/                 - Team member photos
│   ├── founder/          - Founder photos
│   └── instructors/      - Instructor photos
└── testimonials/         - Testimonial images
```

### Other Image Locations

```
public/people/            - 1 image (people directory)
public/catalog/           - Empty (catalog directory)
public/policies/          - Empty (policies directory)
```

---

## 🎥 Videos (70 files)

### Main Location: `public/videos/`

**Total:** 70 video files

#### Video Categories

**Hero Videos:**

- `barber-hero-final.mp4`
- `barber-hero-new.mp4`
- `barber-hero.mp4`
- `barber-original.mp4`
- `beauty-hero.mp4`
- `business-hero.mp4`
- `culinary-hero.mp4`
- `healthcare-hero.mp4`
- `it-hero.mp4`
- `manufacturing-hero.mp4`

**Section Videos:**

- `about-section-video.mp4`
- `about-section-video-with-narration.mp4`
- `apply-section-video.mp4`
- `apply-section-video-with-narration.mp4`
- `contact-section-video.mp4`
- `hero-section-video.mp4`
- `programs-section-video.mp4`

**Program Videos:**

- `barber-program.mp4`
- `beauty-program.mp4`
- `business-program.mp4`
- `culinary-program.mp4`
- `healthcare-program.mp4`
- `it-program.mp4`
- `manufacturing-program.mp4`

**Background Videos:**

- `background-1.mp4` through `background-10.mp4`
- `hero-background.mp4`
- `homepage-hero.mp4`

**Documentation:**

- `README.md` - Video documentation
- `DOWNLOAD_VIDEOS.md` - Video download instructions

---

## 💾 Backup

### Location: `public/media-backup-20251128-043824/`

**Created:** November 28, 2024 at 04:38:24  
**Purpose:** Backup of media assets  
**Structure:**

```
public/media-backup-20251128-043824/
└── team/                 - Team photos backup
```

---

## 📊 Storage Breakdown

| Directory                | Size       | Files                      | Type   |
| ------------------------ | ---------- | -------------------------- | ------ |
| `public/images/`         | ~180 MB    | 696                        | Images |
| `public/videos/`         | ~50 MB     | 70                         | Videos |
| `public/media-backup-*/` | ~4 MB      | 83                         | Backup |
| **Total**                | **234 MB** | **779 images + 70 videos** | Mixed  |

---

## 🔗 How Images Are Used

### In Next.js Components

```tsx
import Image from 'next/image';

// Images are referenced from /public
<Image
  src="/images/hero/homepage.jpg" // public/images/hero/homepage.jpg
  alt="Hero image"
  width={1920}
  height={1080}
/>;
```

### In CSS/Styles

```css
background-image: url('/images/gallery/image1.jpg');
```

### Direct URLs

```
https://www.elevateforhumanity.org/images/team/founder/photo.jpg
```

---

## 🎬 How Videos Are Used

### In Next.js Components

```tsx
<video autoPlay loop muted>
  <source src="/videos/hero-section-video.mp4" type="video/mp4" />
</video>
```

### Direct URLs

```
https://www.elevateforhumanity.org/videos/barber-hero-final.mp4
```

---

## 📝 File Formats

### Images

- **JPEG/JPG** - Most common (photos, hero images)
- **PNG** - Logos, graphics with transparency
- **SVG** - Vector graphics, icons
- **WebP** - Optimized web images
- **GIF** - Animated graphics

### Videos

- **MP4** - Primary video format (H.264 codec)
- **WebM** - Alternative web format
- **MOV** - Original/source videos

---

## 🔍 Finding Specific Assets

### Search by Type

```bash
# Find all hero images
find public/images -name "*hero*"

# Find all program videos
find public/videos -name "*program*"

# Find team photos
find public/images/team -type f

# Find all JPG images
find public -name "*.jpg"
```

### Search by Program

```bash
# Healthcare assets
find public -name "*healthcare*"

# Barber assets
find public -name "*barber*"

# Culinary assets
find public -name "*culinary*"
```

---

## 📤 Deployment

### Vercel Deployment

All files in `public/` are automatically deployed to Vercel and served from:

```
https://www.elevateforhumanity.org/images/...
https://www.elevateforhumanity.org/videos/...
```

### CDN

Vercel automatically serves these assets through their global CDN for optimal performance.

---

## 🎨 Image Optimization

### Next.js Image Component

Next.js automatically optimizes images when using the `Image` component:

- Automatic WebP conversion
- Responsive image sizing
- Lazy loading
- Blur placeholder

### Manual Optimization

For better performance, consider:

- Compressing images before upload
- Using WebP format
- Resizing to appropriate dimensions
- Using SVG for logos and icons

---

## 📋 Asset Management

### Adding New Assets

1. **Images:** Place in appropriate `public/images/` subdirectory
2. **Videos:** Place in `public/videos/`
3. **Naming:** Use descriptive, lowercase, hyphenated names
4. **Organization:** Keep similar assets together

### Removing Assets

1. Check if asset is referenced in code
2. Search codebase: `grep -r "filename" .`
3. Remove file if unused
4. Commit changes

---

## 🔐 Access Control

### Public Access

All files in `public/` are **publicly accessible** via direct URL:

- ✅ Good for: Marketing images, public videos, logos
- ❌ Bad for: Private documents, sensitive data

### Private Assets

For private/protected assets, use:

- Supabase Storage (with authentication)
- API routes with authentication
- Server-side rendering with access control

---

## 📊 Quick Stats

```
Total Media Assets: 849 files
├── Images: 779 files
│   ├── public/images/: 696 files
│   ├── public/people/: 1 file
│   └── backup: 82 files
└── Videos: 70 files
    └── public/videos/: 70 files

Total Size: 234 MB
├── Images: ~180 MB
├── Videos: ~50 MB
└── Backup: ~4 MB

Organization: ✅ Well-organized by category
Backup: ✅ Backup exists (Nov 28, 2024)
Deployment: ✅ Automatically deployed to Vercel
CDN: ✅ Served via Vercel CDN
```

---

## 🚀 Performance Tips

1. **Use Next.js Image component** - Automatic optimization
2. **Lazy load videos** - Use `loading="lazy"` attribute
3. **Compress before upload** - Reduce file sizes
4. **Use appropriate formats** - WebP for images, MP4 for videos
5. **Implement blur placeholders** - Better UX while loading

---

## 📞 Support

If you need to:

- Add new media assets
- Optimize existing assets
- Reorganize directories
- Set up private storage

Refer to Next.js documentation or Vercel deployment guides.

---

**Last Updated:** December 16, 2025  
**Total Assets:** 849 files (779 images + 70 videos)  
**Location:** `/public/` directory  
**Status:** ✅ All assets deployed and accessible
