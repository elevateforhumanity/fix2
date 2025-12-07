#!/bin/bash
# Replace ALL Unsplash images with repository HD images
# Make site 100% ready to launch

set -e

echo "🚀 Starting complete image replacement..."
echo "=========================================="
echo ""

# Base path for repository images
BASE="/media-backup-20251128-043832"

# Program Pages - app/programs/page.tsx
echo "📝 Replacing program page images..."

# Healthcare Programs
sed -i "s|https://images.unsplash.com/photo-1559839734-2b71ea197ec2[^\"]*|${BASE}/programs/medical-hd.jpg|g" app/programs/page.tsx
sed -i "s|https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb[^\"]*|${BASE}/programs/healthcare-professional-1-hd.jpg|g" app/programs/page.tsx
sed -i "s|https://images.unsplash.com/photo-1631549916768-4119b2e5f926[^\"]*|${BASE}/programs/healthcare-professional-2-hd.jpg|g" app/programs/page.tsx
sed -i "s|https://images.unsplash.com/photo-1588776814546-1ffcf47267a5[^\"]*|${BASE}/programs/healthcare-hd.jpg|g" app/programs/page.tsx
sed -i "s|https://images.unsplash.com/photo-1576091160550-2173dba999ef[^\"]*|${BASE}/programs/cna-hd.jpg|g" app/programs/page.tsx
sed -i "s|https://images.unsplash.com/photo-1579684385127-1ef15d508118[^\"]*|${BASE}/programs/cpr-training-hd.jpg|g" app/programs/page.tsx

# IT & Technology
sed -i "s|https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b[^\"]*|${BASE}/programs/it-hd.jpg|g" app/programs/page.tsx
sed -i "s|https://images.unsplash.com/photo-1498050108023-c5249f4df085[^\"]*|${BASE}/programs/it-hd.jpg|g" app/programs/page.tsx
sed -i "s|https://images.unsplash.com/photo-1550751827-4bd374c3f58b[^\"]*|${BASE}/programs/it-hd.jpg|g" app/programs/page.tsx

# Skilled Trades
sed -i "s|https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122[^\"]*|${BASE}/programs/welding-hd.jpg|g" app/programs/page.tsx
sed -i "s|https://images.unsplash.com/photo-1581092160562-40aa08e78837[^\"]*|${BASE}/programs/hvac-hd.jpg|g" app/programs/page.tsx
sed -i "s|https://images.unsplash.com/photo-1581092918056-0c4c3acd3789[^\"]*|${BASE}/programs/plumbing.jpg|g" app/programs/page.tsx
sed -i "s|https://images.unsplash.com/photo-1621905251189-08b45d6a269e[^\"]*|${BASE}/programs/building-hd.jpg|g" app/programs/page.tsx
sed -i "s|https://images.unsplash.com/photo-1513828583688-c52646db42da[^\"]*|${BASE}/programs/building-hd.jpg|g" app/programs/page.tsx

# Transportation
sed -i "s|https://images.unsplash.com/photo-1601584115197-04ecc0da31d7[^\"]*|${BASE}/programs/cdl-hd.jpg|g" app/programs/page.tsx
sed -i "s|https://images.unsplash.com/photo-1519003722824-194d4455a60c[^\"]*|${BASE}/programs/cdl-hd.jpg|g" app/programs/page.tsx

# Beauty & Barber
sed -i "s|https://images.unsplash.com/photo-1560066984-138dadb4c035[^\"]*|${BASE}/programs/beauty-hd.jpg|g" app/programs/page.tsx
sed -i "s|https://images.unsplash.com/photo-1622287162716-f311baa1a2b8[^\"]*|${BASE}/programs/barber.jpg|g" app/programs/page.tsx
sed -i "s|https://images.unsplash.com/photo-1562322140-8baeececf3df[^\"]*|${BASE}/programs/beauty-hd.jpg|g" app/programs/page.tsx

# Culinary
sed -i "s|https://images.unsplash.com/photo-1556910103-1c02745aae4d[^\"]*|${BASE}/programs/culinary-hd.jpg|g" app/programs/page.tsx
sed -i "s|https://images.unsplash.com/photo-1577219491135-ce391730fb2c[^\"]*|${BASE}/programs/culinary-arts-hd.jpg|g" app/programs/page.tsx

# Business & Professional
sed -i "s|https://images.unsplash.com/photo-1554224155-8d04cb21cd6c[^\"]*|${BASE}/programs/tax-prep-hd.jpg|g" app/programs/page.tsx
sed -i "s|https://images.unsplash.com/photo-1450101499163-c8848c66ca85[^\"]*|${BASE}/programs/tax-prep-hd.jpg|g" app/programs/page.tsx
sed -i "s|https://images.unsplash.com/photo-1454165804606-c3d57bc86b40[^\"]*|${BASE}/programs/tax-prep-hd.jpg|g" app/programs/page.tsx

# Catch-all for any remaining Unsplash URLs in programs
sed -i "s|https://images.unsplash.com/photo-[^\"]*|${BASE}/programs/multi-training-programs.png|g" app/programs/page.tsx

echo "✅ Program pages complete"

# Individual Program Pages
echo "📝 Replacing individual program page images..."

# Barber Apprenticeship
if [ -f "app/programs/barber-apprenticeship/page.tsx" ]; then
  sed -i "s|https://images.unsplash.com/photo-[^\"]*|${BASE}/programs/barber.jpg|g" app/programs/barber-apprenticeship/page.tsx
fi

# CNA
if [ -f "app/programs/cna/page.tsx" ]; then
  sed -i "s|https://images.unsplash.com/photo-[^\"]*|${BASE}/programs/cna-hd.jpg|g" app/programs/cna/page.tsx
fi

# Dynamic program pages
if [ -f "app/programs/[slug]/page.tsx" ]; then
  sed -i "s|https://images.unsplash.com/photo-[^\"]*|${BASE}/programs/healthcare-hd.jpg|g" "app/programs/[slug]/page.tsx"
fi

echo "✅ Individual program pages complete"

# Marketing Pages
echo "📝 Replacing marketing page images..."

# About page
if [ -f "app/about/page.tsx" ]; then
  sed -i "s|https://images.unsplash.com/photo-[^\"]*|${BASE}/hero-elevate-learners.jpg|g" app/about/page.tsx
fi

# Employers page
if [ -f "app/employers/page.tsx" ]; then
  sed -i "s|https://images.unsplash.com/photo-[^\"]*|${BASE}/hero-slide-employers.jpg|g" app/employers/page.tsx
fi

# Students page
if [ -f "app/students/page.tsx" ]; then
  sed -i "s|https://images.unsplash.com/photo-[^\"]*|${BASE}/students-hero.jpg|g" app/students/page.tsx
fi

# Success Stories
if [ -f "app/success-stories/page.tsx" ]; then
  sed -i "s|https://images.unsplash.com/photo-[^\"]*|${BASE}/hero/hero-testimonial-2.jpg|g" app/success-stories/page.tsx
fi

# Blog
if [ -f "app/blog/page.tsx" ]; then
  sed -i "s|https://images.unsplash.com/photo-[^\"]*|${BASE}/hero/hero-blog-post-7.jpg|g" app/blog/page.tsx
fi

# Marketplace
if [ -f "app/marketplace/page.tsx" ]; then
  sed -i "s|https://images.unsplash.com/photo-[^\"]*|${BASE}/homepage-hero.jpg|g" app/marketplace/page.tsx
fi

# Apply page
if [ -f "app/apply/page.tsx" ]; then
  sed -i "s|https://images.unsplash.com/photo-[^\"]*|${BASE}/hero-elevate-learners.jpg|g" app/apply/page.tsx
fi

# WIOA Eligibility
if [ -f "app/wioa-eligibility/page.tsx" ]; then
  sed -i "s|https://images.unsplash.com/photo-[^\"]*|${BASE}/state-funding-hero.jpg|g" app/wioa-eligibility/page.tsx
fi

# Approvals
if [ -f "app/approvals/page.tsx" ]; then
  sed -i "s|https://images.unsplash.com/photo-[^\"]*|${BASE}/homepage-hero.jpg|g" app/approvals/page.tsx
fi

echo "✅ Marketing pages complete"

# LMS/Portal Pages
echo "📝 Replacing LMS/portal page images..."

# Instructor Skills Tracking
if [ -f "app/portal/instructor/skills-tracking-nail/page.tsx" ]; then
  sed -i "s|https://images.unsplash.com/photo-[^\"]*|${BASE}/programs/beauty-hd.jpg|g" app/portal/instructor/skills-tracking-nail/page.tsx
fi

if [ -f "app/portal/instructor/skills-tracking-esthetician/page.tsx" ]; then
  sed -i "s|https://images.unsplash.com/photo-[^\"]*|${BASE}/programs/beauty-hd.jpg|g" app/portal/instructor/skills-tracking-esthetician/page.tsx
fi

echo "✅ LMS/portal pages complete"

# Layout (if any)
if [ -f "app/layout.tsx" ]; then
  sed -i "s|https://images.unsplash.com/photo-[^\"]*|${BASE}/homepage-hero.jpg|g" app/layout.tsx
fi

echo ""
echo "=========================================="
echo "✅ ALL IMAGES REPLACED!"
echo "=========================================="
echo ""

# Count remaining Unsplash references
REMAINING=$(grep -r "unsplash.com" app --include="*.tsx" --include="*.ts" 2>/dev/null | wc -l || echo "0")

echo "📊 Results:"
echo "  - Unsplash URLs remaining: $REMAINING"
echo ""

if [ "$REMAINING" -eq 0 ]; then
  echo "🎉 SUCCESS! All Unsplash images replaced!"
  echo "🚀 Site is 100% ready to launch!"
else
  echo "⚠️  Warning: $REMAINING Unsplash references still found"
  echo "   Run: grep -r 'unsplash.com' app --include='*.tsx' -l"
  echo "   to see which files still need attention"
fi

echo ""
echo "Next steps:"
echo "  1. Test site: npm run dev"
echo "  2. Verify images load"
echo "  3. Commit changes: git add . && git commit -m 'Replace all Unsplash images with HD repository images'"
echo "  4. Deploy: git push"
echo ""
