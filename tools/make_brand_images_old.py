#!/usr/bin/env python3
"""
Generate branded placeholder images for Elevate for Humanity programs.
Creates hero images (1200x900), card images (1600x900), and social preview (1200x630).
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

NAVY = (11, 37, 69)
ORANGE = (255, 102, 0)

programs = [
    ("barber", "Barber Apprenticeship", "Earn While You Learn"),
    ("building-tech", "Building Technician", "Electrical • Construction • HVAC"),
    ("cna", "Certified Nursing Assistant (CNA)", "Care • Dignity • Independence"),
]

def draw_centered(draw, W, y, text, font, fill):
    """Draw text centered horizontally at given y position."""
    w = draw.textlength(text, font=font)
    draw.text(((W - w) / 2, y), text, font=font, fill=fill)

def base_canvas(w, h, border=True):
    """Create base canvas with subtle grid pattern and optional border."""
    img = Image.new("RGB", (w, h), "white")
    d = ImageDraw.Draw(img)
    # Subtle grid pattern
    for y in range(0, h, 10):
        d.line([(0, y), (w, y)], fill=(244, 246, 248), width=1)
    if border:
        d.rectangle([10, 10, w-10, h-10], outline=ORANGE, width=6)
    return img

def img_to_jpeg(im):
    """Convert PIL Image to JPEG bytes."""
    import io
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=92)
    return buf.getvalue()

def make_images(root: Path):
    """Generate all program images and social preview."""
    imgdir = root / "public" / "images"
    imgdir.mkdir(parents=True, exist_ok=True)
    
    # Load fonts
    try:
        TITLE = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 72)
        SUB   = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 40)
        SMALL = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 28)
    except:
        print("⚠️  Using default font (DejaVu fonts not found)")
        TITLE = SUB = SMALL = ImageFont.load_default()

    def make_hero(slug, title, tagline):
        """Generate hero image (1200x900) for program detail page."""
        W, H = 1200, 900
        img = base_canvas(W, H, border=True)
        d = ImageDraw.Draw(img)
        draw_centered(d, W, 240, "Elevate for Humanity", TITLE, NAVY)
        draw_centered(d, W, 330, title, TITLE, NAVY)
        draw_centered(d, W, 410, tagline, SUB, ORANGE)
        d.rectangle([0, H-100, W, H], fill=NAVY)
        draw_centered(d, W, H-78, "Career & Technical Institute", SMALL, (255,255,255))
        draw_centered(d, W, H-44, "www.elevateforhumanity.org", SMALL, ORANGE)
        path = imgdir / f"efh-{slug}-hero.jpg"
        path.write_bytes(img_to_jpeg(img))
        print(f"✅ Created {path}")

    def make_card(slug, title, tagline):
        """Generate card image (1600x900) for program grid."""
        W, H = 1600, 900
        img = base_canvas(W, H, border=True)
        d = ImageDraw.Draw(img)
        draw_centered(d, W, 320, title, TITLE, NAVY)
        draw_centered(d, W, 400, tagline, SUB, ORANGE)
        d.rectangle([0, H-86, W, H], fill=NAVY)
        draw_centered(d, W, H-64, "Elevate for Humanity", SMALL, (255,255,255))
        draw_centered(d, W, H-34, "Learn • Grow • Achieve", SMALL, ORANGE)
        path = imgdir / f"efh-{slug}-card.jpg"
        path.write_bytes(img_to_jpeg(img))
        print(f"✅ Created {path}")

    # Generate program images
    for slug, title, tag in programs:
        make_hero(slug, title, tag)
        make_card(slug, title, tag)

    # Generate social preview (og.jpg)
    W, H = 1200, 630
    og = Image.new("RGB", (W, H), NAVY)
    d = ImageDraw.Draw(og)
    for i in range(0, H, 6):
        d.line([(0, i), (W, i)], fill=ORANGE, width=1)
    draw_centered(d, W, 210, "Elevate for Humanity — Programs", TITLE, (255,255,255))
    draw_centered(d, W, 290, "Workforce Training & Apprenticeships", SUB, (255,255,255))
    draw_centered(d, W, 350, "Learn • Grow • Achieve", SMALL, ORANGE)
    og_path = root / "public" / "og.jpg"
    og_path.write_bytes(img_to_jpeg(og))
    print(f"✅ Created {og_path}")
    
    print("\n🎉 All images generated successfully!")
    print(f"   Location: {imgdir}")
    print(f"   Total: {len(programs) * 2} program images + 1 social preview")

if __name__ == "__main__":
    make_images(Path(".").resolve())
