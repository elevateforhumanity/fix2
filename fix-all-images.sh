#!/bin/bash

# Fix all images and remove emojis site-wide
echo "🔧 Fixing all images and removing emojis..."

# Find all TSX files with unoptimized
echo "📝 Finding files with unoptimized images..."
find app -name "*.tsx" -type f -exec grep -l "unoptimized" {} \; > /tmp/unoptimized-files.txt

# Count files
FILE_COUNT=$(wc -l < /tmp/unoptimized-files.txt)
echo "Found $FILE_COUNT files with unoptimized images"

# Find all files with emojis
echo "📝 Finding files with emojis..."
find app -name "*.tsx" -type f -exec grep -l "[🎯📊💼🎓📝✨🚀💡🔥⚡🌟💪🎉🏆📈🎨🔔📱💻🌐🔒✅❌⚠️]" {} \; > /tmp/emoji-files.txt

EMOJI_COUNT=$(wc -l < /tmp/emoji-files.txt)
echo "Found $EMOJI_COUNT files with emojis"

# Show files that need fixing
echo ""
echo "Files with unoptimized images:"
cat /tmp/unoptimized-files.txt

echo ""
echo "Files with emojis:"
cat /tmp/emoji-files.txt

echo ""
echo "✅ Analysis complete. Ready to fix."
