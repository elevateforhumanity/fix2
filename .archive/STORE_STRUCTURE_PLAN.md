# Store Structure Plan - Based on Actual LMS Content

## 📚 WHAT'S IN YOUR LMS (Found 33 Course Files)

### Programs with Full Course Content:
1. Barber Apprenticeship ✅
2. Behavioral Health ✅
3. Building Maintenance ✅
4. CDL ✅
5. CDL Hazmat ✅
6. CNA ✅
7. Commercial Cleaning ✅
8. Construction Trades ✅
9. Cosmetology ✅
10. Customer Service ✅
11. Cybersecurity ✅
12. Dental Assistant ✅
13. Early Childhood ✅
14. EKG Tech ✅
15. Electrical ✅
16. Entrepreneurship ✅
17. Esthetics Apprenticeship ✅
18. Forklift ✅
19. Hospitality ✅
20. HVAC ✅
21. IT Support ✅
22. Medical Assistant ✅
23. Medical Billing ✅
24. Patient Care Tech ✅
25. Peer Recovery ✅
26. Pharmacy Tech ✅
27. Phlebotomy ✅
28. Plumbing ✅
29. Security Officer ✅
30. Tax Prep ✅
31. Warehouse Logistics ✅
32. Welding ✅

### Each Course Has:
- Modules (organized sections)
- Lessons (video, reading, quiz, lab, SCORM)
- Partner content (MILADY, JRI, VITA, etc.)
- Duration tracking
- Credential pathways

---

## 🛒 STORE PRODUCTS (Based on LMS Content)

### Category 1: Digital Workbooks & Study Materials
**From LMS Courses - Extract and Package:**

1. **Barber Apprenticeship Workbook** - $29.99
   - All reading lessons compiled
   - Practice exercises
   - State exam prep
   - Downloadable PDF

2. **CNA Study Guide & Practice Tests** - $39.99
   - Complete study materials
   - 500+ practice questions
   - Skills checklist
   - Downloadable PDF

3. **HVAC Technician Workbook** - $34.99
   - Technical diagrams
   - Practice problems
   - EPA 608 prep
   - Downloadable PDF

4. **Medical Assistant Complete Bundle** - $49.99
   - All course materials
   - Clinical skills guide
   - Certification prep
   - Downloadable PDF

**For Each of 32 Programs:**
- Study guide/workbook ($29.99-49.99)
- Practice test bundle ($19.99-29.99)
- Quick reference guide ($14.99)

### Category 2: Video Course Access
**Standalone Video Lessons:**

1. **Barber Skills Video Library** - $99.99
   - All video lessons from course
   - Lifetime access
   - Stream or download

2. **CNA Clinical Skills Videos** - $79.99
   - Step-by-step demonstrations
   - All required skills
   - Lifetime access

**For Each Program:**
- Complete video library ($79.99-149.99)
- Individual module videos ($19.99-39.99)

### Category 3: Certification Prep Packages
**Based on Partner Content:**

1. **MILADY Barber Exam Prep** - $149.99
   - Official MILADY content
   - Practice exams
   - Study materials
   - 90-day access

2. **CNA State Exam Prep** - $99.99
   - State-specific prep
   - Practice tests
   - Skills videos
   - 60-day access

3. **EPA 608 HVAC Certification Prep** - $129.99
   - Core, Type I, II, III
   - Practice exams
   - Study guides
   - 90-day access

### Category 4: SCORM Packages (JRI, VITA)
**External Partner Content:**

1. **JRI Core Module 1** - $0 (Free for eligible)
   - Job Ready Indy content
   - SCORM 2004 package
   - Certificate upon completion

2. **JRI Core Module 2** - $0 (Free for eligible)
   - Advanced JRI content
   - SCORM 2004 package
   - Certificate upon completion

3. **IRS VITA Tax Prep Training** - $0 (Free)
   - Official IRS training
   - Link & Learn access
   - VITA certification

### Category 5: Physical Products
**Tools & Equipment:**

1. **Barber Tool Kit - Professional** - $299.99
2. **CNA Scrubs Set** - $45.99
3. **HVAC Tool Set - Starter** - $449.99
4. **Safety Equipment Bundle** - $79.99
5. **Medical Assistant Supplies Kit** - $129.99

**Uniforms & Apparel:**
1. **Program-specific scrubs** - $35.99-59.99
2. **Safety gear** - $19.99-89.99
3. **Branded merchandise** - $15.99-39.99

### Category 6: Templates & Resources
**Business Tools:**

1. **Barber Shop Business Plan Template** - $19.99
2. **Resume Templates - Healthcare** - $9.99
3. **Interview Prep Guide** - $14.99
4. **Portfolio Templates** - $12.99

---

## 🏗️ STORE STRUCTURE

```
app/marketplace/
├── page.tsx (main store - all products)
├── categories/
│   ├── digital-workbooks/page.tsx
│   ├── video-courses/page.tsx
│   ├── certification-prep/page.tsx
│   ├── scorm-packages/page.tsx
│   ├── physical-products/page.tsx
│   └── templates/page.tsx
├── products/
│   └── [id]/page.tsx (individual product)
├── cart/page.tsx
├── checkout/page.tsx
└── orders/
    ├── page.tsx (order history)
    └── [id]/page.tsx (order details)
```

---

## 📱 APPS STRUCTURE

```
app/demo/
├── page.tsx (demo hub)
├── apps/
│   ├── page.tsx (all apps)
│   ├── student-portal/page.tsx
│   ├── instructor-dashboard/page.tsx
│   ├── admin-console/page.tsx
│   ├── career-matcher/page.tsx
│   ├── roi-calculator/page.tsx
│   └── salary-estimator/page.tsx
├── courses/
│   ├── page.tsx (course demos)
│   └── [program]/page.tsx (specific program demo)
└── lms/
    └── page.tsx (LMS dashboard demo)
```

---

## 🎯 INTEGRATION PLAN

### Step 1: Create Product Database
```typescript
// lib/store/products.ts
export interface StoreProduct {
  id: string;
  name: string;
  category: 'digital' | 'video' | 'certification' | 'scorm' | 'physical' | 'template';
  price: number;
  description: string;
  image: string;
  programId?: string; // Link to LMS course
  downloadUrl?: string; // For digital products
  videoUrl?: string; // For video products
  scormPackageId?: string; // For SCORM
  stripeProductId?: string; // Stripe integration
  stripePriceId?: string; // Stripe integration
  inStock: boolean;
  featured: boolean;
}
```

### Step 2: Wire Up Stripe
- Use existing `lib/stripe/stripe-client.ts`
- Create products in Stripe dashboard
- Link to store products

### Step 3: Build Store Pages
- Product catalog with filters
- Shopping cart (localStorage)
- Checkout with Stripe
- Order management

### Step 4: Build Demo/Apps
- Course previews (sample lessons)
- Interactive tools
- LMS dashboard demo
- No login required

---

## 🚀 IMMEDIATE ACTIONS

### TODAY:
1. Create product database from LMS courses
2. Build store product catalog page
3. Create shopping cart
4. Wire up Stripe checkout

### THIS WEEK:
1. Complete all store pages
2. Build demo/apps section
3. Extract workbooks from courses
4. Test full purchase flow

---

## 💰 REVENUE POTENTIAL

### Digital Products (High Margin):
- 32 programs × 3 products each = 96 products
- Average price: $29.99
- Potential: $2,879 per month (if 1 sale per product)

### Video Courses:
- 32 programs × $99 average = $3,168 per month

### Physical Products:
- Tools, uniforms, supplies
- $10,000+ per month potential

### Total Potential: $15,000-25,000/month

---

## ✅ READY TO BUILD

**I will now:**
1. Create product database from your 32 courses
2. Build complete store with cart & checkout
3. Create demo/apps section
4. Wire everything to Stripe
5. Test and deploy

**Starting now!**
