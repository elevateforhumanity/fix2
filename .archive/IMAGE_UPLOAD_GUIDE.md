# Image Upload Guide

## Quick Start

1. **Place images in the uploads folder:**
   ```bash
   mkdir -p /workspaces/fix2/uploads
   # Copy your images here with correct names
   ```

2. **Run the upload script:**
   ```bash
   ./scripts/upload-images.sh
   ```

3. **Commit and deploy:**
   ```bash
   git add public/images/
   git commit -m "Add facility and team images"
   git push origin main
   ```

---

## Image Naming Convention

### Facility Images

#### Lobby / Main Atrium
- `lobby-hero-01.jpg` → Wide shot of curved sofa, blue chairs, windows
- `lobby-hero-02.jpg` → Alternate wide angle
- `lobby-hero-03.jpg` → Another perspective
- `lobby-hero-04.jpg` → Additional angle
- `lobby-detail-seating-01.jpg` → Close-up of blue chairs + tables
- `lobby-detail-seating-02.jpg` → Alternate seating detail
- `lobby-detail-plant-01.jpg` → Black round planter close-up

#### Elevators / Entry Corridor
- `elevators-bank-01.jpg` → Elevator bank with brown slats
- `elevators-bank-02.jpg` → Alternate angle
- `elevators-hall-01.jpg` → Corridor view

#### Cafe / Coffee Bar
- `cafe-counter-01.jpg` → Long cafe counter with stools
- `cafe-entry-view-01.jpg` → Lobby view toward cafe
- `cafe-booths-01.jpg` → Dark booths with circular lights
- `cafe-booths-02.jpg` → Alternate booth angle

#### Work Bar
- `workbar-window-01.jpg` → High stools along windows
- `workbar-window-02.jpg` → Alternate angle

#### Atrium Views
- `atrium-overlook-01.jpg` → Looking down on lobby
- `atrium-overlook-02.jpg` → Alternate overlook
- `atrium-overlook-03.jpg` → Third perspective

#### Balcony
- `balcony-holiday-01.jpg` → Upper balcony with garland

#### Waiting Area
- `waiting-area-01.jpg` → Teal chairs, TV, Christmas tree
- `waiting-area-02.jpg` → Alternate angle
- `waiting-area-03.jpg` → Third view

#### Breakroom / Kitchen
- `breakroom-01.jpg` → Wide view with table + TV
- `breakroom-02.jpg` → Blue cabinets + fridges
- `breakroom-03.jpg` → Table + poinsettia/TV
- `breakroom-04.jpg` → Bulletin board + kitchen

#### Meeting Rooms - Small
- `meeting-small-01.jpg` → Oval table, 4 mesh chairs

#### Meeting Rooms - Boardroom
- `meeting-boardroom-01.jpg` → Long table, 10+ chairs
- `meeting-boardroom-02.jpg` → Alternate angle
- `meeting-boardroom-03.jpg` → Whiteboard view
- `meeting-boardroom-04.jpg` → Window view

#### Art Office
- `office-art-wall-01.jpg` → Office with green/blue art canvas
- `office-art-wall-02.jpg` → Alternate angle

#### Exterior
- `exterior-aerial-01.jpg` → Campus aerial view with snow

---

### Program Images

#### Marketing
- `elevate-collage-hero-01.jpg` → Main Elevate collage graphic
- `elevate-collage-hero-02.jpg` → Alternate version (optional)

#### Healthcare
- `healthcare-lab-01.jpg` → Students in teal scrubs around mannequin
- `healthcare-lab-02.jpg` → Students practicing
- `healthcare-lab-03.jpg` → Student with stethoscope at bedside
- `healthcare-lab-04.jpg` → Group in blue scrubs

---

### Team Images

#### Alina Smith
- `alina-smith-bio-hero-01.jpg` → Bio page hero image

#### Founder - Elizabeth Greene
- `elizabeth-greene-founder-hero-01.jpg` → Main founder photo (red blazer, desk)
- `elizabeth-greene-founder-portrait-01.jpg` → Cropped square version
- `elizabeth-greene-founder-wide-01.jpg` → Wide banner version

---

## Image Specifications

### Recommended Dimensions

- **Hero Images:** 1400x700px (2:1 ratio)
- **Portrait Images:** 800x800px (1:1 ratio)
- **Wide Banners:** 1920x600px (16:5 ratio)
- **Detail Shots:** 800x600px (4:3 ratio)

### File Format
- Use `.jpg` for photos
- Quality: 85-95%
- Max file size: 500KB per image (optimize before upload)

### Optimization
Images will be automatically optimized by Next.js, but pre-optimizing helps:
```bash
# Using ImageMagick (if available)
convert input.jpg -quality 85 -resize 1400x700 output.jpg
```

---

## Where Images Appear

### Homepage
- Hero: `lobby-hero-01.jpg`, `atrium-overlook-01.jpg`, `elevate-collage-hero-01.jpg`
- Features: `cafe-counter-01.jpg`, `workbar-window-01.jpg`, `meeting-boardroom-01.jpg`
- Dual Image: `lobby-hero-03.jpg`, `cafe-booths-01.jpg`

### About Page
- Hero: `atrium-overlook-02.jpg`, `lobby-hero-04.jpg`
- Campus: `exterior-aerial-01.jpg`, `elevators-bank-01.jpg`, `breakroom-01.jpg`

### Programs Pages
- Overview: `elevate-collage-hero-01.jpg`
- Healthcare: All `healthcare-lab-*.jpg` images

### Campus/Facility Page
- All facility images organized by section

### Team Pages
- Founder: `elizabeth-greene-founder-hero-01.jpg`
- Alina: `alina-smith-bio-hero-01.jpg`

---

## Troubleshooting

**Images not showing up?**
1. Check file names match exactly (case-sensitive)
2. Verify files are in correct folders
3. Clear browser cache (Ctrl+Shift+R)
4. Check Vercel deployment logs

**Images look stretched?**
1. Verify original dimensions match recommendations
2. Check if using `fill` vs `width/height` in component
3. Ensure `object-cover` or `object-contain` is set correctly

**Need to replace an image?**
1. Delete old image from folder
2. Add new image with same name
3. Commit and push changes
4. Clear CDN cache if needed
