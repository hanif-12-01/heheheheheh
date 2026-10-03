import os
from PIL import Image
from collections import Counter

raw_dir = r"D:\LOMBA\Portofolio\public\pet\Raw character"
idle_path = os.path.join(raw_dir, "hanif-idle.png")
img = Image.open(idle_path).convert("RGBA")
w, h = img.size

def sample_region(y_min, y_max, filter_fn=None):
    pixels = []
    for y in range(y_min, y_max):
        for x in range(w):
            p = img.getpixel((x, y))
            if p[3] > 150: # opaque enough
                if filter_fn is None or filter_fn(p):
                    pixels.append((p[0], p[1], p[2]))
    return pixels

# Hair: y in [18, 140]
hair_px = sample_region(18, 140, lambda p: p[0] < 70 and p[1] < 70 and p[2] < 70)
hair_counts = Counter(hair_px).most_common(10)

# Skin: y in [100, 260]
skin_px = sample_region(100, 260, lambda p: p[0] > 180 and 120 < p[1] < 220 and 80 < p[2] < 160)
skin_counts = Counter(skin_px).most_common(10)

# Teal shirt: y in [263, 650]
teal_px = sample_region(263, 650, lambda p: 20 < p[0] < 90 and 80 < p[1] < 170 and 100 < p[2] < 190)
teal_counts = Counter(teal_px).most_common(10)

# Pants: y in [650, 1160]
pants_px = sample_region(650, 1160, lambda p: 160 < p[0] < 230 and 160 < p[1] < 230 and 160 < p[2] < 230)
pants_counts = Counter(pants_px).most_common(10)

# Shoes: y in [1160, 1237]
shoes_px = sample_region(1160, 1237, lambda p: True)
shoes_counts = Counter(shoes_px).most_common(10)

# Outline: dark pixels around edges
outline_px = sample_region(18, 1237, lambda p: p[0] < 45 and p[1] < 45 and p[2] < 45)
outline_counts = Counter(outline_px).most_common(5)

def to_hex(rgb):
    return f"#{rgb[0]:02X}{rgb[1]:02X}{rgb[2]:02X}"

print("=== HAIR PALETTE ===")
for rgb, cnt in hair_counts[:5]:
    lum = (rgb[0] + rgb[1] + rgb[2]) / 3
    print(f"  {to_hex(rgb)} (lum {lum:.1f}, count {cnt})")

print("=== SKIN PALETTE ===")
for rgb, cnt in skin_counts[:5]:
    lum = (rgb[0] + rgb[1] + rgb[2]) / 3
    print(f"  {to_hex(rgb)} (lum {lum:.1f}, count {cnt})")

print("=== TEAL POLO PALETTE ===")
for rgb, cnt in teal_counts[:5]:
    lum = (rgb[0] + rgb[1] + rgb[2]) / 3
    print(f"  {to_hex(rgb)} (lum {lum:.1f}, count {cnt})")

print("=== PANTS PALETTE ===")
for rgb, cnt in pants_counts[:5]:
    lum = (rgb[0] + rgb[1] + rgb[2]) / 3
    print(f"  {to_hex(rgb)} (lum {lum:.1f}, count {cnt})")

print("=== SHOES PALETTE ===")
for rgb, cnt in shoes_counts[:5]:
    lum = (rgb[0] + rgb[1] + rgb[2]) / 3
    print(f"  {to_hex(rgb)} (lum {lum:.1f}, count {cnt})")

print("=== OUTLINE PALETTE ===")
for rgb, cnt in outline_counts[:3]:
    print(f"  {to_hex(rgb)} (count {cnt})")
