#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="/workspaces/fix2"
INCOMING_DIR="${ROOT_DIR}/_incoming-design"

echo "📁 Using incoming images from: ${INCOMING_DIR}"

# Make sure incoming exists
if [ ! -d "${INCOMING_DIR}" ]; then
  echo "❌ Incoming directory not found: ${INCOMING_DIR}"
  echo "Create it and put the 4 JPG files in there first."
  exit 1
fi

# Create target folders under Next.js public
mkdir -p "${ROOT_DIR}/public/images/certificates"
mkdir -p "${ROOT_DIR}/public/images/home"
mkdir -p "${ROOT_DIR}/public/images/bio"

echo "✅ Created image folders."

# Move / rename images into final locations
mv "${INCOMING_DIR}/certificate-completion-efh.jpg" \
   "${ROOT_DIR}/public/images/certificates/certificate-completion-efh.jpg"

mv "${INCOMING_DIR}/home-hero-gradient-efh.jpg" \
   "${ROOT_DIR}/public/images/home/home-hero-gradient-efh.jpg"

mv "${INCOMING_DIR}/home-hero-program-grid-efh.jpg" \
   "${ROOT_DIR}/public/images/home/home-hero-program-grid-efh.jpg"

mv "${INCOMING_DIR}/founder-elizabeth-greene-desk.jpg" \
   "${ROOT_DIR}/public/images/bio/founder-elizabeth-greene-desk.jpg"

echo "✅ Moved all images into /public."

# Create / update a JSON image registry so devs know what is what
mkdir -p "${ROOT_DIR}/content"

cat > "${ROOT_DIR}/content/site-images.json" << 'JSON'
{
  "certificateOfCompletion": {
    "label": "Certificate of Completion",
    "path": "/images/certificates/certificate-completion-efh.jpg",
    "usage": "Used on certificate generator pages and certificate previews."
  },
  "homeTopHeroBanner": {
    "label": "Top Homepage Hero Banner (Gradient)",
    "path": "/images/home/home-hero-gradient-efh.jpg",
    "usage": "Main hero section on the homepage with gradient background."
  },
  "homeSecondHeroBanner": {
    "label": "Second Homepage Hero Banner (Program Grid)",
    "path": "/images/home/home-hero-program-grid-efh.jpg",
    "usage": "Secondary hero section on the homepage showing program categories."
  },
  "founderBioPhoto": {
    "label": "Founder Bio Photo – Elizabeth L. Greene at Desk",
    "path": "/images/bio/founder-elizabeth-greene-desk.jpg",
    "usage": "Right-side image on the Founder bio page."
  }
}
JSON

echo "✅ Wrote content/site-images.json with labeled entries."

echo "🎉 All done. Commit public/images/* and content/site-images.json to Git."
