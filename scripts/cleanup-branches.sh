#!/usr/bin/env bash
set -euo pipefail

echo "🌿 Git Branch Cleanup"
echo "====================="
echo ""
echo "⚠️  This will delete:"
echo "  - All local branches except 'main'"
echo "  - Remote branches matching: deepsource*, feature*, fix*, test*"
echo ""

read -p "Continue? (y/N): " confirm

if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
  echo "❌ Cancelled"
  exit 1
fi

echo ""
echo "🧹 Step 1: Cleaning local branches..."
CURRENT_BRANCH=$(git branch --show-current)

if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "  ⚠️  You're on branch: $CURRENT_BRANCH"
  echo "  Switching to main..."
  git checkout main
fi

LOCAL_BRANCHES=$(git branch | grep -v "main" | grep -v "\*" | xargs)

if [ -z "$LOCAL_BRANCHES" ]; then
  echo "  ℹ️  No local branches to delete"
else
  echo "  Found local branches to delete:"
  git branch | grep -v "main" | grep -v "\*"
  
  git branch | grep -v "main" | grep -v "\*" | xargs -r git branch -D
  echo "  ✅ Local branches deleted"
fi

echo ""
echo "🧹 Step 2: Fetching and pruning remote..."
git fetch --prune

echo ""
echo "🧹 Step 3: Cleaning remote branches..."

# Get all remote branches
REMOTE_BRANCHES=$(git branch -r | grep -v "HEAD" | sed 's/origin\///' | grep -v "main")

if [ -z "$REMOTE_BRANCHES" ]; then
  echo "  ℹ️  No remote branches to clean"
else
  echo "  Found remote branches:"
  echo "$REMOTE_BRANCHES" | while read -r branch; do
    # Check if branch matches patterns to delete
    if [[ "$branch" == deepsource* ]] || \
       [[ "$branch" == feature* ]] || \
       [[ "$branch" == fix* ]] || \
       [[ "$branch" == test* ]] || \
       [[ "$branch" == temp* ]]; then
      echo "    🗑️  Deleting: $branch"
      git push origin --delete "$branch" 2>/dev/null || echo "      ⚠️  Could not delete (may not exist or no permission)"
    else
      echo "    ⏭️  Keeping: $branch"
    fi
  done
fi

echo ""
echo "✅ Branch cleanup complete!"
echo ""
echo "📊 Remaining branches:"
git branch -a
echo ""
