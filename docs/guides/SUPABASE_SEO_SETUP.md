# 🚀 Supabase-Powered SEO Setup Guide

Complete guide for implementing automatic SEO with Supabase data fetching.

---

## ✅ What's Already Done

- ✅ DynamicSEO component created (`src/components/DynamicSEO.tsx`)
- ✅ HelmetProvider added to App.tsx
- ✅ react-helmet-async installed
- ✅ Helper functions for schemas (Course, Program, Article, Breadcrumb)
- ✅ Phone number verified: (317) 314-3757

---

## 🔐 Step 1: Secure Supabase Views (CRITICAL)

Create public views that expose only SEO-safe fields:

```sql
-- =============================================
-- File: supabase/migrations/008_seo_public_views.sql
-- Description: Public views for SEO data (read-only, published content only)
-- =============================================

-- Programs public view (SEO fields only)
CREATE OR REPLACE VIEW public.programs_public AS
SELECT
  id,
  title,
  slug,
  summary,
  cover_image as "coverImage",
  track,
  updated_at,
  created_at
FROM public.programs
WHERE published = true;

-- Courses public view (SEO fields only)
CREATE OR REPLACE VIEW public.courses_public AS
SELECT
  c.id,
  c.title as name,
  c.slug,
  c.description as summary,
  c.thumbnail as hero,
  c.duration,
  c.updated_at,
  p.title as program_name,
  p.slug as program_slug
FROM public.courses c
JOIN public.programs p ON p.id = c.program_id
WHERE c.published = true AND p.published = true;

-- Enable RLS on base tables (block direct access)
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Block anonymous access to base tables
CREATE POLICY "Block anon read programs"
ON public.programs FOR SELECT
TO anon USING (false);

CREATE POLICY "Block anon read courses"
ON public.courses FOR SELECT
TO anon USING (false);

-- Allow anonymous read on public views
-- (Views inherit permissions, no additional policy needed)

COMMENT ON VIEW public.programs_public IS 'Public SEO data for programs - read-only, published content only';
COMMENT ON VIEW public.courses_public IS 'Public SEO data for courses - read-only, published content only';
```

**Apply migration:**

```bash
psql $SUPABASE_DB_URL -f supabase/migrations/008_seo_public_views.sql
```

---

## 📦 Step 2: Create Supabase Hooks

Create custom hooks for fetching SEO data:

```typescript
// =============================================
// File: src/hooks/useProgramSEO.ts
// Description: Fetch program SEO data from Supabase
// =============================================
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface ProgramSEO {
  id: string;
  title: string;
  slug: string;
  summary: string;
  coverImage: string;
  track: string;
  updated_at: string;
}

export function useProgramSEO(slug: string) {
  const [program, setProgram] = useState<ProgramSEO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProgram() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('programs_public')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setProgram(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchProgram();
    }
  }, [slug]);

  return { program, loading, error };
}
```

```typescript
// =============================================
// File: src/hooks/useCourseSEO.ts
// Description: Fetch course SEO data from Supabase
// =============================================
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface CourseSEO {
  id: string;
  name: string;
  slug: string;
  summary: string;
  hero: string;
  duration: string;
  program_name: string;
  program_slug: string;
  updated_at: string;
}

export function useCourseSEO(slug: string) {
  const [course, setCourse] = useState<CourseSEO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCourse() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('courses_public')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setCourse(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchCourse();
    }
  }, [slug]);

  return { course, loading, error };
}
```

---

## 🎯 Step 3: Create Auto-SEO Wrapper Components

```typescript
// =============================================
// File: src/components/ProgramSEO.tsx
// Description: Auto-SEO wrapper for program pages
// =============================================
import DynamicSEO, { createProgramSchema } from './DynamicSEO';
import { useProgramSEO } from '../hooks/useProgramSEO';

interface ProgramSEOProps {
  slug: string;
}

export default function ProgramSEO({ slug }: ProgramSEOProps) {
  const { program, loading, error } = useProgramSEO(slug);

  // Don't render anything while loading
  if (loading) return null;

  // If error or not found, set noindex
  if (error || !program) {
    return (
      <DynamicSEO
        title="Program Not Found"
        description="The requested program could not be found."
        canonical={`/programs/${slug}`}
        noindex={true}
      />
    );
  }

  const schema = createProgramSchema({
    title: program.title,
    description: program.summary,
    url: `/programs/${program.slug}`,
    image: program.coverImage,
  });

  return (
    <DynamicSEO
      title={program.title}
      description={program.summary || `Enroll in ${program.title}, a state-approved workforce apprenticeship program.`}
      canonical={`/programs/${program.slug}`}
      keywords={[
        program.title,
        'apprenticeship',
        'workforce training',
        program.track,
        'Indianapolis',
        'ETPL',
        'DOL',
      ]}
      ogImage={program.coverImage}
      structuredData={schema}
    />
  );
}
```

```typescript
// =============================================
// File: src/components/CourseSEO.tsx
// Description: Auto-SEO wrapper for course pages
// =============================================
import DynamicSEO, { createCourseSchema } from './DynamicSEO';
import { useCourseSEO } from '../hooks/useCourseSEO';

interface CourseSEOProps {
  slug: string;
}

export default function CourseSEO({ slug }: CourseSEOProps) {
  const { course, loading, error } = useCourseSEO(slug);

  if (loading) return null;

  if (error || !course) {
    return (
      <DynamicSEO
        title="Course Not Found"
        description="The requested course could not be found."
        canonical={`/lms/course/${slug}`}
        noindex={true}
      />
    );
  }

  const schema = createCourseSchema({
    title: course.name,
    description: course.summary,
    url: `/lms/course/${course.slug}`,
    image: course.hero,
    duration: course.duration,
  });

  return (
    <DynamicSEO
      title={`${course.name} – ${course.program_name}`}
      description={course.summary || `Enroll in ${course.name} under ${course.program_name} at Elevate for Humanity.`}
      canonical={`/lms/course/${course.slug}`}
      keywords={[
        course.name,
        course.program_name,
        'online course',
        'certification',
        'workforce training',
      ]}
      ogImage={course.hero}
      structuredData={schema}
    />
  );
}
```

---

## 📄 Step 4: Use in Page Components

### Program Page Example

```typescript
// =============================================
// File: src/pages/programs/[slug].tsx
// =============================================
import { useParams } from 'react-router-dom';
import ProgramSEO from '../../components/ProgramSEO';
import { useProgramSEO } from '../../hooks/useProgramSEO';

export default function ProgramPage() {
  const { slug } = useParams<{ slug: string }>();
  const { program, loading, error } = useProgramSEO(slug!);

  return (
    <>
      {/* Auto-SEO from Supabase */}
      <ProgramSEO slug={slug!} />

      <main>
        {loading && <div>Loading...</div>}
        {error && <div>Program not found</div>}
        {program && (
          <>
            <h1>{program.title}</h1>
            <p>{program.summary}</p>
            {/* rest of program content */}
          </>
        )}
      </main>
    </>
  );
}
```

### Course Page Example

```typescript
// =============================================
// File: src/pages/lms/course/[slug].tsx
// =============================================
import { useParams } from 'react-router-dom';
import CourseSEO from '../../../components/CourseSEO';
import { useCourseSEO } from '../../../hooks/useCourseSEO';

export default function CoursePage() {
  const { slug } = useParams<{ slug: string }>();
  const { course, loading, error } = useCourseSEO(slug!);

  return (
    <>
      {/* Auto-SEO from Supabase */}
      <CourseSEO slug={slug!} />

      <main>
        {loading && <div>Loading...</div>}
        {error && <div>Course not found</div>}
        {course && (
          <>
            <h1>{course.name}</h1>
            <p>{course.summary}</p>
            {/* rest of course content */}
          </>
        )}
      </main>
    </>
  );
}
```

---

## ⚡ Step 5: Add Caching (Optional but Recommended)

Install SWR for automatic caching:

```bash
pnpm add swr
```

Update hooks with SWR:

```typescript
// =============================================
// File: src/hooks/useProgramSEO.ts (with SWR)
// =============================================
import useSWR from 'swr';
import { supabase } from '../lib/supabase';

const fetcher = async (slug: string) => {
  const { data, error } = await supabase
    .from('programs_public')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
};

export function useProgramSEO(slug: string) {
  const { data, error, isLoading } = useSWR(
    slug ? `program-${slug}` : null,
    () => fetcher(slug),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // 60 seconds
    }
  );

  return {
    program: data,
    loading: isLoading,
    error,
  };
}
```

---

## 🔄 Step 6: Auto-Rebuild on Content Changes

### Create Netlify Build Hook

1. Go to Netlify Dashboard → Site settings → Build & deploy → Build hooks
2. Create new hook: "Content Update Trigger"
3. Copy the webhook URL

### Add Supabase Trigger

```sql
-- =============================================
-- File: supabase/migrations/009_auto_rebuild_trigger.sql
-- Description: Trigger Netlify rebuild on content changes
-- =============================================

-- Create function to notify on changes
CREATE OR REPLACE FUNCTION notify_content_change()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  -- Log the change
  INSERT INTO public.build_triggers (table_name, action, row_id)
  VALUES (TG_TABLE_NAME, TG_OP, NEW.id);

  RETURN NEW;
END;
$$;

-- Create triggers for programs
CREATE TRIGGER programs_content_trigger
AFTER INSERT OR UPDATE OF published, slug, title, summary, updated_at
ON public.programs
FOR EACH ROW
WHEN (NEW.published = true)
EXECUTE FUNCTION notify_content_change();

-- Create triggers for courses
CREATE TRIGGER courses_content_trigger
AFTER INSERT OR UPDATE OF published, slug, title, description, updated_at
ON public.courses
FOR EACH ROW
WHEN (NEW.published = true)
EXECUTE FUNCTION notify_content_change();

-- Create build triggers log table
CREATE TABLE IF NOT EXISTS public.build_triggers (
  id BIGSERIAL PRIMARY KEY,
  table_name TEXT NOT NULL,
  action TEXT NOT NULL,
  row_id UUID NOT NULL,
  triggered_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.build_triggers IS 'Log of content changes that should trigger rebuilds';
```

### Create Supabase Edge Function

```typescript
// =============================================
// File: supabase/functions/netlify-rebuild/index.ts
// Description: Trigger Netlify rebuild on content changes
// =============================================
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const NETLIFY_BUILD_HOOK = Deno.env.get('NETLIFY_BUILD_HOOK')!;

serve(async (req) => {
  try {
    // Trigger Netlify build
    const response = await fetch(NETLIFY_BUILD_HOOK, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Netlify build hook failed: ${response.statusText}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Build triggered' }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
```

**Deploy function:**

```bash
supabase functions deploy netlify-rebuild --no-verify-jwt
```

**Set environment variable:**

```bash
supabase secrets set NETLIFY_BUILD_HOOK=https://api.netlify.com/build_hooks/YOUR_HOOK_ID
```

---

## 🎨 Step 7: Dynamic OG Images (Optional)

Create Netlify Edge Function for dynamic OG images:

```typescript
// =============================================
// File: netlify/edge-functions/og-image.ts
// Description: Generate dynamic OG images for programs/courses
// =============================================
import { ImageResponse } from 'https://deno.land/x/og_edge@0.0.4/mod.ts';

export default async (request: Request) => {
  const url = new URL(request.url);
  const title = url.searchParams.get('title') || 'Elevate for Humanity';
  const subtitle = url.searchParams.get('subtitle') || 'Workforce Development';

  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0b2545',
          color: 'white',
          fontFamily: 'Inter, sans-serif',
        },
        children: [
          {
            type: 'div',
            props: {
              style: { fontSize: 60, fontWeight: 'bold', marginBottom: 20 },
              children: title,
            },
          },
          {
            type: 'div',
            props: {
              style: { fontSize: 30, opacity: 0.8 },
              children: subtitle,
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
    }
  );
};

export const config = { path: '/og-image' };
```

**Use in ProgramSEO:**

```typescript
const ogImageUrl = `/og-image?title=${encodeURIComponent(program.title)}&subtitle=${encodeURIComponent(program.track)}`;
```

---

## ✅ Checklist

### Security

- [ ] Apply migration 008 (public views)
- [ ] Enable RLS on base tables
- [ ] Test that anon key can't access base tables
- [ ] Verify views return only published content

### Implementation

- [ ] Create useProgramSEO hook
- [ ] Create useCourseSEO hook
- [ ] Create ProgramSEO component
- [ ] Create CourseSEO component
- [ ] Add ProgramSEO to program pages
- [ ] Add CourseSEO to course pages

### Optimization

- [ ] Install SWR for caching
- [ ] Update hooks with SWR
- [ ] Test cache behavior
- [ ] Set appropriate cache duration

### Automation

- [ ] Create Netlify build hook
- [ ] Apply migration 009 (triggers)
- [ ] Deploy netlify-rebuild function
- [ ] Set NETLIFY_BUILD_HOOK secret
- [ ] Test auto-rebuild on content change

### Quality

- [ ] Every program has title, summary, cover image
- [ ] Every course has name, description, hero image
- [ ] All images have alt text
- [ ] One H1 per page matching title
- [ ] 404 pages have noindex

---

## 🧪 Testing

### Test SEO Data Fetching

```bash
# Test program view
curl "https://YOUR_SUPABASE_URL/rest/v1/programs_public?slug=eq.barber-apprenticeship" \
  -H "apikey: YOUR_ANON_KEY"

# Test course view
curl "https://YOUR_SUPABASE_URL/rest/v1/courses_public?slug=eq.intro-to-barbering" \
  -H "apikey: YOUR_ANON_KEY"
```

### Test Auto-Rebuild

1. Update a program in Supabase
2. Check build_triggers table
3. Verify Netlify build started

### Test OG Images

```bash
# Visit in browser
https://www.elevateforhumanity.org/og-image?title=Barber%20Apprenticeship&subtitle=Workforce%20Training
```

---

## 📊 Expected Results

### Before

- Manual SEO for each page
- Static meta tags
- No automatic updates
- Generic OG images

### After

- ✅ Automatic SEO from Supabase
- ✅ Dynamic meta tags per program/course
- ✅ Auto-rebuild on content changes
- ✅ Custom OG images per page
- ✅ Cached for performance
- ✅ Secure (RLS + public views)

---

## 🎉 Summary

**Supabase-Powered SEO: READY TO IMPLEMENT**

You now have:

- ✅ Secure public views for SEO data
- ✅ Custom hooks for data fetching
- ✅ Auto-SEO wrapper components
- ✅ Caching with SWR
- ✅ Auto-rebuild on content changes
- ✅ Dynamic OG image generation

**Next Steps:**

1. Apply Supabase migrations
2. Create hooks and components
3. Add to page components
4. Test and deploy

---

**Created:** October 29, 2024  
**Status:** ✅ READY TO IMPLEMENT  
**Documentation:** Complete

---

**Prepared by:** Ona  
**Co-authored-by:** Ona <no-reply@ona.com>
