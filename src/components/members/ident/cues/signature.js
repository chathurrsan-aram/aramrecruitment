// Signature: the full five second ident. Shared timeline for the Aram ident, read by identRenderer.js and by
// scripts/aram-ident/synth_audio.py (which parses the JSON object after the export).
// Times are seconds on the visual clock. The audio file starts at `start`,
// so audio time = t - start. `x` is the horizontal logo position used for stereo pan.
export const cues = {
 "name": "signature",
 "sound": "music",
 "start": -0.3,
 "exportEnd": 6.5,
 "end": 5.2,
 "edges": {"write": 0.05, "sweep": 0.13, "figure": 0.16, "ray-pink": 0.07, "ray-blue": 0.07, "ray-green": 0.07},
 "layerMotion": {
  "figure": {"type": "rise", "from": 2.28, "to": 2.95, "dy": 12},
  "ray-pink": {"type": "emit", "from": 3.0, "to": 3.3, "dist": 10},
  "ray-blue": {"type": "emit", "from": 3.12, "to": 3.42, "dist": 10},
  "ray-green": {"type": "emit", "from": 3.24, "to": 3.54, "dist": 10},
  "wordmark": {"type": "rise", "from": 3.46, "to": 4.16, "dy": 6}
 },
 "sprites": {
  "pulli": {"type": "press", "at": 2.12, "dur": 0.3, "from": 0.5},
  "sun": {"type": "rise", "at": 2.7, "dur": 0.62, "dy": 30, "from": 0.72},
  "dot-orange": {"type": "drop", "land": 4.14, "dur": 0.24, "dy": 30},
  "dot-blue": {"type": "drop", "land": 4.29, "dur": 0.24, "dy": 30},
  "dot-pink": {"type": "drop", "land": 4.44, "dur": 0.24, "dy": 30},
  "dot-green": {"type": "drop", "land": 4.59, "dur": 0.24, "dy": 30},
  "exclaim-dot": {"type": "press", "at": 4.8, "dur": 0.3, "from": 0.45}
 },
 "notes": [
  {"t": 0.06, "voice": "felt", "note": "D4", "x": 120, "role": "Tamil letter a begins"},
  {"t": 0.88, "voice": "felt", "note": "F#4", "x": 386, "role": "Tamil letter ra begins"},
  {"t": 1.44, "voice": "felt", "note": "A4", "x": 673, "role": "Tamil letter ma begins"},
  {"t": 2.12, "voice": "tap", "note": "D5", "x": 816, "role": "pulli pressed"},
  {"t": 2.76, "voice": "bell", "note": "D5", "x": 631, "role": "sun, orange"},
  {"t": 3.03, "voice": "glass", "note": "F#5", "x": 552, "role": "pink ray"},
  {"t": 3.15, "voice": "glass", "note": "A5", "x": 620, "role": "blue ray"},
  {"t": 3.27, "voice": "glass", "note": "D6", "x": 694, "role": "green ray"},
  {"t": 4.12, "voice": "echo", "note": "D5", "x": 117, "role": "orange dot"},
  {"t": 4.27, "voice": "echo", "note": "A5", "x": 270, "role": "blue dot"},
  {"t": 4.42, "voice": "echo", "note": "F#5", "x": 405, "role": "pink dot"},
  {"t": 4.57, "voice": "echo", "note": "D6", "x": 640, "role": "green dot"},
  {"t": 4.8, "voice": "chord", "note": "D3 A3 D4 F#4 A4", "x": 500, "role": "exclamation dot, close"},
  {"t": 4.8, "voice": "tap", "note": "A5", "x": 891, "role": "exclamation dot pressed"}
 ],
 "pad": {"in": -0.2, "swellFrom": 2.2, "swellTo": 2.95, "release": 4.8, "out": 6.3}
};
