# Canonical Program Slugs

## Single Source of Truth

This is the authoritative list of all program slugs. All internal links, CTAs, and redirects must use these exact slugs.

| Program Name | Canonical Slug | Status |
|-------------|----------------|--------|
| HVAC Technician | `hvac-technician` | ✅ Active |
| Barber Apprenticeship | `barber-apprenticeship` | ✅ Active |
| Certified Nursing Assistant (CNA) | `cna` | ✅ Active |
| Commercial Driver's License (CDL) | `cdl` | ✅ Active |
| Building Maintenance (Sanitation & Infection Control) | `building-maintenance` | ✅ Active |
| Building Technician — Advanced Pathway | `building-technician` | ✅ Active |
| Workforce Readiness (Youth & Adult) | `workforce-readiness` | ✅ Active |
| Direct Support Professional (DSP) Training | `direct-support-professional` | ⚠️ **NEEDS FIX** |
| Beauty and Career Educator Training | `beauty-career-educator` | ✅ Active |
| Business Start-up & Marketing | `business-startup-marketing` | ✅ Active |
| Emergency Health & Safety Technician | `emergency-health-safety-tech` | ✅ Active |
| Home Health Aide Certification | `home-health-aide` | ✅ Active |
| Esthetics and Skincare Specialist Certificate | `professional-esthetician` | ✅ Active |
| Public Safety Reentry Specialist | `peer-recovery-coach` | ✅ Active |
| Tax Preparation & Financial Services Certificate | `tax-prep-financial-services` | ✅ Active |
| CPR, AED & First Aid Certification | `cpr-certification` | ✅ Active |

## Known Issues

### 1. DSP Slug Mismatch (CRITICAL)
**Problem**: DSP program is using slug `medical-assistant` but should be `direct-support-professional`

**Current State**:
- Data file has: `slug: 'medical-assistant'` with `name: 'Direct Support Professional (DSP) Training'`
- This creates confusion - the slug says "medical-assistant" but the content is DSP

**Fix Required**:
1. Change slug in `app/data/programs.ts` from `medical-assistant` to `direct-support-professional`
2. Add redirect: `/programs/medical-assistant` → `/programs/direct-support-professional`

### 2. Peer Support Professional Route (BROKEN)
**Problem**: `/programs/peer-support-professional` returns 404

**Current State**:
- No program exists with slug `peer-support-professional`
- Actual program is `peer-recovery-coach` (Public Safety Reentry Specialist)

**Fix Required**:
- Add redirect: `/programs/peer-support-professional` → `/programs/peer-recovery-coach`

### 3. IT Program Route (ORPHAN)
**Problem**: `/programs/it` exists but is not in programs data or listed on /programs page

**Fix Required**:
- Either: Add IT program to data file
- Or: Redirect `/programs/it` → `/programs/workforce-readiness` (or another appropriate program)
- Or: Remove the route entirely

## Redirect Map

All old/incorrect slugs should redirect to canonical slugs:

```javascript
// In next.config.mjs
{
  source: '/programs/medical-assistant',
  destination: '/programs/direct-support-professional',
  permanent: true
},
{
  source: '/programs/peer-support-professional',
  destination: '/programs/peer-recovery-coach',
  permanent: true
},
{
  source: '/programs/it',
  destination: '/programs/workforce-readiness',
  permanent: false // Set to true once confirmed
}
```

## Validation Checklist

- [ ] All slugs in `app/data/programs.ts` match this table
- [ ] All internal links use canonical slugs
- [ ] All Apply button hrefs use canonical slugs
- [ ] All redirects are in place for old slugs
- [ ] All program detail pages load correctly
- [ ] No 404s on /programs page links
