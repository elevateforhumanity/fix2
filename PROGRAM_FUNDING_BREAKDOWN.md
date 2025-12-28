# Program Funding Breakdown

## Summary
- **Total Programs in Repository:** 31
- **Free Federal/State Funded Programs:** 20 → `/programs` page
- **Self-Pay Courses:** 11 → `/courses` page

### Breakdown:
- **DOL Federally Registered Apprenticeships:** 4 (earn while you learn)
- **Free ETPL Programs (WIOA/WRG/JRI):** 16
- **Self-Pay Courses:** 11 (HSI, NRF, CareerSafe, etc.)

### Current Status:
- **In app/data/programs.ts:** 13 programs
- **Need to add:** 7 free ETPL programs
- **Already on /courses:** 11 self-pay courses

---

## DOL Federally Registered Apprenticeships (4)

These are official DOL-registered apprenticeships where students earn while they learn:

1. **barber-apprenticeship** - 2,000 hours, RAPIDS-verified
2. **emergency-health-safety-tech** - 4 weeks, hybrid time/competency-based
3. **hvac-technician** - 50 weeks RTI, 5 certifications
4. **professional-esthetician** - 5 weeks, RAPIDS-verified

---

## WRG (Workforce Ready Grant) Eligible Programs (26)

Indiana's Workforce Ready Grant covers tuition for high-value, short-term credentials:

1. barber-apprenticeship
2. beauty-career-educator
3. building-maintenance-tech
4. business-startup-marketing
5. cdl-training
6. certified-community-healthcare-worker
7. cna-certification
8. cpr-first-aid-hsi
9. customer-service-retail-nrf
10. cybersecurity-fundamentals
11. dental-assistant
12. direct-support-professional
13. emergency-health-safety-tech
14. entrepreneurship-business
15. hospitality-culinary
16. hvac-technician
17. it-support-specialist
18. medical-administrative-assistant
19. microsoft-office-mos
20. osha-10-certification
21. osha-30-careersafe
22. patient-care-technician
23. pharmacy-technician
24. phlebotomy-technician
25. professional-esthetician
26. tax-prep-financial-services

---

## JRI (Justice Reinvestment Initiative) Aligned Programs (4)

Programs specifically designed for justice-involved individuals:

1. **certified-peer-recovery-coach** - WIOA, JRI
2. **certified-peer-support-professional** - WIOA, JRI
3. **public-safety-reentry-specialist** - WIOA, JRI
4. **rise-up-certificate** - WIOA, JRI

---

## Programs Currently in app/data/programs.ts (13)

✅ Already added:
1. barber-apprenticeship
2. beauty-career-educator
3. building-maintenance-tech
4. business-startup-marketing
5. cdl-training
6. certified-peer-recovery-coach
7. cna-certification
8. direct-support-professional
9. emergency-health-safety-tech
10. hvac-technician
11. phlebotomy-technician
12. professional-esthetician
13. tax-prep-financial-services

---

## Missing from app/data/programs.ts

### FREE ETPL Programs to add to `/programs` (7):
1. certified-community-healthcare-worker (WIOA, WRG)
2. certified-peer-support-professional (WIOA, JRI)
3. cpr-first-aid-hsi (WIOA, WRG, Employer Sponsored)
4. dental-assistant (WIOA, WRG, Pell Grant)
5. entrepreneurship-business (WIOA, WRG, Small Business Grants)
6. medical-administrative-assistant (WIOA, WRG, Pell Grant)
7. public-safety-reentry-specialist (WIOA, JRI)

### Self-Pay COURSES (already on `/courses` or move there) (11):
1. cpr-certification - COURSE
2. customer-service-retail-nrf - COURSE
3. cybersecurity-fundamentals - COURSE
4. hospitality-culinary - COURSE
5. it-support-specialist - COURSE
6. microsoft-office-mos - COURSE
7. osha-10-certification - COURSE
8. osha-30-careersafe - COURSE
9. patient-care-technician - COURSE
10. pharmacy-technician - COURSE
11. rise-up-certificate - COURSE

---

## Self-Pay CLASSES (for `/courses` page)

These are NOT free and should be on `/courses` page (11 total):

1. **cpr-certification** - Self-Pay
2. **customer-service-retail-nrf** - Self-Pay (NRF certification)
3. **cybersecurity-fundamentals** - Self-Pay
4. **hospitality-culinary** - Self-Pay
5. **it-support-specialist** - Self-Pay
6. **microsoft-office-mos** - Self-Pay (Microsoft Office Specialist)
7. **osha-10-certification** - Self-Pay (CareerSafe)
8. **osha-30-careersafe** - Self-Pay (CareerSafe)
9. **patient-care-technician** - Self-Pay
10. **pharmacy-technician** - Self-Pay
11. **rise-up-certificate** - Self-Pay

**Note:** Many of these are already on `/courses/catalog` with pricing ($40-$200)

---

## 2Exclusive LLC Programs

Need to search ETPL database for programs specifically associated with 2Exclusive LLC partnership.

---

## Page Structure

### `/programs` - FREE Federal/State Funded (30 ETPL programs)
- All WIOA/WRG/JRI/Apprenticeship funded programs
- 100% free with funding
- Includes the 4 DOL Registered Apprenticeships

### `/courses` - SELF-PAY Classes (already exists)
- Individual certifications with prices ($40-$200)
- HSI, NRF, CareerSafe, etc.
- Already has pricing structure in place

---

## Next Steps

1. ✅ Fixed slug mismatches in existing 13 programs
2. ✅ Removed non-ETPL programs from app/data/programs.ts
3. ✅ Archived annual-report page
4. ✅ Updated HVAC duration to match ETPL
5. ⏳ Add the 17 missing ETPL-approved programs to `app/data/programs.ts`
6. ⏳ Update `/programs` page to show all 30 ETPL programs
7. ⏳ Add filtering by funding type (WRG, JRI, Apprenticeship, All)
8. ⏳ Verify 2Exclusive LLC specific programs in ETPL database
