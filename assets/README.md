# EFH Logo Assets

## 📁 Place Your Logo Here

To generate all logo assets (favicons, touch icons, OG images), place your source logo file here:

```
assets/efh-logo-source.png
```

## 🎨 Logo Requirements

- **Format**: PNG with transparency (RGBA)
- **Recommended size**: 1024×1024 or larger
- **Design**: Complete Empowerment Center ring with open book
- **Colors**: Should include brand colors (Navy #0B2545, Orange #FF6600)

## ⚙️ Generate Assets

Once you've placed your logo, run:

```bash
npm run make:logo
```

This will generate:

### Favicons

- `public/favicon.png` (512×512)
- `public/favicon.ico` (16, 32, 48, 64px)
- `public/apple-touch-icon.png` (180×180)

### Logo Variants

- `public/images/efh-logo.png` (original)
- `public/images/efh-logo-1024.png`
- `public/images/efh-logo-512.png`
- `public/images/efh-logo-256.png`
- `public/images/efh-logo-128.png`
- `public/images/efh-logo-64.png`

### Social Media

- `public/og-logo.jpg` (1200×630 Open Graph banner)

## 🔄 Automatic Integration

The logo assets are automatically:

- Used in HTML `<head>` tags
- Included in program posters
- Deployed with the site
- Optimized for web performance

## 📝 Notes

- The script preserves aspect ratio
- Transparent backgrounds are maintained for PNGs
- White backgrounds are added for favicons
- OG banner includes brand colors and text overlay
