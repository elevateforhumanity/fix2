# AI Instructor & Certificate System

Complete implementation of AI-powered instruction and automated certificate generation/delivery for the Elevate for Humanity LMS.

## Features Implemented

### 1. AI Instructor with Voice

**Text-to-Speech Integration**
- Browser-native speech synthesis (free, no API required)
- Automatic voice guidance throughout courses
- Customizable messages for different contexts
- Mute/unmute controls
- Visual feedback during speech

**Key Components:**
- `components/ai/AIInstructorClient.tsx` - Main AI instructor UI
- `lib/hooks/useAIInstructor.ts` - React hooks for AI guidance
- Integrated into lesson pages automatically

**Usage in Lessons:**
```tsx
import { AIInstructorClient } from '@/components/ai/AIInstructorClient';

<AIInstructorClient 
  lessonTitle="Introduction to HVAC"
  context="lesson"
  autoSpeak={true}
/>
```

**Triggering Custom Messages:**
```tsx
import { useAIInstructor } from '@/lib/hooks/useAIInstructor';

const { triggerMessage } = useAIInstructor();

// Trigger predefined messages
triggerMessage('encouragement');
triggerMessage('completion');

// Or custom messages
triggerMessage('welcome', 'Welcome to this special lesson!');
```

### 2. Certificate Generation System

**Two Types of Certificates:**

1. **Module Certificates** - Issued by partner organizations
   - Generated when student completes a partner course module
   - Includes partner branding
   - Unique certificate number (format: `MOD-timestamp-random`)

2. **Program Certificates** - Issued by Elevate for Humanity
   - Generated when student completes all required certifications
   - Official Elevate branding
   - Unique certificate number (format: `PROG-timestamp-random`)

**Certificate Features:**
- PDF generation with professional design
- Unique verification numbers
- Public verification page
- Automatic storage in Supabase
- Email delivery with certificate attached
- In-app notifications

### 3. Certificate Delivery System

**Automatic Delivery:**
- Certificates automatically generated on module/program completion
- Email sent to student with PDF attachment
- In-app notification created
- Certificate added to student dashboard

**Email Templates:**
- Professional HTML emails
- Includes certificate details
- Download link
- Verification instructions
- Next steps guidance

### 4. Certificate Verification

**Public Verification Page:**
- URL: `/certificates/verify`
- Enter certificate number to verify authenticity
- Shows student name, course, issue date, issuer
- Tamper-proof verification

**Student Certificate Dashboard:**
- URL: `/student/certificates`
- View all earned certificates
- Download PDFs
- Share verification links
- Copy verification URL

## API Endpoints

### Issue Module Certificate
```
POST /api/certificates/issue-module
Body: { enrollmentId, moduleId }
Response: { success: true, certificateNumber }
```

### Issue Program Certificate
```
POST /api/certificates/issue-program
Body: { studentId, programId }
Response: { success: true, certificateNumber }
```

### Complete Module (Auto-Issue Certificate)
```
POST /api/certificates/complete-module
Body: { enrollmentId, moduleId }
Response: { success: true, message }
```

### Verify Certificate
```
GET /api/certificates/verify?number=CERT-NUMBER
Response: { valid: true, studentName, courseName, issuedDate, issuer, type }
```

## Database Tables

### student_certificates
```sql
CREATE TABLE student_certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES profiles(id),
  certificate_type TEXT CHECK (certificate_type IN ('module', 'program')),
  certificate_number TEXT UNIQUE NOT NULL,
  course_name TEXT NOT NULL,
  issued_date TIMESTAMPTZ DEFAULT NOW(),
  issuer TEXT NOT NULL,
  pdf_url TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Integration Guide

### Step 1: Add AI Instructor to Lessons

Edit your lesson page to include the AI instructor:

```tsx
import { AIInstructorClient } from '@/components/ai/AIInstructorClient';

export default function LessonPage({ params }) {
  return (
    <>
      <AIInstructorClient 
        lessonTitle={lesson.title}
        context="lesson"
      />
      {/* Rest of your lesson content */}
    </>
  );
}
```

### Step 2: Trigger Certificate on Module Completion

When a student completes a module:

```tsx
const handleModuleComplete = async () => {
  const response = await fetch('/api/certificates/complete-module', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      enrollmentId: enrollment.id,
      moduleId: module.id
    })
  });
  
  if (response.ok) {
    // Show success message
    // AI instructor will celebrate
    triggerMessage('certificate');
  }
};
```

### Step 3: Display Certificates to Students

Students can view their certificates at `/student/certificates`. The page automatically loads all certificates for the logged-in user.

### Step 4: Share Verification Link

Provide employers/institutions with the verification URL:
```
https://yourdomain.com/certificates/verify
```

They can enter the certificate number to verify authenticity.

## AI Instructor Message Types

| Type | When to Use | Default Message |
|------|-------------|-----------------|
| `welcome` | Student enters course | "Welcome! I'm your AI instructor..." |
| `lesson_start` | Lesson begins | "Great! Let's dive into this lesson..." |
| `quiz_start` | Quiz begins | "Time to test your knowledge!..." |
| `encouragement` | Student struggling | "You're doing great! Keep up..." |
| `completion` | Section completed | "Congratulations! You've completed..." |
| `certificate` | Certificate earned | "Amazing achievement! You've earned..." |

## Customization

### Custom AI Instructor Messages

```tsx
import { useAIInstructor } from '@/lib/hooks/useAIInstructor';

const { speak } = useAIInstructor();

// Speak any custom message
speak("This is a special announcement about today's lesson!");
```

### Custom Certificate Design

Edit `lib/certificates/certificate-generator.ts` to customize:
- Colors and branding
- Layout and typography
- Logo placement
- Border styles

### Email Templates

Edit `lib/certificates/certificate-delivery.ts` to customize:
- Email subject lines
- HTML template design
- Call-to-action buttons
- Footer content

## Testing

### Test Certificate Generation

1. Complete a module in a partner course
2. Check email for certificate delivery
3. Visit `/student/certificates` to see certificate
4. Download PDF
5. Verify at `/certificates/verify`

### Test AI Instructor

1. Visit any lesson page
2. AI instructor should appear and speak welcome message
3. Click mute button to silence
4. Click X to minimize
5. Trigger custom messages via hooks

## Troubleshooting

### AI Instructor Not Speaking

**Issue:** No voice output
**Solution:** 
- Check browser supports Web Speech API
- Ensure not muted
- Check browser audio permissions

### Certificate Not Generated

**Issue:** Module complete but no certificate
**Solution:**
- Check Supabase connection
- Verify enrollment exists
- Check module completion status
- Review server logs

### Certificate PDF Not Loading

**Issue:** PDF URL returns 404
**Solution:**
- Verify Supabase storage bucket exists
- Check storage permissions
- Ensure PDF was uploaded successfully

### Verification Fails

**Issue:** Valid certificate shows as invalid
**Solution:**
- Check certificate number format
- Verify database record exists
- Check Supabase connection

## Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Future Enhancements

### AI Instructor
- [ ] Premium voice options (ElevenLabs, Google Cloud TTS)
- [ ] Multiple language support
- [ ] Personalized learning recommendations
- [ ] Interactive Q&A with AI
- [ ] Voice commands for navigation

### Certificates
- [ ] Blockchain verification
- [ ] LinkedIn integration
- [ ] Batch certificate generation
- [ ] Custom certificate templates per program
- [ ] Digital badges
- [ ] Certificate expiration dates
- [ ] Continuing education credits

## Support

For issues or questions:
1. Check this documentation
2. Review code comments in implementation files
3. Check Supabase logs
4. Review browser console for errors

## Files Created

### Components
- `components/ai/AIInstructorClient.tsx`

### Hooks
- `lib/hooks/useAIInstructor.ts`

### Libraries
- `lib/certificates/certificate-generator.ts`
- `lib/certificates/certificate-delivery.ts`

### API Routes
- `app/api/certificates/issue-module/route.ts`
- `app/api/certificates/issue-program/route.ts`
- `app/api/certificates/complete-module/route.ts`
- `app/api/certificates/verify/route.ts`

### Pages
- `app/certificates/verify/page.tsx`
- `app/student/certificates/page.tsx` (updated)
- `app/lessons/[lessonId]/page.tsx` (updated)

## Success Metrics

Track these metrics to measure success:

1. **Certificate Completion Rate**
   - % of students who complete modules
   - % who earn program certificates

2. **AI Instructor Engagement**
   - % of students who keep AI instructor enabled
   - Average session duration with AI active

3. **Certificate Verification**
   - Number of verification requests
   - Verification success rate

4. **Student Satisfaction**
   - Feedback on AI instructor helpfulness
   - Certificate quality ratings

## Conclusion

This system provides a complete AI-powered learning experience with professional certification. Students receive guidance throughout their learning journey and earn verifiable credentials upon completion.

The implementation is production-ready and can be deployed immediately after configuring environment variables and running database migrations.
