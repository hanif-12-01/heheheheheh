import os
from PIL import Image
import numpy as np

def describe(name):
    im = Image.open(f'scripts/ui_crops/{name}.png')
    arr = np.array(im)
    r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
    mask = a > 20
    mean_rgb = [int(np.mean(c[mask])) for c in (r, g, b)]
    h, w = mask.shape
    ys, xs = np.where(mask)
    cy, cx = np.mean(ys) / h, np.mean(xs) / w
    gold_pixels = int(np.sum((r > 160) & (g > 130) & (b < 100) & mask))
    teal_pixels = int(np.sum((b > 100) & (g > 130) & (r < 100) & mask))
    return f"{name:12s}: size={w}x{h}, mean_rgb={mean_rgb}, gold={gold_pixels:5d}, teal={teal_pixels:5d}, cy={cy:.2f}, cx={cx:.2f}"

names = ['r1_c1', 'r1_c2', 'r1_c3', 'r1_c4', 'r1_c5', 'r2_c1', 'r2_c2', 'r2_c3_code', 'r2_c4', 'r2_c5', 'r3_c1']
for name in names:
    print(describe(name))
