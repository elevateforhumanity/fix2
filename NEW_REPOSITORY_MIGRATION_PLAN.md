# NEW REPOSITORY MIGRATION PLAN
**Date:** November 14, 2025  
**Purpose:** Step-by-step guide to migrate from fix2 to clean new repository

---

## 🎯 OVERVIEW

**Goal:** Create a clean, working platform using fix2 as a code library  
**Timeline:** 6 weeks  
**Approach:** Incremental migration with testing at each step

---

## 📦 WHAT TO MIGRATE

### ✅ Migrate These (High Value):

| Item | Source | Destination | Effort | Priority |
|------|--------|-------------|--------|----------|
| **Database Schemas** | `supabase/*.sql` | New repo | 1 hour | Critical |
| **WIOA APIs** | `app/api/wioa/*` | New repo | 4 hours | High |
| **Google Classroom** | `app/api/google-classroom/*` | New repo | 4 hours | High |
| **Stripe Integration** | `app/api/stripe/*` | New repo | 2 hours | High |
| **Utility Functions** | `lib/*`, `utils/*` | New repo | 2 hours | Medium |
| **Type Definitions** | `types/*` | New repo | 2 hours | Medium |
| **Configuration** | `*.config.js`, `.toml` | New repo | 1 hour | Medium |
| **Documentation** | `docs/*`, `*.md` | New repo | 1 hour | Low |

### ❌ Don't Migrate (Rebuild):

- Page components (too many errors)
- Layout components (inconsistent)
- State management (mixed patterns)
- Authentication flow (rebuild clean)
- UI components (use shadcn/ui instead)

---

## 🚀 STEP-BY-STEP MIGRATION

### STEP 1: Create New Repository

```bash
# Create new Next.js 16 project
npx create-next-app@latest elevate-platform \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd elevate-platform

# Initialize git
git init
git add .
git commit -m "Initial commit: Clean Next.js 16 setup"

# Create GitHub repository
gh repo create elevateforhumanity/elevate-platform --public --source=. --remote=origin --push
```

---

### STEP 2: Install Core Dependencies

```bash
# Authentication & Database
pnpm add @supabase/supabase-js @supabase/auth-helpers-nextjs @supabase/ssr

# State Management
pnpm add zustand

# Forms & Validation
pnpm add react-hook-form @hookform/resolvers zod

# UI Components
pnpm add @radix-ui/react-dialog @radix-ui/react-dropdown-menu
pnpm add @radix-ui/react-select @radix-ui/react-tabs
pnpm add @radix-ui/react-checkbox @radix-ui/react-label
pnpm add lucide-react class-variance-authority clsx tailwind-merge

# Payments
pnpm add @stripe/stripe-js stripe

# Utilities
pnpm add date-fns slugify

# Dev Dependencies
pnpm add -D @types/node typescript eslint prettier
pnpm add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
pnpm add -D eslint-config-next autoprefixer postcss tailwindcss
```

---

### STEP 3: Copy Configuration Files

```bash
# From fix2 to new repo
cd /workspaces

# Copy Netlify config
cp fix2/netlify.toml elevate-platform/

# Copy environment template
cp fix2/.env.example elevate-platform/

# Copy Tailwind config (review and clean)
cp fix2/tailwind.config.js elevate-platform/

# Copy TypeScript config (review)
cp fix2/tsconfig.json elevate-platform/

# Copy ESLint config
cp fix2/eslint.config.js elevate-platform/

# Copy documentation
cp -r fix2/docs elevate-platform/
cp fix2/README.md elevate-platform/
```

**Review each file and remove fix2-specific content!**

---

### STEP 4: Migrate Database Schemas

```bash
# Create supabase directory
mkdir -p elevate-platform/supabase

# Copy all SQL schemas
cp fix2/supabase/*.sql elevate-platform/supabase/

# Copy Supabase config
cp fix2/supabase/config.toml elevate-platform/supabase/
```

**Then:**
1. Go to https://supabase.com
2. Create new project
3. Run schemas in SQL Editor:
   - `001_initial_schema.sql`
   - `002_wioa_compliance_tables.sql`
   - `complete-lms-schema.sql`
4. Test connections

---

### STEP 5: Set Up Authentication

**Create:** `src/lib/supabase/client.ts`

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**Create:** `src/lib/supabase/server.ts`

```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}
```

**Create:** `src/app/login/page.tsx`

```typescript
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (!error) router.push('/dashboard')
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  )
}
```

---

### STEP 6: Migrate Utility Functions

```bash
# Copy utility functions
cp -r fix2/lib elevate-platform/src/
cp -r fix2/utils elevate-platform/src/

# Review and clean each file
# Remove unused functions
# Fix import paths
# Add proper types
```

**Review these files:**
- `lib/supabase.ts` - May need updates
- `lib/stripe.ts` - Check configuration
- `utils/helpers.ts` - Clean up
- `utils/validators.ts` - Keep validation logic

---

### STEP 7: Migrate API Routes

#### WIOA APIs

```bash
# Copy WIOA API routes
mkdir -p elevate-platform/src/app/api/wioa
cp -r fix2/app/api/wioa/* elevate-platform/src/app/api/wioa/
```

**Then review each file:**
1. Add `export const runtime = 'edge'` if needed
2. Fix import paths
3. Update Supabase client usage
4. Test each endpoint

#### Google Classroom

```bash
# Copy Google Classroom integration
mkdir -p elevate-platform/src/app/api/google-classroom
cp -r fix2/app/api/google-classroom/* elevate-platform/src/app/api/google-classroom/
```

**Review and update:**
1. Check OAuth configuration
2. Update environment variables
3. Test sync functionality

#### Stripe

```bash
# Copy Stripe integration
mkdir -p elevate-platform/src/app/api/stripe
cp -r fix2/app/api/stripe/* elevate-platform/src/app/api/stripe/
```

**Review:**
1. Update webhook handling
2. Check product IDs
3. Test payment flow

---

### STEP 8: Create Core Pages (Don't Copy, Build Fresh)

#### Dashboard

**Create:** `src/app/dashboard/page.tsx`

```typescript
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      {/* Add dashboard content */}
    </div>
  )
}
```

#### Courses

**Create:** `src/app/courses/page.tsx`

```typescript
import { createClient } from '@/lib/supabase/server'

export default async function CoursesPage() {
  const supabase = createClient()
  
  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1>Courses</h1>
      <div className="grid grid-cols-3 gap-4">
        {courses?.map(course => (
          <div key={course.id}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

### STEP 9: Migrate Type Definitions

```bash
# Copy types
mkdir -p elevate-platform/src/types
cp fix2/types/* elevate-platform/src/types/
```

**Clean up:**
1. Remove duplicates
2. Organize by feature
3. Add proper exports
4. Generate from database:

```bash
# Generate types from Supabase
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
```

---

### STEP 10: Set Up Testing

```bash
# Install testing dependencies
pnpm add -D @playwright/test @testing-library/react @testing-library/jest-dom
pnpm add -D vitest @vitest/ui happy-dom

# Copy test configs
cp fix2/playwright.config.ts elevate-platform/
cp fix2/vitest.config.ts elevate-platform/
```

**Create:** `src/__tests__/example.test.ts`

```typescript
import { describe, it, expect } from 'vitest'

describe('Example Test', () => {
  it('should pass', () => {
    expect(true).toBe(true)
  })
})
```

---

### STEP 11: Set Up CI/CD

**Create:** `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm typecheck
      - run: pnpm lint
      - run: pnpm test
      - run: pnpm build
```

---

### STEP 12: Deploy to Netlify

```bash
# Install Netlify CLI
pnpm add -D netlify-cli

# Login to Netlify
pnpm netlify login

# Initialize site
pnpm netlify init

# Deploy
pnpm netlify deploy --prod
```

**Or use Netlify UI:**
1. Go to https://app.netlify.com
2. Connect GitHub repository
3. Configure build settings:
   - Build command: `pnpm build`
   - Publish directory: `.next`
4. Add environment variables
5. Deploy

---

## 📋 MIGRATION CHECKLIST

### Week 1: Setup
- [ ] Create new repository
- [ ] Install dependencies
- [ ] Copy configuration files
- [ ] Migrate database schemas
- [ ] Set up Supabase project
- [ ] Test database connection
- [ ] Implement authentication
- [ ] Create basic layout

### Week 2: Core Features
- [ ] Create dashboard
- [ ] Build course listing
- [ ] Create course details
- [ ] Implement enrollment
- [ ] Add lesson viewer
- [ ] Test core flow

### Week 3: LMS Features
- [ ] Add quiz functionality
- [ ] Create user profile
- [ ] Implement progress tracking
- [ ] Add certificate generation
- [ ] Test all features

### Week 4: WIOA
- [ ] Migrate WIOA APIs
- [ ] Create WIOA pages
- [ ] Test eligibility checker
- [ ] Test case management
- [ ] Verify compliance

### Week 5: Advanced
- [ ] Migrate Google Classroom
- [ ] Add productivity tools
- [ ] Build admin panel
- [ ] Implement analytics
- [ ] Test integrations

### Week 6: Launch
- [ ] Complete testing
- [ ] Fix all bugs
- [ ] Deploy to staging
- [ ] Final testing
- [ ] Deploy to production

---

## 🔍 WHAT TO REVIEW BEFORE COPYING

### For Each File:

1. **Check Dependencies**
   - Are all imports available?
   - Are versions compatible?
   - Any deprecated packages?

2. **Check Patterns**
   - Is it using Next.js 13+ patterns?
   - Does it need `"use client"`?
   - Are imports correct?

3. **Check Configuration**
   - Environment variables needed?
   - API keys required?
   - External services?

4. **Test Individually**
   - Does it build?
   - Does it run?
   - Does it work?

---

## ⚠️ COMMON PITFALLS

### 1. Copying Without Understanding
**Problem:** Copy code that doesn't work  
**Solution:** Review and test each file

### 2. Missing Dependencies
**Problem:** Code fails because package not installed  
**Solution:** Check imports, install dependencies

### 3. Wrong Patterns
**Problem:** Using old React/Next.js patterns  
**Solution:** Update to Next.js 13+ App Router patterns

### 4. Environment Variables
**Problem:** Missing configuration  
**Solution:** Document all required env vars

### 5. Import Paths
**Problem:** Imports fail in new structure  
**Solution:** Update all import paths

---

## 🎯 SUCCESS CRITERIA

### After Week 1:
- ✅ New repo created
- ✅ Dependencies installed
- ✅ Database connected
- ✅ Auth working
- ✅ Basic layout done

### After Week 3:
- ✅ Core LMS working
- ✅ Users can enroll
- ✅ Lessons play
- ✅ Quizzes work
- ✅ Progress saves

### After Week 6:
- ✅ All features working
- ✅ No critical bugs
- ✅ Deployed to production
- ✅ Users can access
- ✅ Platform functional

---

## 📞 SUPPORT RESOURCES

### If You Get Stuck:

1. **Check fix2 Code**
   - Look at working examples
   - Copy patterns
   - Learn from mistakes

2. **Read Documentation**
   - Next.js docs
   - Supabase docs
   - Component docs

3. **Ask for Help**
   - Next.js Discord
   - Supabase Discord
   - Stack Overflow

4. **Debug Systematically**
   - Check console errors
   - Review network tab
   - Test in isolation
   - Add logging

---

## 🎬 START NOW

### Command to Begin:

```bash
# Create new repository
npx create-next-app@latest elevate-platform \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd elevate-platform

# Initialize git
git init
git add .
git commit -m "Initial commit: Clean Next.js 16 setup"

# Create GitHub repo
gh repo create elevateforhumanity/elevate-platform --public --source=. --remote=origin --push

# Start development
pnpm dev
```

**Then follow this plan step by step.**

---

## 🎯 FINAL NOTES

### Remember:

1. **Don't rush** - Build it right
2. **Test as you go** - Catch issues early
3. **Use fix2 as library** - Copy what works
4. **Build clean** - No technical debt
5. **Launch with confidence** - Tested and working

### The Goal:

**A clean, working, production-ready platform in 6 weeks.**

**You can do this! 🚀**

---

**Ready to start? Run the commands above and begin Week 1!**
