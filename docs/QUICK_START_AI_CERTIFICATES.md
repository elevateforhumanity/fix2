# Quick Start: AI Instructor & Certificates

Get the AI instructor and certificate system running in 5 minutes.

## Prerequisites

- Supabase project configured
- Environment variables set
- Database migrations run

## Step 1: Run Database Migration

The certificate system requires a new table. Run this SQL in your Supabase SQL editor:

```sql
-- Create student_certificates table
CREATE TABLE IF NOT EXISTS student_certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  certificate_type TEXT CHECK (certificate_type IN ('module', 'program')),
  certificate_number TEXT UNIQUE NOT NULL,
  course_name TEXT NOT NULL,
  issued_date TIMESTAMPTZ DEFAULT NOW(),
  issuer TEXT NOT NULL,
  pdf_url TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_student_certificates_student_id ON student_certificates(student_id);
CREATE INDEX idx_student_certificates_number ON student_certificates(certificate_number);
CREATE INDEX idx_student_certificates_type ON student_certificates(certificate_type);

-- Enable RLS
ALTER TABLE student_certificates ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Students can view their own certificates"
  ON student_certificates FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Service role can insert certificates"
  ON student_certificates FOR INSERT
  WITH CHECK (true);

-- Create storage bucket for certificates
INSERT INTO storage.buckets (id, name, public)
VALUES ('certificates', 'certificates', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Anyone can view certificates"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'certificates');

CREATE POLICY "Service role can upload certificates"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'certificates');
```

## Step 2: Install Dependencies

The system uses `jspdf` for PDF generation:

```bash
pnpm install jspdf
```

## Step 3: Test AI Instructor

1. Navigate to any lesson page (e.g., `/lessons/[lessonId]`)
2. The AI instructor should appear in the bottom-right corner
3. It will automatically speak a welcome message
4. Click the mute button to silence
5. Click X to minimize

**Troubleshooting:**
- If no voice: Check browser supports Web Speech API (Chrome, Edge, Safari)
- If component doesn't appear: Check browser console for errors

## Step 4: Test Certificate Generation

### Manual Test (via API):

```bash
# Issue a module certificate
curl -X POST http://localhost:3000/api/certificates/issue-module \
  -H "Content-Type: application/json" \
  -d '{
    "enrollmentId": "your-enrollment-id",
    "moduleId": "your-module-id"
  }'

# Verify a certificate
curl http://localhost:3000/api/certificates/verify?number=MOD-1234567890-ABC123
```

### UI Test:

1. Complete a module in a partner course
2. Certificate should auto-generate
3. Check email for certificate delivery
4. Visit `/student/certificates` to see it
5. Click "Download PDF"
6. Visit `/certificates/verify` and enter certificate number

## Step 5: Customize (Optional)

### Change AI Instructor Voice

Edit `components/ai/AIInstructorClient.tsx`:

```tsx
const utterance = new SpeechSynthesisUtterance(text);
utterance.rate = 0.9;  // Speed (0.1 to 10)
utterance.pitch = 1;   // Pitch (0 to 2)
utterance.volume = 1;  // Volume (0 to 1)
```

### Customize Certificate Design

Edit `lib/certificates/certificate-generator.ts`:

```tsx
// Change colors
doc.setDrawColor(0, 102, 204);  // Border color (RGB)
doc.setTextColor(0, 102, 204);  // Text color (RGB)

// Change fonts
doc.setFontSize(36);  // Title size
doc.setFontSize(28);  // Name size
```

### Customize Email Templates

Edit `lib/certificates/certificate-delivery.ts`:

```tsx
await sendCertificateEmail({
  to: student.email,
  subject: `🎉 Your Certificate for ${module.name}`,  // Change subject
  html: `...`  // Edit HTML template
});
```

## Common Use Cases

### 1. Add AI Instructor to Custom Page

```tsx
import { AIInstructorClient } from '@/components/ai/AIInstructorClient';

export default function MyPage() {
  return (
    <>
      <AIInstructorClient 
        lessonTitle="My Custom Content"
        context="general"
      />
      {/* Your content */}
    </>
  );
}
```

### 2. Trigger Custom AI Message

```tsx
import { useAIInstructor } from '@/lib/hooks/useAIInstructor';

function MyComponent() {
  const { speak } = useAIInstructor();
  
  const handleSuccess = () => {
    speak("Great job! You've completed this task.");
  };
  
  return <button onClick={handleSuccess}>Complete</button>;
}
```

### 3. Issue Certificate Programmatically

```tsx
import { issueModuleCertificate } from '@/lib/certificates/certificate-generator';

async function awardCertificate(enrollmentId: string, moduleId: string) {
  try {
    const certNumber = await issueModuleCertificate(enrollmentId, moduleId);
    console.log('Certificate issued:', certNumber);
  } catch (error) {
    console.error('Failed to issue certificate:', error);
  }
}
```

### 4. Check if Student Has Certificate

```tsx
const { data: certificates } = await supabase
  .from('student_certificates')
  .select('*')
  .eq('student_id', userId)
  .eq('certificate_type', 'program');

const hasProgramCert = certificates && certificates.length > 0;
```

## Verification

### Test Checklist

- [ ] AI instructor appears on lesson pages
- [ ] AI instructor speaks welcome message
- [ ] Mute button works
- [ ] Module certificate generates on completion
- [ ] Certificate appears in student dashboard
- [ ] Certificate PDF downloads
- [ ] Certificate verification works
- [ ] Email notification sent (check spam folder)
- [ ] Program certificate generates after all modules complete

## Next Steps

1. **Customize branding** - Update certificate design with your logo
2. **Configure email** - Set up SendGrid/Resend for email delivery
3. **Add analytics** - Track certificate issuance and verification
4. **Premium voice** - Integrate ElevenLabs or Google Cloud TTS
5. **Blockchain** - Add blockchain verification for certificates

## Support

- **Documentation**: See `docs/AI_INSTRUCTOR_AND_CERTIFICATES.md`
- **Code**: Check inline comments in implementation files
- **Issues**: Review browser console and server logs

## Production Checklist

Before deploying to production:

- [ ] Environment variables configured in Vercel
- [ ] Database migrations run in production Supabase
- [ ] Storage bucket created and configured
- [ ] Email service configured (SendGrid/Resend)
- [ ] Certificate templates tested
- [ ] AI instructor tested in production
- [ ] Verification page accessible publicly
- [ ] SSL certificate valid
- [ ] Backup strategy for certificates

## Performance Tips

1. **Certificate Generation**: Runs server-side, no impact on client
2. **AI Instructor**: Uses browser API, no server load
3. **PDF Storage**: Stored in Supabase, CDN-delivered
4. **Verification**: Cached for 1 hour (add caching if needed)

## Security Notes

- Certificate numbers are cryptographically random
- PDFs stored in public bucket (no sensitive data)
- Verification is public (by design)
- Student data protected by RLS policies
- Service role key required for certificate issuance

## Troubleshooting

### "Module not found" errors
- Run `pnpm install` to ensure all dependencies installed
- Check import paths are correct

### Certificates not generating
- Verify Supabase service role key is set
- Check enrollment and module IDs are valid
- Review server logs for errors

### AI instructor not speaking
- Check browser compatibility (Chrome/Edge/Safari)
- Ensure audio permissions granted
- Try unmuting and remuting

### Email not sending
- Verify email service configured
- Check spam folder
- Review email service logs

## Success!

You now have a complete AI instructor and certificate system running. Students will receive guided instruction throughout their courses and earn verifiable certificates upon completion.

For advanced features and customization, see the full documentation in `docs/AI_INSTRUCTOR_AND_CERTIFICATES.md`.
