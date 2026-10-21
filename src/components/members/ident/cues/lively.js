// Lively: the handwritten signature at roughly double speed, with brighter plucked sounds.
// Times are seconds on the visual clock; layerTimes rescale each layer's own reveal order.
// Read by identRenderer.js and scripts/aram-ident/synth_audio.py.
export const cues = {
 "name": "lively",
 "sound": "music",
 "start": -0.2,
 "end": 2.95,
 "exportEnd": 3.8,
 "edges": {"write": 0.035, "sweep": 0.1, "figure": 0.1, "ray-pink": 0.05, "ray-blue": 0.05, "ray-green": 0.05},
 "layerTimes": {
  "tamil-a": [0.0, 0.44],
  "tamil-ra": [0.46, 0.78],
  "tamil-ma": [0.8, 1.16],
  "figure": [1.26, 1.56],
  "ray-pink": [1.64, 1.76],
  "ray-blue": [1.71, 1.83],
  "ray-green": [1.78, 1.9],
  "wordmark": [1.92, 2.24]
 },
 "layerMotion": {
  "figure": {"type": "rise", "from": 1.24, "to": 1.66, "dy": 12},
  "ray-pink": {"type": "emit", "from": 1.62, "to": 1.86, "dist": 10},
  "ray-blue": {"type": "emit", "from": 1.69, "to": 1.93, "dist": 10},
  "ray-green": {"type": "emit", "from": 1.76, "to": 2.0, "dist": 10},
  "wordmark": {"type": "rise", "from": 1.88, "to": 2.32, "dy": 6}
 },
 "sprites": {
  "pulli": {"type": "press", "at": 1.2, "dur": 0.22, "from": 0.5},
  "sun": {"type": "rise", "at": 1.46, "dur": 0.4, "dy": 26, "from": 0.7},
  "dot-orange": {"type": "drop", "land": 2.3, "dur": 0.16, "dy": 24},
  "dot-blue": {"type": "drop", "land": 2.38, "dur": 0.16, "dy": 24},
  "dot-pink": {"type": "drop", "land": 2.46, "dur": 0.16, "dy": 24},
  "dot-green": {"type": "drop", "land": 2.54, "dur": 0.16, "dy": 24},
  "exclaim-dot": {"type": "press", "at": 2.66, "dur": 0.24, "from": 0.45}
 },
 "notes": [
  {"t": 0.0, "voice": "marimba", "note": "D4", "x": 120, "role": "Tamil a"},
  {"t": 0.3, "voice": "marimba", "note": "A4", "x": 300, "role": "Tamil a, second stroke"},
  {"t": 0.46, "voice": "marimba", "note": "F#4", "x": 386, "role": "Tamil ra"},
  {"t": 0.8, "voice": "marimba", "note": "A4", "x": 673, "role": "Tamil ma"},
  {"t": 1.2, "voice": "tap", "note": "D5", "x": 816, "role": "pulli pressed"},
  {"t": 1.26, "voice": "marimba", "note": "D3", "x": 640, "role": "figure rises"},
  {"t": 1.48, "voice": "marimba", "note": "D5", "x": 631, "role": "sun, orange"},
  {"t": 1.65, "voice": "marimba", "note": "F#5", "x": 552, "role": "pink ray"},
  {"t": 1.72, "voice": "marimba", "note": "A5", "x": 620, "role": "blue ray"},
  {"t": 1.79, "voice": "marimba", "note": "D6", "x": 694, "role": "green ray"},
  {"t": 1.92, "voice": "shaker", "note": "-", "x": 500, "role": "wordmark"},
  {"t": 2.29, "voice": "pluck", "note": "D5", "x": 117, "role": "orange dot"},
  {"t": 2.37, "voice": "pluck", "note": "A5", "x": 270, "role": "blue dot"},
  {"t": 2.45, "voice": "pluck", "note": "F#5", "x": 405, "role": "pink dot"},
  {"t": 2.53, "voice": "pluck", "note": "D6", "x": 640, "role": "green dot"},
  {"t": 2.66, "voice": "marimba-chord", "note": "D4 F#4 A4 D5", "x": 500, "role": "close"},
  {"t": 2.66, "voice": "tap", "note": "A5", "x": 891, "role": "exclamation dot"}
 ],
 "pad": {"in": -0.1, "swellFrom": 1.2, "swellTo": 1.6, "release": 2.66, "out": 3.7, "level": 0.6}
};
