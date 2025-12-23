# Tooltip Language Patterns

**Use these exact patterns across the site.**

## Standard Tooltips

### "Why do I see this?"

> This section shows what's required for your next step.

### "Why is this empty?"

> This will update after you complete the step listed above.

### "What happens if I submit this?"

> Your information is saved and reviewed by staff. You'll see updates here.

### "Why can't I access this yet?"

> This step unlocks after you complete the requirements shown on this page.

### "Who can see this?"

> Only you and authorized staff working with your program.

---

## Dashboard-Specific Tooltips

### Empty Course List

> You haven't enrolled in any courses yet. Browse programs to get started.

### Empty Hours Log

> Your hours will appear here after you log time and your instructor verifies it.

### Empty Certifications

> Certifications you earn will be listed here. Complete your program requirements to earn your first certification.

### Empty Messages

> You have no new messages. Staff will contact you here if they need information.

### Empty Assignments

> No assignments are due right now. New assignments appear when your instructor posts them.

---

## Form Field Tooltips

### Required Field

> This information is required to process your application.

### Optional Field

> This information is optional but helps us serve you better.

### Document Upload

> Upload a clear photo or scan. Accepted formats: PDF, JPG, PNG. Maximum size: 10MB.

### Date Field

> Use MM/DD/YYYY format or click the calendar icon.

### Phone Number

> Include area code. Format: (555) 123-4567

---

## Application Status Tooltips

### "Under Review"

> Staff are reviewing your application. You'll receive an update within 5-7 business days.

### "Additional Information Needed"

> Check your messages for what's needed. Your application will be reviewed after you provide it.

### "Accepted"

> Congratulations! Check your messages for enrollment instructions.

### "Waitlisted"

> You qualify but the program is full. You'll be notified if a spot opens.

### "Not Accepted"

> Your application was reviewed but you don't meet requirements at this time. Check your messages for next steps.

---

## Progress Indicators

### Course Progress Bar

> Shows percentage of course completed based on assignments, quizzes, and attendance.

### Hours Progress

> Shows hours completed out of total required. Updates after instructor verification.

### Skill Mastery

> Shows skills you've demonstrated. Updates after instructor assessment.

---

## Error Messages (Clear and Actionable)

### Missing Required Field

> Please fill in [field name] to continue.

### Invalid Format

> [Field name] must be in [format] format. Example: [example]

### File Too Large

> File size must be under 10MB. Try compressing your file or taking a clearer photo.

### Upload Failed

> Upload failed. Check your internet connection and try again.

### Session Expired

> Your session expired for security. Please log in again.

---

## Success Messages

### Application Submitted

> Your application was submitted successfully. You'll receive a confirmation email within a few minutes.

### Document Uploaded

> Document uploaded successfully. Staff will review it within 2 business days.

### Profile Updated

> Your profile was updated successfully.

### Hours Logged

> Hours logged successfully. Your instructor will verify them within 2 business days.

---

## Help and Support Tooltips

### Contact Support

> Get help with technical issues, account access, or general questions. Response time: 1 business day.

### Program Coordinator

> Contact the person who manages this program. They can answer questions about requirements, schedule, and enrollment.

### Emergency Support

> Use this only for urgent issues that prevent you from completing required tasks with an immediate deadline.

---

## Privacy and Security Tooltips

### Password Requirements

> Must be at least 8 characters with one uppercase letter, one number, and one special character.

### Two-Factor Authentication

> Adds extra security to your account. You'll receive a code by text or email when you log in.

### Data Privacy

> Your information is encrypted and only shared with authorized staff. See our privacy policy for details.

---

## Accessibility Tooltips

### Screen Reader Mode

> Optimizes the site for screen readers. Turn on in your accessibility settings.

### Text Size

> Adjust text size in your browser settings. Press Ctrl + Plus to increase, Ctrl + Minus to decrease.

### Keyboard Navigation

> Navigate using Tab (forward), Shift+Tab (backward), Enter (select), and Escape (close).

---

## Implementation Guidelines

### Tooltip Placement

- Place tooltips next to the element they explain
- Use question mark icon (?) for optional help
- Use info icon (i) for important context
- Always make tooltips keyboard accessible

### Tooltip Behavior

- Show on hover (desktop) or tap (mobile)
- Dismiss on click outside or Escape key
- Keep visible until user dismisses
- Don't auto-hide critical information

### Tooltip Content Rules

- Maximum 2 sentences
- Start with the answer, not background
- Use active voice ("You'll receive..." not "An email will be sent...")
- Include specific timeframes when relevant
- Avoid technical jargon

### Testing Tooltips

Every tooltip must answer:

1. What does this mean?
2. Why does it matter to me?
3. What should I do (if anything)?

If a tooltip doesn't answer all three, rewrite it.

---

## Pattern: Cause → Action → Result

**Bad tooltip:**

> This field is for your address.

**Good tooltip:**

> We need your address to send you program materials. Enter your current mailing address.

**Bad tooltip:**

> Click here to continue.

**Good tooltip:**

> Click Submit to save your application. You'll receive a confirmation email within a few minutes.

**Bad tooltip:**

> This section is empty.

**Good tooltip:**

> Your assignments will appear here after your instructor posts them. Check back after your first class.

---

## Localization Notes

When translating tooltips:

- Maintain the cause → action → result pattern
- Keep timeframes specific (don't change "5-7 days" to "soon")
- Preserve the direct, active voice
- Test with native speakers for clarity
- Ensure cultural appropriateness

---

**No vague help text.**
**Every tooltip explains cause → action → result.**
