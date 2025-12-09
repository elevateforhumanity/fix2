# Upload JRI SCORM Packages to Your Platform

## What You Have

8 JRI SCORM packages ready to upload:
- Location: `/workspaces/fix2/lms-content/jri/`
- Format: SCORM 2004 3rd Edition
- Size: ~62KB each
- Total: ~500KB

## Option 1: Upload to Supabase Storage (Easiest)

### Step 1: Create Storage Bucket

1. Go to Supabase Dashboard: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/storage/buckets
2. Click "New bucket"
3. Name: `scorm-packages`
4. Public: Yes (so students can access)
5. Click "Create bucket"

### Step 2: Upload SCORM Files

1. Click on `scorm-packages` bucket
2. Create folder: `jri`
3. Upload all 8 .zip files from `/workspaces/fix2/lms-content/jri/`
4. Copy the public URLs for each file

### Step 3: Add URLs to Database

```sql
-- Update JRI courses with SCORM package URLs
DO $$
DECLARE
  jri_id UUID;
BEGIN
  SELECT id INTO jri_id FROM partner_lms_providers WHERE provider_type = 'jri';
  
  -- Introduction
  UPDATE partner_courses 
  SET metadata = jsonb_set(
    metadata,
    '{scorm_url}',
    '"https://cuxzzpsyufcewtmicszk.supabase.co/storage/v1/object/public/scorm-packages/jri/0-jri-introduction.zip"'
  )
  WHERE provider_id = jri_id AND course_code = 'JRI-INTRO';
  
  -- Badge 1: Mindsets
  UPDATE partner_courses 
  SET metadata = jsonb_set(
    metadata,
    '{scorm_url}',
    '"https://cuxzzpsyufcewtmicszk.supabase.co/storage/v1/object/public/scorm-packages/jri/1-jri-badge-1-mindsets.zip"'
  )
  WHERE provider_id = jri_id AND course_code = 'JRI-MINDSETS';
  
  -- Badge 2: Self-Management
  UPDATE partner_courses 
  SET metadata = jsonb_set(
    metadata,
    '{scorm_url}',
    '"https://cuxzzpsyufcewtmicszk.supabase.co/storage/v1/object/public/scorm-packages/jri/2-jri-badge-2-self-management.zip"'
  )
  WHERE provider_id = jri_id AND course_code = 'JRI-SELF-MGMT';
  
  -- Badge 3: Learning Strategies
  UPDATE partner_courses 
  SET metadata = jsonb_set(
    metadata,
    '{scorm_url}',
    '"https://cuxzzpsyufcewtmicszk.supabase.co/storage/v1/object/public/scorm-packages/jri/3-jri-badge-3-learning-strategies.zip"'
  )
  WHERE provider_id = jri_id AND course_code = 'JRI-LEARNING';
  
  -- Badge 4: Social Skills
  UPDATE partner_courses 
  SET metadata = jsonb_set(
    metadata,
    '{scorm_url}',
    '"https://cuxzzpsyufcewtmicszk.supabase.co/storage/v1/object/public/scorm-packages/jri/4-jri-badge-4-social-skills.zip"'
  )
  WHERE provider_id = jri_id AND course_code = 'JRI-SOCIAL';
  
  -- Badge 5: Workplace Skills
  UPDATE partner_courses 
  SET metadata = jsonb_set(
    metadata,
    '{scorm_url}',
    '"https://cuxzzpsyufcewtmicszk.supabase.co/storage/v1/object/public/scorm-packages/jri/5-jri-badge-5-workplace-skills.zip"'
  )
  WHERE provider_id = jri_id AND course_code = 'JRI-WORKPLACE';
  
  -- Badge 6: Launch a Career
  UPDATE partner_courses 
  SET metadata = jsonb_set(
    metadata,
    '{scorm_url}',
    '"https://cuxzzpsyufcewtmicszk.supabase.co/storage/v1/object/public/scorm-packages/jri/6-jri-badge-6-launch-career.zip"'
  )
  WHERE provider_id = jri_id AND course_code = 'JRI-CAREER';
  
END $$;
```

---

## Option 2: Use SCORM Cloud (Recommended for Production)

### Why SCORM Cloud?
- Handles all SCORM playback
- Tracks student progress automatically
- No server setup needed
- API for integration
- Free tier available

### Setup Steps:

1. **Sign up for SCORM Cloud**
   - Go to: https://cloud.scorm.com/
   - Create free account
   - Get API credentials

2. **Upload SCORM Packages**
   - Login to SCORM Cloud dashboard
   - Click "Upload Course"
   - Upload each of the 8 JRI .zip files
   - Get course IDs

3. **Integrate with Your Platform**

```typescript
// lib/scorm-cloud.ts
export async function launchSCORMCourse(
  courseId: string,
  studentId: string,
  studentName: string
) {
  const registrationId = `${studentId}-${courseId}`;
  
  // Create registration
  const response = await fetch('https://cloud.scorm.com/api/v2/registrations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SCORM_CLOUD_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      courseId: courseId,
      registrationId: registrationId,
      learner: {
        id: studentId,
        firstName: studentName.split(' ')[0],
        lastName: studentName.split(' ')[1] || ''
      }
    })
  });
  
  const data = await response.json();
  return data.launchLink; // URL to launch SCORM course
}
```

4. **Add Launch Button to Your Platform**

```typescript
// app/student/courses/[courseId]/page.tsx
export default function CoursePage({ params }) {
  const handleLaunchSCORM = async () => {
    const launchUrl = await launchSCORMCourse(
      'jri-badge-1-mindsets',
      user.id,
      user.full_name
    );
    
    // Open in new window
    window.open(launchUrl, '_blank', 'width=1024,height=768');
  };
  
  return (
    <button onClick={handleLaunchSCORM}>
      Start Course
    </button>
  );
}
```

---

## Option 3: Self-Hosted SCORM Player

### Use Open Source SCORM Player

**Recommended:** SCORM Again (https://github.com/jcputney/scorm-again)

```bash
npm install scorm-again
```

```typescript
// lib/scorm-player.ts
import Scorm12API from 'scorm-again/src/Scorm12API';

export function initializeSCORMPlayer(scormPackageUrl: string) {
  const API = new Scorm12API();
  
  // Load SCORM package
  const iframe = document.createElement('iframe');
  iframe.src = scormPackageUrl;
  
  // Track progress
  API.on('LMSSetValue', (CMIElement, value) => {
    console.log(`${CMIElement} = ${value}`);
    // Save to database
  });
  
  return API;
}
```

---

## Quick Start: Add JRI Courses to Database

Run this SQL to add JRI course details:

```sql
-- Add JRI course details
DO $$
DECLARE
  jri_id UUID;
BEGIN
  SELECT id INTO jri_id FROM partner_lms_providers WHERE provider_type = 'jri';
  
  -- Update existing JRI courses with better descriptions
  UPDATE partner_courses 
  SET 
    description = 'Introduction to Job Readiness Initiative - Overview of soft skills and workplace competencies',
    hours = 1,
    metadata = jsonb_build_object(
      'badge_number', 0,
      'type', 'introduction',
      'scorm_version', 'SCORM 2004 3rd Edition'
    )
  WHERE provider_id = jri_id AND course_name = 'Introduction to Job Ready Indy';
  
  UPDATE partner_courses 
  SET 
    description = 'Develop growth mindset and positive thinking for workplace success',
    hours = 2,
    metadata = jsonb_build_object(
      'badge_number', 1,
      'type', 'badge',
      'scorm_version', 'SCORM 2004 3rd Edition'
    )
  WHERE provider_id = jri_id AND course_name LIKE '%Mindsets%';
  
  UPDATE partner_courses 
  SET 
    description = 'Master time management, organization, and self-discipline',
    hours = 2,
    metadata = jsonb_build_object(
      'badge_number', 2,
      'type', 'badge',
      'scorm_version', 'SCORM 2004 3rd Edition'
    )
  WHERE provider_id = jri_id AND course_name LIKE '%Self-Management%';
  
  UPDATE partner_courses 
  SET 
    description = 'Learn effective learning techniques and study strategies',
    hours = 2,
    metadata = jsonb_build_object(
      'badge_number', 3,
      'type', 'badge',
      'scorm_version', 'SCORM 2004 3rd Edition'
    )
  WHERE provider_id = jri_id AND course_name LIKE '%Learning Strategies%';
  
  UPDATE partner_courses 
  SET 
    description = 'Build communication, teamwork, and interpersonal skills',
    hours = 2,
    metadata = jsonb_build_object(
      'badge_number', 4,
      'type', 'badge',
      'scorm_version', 'SCORM 2004 3rd Edition'
    )
  WHERE provider_id = jri_id AND course_name LIKE '%Social Skills%';
  
  UPDATE partner_courses 
  SET 
    description = 'Develop professional workplace behaviors and work ethic',
    hours = 2,
    metadata = jsonb_build_object(
      'badge_number', 5,
      'type', 'badge',
      'scorm_version', 'SCORM 2004 3rd Edition'
    )
  WHERE provider_id = jri_id AND course_name LIKE '%Workplace Skills%';
  
  UPDATE partner_courses 
  SET 
    description = 'Job search strategies, resume building, and career planning',
    hours = 2,
    metadata = jsonb_build_object(
      'badge_number', 6,
      'type', 'badge',
      'scorm_version', 'SCORM 2004 3rd Edition'
    )
  WHERE provider_id = jri_id AND course_name LIKE '%Career%';
  
END $$;

-- Verify updates
SELECT 
  course_name,
  hours,
  metadata->>'badge_number' as badge,
  metadata->>'scorm_version' as scorm_version
FROM partner_courses
WHERE provider_id = (SELECT id FROM partner_lms_providers WHERE provider_type = 'jri')
ORDER BY (metadata->>'badge_number')::int;
```

---

## Summary: What You Need to Do

### TODAY (15 minutes):
1. ✅ Go to Supabase Storage
2. ✅ Create `scorm-packages` bucket
3. ✅ Upload 8 JRI .zip files
4. ✅ Copy public URLs

### THIS WEEK (2 hours):
1. Choose SCORM player (SCORM Cloud recommended)
2. Integrate SCORM player into your platform
3. Add "Start Course" buttons
4. Test with one JRI module

### NEXT WEEK (4 hours):
1. Complete all 8 JRI modules
2. Test student enrollment
3. Verify progress tracking
4. Launch to students!

---

## You're Ready!

You have:
- ✅ 8 JRI SCORM packages
- ✅ Database seeded with JRI courses
- ✅ Partner provider configured
- ✅ Platform infrastructure ready

**Just need to:**
1. Upload SCORM files to storage
2. Add SCORM player to your platform
3. Students can start learning!

**No API needed - you have the actual course files!** 🎉
