#!/usr/bin/env python3
"""
Generate polished hero images for Elevate for Humanity
Creates professional banners with Indiana branding
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# Brand Colors
NAVY = (11, 37, 69)        # #0B2545
ORANGE = (255, 102, 0)     # #FF6600
LIGHT_ORANGE = (255, 237, 224)  # Light orange background
WHITE = (255, 255, 255)
GRAY = (100, 116, 139)     # Slate gray for text

ROOT = Path(".").resolve()
OUT_DIR = ROOT / "public" / "images"
OUT_DIR.mkdir(parents=True, exist_ok=True)

def load_fonts():
    """Load fonts with fallbacks"""
    try:
        title_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 72)
        subtitle_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 36)
        small_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 24)
    except:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
        small_font = ImageFont.load_default()
    return title_font, subtitle_font, small_font

def create_gradient_background(width, height, color1, color2):
    """Create a gradient background"""
    img = Image.new('RGB', (width, height), color1)
    draw = ImageDraw.Draw(img)
    
    for y in range(height):
        # Calculate blend ratio
        ratio = y / height
        r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
        g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
        b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    return img

def add_text_with_shadow(draw, position, text, font, fill, shadow_color=(0, 0, 0)):
    """Add text with a subtle shadow"""
    x, y = position
    # Draw shadow
    draw.text((x + 2, y + 2), text, font=font, fill=shadow_color + (100,))
    # Draw main text
    draw.text((x, y), text, font=font, fill=fill)

def create_hero_banner():
    """Create main hero banner"""
    width, height = 1920, 600
    
    # Create gradient background
    img = create_gradient_background(width, height, LIGHT_ORANGE, WHITE)
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Load fonts
    title_font, subtitle_font, small_font = load_fonts()
    
    # Add decorative elements
    # Orange accent bar
    draw.rectangle([0, 0, 20, height], fill=ORANGE)
    
    # Add content
    y_pos = 150
    
    # Main title
    title = "Elevate for Humanity"
    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    x_center = (width - title_width) // 2
    draw.text((x_center, y_pos), title, font=title_font, fill=NAVY)
    
    y_pos += 100
    
    # Subtitle
    subtitle = "Career & Technical Training That Elevates Communities"
    subtitle_bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
    x_center = (width - subtitle_width) // 2
    draw.text((x_center, y_pos), subtitle, font=subtitle_font, fill=GRAY)
    
    y_pos += 80
    
    # Indiana badge
    badge_text = "Indiana • Workforce Development • State-Approved Provider"
    badge_bbox = draw.textbbox((0, 0), badge_text, font=small_font)
    badge_width = badge_bbox[2] - badge_bbox[0]
    x_center = (width - badge_width) // 2
    
    # Badge background
    padding = 20
    badge_bg = [
        x_center - padding,
        y_pos - 10,
        x_center + badge_width + padding,
        y_pos + 40
    ]
    draw.rounded_rectangle(badge_bg, radius=25, fill=ORANGE)
    draw.text((x_center, y_pos), badge_text, font=small_font, fill=WHITE)
    
    # Save
    output_path = OUT_DIR / "hero-banner.jpg"
    img.save(output_path, "JPEG", quality=95)
    print(f"✅ Created: {output_path}")

def create_programs_banner():
    """Create programs page banner"""
    width, height = 1920, 400
    
    # Create gradient
    img = create_gradient_background(width, height, WHITE, LIGHT_ORANGE)
    draw = ImageDraw.Draw(img, 'RGBA')
    
    title_font, subtitle_font, small_font = load_fonts()
    
    # Orange accent
    draw.rectangle([0, 0, 15, height], fill=ORANGE)
    
    y_pos = 120
    
    # Title
    title = "Our Programs"
    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    x_center = (width - title_width) // 2
    draw.text((x_center, y_pos), title, font=title_font, fill=NAVY)
    
    y_pos += 100
    
    # Subtitle
    subtitle = "Paid Apprenticeships • Stackable Credentials • Employer Partnerships"
    subtitle_bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
    x_center = (width - subtitle_width) // 2
    draw.text((x_center, y_pos), subtitle, font=subtitle_font, fill=GRAY)
    
    output_path = OUT_DIR / "programs-banner.jpg"
    img.save(output_path, "JPEG", quality=95)
    print(f"✅ Created: {output_path}")

def create_cta_banner():
    """Create call-to-action banner"""
    width, height = 1200, 300
    
    # Orange background
    img = Image.new('RGB', (width, height), ORANGE)
    draw = ImageDraw.Draw(img, 'RGBA')
    
    title_font, subtitle_font, small_font = load_fonts()
    
    y_pos = 80
    
    # Title
    title = "Ready to Start Your Career?"
    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    x_center = (width - title_width) // 2
    draw.text((x_center, y_pos), title, font=title_font, fill=WHITE)
    
    y_pos += 90
    
    # Subtitle
    subtitle = "Apply today through Indiana Career Connect"
    subtitle_bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
    x_center = (width - subtitle_width) // 2
    draw.text((x_center, y_pos), subtitle, font=subtitle_font, fill=WHITE)
    
    output_path = OUT_DIR / "cta-banner.jpg"
    img.save(output_path, "JPEG", quality=95)
    print(f"✅ Created: {output_path}")

def create_og_image():
    """Create Open Graph social media image"""
    width, height = 1200, 630
    
    # Gradient background
    img = create_gradient_background(width, height, LIGHT_ORANGE, WHITE)
    draw = ImageDraw.Draw(img, 'RGBA')
    
    title_font, subtitle_font, small_font = load_fonts()
    
    # Orange border
    draw.rectangle([0, 0, width, height], outline=ORANGE, width=15)
    
    y_pos = 180
    
    # Logo placeholder (circle)
    center_x = width // 2
    circle_radius = 60
    draw.ellipse(
        [center_x - circle_radius, y_pos - circle_radius, 
         center_x + circle_radius, y_pos + circle_radius],
        fill=ORANGE
    )
    
    y_pos += 100
    
    # Title
    title = "Elevate for Humanity"
    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    x_center = (width - title_width) // 2
    draw.text((x_center, y_pos), title, font=title_font, fill=NAVY)
    
    y_pos += 90
    
    # Subtitle
    subtitle = "Career & Technical Training • Indiana"
    subtitle_bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
    x_center = (width - subtitle_width) // 2
    draw.text((x_center, y_pos), subtitle, font=subtitle_font, fill=GRAY)
    
    output_path = OUT_DIR / "og-image.jpg"
    img.save(output_path, "JPEG", quality=95)
    print(f"✅ Created: {output_path}")

def main():
    """Generate all hero images"""
    print("🎨 Generating polished hero images...")
    print()
    
    create_hero_banner()
    create_programs_banner()
    create_cta_banner()
    create_og_image()
    
    print()
    print("✅ All hero images generated successfully!")
    print(f"📁 Output directory: {OUT_DIR}")

if __name__ == "__main__":
    main()
