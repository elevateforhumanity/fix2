#!/usr/bin/env python3
"""
EFH Logo Asset Generator (Gitpod/CI safe)

Inputs (first one found):
  ./assets/efh-logo-source.png
  ./public/images/efh-logo.png

Outputs:
  public/images/efh-logo.png                (original, normalized)
  public/images/efh-logo-1024.png
  public/images/efh-logo-512.png
  public/images/efh-logo-256.png
  public/images/efh-logo-128.png
  public/images/efh-logo-64.png
  public/favicon.png                         (512x512)
  public/favicon.ico                         (16,32,48,64)
  public/apple-touch-icon.png                (180x180)
  public/og-logo.jpg                         (1200x630 on-brand banner w/ logo)
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

NAVY   = (11, 37, 69)    # #0B2545
ORANGE = (255, 102, 0)   # #FF6600
WHITE  = (255, 255, 255)

ROOT = Path(".").resolve()
PUB  = ROOT / "public"
IMG  = PUB / "images"
IMG.mkdir(parents=True, exist_ok=True)

def find_source():
    for p in [
        ROOT / "assets" / "efh-logo-source.png",
        IMG / "efh-logo.png",
    ]:
        if p.exists():
            return p
    raise SystemExit("❌ Logo source not found. Put your logo at assets/efh-logo-source.png")

def save_png(im: Image.Image, path: Path, size=None, bg=None):
    im2 = im
    if size:
        # keep aspect, max fit inside square
        w, h = im.size
        side = size
        scale = min(side / w, side / h)
        nw, nh = max(1, int(w*scale)), max(1, int(h*scale))
        im2 = im.resize((nw, nh), Image.LANCZOS)
        canvas = Image.new("RGBA", (side, side), (0,0,0,0) if bg is None else bg + (255,))
        canvas.paste(im2, ((side - nw)//2, (side - nh)//2), im2)
        im2 = canvas
    path.parent.mkdir(parents=True, exist_ok=True)
    im2.save(path, "PNG")

def make_ico(src_rgba: Image.Image, out_path: Path, sizes=(16,32,48,64)):
    frames = []
    for s in sizes:
        frames.append(src_rgba.resize((s, s), Image.LANCZOS).convert("RGBA"))
    out_path.parent.mkdir(parents=True, exist_ok=True)
    frames[0].save(out_path, format="ICO", sizes=[(s, s) for s in sizes])

def make_og_banner(logo_rgba: Image.Image, out_path: Path):
    W, H = 1200, 630
    og = Image.new("RGB", (W, H), NAVY)
    d = ImageDraw.Draw(og)
    # subtle orange lines
    for y in range(0, H, 6):
        d.line([(0, y), (W, y)], fill=ORANGE, width=1)
    # scale logo
    max_w = int(W * 0.34)
    max_h = 140
    lw, lh = logo_rgba.size
    scale = min(max_w/lw, max_h/lh)
    logo = logo_rgba.resize((int(lw*scale), int(lh*scale)), Image.LANCZOS)
    og.paste(logo, ((W - logo.width)//2, 80), logo)
    # text
    try:
        TITLE = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 44)
        SUB   = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 28)
    except:
        TITLE = SUB = ImageFont.load_default()
    def center(y, text, font, fill):
        bbox = d.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        d.text(((W - tw)/2, y), text, font=font, fill=fill)
    center(260, "Elevate for Humanity — Empowerment Center", TITLE, WHITE)
    center(310, "Career & Technical Training That Elevates Communities", SUB, WHITE)
    center(370, "Learn • Grow • Achieve", SUB, ORANGE)
    og.save(out_path, "JPEG", quality=92)

def main():
    print("🎨 EFH Logo Asset Generator")
    print("=" * 60)
    
    src_path = find_source()
    print(f"📁 Source: {src_path}")
    
    src = Image.open(src_path).convert("RGBA")
    print(f"📐 Original size: {src.size[0]}×{src.size[1]}")
    print()

    # Normalize and store canonical copy
    save_png(src, IMG / "efh-logo.png")
    print("✅ efh-logo.png (original)")

    # Common sizes
    for s in (1024, 512, 256, 128, 64):
        save_png(src, IMG / f"efh-logo-{s}.png", size=s)
        print(f"✅ efh-logo-{s}.png")

    # Favicon (PNG + ICO)
    save_png(src, PUB / "favicon.png", size=512, bg=WHITE)
    print("✅ favicon.png (512×512)")
    
    make_ico(Image.open(PUB / "favicon.png").convert("RGBA"), PUB / "favicon.ico")
    print("✅ favicon.ico (16,32,48,64)")

    # Apple touch icon
    save_png(src, PUB / "apple-touch-icon.png", size=180, bg=WHITE)
    print("✅ apple-touch-icon.png (180×180)")

    # OG banner with logo
    make_og_banner(src, PUB / "og-logo.jpg")
    print("✅ og-logo.jpg (1200×630)")
    
    print()
    print("=" * 60)
    print("✅ All EFH logo assets generated!")
    print(f"📁 Output: {PUB}")
    print(f"📁 Images: {IMG}")

if __name__ == "__main__":
    main()
