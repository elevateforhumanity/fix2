# Mobile Navigation Testing Checklist

## Test Environment
- **Device**: Mobile phone or browser DevTools mobile emulation
- **URL**: Your production domain or Vercel preview URL
- **Browser**: Chrome, Safari, Firefox mobile

## ✅ Test Checklist

### 1. Mobile Menu Opens
- [ ] Tap hamburger menu icon (☰)
- [ ] Menu slides in from right side
- [ ] Background overlay appears (semi-transparent black)
- [ ] Menu takes up 85-90% of screen width

### 2. All Sections Visible
- [ ] **Programs** section header visible
- [ ] **Funding** section header visible
- [ ] **For You** section header visible
- [ ] **Student Portal** section header visible
- [ ] **LMS** section header visible
- [ ] **Resources** section header visible
- [ ] **About** section header visible

### 3. Collapsible Sections Work
- [ ] Tap "Programs" → Expands to show 14 program links
- [ ] Chevron icon rotates 180° when expanded
- [ ] Tap "Funding" → Programs collapses, Funding expands (5 links)
- [ ] Tap "For You" → Previous section collapses, For You expands (8 links)
- [ ] Only ONE section expanded at a time

### 4. Links Navigate Correctly
- [ ] Tap any program link → Goes to correct program page (NOT /apply)
- [ ] Tap "WIOA Funding" → Goes to /funding/wioa
- [ ] Tap "For Learners" → Goes to /learners
- [ ] Tap "Dashboard" → Goes to /student/dashboard
- [ ] Tap "LMS Dashboard" → Goes to /lms/dashboard

### 5. Action Buttons Work
- [ ] "Dashboard" button visible at bottom
- [ ] "Login" button visible at bottom
- [ ] NO "Apply" button present
- [ ] Buttons have proper styling (border, padding)

### 6. Menu Closes Properly
- [ ] Tap any link → Menu closes automatically
- [ ] Tap background overlay → Menu closes
- [ ] Tap X icon → Menu closes
- [ ] Body scroll unlocks when menu closes

### 7. Desktop Navigation (Hover)
- [ ] Switch to desktop view (>1024px width)
- [ ] Hover over "Programs" → Dropdown appears
- [ ] Hover over "Funding" → Dropdown appears
- [ ] All 7 sections have dropdowns
- [ ] Dropdowns don't overlap "Dashboard" or "Login" buttons

### 8. Responsive Breakpoints
- [ ] Mobile (<1024px): Hamburger menu visible
- [ ] Desktop (≥1024px): Full navigation bar visible
- [ ] Tablet (768-1023px): Hamburger menu visible
- [ ] No layout shifts or overlapping elements

## 🐛 Common Issues to Check

### Issue: All taps go to /apply
**Cause**: Mobile menu using undefined arrays or wrong href
**Fix**: Verify `headerNav` is imported and used in mobile menu

### Issue: Sections don't expand
**Cause**: Missing `expandedMobileSection` state or onClick handler
**Fix**: Check button has `onClick` that toggles state

### Issue: Multiple sections expanded
**Cause**: Not closing previous section when opening new one
**Fix**: Set state to `null` when same section clicked, or new section name

### Issue: Menu doesn't close after clicking link
**Cause**: Missing `onClick={() => setMobileMenuOpen(false)}`
**Fix**: Add close handler to all Link components

### Issue: Can't scroll menu content
**Cause**: Missing `overflow-y-auto` on menu container
**Fix**: Add `overflow-y-auto` class to menu div

## 📊 Test Results

### Desktop Navigation
- [ ] ✅ All sections have dropdowns
- [ ] ✅ Hover shows dropdown
- [ ] ✅ Click link navigates correctly
- [ ] ✅ No Apply button in navigation

### Mobile Navigation  
- [ ] ✅ Hamburger menu opens
- [ ] ✅ All 7 sections visible
- [ ] ✅ Sections collapse/expand correctly
- [ ] ✅ Links navigate to correct pages
- [ ] ✅ Dashboard + Login buttons present
- [ ] ✅ No Apply button
- [ ] ✅ Menu closes after navigation

### Cross-Browser
- [ ] ✅ Chrome mobile
- [ ] ✅ Safari iOS
- [ ] ✅ Firefox mobile
- [ ] ✅ Samsung Internet

## 🎯 Success Criteria

All checkboxes above should be ✅ for navigation to be considered fully functional.

## 📝 Notes

**Last Updated**: 2024-12-19
**Components Tested**: 
- `components/site/SiteHeader.tsx`
- `components/layout/MainHeader.tsx`
- `components/site/SimpleHeader.tsx`

**Navigation Config**: `config/navigation.ts`
**Total Pages**: 57 pages across 7 sections
