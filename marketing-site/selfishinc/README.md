# Selfish Inc Website

Static website for Selfish Inc Mental Wellness services.

## Deployment Options

### Option 1: Vercel (Recommended)

1. Create new Vercel project
2. Point to `/marketing-site/selfishinc` directory
3. Set custom domain: `selfishinc.org`
4. Deploy

### Option 2: Netlify

1. Drag and drop `/marketing-site/selfishinc` folder to Netlify
2. Set custom domain: `selfishinc.org`
3. Deploy

### Option 3: GitHub Pages

1. Create repository: `selfishinc-website`
2. Upload `index.html`
3. Enable GitHub Pages
4. Set custom domain: `selfishinc.org`

## Domain Setup

**Domain**: selfishinc.org

**DNS Records**:
```
A     @     76.76.21.21 (Vercel)
CNAME www   cname.vercel-dns.com
```

Or for Netlify:
```
A     @     75.2.60.5
CNAME www   [your-site].netlify.app
```

## Content Updates

The site is a single HTML file with Tailwind CSS via CDN. To update:

1. Edit `index.html`
2. Commit and push (auto-deploys)

## Cross-Promotion

This site is part of the SELFISH INC family:
- **Elevate for Humanity** - elevateforhumanity.org
- **Selfish Inc Mental Wellness** - selfishinc.org (this site)
- **RISE Forward Foundation** - Tax prep training (hosted on Elevate site)

## Contact Information

**SELFISH INC**
EIN: 88-4058583
Phone: (317) 314-3757
Location: Indianapolis, IN 46240
