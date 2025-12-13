# App Store Submission Guide
## For Google Play and Apple App Store

---

## CRITICAL: App Store Compliance

This app is designed to comply with both Google Play and Apple App Store policies.

**DO NOT modify pricing, descriptions, or payment flows without reviewing this document.**

---

## App Information (Use Exactly)

### App Name
**Primary**: `Elevate for Humanity – Training, LMS & Services`

**Alternative**: `Elevate Platform – Training & Workforce Tools`

### Category
- **Primary**: Education
- **Secondary**: Business (optional)

### Price
**FREE** (Required for approval)

---

## App Description

### Short Description (Both Stores)
```
An all-in-one platform for training, workforce programs, business tools, and digital services.
```

### Full Description (Copy/Paste)
```
Elevate for Humanity is an all-in-one platform designed to support education, workforce training, and professional growth.

The app brings together multiple services into one secure experience—so users don't need to download separate apps.

FEATURES INCLUDE:
• Learning Management System (LMS) access
• Workforce and career pathway programs
• Business and professional tools
• Digital services and resources
• Secure account-based access

PRICING & ACCESS:
The app is free to download.
Some programs and services require paid platform access.
Payments are processed securely outside the app.

WHO IT'S FOR:
• Students and trainees
• Workforce participants
• Entrepreneurs and professionals
• Partner organizations

Secure login is required for protected features.
```

---

## Pricing Structure (MUST MATCH EVERYWHERE)

### Tier 1: Free Access
- **Price**: $0
- **Label**: "Free Access"
- **Description**: "Browse programs and submit inquiries"
- **Features**:
  - Browse programs
  - Submit inquiries
  - View public content
  - No paywall at install

### Tier 2: Student Access
- **Price**: $39/month
- **Label**: "Student Access"
- **Description**: "Monthly platform access for enrolled learners"
- **Features**:
  - LMS access
  - Assigned courses
  - Progress tracking
  - Certificates (non-licensed)

### Tier 3: Career Track Access
- **Price**: $149/month
- **Label**: "Career Track Access"
- **Description**: "Advanced platform access for career pathways and professional tools"
- **Features**:
  - Full LMS access
  - Career track content
  - Business modules
  - Professional tools
  - Priority support

### Tier 4: Partner / Organization
- **Price**: Contact Us (Custom)
- **Label**: "Partner / Organization"
- **Description**: "Custom pricing for organizations and partners"

---

## Payment Processing (CRITICAL)

### Approved Language
✅ **Use this exact wording**:
> "Payments are processed securely on our website."

❌ **DO NOT use**:
- "Buy in app"
- "Unlock features"
- "Purchase subscription"
- Any language suggesting in-app purchases

### Payment Method
- **Platform**: Stripe (external checkout)
- **Location**: Website only
- **Reason**: We sell education, training, and services (not app features)

---

## App Store Review Notes

### For Reviewers (Include in submission)

```
REVIEW NOTES:

This app provides access to education, workforce training, and professional services.

PRICING:
- App download is FREE
- Platform access requires paid subscription ($39 or $149/month)
- Payments processed via Stripe on our website (not through app store billing)

WHY EXTERNAL PAYMENT:
We sell education and training services, not app features. Per App Store guidelines, 
education and training services may use external payment processing.

TEST ACCOUNT:
Email: reviewer@elevateforhumanity.org
Password: [Provide secure test password]

PRICING PAGE:
https://www.elevateforhumanity.org/pricing

TERMS:
https://www.elevateforhumanity.org/terms-of-service

PRIVACY:
https://www.elevateforhumanity.org/privacy-policy

The app functions as a hub for multiple services. Users can browse freely, 
and paid access is clearly labeled as "platform access" not "app unlock."
```

---

## Screenshots Required

### Minimum 5 screenshots for each store:

1. **Welcome/Onboarding Screen**
   - Shows app purpose
   - Multiple services visible

2. **Dashboard**
   - Shows multiple modules/tools
   - Not just a website wrapper

3. **LMS/Training Screen**
   - Shows actual course content
   - Progress tracking visible

4. **Store/Services Screen**
   - Shows available programs
   - Clear pricing display

5. **Account/Profile Screen**
   - User settings
   - Subscription status

### Screenshot Requirements:
- Must show REAL features (not mockups)
- Must show multiple tools in one app
- Must NOT look like just a website
- Must show value beyond web browser

---

## Compliance Checklist

### Before Submission:
- [ ] App download is FREE
- [ ] Pricing page exists at `/pricing`
- [ ] Terms page exists at `/terms-of-service`
- [ ] Privacy page exists at `/privacy-policy`
- [ ] All three pages match app pricing exactly
- [ ] In-app pricing screen uses approved language
- [ ] Payment buttons say "processed on our website"
- [ ] Screenshots show real features
- [ ] Test account credentials work
- [ ] No "unlock app" language anywhere

### Website Consistency:
- [ ] `/pricing` matches app pricing
- [ ] `/terms-of-service` mentions platform access
- [ ] `/privacy-policy` mentions app usage
- [ ] All prices are identical across platforms

---

## Common Rejection Reasons (AVOID)

### ❌ Will Get Rejected:
1. Saying "unlock app features"
2. Using in-app purchase APIs for services
3. Pricing mismatch between app and website
4. No clear value beyond a website
5. Misleading screenshots
6. Missing terms/privacy pages

### ✅ Will Get Approved:
1. Clear "platform access" language
2. External Stripe checkout
3. Consistent pricing everywhere
4. Real features in screenshots
5. Free download with optional paid access
6. Education/training focus

---

## Stripe Setup Instructions

### Products to Create in Stripe Dashboard:

1. **Student Access**
   - Name: "Student Platform Access"
   - Price: $39.00 USD
   - Billing: Monthly recurring
   - Description: "Monthly platform access for enrolled learners"

2. **Career Track Access**
   - Name: "Career Track Platform Access"
   - Price: $149.00 USD
   - Billing: Monthly recurring
   - Description: "Advanced platform access for career pathways"

### After Creating Products:
1. Copy Price IDs from Stripe Dashboard
2. Update `lib/stripe/app-store-products.ts`
3. Add Price IDs to `stripePriceId` fields
4. Test checkout flow end-to-end

---

## Support Contact

For app store submission questions:
- Email: support@elevateforhumanity.org
- Website: https://www.elevateforhumanity.org/contact

---

## Version History

- **v1.0.0** - Initial submission with compliant pricing structure
- Pricing: Free download, $39/$149 platform access
- Payment: Stripe external checkout
- Compliance: Education/training services exemption

---

**IMPORTANT**: This structure has been designed specifically for app store compliance. 
Do not modify pricing, descriptions, or payment flows without consulting app store guidelines.
