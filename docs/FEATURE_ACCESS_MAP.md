# Feature Access Mapping
## What Each Tier Can Access

---

## Free Access ($0)

### ✅ Available Features:
- Browse all programs
- View program descriptions
- Submit inquiry forms
- View public blog posts
- View success stories
- Access contact information
- View pricing page
- Read terms and privacy policy
- Download app (PWA)

### ❌ Restricted Features:
- LMS access
- Course content
- Progress tracking
- Certificates
- Student dashboard
- Assignments
- Quizzes

### Routes:
- `/` (homepage)
- `/programs` (browse)
- `/programs/[slug]` (view details)
- `/apply` (inquiry form)
- `/contact`
- `/about`
- `/pricing`
- `/terms-of-service`
- `/privacy-policy`
- `/mobile-app`

---

## Student Access ($39/month)

### ✅ Available Features:
Everything in Free Access, PLUS:
- Full LMS access
- Assigned courses
- Course materials (videos, PDFs, etc.)
- Progress tracking
- Quizzes and assessments
- Certificates (non-licensed)
- Student dashboard
- Assignment submission
- Grade viewing
- Discussion forums
- Study resources
- Mobile app full access

### ❌ Restricted Features:
- Advanced career modules
- Business tools
- Professional certifications
- Priority support
- Career coaching

### Routes:
All Free Access routes, PLUS:
- `/lms/(app)/dashboard`
- `/lms/(app)/courses`
- `/lms/(app)/courses/[id]`
- `/lms/(app)/assignments`
- `/lms/(app)/quizzes`
- `/lms/(app)/progress`
- `/lms/(app)/certificates`
- `/lms/(app)/resources`
- `/lms/(app)/profile`

---

## Career Track Access ($149/month)

### ✅ Available Features:
Everything in Student Access, PLUS:
- Advanced career modules
- Business fundamentals courses
- Professional development tools
- Career pathway planning
- Resume builder
- Interview prep resources
- Job search tools
- Networking resources
- Priority support
- Advanced analytics
- Career coaching materials
- Industry certifications prep

### ❌ Restricted Features:
- Partner/organization features
- White-label access
- Multi-user management
- Custom integrations

### Routes:
All Student Access routes, PLUS:
- `/lms/(app)/career-track`
- `/lms/(app)/business-tools`
- `/lms/(app)/career-planning`
- `/lms/(app)/job-search`
- `/lms/(app)/professional-dev`
- `/lms/(app)/analytics`

---

## Partner / Organization (Custom)

### ✅ Available Features:
Everything in Career Track Access, PLUS:
- Custom implementation
- Multi-user access
- White-label options
- Dedicated support
- Custom integrations
- Training for staff
- Bulk enrollment
- Custom reporting
- API access
- Priority feature requests

### Routes:
All Career Track routes, PLUS:
- `/admin/*` (if admin role)
- `/partners/portal`
- Custom routes as needed

---

## Implementation Guide

### Checking Access in Code:

```typescript
import { requiresPayment, getProductByTier } from '@/lib/stripe/app-store-products';

// Check if user has required tier
function checkAccess(userTier: AppAccessTier, requiredTier: AppAccessTier) {
  const tierHierarchy = ['free', 'student', 'career', 'partner'];
  const userLevel = tierHierarchy.indexOf(userTier);
  const requiredLevel = tierHierarchy.indexOf(requiredTier);
  return userLevel >= requiredLevel;
}

// Example usage in a page
export default async function CoursePage() {
  const user = await getCurrentUser();
  
  if (!user || !checkAccess(user.accessTier, 'student')) {
    redirect('/pricing');
  }
  
  // Render course content
}
```

### Middleware Protection:

```typescript
// In proxy.ts or middleware.ts
const TIER_ROUTES = {
  free: ['/programs', '/apply', '/contact'],
  student: ['/lms/(app)/dashboard', '/lms/(app)/courses'],
  career: ['/lms/(app)/career-track', '/lms/(app)/business-tools'],
  partner: ['/admin', '/partners/portal'],
};
```

---

## User Flow Examples

### Free User Journey:
1. Download app (free)
2. Browse programs
3. Submit inquiry
4. Receive enrollment info
5. Upgrade to Student Access

### Student User Journey:
1. Enroll in program
2. Pay $39/month
3. Access LMS
4. Complete courses
5. Earn certificates
6. (Optional) Upgrade to Career Track

### Career Track User Journey:
1. Complete student courses
2. Upgrade to $149/month
3. Access career modules
4. Use professional tools
5. Apply for jobs
6. Continue professional development

---

## Access Control Best Practices

### DO:
- ✅ Check access on server-side
- ✅ Show clear upgrade prompts
- ✅ Allow free browsing
- ✅ Explain what each tier includes
- ✅ Provide easy upgrade path

### DON'T:
- ❌ Lock basic browsing
- ❌ Hide pricing information
- ❌ Use confusing tier names
- ❌ Require payment to download
- ❌ Use "unlock app" language

---

## Testing Checklist

- [ ] Free user can browse programs
- [ ] Free user can submit inquiries
- [ ] Free user redirected from LMS
- [ ] Student user can access LMS
- [ ] Student user can view courses
- [ ] Student user redirected from career track
- [ ] Career user can access all features
- [ ] Partner user has admin access
- [ ] Upgrade prompts show correct pricing
- [ ] Payment flow works end-to-end

---

## Support

For access issues:
- Check user's `accessTier` field in database
- Verify Stripe subscription status
- Check route protection in proxy.ts
- Review user role in profiles table
