# Data-Driven Programs System

## Overview

All programs now use a **single source of truth** (`src/data/programs.ts`) with consistent styling and automatic routing.

## How It Works

### 1. Add Program Data

Edit `src/data/programs.ts`:

```typescript
{
  slug: 'your-program',
  name: 'Your Program Name',
  tagline: 'Short tagline',
  summary: 'Detailed description...',
  bullets: ['Skill 1', 'Skill 2', 'Skill 3'],
  funding: ['WRG', 'WIOA'],
  heroSrc: '/images/efh-your-program-hero.jpg',
  cardSrc: '/images/efh-your-program-card.jpg',
}
```

### 2. Add Images

Place images in `public/images/`:
- `efh-{slug}-hero.jpg` (1200×900) - Detail page hero
- `efh-{slug}-card.jpg` (1600×900) - Program card thumbnail

### 3. Automatic Features

✅ **Program card** - Automatically generated from data  
✅ **Detail page** - Auto-routed to `/programs/{slug}`  
✅ **Consistent styling** - Same look across all programs  
✅ **Smart fallbacks** - Shows placeholder if image missing  
✅ **SEO-friendly** - Proper meta tags and structure

## Current Programs

| Slug | Name | Images Required |
|------|------|-----------------|
| `barber` | Barber Apprenticeship | efh-barber-hero.jpg, efh-barber-card.jpg |
| `cna` | Certified Nursing Assistant (CNA) | efh-cna-hero.jpg, efh-cna-card.jpg |
| `building-tech` | Building Technician (Universal Multi-Trade) | efh-building-tech-hero.jpg, efh-building-tech-card.jpg |

## Routes

All routes are automatically generated:

- `/programs` - Grid of all programs
- `/programs/barber` - Barber Apprenticeship detail
- `/programs/cna` - Certified Nursing Assistant (CNA) detail
- `/programs/building-tech` - Building Technician detail (Universal Multi-Trade)

## Components

### ProgramCard
Reusable card component used on:
- Landing page (first 2 programs)
- Programs page (all programs)

### ProgramDetail
Template for all program detail pages with:
- Hero section with image
- Program description
- What you'll learn (bullets)
- Eligibility & funding info
- Apply CTA

## Adding a New Program

**Step 1:** Add to `src/data/programs.ts`
```typescript
{
  slug: 'welding',
  name: 'Welding Apprenticeship',
  tagline: 'MIG • TIG • Stick',
  summary: 'Learn professional welding...',
  bullets: ['MIG welding', 'TIG welding', 'Safety certification'],
  funding: ['WRG', 'WIOA', 'Apprenticeship'],
  heroSrc: '/images/efh-welding-hero.jpg',
  cardSrc: '/images/efh-welding-card.jpg',
}
```

**Step 2:** Add images
```bash
# Place in public/images/
efh-welding-hero.jpg (1200×900)
efh-welding-card.jpg (1600×900)
```

**Step 3:** Done!
- Automatically appears on `/programs`
- Automatically routed to `/programs/welding`
- No code changes needed

## Image Naming Convention

**Pattern:** `efh-{slug}-{type}.jpg`

Examples:
- `efh-barber-hero.jpg`
- `efh-barber-card.jpg`
- `efh-hvac-hero.jpg`
- `efh-hvac-card.jpg`

**Why this pattern?**
- Consistent and predictable
- Easy to find and organize
- Matches slug for automatic loading
- Clear purpose (hero vs card)

## Editing Program Content

All content is in one place: `src/data/programs.ts`

**To update:**
1. Edit the program object
2. Save file
3. Rebuild: `npm run build`
4. Deploy

**No need to:**
- Edit multiple files
- Update routes
- Change components
- Modify styling

## Fallback Behavior

If an image is missing:
- **Card:** Shows gray box with "Add {slug} image"
- **Hero:** Shows gradient placeholder with program info
- **Site still works** - No broken images

## Testing

```bash
# Build
npm run build

# Preview locally
npm run preview

# Test URLs:
http://localhost:4173/programs
http://localhost:4173/programs/barber
http://localhost:4173/programs/building-tech
http://localhost:4173/programs/hvac
```

## Benefits

✅ **Single source of truth** - Edit once, updates everywhere  
✅ **Consistent design** - All programs look professional  
✅ **Easy to maintain** - Add programs in minutes  
✅ **Type-safe** - TypeScript catches errors  
✅ **SEO-friendly** - Proper structure and meta tags  
✅ **Scalable** - Add 100 programs without code changes

## Migration from Old System

Old routes still work for backwards compatibility:
- `/programs-old` - Old programs page
- `/program/:slug` - Old program detail

New routes (recommended):
- `/programs` - New data-driven page
- `/programs/:slug` - New data-driven detail

## Next Steps

1. **Add images** for all 5 programs
2. **Review content** in `programs.ts`
3. **Test all routes** locally
4. **Deploy** to production

---

**Questions?** See `IMAGE_SETUP_GUIDE.md` for image requirements.
