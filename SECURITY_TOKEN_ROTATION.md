# 🚨 SECURITY: Rotate Vercel Token

## ⚠️ Token Exposed

The Vercel token `rISeRdxyBGMTAEKI71HR8GnZ` was exposed in logs/chat and should be considered **compromised**.

## ✅ How to Rotate

### 1. Revoke Old Token

1. Go to: https://vercel.com/account/tokens
2. Find the token (may be named or show last 4 chars)
3. Click "Delete" or "Revoke"
4. Confirm

### 2. Create New Token

1. Still on https://vercel.com/account/tokens
2. Click "Create Token"
3. Name it: `fix2-gpql-deployment`
4. Scope: Full Account (or specific to elevate team)
5. Expiration: Choose appropriate (90 days recommended)
6. Click "Create"
7. **Copy the token immediately** (you won't see it again)

### 3. Update Everywhere

Update the token in these locations:

#### A. GitHub Secrets (for CI/CD)

1. Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions
2. Find `VERCEL_TOKEN`
3. Click "Update"
4. Paste new token
5. Click "Update secret"

#### B. Gitpod Environment Variables

1. Go to: https://gitpod.io/user/variables
2. Find `VERCEL_TOKEN`
3. Update value with new token
4. Save

#### C. Local .env (if you have one)

```bash
# .env or .env.local
VERCEL_TOKEN=your_new_token_here
```

**Never commit this file!** (should be in .gitignore)

#### D. Any CI/CD Systems

If you use:
- GitHub Actions → Update secrets
- GitLab CI → Update variables
- CircleCI → Update environment variables
- Jenkins → Update credentials

### 4. Test New Token

```bash
export VERCEL_TOKEN="your_new_token_here"
./scripts/check-vercel-link.sh
```

Should show project info without errors.

## 🔒 Best Practices

1. **Never commit tokens** to git
2. **Use environment variables** for tokens
3. **Rotate tokens regularly** (every 90 days)
4. **Use scoped tokens** when possible (team-specific)
5. **Revoke immediately** if exposed
6. **Use GitHub Secrets** for CI/CD, not hardcoded values

## 📋 Checklist

- [ ] Revoke old token in Vercel
- [ ] Create new token in Vercel
- [ ] Update GitHub Secrets
- [ ] Update Gitpod variables
- [ ] Update local .env (if applicable)
- [ ] Test new token works
- [ ] Delete this file after rotation (or remove token value)

## ⚡ Quick Commands

```bash
# Check current link (requires VERCEL_TOKEN)
export VERCEL_TOKEN="your_new_token_here"
pnpm vercel:check

# Hard link to fix2-gpql
pnpm vercel:link

# Deploy safely
pnpm vercel:deploy
```

---

**After rotation, this token will no longer work and the security risk is eliminated.**
