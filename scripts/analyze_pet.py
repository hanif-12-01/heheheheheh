import os
from PIL import Image

raw_dir = r"D:\LOMBA\Portofolio\public\pet\Raw character"
files = sorted([f for f in os.listdir(raw_dir) if f.endswith(".png")])

def analyze_character(filename):
    path = os.path.join(raw_dir, filename)
    img = Image.open(path).convert("RGBA")
    w, h = img.size
    
    # Clean alpha: mask pixels where alpha >= 20
    min_x, max_x, min_y, max_y = w, 0, h, 0
    for y in range(h):
        for x in range(w):
            if img.getpixel((x, y))[3] >= 20:
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y
                
    head_y_end = min_y + int((max_y - min_y) * 0.22)
    head_xs = []
    for y in range(min_y, head_y_end):
        for x in range(min_x, max_x + 1):
            if img.getpixel((x, y))[3] >= 20:
                head_xs.append(x)
    head_w = (max(head_xs) - min(head_xs) + 1) if head_xs else 0
    
    shoulder_y_start = min_y + int((max_y - min_y) * 0.22)
    shoulder_y_end = min_y + int((max_y - min_y) * 0.35)
    shoulder_xs = []
    for y in range(shoulder_y_start, shoulder_y_end):
        for x in range(min_x, max_x + 1):
            p = img.getpixel((x, y))
            if p[3] >= 20:
                shoulder_xs.append(x)
    shoulder_w = (max(shoulder_xs) - min(shoulder_xs) + 1) if shoulder_xs else 0
    
    total_h = max_y - min_y + 1
    content_w = max_x - min_x + 1
    return {
        "file": filename,
        "canvas": (w, h),
        "bbox": (min_x, min_y, max_x, max_y),
        "content_w": content_w,
        "total_h": total_h,
        "head_w": head_w,
        "shoulder_w": shoulder_w,
    }

results = [analyze_character(f) for f in files]
idle = next(r for r in results if r["file"] == "hanif-idle.png")
print("Canonical Idle: total_h=", idle["total_h"], "head_w=", idle["head_w"], "shoulder_w=", idle["shoulder_w"])
print("-" * 75)
for r in results:
    h_ratio = r["total_h"] / idle["total_h"]
    head_ratio = r["head_w"] / idle["head_w"] if idle["head_w"] else 0
    sh_ratio = r["shoulder_w"] / idle["shoulder_w"] if idle["shoulder_w"] else 0
    print(f"{r['file']:20s}: total_h={r['total_h']:4d} ({h_ratio:.3f}) | head_w={r['head_w']:3d} ({head_ratio:.3f}) | sh_w={r['shoulder_w']:3d} ({sh_ratio:.3f})")
