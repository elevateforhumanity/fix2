# 🔧 Build Troubleshooting Guide

## ❌ Build Failed - Let's Fix It

### Step 1: Get the Error Details

Please share the error message from Vercel. Look for:

1. **In Vercel Dashboard**:
   - Go to: https://vercel.com/dashboard
   - Click on the failed deployment
   - Scroll to the error message
   - Copy the full error

2. **Common Error Patterns**:
   - TypeScript errors
   - Missing dependencies
   - Build timeout
   - Memory issues
   - Environment variable issues

### Step 2: Common Issues & Solutions

#### Issue 1: TypeScript Errors

**Error looks like:**
```
Type error: ...
```

**Solution:**
```bash
# Temporarily disable TypeScript errors
# In next.config.mjs, add:
typescript: {
  ignoreBuildErrors: true,
}
```

#### Issue 2: Missing Dependencies

**Error looks like:**
```
Module not found: Can't resolve '...'
```

**Solution:**
```bash
# Install missing dependency
npm install <package-name>
```

#### Issue 3: Build Timeout

**Error looks like:**
```
Error: Command "npm run build" timed out after 15m
```

**Solution:**
- Increase build timeout in Vercel settings
- Or optimize build process

#### Issue 4: Memory Issues

**Error looks like:**
```
JavaScript heap out of memory
```

**Solution:**
Already configured in package.json:
```json
"build": "NODE_OPTIONS=--max-old-space-size=4096 next build"
```

#### Issue 5: Environment Variables

**Error looks like:**
```
Error: Missing environment variable
```

**Solution:**
Check all required variables are set in Vercel:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- NEXTAUTH_SECRET
- NEXT_PUBLIC_SITE_URL

### Step 3: Quick Fixes

#### Fix 1: Ignore Build Errors Temporarily

Edit `next.config.mjs`:

```javascript
const nextConfig = {
  // ... existing config
  typescript: {
    ignoreBuildErrors: true,  // Add this
  },
  eslint: {
    ignoreDuringBuilds: true,  // Add this
  },
};
```

#### Fix 2: Check Middleware

If middleware is causing issues:

```bash
# Temporarily rename middleware
mv middleware.ts middleware.ts.backup

# Commit and push
git add .
git commit -m "Temporarily disable middleware"
git push
```

#### Fix 3: Simplify Admin Page

If admin page is too complex:

```bash
# Use simpler version
mv app/admin/page.tsx app/admin/page.tsx.backup
# Create simple version (see below)
```

### Step 4: Emergency Simple Admin Page

Create `app/admin/page.tsx`:

```typescript
export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-4">Dashboard is loading...</p>
    </div>
  );
}
```

### Step 5: Check Specific Files

Files that might cause issues:

1. **middleware.ts** - Complex logic
2. **app/admin/page.tsx** - Server components with data fetching
3. **lib/two-factor.ts** - Crypto operations
4. **lib/rateLimiter.ts** - Redis connections

### Step 6: Gradual Rollback

If nothing works, rollback to last working version:

```bash
# See recent commits
git log --oneline -10

# Rollback to specific commit
git reset --hard <commit-hash>

# Force push
git push --force origin main
```

### Step 7: Build Locally

Test the build locally:

```bash
# Set environment variables
export NEXT_PUBLIC_SUPABASE_URL="your-url"
export NEXT_PUBLIC_SUPABASE_ANON_KEY="your-key"
export SUPABASE_SERVICE_ROLE_KEY="your-key"
export NEXTAUTH_SECRET="your-secret"
export NEXT_PUBLIC_SITE_URL="https://www.elevateforhumanity.org"

# Run build
npm run build
```

## 🆘 Share the Error

Please share:

1. **Full error message** from Vercel logs
2. **Error type** (TypeScript, Runtime, Build, etc.)
3. **Which file** is causing the error
4. **Line number** if available

Then I can provide a specific fix!

## 📋 Quick Diagnostic Commands

```bash
# Check for syntax errors
npm run lint

# Check TypeScript
npm run type-check

# Test build locally
npm run build
```

## 🔄 Emergency Deployment

If you need to deploy quickly, use this minimal config:

1. **Disable middleware temporarily**
2. **Use simple admin page**
3. **Ignore TypeScript errors**
4. **Deploy**
5. **Fix issues gradually**

---

**Please share the error message and I'll provide a specific fix!** 🔧
