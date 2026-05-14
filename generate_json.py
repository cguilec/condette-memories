import os
import json

folder = "images"

files = sorted([
    f"images/{f}"
    for f in os.listdir(folder)
    if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp"))
])

with open("images.json", "w", encoding="utf-8") as fp:
    json.dump(files, fp, indent=2)

print(f"{len(files)} images ajoutées.")