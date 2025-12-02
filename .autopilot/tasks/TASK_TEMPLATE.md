# Autopilot Task Template

## Task: Create Complete Program Content

### Your Assignment
Create detailed module content for: **[PROGRAM_NAME]**

### Program Details
- **Slug**: `[program-slug]`
- **Total Hours**: [XXX] hours
- **Modules Needed**: [6-12] modules
- **File Location**: `lms-data/courses/program-[slug].ts`

### Requirements

#### 1. Module Structure
Create 6-12 modules covering:
- Introduction and safety
- Foundation concepts
- Core skills
- Advanced techniques
- Hands-on practice
- Exam preparation

#### 2. Lesson Distribution
Each module should have 3-6 lessons:
- **40% Reading**: Theory, concepts, procedures
- **20% Video**: Demonstrations, explanations
- **30% Lab**: Hands-on practice, skills
- **10% Quiz**: Knowledge checks, assessments

#### 3. Content Requirements
- Total hours must match program requirements
- Include safety and compliance content
- Add partner course references where applicable
- Include certification/exam prep
- Mix lesson types for engagement

### File Template

```typescript
// lms-data/courses/program-[slug].ts

import type { Course } from "@/types/course";

export const [programName]Course: Course = {
  id: "[program]-001",
  slug: "[program-slug]",
  title: "[Program Full Title]",
  shortTitle: "[Short Title]",
  credentialPartner: "OTHER", // or specific partner
  externalCredentialName: "[Certification Name]",
  description: "[Program description from data/programs.ts]",
  hoursTotal: [XXX],
  deliveryMode: "HYBRID", // or ONLINE, IN_PERSON
  locationLabel: "[Location description]",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_DW", "WEX", "SELF_PAY"],
  targetAudience: [
    "[Target audience 1]",
    "[Target audience 2]",
    "[Target audience 3]",
  ],
  outcomes: [
    "[Learning outcome 1]",
    "[Learning outcome 2]",
    "[Learning outcome 3]",
    "[Learning outcome 4]",
    "[Learning outcome 5]",
  ],
  modules: [
    {
      id: "[program]-mod-1",
      title: "Module 1 Title",
      description: "Module description",
      lessons: [
        {
          id: "[program]-1-1",
          title: "Lesson Title",
          type: "reading",
          durationMinutes: 45,
        },
        // Add more lessons
      ],
    },
    // Add more modules
  ],
  lmsPath: "/student/enroll/[program-slug]",
  isPublished: true,
};
```

### Reference Examples
Look at these completed programs for guidance:
- `lms-data/courses/program-cna.ts` (13 modules)
- `lms-data/courses/program-barber-apprenticeship.ts` (10 modules)
- `lms-data/courses/program-hvac.ts` (10 modules)
- `lms-data/courses/program-cdl.ts` (9 modules)

### Completion Checklist
- [ ] Created file in correct location
- [ ] Followed TypeScript Course type structure
- [ ] Created 6-12 modules
- [ ] Mixed lesson types (not all reading)
- [ ] Total hours match requirements
- [ ] Included quizzes for assessment
- [ ] Included labs for practice
- [ ] Added safety/compliance content
- [ ] Added exam prep module
- [ ] File compiles without errors

### Report Completion
Create file: `.autopilot/completed/[program-slug].txt`

Content:
```
Program: [Program Name]
Slug: [program-slug]
Modules: [X]
Lessons: [XX]
Total Hours: [XXX]
Completed: [YYYY-MM-DD HH:MM]
Autopilot: [Your ID]
```

### Start Now!
Begin creating your assigned program content immediately.
