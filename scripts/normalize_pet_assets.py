import os
from PIL import Image

raw_dir = r"D:\LOMBA\Portofolio\public\pet\Raw character"
base_pet_dir = r"D:\LOMBA\Portofolio\public\pet"

MASTER_CANVAS_SIZE = 1600
GROUND_Y = 1500
CENTER_X = 800

# Canonical Idle baseline metrics
# idle: hair_top = 18, bottom_y = 1236, standing_h = 1219
# idle: head_h = 245, body_center_x = 623.0
CANONICAL_STANDING_H = 1219
CANONICAL_HEAD_H = 245

ASSET_CONFIGS = [
    {
        "state": "idle",
        "raw_file": "hanif-idle.png",
        "out_dir": os.path.join(base_pet_dir, "idle"),
        "out_file": "hanif-idle.png",
        "scale_mode": "idle_reference",
    },
    {
        "state": "wave",
        "raw_file": "hanif-wave.png",
        "out_dir": os.path.join(base_pet_dir, "wave"),
        "out_file": "hanif-wave.png",
        "scale_mode": "standing",
    },
    {
        "state": "walk",
        "raw_file": "hanif-walk.png",
        "out_dir": os.path.join(base_pet_dir, "walk"),
        "out_file": "hanif-walk.png",
        "scale_mode": "standing",
    },
    {
        "state": "coding",
        "raw_file": "hanif-code.png",
        "out_dir": os.path.join(base_pet_dir, "coding"),
        "out_file": "hanif-code.png",
        "scale_mode": "standing",
    },
    {
        "state": "reading",
        "raw_file": "hanif-read.png",
        "out_dir": os.path.join(base_pet_dir, "reading"),
        "out_file": "hanif-read.png",
        "scale_mode": "standing",
    },
    {
        "state": "trophy",
        "raw_file": "hanif-trophy.png",
        "out_dir": os.path.join(base_pet_dir, "trophy"),
        "out_file": "hanif-trophy.png",
        "scale_mode": "standing",
    },
    {
        "state": "microphone",
        "raw_file": "hanif-microphone.png",
        "out_dir": os.path.join(base_pet_dir, "microphone"),
        "out_file": "hanif-microphone.png",
        "scale_mode": "standing",
    },
    {
        "state": "rocket",
        "raw_file": "hanif-rocket.png",
        "out_dir": os.path.join(base_pet_dir, "rocket"),
        "out_file": "hanif-rocket.png",
        "scale_mode": "rocket",
    },
    {
        "state": "sleep",
        "raw_file": "hanif-sleep.png",
        "out_dir": os.path.join(base_pet_dir, "sleep"),
        "out_file": "hanif-sleep.png",
        "scale_mode": "sleep",
    },
]

def clean_alpha(img, threshold=10):
    # Zero out faint stray alpha noise (alpha < threshold)
    data = img.getdata()
    cleaned = []
    for item in data:
        if item[3] < threshold:
            cleaned.append((0, 0, 0, 0))
        else:
            cleaned.append(item)
    out = Image.new("RGBA", img.size)
    out.putdata(cleaned)
    return out

def process_all():
    print("=== PIXEL HANIF NORMALIZATION PIPELINE ===")
    print(f"Master Canvas: {MASTER_CANVAS_SIZE}x{MASTER_CANVAS_SIZE} RGBA PNG")
    print(f"Ground Baseline: Y={GROUND_Y} | Horizontal Anchor: X={CENTER_X}")
    print("-" * 75)
    
    # 1. First analyze raw idle for reference
    raw_idle_path = os.path.join(raw_dir, "hanif-idle.png")
    raw_idle = Image.open(raw_idle_path).convert("RGBA")
    raw_idle = clean_alpha(raw_idle)
    
    # Find idle standing bounds
    w, h = raw_idle.size
    idle_ys = [y for y in range(h) for x in range(w) if raw_idle.getpixel((x, y))[3] > 20]
    idle_hair_top = min(idle_ys)
    idle_bottom = max(idle_ys)
    idle_h = idle_bottom - idle_hair_top + 1
    
    # Idle body centerline
    idle_teal_ys = [y for y in range(h) for x in range(w) if raw_idle.getpixel((x, y))[3] > 100 and 30 < raw_idle.getpixel((x, y))[0] < 80 and 90 < raw_idle.getpixel((x, y))[1] < 160 and 120 < raw_idle.getpixel((x, y))[2] < 180]
    idle_teal_top = min(idle_teal_ys)
    idle_face_xs = [x for y in range(idle_hair_top, idle_teal_top) for x in range(w) if raw_idle.getpixel((x, y))[3] > 100 and raw_idle.getpixel((x, y))[0] > 180]
    idle_face_center_x = (min(idle_face_xs) + max(idle_face_xs)) / 2 if idle_face_xs else w / 2
    
    print(f"Canonical Idle Reference:")
    print(f"  Standing Height: {idle_h} px (hair_top={idle_hair_top}, bottom={idle_bottom})")
    print(f"  Face Center X: {idle_face_center_x:.1f} px")
    print("-" * 75)
    
    for cfg in ASSET_CONFIGS:
        state = cfg["state"]
        raw_path = os.path.join(raw_dir, cfg["raw_file"])
        raw_img = Image.open(raw_path).convert("RGBA")
        raw_img = clean_alpha(raw_img)
        rw, rh = raw_img.size
        
        # Analyze raw character landmarks
        content_ys = [y for y in range(rh) for x in range(rw) if raw_img.getpixel((x, y))[3] > 20]
        hair_top = min(content_ys)
        bottom_y = max(content_ys)
        standing_h = bottom_y - hair_top + 1
        
        # Find head region for face center
        teal_ys = [y for y in range(rh) for x in range(rw) if raw_img.getpixel((x, y))[3] > 100 and 30 < raw_img.getpixel((x, y))[0] < 80 and 90 < raw_img.getpixel((x, y))[1] < 160 and 120 < raw_img.getpixel((x, y))[2] < 180]
        teal_top = min(teal_ys) if teal_ys else rh // 3
        head_h = teal_top - hair_top
        
        face_xs = [x for y in range(hair_top, teal_top) for x in range(rw) if raw_img.getpixel((x, y))[3] > 100 and raw_img.getpixel((x, y))[0] > 180]
        if face_xs:
            face_cx = (min(face_xs) + max(face_xs)) / 2
        else:
            face_cx = rw / 2
            
        # Determine scale factor and alignment
        if cfg["scale_mode"] == "idle_reference":
            scale = 1.0
            rescaled_img = raw_img
            scaled_bottom = bottom_y
            scaled_cx = face_cx
        elif cfg["scale_mode"] == "standing":
            scale = CANONICAL_STANDING_H / standing_h
            new_w = int(round(rw * scale))
            new_h = int(round(rh * scale))
            rescaled_img = raw_img.resize((new_w, new_h), Image.Resampling.NEAREST)
            scaled_bottom = int(round(bottom_y * scale))
            scaled_cx = face_cx * scale
        elif cfg["scale_mode"] == "sleep":
            # Preserve natural resting pose; match head scale (head_h ~ CANONICAL_HEAD_H)
            scale = CANONICAL_HEAD_H / head_h if head_h > 0 else 1.0
            new_w = int(round(rw * scale))
            new_h = int(round(rh * scale))
            rescaled_img = raw_img.resize((new_w, new_h), Image.Resampling.NEAREST)
            scaled_bottom = int(round(bottom_y * scale))
            # for sleep, center the whole resting body
            sleep_xs = [x for y in range(new_h) for x in range(new_w) if rescaled_img.getpixel((x, y))[3] > 20]
            scaled_cx = (min(sleep_xs) + max(sleep_xs)) / 2 if sleep_xs else new_w / 2
        elif cfg["scale_mode"] == "rocket":
            # Match rocket height to idle canonical height
            scale = CANONICAL_STANDING_H / standing_h
            new_w = int(round(rw * scale))
            new_h = int(round(rh * scale))
            rescaled_img = raw_img.resize((new_w, new_h), Image.Resampling.NEAREST)
            scaled_bottom = int(round(bottom_y * scale))
            scaled_cx = face_cx * scale

        # Calculate placement onto master 1600x1600 canvas
        # Anchor: bottom of feet / base touches GROUND_Y
        paste_y = int(round(GROUND_Y - scaled_bottom))
        # Anchor: face / body centerline aligns with CENTER_X
        paste_x = int(round(CENTER_X - scaled_cx))
        
        master_canvas = Image.new("RGBA", (MASTER_CANVAS_SIZE, MASTER_CANVAS_SIZE), (0, 0, 0, 0))
        master_canvas.paste(rescaled_img, (paste_x, paste_y), rescaled_img)
        
        # Verify output bounds on master canvas
        mc_ys = [y for y in range(MASTER_CANVAS_SIZE) for x in range(MASTER_CANVAS_SIZE) if master_canvas.getpixel((x, y))[3] > 20]
        mc_top = min(mc_ys)
        mc_bot = max(mc_ys)
        mc_xs = [x for y in range(MASTER_CANVAS_SIZE) for x in range(MASTER_CANVAS_SIZE) if master_canvas.getpixel((x, y))[3] > 20]
        mc_left = min(mc_xs)
        mc_right = max(mc_xs)
        
        # Ensure output directory exists
        os.makedirs(cfg["out_dir"], exist_ok=True)
        out_path = os.path.join(cfg["out_dir"], cfg["out_file"])
        master_canvas.save(out_path, format="PNG", optimize=True)
        
        print(f"State: {state:10s} | scale={scale:.4f} | paste=({paste_x:4d}, {paste_y:4d}) | final_y=[{mc_top:4d}, {mc_bot:4d}] (h={mc_bot-mc_top+1:4d}) | final_x=[{mc_left:4d}, {mc_right:4d}]")
        print(f"  -> Saved: {out_path}")

    print("-" * 75)
    print("Normalization complete for all 9 states.")

if __name__ == "__main__":
    process_all()
