# Site-Wide Redirect Map

## Program Slug Redirects

| Old URL | New URL | Status |
|---------|---------|--------|
| `/programs/medical-assistant` | `/programs/direct-support-professional` | ✅ Permanent |
| `/programs/peer-support-professional` | `/programs/peer-recovery-coach` | ✅ Permanent |
| `/programs/it` | `/programs/workforce-readiness` | ⚠️ Temporary |
| `/programs/tax-prep` | `/programs/tax-prep-financial-services` | ✅ Permanent |
| `/programs/public-safety-reentry-specialist` | `/programs/peer-recovery-coach` | ✅ Permanent |

## Legal/Policy Redirects

| Old URL | New URL | Status |
|---------|---------|--------|
| `/legal/terms` | `/terms-of-service` | ✅ Permanent |
| `/legal/privacy` | `/privacy-policy` | ✅ Permanent |

## Fixed Internal Links

### Program Links
- ✅ `app/jri/page.tsx` - Fixed `/programs/public-safety-reentry-specialist` → `/programs/peer-recovery-coach`
- ✅ `app/tax-services/page.tsx` - Fixed `/programs/tax-prep` → `/programs/tax-prep-financial-services`

### Legal Links
- ✅ `app/signup/SignupForm.tsx` - Fixed `/legal/terms` → `/terms-of-service`
- ✅ `app/signup/SignupForm.tsx` - Fixed `/legal/privacy` → `/privacy-policy`

### Admin Navigation
- ✅ `components/AdminNav.tsx` - Removed non-existent `/admin/elevate-ai`
- ✅ `components/AdminNav.tsx` - Fixed `/admin/staff` → `/admin/hr/employees`
- ✅ `components/AdminNav.tsx` - Fixed `/lms/attendance` → `/lms/(app)/attendance`

## Canonical Program Slugs

All program slugs verified against `app/data/programs.ts`:

1. `barber-apprenticeship` ✅
2. `cna` ✅
3. `hvac-technician` ✅
4. `building-maintenance` ✅
5. `building-technician` ✅
6. `cdl` ✅
7. `direct-support-professional` ✅ (was medical-assistant)
8. `workforce-readiness` ✅
9. `beauty-career-educator` ✅
10. `business-startup-marketing` ✅
11. `emergency-health-safety-tech` ✅
12. `home-health-aide` ✅
13. `professional-esthetician` ✅
14. `peer-recovery-coach` ✅
15. `tax-prep-financial-services` ✅
16. `cpr-certification` ✅

## Implementation

All redirects configured in `next.config.mjs`:

```javascript
async redirects() {
  return [
    // Program slug fixes
    {
      source: '/programs/medical-assistant',
      destination: '/programs/direct-support-professional',
      permanent: true,
    },
    {
      source: '/programs/peer-support-professional',
      destination: '/programs/peer-recovery-coach',
      permanent: true,
    },
    {
      source: '/programs/it',
      destination: '/programs/workforce-readiness',
      permanent: false,
    },
    {
      source: '/programs/tax-prep',
      destination: '/programs/tax-prep-financial-services',
      permanent: true,
    },
    {
      source: '/programs/public-safety-reentry-specialist',
      destination: '/programs/peer-recovery-coach',
      permanent: true,
    },
    // Legal route fixes
    {
      source: '/legal/terms',
      destination: '/terms-of-service',
      permanent: true,
    },
    {
      source: '/legal/privacy',
      destination: '/privacy-policy',
      permanent: true,
    },
  ];
}
```

## Verification Checklist

- [x] All program slugs match canonical list
- [x] All internal program links updated
- [x] All redirects added to next.config.mjs
- [x] Legal/policy links fixed
- [x] Admin navigation links fixed
- [x] Build successful
- [ ] Test redirects in production

## Notes

- DSP program was the primary mismatch (medical-assistant slug with DSP content)
- Tax prep had shortened slug that didn't match data
- Reentry specialist had old naming convention
- Legal routes used `/legal/*` pattern but pages are at root level
