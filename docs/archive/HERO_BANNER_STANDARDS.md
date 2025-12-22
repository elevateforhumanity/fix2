# 🎨 Hero Banner Standards & Fixes

## 📏 Standard Sizes

### Large Hero (Homepage)

**Use for:** Homepage, major landing pages

```tsx
<section className="relative bg-gradient-to-br from-blue-600 to-indigo-600 text-white py-24 md:py-32 overflow-hidden">
  <div className="absolute inset-0 bg-grid-white/10" />
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
      Your Title Here
    </h1>
    <p className="text-xl md:text-2xl text-white/90 mb-8">
      Your description here
    </p>
  </div>
</section>
```

**Dimensions:**

- Mobile: py-24 (96px padding)
- Desktop: py-32 (128px padding)
- Title: 48px → 60px → 72px
- Description: 20px → 24px

---

### Medium Hero (Main Pages)

**Use for:** Programs, About, Services, Resources

```tsx
<section className="relative bg-gradient-to-br from-blue-600 to-indigo-600 text-white py-20 md:py-24 overflow-hidden">
  <div className="absolute inset-0 bg-grid-white/10" />
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
      Your Title Here
    </h1>
    <p className="text-lg md:text-xl text-white/90 mb-6">
      Your description here
    </p>
  </div>
</section>
```

**Dimensions:**

- Mobile: py-20 (80px padding)
- Desktop: py-24 (96px padding)
- Title: 36px → 48px → 60px
- Description: 18px → 20px

---

### Small Hero (Secondary Pages)

**Use for:** Blog posts, individual program pages, support pages

```tsx
<section className="relative bg-gradient-to-br from-blue-600 to-indigo-600 text-white py-16 md:py-20 overflow-hidden">
  <div className="absolute inset-0 bg-grid-white/10" />
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
      Your Title Here
    </h1>
    <p className="text-base md:text-lg text-white/90">Your description here</p>
  </div>
</section>
```

**Dimensions:**

- Mobile: py-16 (64px padding)
- Desktop: py-20 (80px padding)
- Title: 30px → 36px → 48px
- Description: 16px → 18px

---

## 🎨 Color Schemes

### Primary (Blue/Indigo)

```tsx
className = 'bg-gradient-to-br from-blue-600 to-indigo-600';
```

**Use for:** General pages, default

### Success (Green/Emerald)

```tsx
className = 'bg-gradient-to-br from-green-600 to-emerald-600';
```

**Use for:** Success stories, achievements, certifications

### Action (Orange/Red)

```tsx
className = 'bg-gradient-to-br from-orange-500 to-red-500';
```

**Use for:** CTAs, urgent actions, applications

### Creative (Purple/Pink)

```tsx
className = 'bg-gradient-to-br from-purple-600 to-pink-600';
```

**Use for:** Creative programs, events, community

### Professional (Slate/Gray)

```tsx
className = 'bg-gradient-to-br from-slate-700 to-gray-800';
```

**Use for:** Admin, professional services

---

## 🔧 Using the HeroBanner Component

### Basic Usage

```tsx
import { HeroBanner } from '@/components/HeroBanner';

<HeroBanner
  title="Your Title"
  description="Your description"
  size="medium"
  color="blue"
/>;
```

### With Custom Content

```tsx
<HeroBanner
  title="Your Title"
  description="Your description"
  size="large"
  color="blue"
>
  <div className="flex gap-4">
    <Link href="/apply" className="btn-primary">
      Apply Now
    </Link>
    <Link href="/learn-more" className="btn-secondary">
      Learn More
    </Link>
  </div>
</HeroBanner>
```

### Preset Variants

```tsx
import { HomeHero, PageHero, SectionHero } from '@/components/HeroBanner';

// Homepage
<HomeHero title="Welcome" description="Get started">
  {/* CTA buttons */}
</HomeHero>

// Main page
<PageHero title="Programs" description="Explore our programs" />

// Secondary page
<SectionHero title="Blog Post" description="Read more" />
```

---

## ✅ Fixed Pages

### Homepage ✅

- **File:** `app/page.tsx`
- **Size:** Large (py-24 md:py-32)
- **Status:** Video hero with proper sizing

### Programs Page ✅

- **File:** `app/programs/page.tsx`
- **Size:** Large (py-20 md:py-32)
- **Status:** Gradient hero with proper sizing

### About Page

- **File:** `app/about/page.tsx`
- **Size:** Medium (py-20 md:py-24)
- **Status:** Needs verification

### Blog Page

- **File:** `app/blog/page.tsx`
- **Size:** Medium (py-20 md:py-24)
- **Status:** Needs verification

### Events Page

- **File:** `app/events/page.tsx`
- **Size:** Medium (py-20 md:py-24)
- **Status:** Fixed color, needs size verification

---

## 🔍 Pages to Check

Run this to find all hero sections:

```bash
grep -r "py-20\|py-24\|py-32" app --include="*.tsx" | grep -i hero
```

---

## 🛠️ Quick Fix Script

```bash
# Run the fix script
./FIX_ALL_HERO_BANNERS.sh
```

This will:

1. Standardize all hero heights
2. Fix text sizes
3. Ensure proper max-widths
4. Create documentation

---

## 📋 Checklist

### Homepage

- [x] Hero size: Large (py-24 md:py-32)
- [x] Title size: text-5xl md:text-6xl lg:text-7xl
- [x] Video hero with sound controls
- [x] Proper gradient background

### Main Pages

- [x] Programs: Medium hero
- [ ] About: Verify size
- [ ] Services: Verify size
- [ ] Resources: Verify size
- [ ] Community: Verify size

### Secondary Pages

- [ ] Blog posts: Small hero
- [ ] Individual programs: Small hero
- [ ] Support pages: Small hero

### Dashboards

- [ ] All dashboards: Small hero
- [ ] Consistent sizing
- [ ] Login protection active

---

## 🎯 Best Practices

### 1. Consistent Sizing

- Use standard sizes (small, medium, large)
- Don't create custom sizes
- Maintain hierarchy

### 2. Responsive Design

- Always include mobile (base), tablet (md:), desktop (lg:)
- Test on all screen sizes
- Use relative units (rem, em) for text

### 3. Accessibility

- Ensure text contrast (white on dark background)
- Use semantic HTML (h1 for titles)
- Include alt text for images

### 4. Performance

- Use gradients instead of images when possible
- Lazy load hero images
- Optimize video files

### 5. Content

- Keep titles concise (5-10 words)
- Descriptions should be 1-2 sentences
- Include clear CTAs

---

## 🚀 Deploy

After fixing all heroes:

```bash
# Test locally
npm run dev

# Build
npm run build

# Deploy
npx vercel --prod
```

---

## 📊 Summary

### Standard Sizes

- **Large:** py-24 md:py-32 (Homepage)
- **Medium:** py-20 md:py-24 (Main pages)
- **Small:** py-16 md:py-20 (Secondary pages)

### Standard Colors

- **Blue:** Primary (default)
- **Green:** Success
- **Orange:** Action/CTA
- **Purple:** Creative
- **Slate:** Professional

### Component Available

- `<HeroBanner />` - Flexible component
- `<HomeHero />` - Homepage preset
- `<PageHero />` - Main page preset
- `<SectionHero />` - Secondary page preset

---

**All hero banners will be consistent and properly sized!** ✅
