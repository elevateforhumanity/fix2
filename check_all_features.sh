#!/bin/bash
echo "=== CHECKING ALL FEATURES IN REPOSITORY ==="
echo ""

# Function to check if page is placeholder
check_page() {
    local file=$1
    if [ -f "$file" ]; then
        if grep -q "Discover more about" "$file" 2>/dev/null; then
            echo "❌ PLACEHOLDER"
        else
            echo "✅ FUNCTIONAL"
        fi
    else
        echo "⚠️  MISSING"
    fi
}

echo "STUDENT PORTAL FEATURES:"
echo "------------------------"
for feature in assignments grades discussions courses progress certificates badges calendar messages notifications; do
    printf "%-20s: " "$feature"
    check_page "app/portal/student/$feature/page.tsx"
done

echo ""
echo "ADMIN FEATURES:"
echo "---------------"
for feature in courses programs students enrollments gradebook quiz-builder ai-course-builder course-builder; do
    printf "%-20s: " "$feature"
    check_page "app/admin/$feature/page.tsx"
done

echo ""
echo "INSTRUCTOR FEATURES:"
echo "--------------------"
for feature in dashboard courses grades students; do
    printf "%-20s: " "$feature"
    check_page "app/portal/instructor/$feature/page.tsx"
done

echo ""
echo "PROGRAM HOLDER FEATURES:"
echo "------------------------"
for feature in dashboard students reports messages; do
    printf "%-20s: " "$feature"
    check_page "app/program-holder/$feature/page.tsx"
done

echo ""
echo "=== SUMMARY ==="
total_files=$(find app -name "page.tsx" | wc -l)
placeholder_files=$(find app -name "page.tsx" -exec grep -l "Discover more about" {} \; | wc -l)
functional_files=$((total_files - placeholder_files))

echo "Total pages: $total_files"
echo "Functional: $functional_files"
echo "Placeholders: $placeholder_files"
echo "Percentage functional: $((functional_files * 100 / total_files))%"
