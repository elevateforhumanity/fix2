# React Page Templates

These React/Next.js page templates are auto-generated from the Elevate content seeds.

## Pages

- **StudentOnboarding.tsx** - Interactive student onboarding flow
- **SocialMediaDashboard.tsx** - Social media content manager
- **ProgramPitches.tsx** - Program pitch cards
- **QuickLinks.tsx** - Organized link directory

## Usage

### Import into Next.js App

```bash
# Copy to your app directory
cp pages/scripts/*.tsx app/scripts/
```

### Use as Components

```tsx
import StudentOnboarding from '@/pages/scripts/StudentOnboarding';

export default function OnboardingPage() {
  return <StudentOnboarding />;
}
```

### Customize

All pages import from `@/seeds/elevate/elevate.json`, so updating the seeds automatically updates all pages.

## Features

- ✅ Fully typed with TypeScript
- ✅ Uses shadcn/ui components
- ✅ Responsive design
- ✅ Copy-to-clipboard functionality
- ✅ Interactive step navigation
- ✅ Auto-synced with content seeds

## Dependencies

These pages require:

- Next.js 14+
- React 18+
- shadcn/ui components
- Tailwind CSS
- lucide-react icons
