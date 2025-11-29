# Full Course Catalog Import Strategy

## Challenge
The 1,200+ courses are not publicly available in a structured format. Each partner requires direct API access or bulk data export.

## Solution: Three-Phase Approach

### Phase 1: Immediate Launch (Current - 67 Courses)
**Status**: ✅ Complete
- 67 sample courses across all 7 partners
- Covers most popular certifications
- Enables immediate system testing and launch
- Generates revenue while building full catalog

**Revenue Potential**: $50K-$150K in first 90 days

### Phase 2: Partner API Integration (Weeks 1-4)
**Goal**: Import full catalogs via partner APIs

#### Partner-by-Partner Plan:

**1. Certiport (150+ courses)**
- Contact: Certiport Partner Support
- Method: API access for course catalog
- Timeline: 1-2 weeks
- Action: Request API credentials and documentation
- Courses: Microsoft Office, Adobe, IC3, IT Specialist, Entrepreneurship

**2. HSI (50+ courses)**
- Contact: Geoff Albrecht (geoff.albrecht@hsi.com)
- Method: Direct course list export
- Timeline: 1 week
- Action: Request full course catalog with pricing
- Courses: CPR, First Aid, BLS, Bloodborne Pathogens, Safety training

**3. JRI (200+ courses)**
- Contact: JRI Partnership Team
- Method: Course catalog export or API
- Timeline: 2 weeks
- Action: Request bulk course data
- Courses: Healthcare, Medical Assistant, Phlebotomy, EKG, Pharmacy Tech

**4. NRF RISE Up (100+ courses)**
- Contact: NRF Foundation
- Method: Public course list scraping or API
- Timeline: 1 week
- Action: Request course catalog or scrape website
- Courses: Retail, Customer Service, Management, Sales

**5. CareerSafe (50+ courses)**
- Contact: CareerSafe Partnership
- Method: Course catalog export
- Timeline: 1 week
- Action: Request full OSHA course list
- Courses: OSHA 10, OSHA 30, Safety certifications

**6. Milady (400+ courses)**
- Contact: 866-848-5143
- Method: Course catalog export from Thinkific
- Timeline: 2-3 weeks
- Action: Request full course export with pricing
- Courses: Cosmetology, Barbering, Esthetics, Nail Tech, Makeup

**7. National Drug Screening (50+ courses)**
- Contact: Sales@nationaldrugscreening.com
- Method: Course list export
- Timeline: 1 week
- Action: Request full certification catalog
- Courses: Drug testing, DOT compliance, Workplace safety

### Phase 3: Automated Sync (Month 2+)
**Goal**: Keep catalog updated automatically

- Set up daily/weekly API sync jobs
- Monitor for new courses
- Update pricing automatically
- Track course availability
- Handle course retirements

## Implementation Steps

### Step 1: Contact All Partners (Week 1)
```
Email Template:

Subject: Course Catalog Data Request - Elevate for Humanity Partnership

Dear [Partner Name],

We're launching our partner LMS integration and need access to your complete course catalog to offer to our students.

Could you please provide:
1. Full course list with titles, descriptions, and pricing
2. API access for automated catalog sync (if available)
3. Course categories and duration information
4. Any enrollment requirements or prerequisites

We currently have 67 sample courses live and are ready to scale to your full catalog.

Best regards,
Elevate for Humanity Career Training Institute
```

### Step 2: Create Import Scripts (Week 1-2)
For each partner, create a script to import their data:

```typescript
// Example: scripts/import-certiport-courses.ts
import { createClient } from '@supabase/supabase-js';

interface CertiportCourse {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  duration: number;
}

async function importCertiportCourses(courses: CertiportCourse[]) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Get Certiport provider ID
  const { data: provider } = await supabase
    .from('partner_lms_providers')
    .select('id')
    .eq('provider_type', 'certiport')
    .single();

  // Bulk insert courses
  const coursesToInsert = courses.map(course => ({
    provider_id: provider.id,
    course_name: course.title,
    description: course.description,
    category: course.category,
    wholesale_price: course.price,
    retail_price: course.price * 1.4, // 40% markup
    duration_hours: course.duration,
    is_active: true,
  }));

  await supabase
    .from('partner_courses_catalog')
    .insert(coursesToInsert);

  console.log(`Imported ${courses.length} Certiport courses`);
}
```

### Step 3: Bulk Import (Week 2-4)
Run import scripts for each partner as data becomes available:

```bash
# Import Certiport courses
npm run import:certiport

# Import HSI courses
npm run import:hsi

# Import JRI courses
npm run import:jri

# Import NRF courses
npm run import:nrf

# Import CareerSafe courses
npm run import:careersafe

# Import Milady courses
npm run import:milady

# Import NDS courses
npm run import:nds
```

### Step 4: Verify Import (Week 4)
```sql
-- Check total courses
SELECT COUNT(*) FROM partner_courses_catalog;
-- Expected: 1,200+

-- Check by provider
SELECT 
  p.provider_name,
  COUNT(c.id) as course_count
FROM partner_lms_providers p
LEFT JOIN partner_courses_catalog c ON c.provider_id = p.id
GROUP BY p.provider_name
ORDER BY course_count DESC;

-- Expected results:
-- Milady: 400+
-- JRI: 200+
-- Certiport: 150+
-- NRF RISE Up: 100+
-- HSI: 50+
-- CareerSafe: 50+
-- National Drug Screening: 50+
```

## Alternative: Manual Data Entry

If API access is delayed, use this spreadsheet approach:

### Create Google Sheet Template
Columns:
- Provider Name
- Course Name
- Description
- Category
- Wholesale Price
- Retail Price
- Duration (hours)
- Prerequisites
- Certification Type
- Active (Y/N)

### Data Entry Process
1. Request course catalogs from partners (PDF, Excel, etc.)
2. Copy data into Google Sheet
3. Clean and standardize data
4. Export as CSV
5. Import via SQL:

```sql
COPY partner_courses_catalog (
  provider_id,
  course_name,
  description,
  category,
  wholesale_price,
  retail_price,
  duration_hours,
  is_active
)
FROM '/path/to/courses.csv'
DELIMITER ','
CSV HEADER;
```

## Realistic Timeline

### Week 1: Contact Partners
- Day 1-2: Send requests to all 7 partners
- Day 3-5: Follow up calls
- Day 6-7: Receive first responses

### Week 2: First Imports
- Certiport: 150 courses
- HSI: 50 courses
- CareerSafe: 50 courses
- **Total: 250 courses**

### Week 3: Major Imports
- JRI: 200 courses
- NRF: 100 courses
- NDS: 50 courses
- **Total: 600 courses**

### Week 4: Final Import
- Milady: 400 courses
- **Total: 1,000+ courses**

## Current Status

✅ **Phase 1 Complete**: 67 courses live
⏳ **Phase 2 Starting**: Partner outreach needed
⏳ **Phase 3 Planned**: Automated sync

## Recommended Action Plan

### Option A: Launch Now with 67 Courses (Recommended)
**Pros**:
- Start generating revenue immediately
- Test system with real students
- Build credibility with partners
- Iterate based on feedback

**Cons**:
- Limited course selection initially
- May miss some student needs

**Timeline**: Launch today, add courses weekly

### Option B: Wait for Full Catalog
**Pros**:
- Complete offering from day 1
- Better marketing impact
- More student options

**Cons**:
- Delays revenue by 4+ weeks
- Untested system at scale
- Partner delays could extend timeline

**Timeline**: Launch in 4-6 weeks

### Option C: Hybrid Approach (Best)
**Pros**:
- Launch with 67 courses immediately
- Add 50-100 courses per week
- Continuous improvement
- Revenue starts now

**Cons**:
- Requires ongoing work
- Marketing needs updates

**Timeline**: Launch today, reach 1,000+ in 4 weeks

## Recommendation

**Launch immediately with 67 courses** and add more weekly. Here's why:

1. **Revenue**: Start earning now vs. waiting 4+ weeks
2. **Testing**: Real students will reveal issues
3. **Momentum**: Partners respond better to active systems
4. **Marketing**: "New courses added weekly" is compelling
5. **Risk**: Waiting doesn't guarantee full catalog access

## Next Steps

1. ✅ Launch with current 67 courses
2. 📧 Email all 7 partners requesting full catalogs
3. 📞 Follow up with phone calls
4. 💻 Build import scripts as data arrives
5. 📈 Add 50-100 courses per week
6. 🎯 Reach 1,000+ courses in 4-6 weeks

## Partner Contact Script

```
Hi [Partner Name],

We've successfully launched our partner LMS integration with 67 courses 
across 7 training providers. We're seeing strong student interest and 
are ready to scale.

Could you provide your complete course catalog? We need:
- Course titles and descriptions
- Pricing (wholesale/partner rates)
- Categories and duration
- Any prerequisites

We can accept:
- API access (preferred)
- Excel/CSV export
- PDF catalog (we'll manually enter)

Our goal is to offer your full catalog to our students within 2 weeks.

When can we schedule a call to discuss?

Best regards,
[Your Name]
Elevate for Humanity Career Training Institute
```

## Success Metrics

### Week 1
- [ ] All 7 partners contacted
- [ ] 3+ partners respond
- [ ] First catalog received

### Week 2
- [ ] 250+ total courses
- [ ] First import scripts working
- [ ] 10+ student enrollments

### Week 4
- [ ] 600+ total courses
- [ ] 4+ partners fully imported
- [ ] 50+ student enrollments

### Week 6
- [ ] 1,000+ total courses
- [ ] All 7 partners imported
- [ ] 100+ student enrollments

## Conclusion

The system is **ready to launch with 67 courses**. Full catalog import is a 4-6 week process requiring partner cooperation. 

**Recommended**: Launch now, add courses weekly, reach 1,000+ in 4-6 weeks.
