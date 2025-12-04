# TypeScript Memory Issues - Solutions

## Problem
TypeScript type checking runs out of memory during `next build`, causing builds to fail with:
```
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
```

## Why It Happens

### 1. Large Codebase
- **643 routes** in this project
- Extensive type definitions across multiple domains
- Complex component hierarchies
- Multiple third-party integrations (Supabase, Stripe, OpenAI, etc.)

### 2. TypeScript's Memory Usage
- Must parse all `.ts` and `.tsx` files
- Builds complete type graph for entire codebase
- Stores all types in memory simultaneously
- Single-threaded process (can't distribute load)

### 3. Next.js Build Process
1. **Compilation** (Turbopack) - Fast, low memory
2. **Type Checking** (TypeScript) - Slow, high memory ⚠️
3. **Static Generation** - Moderate memory

## Current Configuration

### Memory Limit
```json
// package.json
"build": "NODE_OPTIONS=--max-old-space-size=4096 next build"
```
- Default Node.js: ~512MB
- Current setting: 4096MB (4GB)
- Maximum recommended: 8192MB (8GB)

### TypeScript Config
```json
// next.config.mjs
typescript: {
  ignoreBuildErrors: false  // ✅ Correct - catches errors
}
```

## Solutions (Ranked by Effectiveness)

### ✅ Solution 1: Increase Memory Limit (Already Applied)
**Status**: Currently using 4GB

**Increase to 8GB if needed:**
```json
// package.json
"build": "NODE_OPTIONS=--max-old-space-size=8192 next build"
```

**Pros:**
- Simple one-line change
- Catches all type errors
- No workflow changes

**Cons:**
- Requires more RAM on build server
- Doesn't solve root cause
- May still fail on very large projects

### ✅ Solution 2: Optimize tsconfig.json
**Reduce type checking scope:**

```json
// tsconfig.json
{
  "compilerOptions": {
    "incremental": true,           // ✅ Enable incremental builds
    "skipLibCheck": true,          // ✅ Skip checking node_modules types
    "skipDefaultLibCheck": true,   // Skip default lib checks
  },
  "exclude": [
    "node_modules",
    ".next",
    "out",
    "dist",
    "build",
    "**/*.spec.ts",
    "**/*.test.ts",
    "**/*.stories.tsx",
    "e2e/**/*",
    "tests/**/*",
    "__tests__/**/*"
  ]
}
```

**Impact:**
- Reduces memory by 30-50%
- Faster builds
- Still catches your code's type errors

### ✅ Solution 3: Split Type Checking (Recommended for CI/CD)
**Separate type checking from build:**

```json
// package.json
{
  "scripts": {
    "build": "next build",                    // No type checking
    "typecheck": "tsc --noEmit",              // Separate type check
    "build:safe": "pnpm typecheck && pnpm build"  // Full check
  }
}
```

**CI/CD Workflow:**
```yaml
# .github/workflows/deploy.yml
- name: Type Check
  run: pnpm typecheck
  
- name: Build
  run: pnpm build
  env:
    NODE_OPTIONS: --max-old-space-size=8192
```

**Pros:**
- Type checking can fail fast (before expensive build)
- Build process is faster
- Can run type checking in parallel with tests

**Cons:**
- Requires workflow changes
- Two separate commands

### ⚠️ Solution 4: Project References (Advanced)
**Split project into smaller type-checked units:**

```json
// tsconfig.json (root)
{
  "references": [
    { "path": "./app" },
    { "path": "./components" },
    { "path": "./lib" }
  ]
}

// app/tsconfig.json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "composite": true,
    "outDir": "../dist/app"
  },
  "include": ["./**/*"]
}
```

**Pros:**
- Incremental type checking
- Only checks changed modules
- Scales to very large projects

**Cons:**
- Complex setup
- Requires restructuring
- Not worth it for most projects

### ❌ Solution 5: Disable Type Checking (NOT RECOMMENDED)
```json
// next.config.mjs
typescript: {
  ignoreBuildErrors: true  // ❌ Don't do this
}
```

**Why not:**
- Loses type safety
- Runtime errors in production
- Defeats purpose of TypeScript

## Recommended Approach

### For Development
```bash
# Fast builds, no type checking
pnpm build
```

### For CI/CD
```bash
# Type check first (fails fast)
pnpm typecheck

# Then build (if types pass)
pnpm build
```

### For Vercel Deployment
```json
// vercel.json
{
  "build": {
    "env": {
      "NODE_OPTIONS": "--max-old-space-size=8192"
    }
  }
}
```

## Current Project Status

### Memory Usage Analysis
```
TypeScript Compilation:
- Files: ~500+ TypeScript files
- Types: ~10,000+ type definitions
- Memory: ~3-4GB peak usage
- Time: ~90-100 seconds
```

### Applied Solutions
✅ Memory limit: 4096MB (4GB)
✅ `skipLibCheck: true` in tsconfig.json
✅ Excluded test files from build
✅ Incremental builds enabled

### If Build Still Fails

**Option A: Increase to 8GB**
```json
"build": "NODE_OPTIONS=--max-old-space-size=8192 next build"
```

**Option B: Split type checking**
```json
"build": "next build",
"typecheck": "tsc --noEmit",
"ci:build": "pnpm typecheck && pnpm build"
```

**Option C: Optimize tsconfig.json further**
```json
{
  "compilerOptions": {
    "skipLibCheck": true,
    "skipDefaultLibCheck": true,
    "incremental": true,
    "noUnusedLocals": false,      // Disable expensive checks
    "noUnusedParameters": false,
    "exactOptionalPropertyTypes": false
  }
}
```

## Monitoring Memory Usage

### During Build
```bash
# Monitor memory usage
NODE_OPTIONS=--max-old-space-size=8192 node --trace-gc node_modules/.bin/next build
```

### Check TypeScript Performance
```bash
# Enable TypeScript diagnostics
tsc --noEmit --diagnostics
```

Output shows:
- Files checked
- Types instantiated
- Memory used
- Time taken

## Vercel-Specific Configuration

### Environment Variables
Set in Vercel Dashboard → Project Settings → Environment Variables:
```
NODE_OPTIONS=--max-old-space-size=8192
```

### Build Command Override
```
# Vercel Dashboard → Project Settings → Build & Development Settings
Build Command: NODE_OPTIONS=--max-old-space-size=8192 pnpm build
```

### vercel.json
```json
{
  "build": {
    "env": {
      "NODE_OPTIONS": "--max-old-space-size=8192"
    }
  }
}
```

## Best Practices

### 1. Keep Dependencies Updated
- Newer TypeScript versions are more memory-efficient
- Update `@types/*` packages regularly

### 2. Use Type Imports
```typescript
// ✅ Good - doesn't import runtime code
import type { User } from './types';

// ❌ Bad - imports everything
import { User } from './types';
```

### 3. Avoid Circular Dependencies
- Causes TypeScript to re-check types multiple times
- Use dependency graph tools to detect

### 4. Use `skipLibCheck: true`
- Always enable in production builds
- Skips checking node_modules types
- Reduces memory by 30-40%

### 5. Exclude Unnecessary Files
```json
{
  "exclude": [
    "node_modules",
    ".next",
    "**/*.spec.ts",
    "**/*.test.ts",
    "e2e/**/*"
  ]
}
```

## Troubleshooting

### Build fails with OOM error
1. Check current memory limit: `node -e "console.log(v8.getHeapStatistics().heap_size_limit / 1024 / 1024)"`
2. Increase to 8GB: `NODE_OPTIONS=--max-old-space-size=8192`
3. Check tsconfig.json has `skipLibCheck: true`
4. Verify excluded directories in tsconfig.json

### Build is slow but doesn't crash
1. Enable incremental builds: `"incremental": true`
2. Use `tsc --diagnostics` to find bottlenecks
3. Consider project references for large codebases

### Vercel builds fail but local builds work
1. Check Vercel's memory limit (default: 3GB)
2. Set `NODE_OPTIONS` in vercel.json
3. Consider upgrading Vercel plan for more memory

## Summary

**Current Status**: ✅ Build succeeds with 4GB memory limit

**If builds fail in future**:
1. Increase to 8GB (quick fix)
2. Optimize tsconfig.json (medium-term)
3. Split type checking from build (long-term)

**Do NOT**:
- Disable type checking (`ignoreBuildErrors: true`)
- Remove TypeScript entirely
- Ignore memory warnings

TypeScript's type safety is worth the memory cost. These solutions ensure builds succeed while maintaining type safety.
