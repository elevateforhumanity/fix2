#!/bin/bash

echo "🧹 CLEARING ALL CACHES"
echo "======================"
echo ""

# Kill all Next.js processes
echo "1️⃣ Killing all Next.js processes..."
pkill -9 -f "next" 2>/dev/null || true
pkill -9 -f "node.*dev" 2>/dev/null || true
pkill -9 -f "node.*start" 2>/dev/null || true
sleep 2
echo "   ✅ Processes killed"

# Remove .next directory
echo "2️⃣ Removing .next build cache..."
rm -rf .next
echo "   ✅ .next removed"

# Remove node_modules/.cache
echo "3️⃣ Removing node_modules cache..."
rm -rf node_modules/.cache
echo "   ✅ node_modules/.cache removed"

# Remove Turbopack cache
echo "4️⃣ Removing Turbopack cache..."
rm -rf .turbo
echo "   ✅ .turbo removed"

# Remove Next.js cache
echo "5️⃣ Removing Next.js cache..."
rm -rf .next/cache
echo "   ✅ .next/cache removed"

# Remove standalone build
echo "6️⃣ Removing standalone build..."
rm -rf .next/standalone
echo "   ✅ standalone removed"

# Clear npm cache
echo "7️⃣ Clearing npm cache..."
npm cache clean --force 2>/dev/null || true
echo "   ✅ npm cache cleared"

# Remove lock files (optional - uncomment if needed)
# echo "8️⃣ Removing lock files..."
# rm -f package-lock.json
# echo "   ✅ Lock files removed"

echo ""
echo "✅ ALL CACHES CLEARED"
echo ""
echo "Next steps:"
echo "  1. npm install (if you removed lock files)"
echo "  2. npm run build"
echo "  3. npm start"
echo ""
