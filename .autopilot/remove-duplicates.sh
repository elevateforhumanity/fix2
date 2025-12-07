#!/bin/bash
# Find and remove duplicate images to save 50-100 MB
# Safe removal - keeps one copy of each duplicate

set -e

echo "🔍 Finding duplicate images..."
echo "=========================================="
echo ""

# Get initial size
INITIAL_SIZE=$(du -sh public/ | cut -f1)
echo "📊 Initial public/ size: $INITIAL_SIZE"
echo ""

# Check if fdupes is installed
if ! command -v fdupes &> /dev/null; then
    echo "📦 Installing fdupes..."
    sudo apt-get update -qq
    sudo apt-get install -y fdupes
    echo ""
fi

# Find duplicates
echo "🔍 Scanning for duplicate images..."
echo ""

DUPLICATES=$(fdupes -r public/media-backup-20251128-043832/ 2>/dev/null | grep -v "^$" | wc -l)

if [ "$DUPLICATES" -eq 0 ]; then
    echo "✅ No duplicate images found!"
    echo "   Your repository is already optimized."
    exit 0
fi

echo "📊 Found duplicate image groups"
echo ""

# Show duplicates (for review)
echo "Duplicate files found:"
echo "----------------------------------------"
fdupes -r public/media-backup-20251128-043832/ 2>/dev/null | head -50
echo "----------------------------------------"
echo ""

# Ask for confirmation
echo "⚠️  This will delete duplicate files (keeping one copy of each)"
echo ""
read -p "Do you want to proceed? (y/N): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Cancelled. No files deleted."
    exit 0
fi

echo ""
echo "🗑️  Removing duplicates..."

# Remove duplicates (keep first occurrence)
fdupes -r -d -N public/media-backup-20251128-043832/ 2>/dev/null

echo ""

# Get final size
FINAL_SIZE=$(du -sh public/ | cut -f1)

echo "=========================================="
echo "✅ DUPLICATE REMOVAL COMPLETE!"
echo "=========================================="
echo ""
echo "📊 Results:"
echo "  - Initial size: $INITIAL_SIZE"
echo "  - Final size:   $FINAL_SIZE"
echo ""
echo "🎉 Duplicates removed!"
echo ""
