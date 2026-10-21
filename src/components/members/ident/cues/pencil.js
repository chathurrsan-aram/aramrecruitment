// Pencil: the handwritten reveal with synthesised pencil-on-paper sounds and no music,
// for overlaying on other video.
// Times are seconds on the visual clock; layerTimes rescale each layer's own reveal order.
// Read by identRenderer.js and scripts/aram-ident/synth_audio.py.
export const cues = {
 "name": "pencil",
 "sound": "pencil",
 "start": -0.2,
 "end": 4.25,
 "exportEnd": 4.9,
 "edges": {"write": 0.045, "sweep": 0.1, "figure": 0.12, "ray-pink": 0.05, "ray-blue": 0.05, "ray-green": 0.05},
 "layerTimes": {
  "tamil-a": [0.0, 0.66],
  "tamil-ra": [0.7, 1.14],
  "tamil-ma": [1.18, 1.68],
  "figure": [1.86, 2.26],
  "ray-pink": [2.46, 2.6],
  "ray-blue": [2.56, 2.7],
  "ray-green": [2.66, 2.8],
  "wordmark": [2.86, 3.4]
 },
 "layerMotion": {
  "figure": {"type": "rise", "from": 1.84, "to": 2.36, "dy": 10},
  "ray-pink": {"type": "emit", "from": 2.44, "to": 2.68, "dist": 8},
  "ray-blue": {"type": "emit", "from": 2.54, "to": 2.78, "dist": 8},
  "ray-green": {"type": "emit", "from": 2.64, "to": 2.88, "dist": 8},
  "wordmark": {"type": "rise", "from": 2.82, "to": 3.48, "dy": 5}
 },
 "sprites": {
  "pulli": {"type": "press", "at": 1.74, "dur": 0.24, "from": 0.5},
  "sun": {"type": "rise", "at": 2.14, "dur": 0.46, "dy": 24, "from": 0.7},
  "dot-orange": {"type": "drop", "land": 3.46, "dur": 0.16, "dy": 18},
  "dot-blue": {"type": "drop", "land": 3.58, "dur": 0.16, "dy": 18},
  "dot-pink": {"type": "drop", "land": 3.7, "dur": 0.16, "dy": 18},
  "dot-green": {"type": "drop", "land": 3.82, "dur": 0.16, "dy": 18},
  "exclaim-dot": {"type": "press", "at": 3.98, "dur": 0.24, "from": 0.45}
 },
 "notes": [],
 "pad": null
};
