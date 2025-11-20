#!/bin/bash
# add-build-marker.sh - Adds a build marker to the homepage

set -e

# Generate timestamp-based marker
MARKER="v$(date +%Y-%m-%d-%H%M)"

echo "🏷️  Adding BUILD MARKER: $MARKER"

# Check if app/page.tsx exists
if [ ! -f "app/page.tsx" ]; then
  echo "❌ app/page.tsx not found"
  exit 1
fi

# Create the marker component
MARKER_CODE="      <p className=\"text-[10px] text-slate-400 mt-2 fixed bottom-2 right-2 bg-white/80 px-2 py-1 rounded\">
        BUILD MARKER: $MARKER
      </p>"

# Check if marker already exists
if grep -q "BUILD MARKER:" app/page.tsx; then
  echo "📝 Updating existing build marker..."
  # Use sed to replace the existing marker
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/BUILD MARKER: v[0-9-]*/BUILD MARKER: $MARKER/" app/page.tsx
  else
    # Linux
    sed -i "s/BUILD MARKER: v[0-9-]*/BUILD MARKER: $MARKER/" app/page.tsx
  fi
else
  echo "➕ Adding new build marker..."
  # Add marker before the last closing tag
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "/<\/main>/i\\
$MARKER_CODE
" app/page.tsx
  else
    # Linux
    sed -i "/<\/main>/i $MARKER_CODE" app/page.tsx
  fi
fi

echo "✅ Build marker added: $MARKER"
echo ""
echo "Next steps:"
echo "1. Review the change: git diff app/page.tsx"
echo "2. Deploy: pnpm deploy:prod"
echo "3. Check: https://fix2-gpql.vercel.app"
