# Program Photos

Add program photos here for automatic collage generation.

## Directory Structure

```
assets/programs/
├── barber/                          # Barber Apprenticeship photos
├── building-tech/                   # Building Services Technician photos
├── cna/                             # CNA photos
├── cpr-aed-first-aid/              # CPR/AED/First Aid photos
├── business-startup-marketing/      # Business Startup photos
├── tax-office-startup/             # Tax Office photos
├── esthetician-client-services/    # Esthetician photos
├── beauty-career-educator/         # Beauty Educator photos
└── public-safety-reentry/          # Reentry Specialist photos
```

## Usage

1. **Add photos** to the appropriate program folder (up to 6 per program)
2. **Run generator**: `npm run make:images`
3. **Images auto-crop** and arrange into professional collages

## Supported Formats

- `.jpg` / `.jpeg`
- `.png`
- `.webp`

## Tips

- **Quality**: Use high-resolution photos (1920×1080 or better)
- **Variety**: Mix action shots, equipment, and people
- **Lighting**: Well-lit photos work best
- **Quantity**: 3-6 photos per program for best collages

## Example

```bash
# Add barber program photos
cp ~/photos/barber-1.jpg assets/programs/barber/
cp ~/photos/barber-2.jpg assets/programs/barber/
cp ~/photos/barber-3.jpg assets/programs/barber/

# Generate images
npm run make:images
```

The generator will automatically:
- Center-crop photos to fit
- Arrange in a grid (2×2, 3×2, etc.)
- Create hero (1200×900) and card (1600×900) images
- Place in `public/images/programs/`

## No Photos Yet?

If a program folder is empty, the generator creates a clean placeholder with your branding. Replace with real photos anytime!
