# Export Guide

**How to Convert Markdown Materials to Presentation Formats**

---

## Overview

All pitch deck and sales materials are provided in Markdown (.md) format for easy editing and version control. This guide explains how to convert them to PowerPoint, PDF, Google Slides, and other formats.

---

## Method 1: Manual Creation (Recommended for Best Results)

### PowerPoint (.pptx)

**Steps:**

1. Open PowerPoint
2. Create new presentation (16:9 aspect ratio)
3. Choose professional template or create custom
4. Copy content from Markdown files slide by slide
5. Add visuals, icons, and formatting
6. Apply consistent branding
7. Save as .pptx

**Advantages:**

- Full control over design
- Best visual quality
- Custom animations and transitions
- Optimized for audience

**Time:** 2-4 hours for full deck

---

### Google Slides

**Steps:**

1. Open Google Slides
2. Create new presentation
3. Choose template or import PowerPoint
4. Copy content from Markdown files
5. Add visuals and formatting
6. Share with appropriate permissions
7. Generate shareable link

**Advantages:**

- Cloud-based collaboration
- Easy sharing and commenting
- Version history
- No software installation needed

**Time:** 2-4 hours for full deck

---

### Canva

**Steps:**

1. Go to Canva.com
2. Select "Presentation" template
3. Choose professional design
4. Copy content from Markdown files
5. Customize with Canva elements
6. Download as PDF or PowerPoint
7. Share link or export file

**Advantages:**

- Beautiful pre-made templates
- Easy drag-and-drop design
- Stock photos and icons included
- Professional results without design skills

**Time:** 2-3 hours for full deck

---

## Method 2: Automated Conversion

### Using Pandoc (Command Line)

**Install Pandoc:**

```bash
# macOS
brew install pandoc

# Ubuntu/Debian
sudo apt-get install pandoc

# Windows
# Download from https://pandoc.org/installing.html
```

**Convert to PowerPoint:**

```bash
pandoc PITCH_DECK.md -o PITCH_DECK.pptx
```

**Convert to PDF:**

```bash
pandoc PITCH_DECK.md -o PITCH_DECK.pdf
```

**Advantages:**

- Fast conversion
- Batch processing
- Scriptable/automatable

**Disadvantages:**

- Basic formatting
- Requires manual cleanup
- Limited design control

---

### Using Marp (Markdown Presentation)

**Install Marp:**

```bash
npm install -g @marp-team/marp-cli
```

**Convert to PowerPoint:**

```bash
marp PITCH_DECK.md --pptx -o PITCH_DECK.pptx
```

**Convert to PDF:**

```bash
marp PITCH_DECK.md --pdf -o PITCH_DECK.pdf
```

**Convert to HTML:**

```bash
marp PITCH_DECK.md --html -o PITCH_DECK.html
```

**Advantages:**

- Designed for presentations
- Better formatting than Pandoc
- Supports themes and styling

**Disadvantages:**

- Still requires manual refinement
- Limited compared to PowerPoint

---

### Using Slidev (Developer-Friendly)

**Install Slidev:**

```bash
npm init slidev
```

**Create slides from Markdown:**

```bash
slidev PITCH_DECK.md
```

**Export to PDF:**

```bash
slidev export PITCH_DECK.md
```

**Advantages:**

- Beautiful default themes
- Code syntax highlighting
- Interactive presentations
- Developer-friendly

**Disadvantages:**

- Requires Node.js
- Learning curve
- Overkill for simple decks

---

## Method 3: Online Converters

### CloudConvert

**URL:** https://cloudconvert.com/md-to-pptx

**Steps:**

1. Upload Markdown file
2. Select output format (PPTX, PDF, etc.)
3. Click "Convert"
4. Download result

**Advantages:**

- No software installation
- Fast and easy
- Multiple format support

**Disadvantages:**

- Basic formatting
- Privacy concerns (uploading files)
- Requires internet connection

---

### Markdown to Slides (Online)

**URL:** https://markdowntohtml.com/

**Steps:**

1. Paste Markdown content
2. Preview HTML output
3. Copy to presentation tool
4. Format as needed

**Advantages:**

- Quick preview
- No installation
- Free

**Disadvantages:**

- Manual copy-paste
- Limited formatting
- Not true presentation format

---

## Recommended Workflow

### For State/DWD Presentations

**Best Method:** Manual creation in PowerPoint or Google Slides

**Why:**

- Professional appearance critical
- Custom branding needed
- Audience expects polished design
- Animations and transitions helpful

**Time Investment:** 3-4 hours  
**Result:** High-quality, professional deck

---

### For Employer One-Pagers

**Best Method:** Canva or Word/Google Docs

**Why:**

- Simple layout
- Easy to print
- Quick to customize
- Professional templates available

**Time Investment:** 30-60 minutes  
**Result:** Print-ready one-pager

---

### For Grant Applications

**Best Method:** Copy-paste into Word/Google Docs

**Why:**

- Grant portals often require Word format
- No design needed
- Focus on content, not visuals
- Easy to edit and customize

**Time Investment:** 15-30 minutes  
**Result:** Grant-ready narrative

---

### For Investor Pitches

**Best Method:** Manual creation in PowerPoint with professional design

**Why:**

- First impressions matter
- Data visualization important
- Custom charts and graphs needed
- Professional design expected

**Time Investment:** 4-6 hours  
**Result:** Investor-grade deck

---

## Design Resources

### Free Stock Photos

- **Unsplash:** https://unsplash.com
- **Pexels:** https://pexels.com
- **Pixabay:** https://pixabay.com

### Free Icons

- **Heroicons:** https://heroicons.com
- **Font Awesome:** https://fontawesome.com
- **Flaticon:** https://flaticon.com

### Free Templates

- **Canva:** https://canva.com/templates
- **Slides Carnival:** https://slidescarnival.com
- **SlidesMania:** https://slidesmania.com

### Color Palettes

- **Coolors:** https://coolors.co
- **Adobe Color:** https://color.adobe.com
- **Color Hunt:** https://colorhunt.co

### Fonts

- **Google Fonts:** https://fonts.google.com
- **Font Squirrel:** https://fontsquirrel.com

---

## Branding Guidelines

### Logo Placement

- Top left or center of title slide
- Small logo in footer of subsequent slides
- Consistent size and position

### Color Palette

- **Primary:** Indigo (#4F46E5)
- **Secondary:** Blue (#3B82F6)
- **Accent:** Green (#10B981)
- **Warning:** Red (#EF4444)
- **Neutral:** Gray (#6B7280)

### Typography

- **Headings:** Bold, sans-serif (Inter, Helvetica, Arial)
- **Body:** Regular, sans-serif
- **Minimum Size:** 24pt for body text

### Layout

- Generous white space
- Left-aligned text for readability
- Centered headlines
- Consistent margins (1-inch minimum)

### Images

- High-resolution only (300 DPI for print)
- Professional stock photos
- Real dashboard screenshots
- Diverse representation

---

## File Naming Conventions

### Presentations

- `Sponsor-in-a-Box_Pitch_Deck_[Date].pptx`
- `Sponsor-in-a-Box_Investor_Deck_[Date].pptx`
- `Sponsor-in-a-Box_Employer_Presentation_[Date].pptx`

### PDFs

- `Sponsor-in-a-Box_Pitch_Deck_[Date].pdf`
- `Sponsor-in-a-Box_Employer_One_Pager.pdf`
- `Sponsor-in-a-Box_Grant_Boilerplate.pdf`

### Documents

- `Sponsor-in-a-Box_Grant_Narrative_[Grant_Name].docx`
- `Sponsor-in-a-Box_Employer_Agreement.docx`
- `Sponsor-in-a-Box_MOU_Template.docx`

---

## Quality Checklist

Before finalizing any export:

### Content

- [ ] All placeholders replaced with actual data
- [ ] Contact information current
- [ ] Pricing accurate
- [ ] No typos or grammatical errors
- [ ] All links working

### Design

- [ ] Consistent branding throughout
- [ ] High-resolution images
- [ ] Readable font sizes (24pt minimum)
- [ ] Proper color contrast
- [ ] Professional appearance

### Technical

- [ ] Fonts embedded (for PDF/PowerPoint)
- [ ] File size reasonable (<10MB for email)
- [ ] Compatible with target software
- [ ] Animations working (if applicable)
- [ ] Printable (if needed)

### Legal

- [ ] Grant-safe language included
- [ ] No confidential information (unless marked)
- [ ] Customer testimonials approved
- [ ] Partner logos approved
- [ ] Copyright notices included

---

## Distribution Guidelines

### Email Attachments

- **Format:** PDF (for viewing) or PowerPoint (for editing)
- **Size:** <10MB (compress if needed)
- **Naming:** Descriptive and professional
- **Subject:** Clear and specific

### Website Downloads

- **Format:** PDF (locked) or PowerPoint (editable)
- **Location:** Resources or Downloads page
- **Access:** Gated (email capture) or open
- **Tracking:** Analytics on downloads

### Printed Handouts

- **Format:** PDF exported from PowerPoint
- **Paper:** High-quality (32lb or heavier)
- **Color:** Full color for presentations, B&W for drafts
- **Binding:** Stapled or bound for multi-page

### Shared Links

- **Platform:** Google Slides or Dropbox/Box
- **Permissions:** View-only or comment-only
- **Expiration:** Set if needed
- **Tracking:** Monitor views and engagement

---

## Version Control

### File Versions

- Use date stamps: `_2024-12-21`
- Use version numbers: `_v1.0`, `_v1.1`
- Keep master copy in version control (Git)
- Archive old versions

### Change Log

- Document major changes
- Note who made changes and when
- Track feedback and revisions
- Maintain audit trail

### Backup

- Cloud storage (Google Drive, Dropbox, Box)
- Local backup (external drive)
- Version control (Git)
- Regular backups (daily/weekly)

---

## Troubleshooting

### Formatting Issues

**Problem:** Markdown doesn't convert cleanly  
**Solution:** Use manual creation or clean up automated output

### Font Problems

**Problem:** Fonts not displaying correctly  
**Solution:** Embed fonts or use standard fonts (Arial, Helvetica)

### Image Quality

**Problem:** Images look pixelated  
**Solution:** Use high-resolution images (300 DPI minimum)

### File Size

**Problem:** File too large to email  
**Solution:** Compress images, remove unused slides, use PDF

### Compatibility

**Problem:** Presentation doesn't work on recipient's computer  
**Solution:** Export to PDF or use Google Slides

---

## Next Steps

### Immediate (Week 1)

1. Choose export method based on audience
2. Create first version of pitch deck
3. Test with internal team
4. Gather feedback and refine

### Short-Term (Month 1)

1. Create all presentation formats
2. Develop printed materials
3. Build template library
4. Train team on usage

### Long-Term (Quarter 1)

1. Establish brand guidelines
2. Create design system
3. Build asset library
4. Automate where possible

---

## Support

### For Technical Issues

- Pandoc documentation: https://pandoc.org/MANUAL.html
- Marp documentation: https://marp.app
- PowerPoint help: https://support.microsoft.com/powerpoint

### For Design Help

- Canva tutorials: https://canva.com/learn
- PowerPoint design tips: https://slidesgo.com/blog
- Presentation best practices: https://slidebean.com/blog

### For Questions

- Contact: [Your Email]
- Phone: [Your Phone]
- Website: [Your Website]

---

**END OF EXPORT GUIDE**

---

## Quick Reference

### Best Methods by Use Case

| Use Case           | Best Method         | Time | Quality    |
| ------------------ | ------------------- | ---- | ---------- |
| State/DWD Pitch    | PowerPoint (manual) | 3-4h | ⭐⭐⭐⭐⭐ |
| Employer One-Pager | Canva               | 1h   | ⭐⭐⭐⭐   |
| Grant Application  | Word (copy-paste)   | 30m  | ⭐⭐⭐⭐   |
| Investor Pitch     | PowerPoint (manual) | 4-6h | ⭐⭐⭐⭐⭐ |
| Quick Draft        | Pandoc              | 5m   | ⭐⭐       |
| Web Presentation   | Slidev              | 2h   | ⭐⭐⭐⭐   |

---

**Version:** 1.0  
**Last Updated:** 2024-12-21  
**Owner:** Elevate for Humanity
