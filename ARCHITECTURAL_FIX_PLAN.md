# ARCHITECTURAL FIX PLAN - Complete System Overhaul

**Date**: December 30, 2025  
**Status**: 🔴 **CRITICAL - STRUCTURAL PROBLEMS IDENTIFIED**  
**Scope**: 45 problems across 11 categories

---

## EXECUTIVE SUMMARY

The site "works" but has 45 structural problems that will surface during:
- Scale (volume)
- Audits (compliance)
- Partnerships (integration)
- Funding reviews (impact reporting)

**This is not about bugs. This is about architecture.**

---

## PROBLEM CATEGORIES

### 🔴 CATEGORY 1: STRATEGIC & POSITIONING (4 problems)
1. Audience collision - learners/partners/funders share entry points
2. Category ambiguity - unclear if platform/service/nonprofit/SaaS
3. Value attribution confusion - credit goes to providers, not platform
4. Over-broad promise surface - legal/reputational risk

### 🔴 CATEGORY 2: PROGRAM & CONTENT STRUCTURE (4 problems)
5. Program schema inconsistency - breaks automation
6. Program entropy - old programs linger
7. Implicit human dependency - appears automated but isn't
8. Outcomes not tied to programs - weak impact reporting

### 🔴 CATEGORY 3: FUNDING & ELIGIBILITY (4 problems)
9. Expectation mismatch - "funded" ≠ "you qualify"
10. State/locality variability hidden
11. Pre-qualification happens too late
12. Funding logic not machine-readable

### 🔴 CATEGORY 4: INTAKE & FUNNEL (4 problems)
13. Form gravity - too much data too early
14. Unclear post-submit expectations
15. Ghost risk - applicants disengage
16. No explicit funnel stages

### 🔴 CATEGORY 5: AUTHENTICATION & SECURITY (4 problems)
17. Robots.txt ≠ security
18. Potential role leakage
19. Authorization logic unclear
20. No visible audit trail

### 🔴 CATEGORY 6: DOCUMENT & RESOURCE (4 problems)
21. Document drift - old PDFs remain
22. No visible versioning
23. No audience targeting
24. Compliance contradiction risk

### 🔴 CATEGORY 7: PARTNER & LICENSING (4 problems)
25. Marketing ahead of delivery
26. Undefined service vs platform boundary
27. Custom work creep
28. No explicit tiering

### 🔴 CATEGORY 8: OPERATIONAL & SCALING (4 problems)
29. Manual processes disguised as features
30. Advisor bandwidth ceiling
31. No load-based prioritization
32. Hidden operational debt

### 🔴 CATEGORY 9: DATA, REPORTING & IMPACT (4 problems)
33. Metrics not first-class
34. No canonical data definitions
35. Hard-to-verify impact claims
36. Export complexity

### 🔴 CATEGORY 10: LEGAL & COMPLIANCE (4 problems)
37. Policy-behavior mismatch
38. Consent ambiguity
39. Data retention undefined
40. Jurisdictional risk

### 🔴 CATEGORY 11: PRODUCT GOVERNANCE (4 problems)
41. No explicit "not supported" list
42. Feature decisions lack guardrails
43. Roadmap driven by loudest need
44. Founder knowledge concentration

### 🔴 META-PROBLEM (1 problem)
45. Site implies operational maturity that comes later

---

## SOLUTION ARCHITECTURE

### Phase 1: Foundation (Week 1-2)

#### 1.1 Auth & Security (Problems 17-20)
```typescript
// lib/auth-guard.ts
export async function requireAuth() {
  const session = await getServerSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

// lib/rbac-guard.ts
export function requireRole(session, roles: string[]) {
  if (!roles.includes(session.user.role)) {
    throw new Error("Forbidden");
  }
}

// lib/audit-log.ts
export async function logAccess(userId, resource, action) {
  await db.auditLog.create({
    data: { userId, resource, action, timestamp: new Date() }
  });
}
```

**Fixes**: 17, 18, 19, 20

#### 1.2 Program Schema (Problems 5-8)
```prisma
// prisma/schema.prisma
model Program {
  id            String        @id @default(uuid())
  title         String
  status        ProgramStatus @default(DRAFT)
  durationWeeks Int
  modality      Modality
  prerequisites String
  fundingTypes  FundingType[]
  outcomes      Outcome[]
  published     Boolean       @default(false)
  archivedAt    DateTime?
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
}

enum ProgramStatus {
  DRAFT
  ACTIVE
  ARCHIVED
}

enum Modality {
  ONLINE
  IN_PERSON
  HYBRID
}

enum FundingType {
  WIOA
  STATE
  EMPLOYER
  SELF_PAY
}

model Outcome {
  id          String   @id @default(uuid())
  programId   String
  program     Program  @relation(fields: [programId], references: [id])
  studentId   String
  completed   Boolean
  placed      Boolean
  startingSalary Int?
  completedAt DateTime?
}
```

**Fixes**: 5, 6, 7, 8

#### 1.3 Staged Intake (Problems 13-16)
```typescript
// api/intake/interest/route.ts
export async function POST(req: Request) {
  const { name, email, careerInterest } = await req.json();
  
  const lead = await db.lead.create({
    data: { name, email, careerInterest, stage: "INTEREST" }
  });
  
  return Response.json({ 
    leadId: lead.id, 
    nextStep: "/intake/eligibility" 
  });
}

// api/intake/eligibility/route.ts
export async function POST(req: Request) {
  const { leadId, state, income, employmentStatus } = await req.json();
  
  const eligible = checkEligibility(state, income, employmentStatus);
  
  await db.lead.update({
    where: { id: leadId },
    data: { 
      stage: eligible ? "ELIGIBLE" : "INELIGIBLE",
      eligibilityData: { state, income, employmentStatus }
    }
  });
  
  return Response.json({ 
    eligible, 
    nextStep: eligible ? "/intake/application" : "/resources" 
  });
}

// api/intake/application/route.ts
export async function POST(req: Request) {
  const { leadId, documents, history } = await req.json();
  
  await db.lead.update({
    where: { id: leadId },
    data: { 
      stage: "APPLICATION_SUBMITTED",
      applicationData: { documents, history }
    }
  });
  
  return Response.json({ 
    status: "submitted",
    nextStep: "advisor-review",
    expectedResponse: "3-5 business days"
  });
}
```

**Fixes**: 13, 14, 15, 16

---

### Phase 2: Clarity & Boundaries (Week 3-4)

#### 2.1 Platform Capabilities (Problems 1-4, 25-28, 41-44)
```typescript
// lib/capabilities.ts
export const PLATFORM_CAPABILITIES = {
  DOES: [
    "intake and pre-qualification",
    "program matching",
    "document storage",
    "advisor workflow tools",
    "reporting and analytics",
    "partner portal access"
  ],
  DOES_NOT: [
    "guarantee funding approval",
    "guarantee job placement",
    "replace workforce board decisions",
    "provide direct training (partners do)",
    "make eligibility determinations (advisors do)"
  ],
  REQUIRES_HUMAN: [
    "eligibility review",
    "funding application support",
    "career counseling",
    "placement assistance"
  ]
};

export const PARTNER_TIERS = {
  BASIC: {
    features: ["program listing", "referrals", "basic reporting"],
    price: 0,
    support: "email only"
  },
  PILOT: {
    features: ["basic + custom branding", "API access", "priority support"],
    price: 500,
    support: "email + monthly call"
  },
  FULL: {
    features: ["pilot + white label", "SSO", "dedicated success manager"],
    price: 2000,
    support: "24/7 support"
  }
};

export const NOT_SUPPORTED = [
  "custom program creation by partners",
  "direct student payments",
  "training delivery",
  "credential issuance (partners do)",
  "employer direct hire",
  "background checks"
];
```

**Fixes**: 1, 2, 3, 4, 25, 26, 27, 28, 41, 42, 43, 44

#### 2.2 Funding Logic (Problems 9-12)
```typescript
// lib/funding-eligibility.ts
export interface EligibilityRules {
  state: string;
  county?: string;
  incomeMax: number;
  employmentStatus: string[];
  age?: { min: number; max: number };
}

export const FUNDING_RULES: Record<string, EligibilityRules> = {
  WIOA_IN: {
    state: "IN",
    incomeMax: 60000,
    employmentStatus: ["unemployed", "underemployed"],
    age: { min: 18, max: 65 }
  },
  WRG_IN: {
    state: "IN",
    incomeMax: 50000,
    employmentStatus: ["unemployed"]
  }
};

export function checkEligibility(
  state: string, 
  income: number, 
  employmentStatus: string
): { eligible: boolean; fundingTypes: string[]; reason?: string } {
  const eligibleFunding = Object.entries(FUNDING_RULES)
    .filter(([_, rules]) => 
      rules.state === state &&
      income <= rules.incomeMax &&
      rules.employmentStatus.includes(employmentStatus)
    )
    .map(([type]) => type);
  
  if (eligibleFunding.length === 0) {
    return {
      eligible: false,
      fundingTypes: [],
      reason: "Income or employment status does not meet requirements"
    };
  }
  
  return {
    eligible: true,
    fundingTypes: eligibleFunding
  };
}
```

**Fixes**: 9, 10, 11, 12

---

### Phase 3: Documents & Compliance (Week 5-6)

#### 3.1 Versioned Documents (Problems 21-24, 37-40)
```prisma
model Document {
  id          String       @id @default(uuid())
  title       String
  version     Int
  audience    Audience
  category    DocCategory
  fileUrl     String
  active      Boolean      @default(false)
  publishedAt DateTime?
  archivedAt  DateTime?
  createdBy   String
  approvedBy  String?
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
}

enum Audience {
  PUBLIC
  STUDENT
  PARTNER
  ADVISOR
  ADMIN
}

enum DocCategory {
  POLICY
  HANDBOOK
  FORM
  GUIDE
  LEGAL
}
```

```typescript
// lib/document-manager.ts
export async function getActiveDocument(
  category: string, 
  audience: string
) {
  return await db.document.findFirst({
    where: {
      category,
      audience,
      active: true,
      archivedAt: null
    },
    orderBy: { version: 'desc' }
  });
}

export async function publishDocument(
  documentId: string, 
  approvedBy: string
) {
  // Archive old version
  await db.document.updateMany({
    where: { 
      category: doc.category,
      audience: doc.audience,
      active: true 
    },
    data: { active: false, archivedAt: new Date() }
  });
  
  // Activate new version
  await db.document.update({
    where: { id: documentId },
    data: { 
      active: true, 
      publishedAt: new Date(),
      approvedBy 
    }
  });
}
```

**Fixes**: 21, 22, 23, 24, 37, 38, 39, 40

---

### Phase 4: Operations & Scale (Week 7-8)

#### 4.1 Admin Review Queue (Problems 29-32)
```typescript
// lib/review-queue.ts
export async function getReviewQueue(advisorId: string) {
  return await db.lead.findMany({
    where: {
      stage: "APPLICATION_SUBMITTED",
      assignedTo: advisorId,
      reviewedAt: null
    },
    orderBy: [
      { priority: 'desc' },
      { createdAt: 'asc' }
    ],
    include: {
      program: true,
      documents: true,
      notes: true
    }
  });
}

export async function assignPriority(leadId: string, priority: number) {
  await db.lead.update({
    where: { id: leadId },
    data: { priority }
  });
}

export async function addNote(leadId: string, advisorId: string, note: string) {
  await db.note.create({
    data: {
      leadId,
      advisorId,
      content: note,
      timestamp: new Date()
    }
  });
}
```

**Fixes**: 29, 30, 31, 32

#### 4.2 Metrics & Reporting (Problems 33-36)
```prisma
model Metric {
  id        String     @id @default(uuid())
  type      MetricType
  value     Float
  metadata  Json
  timestamp DateTime   @default(now())
}

enum MetricType {
  ENROLLMENT
  COMPLETION
  PLACEMENT
  STARTING_SALARY
  TIME_TO_PLACEMENT
}
```

```typescript
// lib/metrics.ts
export const CANONICAL_DEFINITIONS = {
  ENROLLMENT: "Student officially registered in program with signed agreement",
  COMPLETION: "Student finished all required coursework and passed assessments",
  PLACEMENT: "Student employed in field within 90 days of completion",
  STARTING_SALARY: "First year annual salary in placed position"
};

export async function recordMetric(
  type: MetricType, 
  value: number, 
  metadata: any
) {
  await db.metric.create({
    data: { type, value, metadata, timestamp: new Date() }
  });
}

export async function generateReport(
  startDate: Date, 
  endDate: Date, 
  format: 'state' | 'funder' | 'internal'
) {
  const metrics = await db.metric.findMany({
    where: {
      timestamp: { gte: startDate, lte: endDate }
    }
  });
  
  // Format based on recipient requirements
  switch (format) {
    case 'state':
      return formatStateReport(metrics);
    case 'funder':
      return formatFunderReport(metrics);
    case 'internal':
      return formatInternalReport(metrics);
  }
}
```

**Fixes**: 33, 34, 35, 36

---

## IMPLEMENTATION PRIORITY

### 🔥 CRITICAL (Do First - Week 1-2)
**Problems**: 17, 18, 19, 20 (Security)
**Problems**: 5, 6, 7, 8 (Program Schema)
**Problems**: 13, 14, 15, 16 (Intake)

**Why**: These are security risks and data integrity issues that get worse with scale.

### ⚠️ HIGH (Do Next - Week 3-4)
**Problems**: 1, 2, 3, 4 (Positioning)
**Problems**: 9, 10, 11, 12 (Funding)
**Problems**: 25, 26, 27, 28 (Partners)
**Problems**: 41, 42, 43, 44 (Governance)

**Why**: These cause expectation mismatches and scope creep.

### 📊 MEDIUM (Do After - Week 5-6)
**Problems**: 21, 22, 23, 24 (Documents)
**Problems**: 37, 38, 39, 40 (Compliance)

**Why**: These matter for audits and legal reviews.

### 🔧 LOW (Do Last - Week 7-8)
**Problems**: 29, 30, 31, 32 (Operations)
**Problems**: 33, 34, 35, 36 (Reporting)

**Why**: These optimize existing processes but aren't blockers.

---

## NON-CODE MITIGATIONS (Immediate)

While implementing code fixes, do these NOW:

### 1. Update Homepage Copy
**Before**: "Free career training"  
**After**: "Connect with funded training opportunities"

### 2. Add Eligibility Disclaimer
**Add to all program pages**:
> "Funding eligibility varies by state, income, and employment status. Complete our pre-qualification to learn if you qualify."

### 3. Create Partner Tier Sheet
**Document in Google Sheets**:
- Basic: What's included, what's not
- Pilot: What's included, what's not
- Full: What's included, what's not

### 4. Define "Not Supported" List
**Add to partner docs**:
- Custom program creation
- Direct payments
- Training delivery
- Credential issuance
- Background checks

### 5. Create Advisor Playbook
**Document human processes**:
- Eligibility review checklist
- Funding application support steps
- Placement assistance workflow

---

## SUCCESS METRICS

### Week 2
- ✅ All admin routes have auth guards
- ✅ Program schema enforced in database
- ✅ Staged intake API deployed

### Week 4
- ✅ Platform capabilities documented
- ✅ Funding eligibility machine-readable
- ✅ Partner tiers defined

### Week 6
- ✅ Document versioning system live
- ✅ Compliance policies updated
- ✅ Data retention policy defined

### Week 8
- ✅ Admin review queue operational
- ✅ Metrics system recording
- ✅ Reports generating correctly

---

## DECISION FRAMEWORK

For every new feature request, ask:

1. **Does this require human judgment?**
   - If yes → Build admin tool, not automation

2. **Does this create a promise we can't keep?**
   - If yes → Don't build it

3. **Does this work at 10x volume?**
   - If no → Redesign before building

4. **Can we explain this to a funder?**
   - If no → Document or don't do it

---

## FINAL TRUTH

**This is not a rebuild. This is a refactor with guardrails.**

You don't need to stop everything. You need to:
1. Add auth guards (1 week)
2. Enforce schemas (1 week)
3. Stage intake (1 week)
4. Document boundaries (1 week)
5. Version documents (1 week)
6. Build admin tools (1 week)
7. Add metrics (1 week)
8. Test everything (1 week)

**8 weeks = Production-grade foundation**

---

**Next Steps**:
1. Review this plan
2. Confirm priority order
3. Start with Week 1 (Security + Schema)
4. Deploy incrementally
5. Test at each phase

**Status**: 📋 PLAN READY FOR EXECUTION

