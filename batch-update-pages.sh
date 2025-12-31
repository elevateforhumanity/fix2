#!/bin/bash
# Batch Update Pages Script
# Updates pages from hardcoded data to database queries

set -e

echo "🔄 Batch Page Update Script"
echo "============================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BATCH_SIZE=10
LOG_FILE="batch-update-log.txt"
BACKUP_DIR=".page-backups"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Initialize log
echo "Batch Update Log - $(date)" > "$LOG_FILE"
echo "================================" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

# Function to backup a file
backup_file() {
  local file=$1
  local backup_path="$BACKUP_DIR/$(echo $file | tr '/' '_')"
  cp "$file" "$backup_path"
  echo "  📦 Backed up: $file" >> "$LOG_FILE"
}

# Function to check if page needs update
needs_update() {
  local file=$1
  
  # Check for hardcoded arrays
  if grep -q "const.*=.*\[" "$file"; then
    return 0
  fi
  
  # Check for mock imports
  if grep -q "mock" "$file"; then
    return 0
  fi
  
  # Check if NOT using Supabase
  if ! grep -q "supabase\|createClient" "$file"; then
    # But has data display patterns
    if grep -q "map\|forEach\|\.length" "$file"; then
      return 0
    fi
  fi
  
  return 1
}

# Function to update a page
update_page() {
  local file=$1
  local page_name=$(basename $(dirname $file))
  
  echo -e "${YELLOW}Updating: $file${NC}"
  
  # Backup first
  backup_file "$file"
  
  # Check what type of update is needed
  if grep -q "const.*courses.*=.*\[" "$file"; then
    echo "  → Detected hardcoded courses array"
    echo "  → Needs: Import from lib/queries/courses.ts"
  elif grep -q "const.*programs.*=.*\[" "$file"; then
    echo "  → Detected hardcoded programs array"
    echo "  → Needs: Import from lib/queries/programs.ts"
  elif grep -q "const.*students.*=.*\[" "$file"; then
    echo "  → Detected hardcoded students array"
    echo "  → Needs: Query profiles table"
  elif grep -q "const.*events.*=.*\[" "$file"; then
    echo "  → Detected hardcoded events array"
    echo "  → Needs: Create events query utility"
  else
    echo "  → Detected other hardcoded data"
    echo "  → Needs: Manual review"
  fi
  
  echo "  ✓ Analysis complete" >> "$LOG_FILE"
  echo "" >> "$LOG_FILE"
}

# High Priority Batch 1 (Student-facing pages)
BATCH_1=(
  "app/student/courses/page.tsx"
  "app/student/progress/page.tsx"
  "app/student/portfolio/page.tsx"
  "app/courses/page.tsx"
  "app/pathways/page.tsx"
  "app/compare/page.tsx"
  "app/program-finder/page.tsx"
  "app/schedule/page.tsx"
  "app/calendar/page.tsx"
  "app/events/page.tsx"
)

# High Priority Batch 2 (Staff pages)
BATCH_2=(
  "app/staff-portal/campaigns/page.tsx"
  "app/staff-portal/customer-service/page.tsx"
  "app/staff-portal/qa-checklist/page.tsx"
  "app/staff-portal/training/page.tsx"
  "app/staff-portal/processes/page.tsx"
  "app/admin/editor/page.tsx"
  "app/program-holder/compliance/page.tsx"
  "app/program-holder/documents/page.tsx"
  "app/program-holder/verification/page.tsx"
  "app/booking/page.tsx"
)

# High Priority Batch 3 (Partner/Employer pages)
BATCH_3=(
  "app/partner/dashboard/page.tsx"
  "app/partner/attendance/page.tsx"
  "app/employer/page.tsx"
  "app/employers/page.tsx"
  "app/hire-graduates/page.tsx"
  "app/workforce-partners/page.tsx"
  "app/agencies/page.tsx"
  "app/success-stories/page.tsx"
  "app/alumni/page.tsx"
  "app/team/page.tsx"
)

# Function to process a batch
process_batch() {
  local batch_num=$1
  shift
  local files=("$@")
  
  echo -e "${GREEN}Processing Batch $batch_num (${#files[@]} pages)${NC}"
  echo "========================================"
  echo ""
  
  echo "Batch $batch_num - $(date)" >> "$LOG_FILE"
  echo "-----------------------------------" >> "$LOG_FILE"
  
  local count=0
  local updated=0
  local skipped=0
  
  for file in "${files[@]}"; do
    count=$((count + 1))
    echo "[$count/${#files[@]}] Checking: $file"
    
    if [ -f "$file" ]; then
      if needs_update "$file"; then
        update_page "$file"
        updated=$((updated + 1))
      else
        echo "  ⏭️  Skipped (already using database)"
        skipped=$((skipped + 1))
      fi
    else
      echo -e "  ${RED}✗ File not found${NC}"
      echo "  ✗ File not found: $file" >> "$LOG_FILE"
    fi
    
    echo ""
  done
  
  echo "========================================"
  echo -e "${GREEN}Batch $batch_num Complete${NC}"
  echo "  Updated: $updated pages"
  echo "  Skipped: $skipped pages"
  echo "  Total: $count pages"
  echo ""
  
  echo "Summary: Updated $updated, Skipped $skipped" >> "$LOG_FILE"
  echo "" >> "$LOG_FILE"
}

# Main execution
echo "This script will analyze pages and suggest updates."
echo "It will NOT automatically modify files."
echo ""
echo "Available batches:"
echo "  1. High Priority Batch 1 (Student pages) - 10 pages"
echo "  2. High Priority Batch 2 (Staff pages) - 10 pages"
echo "  3. High Priority Batch 3 (Partner pages) - 10 pages"
echo "  all. Process all batches"
echo ""

read -p "Which batch to process? (1/2/3/all): " batch_choice

case $batch_choice in
  1)
    process_batch 1 "${BATCH_1[@]}"
    ;;
  2)
    process_batch 2 "${BATCH_2[@]}"
    ;;
  3)
    process_batch 3 "${BATCH_3[@]}"
    ;;
  all)
    process_batch 1 "${BATCH_1[@]}"
    process_batch 2 "${BATCH_2[@]}"
    process_batch 3 "${BATCH_3[@]}"
    ;;
  *)
    echo "Invalid choice. Exiting."
    exit 1
    ;;
esac

echo "========================================"
echo -e "${GREEN}✅ Analysis Complete${NC}"
echo ""
echo "Next steps:"
echo "1. Review log file: $LOG_FILE"
echo "2. Check backups in: $BACKUP_DIR/"
echo "3. Manually update pages based on analysis"
echo "4. Test each page after update"
echo "5. Run: pnpm type-check && pnpm build"
echo ""
echo "Backups are saved in case you need to revert."
echo ""
