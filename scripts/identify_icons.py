import os
from PIL import Image
import numpy as np

ui_path = r"D:\LOMBA\Portofolio\public\World Assets\Ui\Set Ikon Pixel UI Teal dan Emas.png"
ui_img = Image.open(ui_path).convert("RGBA")
w, h = ui_img.size

# Let's divide UI sheet into grid cells or look at horizontal and vertical projections
alpha = np.array(ui_img.split()[-1])
# Project alpha horizontally and vertically
proj_y = np.sum(alpha > 15, axis=1)
proj_x = np.sum(alpha > 15, axis=0)

# Print rows where proj_y > 0
in_row = False
row_ranges = []
start = 0
for y, val in enumerate(proj_y):
    if val > 0 and not in_row:
        in_row = True
        start = y
    elif val == 0 and in_row:
        in_row = False
        row_ranges.append((start, y))
if in_row:
    row_ranges.append((start, len(proj_y)))

print("Row ranges in UI sheet:")
for r in row_ranges:
    print("  Row:", r, "height:", r[1] - r[0])

# Within each row, let's find the columns
for idx, (y0, y1) in enumerate(row_ranges):
    row_alpha = alpha[y0:y1, :]
    col_proj = np.sum(row_alpha > 15, axis=0)
    col_ranges = []
    in_col = False
    c_start = 0
    for x, val in enumerate(col_proj):
        if val > 0 and not in_col:
            in_col = True
            c_start = x
        elif val == 0 and in_col:
            in_col = False
            col_ranges.append((c_start, x))
    if in_col:
        col_ranges.append((c_start, len(col_proj)))
    print(f"\nRow {idx+1} ({y0} to {y1}) has {len(col_ranges)} columns:")
    for c_idx, (x0, x1) in enumerate(col_ranges):
        # find tight bbox in this cell
        cell_alpha = alpha[y0:y1, x0:x1] > 15
        ys, xs = np.where(cell_alpha)
        if len(ys) > 0:
            tight_y0, tight_y1 = y0 + ys.min(), y0 + ys.max() + 1
            tight_x0, tight_x1 = x0 + xs.min(), x0 + xs.max() + 1
            print(f"  Col {c_idx+1}: [{x0}, {x1}] -> tight bbox: ({tight_x0}, {tight_y0}, {tight_x1}, {tight_y1}), size: {tight_x1-tight_x0}x{tight_y1-tight_y0}")
