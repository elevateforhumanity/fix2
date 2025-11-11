# 🎨 Styling Autopilot Guide

**Status:** ✅ ACTIVE  
**Schedule:** Every 2 hours + on push to styling files  
**Workflow:** `.github/workflows/styling-autopilot.yml`

---

## Overview

The Styling Autopilot ensures brand consistency, accessibility compliance, and visual quality across your entire application. It runs automatically and fixes most issues without manual intervention.

---

## 🎯 What It Does

### 1. Brand Contrast Compliance (WCAG)

**Checks:**

- Text on background contrast ratios
- Button text readability
- Alert/notification colors
- All brand color pairs

**Standards:**

- WCAG AA: 4.5:1 minimum (enforced)
- WCAG AAA: 7.0:1 recommended

**Action on Failure:**

- Creates GitHub issue
- Blocks deployment (if critical)
- Provides specific color pair violations

---

### 2. CSS/SCSS Linting

**Checks:**

- No hardcoded colors (must use CSS variables or Tailwind)
- Alphabetical property order
- No duplicate selectors
- Valid syntax
- Browser compatibility

**Auto-Fixes:**

- ✅ Formats CSS with Prettier
- ✅ Sorts properties alphabetically
- ✅ Removes duplicates
- ✅ Applies consistent spacing

---

### 3. Hardcoded Color Detection

**Scans:**

- All `.jsx` and `.tsx` files
- Inline styles
- Style props
- className strings

**Detects:**

- Hex colors: `#FF0000`, `#f00`
- RGB: `rgb(255, 0, 0)`
- HSL: `hsl(0, 100%, 50%)`
- Named colors: `red`, `blue`

**Recommends:**

- Use Tailwind: `bg-brand-primary`
- Use CSS variables: `var(--brand-primary)`
- Use design tokens

---

### 4. Tailwind Class Consistency

**Checks:**

- Class order (follows official Tailwind order)
- No contradicting classes (`hidden block`)
- No custom classes (unless whitelisted)
- Responsive breakpoint order

**Auto-Fixes:**

- ✅ Reorders classes automatically
- ✅ Removes contradictions
- ✅ Applies consistent patterns

---

### 5. Visual Regression Testing

**When:** On pull requests

**Tests:**

- Home page
- Programs page
- LMS page
- Apply page

**Captures:**

- Full-page screenshots
- Compares against baseline
- Detects pixel differences
- Highlights changes

**Threshold:** 200 pixels max difference

---

### 6. Lighthouse Performance Audit

**When:** On push to main

**Audits:**

- Performance (85% minimum)
- Accessibility (90% minimum)
- Best Practices (85% minimum)
- SEO (90% minimum)

**Checks:**

- Page load speed
- First Contentful Paint
- Largest Contentful Paint
- Cumulative Layout Shift
- Time to Interactive
- Accessibility violations
- SEO best practices

---

## 🔧 Configuration

### Brand Colors (`autopilot-brand.json`)

```json
{
  "colors": {
    "primary": "#1E40AF",
    "onPrimary": "#FFFFFF",
    "secondary": "#7C3AED",
    "onSecondary": "#FFFFFF",
    "background": "#FFFFFF",
    "text": "#1F2937",
    "surface": "#F9FAFB",
    "success": "#10B981",
    "onSuccess": "#FFFFFF",
    "info": "#3B82F6",
    "onInfo": "#FFFFFF",
    "warning": "#F59E0B",
    "onWarning": "#1F2937",
    "danger": "#EF4444",
    "onDanger": "#FFFFFF"
  },
  "contrast": {
    "minAA": 4.5,
    "minAAA": 7.0
  }
}
```

### Stylelint Rules (`.stylelintrc.cjs`)

```javascript
module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  rules: {
    'color-named': 'never',
    'declaration-property-value-disallowed-list': {
      '/^(background|color|border)$/': [
        '/^#(?!fff|ffffff|000|000000)/i',
        '/^rgb/',
        '/^hsl/',
      ],
    },
    'order/properties-alphabetical-order': true,
  },
};
```

### ESLint Rules (`.eslintrc.cjs`)

```javascript
module.exports = {
  plugins: ['tailwindcss'],
  rules: {
    'no-restricted-syntax': [
      'error',
      {
        selector: 'Literal[value=/^#([0-9a-fA-F]{3,8})$/]',
        message: 'Use brand tokens or Tailwind classes instead',
      },
    ],
    'tailwindcss/classnames-order': 'warn',
    'tailwindcss/no-contradicting-classname': 'error',
  },
};
```

---

## 🚀 Usage

### Automatic (No Action Needed)

The autopilot runs automatically:

**Every 2 hours:**

- Scans all styling files
- Checks brand compliance
- Runs Lighthouse audits
- Auto-fixes issues
- Commits and pushes fixes

**On every push to main:**

- Validates styling changes
- Runs all checks
- Auto-fixes if possible
- Creates issues for manual fixes

**On pull requests:**

- Comments with styling feedback
- Runs visual regression tests
- Highlights hardcoded colors
- Suggests improvements

---

### Manual Trigger

**Via GitHub Actions:**

1. Go to [Actions](https://github.com/elevateforhumanity/fix2/actions)
2. Select "Styling Autopilot"
3. Click "Run workflow"
4. Choose "Auto-fix" mode (true/false)

**Via CLI:**

```bash
# Trigger workflow
gh workflow run styling-autopilot.yml

# With auto-fix disabled
gh workflow run styling-autopilot.yml -f fix_mode=false
```

---

### Local Development

**Check styling:**

```bash
npm run polish:check
```

**Auto-fix styling:**

```bash
npm run polish:fix
```

**Run brand guard:**

```bash
npm run brand:guard
```

**Visual regression tests:**

```bash
npm run test:ui
```

**Update visual baselines:**

```bash
npm run test:ui:update
```

**Lighthouse audit:**

```bash
npm run audit:lighthouse
```

---

## 📊 Reports

### GitHub Actions Summary

After each run, view the summary:

1. Go to workflow run
2. Check "Summary" tab
3. See all check results

### Artifacts

Download detailed reports:

- `styling-report-{run_number}` - Full styling report
- `visual-regression-{run_number}` - Screenshots and diffs
- `lighthouse-reports-{run_number}` - Performance data

### PR Comments

On pull requests, the autopilot comments with:

- Brand compliance status
- Hardcoded colors found
- Visual changes detected
- Recommendations

---

## 🔍 What Gets Checked

### CSS Files

- ✅ No hardcoded colors
- ✅ Alphabetical properties
- ✅ No duplicates
- ✅ Valid syntax
- ✅ Browser compatibility

### JSX/TSX Files

- ✅ No inline hex colors
- ✅ Tailwind class order
- ✅ No contradicting classes
- ✅ Consistent patterns

### Brand Colors

- ✅ WCAG AA compliance (4.5:1)
- ✅ WCAG AAA recommended (7.0:1)
- ✅ All color pairs tested
- ✅ Accessibility verified

### Visual Appearance

- ✅ No unintended changes
- ✅ Consistent across pages
- ✅ Responsive design intact
- ✅ No layout shifts

### Performance

- ✅ Load time < 3s
- ✅ FCP < 1.8s
- ✅ LCP < 2.5s
- ✅ CLS < 0.1
- ✅ TTI < 3.8s

---

## 🛠️ Auto-Fix Capabilities

### What Gets Fixed Automatically

1. **CSS Formatting**
   - Indentation
   - Spacing
   - Property order
   - Syntax cleanup

2. **Tailwind Classes**
   - Class order
   - Duplicate removal
   - Contradiction resolution

3. **Code Style**
   - Prettier formatting
   - Consistent quotes
   - Trailing commas

### What Requires Manual Fix

1. **Brand Contrast Violations**
   - Color adjustments
   - Design decisions

2. **Hardcoded Colors**
   - Replace with tokens
   - Update to Tailwind

3. **Visual Regressions**
   - Intentional changes
   - Design updates

4. **Performance Issues**
   - Image optimization
   - Code splitting
   - Bundle size

---

## 📋 Checklist for Developers

### Before Committing

- [ ] Run `npm run polish:check`
- [ ] Fix any hardcoded colors
- [ ] Verify Tailwind class order
- [ ] Check brand contrast
- [ ] Test responsive design

### Before Merging PR

- [ ] Review styling autopilot comment
- [ ] Check visual regression artifacts
- [ ] Verify no brand violations
- [ ] Confirm performance metrics
- [ ] Update visual baselines if needed

### After Deployment

- [ ] Monitor Lighthouse scores
- [ ] Check for styling issues
- [ ] Verify brand consistency
- [ ] Review user feedback

---

## 🚨 Troubleshooting

### Brand Check Fails

**Problem:** Contrast ratio below 4.5:1

**Solution:**

1. Open `autopilot-brand.json`
2. Adjust color values
3. Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
4. Test with brand guard: `npm run brand:guard`

### Hardcoded Colors Detected

**Problem:** Hex colors in JSX/TSX

**Solution:**

```jsx
// ❌ Bad
<div style={{ color: '#FF0000' }}>Text</div>

// ✅ Good
<div className="text-brand-danger">Text</div>

// ✅ Also good
<div style={{ color: 'var(--brand-danger)' }}>Text</div>
```

### Visual Regression Fails

**Problem:** Screenshots don't match

**Solution:**

1. Review the diff images in artifacts
2. If intentional: `npm run test:ui:update`
3. If unintentional: fix the styling issue
4. Commit updated baselines

### Lighthouse Score Low

**Problem:** Performance below 85%

**Solution:**

1. Check bundle size
2. Optimize images
3. Enable code splitting
4. Lazy load components
5. Review network requests

---

## 📈 Metrics Tracked

### Brand Compliance

- Contrast ratios for all color pairs
- WCAG AA/AAA compliance
- Accessibility violations

### Code Quality

- Hardcoded color count
- CSS lint errors
- Tailwind inconsistencies

### Visual Quality

- Pixel differences
- Layout shifts
- Responsive breakpoints

### Performance

- Load time
- FCP, LCP, CLS, TTI
- Bundle size
- Network requests

---

## 🎉 Benefits

### For Developers

- ✅ Automatic styling fixes
- ✅ Consistent code style
- ✅ Catch issues early
- ✅ Less manual review

### For Designers

- ✅ Brand consistency enforced
- ✅ Accessibility guaranteed
- ✅ Visual quality maintained
- ✅ Design system compliance

### For Users

- ✅ Accessible interfaces
- ✅ Fast page loads
- ✅ Consistent experience
- ✅ Professional appearance

---

## 🔗 Related Tools

- **Prettier** - Code formatting
- **ESLint** - JavaScript linting
- **Stylelint** - CSS linting
- **Playwright** - Visual testing
- **Lighthouse** - Performance auditing
- **Tailwind CSS** - Utility classes

---

## 📚 Resources

- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lighthouse Scoring](https://web.dev/performance-scoring/)
- [Playwright Visual Testing](https://playwright.dev/docs/test-snapshots)

---

**Last Updated:** 2025-11-08 07:00 UTC  
**Status:** ✅ ACTIVE  
**Next Run:** Every 2 hours
