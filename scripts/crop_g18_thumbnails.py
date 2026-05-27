"""
Download Destructoid G18 zone overview images and crop per-location thumbnails.

Coordinate mapping (FFXIV standard for Dawntrail 2048-map zones):
  pixel = (coord - 1) / 41 * image_size
  (origin 1, range 41 units → covers full image width/height)
"""

import urllib.request
import os
from PIL import Image

# ── Output directory ──────────────────────────────────────────────────────────
OUT_DIR = r"D:\BLOG\eorzea-utility-hub\public\TreasureHunt\treasures"
TMP_DIR = r"D:\BLOG\eorzea-utility-hub\scripts\tmp_maps"
os.makedirs(TMP_DIR, exist_ok=True)

# ── Destructoid source images (804 × 804 px) ──────────────────────────────────
SOURCES = {
    "urqopacha":    "https://www.destructoid.com/wp-content/uploads/2024/07/urqopacha.png",
    "kozamauka":    "https://www.destructoid.com/wp-content/uploads/2024/07/kozamauka.png",
    "yaktel":       "https://www.destructoid.com/wp-content/uploads/2024/07/yak-tel.png",
    "shaaloani":    "https://www.destructoid.com/wp-content/uploads/2024/07/shaaloani.png",
    "heritagefound":"https://www.destructoid.com/wp-content/uploads/2024/07/heritage-found.png",
}

# ── G18 coordinates per zone (from Destructoid article) ──────────────────────
COORDS = {
    "urqopacha": [
        (13.8,13.5),(17.1,23.3),(21.4,23.4),(29.9,24.8),
        (21.4,26.0),(15.7,31.0),(34.1,29.3),(34.2,32.9),
    ],
    "kozamauka": [
        (19.9,6.5),(36.6,6.3),(31.3,15.1),(7.1,19.7),
        (18.7,22.2),(37.9,22.2),(9.2,33.9),(32.6,36.1),
    ],
    "yaktel": [
        (22.2,5.9),(6.1,19.8),(36.2,12.9),(24.4,21.2),
        (30.2,21.9),(14.4,26.9),(10.9,33.2),(22.6,36.5),
    ],
    "shaaloani": [
        (28.7,8.7),(18.2,11.6),(13.1,14.4),(35.8,17.8),
        (26.0,19.7),(17.9,21.4),(19.4,34.6),(32.3,32.9),
    ],
    "heritagefound": [
        (31.5,8.2),(16.4,12.7),(22.1,19.2),(8.4,22.0),
        (17.8,22.9),(35.7,25.9),(26.3,30.7),(17.7,36.0),
    ],
}

# ── Crop settings ─────────────────────────────────────────────────────────────
# Crop half-width in pixels from the 804-px source image
HALF = 90          # 180 × 180 crop from source → resized to THUMB_SIZE
THUMB_SIZE = 300   # final thumbnail px (square)

# Coordinate → pixel: FFXIV standard for 2048-map zones
MAP_ORIGIN = 1.0
MAP_RANGE  = 41.0

def coord_to_pixel(c: float, img_size: int) -> int:
    return int((c - MAP_ORIGIN) / MAP_RANGE * img_size)

# ── Download helper ───────────────────────────────────────────────────────────
HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; thumbnail-crop-bot/1.0)"}

def download(url: str, dest: str):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as r, open(dest, "wb") as f:
        f.write(r.read())
    print(f"  Downloaded → {os.path.basename(dest)}")

# ── Main ─────────────────────────────────────────────────────────────────────
for zone, url in SOURCES.items():
    print(f"\n=== {zone} ===")

    # 1. Download overview image
    src_path = os.path.join(TMP_DIR, f"{zone}.png")
    if not os.path.exists(src_path):
        download(url, src_path)
    else:
        print(f"  Already cached: {os.path.basename(src_path)}")

    img = Image.open(src_path).convert("RGB")
    W, H = img.size
    print(f"  Image size: {W} × {H}")

    for i, (cx, cy) in enumerate(COORDS[zone], start=1):
        px = coord_to_pixel(cx, W)
        py = coord_to_pixel(cy, H)

        # Clamp crop to image bounds
        x0 = max(0, px - HALF)
        y0 = max(0, py - HALF)
        x1 = min(W, px + HALF)
        y1 = min(H, py + HALF)

        crop = img.crop((x0, y0, x1, y1))
        thumb = crop.resize((THUMB_SIZE, THUMB_SIZE), Image.LANCZOS)

        out_name = f"g18_{zone}_{i:02d}.webp"
        out_path = os.path.join(OUT_DIR, out_name)
        thumb.save(out_path, "WEBP", quality=85)
        print(f"  [{i}/8] ({cx},{cy}) → pixel({px},{py}) → {out_name}")

print("\nDone — 40 thumbnails written.")
