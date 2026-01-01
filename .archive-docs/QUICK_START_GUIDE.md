# Quick Start Guide

**For developers getting started with this project**

---

## 🚀 Getting Started (5 Minutes)

### 1. Fix Node.js (Required First)

The dev container failed to build. Try these in order:

```bash
# Check if Node.js exists
node --version

# If not found, restart the environment
# In Gitpod: Workspace → Stop Workspace → Start Workspace

# Or rebuild dev container
gitpod environment devcontainer rebuild
```

### 2. Set Up Environment Variables

```bash
# If you have Vercel token:
./setup-env.sh

# Otherwise, manually:
cp .env.example .env.local
# Then edit .env.local with your credentials
```

**Minimum required:**

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Install Dependencies

```bash
corepack enable
corepack prepare pnpm@latest --activate
pnpm install
```

### 4. Start Development Server

```bash
pnpm dev
```

Visit: http://localhost:3000

---

## 📋 What You Need to Know

### Project Structure

```
fix2/
├── app/                    # Next.js 16 App Router pages
│   ├── (marketing)/       # Public pages
│   ├── (dashboard)/       # Authenticated pages
│   ├── api/               # API routes
│   └── programs-catalog/  # ⚠️ Needs database connection
├── lib/                   # Utilities and services
│   ├── supabase/         # Database clients
│   ├── integrations/     # External services
│   └── mock-courses.ts   # ⚠️ Replace with real queries
├── database/             # Database schema
└── supabase/            # Migrations and seeds
```

### Key Files

- `database/schema.sql` - Database structure
- `lib/supabase/client.ts` - Client-side queries
- `lib/supabase/server.ts` - Server-side queries
- `lib/mock-courses.ts` - Mock data (to be replaced)

---

## 🎯 Your First Tasks

### Task 1: Replace Mock Data in Programs Catalog (30 min)

**File:** `app/programs-catalog/page.tsx`

**Current:** Hardcoded programs in JSX  
**Goal:** Query from database

**Steps:**

1. Import Supabase client
2. Fetch programs from database
3. Replace hardcoded JSX with mapped data
4. Add loading state

**Example:**

```typescript
// Add at top of file
import { createClient } from '@/lib/supabase/server';

// In component
const supabase = createClient();
const { data: programs } = await supabase
  .from('programs')
  .select('*')
  .eq('active', true)
  .order('name');
```

### Task 2: Find All Mock Data Usage (10 min)

```bash
# Find files importing mock data
grep -r "from.*mock-courses" app/ lib/

# Find hardcoded arrays
find app/ -name "*.tsx" -exec grep -l "const.*=.*\[\]" {} \;
```

### Task 3: Test OCR Endpoint (15 min)

**Endpoint:** `/api/supersonic-fast-cash/ocr-extract`

**Test with curl:**

```bash
curl -X POST http://localhost:3000/api/supersonic-fast-cash/ocr-extract \
  -F "file=@sample-w2.pdf" \
  -F "documentType=w2" \
  -F "email=test@example.com" \
  -F "phone=555-1234"
```

**Or use the UI:**
Visit: http://localhost:3000/supersonic-fast-cash/tools/smart-upload

---

## 📚 Documentation

### Read These First

1. `ENVIRONMENT_VERIFICATION_SUMMARY.md` - Overview of everything
2. `DATA_CONNECTION_AUDIT.md` - Database and data issues
3. `OCR_SETUP_GUIDE.md` - OCR implementation details

### Database

- Schema: `database/schema.sql`
- Migrations: `supabase/migrations/`
- Seeds: `supabase/seed/`

### API Routes

- OCR: `app/api/supersonic-fast-cash/ocr-extract/route.ts`
- Database test: `app/api/admin/test-database/route.ts`

---

## 🔍 Common Issues

### "Node not found"

```bash
# Restart environment or rebuild container
gitpod environment devcontainer rebuild
```

### "Supabase connection failed"

```bash
# Check environment variables
cat .env.local | grep SUPABASE

# Test connection
curl $NEXT_PUBLIC_SUPABASE_URL/rest/v1/
```

### "Mock data not updating"

```bash
# You're probably using mock-courses.ts
# Replace with real database queries
```

### "OCR not working"

```bash
# Check Drake Software credentials
cat .env.local | grep DRAKE

# Or install Tesseract.js for fallback
pnpm add tesseract.js
```

---

## 🛠️ Useful Commands

### Development

```bash
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm type-check       # Check TypeScript
```

### Database

```bash
# Run migrations
./apply-verification-migration.sh

# Check tables
psql $POSTGRES_URL -c "\dt"

# Seed data
psql $POSTGRES_URL -f supabase/seed/programs_seed.sql
```

### Testing

```bash
pnpm test             # Run tests
pnpm test:e2e         # Run E2E tests
```

---

## 📞 Need Help?

### Check These Resources

1. Project README: `README.md`
2. Status: `STATUS.md`
3. Features: `FEATURES_CATALOG.md`

### Common Questions

**Q: Where is the database schema?**  
A: `database/schema.sql` or `supabase/001_initial_schema.sql`

**Q: How do I query the database?**  
A: Use `lib/supabase/client.ts` (client) or `lib/supabase/server.ts` (server)

**Q: Where are the programs stored?**  
A: In the `programs` table in Supabase

**Q: How do I add OCR for new document types?**  
A: See `OCR_SETUP_GUIDE.md` for detailed instructions

**Q: Why is mock data being used?**  
A: Legacy code. Replace with real queries (see Task 1 above)

---

## ✅ Success Checklist

Before you start coding:

- [ ] Node.js is installed and working
- [ ] Environment variables are set up
- [ ] Dependencies are installed
- [ ] Development server starts
- [ ] You can access http://localhost:3000
- [ ] You've read the documentation files

First day goals:

- [ ] Replace mock data in one page
- [ ] Test database connection
- [ ] Test OCR endpoint
- [ ] Understand project structure

---

## 🎉 You're Ready!

Start with Task 1 (Replace Mock Data) and work your way through the action items in `ENVIRONMENT_VERIFICATION_SUMMARY.md`.

Good luck! 🚀
