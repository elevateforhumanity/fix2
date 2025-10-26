#!/usr/bin/env python3
"""
Enhanced EFH Brand Image Generator
Generates branded images for all 9 programs with logo support and photo collages.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

# ----- CONFIG -----
NAVY = (11, 37, 69)       # #0B2545
ORANGE = (255, 102, 0)    # #FF6600
WHITE = (255, 255, 255)
GRID = (244, 246, 248)    # subtle grid line

SLOGAN = "Career & Technical Training That Elevates Communities"

PROGRAMS = [
    {"slug": "barber", "name": "Barber Apprenticeship Program", "tag": "Start Your Career in the Barbering Industry"},
    {"slug": "building-tech", "name": "Building Services Technician", "tag": "Construction • Electrical • HVAC Training"},
    {"slug": "cna", "name": "Certified Nursing Assistant (CNA)", "tag": "Launch a Career in Healthcare"},
    {"slug": "cpr-aed-first-aid", "name": "CPR, AED & First Aid Certification", "tag": "Learn to Save Lives with Confidence"},
    {"slug": "business-startup-marketing", "name": "Business Start-Up & Marketing", "tag": "Turn Your Vision Into a Business"},
    {"slug": "tax-office-startup", "name": "Tax Office Startup", "tag": "Become a Certified Tax Professional"},
    {"slug": "esthetician-client-services", "name": "Professional Esthetician & Client Services", "tag": "Train for Beauty & Wellness Careers"},
    {"slug": "beauty-career-educator", "name": "Beauty & Career Educator Program", "tag": "Lead & Inspire the Next Generation"},
    {"slug": "public-safety-reentry", "name": "Public Safety Reentry Specialist", "tag": "Empower Returning Citizens for Success"},
]

ROOT = Path(".").resolve()
PUB_DIR = ROOT / "public"
OUT_DIR = PUB_DIR / "images" / "programs"
ASSETS_DIR = ROOT / "assets" / "programs"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Fonts (Gitpod-safe)
def load_fonts():
    try:
        TITLE = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf", 64)
    except:
        try:
            TITLE = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 64)
        except:
            TITLE = ImageFont.load_default()
    try:
        SUB   = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 36)
        SMALL = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 26)
        TINY  = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 22)
    except:
        SUB = SMALL = TINY = ImageFont.load_default()
    return TITLE, SUB, SMALL, TINY

TITLE, SUB, SMALL, TINY = load_fonts()

def text_w(draw, text, font):
    """Get text width in pixels."""
    return draw.textlength(text, font=font)

def center(draw, W, y, text, font, fill):
    """Draw text centered horizontally."""
    draw.text(((W - text_w(draw, text, font))/2, y), text, font=font, fill=fill)

def draw_grid(img):
    """Draw subtle grid pattern."""
    d = ImageDraw.Draw(img)
    W, H = img.size
    for y in range(0, H, 10):
        d.line([(0, y), (W, y)], fill=GRID, width=1)

def base_canvas(W, H):
    """Create base canvas with grid and orange border."""
    img = Image.new("RGB", (W, H), WHITE)
    draw_grid(img)
    d = ImageDraw.Draw(img)
    # orange border
    d.rectangle([10, 10, W-10, H-10], outline=ORANGE, width=6)
    return img

def paste_logo(draw, canvas, y_top=26, max_w_ratio=0.32, max_h=90):
    """Paste logo centered at top, return bottom y coordinate."""
    # Try public first then assets
    logo_path = PUB_DIR / "images" / "efh-logo.png"
    if not logo_path.exists():
        logo_path = ROOT / "assets" / "efh-logo.png"
    
    W, H = canvas.size
    if logo_path.exists():
        logo = Image.open(logo_path).convert("RGBA")
        # scale
        max_w = int(W * max_w_ratio)
        scale = min(max_w / logo.width, max_h / logo.height)
        nw, nh = max(1, int(logo.width*scale)), max(1, int(logo.height*scale))
        logo = logo.resize((nw, nh), Image.LANCZOS)
        canvas.paste(logo, ((W - nw)//2, y_top), logo)
        y_bottom = y_top + nh
    else:
        # fallback text header if no logo
        center(draw, W, y_top, "ELEVATE FOR HUMANITY", TITLE, NAVY)
        y_bottom = y_top + 64
    return y_bottom

def collage_box(canvas, rect, photos):
    """Create photo collage in given rectangle."""
    x0, y0, x1, y1 = rect
    W = x1 - x0
    H = y1 - y0
    
    n = max(1, min(6, len(photos)))
    if n <= 2:
        cols, rows = n, 1
    elif n == 3:
        cols, rows = 3, 1
    elif n == 4:
        cols, rows = 2, 2
    elif n == 5:
        cols, rows = 3, 2
    else:
        cols, rows = 3, 2
    
    cell_w = W // cols
    cell_h = H // rows
    idx = 0
    
    for r in range(rows):
        for c in range(cols):
            if idx >= n: break
            img = photos[idx].convert("RGB")
            # center-crop to cell aspect
            cw, ch = cell_w-8, cell_h-8
            iw, ih = img.size
            target_ratio = cw / ch
            src_ratio = iw / ih
            if src_ratio > target_ratio:
                # too wide -> crop width
                new_w = int(ih * target_ratio)
                left = (iw - new_w) // 2
                img = img.crop((left, 0, left+new_w, ih))
            else:
                # too tall -> crop height
                new_h = int(iw / target_ratio)
                top = (ih - new_h) // 2
                img = img.crop((0, top, iw, top+new_h))
            img = img.resize((cw, ch), Image.LANCZOS)
            px = x0 + c*cell_w + 4
            py = y0 + r*cell_h + 4
            canvas.paste(img, (px, py))
            idx += 1

def load_photos_for(slug):
    """Load photos from assets/programs/{slug}/"""
    folder = ASSETS_DIR / slug
    if not folder.exists(): 
        return []
    imgs = []
    for p in sorted(folder.glob("*.*")):
        if p.suffix.lower() in ['.jpg', '.jpeg', '.png', '.webp']:
            try:
                imgs.append(Image.open(p))
            except:
                pass
    return imgs

def draw_poster(W, H, slug, title, tagline, out_path, mode="hero"):
    """Generate a branded poster image."""
    img = base_canvas(W, H)
    d = ImageDraw.Draw(img)

    # Header: logo + institute + slogan
    y = paste_logo(d, img, y_top=28, max_w_ratio=0.34, max_h=90) + 8
    center(d, W, y+6, "Career & Technical Institute", SMALL, NAVY)
    center(d, W, y+36, f'"{SLOGAN}"', TINY, NAVY)

    # Title + tag
    center(d, W, y+92, title, TITLE, NAVY)
    center(d, W, y+146, tagline, SUB, ORANGE)

    # Collage area (safe margins)
    top = y + 196
    bottom = H - 160
    left, right = 40, W - 40

    photos = load_photos_for(slug)
    if photos:
        collage_box(img, (left, top, right, bottom), photos[:6])
    else:
        # subtle fallback band if no photos yet
        dd = ImageDraw.Draw(img)
        dd.rounded_rectangle([left, top, right, bottom], radius=24, fill=(252,252,252), outline=(232,234,236))
        center(dd, W, (top+bottom)//2 - 14, f"Add photos in assets/programs/{slug}/", SUB, (160, 162, 166))

    # Footer
    center(d, W, H-120, "Learn, Grow, Achieve", SUB, NAVY)
    center(d, W, H-82, "www.elevateforhumanity.org", SUB, ORANGE)

    img.save(out_path, "JPEG", quality=92)
    print(f"✅ Created {out_path.name}")

def generate_all():
    """Generate all program images and social preview."""
    print(f"📸 Generating images to: {OUT_DIR}\n")
    
    # Program images
    for p in PROGRAMS:
        slug, title, tag = p["slug"], p["name"], p["tag"]
        # Hero 1200x900
        draw_poster(1200, 900, slug, title, tag, OUT_DIR / f"efh-{slug}-hero.jpg", "hero")
        # Card 1600x900
        draw_poster(1600, 900, slug, title, tag, OUT_DIR / f"efh-{slug}-card.jpg", "card")

    # OG image 1200x630
    print("\n📱 Generating social preview...")
    W, H = 1200, 630
    og = Image.new("RGB", (W, H), NAVY)
    d = ImageDraw.Draw(og)
    for y in range(0, H, 6): 
        d.line([(0, y), (W, y)], fill=ORANGE, width=1)
    center(d, W, 210, "Elevate for Humanity — Programs", TITLE, WHITE)
    center(d, W, 286, "Workforce Training & Apprenticeships", SUB, WHITE)
    center(d, W, 346, "Learn • Grow • Achieve", SMALL, ORANGE)
    (PUB_DIR / "og.jpg").parent.mkdir(parents=True, exist_ok=True)
    og.save(PUB_DIR / "og.jpg", "JPEG", quality=92)
    print(f"✅ Created og.jpg")
    
    print(f"\n🎉 Complete! Generated {len(PROGRAMS) * 2} program images + 1 social preview")
    print(f"   Location: {OUT_DIR}")
    print(f"\n💡 Tip: Add photos to assets/programs/<slug>/ for auto-collages (max 6 per program)")

if __name__ == "__main__":
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    ASSETS_DIR.mkdir(parents=True, exist_ok=True)
    generate_all()
