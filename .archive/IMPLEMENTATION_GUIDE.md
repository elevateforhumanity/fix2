# Program Standardization - Quick Implementation Guide

## 🎯 Current Status

All components have been created and integrated. The system is ready for testing and deployment.

---

## 🔧 What's Been Done

### ✅ Core Files Created
1. **Data Layer**
   - `app/data/programs.ts` - Centralized program data with all 7 programs
   - `lib/data/programs.ts` - Hybrid Supabase + static data service

2. **Components**
   - `components/home/HighlightStrip.tsx` - Workforce credibility badges
   - `components/home/HomeProgramsSection.tsx` - Dynamic program grid
   - `components/ui/FundingToast.tsx` - Funding eligibility toast

3. **Pages**
   - `app/programs/[slug]/page-new.tsx` - New dynamic program page with hero images
   - `app/programs/page-centralized.tsx` - New programs index using centralized data

4. **Integrations**
   - `app/layout.tsx` - Added FundingToast
   - `app/page.tsx` - Added HighlightStrip and HomeProgramsSection

5. **Assets**
   - All hero images copied to `public/images/programs/`

---

## 🚀 Next Steps - Choose Your Path

### Option A: Full Supabase Integration (Recommended for Dynamic Content)

**When to choose:** You want to manage programs via Supabase admin interface.

**Steps:**
1. Sync program data to Supabase:
   ```bash
   # Create a migration script or manually insert programs.ts data into Supabase
   ```

2. Replace existing program pages:
   ```bash
   mv app/programs/[slug]/page.tsx app/programs/[slug]/page-old-supabase.tsx
   mv app/programs/[slug]/page-new.tsx app/programs/[slug]/page.tsx
   
   mv app/programs/page.tsx app/programs/page-old-supabase.tsx
   mv app/programs/page-centralized.tsx app/programs/page.tsx
   ```

3. Update `app/programs/[slug]/page.tsx` to use hybrid service:
   ```typescript
   import { getProgram } from "@/lib/data/programs";
   
   export default async function ProgramPage({ params }: Props) {
     const program = await getProgram(params.slug);
     if (!program) return notFound();
     // ... rest of component
   }
   ```

4. Update `components/home/HomeProgramsSection.tsx` to use hybrid service:
   ```typescript
   import { getAllPrograms } from "@/lib/data/programs";
   
   export default async function HomeProgramsSection() {
     const programs = await getAllPrograms();
     // ... rest of component
   }
   ```

**Pros:**
- Dynamic content management via Supabase
- Can update programs without code deployment
- Fallback to static data if Supabase unavailable

**Cons:**
- Requires Supabase setup and maintenance
- Need to sync initial data to database

---

### Option B: Static Data Only (Recommended for Simplicity)

**When to choose:** You prefer file-based content management and don't need dynamic updates.

**Steps:**
1. Replace existing program pages:
   ```bash
   mv app/programs/[slug]/page.tsx app/programs/[slug]/page-old-supabase.tsx
   mv app/programs/[slug]/page-new.tsx app/programs/[slug]/page.tsx
   
   mv app/programs/page.tsx app/programs/page-old-supabase.tsx
   mv app/programs/page-centralized.tsx app/programs/page.tsx
   ```

2. Update `app/programs/[slug]/page.tsx` to use static data:
   ```typescript
   import { getProgramBySlug } from "@/app/data/programs";
   
   export default function ProgramPage({ params }: Props) {
     const program = getProgramBySlug(params.slug);
     if (!program) return notFound();
     // ... rest of component
   }
   ```

3. Keep `components/home/HomeProgramsSection.tsx` as-is (already uses static data)

**Pros:**
- Simple, no database required
- Fast, no network requests
- Easy to version control and deploy
- Works offline

**Cons:**
- Requires code deployment to update programs
- No admin interface for non-technical users

---

### Option C: Hybrid (Best of Both Worlds)

**When to choose:** You want flexibility to use either Supabase OR static data.

**Steps:**
1. Keep both implementations:
   - Use `lib/data/programs.ts` hybrid service
   - Fallback to `app/data/programs.ts` if Supabase empty/unavailable

2. This is already implemented! Just replace the page files:
   ```bash
   mv app/programs/[slug]/page.tsx app/programs/[slug]/page-old-supabase.tsx
   mv app/programs/[slug]/page-new.tsx app/programs/[slug]/page.tsx
   
   mv app/programs/page.tsx app/programs/page-old-supabase.tsx
   mv app/programs/page-centralized.tsx app/programs/page.tsx
   ```

3. Update components to use hybrid service (see Option A steps 3-4)

**Pros:**
- Maximum flexibility
- Graceful degradation
- Can migrate gradually

**Cons:**
- Slightly more complex
- Need to maintain both data sources

---

## 🧪 Testing Commands

### Start Development Server
```bash
npm run dev
```

### Test Program Pages
Visit these URLs:
- http://localhost:3000/programs
- http://localhost:3000/programs/hvac-technician
- http://localhost:3000/programs/barber-apprenticeship
- http://localhost:3000/programs/cna
- http://localhost:3000/programs/cdl
- http://localhost:3000/programs/building-maintenance
- http://localhost:3000/programs/building-technician
- http://localhost:3000/programs/workforce-readiness

### Test Homepage
- http://localhost:3000/

**Check for:**
- HighlightStrip appears below hero
- HomeProgramsSection shows all 7 programs
- FundingToast appears after 1.5s (first visit only)

### Test Responsive
Use browser dev tools to test:
- Mobile (375px width)
- Tablet (768px width)
- Desktop (1280px width)

---

## 🐛 Troubleshooting

### Images Not Loading
```bash
# Verify images exist
ls -lh public/images/programs/*-hero.jpg

# If missing, copy from source:
cp public/images/efh/programs/barber.jpg public/images/programs/barber-hero.jpg
# ... etc
```

### TypeScript Errors
```bash
# Check for type mismatches
npm run type-check

# Common fix: ensure Program type matches usage
```

### Supabase Connection Issues
```bash
# Check environment variables
cat .env.local | grep SUPABASE

# Test Supabase connection
# (Add a test script or check Supabase dashboard)
```

### FundingToast Not Appearing
```bash
# Clear localStorage
# In browser console:
localStorage.removeItem('efh_funding_toast_dismissed')
# Refresh page
```

---

## 📊 Success Metrics

After implementation, monitor:

### Technical Metrics
- [ ] All program pages load in < 2 seconds
- [ ] No console errors on any page
- [ ] Images load properly (no 404s)
- [ ] Mobile responsive (no horizontal scroll)
- [ ] Lighthouse score > 90

### User Metrics
- [ ] Program page views increase
- [ ] Application starts from program pages
- [ ] FundingToast click-through rate
- [ ] Time on program pages
- [ ] Bounce rate on program pages

### Business Metrics
- [ ] Workforce board feedback positive
- [ ] ETPL approval maintained/improved
- [ ] Student inquiries increase
- [ ] Application completion rate

---

## 🎨 Customization Guide

### Change Colors
Edit Tailwind classes in components:
- Primary: `bg-orange-500` → `bg-[your-color]`
- Text: `text-slate-900` → `text-[your-color]`

### Change CTA Text
Edit in `app/data/programs.ts`:
```typescript
ctaPrimary: {
  label: "Your Custom Text",
  href: "/your-route",
}
```

### Add New Program
1. Add to `app/data/programs.ts`:
```typescript
{
  slug: "new-program",
  name: "New Program Name",
  // ... all required fields
}
```

2. Add hero image:
```bash
cp source-image.jpg public/images/programs/new-program-hero.jpg
```

3. Test at `/programs/new-program`

### Modify FundingToast Message
Edit `components/ui/FundingToast.tsx`:
```typescript
<p className="text-sm font-medium">
  Your custom message here
</p>
```

---

## 📝 Commit Message Template

When ready to commit:

```bash
git add .
git commit -m "feat: implement program standardization system

- Add centralized program data with 7 core programs
- Create hybrid Supabase + static data service
- Add dynamic program pages with hero images
- Add HighlightStrip and HomeProgramsSection to homepage
- Add FundingToast for workforce funding awareness
- All descriptions ETPL-safe and workforce-board friendly

Co-authored-by: Ona <no-reply@ona.com>"
```

---

## 🆘 Need Help?

1. **Review Documentation**
   - `PROGRAM_STANDARDIZATION_SUMMARY.md` - Complete overview
   - `IMPLEMENTATION_GUIDE.md` - This file
   - Code comments in each component

2. **Check Examples**
   - Look at existing program in `app/data/programs.ts`
   - Review component patterns in `components/home/`

3. **Test Incrementally**
   - Test one program page at a time
   - Use browser dev tools to debug
   - Check console for errors

---

**Ready to go live?** Choose your integration path above and follow the steps!

**Last Updated:** 2025-12-05
