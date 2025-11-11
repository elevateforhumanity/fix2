#!/bin/bash
# Fix ALL URLs to use Netlify URL instead of elevateforhumanity.org
# This removes the problematic www.elevateforhumanity.org redirect

set -e

NETLIFY_URL="https://elevateproduction.netlify.app"

echo "🔧 FIXING ALL URLs TO USE NETLIFY"
echo "=================================="
echo ""
echo "Changing all elevateforhumanity.org URLs to:"
echo "$NETLIFY_URL"
echo ""

# Fix SEO.jsx
echo "Fixing src/components/SEO.jsx..."
sed -i "s|https://elevateforhumanity.org|$NETLIFY_URL|g" src/components/SEO.jsx
echo "✅ Fixed SEO.jsx"

# Fix DynamicSEO.tsx
echo "Fixing src/components/DynamicSEO.tsx..."
sed -i "s|https://elevateforhumanity.org|$NETLIFY_URL|g" src/components/DynamicSEO.tsx
echo "✅ Fixed DynamicSEO.tsx"

# Fix lib/seo/SEO.jsx
echo "Fixing src/lib/seo/SEO.jsx..."
sed -i "s|https://elevateforhumanity.org|$NETLIFY_URL|g" src/lib/seo/SEO.jsx
echo "✅ Fixed lib/seo/SEO.jsx"

# Fix ProgramDetail.tsx
echo "Fixing src/pages/ProgramDetail.tsx..."
sed -i "s|https://elevateforhumanity.org|$NETLIFY_URL|g" src/pages/ProgramDetail.tsx
echo "✅ Fixed ProgramDetail.tsx"

# Fix Programs.tsx
echo "Fixing src/pages/Programs.tsx..."
sed -i "s|https://elevateforhumanity.org|$NETLIFY_URL|g" src/pages/Programs.tsx
echo "✅ Fixed Programs.tsx"

# Fix CourseLibrary.jsx
echo "Fixing src/pages/CourseLibrary.jsx..."
sed -i "s|https://elevateforhumanity.org|$NETLIFY_URL|g" src/pages/CourseLibrary.jsx
echo "✅ Fixed CourseLibrary.jsx"

# Fix SocialMediaManager.tsx
echo "Fixing src/pages/SocialMediaManager.tsx..."
sed -i "s|https://elevateforhumanity.org|$NETLIFY_URL|g" src/pages/SocialMediaManager.tsx
echo "✅ Fixed SocialMediaManager.tsx"

# Fix Ecosystem.jsx
echo "Fixing src/pages/Ecosystem.jsx..."
sed -i "s|https://www.elevateforhumanity.org|$NETLIFY_URL|g" src/pages/Ecosystem.jsx
echo "✅ Fixed Ecosystem.jsx"

# Fix DurableConsole.tsx
echo "Fixing src/pages/DurableConsole.tsx..."
sed -i "s|https://www.elevateforhumanity.org|$NETLIFY_URL|g" src/pages/DurableConsole.tsx
echo "✅ Fixed DurableConsole.tsx"

# Fix Partners.jsx
echo "Fixing src/pages/Partners.jsx..."
sed -i "s|https://elevateforhumanity.org|$NETLIFY_URL|g" src/pages/Partners.jsx
echo "✅ Fixed Partners.jsx"

# Fix utils/addCourseSchema.ts
echo "Fixing src/utils/addCourseSchema.ts..."
sed -i "s|https://elevateforhumanity.org|$NETLIFY_URL|g" src/utils/addCourseSchema.ts
echo "✅ Fixed addCourseSchema.ts"

# Fix api-client.js
echo "Fixing src/lib/api-client.js..."
sed -i "s|https://elevateforhumanity.org|$NETLIFY_URL|g" src/lib/api-client.js
echo "✅ Fixed api-client.js"

# Fix tracking-beacon.js
echo "Fixing src/watermark/tracking-beacon.js..."
sed -i "s|https://elevateforhumanity.org|$NETLIFY_URL|g" src/watermark/tracking-beacon.js
echo "✅ Fixed tracking-beacon.js"

echo ""
echo "=================================="
echo "✅ ALL URLs FIXED"
echo "=================================="
echo ""
echo "Changed all URLs from:"
echo "  https://elevateforhumanity.org"
echo "  https://www.elevateforhumanity.org"
echo ""
echo "To:"
echo "  $NETLIFY_URL"
echo ""
echo "Files modified:"
echo "  - src/components/SEO.jsx"
echo "  - src/components/DynamicSEO.tsx"
echo "  - src/lib/seo/SEO.jsx"
echo "  - src/pages/ProgramDetail.tsx"
echo "  - src/pages/Programs.tsx"
echo "  - src/pages/CourseLibrary.jsx"
echo "  - src/pages/SocialMediaManager.tsx"
echo "  - src/pages/Ecosystem.jsx"
echo "  - src/pages/DurableConsole.tsx"
echo "  - src/pages/Partners.jsx"
echo "  - src/utils/addCourseSchema.ts"
echo "  - src/lib/api-client.js"
echo "  - src/watermark/tracking-beacon.js"
echo ""
echo "Next: Rebuild and deploy"
