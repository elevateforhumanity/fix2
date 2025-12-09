# Missing Images Report

## Summary
Most pages are using AutoPolishedPage or ProgramPageLayout components which don't have hero images.

## Pages WITH Images (Working)
- ✅ Homepage (`/`) - Has slideshow with 10 images
- ✅ Programs listing (`/programs`) - Has 9 program cards with images
- ✅ Pages using ProgramTemplate component - Have hero images

## Pages WITHOUT Images (Need Fixing)

### LMS Pages (using AutoPolishedPage)
- `/lms` - No hero image
- `/lms/dashboard` - No hero image
- `/courses` - No hero image
- All other LMS pages - No hero images

### Program Detail Pages (using ProgramPageLayout)
- `/programs/cna` - No hero image
- `/programs/hvac` - No hero image
- `/programs/barber` - No hero image
- All other program detail pages - No hero images

### Marketing Pages (using AutoPolishedPage)
- `/about` - No hero image
- `/apply` - No hero image
- `/contact` - No hero image
- `/funding` - No hero image
- `/employers` - No hero image

## Solution Needed
Update these components to match homepage style:
1. AutoPolishedPage - Add hero banner with image
2. ProgramPageLayout - Add hero banner with image

Both should match the homepage template with:
- Orange top banner
- 700px hero with overlay
- Government partners bar
- Consistent spacing
