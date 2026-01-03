# Dynamic Routes Explained

**Problem:** Too many static route files  
**Solution:** Use dynamic routes with database-driven content

---

## CURRENT PROBLEM (Static Routes)

### Example: Business Routes

**Current structure (6 separate directories):**
```
app/
├── supersonic-fast-cash/
│   ├── page.tsx
│   ├── about/page.tsx
│   ├── services/page.tsx
│   └── contact/page.tsx
├── kingdom-konnect/
│   ├── page.tsx
│   ├── about/page.tsx
│   └── services/page.tsx
├── serene-comfort-care/
│   ├── page.tsx
│   └── services/page.tsx
├── urban-build-crew/
│   ├── page.tsx
│   └── services/page.tsx
├── selfish-inc/
│   └── page.tsx
└── rise-foundation/
    ├── page.tsx
    └── programs/page.tsx
```

**Problems:**
- 6 directories
- ~100 files
- 592KB of code
- Hard to maintain
- Need to deploy code for each new business

---

## SOLUTION: Dynamic Routes

### One directory handles all businesses

**New structure (1 directory):**
```
app/
└── businesses/
    └── [slug]/
        ├── page.tsx          ← Handles ALL businesses
        └── [section]/
            └── page.tsx      ← Handles ALL subpages
```

**Benefits:**
- 1 directory instead of 6
- ~10 files instead of 100
- ~50KB instead of 592KB
- Add new businesses via database (no code deploy)

---

## HOW IT WORKS

### 1. Database Table

```sql
CREATE TABLE businesses (
  id UUID PRIMARY KEY,
  slug TEXT UNIQUE,  -- 'supersonic-fast-cash'
  name TEXT,         -- 'Supersonic Fast Cash'
  description TEXT,
  logo_url TEXT,
  hero_image TEXT,
  content JSONB,     -- Flexible content
  active BOOLEAN DEFAULT true
);
```

### 2. Dynamic Route File

**File:** `app/businesses/[slug]/page.tsx`

```typescript
// This ONE file handles ALL businesses
export default async function BusinessPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  // Get business from database by slug
  const business = await supabase
    .from('businesses')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!business) {
    notFound();
  }

  // Render business page with database content
  return (
    <div>
      <h1>{business.name}</h1>
      <img src={business.hero_image} />
      <p>{business.description}</p>
      {/* Render content from database */}
    </div>
  );
}
```

### 3. URLs Still Work

**Before (static):**
- `/supersonic-fast-cash` → `app/supersonic-fast-cash/page.tsx`
- `/kingdom-konnect` → `app/kingdom-konnect/page.tsx`
- `/serene-comfort-care` → `app/serene-comfort-care/page.tsx`

**After (dynamic):**
- `/businesses/supersonic-fast-cash` → `app/businesses/[slug]/page.tsx`
- `/businesses/kingdom-konnect` → `app/businesses/[slug]/page.tsx`
- `/businesses/serene-comfort-care` → `app/businesses/[slug]/page.tsx`

**Same file handles all 3!**

---

## REAL EXAMPLES

### Example 1: Partner Routes

**Current (4 static routes):**
```
app/
├── partner-with-us/page.tsx
├── partner-application/page.tsx
├── partner-courses/page.tsx
└── partner-playbook/page.tsx
```

**Dynamic (1 route):**
```
app/
└── partners/
    └── [section]/
        └── page.tsx
```

**URLs:**
- `/partners/with-us`
- `/partners/application`
- `/partners/courses`
- `/partners/playbook`

**Code:**
```typescript
// app/partners/[section]/page.tsx
export default function PartnerSection({ 
  params 
}: { 
  params: { section: string } 
}) {
  // Load content from database based on section
  const content = await getPartnerContent(params.section);
  
  return <div>{content}</div>;
}
```

---

### Example 2: Tax Routes

**Current (4 static routes):**
```
app/
├── tax/page.tsx
├── tax-filing/page.tsx
├── tax-services/page.tsx
└── vita/page.tsx
```

**Dynamic (1 route with optional catch-all):**
```
app/
└── tax/
    ├── page.tsx              ← Main tax page
    └── [[...section]]/
        └── page.tsx          ← Handles all subpages
```

**URLs:**
- `/tax` → Main page
- `/tax/filing` → Dynamic
- `/tax/services` → Dynamic
- `/tax/vita` → Dynamic

---

### Example 3: Verify Routes

**Current (4 static routes):**
```
app/
├── verify-credential/page.tsx
├── verify-email/page.tsx
├── verify-identity/page.tsx
└── verifycertificate/page.tsx
```

**Dynamic (1 route):**
```
app/
└── verify/
    └── [type]/
        └── page.tsx
```

**URLs:**
- `/verify/credential`
- `/verify/email`
- `/verify/identity`
- `/verify/certificate`

**Code:**
```typescript
// app/verify/[type]/page.tsx
export default function VerifyPage({ 
  params 
}: { 
  params: { type: string } 
}) {
  switch (params.type) {
    case 'credential':
      return <VerifyCredential />;
    case 'email':
      return <VerifyEmail />;
    case 'identity':
      return <VerifyIdentity />;
    case 'certificate':
      return <VerifyCertificate />;
    default:
      notFound();
  }
}
```

---

## BENEFITS

### 1. Fewer Files
- **Before:** 100 files for 6 businesses
- **After:** 10 files for unlimited businesses

### 2. Database-Driven
- Add new businesses without code deploy
- Update content without rebuilding
- A/B test different versions

### 3. Faster Builds
- Fewer files = faster compilation
- One route instead of many

### 4. Easier Maintenance
- Fix bug once, applies to all
- Update design once, applies to all

### 5. SEO Still Works
- URLs still clean: `/businesses/supersonic-fast-cash`
- Can add redirects from old URLs
- Metadata generated dynamically

---

## IMPLEMENTATION EXAMPLE

### Step 1: Create Database Table

```sql
INSERT INTO businesses (slug, name, description, hero_image) VALUES
  ('supersonic-fast-cash', 'Supersonic Fast Cash', 'Fast tax refunds', '/images/supersonic.jpg'),
  ('kingdom-konnect', 'Kingdom Konnect', 'Faith-based services', '/images/kingdom.jpg'),
  ('serene-comfort-care', 'Serene Comfort Care', 'Home care services', '/images/serene.jpg');
```

### Step 2: Create Dynamic Route

```typescript
// app/businesses/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function generateStaticParams() {
  const supabase = await createClient();
  const { data: businesses } = await supabase
    .from('businesses')
    .select('slug');
  
  return businesses?.map(b => ({ slug: b.slug })) || [];
}

export default async function BusinessPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const supabase = await createClient();
  
  const { data: business } = await supabase
    .from('businesses')
    .select('*')
    .eq('slug', params.slug)
    .eq('active', true)
    .single();

  if (!business) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">{business.name}</h1>
      <img 
        src={business.hero_image} 
        alt={business.name}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <p className="text-lg">{business.description}</p>
    </div>
  );
}
```

### Step 3: Add Redirects

```javascript
// next.config.mjs
async redirects() {
  return [
    { 
      source: '/supersonic-fast-cash/:path*', 
      destination: '/businesses/supersonic-fast-cash/:path*', 
      permanent: true 
    },
    { 
      source: '/kingdom-konnect/:path*', 
      destination: '/businesses/kingdom-konnect/:path*', 
      permanent: true 
    },
  ];
}
```

### Step 4: Delete Old Routes

```bash
rm -rf app/supersonic-fast-cash/
rm -rf app/kingdom-konnect/
rm -rf app/serene-comfort-care/
# etc...
```

---

## WHEN TO USE DYNAMIC ROUTES

### ✅ Good Use Cases

1. **Multiple similar pages**
   - Blog posts: `/blog/[slug]`
   - Products: `/products/[id]`
   - Businesses: `/businesses/[slug]`
   - User profiles: `/users/[username]`

2. **Database-driven content**
   - Content changes frequently
   - Non-developers need to update
   - A/B testing needed

3. **Scalability**
   - Expect to add many more pages
   - Don't want to deploy for each new page

### ❌ Don't Use For

1. **Unique functionality**
   - Dashboard pages (different features)
   - Admin pages (different permissions)
   - Complex forms (different validation)

2. **Few pages**
   - Only 2-3 pages total
   - Pages are very different
   - Not worth the complexity

---

## SUMMARY

**"Make subpages dynamic" means:**

Instead of creating a separate file for each page:
```
app/business-1/page.tsx
app/business-2/page.tsx
app/business-3/page.tsx
```

Create ONE file that handles all pages:
```
app/businesses/[slug]/page.tsx
```

And store the content in a database.

**Result:**
- 90% fewer files
- Faster builds
- Easier maintenance
- Add new pages without code deploy

---

**For this codebase:**
- 6 business routes → 1 dynamic route
- 4 partner routes → 1 dynamic route
- 4 verify routes → 1 dynamic route
- 4 tax routes → 1 dynamic route

**Total savings:** ~100 files eliminated
