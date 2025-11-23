#!/bin/bash

# Quick Fix Script for Missing Critical Assets
# This script creates symlinks/copies to make the site fully functional
# using existing assets that are already present.

set -e

echo "=========================================="
echo "Quick Fix: Missing Critical Assets"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -d "public/videos" ]; then
    echo -e "${RED}Error: Must run from project root directory${NC}"
    exit 1
fi

echo "This script will:"
echo "  1. Create 3 missing video files using existing videos"
echo "  2. Create missing training providers hero image"
echo "  3. Make the site fully functional"
echo ""
echo -e "${YELLOW}Press Enter to continue or Ctrl+C to cancel...${NC}"
read

echo ""
echo "=== Creating Missing Videos ==="
echo ""

# 1. Barber spotlight - use barber course video
if [ ! -f "public/videos/barber-spotlight.mp4" ]; then
    echo "Creating barber-spotlight.mp4..."
    cp public/videos/courses/barber-apprenticeship-10002417.mp4 public/videos/barber-spotlight.mp4
    echo -e "${GREEN}✅ Created barber-spotlight.mp4${NC}"
else
    echo -e "${YELLOW}⚠️  barber-spotlight.mp4 already exists${NC}"
fi

# 2. Elevate overview - use hero segment with narration
if [ ! -f "public/videos/elevate-overview.mp4" ]; then
    echo "Creating elevate-overview.mp4..."
    cp public/videos/hero-video-segment-with-narration.mp4 public/videos/elevate-overview.mp4
    echo -e "${GREEN}✅ Created elevate-overview.mp4${NC}"
else
    echo -e "${YELLOW}⚠️  elevate-overview.mp4 already exists${NC}"
fi

# 3. Employer pipeline - use employer section video with narration
if [ ! -f "public/videos/employer-pipeline.mp4" ]; then
    echo "Creating employer-pipeline.mp4..."
    cp public/videos/employer-section-video-with-narration.mp4 public/videos/employer-pipeline.mp4
    echo -e "${GREEN}✅ Created employer-pipeline.mp4${NC}"
else
    echo -e "${YELLOW}⚠️  employer-pipeline.mp4 already exists${NC}"
fi

echo ""
echo "=== Creating Missing Images ==="
echo ""

# 4. Training providers hero - use existing programs hero
if [ ! -f "public/images/hero/training-providers-hero.jpg" ]; then
    echo "Creating training-providers-hero.jpg..."
    mkdir -p public/images/hero
    cp public/media/hero/programs.jpg public/images/hero/training-providers-hero.jpg
    echo -e "${GREEN}✅ Created training-providers-hero.jpg${NC}"
else
    echo -e "${YELLOW}⚠️  training-providers-hero.jpg already exists${NC}"
fi

echo ""
echo "=== Verification ==="
echo ""

# Verify all critical files exist
all_good=true

check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅ $1${NC}"
    else
        echo -e "${RED}❌ $1${NC}"
        all_good=false
    fi
}

check_file "public/videos/barber-spotlight.mp4"
check_file "public/videos/elevate-overview.mp4"
check_file "public/videos/employer-pipeline.mp4"
check_file "public/images/hero/training-providers-hero.jpg"

echo ""
echo "=========================================="
if [ "$all_good" = true ]; then
    echo -e "${GREEN}✅ SUCCESS! All critical assets are now present.${NC}"
    echo ""
    echo "The site is now fully functional!"
    echo ""
    echo "Next steps:"
    echo "  1. Test the video pages: /videos/barber-spotlight"
    echo "  2. Test the video pages: /videos/elevate-overview"
    echo "  3. Test the video pages: /videos/employer-pipeline"
    echo "  4. Test training providers page: /training-providers"
    echo ""
    echo "Optional improvements:"
    echo "  - Create custom videos for better UX"
    echo "  - Create video thumbnail images"
    echo "  - Create twitter-card.png"
else
    echo -e "${RED}❌ Some files could not be created.${NC}"
    echo "Please check the errors above."
fi
echo "=========================================="
