#!/bin/bash

# Script to disable autopilot workflows across all Elevate for Humanity repositories
# This script should be run by someone with access to all repositories

set -e

echo "🔧 Disabling Autopilot Workflows Across All Repositories"
echo "=========================================================="
echo ""

# List of repositories to process
REPOS=(
  "ecosystem2"
  "ecosystem3"
  "ecosystem-5"
  "new-ecosysstem"
  "new2"
  "tiny-new"
)

GITHUB_ORG="elevateforhumanity"
TEMP_DIR="/tmp/elevate-disable-autopilot"

# Create temp directory
mkdir -p "$TEMP_DIR"

for REPO in "${REPOS[@]}"; do
  echo "📦 Processing repository: $REPO"
  echo "-----------------------------------"
  
  REPO_DIR="$TEMP_DIR/$REPO"
  
  # Clone repository if not already cloned
  if [ ! -d "$REPO_DIR" ]; then
    echo "  Cloning $GITHUB_ORG/$REPO..."
    git clone "https://github.com/$GITHUB_ORG/$REPO.git" "$REPO_DIR" 2>/dev/null || {
      echo "  ❌ Failed to clone $REPO (may not exist or no access)"
      continue
    }
  fi
  
  cd "$REPO_DIR"
  
  # Check if .github/workflows exists
  if [ ! -d ".github/workflows" ]; then
    echo "  ℹ️  No workflows directory found"
    cd - > /dev/null
    continue
  fi
  
  # Create disabled directory if it doesn't exist
  mkdir -p ".github/workflows/disabled"
  
  # Find and disable scheduled workflows
  DISABLED_COUNT=0
  
  for workflow in .github/workflows/*.yml .github/workflows/*.yaml; do
    [ -f "$workflow" ] || continue
    
    # Check if workflow has a schedule trigger
    if grep -q "schedule:" "$workflow"; then
      WORKFLOW_NAME=$(basename "$workflow")
      echo "  🔴 Disabling scheduled workflow: $WORKFLOW_NAME"
      
      # Move to disabled folder
      git mv "$workflow" ".github/workflows/disabled/$WORKFLOW_NAME" 2>/dev/null || {
        mv "$workflow" ".github/workflows/disabled/$WORKFLOW_NAME"
        git add ".github/workflows/disabled/$WORKFLOW_NAME"
      }
      
      DISABLED_COUNT=$((DISABLED_COUNT + 1))
    fi
  done
  
  if [ $DISABLED_COUNT -gt 0 ]; then
    echo "  ✅ Disabled $DISABLED_COUNT workflow(s)"
    
    # Commit changes
    git add .github/workflows/
    git commit -m "DISABLE scheduled workflows: Stop autopilot cron jobs

- Moved $DISABLED_COUNT scheduled workflow(s) to disabled/ folder
- Prevents automated runs that could interfere with manual work
- Part of focus shift to fix2 repository deployment

Co-authored-by: Ona <no-reply@ona.com>" || echo "  ℹ️  No changes to commit"
    
    # Ask user if they want to push
    echo ""
    read -p "  Push changes to $REPO? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      git push origin main || git push origin master || echo "  ⚠️  Failed to push (check branch name)"
      echo "  ✅ Changes pushed"
    else
      echo "  ℹ️  Changes not pushed (you can push manually later)"
    fi
  else
    echo "  ✅ No scheduled workflows found"
  fi
  
  echo ""
  cd - > /dev/null
done

echo "=========================================================="
echo "✅ Autopilot workflow disabling complete!"
echo ""
echo "Summary:"
echo "  - Processed ${#REPOS[@]} repositories"
echo "  - Scheduled workflows moved to .github/workflows/disabled/"
echo "  - Manual workflows remain active"
echo ""
echo "Next steps:"
echo "  1. Verify changes in each repository"
echo "  2. Push any uncommitted changes"
echo "  3. Focus on deploying fix2 repository"
echo ""
