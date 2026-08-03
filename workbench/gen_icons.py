#!/usr/bin/env python3
"""生成工作台图标：黑底 + 发光 X（纯标准库 PNG 编码）"""
import zlib, struct, math, os

def dist_seg(px, py, x1, y1, x2, y2):
    dx, dy = x2 - x1, y2 - y1
    L2 = dx * dx + dy * dy
    if L2 == 0:
        return math.hypot(px - x1, py - y1)
    t = max(0.0, min(1.0, ((px - x1) * dx + (py - y1) * dy) / L2))
    return math.hypot(px - (x1 + t * dx), py - (y1 + t * dy))

def x_color(x, y, size):
    nx, ny = (x + 0.5) / size, (y + 0.5) / size
    d = min(
        dist_seg(nx, ny, 0.22, 0.22, 0.78, 0.78),
        dist_seg(nx, ny, 0.78, 0.22, 0.22, 0.78),
    )
    bg = (13, 10, 18)
    core = (255, 255, 255)
    glow = (150, 120, 255)
    if d <= 0.030:
        return core
    if d <= 0.075:
        t = (d - 0.030) / 0.045
        return tuple(int(core[i] + (glow[i] - core[i]) * t) for i in range(3))
    if d <= 0.17:
        t = (d - 0.075) / 0.095
        return tuple(int(glow[i] + (bg[i] - glow[i]) * t) for i in range(3))
    return bg

def write_png(path, size):
    raw = bytearray()
    for y in range(size):
        raw.append(0)
        for x in range(size):
            raw.extend(x_color(x, y, size))

    def chunk(tag, data):
        c = struct.pack(">I", len(data)) + tag + data
        c += struct.pack(">I", zlib.crc32(tag + data) & 0xffffffff)
        return c

    png = b"\x89PNG\r\n\x1a\n"
    png += chunk(b"IHDR", struct.pack(">IIBBBBB", size, size, 8, 2, 0, 0, 0))
    png += chunk(b"IDAT", zlib.compress(bytes(raw), 9))
    png += chunk(b"IEND", b"")
    with open(path, "wb") as f:
        f.write(png)
    print("wrote", path, os.path.getsize(path), "bytes")

os.makedirs("icons", exist_ok=True)
write_png("icons/icon-192.png", 192)
write_png("icons/icon-512.png", 512)
write_png("icons/apple-touch-icon.png", 180)
print("done")
