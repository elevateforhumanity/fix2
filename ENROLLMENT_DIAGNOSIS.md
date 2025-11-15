# Enrollment Page Diagnosis

## Issue Found

**URL Tested**: `https://fix2-1c7w.vercel.app/enroll/`  
**Status**: 404 Not Found

## Root Cause

The enrollment page is a **dynamic route** that requires a program parameter:
- **Route Structure**: `/app/enroll/[program]/page.tsx`
- **Expected URLs**: `/enroll/wrg`, `/enroll/wioa`, `/enroll/jri`, etc.
- **Problem**: Visiting `/enroll/` (without program) returns 404

## Available Enrollment Programs

The following enrollment URLs should work:

1. **WRG (Workforce Ready Grant)**
   - URL: `https://fix2-1c7w.vercel.app/enroll/wrg`
   - Description: Free training for Indiana residents

2. **WIOA (WorkOne)**
   - URL: `https://fix2-1c7w.vercel.app/enroll/wioa`
   - Description: Workforce Innovation and Opportunity Act funding

3. **JRI (Justice Reinvestment Initiative)**
   - URL: `https://fix2-1c7w.vercel.app/enroll/jri`
   - Description: Training for justice-involved individuals

4. **EmployIndy**
   - URL: `https://fix2-1c7w.vercel.app/enroll/employindy`
   - Description: Marion County workforce development

5. **DOL Apprenticeship**
   - URL: `https://fix2-1c7w.vercel.app/enroll/dol`
   - Description: Department of Labor Registered Apprenticeship

## Solution Options

### Option 1: Create Index Page (Recommended)

Create `/app/enroll/page.tsx` to show all enrollment options:

```tsx
// app/enroll/page.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { GraduationCap, Users, Scale, Building, Award } from 'lucide-react';

const programs = [
  {
    code: 'wrg',
    title: 'Workforce Ready Grant (WRG)',
    description: 'Free training for Indiana residents in high-demand careers',
    icon: GraduationCap,
    color: 'bg-blue-500'
  },
  {
    code: 'wioa',
    title: 'WorkOne / WIOA',
    description: 'Workforce Innovation and Opportunity Act funding for eligible adults',
    icon: Users,
    color: 'bg-green-500'
  },
  {
    code: 'jri',
    title: 'Justice Reinvestment Initiative (JRI)',
    description: 'Training for justice-involved individuals reentering the workforce',
    icon: Scale,
    color: 'bg-purple-500'
  },
  {
    code: 'employindy',
    title: 'EmployIndy',
    description: 'Marion County workforce development programs',
    icon: Building,
    color: 'bg-orange-500'
  },
  {
    code: 'dol',
    title: 'DOL Apprenticeship',
    description: 'Department of Labor Registered Apprenticeship programs',
    icon: Award,
    color: 'bg-red-500'
  }
];

export default function EnrollIndexPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center text-primary font-bold text-4xl mx-auto mb-6">
            E
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Choose Your Funding Program
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Select the program that matches your eligibility to start your enrollment
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <Card 
                key={program.code}
                className="hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => router.push(`/enroll/${program.code}`)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 ${program.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                  <CardDescription className="text-base">
                    {program.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Not Sure Which Program?</CardTitle>
              <CardDescription>
                Contact us and we'll help you find the right funding option
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => router.push('/contact')}>
                  Contact Us
                </Button>
                <Button variant="outline" onClick={() => router.push('/programs')}>
                  View Programs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
```

### Option 2: Redirect to Programs Page

Create a redirect from `/enroll` to `/programs`:

```tsx
// app/enroll/page.tsx
import { redirect } from 'next/navigation';

export default function EnrollPage() {
  redirect('/programs');
}
```

### Option 3: Add Middleware Redirect

Add to `middleware.ts`:

```typescript
if (request.nextUrl.pathname === '/enroll' || request.nextUrl.pathname === '/enroll/') {
  return NextResponse.redirect(new URL('/programs', request.url));
}
```

## Current Enrollment Flow

1. User visits program page (e.g., `/programs/hvac`)
2. Clicks "Enroll" button
3. Should be directed to `/enroll/[program]` with appropriate funding program
4. Fills out enrollment form
5. Submits to `/api/funding/apply`

## Recommendations

1. **Create `/app/enroll/page.tsx`** - Show all funding options (Option 1)
2. **Update program pages** - Add clear "Enroll" buttons that link to specific enrollment URLs
3. **Add navigation** - Include enrollment link in main navigation
4. **Test all URLs**:
   - `/enroll` → Should show program selection
   - `/enroll/wrg` → Should show WRG enrollment form
   - `/enroll/wioa` → Should show WIOA enrollment form
   - etc.

## Testing URLs

After fix, test these URLs:

- ✅ `https://fix2-1c7w.vercel.app/enroll` - Should show program selection
- ✅ `https://fix2-1c7w.vercel.app/enroll/wrg` - Should show WRG form
- ✅ `https://fix2-1c7w.vercel.app/enroll/wioa` - Should show WIOA form
- ✅ `https://fix2-1c7w.vercel.app/enroll/jri` - Should show JRI form
- ✅ `https://fix2-1c7w.vercel.app/enroll/employindy` - Should show EmployIndy form
- ✅ `https://fix2-1c7w.vercel.app/enroll/dol` - Should show DOL form

## Implementation Priority

**High Priority**: Create the index page (Option 1) - This provides the best user experience and allows users to choose their funding program.

---

**Status**: Issue diagnosed  
**Fix Required**: Create `/app/enroll/page.tsx`  
**Estimated Time**: 5 minutes  
**Impact**: Improves user experience and fixes 404 error
