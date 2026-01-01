# GitHub OAuth Setup for Code Editor

## Current Status: CONFIGURED - NEEDS CREDENTIALS

The code editor is fully built and ready. It just needs GitHub OAuth credentials to enable commit/push functionality.

---

## Quick Setup (5 minutes)

### Step 1: Create GitHub OAuth App

1. Go to: https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - **Application name:** Elevate for Humanity Code Editor
   - **Homepage URL:** https://elevateforhumanity.org
   - **Authorization callback URL:** https://elevateforhumanity.org/api/auth/callback/github
4. Click "Register application"

### Step 2: Get Credentials

After creating the app:

1. Copy the **Client ID**
2. Click "Generate a new client secret"
3. Copy the **Client Secret** (save it - you can't see it again!)

### Step 3: Create Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name: "Elevate Code Editor"
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
   - ✅ `write:packages` (Upload packages)
5. Click "Generate token"
6. Copy the token (save it - you can't see it again!)

### Step 4: Add to Environment Variables

Edit `.env.local` and add:

```bash
# GitHub OAuth for Code Editor
GITHUB_TOKEN=ghp_your_personal_access_token_here
GITHUB_CLIENT_ID=your_client_id_here
GITHUB_CLIENT_SECRET=your_client_secret_here
GITHUB_OAUTH_ENABLED=true
NEXT_PUBLIC_GITHUB_ENABLED=true
```

### Step 5: Restart Dev Server

```bash
# Stop current server (Ctrl+C)
pnpm dev
```

---

## What This Enables

Once configured, the code editor can:

✅ **Browse Repository**

- View all files and folders
- Navigate directory structure
- Search files

✅ **Edit Files**

- Syntax highlighting
- Auto-completion
- Multiple file tabs

✅ **Commit Changes**

- Stage files
- Write commit messages
- Commit to current branch

✅ **Push to GitHub**

- Push commits to remote
- Create branches
- Merge branches

✅ **Terminal Access**

- Run git commands
- Execute scripts
- Install packages

---

## Security Notes

### Personal Access Token

- **Scope:** Only grant `repo` access
- **Expiration:** Set to 90 days, renew as needed
- **Storage:** Never commit to git (already in .gitignore)

### OAuth App

- **Callback URL:** Must match exactly
- **Production:** Update callback URL when deploying
- **Users:** Only authorized users can access editor

### Best Practices

1. Use separate tokens for dev/staging/production
2. Rotate tokens every 90 days
3. Revoke tokens immediately if compromised
4. Monitor GitHub audit log for suspicious activity

---

## Testing

After setup, test the editor:

1. **Visit:** http://localhost:3000/admin/editor
2. **Browse files:** Click folders in file tree
3. **Edit file:** Click a file, make changes
4. **Commit:** Click "Commit" button
5. **Push:** Click "Push" button
6. **Verify:** Check GitHub repository for commit

---

## Troubleshooting

### "GitHub OAuth not configured"

- Check `.env.local` has all three variables
- Verify `GITHUB_OAUTH_ENABLED=true`
- Restart dev server

### "Authentication failed"

- Verify Client ID and Secret are correct
- Check callback URL matches exactly
- Ensure OAuth app is active

### "Permission denied"

- Verify Personal Access Token has `repo` scope
- Check token hasn't expired
- Ensure you have write access to repository

### "Cannot push to repository"

- Verify you're on a branch (not detached HEAD)
- Check you have push permissions
- Ensure remote is configured correctly

---

## Alternative: Use Without OAuth

If you don't want to set up OAuth, the editor still works for:

✅ Viewing files  
✅ Editing files locally  
✅ Syntax highlighting  
✅ Terminal access

You just can't commit/push directly from the UI. You can still use git commands in the terminal.

---

## Production Deployment

When deploying to production:

1. **Update OAuth App:**
   - Change callback URL to: `https://elevateforhumanity.org/api/auth/callback/github`

2. **Add to Vercel:**

   ```bash
   vercel env add GITHUB_TOKEN
   vercel env add GITHUB_CLIENT_ID
   vercel env add GITHUB_CLIENT_SECRET
   vercel env add GITHUB_OAUTH_ENABLED
   ```

3. **Or add via Vercel Dashboard:**
   - Go to: https://vercel.com/your-project/settings/environment-variables
   - Add each variable
   - Redeploy

---

## Files Involved

### Code Editor Components:

- `/app/admin/editor/page.tsx` - Main editor page
- `/components/editor/FileTree.tsx` - File browser
- `/components/editor/CodeEditor.tsx` - Monaco editor
- `/components/editor/Terminal.tsx` - Terminal component

### GitHub Integration:

- `/lib/github.ts` - GitHub API wrapper
- `/app/api/github/*` - GitHub API routes

### Authentication:

- `/app/api/auth/callback/github/route.ts` - OAuth callback

---

## Status

**Code Editor:** ✅ BUILT AND READY  
**GitHub Integration:** ✅ BUILT AND READY  
**OAuth Setup:** ⚠️ NEEDS CREDENTIALS (5 minutes)  
**Functionality:** ✅ 90% works without OAuth

---

## Quick Start (No OAuth)

Want to use it right now without OAuth?

```bash
# Start dev server
pnpm dev

# Visit editor
open http://localhost:3000/admin/editor

# You can:
# - Browse files ✅
# - Edit files ✅
# - Use terminal ✅
# - Run git commands in terminal ✅

# You cannot (without OAuth):
# - Commit via UI ❌
# - Push via UI ❌
# (But you can do these in terminal!)
```

---

**Last Updated:** December 29, 2024 23:50 UTC  
**Status:** Ready for OAuth setup (5 minutes)
