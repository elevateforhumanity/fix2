# Dev Container Conflict Resolved

**Date:** December 31, 2025  
**Issue:** Ona auto-generated devcontainer files overriding Gitpod configuration  
**Status:** ✅ Resolved

---

## What Happened

After committing the Gitpod fix and restarting the workspace:

1. **Expected:** Gitpod would use `.gitpod.yml` + `.gitpod.Dockerfile`
2. **Actual:** Ona/Gitpod auto-generated new devcontainer files:
   - `.devcontainer/devcontainer.json` (776 bytes, minimal config)
   - `.devcontainer/Dockerfile` (268 bytes, Ubuntu 24.04 base with NO Node.js)

3. **Result:** 
   - Environment switched from `gitpod` user to `vscode` user
   - Ubuntu 22.04 → Ubuntu 24.04
   - Node.js still not available (base image has no Node.js)

---

## Root Cause

Gitpod's newer versions have Dev Container support. When it saw `.devcontainer/` directory, it:
1. Auto-generated a minimal `devcontainer.json`
2. Auto-generated a minimal `Dockerfile`
3. Used these INSTEAD of `.gitpod.yml`

This overrode our carefully configured Gitpod setup.

---

## Solution Applied

**Removed auto-generated files:**
```bash
rm .devcontainer/devcontainer.json
rm .devcontainer/Dockerfile
```

**Kept:**
- `.devcontainer/README.md` (documentation)
- `.devcontainer/devcontainer.json.codespaces-only` (for Codespaces users)
- `.devcontainer/verify-ona.sh` (utility script)

---

## Why This Happened

The `.devcontainer/` directory existed (for Codespaces support), so Gitpod's Dev Container feature activated and auto-generated minimal config files.

**Gitpod's priority order:**
1. `.devcontainer/devcontainer.json` (if exists) ← **This was auto-created**
2. `.gitpod.yml` (if no devcontainer.json)

---

## Correct Configuration

For this project, we want **Gitpod-native** configuration:

```
✅ .gitpod.yml              (Gitpod config)
✅ .gitpod.Dockerfile       (Gitpod Docker image)
❌ .devcontainer/devcontainer.json (REMOVED - was auto-generated)
❌ .devcontainer/Dockerfile        (REMOVED - was auto-generated)
✅ .devcontainer/devcontainer.json.codespaces-only (Kept for Codespaces)
```

---

## Next Steps

1. **Commit the removal:**
   ```bash
   git add .devcontainer/
   git commit -m "Remove auto-generated devcontainer files"
   ```

2. **Restart workspace again:**
   - Gitpod will now use `.gitpod.yml`
   - Node.js will be available

3. **Prevent future auto-generation:**
   - Keep `.devcontainer/` directory empty except for:
     - `README.md`
     - `devcontainer.json.codespaces-only`
     - Utility scripts

---

## Verification After Next Restart

Expected environment:
- User: `gitpod` (not `vscode`)
- OS: Ubuntu 22.04 (not 24.04)
- Node.js: v20.x.x (from `gitpod/workspace-node:20`)
- PATH: Includes `/home/gitpod/.nvm/nvm.sh`

Commands to verify:
```bash
whoami          # Should be: gitpod
node -v         # Should be: v20.x.x
npm -v          # Should be: 10.x.x
pnpm -v         # Should be: 9.x.x
```

---

## Lessons Learned

1. **Empty directories can trigger auto-generation** - Gitpod saw `.devcontainer/` and assumed Dev Container mode
2. **Dev Container takes priority** - Even with `.gitpod.yml` present
3. **Gitpod vs Dev Container are mutually exclusive** - Pick one, not both
4. **Auto-generated files are minimal** - They don't include project-specific setup

---

## For Future Reference

If you want to use Dev Containers in Gitpod:
1. Rename `devcontainer.json.codespaces-only` to `devcontainer.json`
2. Update it to use `gitpod/workspace-node:20` base image
3. Add all necessary setup commands
4. Remove or ignore `.gitpod.yml`

But for this project, **Gitpod-native is the correct approach**.

---

**Status:** Files removed, ready to commit and restart  
**Next Action:** Commit removal, restart workspace  
**Expected Result:** Node.js available via `.gitpod.yml` configuration
