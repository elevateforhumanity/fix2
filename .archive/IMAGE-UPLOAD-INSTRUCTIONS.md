# Image Upload Instructions for Elevate For Humanity

## Required Images - Upload These 4 Files

### 1. Certificate of Completion
**Path:** `public/images/certificates/certificate-of-completion.jpg`
**Label:** CERTIFICATE OF COMPLETION
**Use:** Certificate image for certificate pages / print view

### 2. Top Homepage Hero Banner
**Path:** `public/images/homepage/hero-top-gradient.jpg`
**Label:** TOP HOMEPAGE HERO BANNER
**Use:** First hero section on homepage (gradient background)

### 3. Second Homepage Hero Banner
**Path:** `public/images/homepage/hero-middle-programs.jpg`
**Label:** 2ND HOMEPAGE HERO BANNER
**Use:** Middle/homepage section with 4 program tiles

### 4. Founder Bio Side Image
**Path:** `public/images/founder/founder-elizabeth-greene-desk.jpg`
**Label:** FOUNDER BIO SIDE IMAGE
**Use:** Bio page sidebar image of Elizabeth Greene at desk

## How to Upload

1. **In Gitpod:** Drag and drop the 4 images into the correct folders
2. **Or via GitHub:** Upload directly to the repository

## How to Verify

After uploading, the images are automatically available at:
- `/images/certificates/certificate-of-completion.jpg`
- `/images/homepage/hero-top-gradient.jpg`
- `/images/homepage/hero-middle-programs.jpg`
- `/images/founder/founder-elizabeth-greene-desk.jpg`

## How to Use in Code

```typescript
import { EFH_IMAGES } from "@/config/homepage-images";

// Top hero
<Image src={EFH_IMAGES.HERO_HOME_TOP.src} alt={EFH_IMAGES.HERO_HOME_TOP.alt} />

// Second hero
<Image src={EFH_IMAGES.HERO_HOME_SECOND.src} alt={EFH_IMAGES.HERO_HOME_SECOND.alt} />

// Founder bio
<Image src={EFH_IMAGES.FOUNDER_BIO_SIDE.src} alt={EFH_IMAGES.FOUNDER_BIO_SIDE.alt} />

// Certificate
<Image src={EFH_IMAGES.CERTIFICATE_OF_COMPLETION.src} alt={EFH_IMAGES.CERTIFICATE_OF_COMPLETION.alt} />
```

## Setup Script

The setup script has already been run. If you need to run it again:

```bash
bash scripts/setup-efh-images.sh
```

This creates all necessary folders and the TypeScript config file.
