import os
from PIL import Image

world_dir = r"D:\LOMBA\Portofolio\public\World Assets"

subdirs = ["Achivment", "Journey", "Tech", "Ui"]

for sub in subdirs:
    p = os.path.join(world_dir, sub)
    print(f"\n==================== {sub} ====================")
    if not os.path.exists(p):
        print("Directory not found:", p)
        continue
    files = sorted(os.listdir(p))
    for f in files:
        fpath = os.path.join(p, f)
        if os.path.isfile(fpath) and f.endswith(".png"):
            with Image.open(fpath) as img:
                mode = img.mode
                w, h = img.size
                bbox = None
                thresh_bbox = None
                if "A" in mode:
                    alpha = img.split()[-1]
                    bbox = alpha.getbbox()
                    # compute bounding box for alpha >= 10
                    pts = [
                        (x, y)
                        for y in range(h)
                        for x in range(w)
                        if img.getpixel((x, y))[3] >= 10
                    ]
                    if pts:
                        min_x = min(pt[0] for pt in pts)
                        max_x = max(pt[0] for pt in pts)
                        min_y = min(pt[1] for pt in pts)
                        max_y = max(pt[1] for pt in pts)
                        thresh_bbox = (min_x, min_y, max_x, max_y)
                print(f"File: {f}")
                print(f"  Size: {w}x{h}, Mode: {mode}")
                print(f"  Raw Alpha bbox: {bbox}")
                if thresh_bbox:
                    cw = thresh_bbox[2] - thresh_bbox[0] + 1
                    ch = thresh_bbox[3] - thresh_bbox[1] + 1
                    print(f"  Clean bbox (alpha>=10): {thresh_bbox} (content: {cw}x{ch})")
