#!/usr/bin/env bash
set -euo pipefail

echo ">>> Creating image folders..."
mkdir -p public/images/certificates
mkdir -p public/images/homepage
mkdir -p public/images/founder
mkdir -p src/config

cat << 'CONF' > src/config/homepage-images.ts
// CENTRAL IMAGE MAP FOR ELEVATE FOR HUMANITY
// Make sure the physical files exist at these exact paths under /public

export const EFH_IMAGES = {
  CERTIFICATE_OF_COMPLETION: {
    label: "Certificate of Completion",
    purpose: "Official program completion certificate",
    src: "/images/certificates/certificate-of-completion.jpg",
    alt: "Elevate for Humanity certificate of completion"
  },
  HERO_HOME_TOP: {
    label: "Top Homepage Hero Banner",
    purpose: "Main homepage hero section with gradient background",
    src: "/images/homepage/hero-top-gradient.jpg",
    alt: "Elevate for Humanity hero banner with logo and slogan"
  },
  HERO_HOME_SECOND: {
    label: "2nd Homepage Hero Banner",
    purpose: "Second hero section showcasing program categories",
    src: "/images/homepage/hero-middle-programs.jpg",
    alt: "Elevate for Humanity program tiles for training and apprenticeships"
  },
  FOUNDER_BIO_SIDE: {
    label: "Founder Bio Side Image",
    purpose: "Photo of Founder at desk shown on bio page sidebar",
    src: "/images/founder/founder-elizabeth-greene-desk.jpg",
    alt: "Elizabeth Greene sitting at executive desk with computer"
  }
} as const;

export type EFHImageKey = keyof typeof EFH_IMAGES;
CONF

echo ">>> Image config created at src/config/homepage-images.ts"
echo ">>> NOW ADD THE REAL IMAGE FILES WITH THESE EXACT PATHS:"
echo "  public/images/certificates/certificate-of-completion.jpg"
echo "  public/images/homepage/hero-top-gradient.jpg"
echo "  public/images/homepage/hero-middle-programs.jpg"
echo "  public/images/founder/founder-elizabeth-greene-desk.jpg"
echo ">>> After uploading, rebuild the app."
