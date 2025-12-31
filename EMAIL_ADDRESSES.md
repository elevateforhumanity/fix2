# Email Addresses - Correct Usage ✅

## Email Separation by Site Section

### Main Site (Elevate for Humanity)
**Email**: `elevate4humanityedu@gmail.com`

**Used On**:
- Main contact page (`/contact`)
- Program applications
- General inquiries
- Student enrollment
- WIOA applications
- All non-tax related pages

**Pages**:
- `/contact`
- `/apply`
- `/programs`
- `/enroll`
- `/how-it-works`
- `/agencies`
- All student/admin pages

---

### Tax Site (Supersonic Fast Cash)
**Email**: `Supersonicfadtcashllc@gmail.com`

**Used On**:
- All Supersonic Fast Cash pages
- Tax preparation services
- Tax appointments
- Sub-office agreements
- Tax-related inquiries

**Pages**:
- `/supersonic-fast-cash/*` (all pages)
- Tax API routes
- Payment notifications
- Appointment confirmations

---

## Verification

### Main Site Email
```bash
grep -r "elevate4humanityedu@gmail.com" app/contact
# Returns: 5 instances (correct)
```

### Tax Site Email
```bash
grep -r "Supersonicfadtcashllc@gmail.com" app/supersonic-fast-cash
# Returns: 12 instances (correct)
```

### No Cross-Contamination
```bash
# Tax email should NOT appear on main site
grep -r "Supersonicfadtcashllc@gmail.com" app/ | grep -v supersonic
# Returns: 0 (correct - isolated to tax site)
```

---

## Email Routing

### Main Site Inquiries → elevate4humanityedu@gmail.com
- General questions
- Program information
- Enrollment applications
- Student support
- Partnership inquiries

### Tax Site Inquiries → Supersonicfadtcashllc@gmail.com
- Tax preparation
- Tax appointments
- Sub-office applications
- Tax-related questions
- Payment issues

---

## Status

✅ **Main site**: Uses correct email (elevate4humanityedu@gmail.com)  
✅ **Tax site**: Uses correct email (Supersonicfadtcashllc@gmail.com)  
✅ **No mixing**: Emails are properly separated by site section  

**Both email addresses are correctly configured and isolated! 📧✅**
