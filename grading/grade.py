#!/usr/bin/env python3
"""
Outono ao Longo dos Rios — house colour grade.

Takes any photo and grades it to the colour standard measured from the
reference cover (grading/reference/outono-ao-longo-dos-rios.jpg):

  - blue / gold split complementary, bridged by cool green
  - wine red kept as a rare accent
  - balanced tonal curve centred on L* ~54, mid-tone heavy
  - restrained chroma (mean C* ~25), peaks only in sky blue and leaf gold
  - cool teal shadows, cool blue-white highlights

The grade changes colour and tone only. It never crops, retouches or
changes what is in the picture.

Usage:
  python3 grading/grade.py IN.jpg [IN2.jpg ...] [-o OUTDIR] [--strength 1.0]
                                  [--protect-skin] [--compare]
"""
import argparse
import io
import json
import os
import sys

import numpy as np
from PIL import Image, ImageCms, ImageFilter, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
REF_IMG = os.path.join(HERE, "reference", "outono-ao-longo-dos-rios.jpg")
REF_JSON = os.path.join(HERE, "reference", "profile.json")

# Hue families (Lab hue angle, degrees). Each source pixel is softly assigned
# to these and pulled toward the reference family's hue and chroma.
FAMILIES = {
    "wine":  (330, 410),   # wraps through 0°: magenta-reds belong to wine
    "gold":  (50, 120),
    "green": (120, 210),
    "blue":  (210, 330),   # violets fold into blue (the reference has none)
}
L_BANDS = [0, 15, 35, 50, 65, 85, 101]


# ---------------------------------------------------------------- colour math
def load_srgb(path):
    im = Image.open(path)
    im = ImageOps.exif_transpose(im)
    icc = im.info.get("icc_profile")
    if im.mode not in ("RGB",):
        im = im.convert("RGB")
    if icc:
        try:
            src = ImageCms.ImageCmsProfile(io.BytesIO(icc))
            im = ImageCms.profileToProfile(
                im, src, ImageCms.createProfile("sRGB"),
                renderingIntent=ImageCms.Intent.PERCEPTUAL, outputMode="RGB")
        except Exception:
            pass
    return np.asarray(im).astype(np.float64) / 255.0


_M = np.array([[0.4124564, 0.3575761, 0.1804375],
               [0.2126729, 0.7151522, 0.0721750],
               [0.0193339, 0.1191920, 0.9503041]])
_MI = np.linalg.inv(_M)
_WP = np.array([0.95047, 1.0, 1.08883])


def rgb2lab(rgb):
    lin = np.where(rgb <= 0.04045, rgb / 12.92, ((rgb + 0.055) / 1.055) ** 2.4)
    xyz = lin @ _M.T / _WP
    f = np.where(xyz > 216 / 24389, np.cbrt(xyz), (24389 / 27 * xyz + 16) / 116)
    L = 116 * f[..., 1] - 16
    a = 500 * (f[..., 0] - f[..., 1])
    b = 200 * (f[..., 1] - f[..., 2])
    return np.stack([L, a, b], -1)


def lab2rgb(lab):
    L, a, b = lab[..., 0], lab[..., 1], lab[..., 2]
    fy = (L + 16) / 116
    fx = fy + a / 500
    fz = fy - b / 200
    f = np.stack([fx, fy, fz], -1)
    xyz = np.where(f ** 3 > 216 / 24389, f ** 3, (116 * f - 16) / (24389 / 27))
    lin = (xyz * _WP) @ _MI.T
    lin = np.clip(lin, 0, None)
    rgb = np.where(lin <= 0.0031308, 12.92 * lin, 1.055 * lin ** (1 / 2.4) - 0.055)
    return np.clip(rgb, 0, 1)


def lch(lab):
    C = np.hypot(lab[..., 1], lab[..., 2])
    h = np.degrees(np.arctan2(lab[..., 2], lab[..., 1])) % 360
    return C, h


def circ_mean(h, w):
    r = np.radians(h)
    return np.degrees(np.arctan2((np.sin(r) * w).sum(), (np.cos(r) * w).sum())) % 360


def hue_diff(a, b):
    return (a - b + 180) % 360 - 180


# ---------------------------------------------------------------------- grade
WARM_WHITE_AB = (1.0, 3.0)   # the cover's sunlit church facade: Lab(66, 1, 3)
SKY_TOP = (80.0, -4.0, -16.0)     # cover sky behind the title  (#A1C3DC)
SKY_HORIZON = (89.0, -2.0, -9.0)  # cover horizon haze          (#D2E1F0)
SKY_DEEP = (66.0, -7.0, -30.0)    # toward the cover's upper sky (#4192C9 side)


def sky_mask(lab):
    """Soft mask of sky: bright neutral or blue pixels connected to the top edge."""
    H, W = lab.shape[:2]
    step = max(1, W // 400)
    sm = lab[::step, ::step]
    L = sm[..., 0]
    C, h = lch(sm)
    cand = ((L > 68) & (C < 16)) | ((L > 45) & (C > 8) & (h > 200) & (h < 300))
    m = np.zeros_like(cand)
    m[0] = cand[0]
    for _ in range(2000):
        g = m.copy()
        g[1:] |= m[:-1]
        g[:-1] |= m[1:]
        g[:, 1:] |= m[:, :-1]
        g[:, :-1] |= m[:, 1:]
        g &= cand
        if (g == m).all():
            break
        m = g
    im = Image.fromarray((m * 255).astype(np.uint8)).resize((W, H), Image.BILINEAR)
    im = im.filter(ImageFilter.GaussianBlur(2))
    mask = np.asarray(im).astype(np.float64) / 255
    # keep the mask off roofs and timber at full resolution
    Lf = lab[..., 0]
    Cf, hf = lch(lab)
    soft = np.clip((Lf - 55) / 15, 0, 1)
    return mask * soft


def profile(lab, sky=None):
    """Measure the statistics the grade matches (sky excluded from tone and neutrals)."""
    if sky is None:
        sky = sky_mask(lab)
    flat = lab.reshape(-1, 3)
    skyf = sky.reshape(-1)
    rng = np.random.default_rng(0)
    if len(flat) > 400_000:
        idx = rng.choice(len(flat), 400_000, replace=False)
        flat, skyf = flat[idx], skyf[idx]
    L = flat[:, 0]
    C, h = lch(flat)
    land = skyf < 0.5
    p = {
        "L_quantiles": np.percentile(L[land], np.linspace(0, 100, 101)).tolist(),
        "C_mean": float(C[land].mean()),
        "families": {},
        "neutral_ab": [],
    }
    chromatic = (C > 8) & land
    for name, (lo, hi) in FAMILIES.items():
        m = chromatic & (((h - lo) % 360) < (hi - lo))
        if m.sum() < 50:
            p["families"][name] = None
            continue
        p["families"][name] = {
            "share": float(m.sum() / max(chromatic.sum(), 1)),
            "hue": float(circ_mean(h[m], C[m])),
            "chroma": float(np.median(C[m])),
            "chroma_p90": float(np.percentile(C[m], 90)),
        }
    for lo, hi in zip(L_BANDS[:-1], L_BANDS[1:]):
        m = land & (L >= lo) & (L < hi) & (C < 15)
        if m.sum() < 50:
            p["neutral_ab"].append([0.0, 0.0])
        else:
            p["neutral_ab"].append([float(np.median(flat[m, 1])), float(np.median(flat[m, 2]))])
    return p


def reference_profile():
    if os.path.exists(REF_JSON) and os.path.getmtime(REF_JSON) >= max(
            os.path.getmtime(REF_IMG), os.path.getmtime(__file__)):
        with open(REF_JSON) as f:
            return json.load(f)
    p = profile(rgb2lab(load_srgb(REF_IMG)))
    with open(REF_JSON, "w") as f:
        json.dump(p, f, indent=1)
    return p


def grade(rgb, ref, strength=1.0, protect_skin=False, saturation=0.0):
    lab = rgb2lab(rgb)
    sky = sky_mask(lab)
    land = 1 - sky

    # 0. White balance: whites become the cover's warm-neutral facade white.
    src0 = profile(lab, sky)
    mids = np.array(src0["neutral_ab"][3:5]).mean(0)          # L* 50-85 neutrals
    cast = (mids - np.array(WARM_WHITE_AB)) * strength
    lab[..., 1] -= cast[0]
    lab[..., 2] -= cast[1]
    src = profile(lab, sky)
    out = lab.copy()
    L = lab[..., 0]
    C, h = lch(lab)

    # 1. Tone: map the land's luminance distribution onto the cover's land curve.
    sq = np.maximum.accumulate(np.array(src["L_quantiles"]) + np.arange(101) * 1e-6)
    rq = np.array(ref["L_quantiles"])
    L_new = np.interp(L, sq, rq)
    out[..., 0] = L + (L_new - L) * 0.7 * strength * land

    # 2. Hue families: pull hue and chroma toward the cover (chroma damped).
    dh = np.zeros_like(C)
    cs = np.zeros_like(C)
    ceil = np.zeros_like(C)
    wsum = np.zeros_like(C)
    for name, (lo, hi) in FAMILIES.items():
        s = src["families"].get(name)
        r = ref["families"].get(name)
        if s is None or r is None:
            continue
        centre = s["hue"]
        width = (hi - lo) / 2
        w = np.exp(-0.5 * (hue_diff(h, centre) / width) ** 2)
        shift = 0.8 * hue_diff(r["hue"], s["hue"])
        tighten = -0.3 * hue_diff(h, centre)
        dh += w * (shift + tighten)
        scale = np.clip(np.sqrt(r["chroma"] / max(s["chroma"], 1e-3)), 0.75, 1.35)
        cs += w * scale
        ceil += w * r["chroma_p90"] * 1.1
        wsum += w
    has = wsum > 1e-6
    dh = np.where(has, dh / np.maximum(wsum, 1e-6), 0)
    cs = np.where(has, cs / np.maximum(wsum, 1e-6), 1)
    ceil = np.where(has, ceil / np.maximum(wsum, 1e-6), 60)

    chroma_w = np.clip((C - 5) / 10, 0, 1)
    if protect_skin:
        skin = (h > 30) & (h < 75) & (C > 10) & (C < 45) & (L > 30) & (L < 85)
        chroma_w = np.where(skin, chroma_w * 0.2, chroma_w)
    k = strength * chroma_w * land
    h2 = (h + dh * k) % 360
    # Gold guard: the cover's gold is honeyed (hue ~84). Yellows never drift
    # toward lemon or green; anything already past it is drawn back.
    GOLD_MAX = ref["families"]["gold"]["hue"] + 2 if ref["families"].get("gold") else 86
    gold_zone = (h > 50) & (h < 125)
    h2 = np.where(gold_zone & (h2 > GOLD_MAX) & (h <= GOLD_MAX), GOLD_MAX, h2)
    over = gold_zone & (h > GOLD_MAX)
    h2 = np.where(over, h - (h - GOLD_MAX) * 0.6 * k, h2)
    C2 = C * (1 + (cs - 1) * k)

    # 3. Global chroma toward the cover's richness, with a per-family soft ceiling.
    land_mean = (C2 * land).sum() / max(land.sum(), 1)
    gscale = np.clip(ref["C_mean"] / max(land_mean, 1e-3), 0.9, 1.15)
    C2 = C2 * (1 + (gscale - 1) * strength * land)
    # Optional push toward the cover's full richness (0 = natural, 1 = cover level).
    if saturation > 0:
        land_mean = (C2 * land).sum() / max(land.sum(), 1)
        extra = np.clip(ref["C_mean"] / max(land_mean, 1e-3), 1.0, 1.8) ** saturation
        C2 = C2 * (1 + (extra - 1) * land * np.clip((C2 - 3) / 8, 0, 1))
    C2 = np.where(C2 > ceil, ceil + (C2 - ceil) * 0.3, C2)
    out[..., 1] = C2 * np.cos(np.radians(h2))
    out[..., 2] = C2 * np.sin(np.radians(h2))

    # 4. Shadows: a light teal-slate cast, as in the cover's roofs and river.
    Lb = out[..., 0]
    shadow = np.clip((40 - Lb) / 25, 0, 1) * np.exp(-C / 10) * 0.6 * strength * land
    out[..., 1] += -5.0 * shadow
    out[..., 2] += -2.5 * shadow

    # 5. Sky: neutral (overcast) sky takes the cover's haze gradient, top to horizon.
    Hh = lab.shape[0]
    rows = np.where(sky.max(1) > 0.5)[0]
    if len(rows):
        bottom = max(np.percentile(rows, 98), 1)
        t = np.clip(np.arange(Hh) / bottom, 0, 1)[:, None]
        top = np.array(SKY_TOP) + (np.array(SKY_DEEP) - np.array(SKY_TOP)) * saturation
        tL = top[0] + (SKY_HORIZON[0] - top[0]) * t
        ta = top[1] + (SKY_HORIZON[1] - top[1]) * t
        tb = top[2] + (SKY_HORIZON[2] - top[2]) * t
        skyL = L[sky > 0.5]
        med = np.median(skyL) if skyL.size else 90
        neutral_sky = sky * np.clip((16 - C) / 8, 0, 1) * 0.9 * strength
        out[..., 0] = out[..., 0] * (1 - neutral_sky) + (tL + (L - med) * 0.8) * neutral_sky
        out[..., 1] = out[..., 1] * (1 - neutral_sky) + ta * neutral_sky
        out[..., 2] = out[..., 2] * (1 - neutral_sky) + tb * neutral_sky
        rgb_out = lab2rgb(out)
        # Smooth the sky: tinting exposes JPEG blocking from phone files.
        im = Image.fromarray((rgb_out * 255 + 0.5).astype(np.uint8))
        blur = np.asarray(im.filter(ImageFilter.GaussianBlur(8))).astype(np.float64) / 255
        w = (neutral_sky / max(0.9 * strength, 1e-6))[..., None].clip(0, 1)
        return rgb_out * (1 - w) + blur * w

    return lab2rgb(out)


def save(rgb, path):
    im = Image.fromarray((rgb * 255 + 0.5).astype(np.uint8), "RGB")
    srgb = ImageCms.ImageCmsProfile(ImageCms.createProfile("sRGB")).tobytes()
    im.save(path, quality=95, subsampling=0, icc_profile=srgb)


def compare(before, after, path):
    a = Image.fromarray((before * 255).astype(np.uint8))
    b = Image.fromarray((after * 255).astype(np.uint8))
    w, h = a.size
    sheet = Image.new("RGB", (w * 2 + 20, h), (255, 255, 255))
    sheet.paste(a, (0, 0))
    sheet.paste(b, (w + 20, 0))
    sheet.thumbnail((2400, 2400))
    sheet.save(path, quality=90)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("inputs", nargs="+")
    ap.add_argument("-o", "--outdir", default=os.path.join(HERE, "output"))
    ap.add_argument("--strength", type=float, default=1.0)
    ap.add_argument("--protect-skin", action="store_true")
    ap.add_argument("--saturation", type=float, default=0.0,
                    help="0 natural (default) .. 1 full cover richness")
    ap.add_argument("--compare", action="store_true", help="also write a before/after sheet")
    args = ap.parse_args()
    os.makedirs(args.outdir, exist_ok=True)
    ref = reference_profile()
    for path in args.inputs:
        rgb = load_srgb(path)
        out = grade(rgb, ref, args.strength, args.protect_skin, args.saturation)
        stem = os.path.splitext(os.path.basename(path))[0]
        dst = os.path.join(args.outdir, f"{stem}_graded.jpg")
        save(out, dst)
        print(dst)
        if args.compare:
            cmp_path = os.path.join(args.outdir, f"{stem}_before-after.jpg")
            compare(rgb, out, cmp_path)
            print(cmp_path)


if __name__ == "__main__":
    sys.exit(main())
