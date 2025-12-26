# DESIGN POLICY: No Heavy Overlays or Generic Content

**Effective Date:** December 25, 2024  
**Status:** ENFORCED  
**Authority:** Site Owner Directive

---

## 🚫 POLICY STATEMENT

**Heavy gradient overlays (50%+ opacity), placeholder images, and generic symbols are PROHIBITED on all public-facing pages.**

---

## ❌ PROHIBITED

### 1. Heavy Gradient Overlays

```tsx
// ❌ PROHIBITED
<div className="absolute inset-0 bg-black/50" />
<div className="absolute inset-0 bg-black/60" />
<div className="absolute inset-0 bg-black/70" />
<div className="absolute inset-0 bg-blue-900/70" />
<div className="absolute inset-0 bg-purple-900/70" />
<div className="absolute inset-0 bg-green-900/70" />
```

**Reason:** Hides real photos of real students, makes site look generic.

---

### 2. Placeholder Images

```tsx
// ❌ PROHIBITED
<img src="/placeholder.jpg" />
<img src="/generic-student.jpg" />
<img src="/stock-photo.jpg" />
<Image src="https://via.placeholder.com/600x400" />
```

**Reason:** We have real photos. Use them.

---

### 3. Generic Symbols/Icons as Primary Content

```tsx
// ❌ PROHIBITED (as primary hero content)
<div className="h-96 flex items-center justify-center">
  <GraduationCap className="w-32 h-32" />
</div>
```

**Reason:** Icons are for UI elements, not hero content. Use real photos/videos.

---

## ✅ ALLOWED

### 1. Light Overlays for Text Readability (Hero Sections Only)

```tsx
// ✅ ALLOWED - 40% max for hero sections with video
<div className="absolute inset-0 bg-black/40" />
```

**Conditions:**

- Only on video/image backgrounds
- Only when text is overlaid
- Maximum 40% opacity
- Must be necessary for text readability

---

### 2. Bottom Gradients for Photo Cards

```tsx
// ✅ ALLOWED - Shows photo at top, dark at bottom for text
<div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/30 to-transparent" />
```

**Conditions:**

- Gradient only (not solid overlay)
- 0% opacity at top (photo fully visible)
- 90% opacity at bottom (text readable)
- Text must be positioned at bottom

---

### 3. Real Photos and Videos

```tsx
// ✅ REQUIRED
<Image src="/images/students-hero.jpg" alt="Real students in classroom" />
<video src="/videos/hero-home.mp4" />
```

**Requirements:**

- Must be real photos of actual students/programs
- Must be high quality
- Must have descriptive alt text
- Must be optimized for web

---

### 4. Icons as UI Elements (Not Primary Content)

```tsx
// ✅ ALLOWED - Icons for navigation, buttons, etc.
<Button>
  <GraduationCap className="w-5 h-5" />
  Apply Now
</Button>
```

**Conditions:**

- Icons support text/content
- Icons are not the primary visual
- Icons are appropriately sized

---

## 📋 ENFORCEMENT RULES

### Automatic Violations

**Any code containing these patterns will be flagged:**

1. `bg-black/[5-9][0-9]` (50%+ black overlay)
2. `bg-*-900/[5-9][0-9]` (50%+ color overlay)
3. `placeholder` in image src
4. `generic` in image src
5. `stock-photo` in image src
6. `via.placeholder.com` in URLs

---

## 🤖 AUTOPILOT ENFORCEMENT

### Monitoring Script

**File:** `.github/workflows/design-policy-check.yml`

```yaml
name: Design Policy Enforcement

on:
  pull_request:
    paths:
      - 'app/**/*.tsx'
      - 'components/**/*.tsx'
  push:
    branches:
      - main

jobs:
  check-design-policy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Check for Heavy Overlays
        run: |
          echo "🔍 Checking for prohibited heavy overlays..."

          # Check for 50%+ overlays
          VIOLATIONS=$(grep -r "bg-black/[5-9][0-9]\|bg-.*-900/[5-9][0-9]" app components --include="*.tsx" | grep -v "bg-gradient" | grep -v "node_modules" || true)

          if [ ! -z "$VIOLATIONS" ]; then
            echo "❌ POLICY VIOLATION: Heavy overlays detected"
            echo "$VIOLATIONS"
            echo ""
            echo "POLICY: Heavy overlays (50%+ opacity) are prohibited."
            echo "USE: bg-black/40 (max) for hero sections"
            echo "USE: bg-gradient-to-t from-color-900/90 to-transparent for photo cards"
            exit 1
          fi

          echo "✅ No heavy overlay violations found"

      - name: Check for Placeholder Images
        run: |
          echo "🔍 Checking for placeholder images..."

          VIOLATIONS=$(grep -r "placeholder\|generic.*\\.jpg\|stock-photo" app components --include="*.tsx" | grep -v "node_modules" || true)

          if [ ! -z "$VIOLATIONS" ]; then
            echo "❌ POLICY VIOLATION: Placeholder images detected"
            echo "$VIOLATIONS"
            echo ""
            echo "POLICY: Placeholder and generic images are prohibited."
            echo "USE: Real photos from /public/images/"
            exit 1
          fi

          echo "✅ No placeholder image violations found"

      - name: Check for via.placeholder.com
        run: |
          echo "🔍 Checking for external placeholder services..."

          VIOLATIONS=$(grep -r "via.placeholder.com\|placeholder.com\|lorempixel.com" app components --include="*.tsx" | grep -v "node_modules" || true)

          if [ ! -z "$VIOLATIONS" ]; then
            echo "❌ POLICY VIOLATION: External placeholder service detected"
            echo "$VIOLATIONS"
            echo ""
            echo "POLICY: External placeholder services are prohibited."
            echo "USE: Real photos from /public/images/"
            exit 1
          fi

          echo "✅ No external placeholder violations found"

      - name: Policy Check Summary
        run: |
          echo "✅ All design policy checks passed"
          echo ""
          echo "Policy enforced:"
          echo "- No heavy overlays (50%+ opacity)"
          echo "- No placeholder images"
          echo "- No generic content"
```

---

## 🔧 CLEANUP SCRIPT

**File:** `scripts/remove-policy-violations.sh`

```bash
#!/bin/bash

echo "🧹 Removing Design Policy Violations"
echo "===================================="
echo ""

# Find all violations
echo "🔍 Scanning for violations..."
echo ""

# 1. Find heavy overlays
echo "1. Heavy Overlays (50%+):"
grep -r "bg-black/[5-9][0-9]\|bg-.*-900/[5-9][0-9]" app components --include="*.tsx" | grep -v "bg-gradient" | grep -v "node_modules" || echo "  ✅ None found"
echo ""

# 2. Find placeholder images
echo "2. Placeholder Images:"
grep -r "placeholder\|generic.*\\.jpg\|stock-photo" app components --include="*.tsx" | grep -v "node_modules" || echo "  ✅ None found"
echo ""

# 3. Find external placeholders
echo "3. External Placeholder Services:"
grep -r "via.placeholder.com\|placeholder.com\|lorempixel.com" app components --include="*.tsx" | grep -v "node_modules" || echo "  ✅ None found"
echo ""

echo "===================================="
echo "📋 Violation Summary"
echo "===================================="
echo ""

HEAVY_OVERLAYS=$(grep -r "bg-black/[5-9][0-9]\|bg-.*-900/[5-9][0-9]" app components --include="*.tsx" | grep -v "bg-gradient" | grep -v "node_modules" | wc -l)
PLACEHOLDERS=$(grep -r "placeholder\|generic.*\\.jpg\|stock-photo" app components --include="*.tsx" | grep -v "node_modules" | wc -l)
EXTERNAL=$(grep -r "via.placeholder.com\|placeholder.com\|lorempixel.com" app components --include="*.tsx" | grep -v "node_modules" | wc -l)

echo "Heavy Overlays: $HEAVY_OVERLAYS"
echo "Placeholder Images: $PLACEHOLDERS"
echo "External Placeholders: $EXTERNAL"
echo ""

TOTAL=$((HEAVY_OVERLAYS + PLACEHOLDERS + EXTERNAL))

if [ $TOTAL -eq 0 ]; then
  echo "✅ No violations found - site is compliant"
  exit 0
else
  echo "❌ $TOTAL violations found - manual review required"
  echo ""
  echo "To fix:"
  echo "1. Replace heavy overlays with bg-black/40 or gradients"
  echo "2. Replace placeholder images with real photos"
  echo "3. Remove external placeholder services"
  exit 1
fi
```

---

## 📊 MONITORING DASHBOARD

**File:** `scripts/design-policy-report.sh`

```bash
#!/bin/bash

echo "📊 Design Policy Compliance Report"
echo "=================================="
echo "Generated: $(date)"
echo ""

# Count total image components
TOTAL_IMAGES=$(grep -r "<Image\|<img" app components --include="*.tsx" | grep -v "node_modules" | wc -l)

# Count real photos
REAL_PHOTOS=$(grep -r "src=\"/images/" app components --include="*.tsx" | grep -v "node_modules" | wc -l)

# Count videos
VIDEOS=$(grep -r "src=\"/videos/" app components --include="*.tsx" | grep -v "node_modules" | wc -l)

# Count overlays
LIGHT_OVERLAYS=$(grep -r "bg-black/[1-4][0-9]" app components --include="*.tsx" | grep -v "node_modules" | wc -l)
HEAVY_OVERLAYS=$(grep -r "bg-black/[5-9][0-9]\|bg-.*-900/[5-9][0-9]" app components --include="*.tsx" | grep -v "bg-gradient" | grep -v "node_modules" | wc -l)
GRADIENTS=$(grep -r "bg-gradient-to" app components --include="*.tsx" | grep -v "node_modules" | wc -l)

# Count violations
VIOLATIONS=$(grep -r "placeholder\|generic.*\\.jpg\|stock-photo\|via.placeholder" app components --include="*.tsx" | grep -v "node_modules" | wc -l)

echo "📸 Content Statistics"
echo "--------------------"
echo "Total Images: $TOTAL_IMAGES"
echo "Real Photos: $REAL_PHOTOS"
echo "Videos: $VIDEOS"
echo ""

echo "🎨 Overlay Statistics"
echo "--------------------"
echo "Light Overlays (≤40%): $LIGHT_OVERLAYS ✅"
echo "Heavy Overlays (≥50%): $HEAVY_OVERLAYS $([ $HEAVY_OVERLAYS -gt 0 ] && echo '❌' || echo '✅')"
echo "Gradients: $GRADIENTS ✅"
echo ""

echo "🚨 Violations"
echo "--------------------"
echo "Policy Violations: $VIOLATIONS $([ $VIOLATIONS -gt 0 ] && echo '❌' || echo '✅')"
echo ""

# Calculate compliance score
COMPLIANCE=$((100 - (HEAVY_OVERLAYS + VIOLATIONS) * 100 / (TOTAL_IMAGES + 1)))

echo "📊 Compliance Score"
echo "--------------------"
echo "$COMPLIANCE% compliant"
echo ""

if [ $COMPLIANCE -eq 100 ]; then
  echo "✅ FULLY COMPLIANT - No violations found"
elif [ $COMPLIANCE -ge 90 ]; then
  echo "⚠️ MOSTLY COMPLIANT - Minor violations"
else
  echo "❌ NON-COMPLIANT - Action required"
fi
```

---

## 🎯 IMPLEMENTATION CHECKLIST

### Phase 1: Policy Creation ✅

- [x] Create policy document
- [x] Define prohibited patterns
- [x] Define allowed patterns
- [x] Document enforcement rules

### Phase 2: Automation Setup

- [ ] Create GitHub Actions workflow
- [ ] Create cleanup script
- [ ] Create monitoring script
- [ ] Test enforcement on sample violations

### Phase 3: Cleanup

- [ ] Run violation scan
- [ ] Fix all heavy overlays
- [ ] Remove all placeholder images
- [ ] Verify all real photos are used

### Phase 4: Monitoring

- [ ] Enable GitHub Actions
- [ ] Set up weekly compliance reports
- [ ] Add to PR review checklist
- [ ] Train team on policy

---

## 📋 VIOLATION RESPONSE PROTOCOL

### When Violation is Detected:

1. **Automatic:** GitHub Actions fails the build
2. **Notification:** Developer receives error message
3. **Guidance:** Error message shows correct pattern
4. **Block:** PR cannot be merged until fixed
5. **Report:** Violation logged for review

### Example Error Message:

```
❌ POLICY VIOLATION: Heavy overlays detected

File: app/programs/page.tsx
Line: 50
Code: <div className="absolute inset-0 bg-black/60" />

POLICY: Heavy overlays (50%+ opacity) are prohibited.

FIX OPTIONS:
1. Reduce to 40%: bg-black/40
2. Use gradient: bg-gradient-to-t from-black/90 to-transparent

WHY: We have real photos. Heavy overlays hide them.
```

---

## 🔄 POLICY UPDATES

**This policy can only be updated by:**

- Site Owner
- Lead Designer
- Technical Director

**Update process:**

1. Propose change in writing
2. Review with stakeholders
3. Update this document
4. Update enforcement scripts
5. Communicate to team

---

## 📞 SUPPORT

**Questions about this policy?**

- Review: `GRADIENT_OVERLAY_DIAGNOSTIC.md`
- Review: `ROOT_CAUSE_ANALYSIS.md`
- Review: `DESIGN_POLICY_NO_OVERLAYS.md` (this file)

**Need an exception?**

- Document the reason
- Get approval from Site Owner
- Add to exceptions list below

---

## 🎯 EXCEPTIONS

**None currently approved.**

Any exception must be documented here with:

- Reason for exception
- Approval date
- Approver name
- Expiration date

---

## ✅ COMPLIANCE STATUS

**Last Checked:** December 25, 2024  
**Status:** Pending Implementation  
**Violations Found:** TBD  
**Action Required:** Run cleanup script

---

**This policy is ACTIVE and ENFORCED.**
