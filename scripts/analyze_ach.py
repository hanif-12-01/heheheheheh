import os
from PIL import Image
import numpy as np

ach_path = r"D:\LOMBA\Portofolio\public\World Assets\Achivment\Set Ikon Penghargaan Pixel Art.png"
ach_img = Image.open(ach_path).convert("RGBA")
w, h = ach_img.size

# Let's inspect the bottom half (y > 600)
bottom_half = ach_img.crop((0, 600, w, h))
arr = np.array(bottom_half)
alpha = arr[:, :, 3]

# Let's project alpha on x for the bottom half to see column clusters
proj_x = np.sum(alpha > 15, axis=0)
col_ranges = []
in_col = False
c_start = 0
for x, val in enumerate(proj_x):
    if val > 0 and not in_col:
        in_col = True
        c_start = x
    elif val == 0 and in_col:
        in_col = False
        col_ranges.append((c_start, x))
if in_col:
    col_ranges.append((c_start, len(proj_x)))

print("Bottom half clusters in Achievement sheet:")
for idx, (x0, x1) in enumerate(col_ranges):
    sub = arr[:, x0:x1, 3] > 15
    ys, xs = np.where(sub)
    if len(ys) > 0:
        tight_y0, tight_y1 = 600 + ys.min(), 600 + ys.max() + 1
        tight_x0, tight_x1 = x0 + xs.min(), x0 + xs.max() + 1
        print(f"Cluster {idx+1}: [{tight_x0}, {tight_y0}, {tight_x1}, {tight_y1}], size: {tight_x1-tight_x0}x{tight_y1-tight_y0}")
