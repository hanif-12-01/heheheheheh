import os
from PIL import Image
import numpy as np

ui_path = r"D:\LOMBA\Portofolio\public\World Assets\Ui\Set Ikon Pixel UI Teal dan Emas.png"
ui_img = Image.open(ui_path).convert("RGBA")
temp_dir = r"D:\LOMBA\Portofolio\scripts\temp_crops"
os.makedirs(temp_dir, exist_ok=True)

# Let's inspect the UI sheet
# Let's find all connected islands with alpha > 15
alpha = np.array(ui_img.split()[-1]) > 15
import scipy.ndimage as ndimage
labeled, num_features = ndimage.label(alpha)
slices = ndimage.find_objects(labeled)

print("=== ALL UI SHEET ISLANDS ===")
islands = []
for i, s in enumerate(slices):
    y_slice, x_slice = s
    area = np.sum(labeled[y_slice, x_slice] == (i + 1))
    if area > 150: # filter tiny noise
        crop = ui_img.crop((x_slice.start, y_slice.start, x_slice.stop, y_slice.stop))
        name = f"ui_island_{i+1}_x{x_slice.start}_y{y_slice.start}.png"
        crop.save(os.path.join(temp_dir, name))
        islands.append({
            "id": i + 1,
            "file": name,
            "bbox": (x_slice.start, y_slice.start, x_slice.stop, y_slice.stop),
            "size": (x_slice.stop - x_slice.start, y_slice.stop - y_slice.start),
            "area": int(area)
        })

for isl in sorted(islands, key=lambda x: (x["bbox"][1] // 250, x["bbox"][0])):
    print(f"Island {isl['id']:2d} at {isl['bbox']}, size={isl['size']}, area={isl['area']} -> {isl['file']}")

# Now inspect Achievement Sheet
print("\n=== ALL ACHIEVEMENT SHEET ISLANDS ===")
ach_path = r"D:\LOMBA\Portofolio\public\World Assets\Achivment\Set Ikon Penghargaan Pixel Art.png"
ach_img = Image.open(ach_path).convert("RGBA")
alpha_ach = np.array(ach_img.split()[-1]) > 15
labeled_ach, num_features_ach = ndimage.label(alpha_ach)
slices_ach = ndimage.find_objects(labeled_ach)

ach_islands = []
for i, s in enumerate(slices_ach):
    y_slice, x_slice = s
    area = np.sum(labeled_ach[y_slice, x_slice] == (i + 1))
    if area > 1000: # large objects
        crop = ach_img.crop((x_slice.start, y_slice.start, x_slice.stop, y_slice.stop))
        name = f"ach_island_{i+1}_x{x_slice.start}_y{y_slice.start}.png"
        crop.save(os.path.join(temp_dir, name))
        ach_islands.append({
            "id": i + 1,
            "file": name,
            "bbox": (x_slice.start, y_slice.start, x_slice.stop, y_slice.stop),
            "size": (x_slice.stop - x_slice.start, y_slice.stop - y_slice.start),
            "area": int(area)
        })

for isl in sorted(ach_islands, key=lambda x: (x["bbox"][1] // 300, x["bbox"][0])):
    print(f"Ach Island {isl['id']:2d} at {isl['bbox']}, size={isl['size']}, area={isl['area']} -> {isl['file']}")
