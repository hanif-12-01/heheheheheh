import os
import hashlib
from PIL import Image
import numpy as np

RAW_ROOT = r"D:\LOMBA\Portofolio\public\World Assets"
PROD_ROOT = r"D:\LOMBA\Portofolio\public\pixel"

# Clean alpha threshold
ALPHA_THRESH = 15
PADDING_PX = 24
UI_CANVAS_SIZE = 256
UI_INNER_TARGET = 216

def get_dir_hashes(directory):
    hashes = {}
    for root, dirs, files in os.walk(directory):
        for f in files:
            p = os.path.join(root, f)
            with open(p, "rb") as fp:
                hashes[os.path.relpath(p, directory)] = hashlib.sha256(fp.read()).hexdigest()
    return hashes

def clean_alpha_and_tight_crop(img, alpha_thresh=ALPHA_THRESH):
    arr = np.array(img)
    # Zero out stray low alpha pixels
    stray_mask = (arr[:, :, 3] > 0) & (arr[:, :, 3] <= alpha_thresh)
    arr[stray_mask, 3] = 0
    # Also zero rgb where alpha is 0
    arr[arr[:, :, 3] == 0, :3] = 0
    
    clean_img = Image.fromarray(arr, "RGBA")
    alpha = arr[:, :, 3] > alpha_thresh
    ys, xs = np.where(alpha)
    if len(ys) == 0:
        return clean_img, (0, 0, img.width, img.height)
    
    x0, y0 = int(xs.min()), int(ys.min())
    x1, y1 = int(xs.max() + 1), int(ys.max() + 1)
    cropped = clean_img.crop((x0, y0, x1, y1))
    return cropped, (x0, y0, x1, y1)

def add_balanced_padding(img, padding=PADDING_PX):
    w, h = img.size
    new_w, new_h = w + 2 * padding, h + 2 * padding
    padded = Image.new("RGBA", (new_w, new_h), (0, 0, 0, 0))
    padded.paste(img, (padding, padding), img)
    return padded

def normalize_ui_icon(img, box, canvas_size=UI_CANVAS_SIZE, inner_target=UI_INNER_TARGET):
    # Crop to region
    crop = img.crop(box)
    tight, _ = clean_alpha_and_tight_crop(crop)
    w, h = tight.size
    
    # Scale with nearest neighbor to preserve crisp pixel art and exact palette
    scale = min(inner_target / w, inner_target / h)
    new_w = int(round(w * scale))
    new_h = int(round(h * scale))
    
    resized = tight.resize((new_w, new_h), Image.Resampling.NEAREST)
    canvas = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    px = (canvas_size - new_w) // 2
    py = (canvas_size - new_h) // 2
    canvas.paste(resized, (px, py), resized)
    return canvas

def main():
    print("=== RECORDING INITIAL RAW DIRECTORY INTEGRITY ===")
    initial_hashes = get_dir_hashes(RAW_ROOT)
    print(f"Recorded {len(initial_hashes)} files in raw archive.")
    
    # 1. Directories
    dir_journey = os.path.join(PROD_ROOT, "journey")
    dir_achievements = os.path.join(PROD_ROOT, "achievements")
    dir_tech = os.path.join(PROD_ROOT, "tech")
    dir_ui = os.path.join(PROD_ROOT, "ui")
    
    for d in [dir_journey, dir_achievements, dir_tech, dir_ui]:
        os.makedirs(d, exist_ok=True)
        
    # 2. JOURNEY ASSETS
    print("\n--- Processing Journey Assets ---")
    journey_map = {
        "semester-1-backpack.png": "Ransel Pixel Art Teal dengan Gantungan Laptop.png",
        "semester-2-organization-building.png": "Gedung Kampus Pixel Art Modern.png",
        "semester-3-book.png": "Buku Terbuka dengan Penanda Teal.png",
        "semester-3-microphone.png": "Microfone Pixelado em Destaque.png",
        "semester-4-research-document.png": "Ikon Tumpukan Dokumen Analisis.png",
        "semester-4-research-flask.png": "Labu Pixel Teal Transparan.png",
        "semester-4-trophy.png": "Piala Emas Pixel Art Berkilau.png",
        "semester-5-rocket.png": "Roket Pixel Teal dengan Jejak Api.png"
    }
    
    for prod_name, raw_name in journey_map.items():
        raw_p = os.path.join(RAW_ROOT, "Journey", raw_name)
        img = Image.open(raw_p).convert("RGBA")
        tight, (x0, y0, x1, y1) = clean_alpha_and_tight_crop(img)
        padded = add_balanced_padding(tight, PADDING_PX)
        out_p = os.path.join(dir_journey, prod_name)
        padded.save(out_p, format="PNG", optimize=True)
        size_kb = os.path.getsize(out_p) / 1024
        print(f"  {prod_name:38s} | Orig: {img.size} -> Tight: {tight.size} -> Final: {padded.size} ({size_kb:.1f} KB)")
        
    # 3. TECH ASSETS
    print("\n--- Processing Tech Assets ---")
    tech_map = {
        "tech-smart-city.png": "Diorama Kota Pintar Futuristik.png",
        "tech-database.png": "Ikon Tumpukan Database Futuristik Pixel Art.png",
        "tech-code-editor.png": "Jendela Editor Kode Pixel Retro.png",
        "tech-gis-map.png": "Peta Lipat Pixel dengan Pin Turquoise.png",
        "tech-ai-chip.png": "Prosesor AI Pixel Bercahaya.png",
        "tech-server.png": "Tumpukan Server Piksel Neon.png"
    }
    
    for prod_name, raw_name in tech_map.items():
        raw_p = os.path.join(RAW_ROOT, "Tech", raw_name)
        img = Image.open(raw_p).convert("RGBA")
        tight, (x0, y0, x1, y1) = clean_alpha_and_tight_crop(img)
        padded = add_balanced_padding(tight, PADDING_PX)
        out_p = os.path.join(dir_tech, prod_name)
        padded.save(out_p, format="PNG", optimize=True)
        size_kb = os.path.getsize(out_p) / 1024
        print(f"  {prod_name:25s} | Orig: {img.size} -> Tight: {tight.size} -> Final: {padded.size} ({size_kb:.1f} KB)")

    # 4. ACHIEVEMENT ASSETS
    print("\n--- Processing Achievement Assets ---")
    ach_raw_p = os.path.join(RAW_ROOT, "Achivment", "Set Ikon Penghargaan Pixel Art.png")
    ach_img = Image.open(ach_raw_p).convert("RGBA")
    
    # Save optimized copy of full sheet
    clean_ach_sheet, _ = clean_alpha_and_tight_crop(ach_img, alpha_thresh=0) # keep full dimensions
    ach_sheet_p = os.path.join(dir_achievements, "achievement-sheet.png")
    clean_ach_sheet.save(ach_sheet_p, format="PNG", optimize=True)
    print(f"  achievement-sheet.png   | Size: {clean_ach_sheet.size} ({os.path.getsize(ach_sheet_p)/1024:.1f} KB)")
    
    ach_crops = {
        "achievement-trophy.png": (34, 70, 515, 609),
        "achievement-medal.png": (556, 87, 877, 603),
        "achievement-laurel.png": (901, 128, 1424, 599),
        "achievement-confetti.png": (177, 651, 690, 1032),
        "achievement-sparkle.png": (812, 656, 1206, 1006),
    }
    
    for prod_name, box in ach_crops.items():
        crop = ach_img.crop(box)
        tight, _ = clean_alpha_and_tight_crop(crop)
        padded = add_balanced_padding(tight, PADDING_PX)
        out_p = os.path.join(dir_achievements, prod_name)
        padded.save(out_p, format="PNG", optimize=True)
        size_kb = os.path.getsize(out_p) / 1024
        print(f"  {prod_name:25s} | Crop: {box} -> Tight: {tight.size} -> Final: {padded.size} ({size_kb:.1f} KB)")

    # 5. UI ICONS
    print("\n--- Processing UI Icon Assets ---")
    ui_raw_p = os.path.join(RAW_ROOT, "Ui", "Set Ikon Pixel UI Teal dan Emas.png")
    ui_img = Image.open(ui_raw_p).convert("RGBA")
    
    ui_crops = {
        "ui-arrow-right.png": (62, 202, 273, 409),
        "ui-arrow-left.png": (344, 202, 555, 409),
        "ui-arrow-down.png": (622, 200, 828, 419),
        "ui-star.png": (897, 196, 1123, 413),
        "ui-sparkle.png": (1195, 196, 1402, 422),
        "ui-map-pin.png": (64, 480, 249, 720),
        "ui-folder.png": (332, 505, 558, 706),
        "ui-code.png": (597, 518, 856, 692),
        "ui-checkpoint.png": (907, 465, 1130, 736),
        "ui-check.png": (1184, 510, 1411, 702),
        "ui-external-link.png": (63, 774, 292, 994),
    }
    
    for prod_name, box in ui_crops.items():
        norm_icon = normalize_ui_icon(ui_img, box)
        out_p = os.path.join(dir_ui, prod_name)
        norm_icon.save(out_p, format="PNG", optimize=True)
        size_kb = os.path.getsize(out_p) / 1024
        print(f"  {prod_name:22s} | Box: {box} -> Canvas: {norm_icon.size} ({size_kb:.1f} KB)")
        
    # VERIFY RAW DIRECTORY INTEGRITY
    print("\n=== VERIFYING FINAL RAW DIRECTORY INTEGRITY ===")
    final_hashes = get_dir_hashes(RAW_ROOT)
    assert len(initial_hashes) == len(final_hashes), "File count mismatch!"
    for k, v in initial_hashes.items():
        assert k in final_hashes, f"File missing: {k}"
        assert v == final_hashes[k], f"File modified: {k}"
    print("SUCCESS: RAW WORLD ASSET DIRECTORY IS 100% UNCHANGED AND INTACT!")

if __name__ == "__main__":
    main()
