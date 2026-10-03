import os
from PIL import Image
import numpy as np

names = ['r1_c1', 'r1_c2', 'r1_c3', 'r1_c4', 'r1_c5', 'r2_c1', 'r2_c2', 'r2_c3_code', 'r2_c4', 'r2_c5', 'r3_c1']

for name in names:
    im = Image.open(f'scripts/ui_crops/{name}.png')
    # resize to 24x24 for ascii display
    small = im.resize((24, 24), Image.Resampling.BILINEAR)
    arr = np.array(small)
    alpha = arr[:, :, 3]
    print(f"=== {name} ({im.size[0]}x{im.size[1]}) ===")
    for row in alpha:
        line = "".join("#" if p > 80 else ("." if p > 20 else " ") for p in row)
        print(line)
    print()
