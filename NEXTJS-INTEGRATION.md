# Next.js Integration Guide - Course Covers & AI Videos

## 📁 File Structure

```
content/
├── image-prompts/courses/
│   ├── hvac-course-cover.md
│   ├── barber-course-cover.md
│   ├── cna-course-cover.md
│   ├── cdl-course-cover.md
│   └── building-tech-course-cover.md
│
└── video-scripts/courses/
    ├── about-elevate-for-humanity.md (homepage)
    ├── hvac-program-video.md
    ├── barber-program-video.md
    ├── healthcare-cna-program-video.md
    ├── cdl-program-video.md
    └── building-tech-program-video.md
```

---

## 🎨 Step 1: Create Course Media Config

Create a mapping file to link courses to their media assets:

**File:** `lib/course-media.ts`

```typescript
export interface CourseMedia {
  id: string;
  name: string;
  coverImage: string;
  videoScript: string;
  videoUrl?: string; // After generating with HeyGen/Synthesia
}

export const courseMediaMap: Record<string, CourseMedia> = {
  hvac: {
    id: 'hvac',
    name: 'HVAC Technician Training',
    coverImage: '/images/courses/hvac-cover.jpg',
    videoScript: '/content/video-scripts/courses/hvac-program-video.md',
    videoUrl: '/videos/courses/hvac-program.mp4',
  },
  barber: {
    id: 'barber',
    name: 'Barber Apprenticeship',
    coverImage: '/images/courses/barber-cover.jpg',
    videoScript: '/content/video-scripts/courses/barber-program-video.md',
    videoUrl: '/videos/courses/barber-program.mp4',
  },
  healthcare: {
    id: 'healthcare',
    name: 'CNA & Healthcare Careers',
    coverImage: '/images/courses/cna-cover.jpg',
    videoScript: '/content/video-scripts/courses/healthcare-cna-program-video.md',
    videoUrl: '/videos/courses/healthcare-cna-program.mp4',
  },
  cdl: {
    id: 'cdl',
    name: 'CDL & Transportation Training',
    coverImage: '/images/courses/cdl-cover.jpg',
    videoScript: '/content/video-scripts/courses/cdl-program-video.md',
    videoUrl: '/videos/courses/cdl-program.mp4',
  },
  'building-tech': {
    id: 'building-tech',
    name: 'Building Technician & Skilled Trades',
    coverImage: '/images/courses/building-tech-cover.jpg',
    videoScript: '/content/video-scripts/courses/building-tech-program-video.md',
    videoUrl: '/videos/courses/building-tech-program.mp4',
  },
};

export function getCourseMedia(courseId: string): CourseMedia | undefined {
  return courseMediaMap[courseId];
}

export function getAllCourseMedia(): CourseMedia[] {
  return Object.values(courseMediaMap);
}
```

---

## 🖼️ Step 2: Course Card Component with Cover Image

**File:** `components/CourseCard.tsx`

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { getCourseMedia } from '@/lib/course-media';

interface CourseCardProps {
  courseId: string;
  title: string;
  description: string;
  duration?: string;
  href: string;
}

export function CourseCard({ 
  courseId, 
  title, 
  description, 
  duration,
  href 
}: CourseCardProps) {
  const media = getCourseMedia(courseId);
  
  return (
    <Link 
      href={href}
      className="group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
    >
      {/* Course Cover Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        {media?.coverImage ? (
          <Image
            src={media.coverImage}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
            <span className="text-4xl font-bold text-white opacity-50">
              {title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Course Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {description}
        </p>
        {duration && (
          <div className="mt-3 flex items-center text-xs text-gray-500">
            <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {duration}
          </div>
        )}
      </div>
    </Link>
  );
}
```

---

## 🎬 Step 3: Video Player Component

**File:** `components/CourseVideoPlayer.tsx`

```tsx
'use client';

import { useState } from 'react';
import { getCourseMedia } from '@/lib/course-media';

interface CourseVideoPlayerProps {
  courseId: string;
  autoplay?: boolean;
  showScript?: boolean;
}

export function CourseVideoPlayer({ 
  courseId, 
  autoplay = false,
  showScript = false 
}: CourseVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const media = getCourseMedia(courseId);

  if (!media) {
    return (
      <div className="rounded-lg bg-gray-100 p-8 text-center">
        <p className="text-gray-600">Video not available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Video Player */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
        {media.videoUrl ? (
          <video
            className="h-full w-full"
            controls
            autoPlay={autoplay}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={media.videoUrl} type="video/mp4" />
            <track
              kind="captions"
              src={`${media.videoUrl.replace('.mp4', '.vtt')}`}
              srcLang="en"
              label="English"
            />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mb-4 inline-block rounded-full bg-blue-600 p-4">
                <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
              <p className="text-white">Video coming soon</p>
              <p className="mt-2 text-sm text-gray-400">
                Generate using script: {media.videoScript}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Optional: Show Script */}
      {showScript && (
        <details className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <summary className="cursor-pointer font-medium text-gray-900">
            View Video Script
          </summary>
          <div className="mt-3 text-sm text-gray-600">
            <p className="italic">Script location: {media.videoScript}</p>
            <p className="mt-2">
              Use this script with HeyGen, Synthesia, or D-ID to generate the video.
            </p>
          </div>
        </details>
      )}
    </div>
  );
}
```

---

## 🏠 Step 4: Homepage Hero with Master Video

**File:** `app/page.tsx` (or your homepage)

```tsx
import { CourseVideoPlayer } from '@/components/CourseVideoPlayer';
import { CourseCard } from '@/components/CourseCard';
import { getAllCourseMedia } from '@/lib/course-media';

export default function HomePage() {
  const courses = getAllCourseMedia();

  return (
    <div className="min-h-screen">
      {/* Hero Section with Master Video */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Text Content */}
            <div className="text-white">
              <h1 className="text-4xl font-bold lg:text-5xl">
                Welcome to Elevate for Humanity
              </h1>
              <p className="mt-4 text-lg text-blue-100">
                Launch your career with workforce-funded training programs
              </p>
              <div className="mt-8 flex gap-4">
                <a
                  href="/programs"
                  className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  Browse Programs
                </a>
                <a
                  href="/apply"
                  className="rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-blue-600"
                >
                  Apply Now
                </a>
              </div>
            </div>

            {/* Master Video */}
            <div>
              <div className="rounded-lg bg-white p-2 shadow-2xl">
                <video
                  className="w-full rounded-lg"
                  controls
                  poster="/images/video-poster.jpg"
                >
                  <source 
                    src="/videos/courses/about-elevate-for-humanity.mp4" 
                    type="video/mp4" 
                  />
                  <track
                    kind="captions"
                    src="/videos/courses/about-elevate-for-humanity.vtt"
                    srcLang="en"
                    label="English"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="mt-3 text-center text-sm text-blue-100">
                Meet your AI instructor and learn about our programs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            Explore Our Programs
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                courseId={course.id}
                title={course.name}
                description="Gain hands-on skills and industry certifications with WIOA funding support."
                duration="8-12 weeks"
                href={`/programs/${course.id}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

## 📄 Step 5: Individual Course Page

**File:** `app/programs/[courseId]/page.tsx`

```tsx
import { notFound } from 'next/navigation';
import { getCourseMedia } from '@/lib/course-media';
import { CourseVideoPlayer } from '@/components/CourseVideoPlayer';
import Image from 'next/image';

interface CoursePageProps {
  params: {
    courseId: string;
  };
}

export default function CoursePage({ params }: CoursePageProps) {
  const media = getCourseMedia(params.courseId);

  if (!media) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Cover Image */}
      <section className="relative h-96 bg-gray-900">
        {media.coverImage && (
          <Image
            src={media.coverImage}
            alt={media.name}
            fill
            className="object-cover opacity-60"
            priority
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold lg:text-5xl">{media.name}</h1>
            <p className="mt-4 text-xl">
              Start your career with workforce-funded training
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Video Player */}
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">
                  Program Overview
                </h2>
                <CourseVideoPlayer 
                  courseId={params.courseId} 
                  showScript={true}
                />
              </div>

              {/* Program Details */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900">
                  What You'll Learn
                </h3>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg className="mr-2 mt-1 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Industry-recognized certifications
                  </li>
                  <li className="flex items-start">
                    <svg className="mr-2 mt-1 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Hands-on training with real equipment
                  </li>
                  <li className="flex items-start">
                    <svg className="mr-2 mt-1 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Job placement assistance
                  </li>
                  <li className="flex items-start">
                    <svg className="mr-2 mt-1 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    WIOA funding support available
                  </li>
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                {/* Apply Card */}
                <div className="rounded-lg bg-blue-600 p-6 text-white shadow-lg">
                  <h3 className="text-xl font-bold">Ready to Start?</h3>
                  <p className="mt-2 text-blue-100">
                    Apply now and take the first step toward your new career.
                  </p>
                  <a
                    href="/apply"
                    className="mt-4 block rounded-lg bg-white px-6 py-3 text-center font-semibold text-blue-600 transition hover:bg-blue-50"
                  >
                    Apply Now
                  </a>
                </div>

                {/* Info Card */}
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-900">Program Info</h4>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="font-medium text-gray-500">Duration</dt>
                      <dd className="text-gray-900">8-12 weeks</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">Format</dt>
                      <dd className="text-gray-900">Hybrid (Online + In-person)</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">Cost</dt>
                      <dd className="text-gray-900">WIOA funding available</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

## 🎯 Step 6: Generate Images & Videos

### Generate Course Cover Images

**Option 1: OpenAI API (Automated)**
```bash
export OPENAI_API_KEY="your-key"
node scripts/generate-images.mjs
```

**Option 2: Manual (Copy prompts)**
```bash
# Copy prompt
cat content/image-prompts/courses/hvac-course-cover.md

# Paste into:
# - ChatGPT Plus (DALL-E 3)
# - Leonardo.ai
# - Midjourney
# - Stable Diffusion

# Save to: public/images/courses/hvac-cover.jpg
```

### Generate Course Videos

**Using HeyGen:**
1. Go to https://heygen.com
2. Create new video
3. Copy script from `content/video-scripts/courses/hvac-program-video.md`
4. Choose avatar and voice
5. Generate and download
6. Save to: `public/videos/courses/hvac-program.mp4`

**Using D-ID (Free Tier):**
1. Go to https://d-id.com
2. Create new video
3. Copy script from video-scripts
4. Generate and download
5. Save to public/videos/courses/

---

## 📝 Checklist

- [ ] Run `./setup-course-covers-and-scripts.sh`
- [ ] Create `lib/course-media.ts` config
- [ ] Create `components/CourseCard.tsx`
- [ ] Create `components/CourseVideoPlayer.tsx`
- [ ] Update homepage with master video
- [ ] Create course detail pages
- [ ] Generate 5 course cover images
- [ ] Generate 6 AI instructor videos
- [ ] Add video captions (VTT files)
- [ ] Test all pages and videos
- [ ] Optimize images (Next.js Image)
- [ ] Add loading states

---

## 🚀 Next Steps

1. **Generate Media Assets:**
   - Use prompts to create images
   - Use scripts to create videos

2. **Organize Files:**
   ```
   public/
   ├── images/courses/
   │   ├── hvac-cover.jpg
   │   ├── barber-cover.jpg
   │   ├── cna-cover.jpg
   │   ├── cdl-cover.jpg
   │   └── building-tech-cover.jpg
   │
   └── videos/courses/
       ├── about-elevate-for-humanity.mp4
       ├── hvac-program.mp4
       ├── barber-program.mp4
       ├── healthcare-cna-program.mp4
       ├── cdl-program.mp4
       └── building-tech-program.mp4
   ```

3. **Add Captions:**
   - Generate VTT files for accessibility
   - Place alongside videos with .vtt extension

4. **Test & Deploy:**
   - Test all course pages
   - Verify video playback
   - Check image loading
   - Deploy to production

---

**Questions?** Check the video scripts in `content/video-scripts/courses/` and image prompts in `content/image-prompts/courses/`
