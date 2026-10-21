"""Synthesise an Aram ident soundtrack from its cue sheet.

Original, synthesised sound: no samples, no licensed music. Each visual beat in
src/components/members/ident/identCues.js has one sound, panned to the
horizontal position of the element it accompanies. The light (sun and three
rays) and the four coloured i-dots share pitches by colour, so the dots audibly
answer the light: orange D5, pink F#5, blue A5, green D6.

The pencil variant has no music: its sound is synthesised pencil on paper,
derived from the same layer timings, so each scratch follows the pen.

Usage (repository root):
  python3 scripts/aram-ident/synth_audio.py [signature|sting|lively|pencil]
Writes scripts/aram-ident/out/aram-ident-<variant>.wav (48 kHz master). For the
signature, also encodes public/members/ident/aram-ident.mp3 (used on the web).
Requires numpy and scipy (pencil texture filters).
"""
import json, pathlib, subprocess, shutil, sys, wave
import numpy as np
from scipy.signal import butter, lfilter

ROOT = pathlib.Path(__file__).resolve().parents[2]
IDENT = ROOT / 'src/components/members/ident'
OUT_DIR = ROOT / 'scripts/aram-ident/out'
OUT_MP3 = ROOT / 'public/members/ident/aram-ident.mp3'
SR = 48000
NOTE = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11}

def freq(name):
    pitch = NOTE[name[0]] + (1 if '#' in name else 0)
    octave = int(name[-1])
    return 440.0 * 2 ** ((pitch + 12 * (octave + 1) - 69) / 12)

def env(n, attack, decay):
    t = np.arange(n) / SR
    return (1 - np.exp(-t / attack)) * np.exp(-t / decay)

def partials(f, spec, dur, attack=0.003):
    """spec: list of (ratio, amplitude, decay seconds)."""
    n = int(dur * SR); t = np.arange(n) / SR; y = np.zeros(n)
    for ratio, amp, decay in spec:
        if f * ratio > SR / 2.2: continue
        y += amp * np.sin(2 * np.pi * f * ratio * t + ratio) * env(n, attack, decay)
    return y

def strike(dur=0.012, cutoff=0.35, amp=0.05, seed=0):
    rng = np.random.default_rng(seed); n = int(dur * SR)
    x = rng.standard_normal(n); y = np.zeros(n); a = 0.0
    for i in range(n): a += cutoff * (x[i] - a); y[i] = a
    return amp * y * np.exp(-np.arange(n) / (0.003 * SR))

def voice(kind, note, seed):
    if kind == 'felt':      # warm felt mallet for the written Tamil letters
        f = freq(note)
        y = partials(f, [(1, 1.0, 1.1), (2, 0.18, 0.35), (3.98, 0.05, 0.12)], 2.2, attack=0.006)
        y[:int(0.012 * SR)] += strike(amp=0.03, cutoff=0.2, seed=seed); return 0.30 * y
    if kind == 'tap':       # pen pressing a dot: short wooden tap
        f = freq(note)
        y = partials(f, [(1, 1.0, 0.09), (2.76, 0.35, 0.04), (5.4, 0.12, 0.02)], 0.5, attack=0.0015)
        y[:int(0.012 * SR)] += strike(amp=0.06, cutoff=0.5, seed=seed); return 0.22 * y
    if kind == 'bell':      # the sun: soft bell with a long, quiet tail
        f = freq(note)
        y = partials(f, [(1, 1.0, 1.9), (2.0, 0.32, 1.1), (3.01, 0.12, 0.6), (4.2, 0.07, 0.35), (5.43, 0.04, 0.2)], 3.2, attack=0.004)
        return 0.32 * y
    if kind == 'glass':     # rays: bright, clean mallet
        f = freq(note)
        y = partials(f, [(1, 1.0, 0.95), (3.0, 0.10, 0.25), (4.0, 0.06, 0.15)], 2.0, attack=0.002)
        y[:int(0.012 * SR)] += strike(amp=0.02, cutoff=0.6, seed=seed); return 0.17 * y
    if kind == 'echo':      # i-dots answering the light: same pitches, softer and shorter
        f = freq(note)
        y = partials(f, [(1, 1.0, 0.55), (2.0, 0.12, 0.2), (3.0, 0.05, 0.1)], 1.4, attack=0.003)
        return 0.17 * y
    if kind == 'sub':       # the light arriving: a soft low swell with a slight fall in pitch
        n = int(0.9 * SR); t = np.arange(n) / SR; f = freq(note)
        phase = 2 * np.pi * np.cumsum(f * (1 + 0.45 * np.exp(-t / 0.05))) / SR
        return 0.34 * np.sin(phase) * env(n, 0.008, 0.32)
    if kind == 'marimba':   # bright wooden bar
        f = freq(note)
        y = partials(f, [(1, 1.0, 0.42), (3.93, 0.22, 0.07), (9.9, 0.05, 0.02)], 1.2, attack=0.0015)
        y[:int(0.012 * SR)] += strike(amp=0.03, cutoff=0.5, seed=seed); return 0.30 * y
    if kind == 'marimba-chord':
        return 0.16 * sum(voice('marimba', n, seed + i) / 0.30 for i, n in enumerate(note.split()))
    if kind == 'pluck':     # plucked string answering the light
        f = freq(note)
        y = partials(f, [(1, 1.0, 0.32), (2, 0.35, 0.16), (3, 0.15, 0.08), (4, 0.06, 0.05)], 1.0, attack=0.001)
        return 0.17 * y
    if kind == 'shaker':    # wordmark arriving in one quick sweep
        rng = np.random.default_rng(seed); n = int(0.34 * SR); t = np.arange(n) / SR
        b, a = butter(2, [5500 / (SR / 2), 11000 / (SR / 2)], 'band')
        return 0.10 * lfilter(b, a, rng.standard_normal(n)) * np.sin(np.pi * np.clip(t / 0.34, 0, 1)) ** 1.5
    if kind == 'chord':     # resolution under the exclamation dot
        y = sum(partials(freq(n), [(1, 1.0, 1.7), (2, 0.15, 0.6), (3.98, 0.03, 0.15)], 3.4, attack=0.012) * w
                for n, w in zip(note.split(), [0.9, 0.7, 0.6, 0.45, 0.35]))
        return 0.16 * y
    raise ValueError(kind)

def pad(total, cue, start):
    """Low D and A drone that breathes in, swells as the figure rises and resolves."""
    n = int(total * SR); t = np.arange(n) / SR + start  # t on the visual clock
    rng = np.random.default_rng(7)
    y = np.zeros(n)
    for f, w in [(freq('D3'), 1.0), (freq('A3'), 0.55), (freq('D4'), 0.35)]:
        for det in (-0.0018, 0.0021):
            ph = rng.uniform(0, 2 * np.pi)
            y += w * (np.sin(2 * np.pi * f * (1 + det) * t + ph) + 0.12 * np.sin(4 * np.pi * f * (1 + det) * t + ph))
    level = np.interp(t, [cue['in'], cue['in'] + 0.9, cue['swellFrom'], (cue['swellFrom'] + cue['swellTo']) / 2,
                          cue['swellTo'] + 0.5, cue['release'], cue['out']],
                      [0, 0.55, 0.55, 1.0, 0.6, 0.5, 0.0])
    return 0.018 * cue.get('level', 1.0) * y * level ** 1.5

def reverb(x, seed):
    rng = np.random.default_rng(seed); n = int(1.6 * SR)
    ir = rng.standard_normal(n) * np.exp(-np.arange(n) / (0.32 * SR))
    ir[:int(0.012 * SR)] = 0
    # Darken the tail with a one-pole low-pass.
    a = 0.0; out = np.empty(n)
    for i in range(n): a += 0.18 * (ir[i] - a); out[i] = a
    out /= np.sqrt((out ** 2).sum())
    return np.convolve(x, out)[:len(x)]

def read_js_object(path, marker):
    text = path.read_text()
    return json.loads(text[text.index(marker) + len(marker):].strip().rstrip(';'))

# ------------------------------------------------------------- pencil voice
GLYPH_X = [(104, 132), (147, 245), (256, 284), (295, 380), (392, 419), (429, 535), (531, 615), (627, 654), (662, 763), (768, 870), (875, 905)]

def pencil_bed(n, seed):
    """Graphite on paper: bright filtered noise with a grainy, irregular texture."""
    rng = np.random.default_rng(seed)
    b, a = butter(2, [1800 / (SR / 2), 7500 / (SR / 2)], 'band')
    hiss = lfilter(b, a, rng.standard_normal(n))
    b2, a2 = butter(2, [350 / (SR / 2), 1400 / (SR / 2)], 'band')
    body = lfilter(b2, a2, rng.standard_normal(n))
    bl, al = butter(1, 70 / (SR / 2))
    grain = 0.55 + 0.9 * np.abs(lfilter(bl, al, rng.standard_normal(n))) * 6
    return (hiss + 0.35 * body) * np.clip(grain, 0, 2.2)

def pen_speed(x):
    # Derivative of the pen easing in build_timing.py: 0.55x + 0.45(1 - cos(pi x))/2
    return 0.55 + 0.45 * np.pi / 2 * np.sin(np.pi * np.clip(x, 0, 1))

def add_pan(left, right, y, start, x_from, x_to):
    s = int(round(start * SR)); e = min(len(left), s + len(y)); y = y[:e - s]
    if e <= s: return
    xs = np.linspace(x_from, x_to, len(y))
    pan = np.clip((xs - 500) / 500 * 0.7, -0.7, 0.7)
    left[s:e] += np.cos((pan + 1) * np.pi / 4) * y; right[s:e] += np.sin((pan + 1) * np.pi / 4) * y

def pencil_track(cues, layers, n, start):
    left = np.zeros(n); right = np.zeros(n); seed = 10
    def scratch(t0, t1, x0, x1, loud=1.0, profile=None):
        nonlocal seed
        m = int((t1 - t0) * SR) + int(0.03 * SR); seed += 1
        u = np.arange(m) / max(1, int((t1 - t0) * SR))
        shape = profile(u) if profile else pen_speed(u) ** 0.8
        edge = np.clip(u * (t1 - t0) / 0.012, 0, 1) * np.clip((1 - u) * (t1 - t0) / 0.03 + 1, 0, 1)
        add_pan(left, right, 0.05 * loud * pencil_bed(m, seed) * shape * edge, t0 - start, x0, x1)
    def tap(t, x, loud=1.0):
        nonlocal seed
        m = int(0.09 * SR); seed += 1; tt = np.arange(m) / SR
        rng = np.random.default_rng(seed)
        b, a = butter(2, 2500 / (SR / 2), 'high')
        click = lfilter(b, a, rng.standard_normal(m)) * np.exp(-tt / 0.0025)
        knock = np.sin(2 * np.pi * 190 * tt) * np.exp(-tt / 0.018)
        add_pan(left, right, loud * (0.09 * click + 0.12 * knock), t - start, x, x)
    for layer in layers:
        name = layer['name']; win = cues.get('layerTimes', {}).get(name, [layer.get('t0'), layer.get('t1')])
        x0, x1 = layer['bbox'][0], layer['bbox'][2]
        if layer['kind'] == 'write' or name == 'figure' or name.startswith('ray'):
            for a, b in layer['strokes']:
                t0 = win[0] + a * (win[1] - win[0]); t1 = win[0] + min(b, 1.0) * (win[1] - win[0])
                if name.startswith('ray'):
                    scratch(t0, t1 + 0.02, x0, x1, 0.8, lambda u: np.exp(-np.clip(u, 0, None) * 2.2))
                elif name == 'figure':
                    scratch(t0, t1, (x0 + x1) / 2, (x0 + x1) / 2, 0.7, lambda u: np.sin(np.pi * np.clip(u, 0, 1)) ** 0.7)
                else:
                    scratch(t0, t1, x0 + (x1 - x0) * a, x0 + (x1 - x0) * b)
        elif name == 'wordmark':
            for gx0, gx1 in GLYPH_X:
                ua, ub = [(x - 104) / (905 - 104) for x in (gx0, gx1)]
                fa, fb = [1 - (1 - u) ** 1.6 for u in (ua, ub)]
                t0 = win[0] + fa * (win[1] - win[0]); t1 = win[0] + fb * (win[1] - win[0])
                scratch(t0, max(t1, t0 + 0.035), gx0, gx1, 0.75, lambda u: np.sin(np.pi * np.clip(u, 0, 1)) ** 0.5)
    sun = cues['sprites']['sun']
    scratch(sun['at'], sun['at'] + 0.26, 610, 650, 0.6, lambda u: (0.6 + 0.4 * np.sin(2 * np.pi * 11 * u * 0.26)) * np.sin(np.pi * np.clip(u, 0, 1)))
    for name, sprite in cues['sprites'].items():
        if sprite['type'] == 'press': tap(sprite['at'], next(l for l in layers if l['name'] == name)['center'][0])
        if sprite['type'] == 'drop': tap(sprite['land'], next(l for l in layers if l['name'] == name)['center'][0], 0.85)
    return left, right

def main():
    variant = sys.argv[1] if len(sys.argv) > 1 else 'signature'
    cues = read_js_object(IDENT / f'cues/{variant}.js', 'export const cues =')
    layers = read_js_object(IDENT / 'identLayers.js', 'export const identLayers =')
    start = cues['start']
    end = (cues['pad']['out'] if cues.get('pad') else cues['exportEnd']) + 0.25
    total = end - start
    n = int(total * SR)
    left = np.zeros(n); right = np.zeros(n)
    if cues['sound'] == 'pencil':
        left, right = pencil_track(cues, layers, n, start)
        wet = 0.10
    else:
        for i, cue in enumerate(cues['notes']):
            y = voice(cue['voice'], cue['note'], i)
            pan = max(-0.8, min(0.8, (cue['x'] - 500) / 500 * 0.8))
            gl, gr = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
            s = int(round((cue['t'] - start) * SR)); e = min(n, s + len(y))
            left[s:e] += gl * y[:e - s]; right[s:e] += gr * y[:e - s]
        if cues.get('pad'):
            p = pad(total, cues['pad'], start)
            left += p; right += p
        wet = 0.22
    wl, wr = reverb(left, 1), reverb(right, 2)
    left, right = 0.82 * left + wet * wl, 0.82 * right + wet * wr
    fade = np.ones(n); k = int(0.25 * SR); fade[-k:] = np.linspace(1, 0, k) ** 2
    stereo = np.stack([left * fade, right * fade], 1)
    stereo *= 10 ** (-3 / 20) / np.abs(stereo).max()   # peak at -3 dBFS
    pcm = (stereo * 32767).astype('<i2')
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out = OUT_DIR / f'aram-ident-{variant}.wav'
    with wave.open(str(out), 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
    print('wav', out, f'{total:.2f}s, starts at visual t={start}')
    if variant == 'signature' and shutil.which('ffmpeg'):
        OUT_MP3.parent.mkdir(parents=True, exist_ok=True)
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', str(out), '-ar', '44100', '-c:a', 'libmp3lame',
                        '-b:a', '128k', str(OUT_MP3)], check=True)
        print('mp3', OUT_MP3, OUT_MP3.stat().st_size, 'bytes')

if __name__ == '__main__':
    main()
