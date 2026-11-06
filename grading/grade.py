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
from PIL import Image, ImageCms, ImageOps

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


# ------------------------------------------------------------------ profiling
def profile(lab):
    """Measure the statistics the grade matches."""
    flat = lab.reshape(-1, 3)
    if len(flat) > 400_000:
        flat = flat[np.random.default_rng(0).choice(len(flat), 400_000, replace=False)]
    L = flat[:, 0]
    C, h = lch(flat)
    p = {
        "L_quantiles": np.percentile(L, np.linspace(0, 100, 101)).tolist(),
        "C_mean": float(C.mean()),
        "families": {},
        "neutral_ab": [],
    }
    chromatic = C > 8
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
    # tint of near-neutrals per luminance band (split toning)
    for lo, hi in zip(L_BANDS[:-1], L_BANDS[1:]):
        m = (L >= lo) & (L < hi) & (C < 15)
        if m.sum() < 50:
            p["neutral_ab"].append([0.0, 0.0])
        else:
            p["neutral_ab"].append([float(np.median(flat[m, 1])), float(np.median(flat[m, 2]))])
    return p


def reference_profile():
    if os.path.exists(REF_JSON) and os.path.getmtime(REF_JSON) >= os.path.getmtime(REF_IMG):
        with open(REF_JSON) as f:
            return json.load(f)
    p = profile(rgb2lab(load_srgb(REF_IMG)))
    with open(REF_JSON, "w") as f:
        json.dump(p, f, indent=1)
    return p


# ---------------------------------------------------------------------- grade
def neutral_cast(p):
    """Median tint of near-neutral mid/high tones (bands 35-101)."""
    ab = np.array(p["neutral_ab"][2:])
    return ab.mean(0)


def grade(rgb, ref, strength=1.0, protect_skin=False):
    lab = rgb2lab(rgb)
    # 0. White balance: remove the source cast, adopt the reference's.
    cast = (neutral_cast(profile(lab)) - neutral_cast(ref)) * strength
    lab[..., 1] -= cast[0]
    lab[..., 2] -= cast[1]
    src = profile(lab)
    out = lab.copy()
    L = lab[..., 0]
    C, h = lch(lab)

    # 1. Tone: map the luminance distribution onto the reference curve.
    sq = np.array(src["L_quantiles"])
    rq = np.array(ref["L_quantiles"])
    sq = np.maximum.accumulate(sq + np.arange(101) * 1e-6)
    L_new = np.interp(L, sq, rq)
    tone_k = 0.75 * strength
    out[..., 0] = L + (L_new - L) * tone_k

    # 2. Hue families: pull each family's hue and chroma toward the reference.
    dh = np.zeros_like(C)
    cs = np.zeros_like(C)
    wsum = np.zeros_like(C)
    for name, (lo, hi) in FAMILIES.items():
        s = src["families"].get(name)
        r = ref["families"].get(name)
        if s is None or r is None:
            continue
        centre = s["hue"]
        width = (hi - lo) / 2
        w = np.exp(-0.5 * (hue_diff(h, centre) / width) ** 2)
        shift = hue_diff(r["hue"], s["hue"])
        # also tighten the family around its centre (one coherent gold, one blue)
        tighten = -0.35 * hue_diff(h, centre)
        dh += w * (shift + tighten)
        scale = np.clip(r["chroma"] / max(s["chroma"], 1e-3), 0.6, 1.5)
        cs += w * scale
        wsum += w
    has = wsum > 1e-6
    dh = np.where(has, dh / np.maximum(wsum, 1e-6), 0)
    cs = np.where(has, cs / np.maximum(wsum, 1e-6), 1)

    chroma_w = np.clip((C - 4) / 10, 0, 1)        # leave true neutrals to step 3
    if protect_skin:
        skin = (h > 30) & (h < 75) & (C > 10) & (C < 45) & (L > 35) & (L < 85)
        chroma_w = np.where(skin, chroma_w * 0.25, chroma_w)
    k = strength * chroma_w
    h2 = (h + dh * k) % 360
    C2 = C * (1 + (cs - 1) * k)

    # 3. Global chroma: settle at the reference richness.
    gscale = np.clip(ref["C_mean"] / max(np.mean(C2), 1e-3), 0.85, 1.2)
    C2 = C2 * (1 + (gscale - 1) * strength)
    # soft ceiling at the reference's own peak chroma
    peak = max(f["chroma_p90"] for f in ref["families"].values() if f) * 1.15
    C2 = np.where(C2 > peak, peak + (C2 - peak) * 0.35, C2)

    out[..., 1] = C2 * np.cos(np.radians(h2))
    out[..., 2] = C2 * np.sin(np.radians(h2))

    # 4. Split toning of neutrals: cool teal shadows, cool blue-white highlights.
    Lb = out[..., 0]
    centres = [(lo + hi) / 2 for lo, hi in zip(L_BANDS[:-1], L_BANDS[1:])]
    ra = np.interp(Lb, centres, [x[0] for x in ref["neutral_ab"]])
    rb = np.interp(Lb, centres, [x[1] for x in ref["neutral_ab"]])
    sa = np.interp(Lb, centres, [x[0] for x in src["neutral_ab"]])
    sb = np.interp(Lb, centres, [x[1] for x in src["neutral_ab"]])
    nw = np.exp(-C / 12) * strength
    out[..., 1] += (ra - sa) * nw
    out[..., 2] += (rb - sb) * nw

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
    ap.add_argument("--compare", action="store_true", help="also write a before/after sheet")
    args = ap.parse_args()
    os.makedirs(args.outdir, exist_ok=True)
    ref = reference_profile()
    for path in args.inputs:
        rgb = load_srgb(path)
        out = grade(rgb, ref, args.strength, args.protect_skin)
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
