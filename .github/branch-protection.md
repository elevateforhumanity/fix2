# Branch Protection Rules

## Current Setup
- **Only `main` branch exists**
- All development happens directly on `main`
- No feature branches

## To Prevent Auto-Branch Creation

### In GitHub:
1. Go to repository Settings
2. Click "Branches" in left sidebar
3. Under "Branch protection rules", click "Add rule"
4. Branch name pattern: `*` (all branches except main)
5. Enable: "Require pull request reviews before merging"
6. This prevents accidental branch creation

### In Vercel:
1. Go to Project Settings
2. Click "Git" 
3. Set Production Branch to: `main`
4. Disable "Automatic deployments" for other branches
5. Only deploy from `main`

## Working on Main Branch
All changes should be:
1. Made directly on `main`
2. Committed with clear messages
3. Pushed immediately to `origin/main`
4. Deployed automatically to Vercel

No feature branches needed for this project.
