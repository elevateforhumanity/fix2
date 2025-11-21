# Elevate Content Seeds

This directory contains structured JSON seeds for all Elevate scripts and content.

## Files

- **elevate.json** - Master seed file with all content
- **student_onboarding.json** - Student onboarding steps
- **partner_onboarding.json** - Partner onboarding steps
- **social_media.json** - Social media content

## Usage

### Import into LMS

```javascript
import seeds from './seeds/elevate/elevate.json';

// Access student onboarding
const studentSteps = seeds.student_onboarding.steps;

// Access phone scripts
const phoneScripts = seeds.phone_scripts.scripts;
```

### Use in React Components

```jsx
import { student_onboarding } from './seeds/elevate/elevate.json';

export function OnboardingFlow() {
  return (
    <div>
      {student_onboarding.steps.map((step) => (
        <Step key={step.step} {...step} />
      ))}
    </div>
  );
}
```

### Use in Autopilot

```bash
# Load seeds into autopilot
cat seeds/elevate/elevate.json | jq '.social_media.platforms.facebook'
```

## Structure

All content is organized by:

- **Category**: onboarding, communication, marketing, operations
- **Audience**: students, partners, employers, admins, support_staff
- **Type**: scripts, templates, sequences, pitches

## Phone Number

All scripts reference: **317-314-3757**

## Base URL

All links use: **https://www.elevateforhumanity.org
