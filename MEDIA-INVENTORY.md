# Media Inventory

Last Updated: 2025-12-29

## Summary

- **Total Videos**: 66 files
- **Total Images**: 727 files
- **Storage Location**: All media stored locally in `/public/videos/` and `/public/images/`
- **External Dependencies**: None (all Artlist and Unsplash URLs replaced with local assets)

## Video Assets

All videos are stored in `/public/videos/` and subdirectories.

### Hero Videos
- `hero-home.mp4` - Homepage hero background
- `barber-hero.mp4`, `barber-hero-final.mp4`, `barber-hero-new.mp4` - Barber program heroes
- `business-hero.mp4`, `business-hero-final.mp4` - Business program heroes
- `cna-hero.mp4` - CNA program hero
- `cdl-hero.mp4` - CDL program hero
- `building-technician-hero.mp4` - Building technician hero

### Program Videos
- `barber.mp4`, `barber-spotlight.mp4` - Barber program content
- Course-specific videos in `/public/videos/courses/` directory

### Section Videos
- `about-section-video.mp4` - About section
- `apply-section-video.mp4` - Apply section
- `employer-section-video.mp4` - Employer section
- `programs-overview-video.mp4` - Programs overview
- `success-stories-video.mp4` - Success stories

### Narrated Versions
Many videos have `-with-narration` variants for accessibility.

## Image Assets

All images are stored in `/public/images/` and subdirectories.

### Directory Structure
- `/public/images/heroes/` - Hero section images
- `/public/images/programs/` - Program-specific images
- `/public/images/artlist/` - Training and general content images
- `/public/images/facilities-new/` - Facility photos
- `/public/images/learners/` - Student and learner photos
- `/public/images/platform/` - Platform screenshots
- `/public/images/bio/` - Staff and team photos

## Git LFS Configuration

A `.gitattributes` file has been created to track large media files with Git LFS:
- Video files: `*.mp4`, `*.webm`, `*.mov`, `*.avi`, `*.mkv`
- Large images: `*.psd`, `*.ai`, `*.tif`, `*.tiff`
- Audio files: `*.mp3`, `*.wav`, `*.flac`
- Archives: `*.zip`, `*.tar.gz`, `*.rar`

**Note**: Git LFS must be installed before cloning: `git lfs install && git lfs pull`

## Media Usage Guidelines

### Video Usage
- All hero videos should use the `poster` attribute with a corresponding image
- Videos should be muted by default with `muted` attribute
- Use `playsInline` for mobile compatibility
- Always provide fallback poster images

### Image Usage
- Use Next.js `Image` component for optimization
- Specify appropriate `sizes` attribute for responsive images
- Use `priority` for above-the-fold images
- Set `quality` appropriately (75 for general use, 100 for hero images)

### Path Standards
- Always use absolute paths starting with `/videos/` or `/images/`
- Never use relative paths (`../`, `./`)
- Never use external CDN URLs (Artlist, Unsplash, etc.)

## Recent Changes (2025-12-29)

1. **Removed External Dependencies**
   - Replaced all Artlist CDN video URLs with `/videos/hero-home.mp4`
   - Replaced all Artlist CDN image URLs with `/images/heroes/hero-homepage.jpg`
   - Replaced all Unsplash URLs with `/images/programs/program-placeholder.jpg`

2. **Removed Gradient Overlays**
   - Removed all gradient overlay divs from components
   - Updated CSS files to use solid colors instead of gradients
   - Removed gradient animations from `animations.css`

3. **Git LFS Setup**
   - Created `.gitattributes` for future LFS tracking
   - Documented LFS installation requirements

## Maintenance

### Adding New Media
1. Place files in appropriate `/public/videos/` or `/public/images/` subdirectory
2. Use descriptive, kebab-case filenames
3. Optimize before adding (compress videos, resize images)
4. Update this inventory document

### Removing Media
1. Search codebase for references before deleting
2. Update this inventory document
3. Consider keeping a backup if used in git history

### Checking for Broken References
```bash
# Find all image/video references
grep -r "src=\"/videos\|src=\"/images" app/ components/ --include="*.tsx" --include="*.jsx"

# Check for external URLs
grep -r "https://" app/ components/ --include="*.tsx" --include="*.jsx" | grep -i "video\|image"
```

## Support

For questions about media assets, contact the development team or refer to:
- `/public/videos/README.md` - Video-specific documentation
- `/public/ASSETS_README.md` - General asset guidelines
