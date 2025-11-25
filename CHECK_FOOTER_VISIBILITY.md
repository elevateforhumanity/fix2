# Footer Visibility Issue - Diagnosis

## Issue
Footer not visible on certain pages.

## Root Cause
Some layouts (admin, student, portal) have their own layout files that override the root layout and don't include the footer.

### Layouts WITHOUT Footer:
1. **`app/admin/layout.tsx`** - Has custom AdminNav + AdminHeader, no footer
2. **`app/student/layout.tsx`** - May have custom layout
3. **`app/portal/layout.tsx`** - Minimal layout, just passes children
4. **`app/lms/layout.tsx`** - May have custom layout

### Pages WITH Footer:
- Homepage (`/`)
- Programs pages (`/programs/*`)
- About, Contact, Blog
- All public pages using root layout

## Solution Options

### Option 1: Add Footer to Each Layout (Recommended)
Add `<SiteFooter />` to admin, student, and LMS layouts.

### Option 2: Remove Custom Layouts
Let pages inherit from root layout (may break authentication).

### Option 3: Conditional Footer
Show footer based on route in root layout.

## Which pages are you viewing?
Please specify which pages you're on where you don't see the footer:
- [ ] Admin pages (`/admin/*`)
- [ ] Student dashboard (`/portal/student/*`)
- [ ] LMS pages (`/lms/*`)
- [ ] Homepage (`/`)
- [ ] Program pages (`/programs/*`)
- [ ] Other: _______________

This will help me fix the right layouts.
