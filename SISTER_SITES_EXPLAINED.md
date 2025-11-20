# Sister Sites Explained

**Date:** November 15, 2024  
**Status:** Planned organizations under Elevate for Humanity umbrella

---

## 🏢 THE ELEVATE FOR HUMANITY NETWORK

These are **planned sister organizations** that are part of your broader mission. They're referenced in the code but **not yet live**.

---

## 1. Elevate Connects Directory ⭐ (THIS IS YOU)

**URL:** https://www.elevateforhumanity.org  
**Status:** 🚧 In Development (what we're deploying now)

**Purpose:** Workforce LMS + Case Management Platform

**What it does:**

- Learning Management System for workforce training
- Case management for WIOA, WRG, JRI programs
- Course catalog and enrollment
- Certificate generation
- Progress tracking
- Admin portal for program management

**Target Users:**

- Students/Learners
- Workforce program administrators
- Training providers (Program Holders)
- Case managers (Delegates)

---

## 2. Selfish Inc.

**URL:** https://www.selfishinc.org (not live yet)  
**Also:** https://www.selfishincsupport.org (mentioned in docs)  
**Status:** 🔮 Planned

**Purpose:** Nonprofit/Philanthropic Arm

**What it's supposed to do:**

- Grant programs for individual learners ($500-$5,000)
- Scholarship funding
- Community impact initiatives
- Donor management
- Volunteer coordination

**Mission Statement (from docs):**

> "Creating Pathways to Prosperity Through Education and Workforce Development"

**Grant Programs:**

- Individual Learner Grants
- Tuition assistance
- Books and materials
- Certification exam fees
- Technology (laptops, software)
- Transportation assistance
- Childcare support
- Work clothing/uniforms

**Founded by:** Elizabeth L. Greene (according to docs)

---

## 3. Rise Forward Foundation

**URL:** https://www.riseforwardfoundation.org (not live yet)  
**Status:** 🔮 Planned

**Purpose:** Foundation/Funding Organization

**What it's supposed to do:**

- Foundation-level philanthropy
- Large-scale grant programs
- Strategic partnerships
- Community development
- Impact measurement

**Focus Areas (inferred):**

- Workforce development
- Educational equity
- Economic mobility
- Second chance programs

---

## 🎯 THE NETWORK STRUCTURE

```
┌─────────────────────────────────────────────────────────┐
│  ELEVATE FOR HUMANITY                                   │
│  Career & Technical Institute                           │
│  (Parent Organization)                                  │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
┌───────────────┐  ┌──────────────┐  ┌──────────────┐
│   ELEVATE     │  │  SELFISH INC │  │ RISE FORWARD │
│   CONNECTS    │  │              │  │  FOUNDATION  │
│  DIRECTORY    │  │  (Nonprofit) │  │ (Foundation) │
│               │  │              │  │              │
│  • LMS        │  │  • Grants    │  │  • Funding   │
│  • Training   │  │  • Scholarsh │  │  • Partners  │
│  • Courses    │  │  • Support   │  │  • Impact    │
└───────────────┘  └──────────────┘  └──────────────┘
```

---

## 💡 HOW THEY WORK TOGETHER

### **Student Journey Example:**

1. **Discovery:** Student finds Elevate Connects Directory (your LMS)
2. **Financial Need:** Student can't afford training
3. **Grant Application:** Student applies for Selfish Inc. grant
4. **Funding:** Rise Forward Foundation provides institutional funding
5. **Training:** Student enrolls in courses on Elevate Connects
6. **Success:** Student completes training and gets certified

### **Ecosystem Flow:**

```
Rise Forward Foundation
        ↓ (provides funding)
Selfish Inc.
        ↓ (awards grants to students)
Elevate Connects Directory
        ↓ (delivers training)
Trained Workforce
```

---

## 📊 CURRENT STATUS

| Organization                   | Status      | URL                       | Purpose               |
| ------------------------------ | ----------- | ------------------------- | --------------------- |
| **Elevate Connects Directory** | 🚧 Building | elevateforhumanity.org    | LMS Platform          |
| **Selfish Inc.**               | 🔮 Planned  | selfishinc.org            | Grants & Scholarships |
| **Rise Forward Foundation**    | 🔮 Planned  | riseforwardfoundation.org | Foundation Funding    |

---

## 🤔 SHOULD YOU INCLUDE THEM NOW?

### **Option 1: Include Them (Build Anticipation)**

**Pros:**

- ✅ Shows your broader vision
- ✅ Builds brand awareness
- ✅ Creates anticipation
- ✅ Demonstrates comprehensive ecosystem

**Cons:**

- ❌ Links go to non-existent sites (404 errors)
- ❌ Might confuse users
- ❌ Looks unprofessional if sites don't exist

**How to do it:**

```typescript
// components/SisterSites.tsx
export function SisterSites() {
  const sites = [
    {
      name: "Selfish Inc.",
      url: "#", // Don't link yet
      description: "Grant programs and scholarships",
      status: "Coming Soon"
    },
    {
      name: "Rise Forward Foundation",
      url: "#",
      description: "Foundation funding and partnerships",
      status: "Coming Soon"
    }
  ];

  return (
    <div className="border-t border-gray-200 pt-8 mt-8">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Our Network</h3>
      <ul className="space-y-3">
        {sites.map((site) => (
          <li key={site.name} className="text-sm">
            <div className="font-medium text-gray-900">{site.name}</div>
            <div className="text-gray-600">{site.description}</div>
            <span className="text-xs text-blue-600">{site.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

### **Option 2: Don't Include Them Yet (Recommended)**

**Pros:**

- ✅ No broken links
- ✅ Professional appearance
- ✅ Focus on what's working
- ✅ Add them when they're ready

**Cons:**

- ❌ Doesn't show full vision
- ❌ Misses cross-promotion opportunity

**Recommendation:** Wait until the sites are live

---

## 🚀 WHEN TO ADD THEM

**Add sister sites when:**

1. ✅ Your main LMS is deployed and working
2. ✅ The sister sites are actually built
3. ✅ The domains are registered and live
4. ✅ There's content on those sites

**Don't add them if:**

- ❌ Sites don't exist yet
- ❌ Domains aren't registered
- ❌ You're still building the main LMS

---

## 📝 WHAT TO DO NOW

### **Immediate (Now):**

- ❌ **Don't add sister sites to your footer yet**
- ✅ Focus on getting your LMS deployed
- ✅ Get elevateforhumanity.org working first

### **Short-term (1-3 months):**

- Register the domains (selfishinc.org, riseforwardfoundation.org)
- Build simple landing pages for each
- Add "Coming Soon" messaging

### **Long-term (6-12 months):**

- Build out full sites for each organization
- Implement grant application system
- Create foundation portal
- Add cross-linking between all sites

---

## 🎯 RECOMMENDED FOOTER (For Now)

**Simple footer without sister sites:**

```typescript
// components/Footer.tsx
export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* About */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              Elevate for Humanity
            </h3>
            <p className="text-sm text-gray-600">
              Career & Technical Institute providing workforce training
              and case management for WIOA, WRG, and JRI programs.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Phone: +1-317-760-7908</li>
              <li>Email: info@elevateforhumanity.org</li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-gray-600 hover:text-gray-900">About Us</a></li>
              <li><a href="/programs" className="text-gray-600 hover:text-gray-900">Programs</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a></li>
            </ul>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Elevate for Humanity. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
```

---

## ✅ CONCLUSION

**Sister Sites:**

- Selfish Inc. = Grants & Scholarships (not live)
- Rise Forward Foundation = Foundation Funding (not live)

**What to do:**

- ❌ Don't add them to your site yet
- ✅ Focus on deploying your LMS first
- ✅ Add them later when they're actually built

**Priority:**

1. Get elevateforhumanity.org deployed ⭐⭐⭐
2. Build sister sites (later)
3. Add cross-linking (much later)

**Don't get distracted by sister sites. Focus on fixing your build and deploying your LMS!**
