// Sting: about two seconds. Light first, then the figure, then the name in one quick run.
// Times are seconds on the visual clock; layerTimes rescale each layer's own reveal order.
// Read by identRenderer.js and scripts/aram-ident/synth_audio.py.
export const cues = {
 "name": "sting",
 "sound": "music",
 "start": -0.2,
 "end": 1.75,
 "exportEnd": 2.6,
 "edges": {"write": 0.03, "sweep": 0.08, "figure": 0.09, "ray-pink": 0.04, "ray-blue": 0.04, "ray-green": 0.04},
 "layerTimes": {
  "ray-pink": [0.1, 0.22],
  "ray-blue": [0.16, 0.28],
  "ray-green": [0.22, 0.34],
  "figure": [0.14, 0.44],
  "tamil-a": [0.34, 0.62],
  "tamil-ra": [0.44, 0.72],
  "tamil-ma": [0.54, 0.84],
  "wordmark": [0.7, 1.08]
 },
 "layerMotion": {
  "figure": {"type": "rise", "from": 0.12, "to": 0.6, "dy": 14},
  "ray-pink": {"type": "emit", "from": 0.08, "to": 0.36, "dist": 12},
  "ray-blue": {"type": "emit", "from": 0.14, "to": 0.42, "dist": 12},
  "ray-green": {"type": "emit", "from": 0.2, "to": 0.48, "dist": 12},
  "wordmark": {"type": "rise", "from": 0.66, "to": 1.16, "dy": 6}
 },
 "sprites": {
  "sun": {"type": "rise", "at": 0.0, "dur": 0.4, "dy": 22, "from": 0.6},
  "pulli": {"type": "press", "at": 0.86, "dur": 0.22, "from": 0.5},
  "dot-orange": {"type": "drop", "land": 1.12, "dur": 0.16, "dy": 22},
  "dot-blue": {"type": "drop", "land": 1.19, "dur": 0.16, "dy": 22},
  "dot-pink": {"type": "drop", "land": 1.26, "dur": 0.16, "dy": 22},
  "dot-green": {"type": "drop", "land": 1.33, "dur": 0.16, "dy": 22},
  "exclaim-dot": {"type": "press", "at": 1.42, "dur": 0.24, "from": 0.45}
 },
 "notes": [
  {"t": 0.0, "voice": "sub", "note": "D2", "x": 631, "role": "light arrives"},
  {"t": 0.02, "voice": "bell", "note": "D5", "x": 631, "role": "sun, orange"},
  {"t": 0.12, "voice": "glass", "note": "F#5", "x": 552, "role": "pink ray"},
  {"t": 0.18, "voice": "glass", "note": "A5", "x": 620, "role": "blue ray"},
  {"t": 0.24, "voice": "glass", "note": "D6", "x": 694, "role": "green ray"},
  {"t": 0.36, "voice": "felt", "note": "D4", "x": 120, "role": "Tamil a"},
  {"t": 0.46, "voice": "felt", "note": "F#4", "x": 386, "role": "Tamil ra"},
  {"t": 0.56, "voice": "felt", "note": "A4", "x": 673, "role": "Tamil ma"},
  {"t": 0.86, "voice": "tap", "note": "D5", "x": 816, "role": "pulli pressed"},
  {"t": 1.11, "voice": "echo", "note": "D5", "x": 117, "role": "orange dot"},
  {"t": 1.18, "voice": "echo", "note": "A5", "x": 270, "role": "blue dot"},
  {"t": 1.25, "voice": "echo", "note": "F#5", "x": 405, "role": "pink dot"},
  {"t": 1.32, "voice": "echo", "note": "D6", "x": 640, "role": "green dot"},
  {"t": 1.42, "voice": "chord", "note": "D3 A3 D4 F#4 A4", "x": 500, "role": "close"},
  {"t": 1.42, "voice": "tap", "note": "A5", "x": 891, "role": "exclamation dot"}
 ],
 "pad": {"in": -0.1, "swellFrom": 0.0, "swellTo": 0.4, "release": 1.42, "out": 2.4}
};
