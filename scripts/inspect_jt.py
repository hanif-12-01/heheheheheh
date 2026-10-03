import os
from PIL import Image
import numpy as np

def inspect_assets(folder):
    print(f"=== Inspecting {folder} ===")
    for f in sorted(os.listdir(folder)):
        if not f.endswith(".png"):
            continue
        p = os.path.join(folder, f)
        im = Image.open(p).convert("RGBA")
        w, h = im.size
        arr = np.array(im)
        alpha = arr[:, :, 3]
        clean_mask = alpha > 15
        ys, xs = np.where(clean_mask)
        if len(ys) == 0:
            print(f"  {f}: EMPTY!")
            continue
        min_x, max_x = xs.min(), xs.max() + 1
        min_y, max_y = ys.min(), ys.max() + 1
        bw, bh = max_x - min_x, max_y - min_y
        padding = (min_x, min_y, w - max_x, h - max_y) # left, top, right, bottom
        
        # Check stray pixels (alpha between 1 and 15)
        stray = np.sum((alpha > 0) & (alpha <= 15))
        
        print(f"  {f[:35]:35s} | Orig: {w}x{h} | Tight: {bw}x{bh} | Margins: L={padding[0]}, T={padding[1]}, R={padding[2]}, B={padding[3]} | stray: {stray}")

inspect_assets(r"D:\LOMBA\Portofolio\public\World Assets\Journey")
inspect_assets(r"D:\LOMBA\Portofolio\public\World Assets\Tech")
