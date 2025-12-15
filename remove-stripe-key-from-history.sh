#!/bin/bash

# Remove Stripe Key from Git History
# WARNING: This rewrites git history - use with caution!

set -e

echo "🔒 Remove Stripe Key from Git History"
echo "======================================"
echo ""
echo "⚠️  WARNING: This will rewrite git history!"
echo "⚠️  All team members will need to re-clone the repository!"
echo ""
read -p "Are you sure you want to continue? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo "Aborted."
    exit 1
fi

echo ""
echo "📋 Creating backup..."
BACKUP_BRANCH="backup-before-history-rewrite-$(date +%Y%m%d-%H%M%S)"
git branch "$BACKUP_BRANCH"
echo "✅ Backup created: $BACKUP_BRANCH"
echo ""

echo "🔍 Finding commits with Stripe key..."
STRIPE_KEY="pk_live_51RvqjzIRNf5vPH3A"

# Count commits
COMMIT_COUNT=$(git log --all -S "$STRIPE_KEY" --oneline | wc -l)
echo "Found $COMMIT_COUNT commits containing the key"
echo ""

if [ "$COMMIT_COUNT" -eq 0 ]; then
    echo "✅ No commits found with the Stripe key!"
    echo "Key has already been removed from history."
    exit 0
fi

echo "🔧 Removing key from git history..."
echo "This may take a few minutes..."
echo ""

# Use git filter-repo (recommended) or filter-branch (fallback)
if command -v git-filter-repo &> /dev/null; then
    echo "Using git-filter-repo (recommended method)..."
    
    # Create expressions file
    cat > /tmp/stripe-key-expressions.txt << EOF
regex:pk_live_51RvqjzIRNf5vPH3ABuHQofarfuWw0PW5ww9eTwkj21A6VLJaLopuYbPdpAFCTU10O5uLgGHeCTBEcu9xeM8ErbFy004j2KPoSx==>STRIPE_KEY_REMOVED
EOF
    
    git filter-repo --replace-text /tmp/stripe-key-expressions.txt --force
    rm /tmp/stripe-key-expressions.txt
    
else
    echo "git-filter-repo not found, using git filter-branch (slower)..."
    echo ""
    
    git filter-branch --force --index-filter \
        "git ls-files -z | xargs -0 sed -i 's/pk_live_51RvqjzIRNf5vPH3ABuHQofarfuWw0PW5ww9eTwkj21A6VLJaLopuYbPdpAFCTU10O5uLgGHeCTBEcu9xeM8ErbFy004j2KPoSx/STRIPE_KEY_REMOVED/g' 2>/dev/null || true" \
        --prune-empty --tag-name-filter cat -- --all
    
    # Clean up
    rm -rf .git/refs/original/
    git reflog expire --expire=now --all
    git gc --prune=now --aggressive
fi

echo ""
echo "✅ Key removed from git history!"
echo ""

echo "🔍 Verifying removal..."
REMAINING=$(git log --all -S "$STRIPE_KEY" --oneline | wc -l)

if [ "$REMAINING" -eq 0 ]; then
    echo "✅ Verification passed! Key not found in history."
else
    echo "⚠️  Warning: Found $REMAINING commits still containing the key"
    echo "You may need to run this script again or manually review."
fi

echo ""
echo "📊 Summary"
echo "=========="
echo "Backup branch: $BACKUP_BRANCH"
echo "Commits processed: $COMMIT_COUNT"
echo "Remaining references: $REMAINING"
echo ""

echo "⚠️  IMPORTANT NEXT STEPS:"
echo ""
echo "1. Force push to remote (this will rewrite remote history):"
echo "   git push origin --force --all"
echo "   git push origin --force --tags"
echo ""
echo "2. Notify all team members to:"
echo "   - Save their local changes"
echo "   - Delete their local repository"
echo "   - Re-clone from remote"
echo ""
echo "3. If you need to restore, use the backup branch:"
echo "   git checkout $BACKUP_BRANCH"
echo ""

read -p "Do you want to force push now? (yes/no): " PUSH_CONFIRM

if [ "$PUSH_CONFIRM" = "yes" ]; then
    echo ""
    echo "🚀 Force pushing to remote..."
    git push origin --force --all
    git push origin --force --tags
    echo "✅ Pushed to remote!"
else
    echo ""
    echo "⚠️  Remember to force push when ready:"
    echo "   git push origin --force --all"
fi

echo ""
echo "🎉 Done!"
