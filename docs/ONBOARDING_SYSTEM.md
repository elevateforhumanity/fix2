# Onboarding & Tutorial System Documentation

## Overview

The onboarding and tutorial system provides comprehensive user guidance through interactive flows, contextual help, and step-by-step tutorials. This system helps new users understand platform features and improves user engagement.

## Components

### 1. Onboarding Flows (`/lib/onboarding.ts`)

Predefined onboarding flows for different user roles:

#### Student Onboarding
- **Flow ID**: `student_welcome`
- **Steps**: 7 steps covering dashboard, course browsing, search, profile, and notifications
- **Reward**: "onboarding_complete" badge

#### First Course Experience
- **Flow ID**: `student_first_course`
- **Steps**: 5 steps covering video player, notes, discussions, and progress tracking

#### Instructor Onboarding
- **Flow ID**: `instructor_welcome`
- **Steps**: 7 steps covering dashboard, course creation, student management, and analytics
- **Reward**: "instructor_onboarded" badge

#### Admin Onboarding
- **Flow ID**: `admin_welcome`
- **Steps**: 6 steps covering user management, moderation, analytics, and audit logs

### 2. Interactive Tutorials

Three comprehensive tutorials available:

#### Video Features Tutorial
- **Duration**: 5 minutes
- **Topics**: Playback speed, quality selector, captions, keyboard shortcuts, PiP mode

#### Note-Taking Tutorial
- **Duration**: 3 minutes
- **Topics**: Creating notes, formatting, timestamp jumping, organization

#### Course Creation Tutorial
- **Duration**: 15 minutes
- **Prerequisites**: instructor_welcome
- **Topics**: Course basics, content upload, sections, quizzes, pricing, publishing

### 3. UI Components

#### OnboardingFlow Component
```tsx
import OnboardingFlow from '@/components/OnboardingFlow';
import { ONBOARDING_FLOWS } from '@/lib/onboarding';

<OnboardingFlow
  flow={ONBOARDING_FLOWS.student_welcome}
  userId={user.id}
  onComplete={() => console.log('Completed!')}
  onSkip={() => console.log('Skipped')}
/>
```

#### TutorialSystem Component
```tsx
import { TutorialSystem } from '@/components/TutorialSystem';
import { TUTORIALS } from '@/lib/onboarding';

<TutorialSystem
  tutorial={TUTORIALS.video_features}
  userId={user.id}
  onComplete={() => console.log('Tutorial completed')}
  onClose={() => console.log('Tutorial closed')}
/>
```

#### TutorialLibrary Component
```tsx
import { TutorialLibrary } from '@/components/TutorialSystem';

<TutorialLibrary 
  userId={user.id} 
  userRole="student" 
/>
```

#### OnboardingPrompt Component
```tsx
import OnboardingPrompt from '@/components/OnboardingPrompt';

<OnboardingPrompt 
  userId={user.id} 
  userRole="student" 
/>
```

### 4. Contextual Help Components

#### ContextualHelp
Tooltip-style help that appears on hover/click:

```tsx
import { ContextualHelp } from '@/components/ContextualHelp';

<ContextualHelp
  title="Course Enrollment"
  content="Click to enroll in this course. You'll get instant access to all materials."
  learnMoreUrl="/help/enrollment"
  position="top"
  size="md"
/>
```

#### InlineHelp
Simple help text for form fields:

```tsx
import { InlineHelp } from '@/components/ContextualHelp';

<InlineHelp>
  Enter your full name as it should appear on certificates
</InlineHelp>
```

#### HelpSection
Expandable help sections:

```tsx
import { HelpSection } from '@/components/ContextualHelp';

<HelpSection title="Need help with this section?">
  <p>Detailed explanation goes here...</p>
</HelpSection>
```

#### QuickTips
Display helpful tips:

```tsx
import { QuickTips } from '@/components/ContextualHelp';

<QuickTips tips={[
  "Use keyboard shortcuts to navigate faster",
  "Save your progress frequently",
  "Enable notifications to stay updated"
]} />
```

#### KeyboardShortcuts
Display available keyboard shortcuts:

```tsx
import { KeyboardShortcuts } from '@/components/ContextualHelp';

<KeyboardShortcuts shortcuts={[
  { keys: ['Space'], description: 'Play/Pause video' },
  { keys: ['←', '→'], description: 'Skip 10 seconds' },
  { keys: ['Ctrl', 'S'], description: 'Save progress' }
]} />
```

## Database Schema

### user_onboarding Table
```sql
- id: UUID (primary key)
- user_id: UUID (foreign key to auth.users)
- flow_id: TEXT (e.g., 'student_welcome')
- current_step: INTEGER
- completed_steps: TEXT[] (array of step IDs)
- completed: BOOLEAN
- skipped: BOOLEAN
- started_at: TIMESTAMP
- updated_at: TIMESTAMP
- completed_at: TIMESTAMP
```

### user_tutorials Table
```sql
- id: UUID (primary key)
- user_id: UUID (foreign key to auth.users)
- tutorial_id: TEXT (e.g., 'video_features')
- current_step: INTEGER
- completed_steps: TEXT[] (array of step IDs)
- completed: BOOLEAN
- started_at: TIMESTAMP
- updated_at: TIMESTAMP
- completed_at: TIMESTAMP
```

## API Endpoints

### GET /api/onboarding

#### Get Recommended Flows
```
GET /api/onboarding?action=recommended
```

Response:
```json
{
  "recommended": [
    {
      "id": "student_welcome",
      "name": "Welcome to Your Learning Journey",
      "role": "student",
      "steps": [...]
    }
  ]
}
```

#### Get Progress
```
GET /api/onboarding?action=progress&flowId=student_welcome
```

Response:
```json
{
  "progress": {
    "currentStep": 2,
    "completedSteps": ["welcome", "dashboard"],
    "completed": false
  }
}
```

### POST /api/onboarding

#### Start Onboarding
```json
POST /api/onboarding
{
  "action": "start",
  "flowId": "student_welcome"
}
```

#### Complete Onboarding
```json
POST /api/onboarding
{
  "action": "complete",
  "flowId": "student_welcome"
}
```

#### Skip Onboarding
```json
POST /api/onboarding
{
  "action": "skip",
  "flowId": "student_welcome"
}
```

#### Reset Onboarding
```json
POST /api/onboarding
{
  "action": "reset",
  "flowId": "student_welcome"
}
```

## React Hook

### useOnboarding Hook

```tsx
import { useOnboarding } from '@/hooks/useOnboarding';

function MyComponent() {
  const {
    recommendedFlows,
    loading,
    error,
    startFlow,
    completeFlow,
    skipFlow,
    hasRecommendedFlows
  } = useOnboarding(userId, userRole);

  // Use the hook data and methods
}
```

## Library Functions

### Onboarding Functions

```typescript
import {
  hasCompletedOnboarding,
  getOnboardingProgress,
  startOnboarding,
  updateOnboardingProgress,
  completeOnboarding,
  skipOnboarding,
  resetOnboarding,
  getRecommendedOnboarding
} from '@/lib/onboarding';

// Check if user completed a flow
const completed = await hasCompletedOnboarding(userId, 'student_welcome');

// Get progress
const progress = await getOnboardingProgress(userId, 'student_welcome');

// Start a flow
await startOnboarding(userId, 'student_welcome');

// Update progress
await updateOnboardingProgress(userId, 'student_welcome', 'dashboard', 1);

// Complete flow
await completeOnboarding(userId, 'student_welcome');

// Skip flow
await skipOnboarding(userId, 'student_welcome');

// Reset flow
await resetOnboarding(userId, 'student_welcome');

// Get recommended flows
const recommended = await getRecommendedOnboarding(userId, 'student');
```

### Tutorial Functions

```typescript
import {
  getTutorialProgress,
  updateTutorialProgress,
  completeTutorial
} from '@/lib/onboarding';

// Get tutorial progress
const progress = await getTutorialProgress(userId, 'video_features');

// Update progress
await updateTutorialProgress(userId, 'video_features', 'playback_speed', 0);

// Complete tutorial
await completeTutorial(userId, 'video_features');
```

## Adding New Onboarding Flows

1. Define the flow in `/lib/onboarding.ts`:

```typescript
export const ONBOARDING_FLOWS: Record<string, OnboardingFlow> = {
  // ... existing flows
  
  my_new_flow: {
    id: 'my_new_flow',
    name: 'My New Feature Tour',
    role: 'student',
    steps: [
      {
        id: 'step1',
        title: 'Step 1 Title',
        description: 'Step 1 description',
        target: '[data-onboarding="element-id"]',
        position: 'bottom',
      },
      // ... more steps
    ],
    completionReward: {
      type: 'badge',
      value: 'my_feature_expert',
    },
  },
};
```

2. Add data attributes to elements you want to highlight:

```tsx
<div data-onboarding="element-id">
  Content to highlight
</div>
```

## Adding New Tutorials

1. Define the tutorial in `/lib/onboarding.ts`:

```typescript
export const TUTORIALS: Record<string, Tutorial> = {
  // ... existing tutorials
  
  my_tutorial: {
    id: 'my_tutorial',
    title: 'My Tutorial Title',
    description: 'Tutorial description',
    category: 'Learning Tools',
    duration: 10,
    steps: [
      {
        id: 'step1',
        title: 'Step Title',
        content: 'Step content',
        type: 'interactive',
        action: {
          type: 'click',
          target: '[data-tutorial="button"]',
        },
      },
      // ... more steps
    ],
  },
};
```

2. Add data attributes for interactive elements:

```tsx
<button data-tutorial="button">
  Click me
</button>
```

## Best Practices

1. **Keep flows short**: 5-7 steps maximum for onboarding flows
2. **Make steps skippable**: Allow users to skip if they're already familiar
3. **Use clear language**: Avoid jargon, be concise and actionable
4. **Highlight key features**: Focus on features that provide immediate value
5. **Test on different screen sizes**: Ensure tooltips position correctly
6. **Track completion rates**: Monitor which steps users skip or abandon
7. **Update regularly**: Keep content current with platform changes
8. **Provide context**: Explain why a feature is useful, not just what it does
9. **Use visual cues**: Icons, colors, and animations help guide attention
10. **Offer help when needed**: Don't overwhelm users with constant prompts

## Accessibility

- All interactive elements have proper ARIA labels
- Keyboard navigation is fully supported
- Focus management ensures logical tab order
- Screen reader announcements for step changes
- High contrast mode compatible
- Respects reduced motion preferences

## Analytics

Track onboarding effectiveness:

```typescript
// Track when users start onboarding
analytics.track('onboarding_started', {
  flow_id: 'student_welcome',
  user_role: 'student'
});

// Track step completion
analytics.track('onboarding_step_completed', {
  flow_id: 'student_welcome',
  step_id: 'dashboard',
  step_index: 1
});

// Track completion
analytics.track('onboarding_completed', {
  flow_id: 'student_welcome',
  duration_seconds: 180
});

// Track skips
analytics.track('onboarding_skipped', {
  flow_id: 'student_welcome',
  last_step: 'dashboard'
});
```

## Troubleshooting

### Onboarding not showing
- Check if user has already completed the flow
- Verify user role matches flow role
- Check database connection
- Ensure RLS policies are correct

### Elements not highlighting
- Verify data-onboarding attribute is present
- Check CSS selector syntax
- Ensure element is visible in DOM
- Check z-index conflicts

### Progress not saving
- Check Supabase connection
- Verify RLS policies allow updates
- Check for JavaScript errors in console
- Ensure user is authenticated

## Future Enhancements

- [ ] Video tutorials embedded in flows
- [ ] Branching paths based on user choices
- [ ] Gamification with points and leaderboards
- [ ] A/B testing different onboarding flows
- [ ] Personalized recommendations based on behavior
- [ ] Multi-language support for all flows
- [ ] Mobile-optimized onboarding experiences
- [ ] Integration with customer success tools
