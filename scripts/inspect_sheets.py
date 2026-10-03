import os
from PIL import Image
import numpy as np

# 1. Inspect Flask colors
flask_path = r"D:\LOMBA\Portofolio\public\World Assets\Journey\Labu Pixel Teal Transparan.png"
if os.path.exists(flask_path):
    img = Image.open(flask_path).convert("RGBA")
    arr = np.array(img)
    # filter opaque pixels
    opaque = arr[arr[:, :, 3] > 100][:, :3]
    # check teal tones
    teal_mask = (opaque[:, 0] < 100) & (opaque[:, 1] > 80) & (opaque[:, 2] > 90)
    teals = opaque[teal_mask]
    if len(teals) > 0:
        mean_teal = np.mean(teals, axis=0)
        print("=== FLASK COLOR ANALYSIS ===")
        print(f"Mean teal RGB: {mean_teal}")
        # sample top 5 most common colors
        from collections import Counter
        hex_colors = [f"#{p[0]:02X}{p[1]:02X}{p[2]:02X}" for p in teals]
        top = Counter(hex_colors).most_common(8)
        print("Top teal colors in flask:", top)

# 2. Inspect Achievement Sheet layout
ach_path = r"D:\LOMBA\Portofolio\public\World Assets\Achivment\Set Ikon Penghargaan Pixel Art.png"
if os.path.exists(ach_path):
    print("\n=== ACHIEVEMENT SHEET ANALYSIS ===")
    img = Image.open(ach_path).convert("RGBA")
    w, h = img.size
    print(f"Sheet size: {w}x{h}")
    # find connected components or distinct bounding boxes in the sheet
    # Let's see horizontal and vertical profiles of alpha > 20
    alpha = np.array(img.split()[-1]) > 20
    # Let's find columns and rows with content
    col_has_content = np.any(alpha, axis=0)
    row_has_content = np.any(alpha, axis=1)
    
# 3. Inspect UI Sheet layout
ui_path = r"D:\LOMBA\Portofolio\public\World Assets\Ui\Set Ikon Pixel UI Teal dan Emas.png"
if os.path.exists(ui_path):
    print("\n=== UI SHEET ANALYSIS ===")
    img = Image.open(ui_path).convert("RGBA")
    w, h = img.size
    print(f"Sheet size: {w}x{h}")
