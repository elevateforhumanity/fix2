# Files/Folders to Consider Removing

## Backup Files (Safe to Delete)

- app/brand-colors.css.backup
- app/site-consistency.css.backup
- app/animations.css.backup
- app/workday-animations.css.backup
- app/page.tsx.backup-20251223
- app/page.tsx.backup-old-design
- app/page.tsx.backup-20251221
- app/theme.css.backup
- app/ui-fixes.css.backup
- app/elevate-optimized.css.backup
- app/mobile-fixes.css.backup
- app/verify-credential/page.tsx.backup
- app/supersonic-fast-cash/page-old-blue-orange.tsx
- app/supersonic-fast-cash/page-backup.tsx
- app/supersonic-fast-cash/page-new.tsx
- app/supersonic-fast-cash/page-professional.tsx

## Potentially Duplicate/Unused Folders

Review these for consolidation:

- app/tax vs app/tax-filing vs app/tax-services
- app/student vs app/student-portal vs app/students
- app/portal vs app/portals
- app/program-holder (what is this?)
- Multiple demo/test folders

## Large Folders to Audit

- app/api (5.8M) - check for unused endpoints
- app/admin (2.8M) - consolidate admin features
- app/favicon.ico (1.6M) - why so large?

## Recommendation

Delete all .backup files immediately (saves ~500KB)
Review duplicate folders with user before deletion
