#!/bin/bash
# Scan app code for database table references

OUTPUT="/workspaces/fix2/TABLE_USAGE_REPORT.txt"
echo "=== TABLE USAGE REPORT ===" > "$OUTPUT"
echo "Generated: $(date)" >> "$OUTPUT"
echo "" >> "$OUTPUT"

# Core LMS tables
TABLES=(
  "programs" "modules" "lessons" "courses" "course_modules"
  "enrollments" "lesson_progress" "module_progress"
  "applications" "profiles" "certificates"
  "products" "purchases" "payments"
  "ai_instructors" "ai_conversations"
)

for table in "${TABLES[@]}"; do
  echo "=== TABLE: $table ===" >> "$OUTPUT"
  count=$(grep -r "from.*['\"]$table['\"]" /workspaces/fix2/app /workspaces/fix2/lib /workspaces/fix2/components --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v node_modules | grep -v ".next" | wc -l)
  echo "References found: $count" >> "$OUTPUT"
  
  if [ $count -gt 0 ]; then
    echo "Files:" >> "$OUTPUT"
    grep -r "from.*['\"]$table['\"]" /workspaces/fix2/app /workspaces/fix2/lib /workspaces/fix2/components --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v node_modules | grep -v ".next" | cut -d: -f1 | sort -u >> "$OUTPUT"
  fi
  echo "" >> "$OUTPUT"
done

echo "=== SUMMARY ===" >> "$OUTPUT"
echo "Tables actively used in app code:" >> "$OUTPUT"
for table in "${TABLES[@]}"; do
  count=$(grep -r "from.*['\"]$table['\"]" /workspaces/fix2/app /workspaces/fix2/lib /workspaces/fix2/components --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v node_modules | grep -v ".next" | wc -l)
  if [ $count -gt 0 ]; then
    echo "  - $table ($count references)" >> "$OUTPUT"
  fi
done

echo "" >> "$OUTPUT"
echo "Tables NOT referenced in app code:" >> "$OUTPUT"
for table in "${TABLES[@]}"; do
  count=$(grep -r "from.*['\"]$table['\"]" /workspaces/fix2/app /workspaces/fix2/lib /workspaces/fix2/components --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v node_modules | grep -v ".next" | wc -l)
  if [ $count -eq 0 ]; then
    echo "  - $table" >> "$OUTPUT"
  fi
done

chmod +x /workspaces/fix2/scan_table_usage.sh
bash /workspaces/fix2/scan_table_usage.sh
cat /workspaces/fix2/TABLE_USAGE_REPORT.txt
