# Sitemap Configuration Guide

## Single Source of Truth

All navigation (Header, Footer, Sitemap page) now reads from **one file**:

```
config/siteMapConfig.ts
```

## How It Works

### 1. Add a New Page

Edit `config/siteMapConfig.ts` and add your page to the appropriate section:

```typescript
{
  key: "programs",
  title: "Programs",
  pages: [
    { label: "All Programs", href: "/programs", showInHeader: true, showInFooter: true },
    // Add your new page here:
    { label: "New Program", href: "/programs/new-program", showInHeader: true, showInFooter: true },
  ],
}
```

### 2. Control Visibility

Use flags to control where the page appears:

- `showInHeader: true` - Shows in header dropdown
- `showInFooter: true` - Shows in footer column
- Omit both or set to `false` - Only shows in sitemap page

**Examples:**

```typescript
// Show everywhere (header, footer, sitemap)
{ label: "Popular Page", href: "/popular", showInHeader: true, showInFooter: true }

// Only in header and sitemap
{ label: "Header Only", href: "/header-only", showInHeader: true }

// Only in footer and sitemap
{ label: "Footer Only", href: "/footer-only", showInFooter: true }

// Only in sitemap (hidden from nav)
{ label: "Hidden Page", href: "/hidden" }
```

### 3. Automatic Updates

Once you edit `config/siteMapConfig.ts`:

- ✅ Header dropdowns update automatically
- ✅ Footer columns update automatically
- ✅ Sitemap page updates automatically
- ✅ No need to edit multiple files

## Current Navigation Structure

### Header Sections (5 dropdowns)
1. **Programs** - Training programs
2. **Funding** - WIOA, WRG, apprenticeships
3. **For Students** - Student portal, courses, credentials
4. **For Employers** - Hire graduates, post jobs
5. **Admin & Staff** - Dashboards, reports, case management

### Footer Columns (4 columns)
1. **Programs** - Key training programs
2. **Funding** - Funding options
3. **For Students** - Student resources
4. **Main Pages** - About, Contact, Apply, etc.

### Sitemap Page
Shows **all sections** with all pages (22 sections total)

## Adding a New Section

To add a completely new section:

1. Add the section key to the type:
```typescript
export type SiteSectionKey =
  | "main"
  | "programs"
  // ... existing keys
  | "yourNewSection";  // Add here
```

2. Add the section to SITE_MAP:
```typescript
{
  key: "yourNewSection",
  title: "Your New Section",
  pages: [
    { label: "Page 1", href: "/section/page1", showInHeader: true },
    { label: "Page 2", href: "/section/page2", showInFooter: true },
  ],
}
```

3. (Optional) Add to header or footer:

**For Header:**
```typescript
// In components/layouts/Header.tsx
const HEADER_KEYS: SiteSection["key"][] = [
  "programs",
  "funding",
  "students",
  "employers",
  "adminStaff",
  "yourNewSection",  // Add here
];
```

**For Footer:**
```typescript
// In components/layouts/Footer.tsx
const FOOTER_KEYS: SiteSection["key"][] = [
  "programs",
  "funding",
  "students",
  "main",
  "yourNewSection",  // Add here
];
```

## All Available Sections

Current sections in `SITE_MAP`:

1. **main** - Main site pages (Home, About, Contact, etc.)
2. **programs** - Training programs
3. **funding** - Funding options (WIOA, WRG, etc.)
4. **students** - Student portal and resources
5. **lms** - Learning Management System
6. **credentials** - Credentials and verification
7. **employers** - Employer resources
8. **programHolders** - Program holder portal
9. **careerServices** - Career services and job board
10. **adminStaff** - Admin and staff tools
11. **community** - Community resources
12. **legal** - Legal and policies
13. **hrPayroll** - HR and payroll
14. **caseManagement** - Case management
15. **boards** - Workforce boards
16. **specialPrograms** - Special programs (Kingdom Konnect, VITA, etc.)
17. **tools** - Platform tools (files, chat, calendar, etc.)
18. **builders** - Content builders (course, quiz, syllabus, etc.)
19. **documents** - Document center
20. **instructor** - Instructor tools
21. **reports** - Reports and analytics

## Best Practices

### 1. Keep Header Dropdowns Focused
- Limit to 6-8 items per dropdown
- Use `showInHeader: true` only for most important pages
- Header automatically caps at 8 items per section

### 2. Footer Can Be More Comprehensive
- Footer columns can have more items
- Use `showInFooter: true` for secondary pages
- Good for SEO and discoverability

### 3. Sitemap Shows Everything
- All pages appear in sitemap regardless of flags
- Good for search engines and users looking for specific pages

### 4. Consistent Naming
- Use clear, descriptive labels
- Keep labels concise for header/footer
- Can be more detailed in sitemap if needed

## Example: Adding a New Program

```typescript
// In config/siteMapConfig.ts, find the "programs" section:

{
  key: "programs",
  title: "Programs",
  pages: [
    { label: "All Programs", href: "/programs", showInHeader: true, showInFooter: true },
    { label: "Barber Apprenticeship", href: "/programs/barber-apprenticeship", showInHeader: true, showInFooter: true },
    { label: "CNA", href: "/programs/cna", showInHeader: true, showInFooter: true },
    { label: "HVAC", href: "/programs/hvac", showInHeader: true, showInFooter: true },
    { label: "Building Technician", href: "/programs/building-technician", showInHeader: true, showInFooter: true },
    { label: "CDL", href: "/programs/cdl", showInHeader: true, showInFooter: true },
    
    // Add your new program here:
    { label: "Welding", href: "/programs/welding", showInHeader: true, showInFooter: true },
  ],
}
```

**Result:**
- ✅ Appears in Programs dropdown in header
- ✅ Appears in Programs column in footer
- ✅ Appears in Programs section on sitemap page

## Troubleshooting

### Page not showing in header?
- Check `showInHeader: true` is set
- Verify the section is in `HEADER_KEYS` in `Header.tsx`
- Header caps at 8 items per section

### Page not showing in footer?
- Check `showInFooter: true` is set
- Verify the section is in `FOOTER_KEYS` in `Footer.tsx`

### Page not showing anywhere?
- Check the href is correct
- Verify the page is in the correct section
- Make sure the section key matches exactly

### Build errors?
- Run `npm run build` to check for TypeScript errors
- Verify all section keys are in the `SiteSectionKey` type
- Check for duplicate hrefs or keys

## Maintenance

### Regular Updates
1. Review navigation quarterly
2. Remove outdated pages
3. Add new programs/features
4. Update labels for clarity

### Testing
After editing `config/siteMapConfig.ts`:
1. Run `npm run build` to verify no errors
2. Check header dropdowns on desktop
3. Check mobile menu
4. Check footer columns
5. Check sitemap page at `/sitemap-page`

## Support

For questions or issues:
- Review this guide
- Check `config/siteMapConfig.ts` for examples
- Review component files:
  - `components/layouts/Header.tsx`
  - `components/layouts/Footer.tsx`
  - `app/sitemap-page/page.tsx`
