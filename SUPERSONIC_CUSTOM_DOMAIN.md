# Supersonic Fast Cash - Custom Domain Setup

## Overview

The Supersonic Fast Cash site is now a **complete standalone website** ready for a custom domain. It includes:

- ✅ Full navigation header with logo and menu
- ✅ Standalone homepage design
- ✅ All pages and features clearly displayed
- ✅ Comprehensive footer with all links
- ✅ Contact information and social media
- ✅ Professional branding (blue/orange/white)
- ✅ Mobile responsive design

---

## Current URL Structure

**Base Path:** `/supersonic-fast-cash`

All pages are currently under this path:

- Homepage: `/supersonic-fast-cash`
- Apply: `/supersonic-fast-cash/apply`
- Calculator: `/supersonic-fast-cash/calculator`
- etc.

---

## Custom Domain Setup

### Option 1: Subdomain (Recommended)

**Example:** `tax.elevateforhumanity.org` or `supersonicfastcash.com`

**DNS Configuration:**

```
Type: CNAME
Name: tax (or @)
Value: [your-vercel-domain].vercel.app
TTL: 3600
```

**Vercel Configuration:**

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add custom domain: `tax.elevateforhumanity.org`
3. Configure rewrites in `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/:path*",
      "destination": "/supersonic-fast-cash/:path*",
      "has": [
        {
          "type": "host",
          "value": "tax.elevateforhumanity.org"
        }
      ]
    }
  ]
}
```

### Option 2: Separate Domain

**Example:** `supersonicfastcash.com`

**DNS Configuration:**

```
Type: A
Name: @
Value: 76.76.21.21 (Vercel IP)

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Vercel Configuration:**

1. Add domain in Vercel
2. Same rewrite rules as above

---

## Pages Available

### Main Pages

| Page             | URL                 | Description           |
| ---------------- | ------------------- | --------------------- |
| Homepage         | `/`                 | Main landing page     |
| Apply            | `/apply`            | Application form      |
| Calculator       | `/calculator`       | Tax refund calculator |
| How It Works     | `/how-it-works`     | Process explanation   |
| Pricing          | `/pricing`          | Fees and pricing      |
| Locations        | `/locations`        | Office locations      |
| Services         | `/services`         | All services          |
| Book Appointment | `/book-appointment` | Schedule session      |

### Additional Pages

- `/diy-taxes` - Self-service filing
- `/upload-documents` - Document portal
- `/portal` - Customer portal
- `/careers` - Job opportunities
- `/tools/refund-tracker` - Track refund status
- `/tools/smart-upload` - Smart document upload
- `/tools/drake-download` - Drake software

---

## Navigation Structure

### Header Menu

- Apply
- Calculator
- How It Works
- Pricing
- Locations
- Services

### Footer Sections

1. **Services**
   - Tax Refund Advance
   - Professional Tax Prep
   - DIY Tax Filing
   - Refund Calculator
   - Upload Documents

2. **Resources**
   - How It Works
   - Pricing
   - Locations
   - Book Appointment
   - Customer Portal
   - Careers

3. **Contact**
   - Phone: (317) 314-3757
   - Email: supersonicfastcash@gmail.com
   - Address: 7009 E 56th St, Indianapolis
   - Hours: Mon-Fri 9AM-5PM

---

## Branding

### Colors

- **Primary Blue:** `#2563eb` (blue-600)
- **Secondary Blue:** `#1e40af` (blue-800)
- **Orange:** `#f97316` (orange-500)
- **White:** `#ffffff`
- **Gray:** `#f9fafb` (gray-50)

### Logo

- Blue/Orange gradient circle with dollar sign
- Text: "SUPERSONIC FAST CASH"
- Tagline: "Powered by EPS Financial"

---

## Features

### Homepage Sections

1. **Navigation Header** - Sticky header with logo and menu
2. **Hero Section** - Large headline with CTA buttons
3. **Key Benefits** - 4 benefit cards (Amount, Speed, No Credit, Security)
4. **Stats Bar** - Trust indicators ($2.1B+, 44k offices, etc.)
5. **Main Features** - 3 large feature cards + 8 smaller page links
6. **Comparison** - Traditional vs Supersonic
7. **Trust/Partners** - EPS Financial & Pathward
8. **Final CTA** - Strong call-to-action
9. **Contact Section** - Phone, email, social media
10. **Comprehensive Footer** - All links and info

### Key Features

- ✅ Live chat widget (Tawk.to)
- ✅ PWA install button
- ✅ Mobile responsive
- ✅ SEO optimized
- ✅ Schema markup
- ✅ Social media integration

---

## Technical Details

### File Structure

```
app/supersonic-fast-cash/
├── page.tsx              # Homepage (1100+ lines)
├── layout.tsx            # Layout with live chat
├── apply/                # Application page
├── calculator/           # Calculator page
├── how-it-works/         # Process page
├── pricing/              # Pricing page
├── locations/            # Locations page
├── services/             # Services page
├── book-appointment/     # Booking page
├── diy-taxes/            # DIY filing
├── upload-documents/     # Upload portal
├── portal/               # Customer portal
├── careers/              # Careers section
└── tools/                # Additional tools
```

### Components

```
components/
├── LiveChatWidget.tsx    # Tawk.to integration
└── InstallPWAButton.tsx  # PWA install prompt
```

---

## SEO & Marketing

### Primary Keywords

- tax refund advance Indianapolis
- tax preparation Indianapolis
- same day tax refund
- no credit check tax loan
- free tax filing Indianapolis

### Meta Information

- **Title:** Tax Refund Advance Indianapolis | Get $7,500 Fast
- **Description:** Get your tax refund advance TODAY! Up to $7,500 in minutes.
- **Canonical:** Will update to custom domain

---

## Contact Information

### Phone

- **(317) 314-3757**
- Mon-Fri: 9AM-5PM EST
- Sat: 10AM-2PM EST

### Email

- **supersonicfastcash@gmail.com**
- 24-hour response time

### Social Media

- **Facebook:** [facebook.com/share/1Be4LrVfJw/](https://www.facebook.com/share/1Be4LrVfJw/)
- **Instagram:** [@supersonicfastcash](https://www.instagram.com/supersonicfastcash)

### Office Locations

**Location 1:**

- 7009 E 56th St, Suite EE1
- Indianapolis, IN 46226

**Location 2:**

- 3737 N Meridian St
- Indianapolis, IN 46208

---

## Next Steps for Custom Domain

1. **Choose Domain Name**
   - Option A: `tax.elevateforhumanity.org`
   - Option B: `supersonicfastcash.com`
   - Option C: Custom choice

2. **Configure DNS**
   - Add CNAME or A records
   - Point to Vercel

3. **Update Vercel**
   - Add domain in dashboard
   - Configure rewrites
   - Enable SSL

4. **Update Code** (if needed)
   - Update canonical URLs
   - Update sitemap
   - Update social meta tags

5. **Test**
   - Verify all pages load
   - Check navigation
   - Test forms
   - Verify SSL

---

## Support

For technical support or questions:

- **Developer:** Contact via Ona
- **Business:** supersonicfastcash@gmail.com
- **Phone:** (317) 314-3757

---

## Notes

- Site is production-ready
- All features are functional
- Mobile responsive
- SEO optimized
- Live chat configured
- PWA ready
- Build passing ✅

**Ready for custom domain deployment!**
