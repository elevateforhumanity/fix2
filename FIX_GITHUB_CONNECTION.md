# Fix GitHub Connection to Correct Vercel Project

## 🚨 THE PROBLEM

GitHub is connected to the **WRONG** Vercel project:
- ❌ GitHub pushes deploy to: `fix2` (wrong, gets recreated)
- ✅ GitHub should deploy to: `fix2-gpql` (correct, has your domain)

This is why:
- New deployments don't show on www.elevateforhumanity.org
- The CLI keeps creating a new `fix2` project
- You see deployments in the wrong project

## ✅ THE FIX (5 Minutes)

### Step 1: Disconnect GitHub from Wrong Project

If `fix2` project exists:

1. Go to: https://vercel.com/elevate-48e460c9/fix2/settings/git
2. Under "Connected Git Repository"
3. Click "Disconnect" or "Remove"
4. Confirm

### Step 2: Connect GitHub to Correct Project

1. Go to: https://vercel.com/elevate-48e460c9/fix2-gpql/settings/git

2. Under "Connected Git Repository":
   - Click "Connect Git Repository"
   - Select: **GitHub**
   - Choose repository: **elevateforhumanity/fix2**
   - Click "Connect"

3. Configure:
   - Production Branch: **main**
   - Leave other settings as default
   - Click "Save"

### Step 3: Delete the Wrong Project

1. Go to: https://vercel.com/elevate-48e460c9/fix2/settings

2. Scroll to bottom → "Delete Project"

3. Type the project name to confirm

4. Click "Delete"

### Step 4: Verify

1. Push a small change to GitHub:
   ```bash
   git commit --allow-empty -m "Test deployment"
   git push origin main
   ```

2. Check deployments appear in:
   - ✅ https://vercel.com/elevate-48e460c9/fix2-gpql/deployments
   - ❌ NOT in fix2 (should be deleted)

3. Check the domain updates:
   - ✅ https://www.elevateforhumanity.org

## 🎯 After This Fix

**Every time you push to GitHub:**
- ✅ Deploys to `fix2-gpql`
- ✅ Updates www.elevateforhumanity.org
- ✅ No more wrong project creation
- ✅ Build markers will show

## 📋 Quick Checklist

- [ ] Disconnect GitHub from `fix2` project (if exists)
- [ ] Connect GitHub to `fix2-gpql` project
- [ ] Set production branch to `main`
- [ ] Delete `fix2` project
- [ ] Test with empty commit
- [ ] Verify deployment shows in fix2-gpql
- [ ] Check www.elevateforhumanity.org updates

## 🔍 How to Verify It's Fixed

After connecting GitHub to fix2-gpql:

```bash
# Make a test change
echo "# Test" >> README.md
git add README.md
git commit -m "Test: Verify GitHub deploys to fix2-gpql"
git push origin main
```

Then check:
1. Vercel dashboard shows new deployment in **fix2-gpql**
2. www.elevateforhumanity.org updates with new content
3. No new `fix2` project is created

## ⚠️ Common Mistakes

1. **Connecting to wrong repository** - Make sure it's `elevateforhumanity/fix2`
2. **Wrong production branch** - Should be `main` not `master`
3. **Forgetting to delete old project** - Delete `fix2` after disconnecting
4. **Not saving settings** - Click "Save" after connecting

## 🎉 Success Criteria

You'll know it's fixed when:
- ✅ GitHub pushes trigger deployments in fix2-gpql
- ✅ www.elevateforhumanity.org updates automatically
- ✅ No more `fix2` project appearing
- ✅ Build markers show on the live site
