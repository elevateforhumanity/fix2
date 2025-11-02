#!/bin/bash
# Documentation Organization Script
# This script organizes the 200+ markdown files in the root directory

set -e

echo "📚 Documentation Organization Script"
echo "===================================="
echo ""

# Create directory structure
echo "Creating directory structure..."
mkdir -p docs/{setup,autopilot,deployment,api,archive/{audits,status-reports,historical}}

# Count files before
BEFORE_COUNT=$(ls -1 *.md 2>/dev/null | wc -l)
echo "Found $BEFORE_COUNT markdown files in root directory"
echo ""

# Function to move files matching pattern
move_files() {
    local pattern=$1
    local destination=$2
    local count=0
    
    for file in $pattern 2>/dev/null; do
        if [ -f "$file" ]; then
            mv "$file" "$destination/"
            ((count++))
        fi
    done
    
    if [ $count -gt 0 ]; then
        echo "  ✓ Moved $count files to $destination/"
    fi
}

# Move setup guides
echo "Moving setup guides..."
move_files "*SETUP*.md" "docs/setup"
move_files "*CONFIGURATION*.md" "docs/setup"
move_files "*INSTALL*.md" "docs/setup"
move_files "SUPABASE*.md" "docs/setup"
move_files "STRIPE*.md" "docs/setup"
move_files "NETLIFY*.md" "docs/setup"

# Move autopilot documentation
echo "Moving autopilot documentation..."
move_files "*AUTOPILOT*.md" "docs/autopilot"
move_files "*PUPPET*.md" "docs/autopilot"
move_files "*AUTONOMOUS*.md" "docs/autopilot"

# Move deployment guides
echo "Moving deployment guides..."
move_files "*DEPLOYMENT*.md" "docs/deployment"
move_files "*DEPLOY*.md" "docs/deployment"
move_files "GO_LIVE*.md" "docs/deployment"
move_files "PRODUCTION*.md" "docs/deployment"

# Move audit reports
echo "Moving audit reports..."
move_files "*AUDIT*.md" "docs/archive/audits"
move_files "*DIAGNOSTIC*.md" "docs/archive/audits"
move_files "*VERIFICATION*.md" "docs/archive/audits"

# Move status reports
echo "Moving status reports..."
move_files "*STATUS*.md" "docs/archive/status-reports"
move_files "*REPORT*.md" "docs/archive/status-reports"
move_files "*COMPLETE*.md" "docs/archive/status-reports"
move_files "*SUMMARY*.md" "docs/archive/status-reports"

# Move historical documentation
echo "Moving historical documentation..."
move_files "*FIX*.md" "docs/archive/historical"
move_files "*BRANCH*.md" "docs/archive/historical"
move_files "*CLEANUP*.md" "docs/archive/historical"

# Keep essential files in root
echo ""
echo "Keeping essential files in root:"
echo "  ✓ README.md"
echo "  ✓ CONTRIBUTING.md"
echo "  ✓ LICENSE"
echo "  ✓ CHANGELOG.md"

# Count files after
AFTER_COUNT=$(ls -1 *.md 2>/dev/null | wc -l)
MOVED_COUNT=$((BEFORE_COUNT - AFTER_COUNT))

echo ""
echo "===================================="
echo "✅ Organization complete!"
echo "   Moved: $MOVED_COUNT files"
echo "   Remaining in root: $AFTER_COUNT files"
echo ""
echo "New structure:"
tree -L 2 docs/ 2>/dev/null || find docs/ -type d

echo ""
echo "Note: Review the organized files and commit when ready"
echo "      git add docs/"
echo "      git commit -m 'Organize documentation files'"
