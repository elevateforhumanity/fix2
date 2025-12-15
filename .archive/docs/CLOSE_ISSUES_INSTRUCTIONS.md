# How to Close All Autopilot Issues

You have **860 open issues**, most are automated autopilot failures that are no longer relevant.

## Option 1: Use GitHub CLI (Recommended)

### Step 1: Authenticate
```bash
gh auth login
```
Follow the prompts to authenticate with your GitHub account.

### Step 2: Run the script
```bash
chmod +x scripts/close-autopilot-issues.sh
./scripts/close-autopilot-issues.sh
```

This will automatically close all issues with these labels:
- `autopilot`
- `auto-push`
- `auto-heal-failed`

## Option 2: Use GitHub Web Interface

### Bulk Close Issues
1. Go to: https://github.com/elevateforhumanity/fix2/issues
2. Click the checkbox at the top to select all 25 visible issues
3. Click "Mark as" → "Closed"
4. Repeat for each page until all autopilot issues are closed

### Filter and Close by Label
1. Go to: https://github.com/elevateforhumanity/fix2/issues
2. Click "Labels" → Select "autopilot"
3. Select all issues on the page
4. Click "Mark as" → "Closed"
5. Repeat for "auto-push" and "auto-heal-failed" labels

## Option 3: Manual Script (Copy/Paste)

If you can't use GitHub CLI, here's a manual approach:

1. Go to: https://github.com/elevateforhumanity/fix2/issues
2. Open browser console (F12)
3. Paste this JavaScript:

```javascript
// WARNING: This will close ALL open issues on the current page
// Make sure you're on the right filter first!

const closeButtons = document.querySelectorAll('[aria-label="Close issue"]');
closeButtons.forEach((btn, index) => {
  setTimeout(() => {
    btn.click();
    console.log(`Closed issue ${index + 1}/${closeButtons.length}`);
  }, index * 1000); // 1 second delay between each
});
```

## What Issues to Close

### ✅ Safe to Close (Automated/Old)
- All `autopilot` labeled issues
- All `auto-push` failures
- All `auto-heal-failed` issues
- Issues from November 2024 or earlier

### ⚠️ Keep Open (If Any)
- Recent issues (last 7 days)
- Issues with `priority-high` that aren't autopilot-related
- Issues with actual bug reports from users

## After Closing

Expected result:
- **Before:** 860 open issues
- **After:** ~10-20 open issues (real bugs/features)

## Why These Issues Exist

These are automated issues created by:
1. GitHub Actions autopilot workflows
2. Auto-push failures when builds failed
3. Auto-heal attempts that couldn't fix issues

**All of these are now resolved** because:
- ✅ Build is passing
- ✅ All code is committed
- ✅ Repository is clean
- ✅ Autopilot system deprecated

## Need Help?

If you get stuck, you can also:
1. Archive the entire repository and start fresh
2. Contact GitHub support to bulk close issues
3. Use GitHub's API with a personal access token

---

**Recommended:** Use Option 1 (GitHub CLI script) - it's the fastest and safest.
