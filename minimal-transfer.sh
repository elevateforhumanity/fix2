#!/bin/bash
set -e

DEST="/workspaces/elevate-lms-clean"

echo "🎯 MINIMAL NEXT.JS TRANSFER"
echo "============================"
echo ""

# Core Next.js directories
echo "1️⃣  Core Next.js code..."
cp -r app "$DEST/"
cp -r components "$DEST/"
cp -r lib "$DEST/"
cp -r public "$DEST/"
echo "   ✅ app/, components/, lib/, public/"

# Config files
echo "2️⃣  Configuration files..."
cp package.json "$DEST/"
cp tsconfig.json "$DEST/"
cp next.config.mjs "$DEST/" 2>/dev/null || cp next.config.ts "$DEST/" 2>/dev/null || true
cp tailwind.config.ts "$DEST/" 2>/dev/null || cp tailwind.config.js "$DEST/" 2>/dev/null || true
cp postcss.config.mjs "$DEST/" 2>/dev/null || cp postcss.config.js "$DEST/" 2>/dev/null || true
cp .env.example "$DEST/"
cp .gitignore "$DEST/"
echo "   ✅ Configs"

# Supporting directories (only if they exist and are imported)
echo "3️⃣  Supporting directories..."
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
echo "✅ MINIMAL TRANSFER COMPLETE"
echo ""
echo "Files: $(find "$DEST" -type f ! -path "*/.git/*" | wc -l)"
