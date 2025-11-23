# Add Videos to Program Pages

## Video Mapping

| Program Page | Video File |
|--------------|------------|
| medical-assistant | `/videos/courses/medical-assistant-10002419.mp4` |
| barber-apprenticeship | `/videos/courses/barber-apprenticeship-10002417.mp4` |
| hvac-technician | `/videos/courses/hvac-technician-10002289.mp4` |
| home-health-aide | `/videos/courses/home-health-aide-10002413.mp4` |
| cpr-first-aid | `/videos/courses/cpr-aed-first-aid-10002448.mp4` |
| emergency-health-safety | `/videos/courses/emergency-health-safety-technician-10002408.mp4` |
| beauty-career-educator | `/videos/courses/beauty-career-educator-10002424.mp4` |
| esthetician | `/videos/courses/esthetician-client-services-10002415.mp4` |
| business-startup | `/videos/courses/business-startup-marketing-10002422.mp4` |
| tax-preparation | `/videos/courses/tax-preparation-financial-service-10002414.mp4` |
| public-safety-reentry | `/videos/courses/public-safety-reentry-specialist-10002439.mp4` |

## How to Add

For each program page, add the `videoUrl` prop to `ProgramPageShell`:

```tsx
<ProgramPageShell
  // ... other props
  videoUrl="/videos/courses/[program-name].mp4"
>
```

## Example

```tsx
// app/programs/barber-apprenticeship/page.tsx
<ProgramPageShell
  title="Barber Apprenticeship"
  subtitle="..."
  // ... other props
  videoUrl="/videos/courses/barber-apprenticeship-10002417.mp4"
>
```

## Status

- ✅ Medical Assistant - Video added
- ⏳ Barber Apprenticeship - Needs video
- ⏳ HVAC Technician - Needs video
- ⏳ Other programs - Need videos

## Note

The ProgramPageShell component now supports videos. When `videoUrl` is provided, it displays a video player above the "Program at a glance" card.
