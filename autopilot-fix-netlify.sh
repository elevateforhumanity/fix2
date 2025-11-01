#!/bin/bash
set -e

echo "🤖 AUTOPILOT: Fixing Netlify Deployment Line by Line"
echo "=================================================="

# Step 1: Verify source files exist
echo ""
echo "📋 Step 1/10: Verifying source files..."
if [ ! -f "bridge/api/efh-config.json" ]; then
    echo "❌ bridge/api/efh-config.json not found"
    exit 1
fi
echo "✅ bridge/api/efh-config.json exists"

if [ ! -f "bridge/api/programs.json" ]; then
    echo "❌ bridge/api/programs.json not found"
    exit 1
fi
echo "✅ bridge/api/programs.json exists"

if [ ! -f "bridge/api/partnerships.json" ]; then
    echo "❌ bridge/api/partnerships.json not found"
    exit 1
fi
echo "✅ bridge/api/partnerships.json exists"

if [ ! -f "bridge/api/stats.json" ]; then
    echo "❌ bridge/api/stats.json not found"
    exit 1
fi
echo "✅ bridge/api/stats.json exists"

# Step 2: Validate JSON files
echo ""
echo "🔍 Step 2/10: Validating JSON files..."
for file in bridge/api/*.json; do
    if jq empty "$file" 2>/dev/null; then
        echo "✅ $(basename $file) is valid JSON"
    else
        echo "❌ $(basename $file) is invalid JSON"
        exit 1
    fi
done

# Step 3: Check programs count
echo ""
echo "📊 Step 3/10: Checking programs count..."
PROGRAMS_COUNT=$(jq '.programs | length' bridge/api/efh-config.json)
echo "Programs in efh-config.json: $PROGRAMS_COUNT"
if [ "$PROGRAMS_COUNT" -lt 7 ]; then
    echo "❌ Expected at least 7 programs, found $PROGRAMS_COUNT"
    exit 1
fi
echo "✅ Programs count is correct ($PROGRAMS_COUNT)"

# Step 4: Verify CPRS program exists
echo ""
echo "🏥 Step 4/10: Verifying CPRS program..."
if jq -e '.programs[] | select(.name | contains("CPRS"))' bridge/api/efh-config.json > /dev/null; then
    echo "✅ CPRS program found in config"
else
    echo "❌ CPRS program not found in config"
    exit 1
fi

# Step 5: Create public/api directory
echo ""
echo "📁 Step 5/10: Creating public/api directory..."
mkdir -p public/api
echo "✅ public/api directory created"

# Step 6: Copy bridge files to public
echo ""
echo "📋 Step 6/10: Copying bridge files to public..."
cp -v bridge/api/efh-config.json public/api/
cp -v bridge/api/programs.json public/api/
cp -v bridge/api/partnerships.json public/api/
cp -v bridge/api/stats.json public/api/
echo "✅ All files copied to public/api/"

# Step 7: Verify copied files
echo ""
echo "🔍 Step 7/10: Verifying copied files..."
for file in efh-config.json programs.json partnerships.json stats.json; do
    if [ -f "public/api/$file" ]; then
        echo "✅ public/api/$file exists"
    else
        echo "❌ public/api/$file missing"
        exit 1
    fi
done

# Step 8: Build the project
echo ""
echo "🔨 Step 8/10: Building project..."
echo "Running: pnpm build"
if pnpm build 2>&1 | tail -20; then
    echo "✅ Build completed successfully"
else
    echo "❌ Build failed"
    exit 1
fi

# Step 9: Verify dist/api files
echo ""
echo "🔍 Step 9/10: Verifying dist/api files..."
if [ ! -d "dist/api" ]; then
    echo "❌ dist/api directory not found"
    exit 1
fi
echo "✅ dist/api directory exists"

for file in efh-config.json programs.json partnerships.json stats.json; do
    if [ -f "dist/api/$file" ]; then
        SIZE=$(stat -f%z "dist/api/$file" 2>/dev/null || stat -c%s "dist/api/$file" 2>/dev/null)
        echo "✅ dist/api/$file exists (${SIZE} bytes)"
    else
        echo "❌ dist/api/$file missing"
        exit 1
    fi
done

# Step 10: Verify programs in dist
echo ""
echo "📊 Step 10/10: Verifying programs in dist..."
DIST_PROGRAMS=$(jq '.programs | length' dist/api/efh-config.json)
echo "Programs in dist/api/efh-config.json: $DIST_PROGRAMS"
if [ "$DIST_PROGRAMS" -ne "$PROGRAMS_COUNT" ]; then
    echo "❌ Program count mismatch: source=$PROGRAMS_COUNT, dist=$DIST_PROGRAMS"
    exit 1
fi
echo "✅ Program count matches ($DIST_PROGRAMS)"

# Final summary
echo ""
echo "=================================================="
echo "✅ AUTOPILOT: All checks passed!"
echo "=================================================="
echo ""
echo "📊 Summary:"
echo "  - Source files: ✅ Valid"
echo "  - JSON validation: ✅ Passed"
echo "  - Programs count: ✅ $PROGRAMS_COUNT"
echo "  - CPRS program: ✅ Found"
echo "  - Files copied: ✅ Complete"
echo "  - Build: ✅ Successful"
echo "  - Dist files: ✅ Verified"
echo ""
echo "🚀 Ready for deployment!"
echo ""
echo "Next steps:"
echo "  1. Deploy dist/ to Netlify"
echo "  2. Test endpoints:"
echo "     - https://elevateforhumanityfix2.netlify.app/api/efh-config.json"
echo "     - https://elevateforhumanityfix2.netlify.app/api/programs.json"
echo "     - https://elevateforhumanityfix2.netlify.app/api/partnerships.json"
echo "     - https://elevateforhumanityfix2.netlify.app/api/stats.json"
echo ""
