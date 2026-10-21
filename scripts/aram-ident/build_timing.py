"""Build the Aram ident timing map from the original logo.

Nothing is redrawn. Every pixel in the output animation is an original logo
pixel; this script only decides *when* each pixel appears and which layer it
belongs to.

Output
  public/members/ident/aram-ident-timing.png  RGB, 1000x1000
      R  high byte, B low byte of the local reveal time inside the layer
         (1..65535 spans t0..t1, 0 = not a revealed pixel)
      G  layer id * 16 (0 = transparent)
  src/components/members/ident/identLayers.js  layer table used at runtime

Usage (from the repository root):
  python3 scripts/aram-ident/build_timing.py
Requires numpy, scipy and Pillow.
"""
import json, math, hashlib, pathlib
import numpy as np
from PIL import Image
from scipy import ndimage
from scipy.spatial import cKDTree

ROOT = pathlib.Path(__file__).resolve().parents[2]
LOGO = ROOT / 'public/members/aram-logo.png'
OUT_PNG = ROOT / 'public/members/ident/aram-ident-timing.png'
OUT_JS = ROOT / 'src/components/members/ident/identLayers.js'
EXPECTED_LOGO_SHA = 'aee0e09c4dfa4aeea47db331641aede3b8db80037adcf256cc62de8228c40f92'

# ---------------------------------------------------------------- layers
# Each layer is located by a point inside its component (x, y in logo px).
# kind 'write'  : revealed in pen order along hand-placed stroke paths
# kind 'sweep'  : revealed by a soft edge travelling in one direction
# kind 'sprite' : drawn whole, moved by the runtime timeline
LAYERS = [
    dict(id=1, name='tamil-a', kind='write', seed=(120, 445), strokes=[
        dict(t=(0.06, 0.60), pts=[(128, 443), (160, 446), (195, 452), (220, 468), (233, 490), (236, 515), (236, 536),
                                  (215, 526), (178, 524), (148, 530), (130, 548), (128, 572), (140, 592), (165, 596),
                                  (196, 590), (220, 573), (232, 552), (241, 546), (262, 547), (290, 550), (298, 552)]),
        dict(t=(0.64, 0.86), pts=[(304, 437), (300, 470), (298, 520), (300, 553), (305, 590), (311, 620)]),
    ]),
    dict(id=2, name='tamil-ra', kind='write', seed=(386, 590), strokes=[
        dict(t=(0.88, 1.42), pts=[(386, 593), (385, 560), (380, 530), (379, 505), (386, 482), (402, 470), (430, 469),
                                  (452, 480), (467, 492), (482, 487), (500, 476), (522, 465), (545, 463), (570, 472),
                                  (588, 492), (594, 520), (588, 548), (574, 575), (556, 598), (536, 618), (518, 630), (499, 637)]),
    ]),
    dict(id=3, name='tamil-ma', kind='write', seed=(672, 486), strokes=[
        dict(t=(1.44, 2.06), pts=[(673, 484), (662, 503), (664, 530), (675, 560), (695, 585), (725, 602), (755, 606),
                                  (790, 600), (820, 585), (845, 565), (860, 537), (862, 510), (852, 480), (835, 460),
                                  (808, 449), (782, 455), (762, 475), (754, 500), (751, 522), (744, 536)]),
    ]),
    dict(id=4, name='pulli', kind='sprite', seed=(816, 379)),
    # The figure is not a letter: it rises from the word, bottom to top, so both arms open together.
    dict(id=5, name='figure', kind='sweep', seed=(648, 450), t=(2.30, 2.86), dir=(0, -1), ease='inout'),
    dict(id=6, name='sun', kind='sprite', seed=(631, 237)),
    # Rays extend outward from the sun, along their own axis.
    dict(id=7, name='ray-pink', kind='sweep', seed=(552, 190), t=(3.02, 3.20), dir=(-38, -31), ease='out'),
    dict(id=8, name='ray-blue', kind='sweep', seed=(620, 146), t=(3.14, 3.32), dir=(-2, -42), ease='out'),
    dict(id=9, name='ray-green', kind='sweep', seed=(694, 169), t=(3.26, 3.44), dir=(29, -35), ease='out'),
    dict(id=10, name='wordmark', kind='sweep', t=(3.50, 4.04), dir=(1, 0), ease='out', rest=True),
    dict(id=11, name='dot-orange', kind='sprite', seed=(117, 692)),
    dict(id=12, name='dot-blue', kind='sprite', seed=(270, 664)),
    dict(id=13, name='dot-pink', kind='sprite', seed=(405, 689)),
    dict(id=14, name='dot-green', kind='sprite', seed=(640, 691)),
    dict(id=15, name='exclaim-dot', kind='sprite', seed=(891, 757)),
]
WORDMARK_PARTS = 11  # i, n, i, t, i, a, t, i, v, e bodies and the bar of '!'
SPREAD = 1.55     # lag of the stroke edge relative to the pen, as a multiple of 1 / pen speed

def ease_in_out(x):
    # Gentle pen acceleration: mostly linear, with softened start and finish.
    return 0.55 * x + 0.45 * (1 - math.cos(math.pi * x)) / 2

def inverse(f, u, lo=0.0, hi=1.0):
    for _ in range(40):
        mid = (lo + hi) / 2
        if f(mid) < u: lo = mid
        else: hi = mid
    return (lo + hi) / 2

def catmull(points, step=0.75):
    pts = [np.array(p, float) for p in points]
    if len(pts) == 2:
        a, b = pts; n = max(2, int(np.linalg.norm(b - a) / step))
        return [a + (b - a) * i / n for i in range(n + 1)]
    out = []
    ext = [pts[0] * 2 - pts[1]] + pts + [pts[-1] * 2 - pts[-2]]
    for i in range(1, len(ext) - 2):
        p0, p1, p2, p3 = ext[i - 1], ext[i], ext[i + 1], ext[i + 2]
        n = max(2, int(np.linalg.norm(p2 - p1) / step))
        for k in range(n):
            s = k / n
            out.append(0.5 * ((2 * p1) + (-p0 + p2) * s + (2 * p0 - 5 * p1 + 4 * p2 - p3) * s * s + (-p0 + 3 * p1 - 3 * p2 + p3) * s ** 3))
    out.append(pts[-1])
    return out

def stroke_sources(stroke, mask):
    pts = catmull(stroke['pts'])
    seg = [0.0] + [float(np.linalg.norm(pts[i] - pts[i - 1])) for i in range(1, len(pts))]
    cum = np.cumsum(seg); L = cum[-1]
    t0, t1 = stroke['t']
    speed = L / (t1 - t0)
    table = np.linspace(0, 1, 401)
    inv = np.array([inverse(ease_in_out, u) for u in table])
    sources = []
    for p, s in zip(pts, cum):
        x, y = int(round(p[0])), int(round(p[1]))
        if 0 <= x < 1000 and 0 <= y < 1000 and mask[y, x]:
            sources.append((t0 + (t1 - t0) * float(np.interp(s / L, table, inv)), float(p[1]), float(p[0])))
    return sources, speed

def main():
    raw = LOGO.read_bytes()
    assert hashlib.sha256(raw).hexdigest() == EXPECTED_LOGO_SHA, 'logo is not the protected original'
    rgba = np.array(Image.open(LOGO).convert('RGBA'))
    alpha = rgba[..., 3]
    core = alpha > 8
    labels, n = ndimage.label(core)
    # Give faint anti-aliased edge pixels to their nearest component.
    _, (iy, ix) = ndimage.distance_transform_edt(labels == 0, return_indices=True)
    full = labels[iy, ix] * (alpha > 0)

    layer_of = np.zeros_like(full)
    def comp_at(pt):
        c = labels[pt[1], pt[0]]
        assert c, f'seed {pt} is not inside a component'
        return c
    used = set()
    for layer in [l for l in LAYERS if not l.get('rest')]:
        c = comp_at(layer['seed'])
        assert c not in used, f'component {c} used twice'
        used.add(c); layer_of[full == c] = layer['id']
    # Everything else is the body of the English wordmark, below the Tamil word.
    rest = [c for c in range(1, n + 1) if c not in used]
    assert len(rest) == WORDMARK_PARTS, f'expected {WORDMARK_PARTS} wordmark parts, found {len(rest)}'
    sweep = next(l for l in LAYERS if l.get('rest'))
    for c in rest:
        assert ndimage.center_of_mass(labels == c)[0] > 640, 'unexpected component above the wordmark'
        used.add(c); layer_of[full == c] = sweep['id']
    assert len(used) == n, f'{n - len(used)} logo components are not assigned to a layer'

    T16 = np.zeros((1000, 1000), np.uint16)
    G = (layer_of * 16).astype(np.uint8)
    table = []
    for layer in LAYERS:
        m = layer_of == layer['id']
        ys, xs = np.nonzero(m)
        bbox = [int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1]
        entry = dict(id=layer['id'], name=layer['name'], kind=layer['kind'], bbox=bbox,
                     center=[round(float((bbox[0] + bbox[2]) / 2), 1), round(float((bbox[1] + bbox[3]) / 2), 1)])
        if layer['kind'] == 'write':
            # Each pixel takes the time at which the pen passes its nearest point on
            # the stroke, plus a small lag for its distance from the centre line. Using
            # the nearest pass (rather than ink spreading through the glyph) keeps loops
            # and later strokes in true pen order.
            dists, times = [], []
            for stroke in layer['strokes']:
                sources, speed = stroke_sources(stroke, m)
                pen_t = np.array([src[0] for src in sources])
                d, idx = cKDTree(np.array([(src[1], src[2]) for src in sources])).query(np.c_[ys, xs])
                dists.append(d); times.append(pen_t[idx] + (SPREAD / speed) * d)
            nearest = np.argmin(np.stack(dists), axis=0)
            t = np.full((1000, 1000), np.inf)
            t[ys, xs] = np.stack(times)[nearest, np.arange(len(ys))]
            assert np.isfinite(t[m]).all(), f"{layer['name']}: unreachable pixels"
        elif layer['kind'] == 'sweep':
            t0, t1 = layer['t']
            dx, dy = layer['dir']; n = math.hypot(dx, dy)
            proj = (xs * dx + ys * dy) / n
            u = (proj - proj.min()) / (proj.max() - proj.min())
            eased = 1 - (1 - u) ** 1.6 if layer['ease'] == 'out' else np.array([inverse(ease_in_out, v) for v in u])
            t = np.zeros((1000, 1000)); t[ys, xs] = t0 + (t1 - t0) * eased
        if layer['kind'] != 'sprite':
            vals = t[m]; lo, hi = float(vals.min()), float(vals.max())
            # Pen-down intervals as fractions of the layer window, so other cue sheets
            # can rescale the same reveal and the soundtrack can follow the pen.
            spans = [s['t'] for s in layer['strokes']] if layer['kind'] == 'write' else [layer['t']]
            entry['strokes'] = [[round((a - lo) / (hi - lo), 4), round((b - lo) / (hi - lo), 4)] for a, b in spans]
            T16[m] = (1 + np.round(65534 * (vals - lo) / max(hi - lo, 1e-6))).astype(np.uint16)
            entry.update(t0=round(lo, 4), t1=round(hi, 4))
        table.append(entry)

    OUT_PNG.parent.mkdir(parents=True, exist_ok=True)
    rgb = np.dstack([(T16 >> 8).astype(np.uint8), G, (T16 & 255).astype(np.uint8)])
    Image.fromarray(rgb, 'RGB').save(OUT_PNG, optimize=True)
    OUT_JS.parent.mkdir(parents=True, exist_ok=True)
    OUT_JS.write_text('// Generated by scripts/aram-ident/build_timing.py. Do not edit by hand.\n'
                      '// bbox is [x0, y0, x1, y1] in original logo pixels; t0/t1 are seconds.\n'
                      f'export const identLayers = {json.dumps(table, indent=1)};\n')
    print('layers', len(table), 'png bytes', OUT_PNG.stat().st_size)
    for e in table: print(e)

if __name__ == '__main__':
    main()
