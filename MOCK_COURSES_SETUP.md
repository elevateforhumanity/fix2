# 🎓 Mock Courses Setup (Testing Without Supabase)

**Purpose**: Test course functionality without database  
**Time**: 5 minutes  
**Use Case**: Development, testing, demos

---

## 🎯 Overview

This guide shows you how to test the course system using mock data when:

- You don't have Supabase credentials yet
- You want to test the UI before migration
- You're doing local development
- You need to demo the platform

---

## 📋 Option 1: Use Static Course Data

### A. Create Mock Courses File

Create `lib/mock-courses.ts`:

```typescript
export const mockCourses = [
  {
    id: 1,
    slug: 'hvac-technician',
    title: 'HVAC Technician Training',
    subtitle: 'Master heating, ventilation, and air conditioning systems',
    description:
      '600-hour program covering HVAC installation, maintenance, and repair with EPA 608 certification.',
    level: 'beginner',
    duration_hours: 600,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Elevate for Humanity / Trade School Partner',
      cip_code: '47.0201',
      credentials: ['EPA 608', 'HVAC Certification'],
      format: 'Hybrid',
    },
  },
  {
    id: 2,
    slug: 'barber-apprenticeship',
    title: 'Barber Apprenticeship Program',
    subtitle: 'Earn while you learn - DOL Registered Apprenticeship',
    description:
      '1,500-hour apprenticeship combining classroom and shop training.',
    level: 'beginner',
    duration_hours: 1500,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Elevate for Humanity / Licensed Barbershop',
      cip_code: '12.0402',
      credentials: ['State Barber License'],
      format: 'Apprenticeship',
    },
  },
  {
    id: 3,
    slug: 'medical-assistant',
    title: 'Medical Assistant Program',
    subtitle: 'Clinical and administrative healthcare training',
    description:
      '720-hour program preparing students for Certified Medical Assistant certification.',
    level: 'beginner',
    duration_hours: 720,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Elevate for Humanity / Healthcare Partner',
      cip_code: '51.0801',
      credentials: ['Certified Medical Assistant (CMA)'],
      format: 'Hybrid',
    },
  },
  {
    id: 4,
    slug: 'business-startup-marketing',
    title: 'Business Start-Up & Marketing Program',
    subtitle: 'Launch your own business with Rise Forward',
    description:
      'Learn entrepreneurship, digital marketing, LLC formation, and business planning.',
    level: 'beginner',
    duration_hours: 32,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Rise Forward / Elevate for Humanity',
      cip_code: '52.0701',
      credentials: [
        'Certificate of Completion',
        'Retail Industry Fundamentals',
      ],
      format: '100% Online',
    },
  },
  {
    id: 5,
    slug: 'direct-support-professional',
    title: 'Direct Support Professional (DSP)',
    subtitle: 'Support individuals with disabilities',
    description: '120-hour program preparing students for DSP certification.',
    level: 'beginner',
    duration_hours: 120,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Elevate for Humanity',
      cip_code: '51.1599',
      credentials: ['DSP Certification', 'CPR/First Aid'],
      format: 'Hybrid',
    },
  },
  {
    id: 6,
    slug: 'professional-esthetician',
    title: 'Professional Esthetician Program',
    subtitle: 'Skincare and beauty specialist training',
    description: '700-hour program leading to state esthetician license.',
    level: 'beginner',
    duration_hours: 700,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Elevate for Humanity / Licensed School',
      cip_code: '12.0409',
      credentials: ['State Esthetician License'],
      format: 'Hybrid',
    },
  },
  {
    id: 7,
    slug: 'tax-prep-financial-services',
    title: 'Tax Preparation & Financial Services',
    subtitle: 'Become a certified tax preparer',
    description:
      '80-hour program preparing students for tax preparation certification.',
    level: 'beginner',
    duration_hours: 80,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Elevate for Humanity',
      cip_code: '52.0803',
      credentials: ['IRS PTIN', 'Tax Preparer Certification'],
      format: '100% Online',
    },
  },
  {
    id: 8,
    slug: 'public-safety-reentry-specialist',
    title: 'Public Safety Reentry Specialist',
    subtitle: 'Support justice-involved individuals',
    description:
      '160-hour program preparing students for reentry specialist certification.',
    level: 'beginner',
    duration_hours: 160,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Elevate for Humanity',
      cip_code: '43.0103',
      credentials: ['Reentry Specialist Certification'],
      format: 'Hybrid',
    },
  },
  {
    id: 9,
    slug: 'beauty-career-educator',
    title: 'Beauty & Career Educator Training',
    subtitle: 'Train the next generation of beauty professionals',
    description:
      '240-hour program preparing experienced beauty professionals to become educators.',
    level: 'intermediate',
    duration_hours: 240,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Elevate for Humanity',
      cip_code: '12.0413',
      credentials: ['Career Educator Certification'],
      format: 'Hybrid',
    },
  },
  {
    id: 10,
    slug: 'certified-peer-support-professional',
    title: 'Certified Peer Support Professional',
    subtitle: 'Support individuals in recovery',
    description:
      '80-hour program preparing students for peer support certification.',
    level: 'beginner',
    duration_hours: 80,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Elevate for Humanity',
      cip_code: '51.1508',
      credentials: ['Peer Support Specialist Certification'],
      format: 'Hybrid',
    },
  },
  {
    id: 11,
    slug: 'certified-peer-recovery-coach',
    title: 'Certified Peer Recovery Coach',
    subtitle: 'Guide others on their recovery journey',
    description:
      '80-hour program preparing students for recovery coach certification.',
    level: 'beginner',
    duration_hours: 80,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Elevate for Humanity',
      cip_code: '51.1508',
      credentials: ['Recovery Coach Certification'],
      format: 'Hybrid',
    },
  },
  {
    id: 12,
    slug: 'cpr-certification',
    title: 'CPR & First Aid Certification',
    subtitle: 'Life-saving skills training',
    description: '8-hour program leading to CPR/AED/First Aid certification.',
    level: 'beginner',
    duration_hours: 8,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Elevate for Humanity / AHA Certified',
      cip_code: '51.0904',
      credentials: ['CPR/AED/First Aid Certification'],
      format: 'In-person',
    },
  },
  {
    id: 13,
    slug: 'certified-community-healthcare-worker',
    title: 'Certified Community Healthcare Worker',
    subtitle: 'Bridge healthcare and community',
    description:
      '160-hour program preparing students for community health worker certification.',
    level: 'beginner',
    duration_hours: 160,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Elevate for Humanity',
      cip_code: '51.0000',
      credentials: ['Community Health Worker Certification'],
      format: 'Hybrid',
    },
  },
  {
    id: 14,
    slug: 'emergency-health-safety-tech',
    title: 'Emergency Health & Safety Technician',
    subtitle: 'Workplace safety and emergency response',
    description: '40-hour program covering CPR, First Aid, and OSHA 10.',
    level: 'beginner',
    duration_hours: 40,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Elevate for Humanity',
      cip_code: '51.0904',
      credentials: ['CPR/AED', 'First Aid', 'OSHA 10'],
      format: 'Hybrid',
    },
  },
  {
    id: 15,
    slug: 'nrf-rise-up-complete',
    title: 'NRF Rise Up Certificate',
    subtitle: 'Retail industry fundamentals',
    description:
      '40-hour online program covering retail customer service and operations.',
    level: 'beginner',
    duration_hours: 40,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'National Retail Federation / Elevate for Humanity',
      cip_code: '52.1801',
      credentials: ['NRF Customer Service Certification'],
      format: '100% Online',
    },
  },
  {
    id: 16,
    slug: 'jri-complete-series',
    title: 'JRI Complete Series',
    subtitle: 'Justice Reinvestment Initiative training',
    description: '120-hour program for justice-involved individuals.',
    level: 'beginner',
    duration_hours: 120,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'JRI / Elevate for Humanity',
      cip_code: '43.0103',
      credentials: ['JRI Facilitator Certification'],
      format: 'Hybrid',
    },
  },
  {
    id: 17,
    slug: 'rise-up-certificate',
    title: 'Rise Up Certificate',
    subtitle: 'Retail industry fundamentals',
    description: '40-hour online program covering retail basics.',
    level: 'beginner',
    duration_hours: 40,
    status: 'published',
    is_free: true,
    created_at: '2025-01-01T00:00:00Z',
    metadata: {
      provider: 'Rise Forward / Elevate for Humanity',
      cip_code: '52.1801',
      credentials: ['Retail Industry Fundamentals'],
      format: '100% Online',
    },
  },
];

export function getMockCourses() {
  return mockCourses;
}

export function getMockCourseBySlug(slug: string) {
  return mockCourses.find((c) => c.slug === slug);
}

export function getMockCourseById(id: number) {
  return mockCourses.find((c) => c.id === id);
}
```

### B. Update Admin Courses Page

Modify `app/admin/courses/page.tsx` to use mock data when Supabase is not available:

```typescript
// At the top of the file
import { mockCourses } from '@/lib/mock-courses';

// In the component
export default async function AdminCoursesPage() {
  await requireAdmin();

  let courses = null;
  let error = null;

  try {
    const supabase = await createServerSupabaseClient();
    const result = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    courses = result.data;
    error = result.error;
  } catch (e) {
    // Supabase not configured, use mock data
    console.log('Using mock courses data');
    courses = mockCourses;
  }

  // If no courses from database, use mock data
  if (!courses || courses.length === 0) {
    courses = mockCourses;
  }

  // Rest of component...
}
```

---

## 📋 Option 2: Use Environment Flag

### A. Add Mock Mode Flag

In `.env.local`:

```bash
# Development Mode
USE_MOCK_DATA=true
```

### B. Create Data Service

Create `lib/data-service.ts`:

```typescript
import { mockCourses } from './mock-courses';
import { createServerSupabaseClient } from './auth';

export async function getCourses() {
  // Check if using mock data
  if (process.env.USE_MOCK_DATA === 'true') {
    return { data: mockCourses, error: null };
  }

  // Use real Supabase
  try {
    const supabase = await createServerSupabaseClient();
    return await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
  } catch (error) {
    // Fallback to mock data
    console.log('Supabase error, using mock data');
    return { data: mockCourses, error: null };
  }
}

export async function getCourseBySlug(slug: string) {
  if (process.env.USE_MOCK_DATA === 'true') {
    const course = mockCourses.find((c) => c.slug === slug);
    return { data: course, error: null };
  }

  try {
    const supabase = await createServerSupabaseClient();
    return await supabase.from('courses').select('*').eq('slug', slug).single();
  } catch (error) {
    const course = mockCourses.find((c) => c.slug === slug);
    return { data: course, error: null };
  }
}
```

### C. Use Data Service

In your pages:

```typescript
import { getCourses } from '@/lib/data-service';

export default async function AdminCoursesPage() {
  const { data: courses, error } = await getCourses();

  // Rest of component...
}
```

---

## 📋 Option 3: Test Pages Directly

### Test These URLs:

1. **Admin Courses**: `/admin/courses`
   - Should show 17 mock courses
   - Should display course cards
   - Should show enrollment counts (0 for mock)

2. **Student Courses**: `/student/courses`
   - Should show available courses
   - Should allow browsing
   - Enrollment will show "Connect Supabase" message

3. **Programs Page**: `/programs`
   - Already working with static data
   - Shows 12 program pages

---

## 🎉 Benefits of Mock Data

### Advantages:

- ✅ Test UI without database
- ✅ Fast development iteration
- ✅ Demo platform to stakeholders
- ✅ No Supabase costs during development
- ✅ Works offline
- ✅ Consistent test data

### Limitations:

- ❌ No real enrollment
- ❌ No progress tracking
- ❌ No certificate generation
- ❌ No data persistence
- ❌ No user authentication

---

## 🚀 When to Use Real Database

Switch to real Supabase when you need:

- Real student enrollments
- Progress tracking
- Certificate generation
- Multi-user access
- Data persistence
- Production deployment
- Compliance reporting

---

## 📞 Next Steps

### For Development:

1. Use mock data for UI testing
2. Build features with mock data
3. Test user flows
4. Refine designs

### For Production:

1. Set up Supabase account
2. Run migrations (see ACTIVATE_COURSES_NOW.md)
3. Update environment variables
4. Deploy to production
5. Test with real data

---

**Current Status**: Mock data ready for testing  
**Time to Switch**: 30 minutes (run migrations)  
**Cost**: $0 (free Supabase tier)

---

_Last Updated: November 19, 2025_  
_Document: MOCK_COURSES_SETUP.md_
