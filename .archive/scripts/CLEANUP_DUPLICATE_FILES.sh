#!/bin/bash

# Cleanup Duplicate Page Files
# Removes old/new/previous versions of pages

echo "🧹 Cleaning up duplicate page files..."
echo "======================================"

# Create backup first
BACKUP_DIR=".backup-pages-$(date +%Y%m%d-%H%M%S)"
echo "📁 Creating backup at: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

# Find all duplicate files
DUPLICATES=$(find app -name "page-old*.tsx" -o -name "page-new*.tsx" -o -name "page-previous*.tsx")

if [ -z "$DUPLICATES" ]; then
    echo "✅ No duplicate files found!"
    exit 0
fi

COUNT=$(echo "$DUPLICATES" | wc -l)
echo "Found $COUNT duplicate files"
echo ""

# List files to be removed
echo "Files to be removed:"
echo "$DUPLICATES"
echo ""

# Ask for confirmation
read -p "Do you want to proceed? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Cancelled"
    exit 1
fi

# Backup and remove
while IFS= read -r file; do
    if [ -f "$file" ]; then
        echo "Removing: $file"
        # Backup
        cp "$file" "$BACKUP_DIR/"
        # Remove
        rm "$file"
    fi
done <<< "$DUPLICATES"

echo ""
echo "======================================"
echo "✅ Cleanup complete!"
echo "📦 Backup saved to: $BACKUP_DIR"
echo ""
echo "To restore files if needed:"
echo "  cp $BACKUP_DIR/* app/"
