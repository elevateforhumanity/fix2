# White-Label Store Setup - Clone Wrapper for Any Program

## 🎯 CONCEPT

The store should be a **white-label template** that can wrap around:
1. Your 32 programs (Barber, CNA, HVAC, etc.)
2. ANY other organization's programs
3. Partner programs
4. Cloned/licensed versions

## 📦 WHAT YOU HAVE

### Found Store Templates:
1. `/public/pages/elevate-store.html` - Main store template
2. `/public/pages/flash-sale-store.html` - Flash sale version
3. `/public/pages/partner-marketplace.html` - Partner marketplace
4. `/public/pages/store.html` - Generic store

### Found Infrastructure:
- `/lib/store/` - Store utilities
- `/components/store/` - Store components
- `/app/marketplace/` - Marketplace app
- Stripe integration ✅
- Product database ✅
- Shopping cart ✅

## 🏗️ WHITE-LABEL ARCHITECTURE

```
┌─────────────────────────────────────────┐
│         WHITE-LABEL WRAPPER             │
│  (Can be cloned for any organization)   │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────┐  ┌─────────────┐     │
│  │   STORE     │  │    DEMO     │     │
│  │  Products   │  │   Courses   │     │
│  │  Cart       │  │   Preview   │     │
│  │  Checkout   │  │   Tools     │     │
│  └─────────────┘  └─────────────┘     │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │      PROGRAM CONTENT            │   │
│  │  (Pluggable - Any Programs)     │   │
│  ├─────────────────────────────────┤   │
│  │ • Barber                        │   │
│  │ • CNA                           │   │
│  │ • HVAC                          │   │
│  │ • ... (32 total)                │   │
│  │ OR                              │   │
│  │ • Partner Program A             │   │
│  │ • Partner Program B             │   │
│  │ • Custom Program C              │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

## 🔧 IMPLEMENTATION STRUCTURE

### 1. Configuration File (White-Label Settings)
```typescript
// config/white-label.ts
export interface WhiteLabelConfig {
  organizationName: string;
  organizationSlug: string;
  branding: {
    primaryColor: string;
    secondaryColor: string;
    logo: string;
    favicon: string;
  };
  programs: Program[];
  features: {
    store: boolean;
    demo: boolean;
    lms: boolean;
    marketplace: boolean;
  };
  integrations: {
    stripe: {
      publishableKey: string;
      secretKey: string;
    };
    supabase: {
      url: string;
      anonKey: string;
    };
  };
}

// Example: Elevate for Humanity
export const elevateConfig: WhiteLabelConfig = {
  organizationName: "Elevate for Humanity",
  organizationSlug: "elevate",
  branding: {
    primaryColor: "#F97316", // Orange
    secondaryColor: "#2563EB", // Blue
    logo: "/logos/elevate-logo.svg",
    favicon: "/favicon.ico"
  },
  programs: [
    // All 32 programs
  ],
  features: {
    store: true,
    demo: true,
    lms: true,
    marketplace: true
  },
  integrations: {
    // Keys
  }
};

// Example: Partner Organization
export const partnerConfig: WhiteLabelConfig = {
  organizationName: "Partner Training Center",
  organizationSlug: "partner",
  branding: {
    primaryColor: "#10B981",
    secondaryColor: "#3B82F6",
    logo: "/logos/partner-logo.svg",
    favicon: "/partner-favicon.ico"
  },
  programs: [
    // Their programs
  ],
  features: {
    store: true,
    demo: false,
    lms: true,
    marketplace: false
  },
  integrations: {
    // Their keys
  }
};
```

### 2. Store Structure (White-Label)
```
app/
├── [org]/                    # Dynamic organization route
│   ├── marketplace/
│   │   ├── page.tsx         # Store main page
│   │   ├── products/
│   │   │   └── [id]/page.tsx
│   │   ├── cart/page.tsx
│   │   ├── checkout/page.tsx
│   │   └── orders/
│   │       ├── page.tsx
│   │       └── [id]/page.tsx
│   ├── demo/
│   │   ├── page.tsx         # Demo hub
│   │   ├── courses/
│   │   │   └── [program]/page.tsx
│   │   └── tools/
│   │       ├── career-matcher/page.tsx
│   │       ├── roi-calculator/page.tsx
│   │       └── salary-estimator/page.tsx
│   └── programs/
│       └── [slug]/page.tsx  # Program pages
```

### 3. Product Database (White-Label)
```typescript
// lib/store/products-generator.ts
export function generateProductsForOrg(
  config: WhiteLabelConfig
): StoreProduct[] {
  const products: StoreProduct[] = [];

  // Generate products for each program
  config.programs.forEach(program => {
    // Digital Workbook
    products.push({
      id: `${config.organizationSlug}-wb-${program.slug}`,
      name: `${program.name} Complete Workbook`,
      category: 'digital-workbook',
      price: 34.99,
      programId: program.id,
      organizationId: config.organizationSlug,
      // ... rest of product data
    });

    // Video Course
    products.push({
      id: `${config.organizationSlug}-vid-${program.slug}`,
      name: `${program.name} Video Library`,
      category: 'video-course',
      price: 99.99,
      programId: program.id,
      organizationId: config.organizationSlug,
      // ... rest of product data
    });

    // Certification Prep
    products.push({
      id: `${config.organizationSlug}-cert-${program.slug}`,
      name: `${program.name} Certification Prep`,
      category: 'certification-prep',
      price: 129.99,
      programId: program.id,
      organizationId: config.organizationSlug,
      // ... rest of product data
    });
  });

  return products;
}
```

### 4. Demo Pages (White-Label)
```typescript
// app/[org]/demo/page.tsx
import { getOrgConfig } from '@/config/white-label';

export default async function DemoPage({ 
  params 
}: { 
  params: { org: string } 
}) {
  const config = await getOrgConfig(params.org);
  
  return (
    <div>
      <h1>Try {config.organizationName}</h1>
      
      {/* Demo courses from their programs */}
      <DemoCourses programs={config.programs} />
      
      {/* Interactive tools */}
      <DemoTools />
      
      {/* LMS preview */}
      <LMSPreview />
    </div>
  );
}
```

## 🎨 BRANDING SYSTEM

### Dynamic Theming
```typescript
// lib/theme.ts
export function getTheme(config: WhiteLabelConfig) {
  return {
    colors: {
      primary: config.branding.primaryColor,
      secondary: config.branding.secondaryColor,
    },
    logo: config.branding.logo,
    favicon: config.branding.favicon,
  };
}

// Usage in components
const theme = getTheme(config);
<button style={{ backgroundColor: theme.colors.primary }}>
  Buy Now
</button>
```

### CSS Variables
```css
/* Generated dynamically per organization */
:root {
  --primary-color: #F97316; /* From config */
  --secondary-color: #2563EB; /* From config */
  --logo-url: url('/logos/elevate-logo.svg'); /* From config */
}
```

## 📦 DEPLOYMENT OPTIONS

### Option 1: Multi-Tenant (Single Deployment)
```
elevateforhumanity.org/marketplace
elevateforhumanity.org/demo

partner1.elevateforhumanity.org/marketplace
partner1.elevateforhumanity.org/demo

partner2.elevateforhumanity.org/marketplace
partner2.elevateforhumanity.org/demo
```

### Option 2: Separate Deployments (Clone)
```
elevateforhumanity.org
partner1training.com
partner2academy.org
```

### Option 3: Hybrid
```
Main: elevateforhumanity.org
Clones: Use same codebase, different configs
```

## 🚀 SETUP PROCESS

### For New Organization:
1. **Create Config File**
   ```typescript
   // config/orgs/new-org.ts
   export const newOrgConfig: WhiteLabelConfig = {
     organizationName: "New Org",
     // ... settings
   };
   ```

2. **Add Programs**
   ```typescript
   programs: [
     {
       id: "new-org-program-1",
       name: "Program Name",
       slug: "program-slug",
       // ... program data
     }
   ]
   ```

3. **Generate Products**
   ```typescript
   const products = generateProductsForOrg(newOrgConfig);
   ```

4. **Deploy**
   ```bash
   # Multi-tenant
   vercel deploy --env ORG=new-org

   # Separate
   vercel deploy --prod --domain neworg.com
   ```

## 🎯 WHAT THIS ENABLES

### For You (Elevate):
- ✅ Sell your 32 programs
- ✅ Sell digital products
- ✅ Sell physical products
- ✅ Demo your LMS
- ✅ Interactive tools

### For Partners:
- ✅ Clone entire system
- ✅ Use their branding
- ✅ Sell their programs
- ✅ Use their Stripe account
- ✅ Customize features

### For Marketplace:
- ✅ List multiple organizations
- ✅ Cross-sell programs
- ✅ Revenue sharing
- ✅ Unified checkout

## 📋 IMMEDIATE ACTIONS

### TODAY:
1. Create white-label config system
2. Make store organization-aware
3. Generate products dynamically
4. Test with Elevate config

### THIS WEEK:
1. Build demo pages (white-label)
2. Create partner config example
3. Test multi-tenant setup
4. Document clone process

### THIS MONTH:
1. Add marketplace (multi-org)
2. Revenue sharing system
3. Partner onboarding
4. Clone deployment guide

## 🎯 READY TO BUILD

**I will now:**
1. Create white-label config system
2. Make store organization-aware
3. Build demo pages
4. Generate products for all 32 programs
5. Test with your Elevate config
6. Create partner example

**This will make your entire platform cloneable and sellable!**

**Should I start building the white-label wrapper now?**
