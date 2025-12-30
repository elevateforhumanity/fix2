# Tax Operations - Sub-Office Management System

**Status:** Production-Ready  
**Model:** Hub-and-Satellite  
**Effective:** Tax Season 2025

---

## Overview

This directory contains the complete operational framework for managing sub-office tax preparation locations under the Supersonic Fast Cash main office.

**Key Principle:** Centralized control with distributed intake.

---

## Directory Structure

```
tax-ops/
├─ site/
│  └─ pages/
│     ├─ sub-office-mou.html           # Public-facing agreement
│     └─ sub-office-onboarding.html    # Onboarding instructions
├─ agreements/
│  ├─ sub-office-mou.md                # Markdown version for PDF
│  └─ signed/                          # Executed agreements
├─ bonuses/
│  └─ season-bonus-rules.json          # Discretionary bonus structure
├─ pricing/
│  └─ fee-structure.json               # Fee breakdown and splits
├─ splits/
│  └─ compensation-rules.json          # Payment rules and conditions
├─ docs/
│  └─ sub-office-explainer.md          # Recruiting one-pager
└─ README.md                           # This file
```

---

## Compensation Model

### Base Split

- **Sub-Office:** 45% of base preparation fee
- **Main Office:** 55% of base preparation fee

### Add-On Fees

- **Sub-Office:** 0%
- **Main Office:** 100%

**Rationale:** Main Office handles all complexity, compliance, audits, and risk.

### Payment Conditions

- Paid only on **accepted returns**
- No payment on rejected, withdrawn, or penalized returns
- Bi-weekly payment cycle
- 7 business days processing time

---

## Quality Standards

### Requirements

- Maximum 3% error rate
- Zero compliance violations
- Adherence to Main Office procedures

### Consequences

1. **First offense:** Warning
2. **Second offense:** Probation
3. **Third offense:** Termination

---

## Bonuses (Discretionary)

**Volume Bonuses:**

- 50-74 returns: $500
- 75-99 returns: $1,000
- 100+ returns: $1,500

**Quality Bonuses:**

- Error rate under 3%: $500
- Zero compliance flags: $500

**Important:** Bonuses are discretionary and do not modify base compensation.

---

## Onboarding Workflow

### Step 1: Review

Sub-office reviews MOU at `/sub-office-agreement`

### Step 2: Sign

- Download PDF
- Sign (DocuSign, Adobe, or wet signature)
- Upload or email signed copy

### Step 3: Training

- Complete onboarding training
- Receive intake procedures
- Receive software credentials

### Step 4: Activate

Begin client intake following Main Office procedures

---

## Non-Negotiable Rules

1. **No signed MOU = No access**
2. **No returns processed without agreement**
3. **Main Office has final authority on all returns**
4. **Add-on fees are 100% Main Office**
5. **Quality violations = immediate review**

---

## Legal Protection

This structure ensures:

- ✅ No partnership or joint venture created
- ✅ No ownership interest conveyed
- ✅ Independent contractor relationship
- ✅ Main Office retains all final authority
- ✅ Clear compensation boundaries
- ✅ Enforceable quality standards

---

## Files Reference

### Public-Facing

- `site/pages/sub-office-mou.html` - Publishable agreement
- `site/pages/sub-office-onboarding.html` - Onboarding guide
- `docs/sub-office-explainer.md` - Recruiting one-pager

### Internal Only

- `bonuses/season-bonus-rules.json` - Bonus structure (discretionary)
- `splits/compensation-rules.json` - Payment rules
- `pricing/fee-structure.json` - Fee breakdown

### Signed Documents

- `agreements/signed/` - Executed MOUs (PDF)

---

## Next Steps

### For Main Office

1. Publish MOU page to website
2. Set up signed agreement storage
3. Create onboarding checklist
4. Establish quality review process

### For Sub-Offices

1. Review MOU
2. Sign agreement
3. Complete training
4. Begin intake

---

## Contact

**Main Office:** Supersonic Fast Cash  
**Email:** supersonicfastcash@gmail.com  
**Phone:** (317) 314-3757  
**Licensed:** Enrolled Agent (EA)

---

## Version History

- **v1.0** - Initial production release (2025-01-01)

---

**This is operator-grade infrastructure. Use it.**
