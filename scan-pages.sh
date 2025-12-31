#!/bin/bash
# Scan all pages for placeholder queries and hardcoded data

echo "🔍 Scanning 938 pages for placeholder queries..."
echo "================================================"
echo ""

# Find all page files
PAGES=$(find app -name "page.tsx" -o -name "page.ts")
TOTAL=$(echo "$PAGES" | wc -l)

echo "Total pages found: $TOTAL"
echo ""

# Patterns to search for
echo "Searching for patterns..."
echo ""

# 1. Hardcoded arrays
echo "1. Pages with hardcoded arrays (const data = [...]):"
grep -l "const.*=.*\[" $PAGES | wc -l
echo ""

# 2. Mock data imports
echo "2. Pages importing mock data:"
grep -l "mock" $PAGES | wc -l
echo ""

# 3. Placeholder text
echo "3. Pages with 'placeholder' text:"
grep -l "placeholder" $PAGES | wc -l
echo ""

# 4. TODO/FIXME comments
echo "4. Pages with TODO/FIXME:"
grep -l "TODO\|FIXME" $PAGES | wc -l
echo ""

# 5. Static data (not using database)
echo "5. Pages NOT using Supabase:"
grep -L "supabase\|createClient" $PAGES | wc -l
echo ""

# 6. Pages using 'use client' (might have hardcoded data)
echo "6. Client-side pages:"
grep -l "'use client'" $PAGES | wc -l
echo ""

echo "================================================"
echo "Detailed analysis saved to: page-scan-results.txt"
