#!/bin/bash
# Complete deployment worker

echo "🚀 ELEVATE DEPLOYMENT WORKER"
echo "============================"
echo ""

# Step 1: Run migration
echo "Step 1: Run Supabase Migration"
echo "-------------------------------"
bash workers/run-migration.sh
echo ""
read -p "Press Enter after running migration in Supabase..."
echo ""

# Step 2: Test build
echo "Step 2: Testing Build"
echo "---------------------"
npm run build
echo ""

# Step 3: Deploy
echo "Step 3: Deploy to GitHub"
echo "------------------------"
git status
echo ""
read -p "Commit and push? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
  git add .
  git commit -m "feat: Complete autopilot - all pages updated"
  git push origin main
  echo "✅ Deployed!"
else
  echo "❌ Deployment cancelled"
fi
