# Inquiry Form Routing

## Overview
All student-facing "Apply" and "Enroll" buttons across the site route to the inquiry form at `/apply`. This form submits to HubSpot for lead management.

## CTA Routing Map

### Program Pages
**Location**: `/programs/[slug]`
- **Hero CTA**: "Apply Now" → `/apply?program={slug}`
- **Sidebar CTA**: "Apply Now" → `/apply?program={slug}`

The program slug is passed as a query parameter to pre-populate the program field in the form.

### Homepage
**Location**: `/`
- **Hero Section**: "Explore Programs" → `/programs` (discovery)
- **How It Works**: "Start Inquiry" → `/apply`
- **Trust Section**: "Enroll Now" → `/apply`
- **Final CTA**: "Apply Today" → `/apply`

### Funding Page
**Location**: `/funding`
- **Hero CTA**: "Start an Application" → `/apply`
- **Bottom CTA**: "Start an Application" → `/apply`

### Platform Pages
**Location**: `/platform/*`
- Platform CTAs link to `/contact` for B2B sales inquiries
- These are intentionally different from student inquiry flow

## Inquiry Form Details

### Form Location
`/app/apply/page.tsx`

### Form Fields
- **Name** (required) - Split into firstname/lastname for HubSpot
- **Email** (required)
- **Phone** (required)
- **Program** (optional) - Pre-populated from URL parameter
- **Message** (optional)

### HubSpot Integration
**Endpoint**: `/api/hubspot/submit`

**Required Environment Variables**:
- `HUBSPOT_PORTAL_ID` - Your HubSpot portal ID
- `HUBSPOT_FORM_GUID` - The form GUID from HubSpot
- `HUBSPOT_PRIVATE_APP_TOKEN` - Private app access token

**Submission Data**:
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "program": "barber-apprenticeship",
  "message": "I'm interested in learning more",
  "source": "website-inquiry"
}
```

### Success Flow
1. User clicks "Apply Now" on any program page
2. Redirected to `/apply?program=barber-apprenticeship`
3. Form loads with program field pre-populated
4. User fills out remaining fields
5. Form submits to HubSpot API
6. Success message displays with next steps

### Error Handling
- Form validates required fields client-side
- API errors show user-friendly message with phone number fallback
- Network errors caught and displayed

## Program Slug Reference

All program slugs that can be passed via URL parameter:

- `barber-apprenticeship`
- `cna`
- `hvac-technician`
- `building-technician`
- `cdl`
- `medical-assistant`
- `direct-support-professional`
- `tax-prep-financial-services`
- `esthetician-beauty-services`
- `life-coach-certification`
- `peer-recovery-specialist`
- `workforce-readiness`
- `business-fundamentals`
- `health-wellness-coaching`

## Testing Checklist

- [ ] Click Apply button on each program page
- [ ] Verify program field is pre-populated
- [ ] Submit form with valid data
- [ ] Check HubSpot for new contact/submission
- [ ] Test error states (missing fields, network error)
- [ ] Verify mobile responsiveness
- [ ] Test direct navigation to `/apply` (no program param)

## Future Enhancements

Consider adding:
- UTM parameter tracking
- Referral source capture
- Multi-step form for complex programs
- Calendar integration for advisor calls
- SMS confirmation after submission
