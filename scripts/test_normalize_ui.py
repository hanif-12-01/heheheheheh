import os
from PIL import Image
import numpy as np

# Test placing on 256x256 canvas
CANVAS_SIZE = 256
TARGET_INNER = 216 # leaves 20px margin

crops = {
    'ui-arrow-right': (62, 202, 273, 409),
    'ui-arrow-left': (344, 202, 555, 409),
    'ui-arrow-down': (622, 200, 828, 419),
    'ui-star': (897, 196, 1123, 413),
    'ui-sparkle': (1195, 196, 1402, 422),
    'ui-map-pin': (64, 480, 249, 720),
    'ui-folder': (332, 505, 558, 706),
    'ui-code': (597, 518, 856, 692),
    'ui-checkpoint': (907, 465, 1130, 736),
    'ui-check': (1184, 510, 1411, 702),
    'ui-external-link': (63, 774, 292, 994),
}

ui_path = r"D:\LOMBA\Portofolio\public\World Assets\Ui\Set Ikon Pixel UI Teal dan Emas.png"
img = Image.open(ui_path).convert("RGBA")

os.makedirs("scripts/test_256", exist_ok=True)

for name, box in crops.items():
    crop = img.crop(box)
    # Trim any stray alpha < 15 around edges of crop
    alpha = np.array(crop.split()[-1]) > 15
    ys, xs = np.where(alpha)
    if len(ys) > 0:
        crop = crop.crop((xs.min(), ys.min(), xs.max()+1, ys.max()+1))
    
    w, h = crop.size
    scale = min(TARGET_INNER / w, TARGET_INNER / h)
    new_w = int(round(w * scale))
    new_h = int(round(h * scale))
    
    # Try Lanczos or Nearest for downsampling
    # For pixel art downsampling from ~240 to 216, Resampling.LANCZOS or Resampling.NEAREST?
    # Let's compare or use Lanczos / nearest
    resized = crop.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    canvas = Image.new("RGBA", (CANVAS_SIZE, CANVAS_SIZE), (0, 0, 0, 0))
    pos_x = (CANVAS_SIZE - new_w) // 2
    pos_y = (CANVAS_SIZE - new_h) // 2
    canvas.paste(resized, (pos_x, pos_y), resized)
    canvas.save(f"scripts/test_256/{name}.png")
    print(f"Saved {name}: orig={w}x{h} -> {new_w}x{new_h} centered on {CANVAS_SIZE}x{CANVAS_SIZE}")
