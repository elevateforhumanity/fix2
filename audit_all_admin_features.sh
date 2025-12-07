#!/bin/bash
echo "=== COMPLETE ADMIN FEATURE AUDIT ==="
echo ""

# Check all admin pages
echo "Checking all admin pages..."
total=0
functional=0
placeholder=0

for file in $(find app/admin -name "page.tsx" -type f); do
    total=$((total + 1))
    feature=$(dirname $file | sed 's|app/admin/||')
    
    if grep -q "Discover more about" "$file" 2>/dev/null; then
        echo "❌ PLACEHOLDER: $feature"
        placeholder=$((placeholder + 1))
    else
        echo "✅ FUNCTIONAL: $feature"
        functional=$((functional + 1))
    fi
done

echo ""
echo "=== SUMMARY ==="
echo "Total admin pages: $total"
echo "Functional: $functional ($((functional * 100 / total))%)"
echo "Placeholders: $placeholder ($((placeholder * 100 / total))%)"
echo ""

echo "=== CRITICAL ADMIN FEATURES ==="
echo "Checking key features..."
for feature in students enrollments programs courses gradebook quiz-builder ai-course-builder course-builder videos reports analytics; do
    file="app/admin/$feature/page.tsx"
    if [ -f "$file" ]; then
        if grep -q "Discover more about" "$file" 2>/dev/null; then
            echo "❌ $feature - PLACEHOLDER"
        else
            echo "✅ $feature - FUNCTIONAL"
        fi
    else
        echo "⚠️  $feature - MISSING"
    fi
done
