#!/bin/bash
set -e

DEST="/workspaces/elevate-lms-clean"
ACTIVE_ROUTES="/tmp/active-routes.txt"

echo "🎯 CLONING ONLY ACTIVE WEBSITE CODE"
echo "===================================="
echo ""

# Step 1: Copy active pages only
echo "1️⃣  Copying active pages from sitemap..."
COPIED=0
SKIPPED=0

while IFS= read -r route; do
  # Convert route to file path
  if [ "$route" = "/" ]; then
    PAGE_PATH="app/page.tsx"
  else
    # Remove leading slash
    CLEAN_ROUTE="${route#/}"
    PAGE_PATH="app/${CLEAN_ROUTE}/page.tsx"
  fi
  
  # Check if page exists
  if [ -f "$PAGE_PATH" ]; then
    # Create directory structure
    mkdir -p "$DEST/$(dirname "$PAGE_PATH")"
    # Copy the page
    cp "$PAGE_PATH" "$DEST/$PAGE_PATH"
    ((COPIED++))
  else
    # Try other extensions
    for ext in page.ts page.jsx page.js; do
      ALT_PATH="app/${CLEAN_ROUTE}/${ext}"
      if [ -f "$ALT_PATH" ]; then
        mkdir -p "$DEST/$(dirname "$ALT_PATH")"
        cp "$ALT_PATH" "$DEST/$ALT_PATH"
        ((COPIED++))
        break
      fi
    done
  fi
done < "$ACTIVE_ROUTES"

echo "   ✅ Copied $COPIED active pages"
echo ""

# Step 2: Copy essential app files
echo "2️⃣  Copying essential app files..."
cp app/layout.tsx "$DEST/app/" 2>/dev/null || true
cp app/globals.css "$DEST/app/" 2>/dev/null || true
cp app/error.tsx "$DEST/app/" 2>/dev/null || true
cp app/not-found.tsx "$DEST/app/" 2>/dev/null || true
cp app/loading.tsx "$DEST/app/" 2>/dev/null || true
echo "   ✅ Essential app files"
echo ""

# Step 3: Copy ALL components (pages depend on them)
echo "3️⃣  Copying components..."
cp -r components "$DEST/"
echo "   ✅ components/"
echo ""

# Step 4: Copy lib
echo "4️⃣  Copying lib..."
cp -r lib "$DEST/"
echo "   ✅ lib/"
echo ""

# Step 5: Copy public assets
echo "5️⃣  Copying public assets..."
cp -r public "$DEST/"
echo "   ✅ public/"
echo ""

# Step 6: Copy configs
echo "6️⃣  Copying configuration..."
cp package.json "$DEST/"
cp tsconfig.json "$DEST/"
cp next.config.mjs "$DEST/" 2>/dev/null || cp next.config.ts "$DEST/" 2>/dev/null || true
cp tailwind.config.ts "$DEST/" 2>/dev/null || cp tailwind.config.js "$DEST/" 2>/dev/null || true
cp postcss.config.mjs "$DEST/" 2>/dev/null || cp postcss.config.js "$DEST/" 2>/dev/null || true
cp .env.example "$DEST/"
cp .gitignore "$DEST/"
echo "   ✅ Configs"
echo ""

# Step 7: Copy supporting directories
echo "7️⃣  Copying supporting directories..."
[ -d "supabase" ] && cp -r supabase "$DEST/" && echo "   ✅ supabase/"
[ -d "types" ] && cp -r types "$DEST/" && echo "   ✅ types/"
[ -d "hooks" ] && cp -r hooks "$DEST/" && echo "   ✅ hooks/"
[ -d "contexts" ] && cp -r contexts "$DEST/" && echo "   ✅ contexts/"
[ -d "utils" ] && cp -r utils "$DEST/" && echo "   ✅ utils/"
[ -d "styles" ] && cp -r styles "$DEST/" && echo "   ✅ styles/"
[ -d "config" ] && cp -r config "$DEST/" && echo "   ✅ config/"
[ -d "server" ] && cp -r server "$DEST/" && echo "   ✅ server/"
[ -d "lms-data" ] && cp -r lms-data "$DEST/" && echo "   ✅ lms-data/"
[ -d "branding" ] && cp -r branding "$DEST/" && echo "   ✅ branding/"
[ -d "scripts" ] && cp -r scripts "$DEST/" && echo "   ✅ scripts/"
echo ""

echo "📊 TRANSFER SUMMARY"
echo "==================="
echo "Active pages copied: $COPIED"
echo "Total files: $(find "$DEST" -type f ! -path "*/.git/*" | wc -l)"
echo ""
echo "✅ CLONE COMPLETE - Ready for sanitization"
