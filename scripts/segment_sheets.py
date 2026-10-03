import os
from PIL import Image
import numpy as np
import scipy.ndimage as ndimage

def segment_sheet(image_path, min_area=500, alpha_thresh=15):
    img = Image.open(image_path).convert("RGBA")
    w, h = img.size
    alpha = np.array(img.split()[-1]) > alpha_thresh
    
    # We can do morphological closing with small structure to keep sparkles / confetti with their main objects if close,
    # OR we can inspect all connected components first.
    labeled, num_features = ndimage.label(alpha)
    slices = ndimage.find_objects(labeled)
    
    components = []
    for i, s in enumerate(slices):
        y_slice, x_slice = s
        comp_mask = (labeled[y_slice, x_slice] == (i + 1))
        area = np.sum(comp_mask)
        if area >= min_area:
            components.append({
                "id": i + 1,
                "bbox": (x_slice.start, y_slice.start, x_slice.stop - 1, y_slice.stop - 1),
                "width": x_slice.stop - x_slice.start,
                "height": y_slice.stop - y_slice.start,
                "area": int(area),
            })
            
    # Sort components: roughly by y (rows) then x (columns)
    components.sort(key=lambda c: (c["bbox"][1] // 150, c["bbox"][0]))
    return img, components

print("==================== ACHIEVEMENT SHEET ====================")
ach_path = r"D:\LOMBA\Portofolio\public\World Assets\Achivment\Set Ikon Penghargaan Pixel Art.png"
img_ach, comps_ach = segment_sheet(ach_path, min_area=300)
print(f"Found {len(comps_ach)} components:")
for c in comps_ach:
    print(f"  Component: bbox={c['bbox']}, size={c['width']}x{c['height']}, area={c['area']}")

print("\n==================== UI SHEET ====================")
ui_path = r"D:\LOMBA\Portofolio\public\World Assets\Ui\Set Ikon Pixel UI Teal dan Emas.png"
img_ui, comps_ui = segment_sheet(ui_path, min_area=100)
print(f"Found {len(comps_ui)} components:")
for c in comps_ui:
    print(f"  Component: bbox={c['bbox']}, size={c['width']}x{c['height']}, area={c['area']}")
