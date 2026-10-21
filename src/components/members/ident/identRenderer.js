/**
 * Aram ident renderer.
 *
 * Framework free, so the dashboard, the review page and the offline frame
 * export all run the same code. Every visible pixel is an original pixel from
 * public/members/aram-logo.png: the timing map only decides the order in which
 * pixels appear, and sprites only move whole original components into place.
 * The final frame is the untouched logo.
 *
 * A cue sheet (./cues/*.js) sets the timing and motion, so the same model can
 * play the signature ident or a faster variant.
 */
import { identLayers } from './identLayers.js';
import { cues as signature } from './cues/signature.js';

export const IDENT_START = signature.start;
export const IDENT_END = signature.end;
export const IDENT_CUES = signature;
const SIZE = 1000;
const DRAW_ORDER = ['sun', 'tamil-a', 'tamil-ra', 'tamil-ma', 'pulli', 'figure', 'ray-pink', 'ray-blue', 'ray-green',
  'wordmark', 'dot-orange', 'dot-blue', 'dot-pink', 'dot-green', 'exclaim-dot'];

const clamp01 = v => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = v => { const x = clamp01(v); return x * x * (3 - 2 * x); };
const easeOut = (v, p = 3) => 1 - Math.pow(1 - clamp01(v), p);
// Critically damped approach: quick departure, long quiet arrival, no overshoot.
const SETTLE_K = 7;
const SETTLE_N = 1 - (1 + SETTLE_K) * Math.exp(-SETTLE_K);
const settle = v => { const x = clamp01(v); return (1 - (1 + SETTLE_K * x) * Math.exp(-SETTLE_K * x)) / SETTLE_N; };

function makeCanvas(w, h) {
  if (typeof document !== 'undefined') {
    const c = document.createElement('canvas'); c.width = w; c.height = h; return c;
  }
  return new OffscreenCanvas(w, h);
}

async function decode(src) {
  const response = await fetch(src);
  if (!response.ok) throw new Error(`Could not load ${src}`);
  const blob = await response.blob();
  if (typeof createImageBitmap === 'function') {
    try { return await createImageBitmap(blob, { premultiplyAlpha: 'none', colorSpaceConversion: 'none' }); }
    catch { /* fall back to an image element below */ }
  }
  const url = URL.createObjectURL(blob);
  try {
    const img = new Image(); img.src = url; await img.decode(); return img;
  } finally { URL.revokeObjectURL(url); }
}

function readPixels(image) {
  const c = makeCanvas(SIZE, SIZE);
  const g = c.getContext('2d', { willReadFrequently: true });
  g.drawImage(image, 0, 0, SIZE, SIZE);
  return g.getImageData(0, 0, SIZE, SIZE).data;
}

/** Load the logo and timing map once and split them into drawable layers. */
export async function loadIdentModel({ logoSrc, timingSrc }) {
  const [logoImage, mapImage] = await Promise.all([decode(logoSrc), decode(timingSrc)]);
  const logo = readPixels(logoImage), map = readPixels(mapImage);
  const counts = new Uint32Array(32);
  for (let i = 0; i < SIZE * SIZE; i++) counts[Math.round(map[i * 4 + 1] / 16)]++;
  const layers = new Map();
  for (const meta of identLayers) {
    const pad = meta.kind === 'sprite' ? 2 : 0;
    const x0 = meta.bbox[0] - pad, y0 = meta.bbox[1] - pad, w = meta.bbox[2] - meta.bbox[0] + pad * 2, h = meta.bbox[3] - meta.bbox[1] + pad * 2;
    const canvas = makeCanvas(w, h), ctx = canvas.getContext('2d'), n = counts[meta.id];
    layers.set(meta.id, { ...meta, x0, y0, w, h, canvas, ctx, image: ctx.createImageData(w, h), n, fill: 0,
      offset: new Uint32Array(n), local: new Float32Array(n), alpha: new Uint8Array(n), px: new Uint16Array(n), py: new Uint16Array(n) });
  }
  for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) {
    const i = y * SIZE + x, layer = layers.get(Math.round(map[i * 4 + 1] / 16));
    if (!layer) continue;
    const lx = x - layer.x0, ly = y - layer.y0, o = (ly * layer.w + lx) * 4, k = layer.fill++, d = layer.image.data;
    d[o] = logo[i * 4]; d[o + 1] = logo[i * 4 + 1]; d[o + 2] = logo[i * 4 + 2];
    layer.offset[k] = o; layer.alpha[k] = logo[i * 4 + 3]; layer.px[k] = lx; layer.py[k] = ly;
    if (layer.kind === 'sprite') d[o + 3] = logo[i * 4 + 3];
    else layer.local[k] = clamp01((map[i * 4] * 256 + map[i * 4 + 2] - 1) / 65534);
  }
  for (const layer of layers.values()) {
    if (layer.kind === 'sprite') { layer.ctx.putImageData(layer.image, 0, 0); continue; }
    // Sort by reveal order so each frame only touches pixels near the moving edge.
    const order = Array.from({ length: layer.n }, (_, k) => k).sort((a, b) => layer.local[a] - layer.local[b]);
    for (const key of ['offset', 'local', 'alpha', 'px', 'py']) {
      const src = layer[key], next = new src.constructor(layer.n);
      for (let k = 0; k < layer.n; k++) next[k] = src[order[k]];
      layer[key] = next;
    }
    layer.done = 0; layer.lastT = -Infinity; layer.full = false;
  }
  const byName = new Map([...layers.values()].map(layer => [layer.name, layer]));
  return { logoImage, layers: DRAW_ORDER.map(name => byName.get(name)), byName, cues: null };
}

/** Reveal window [t0, t1] of a layer under a cue sheet. */
export function layerWindow(layer, cues) {
  return cues.layerTimes?.[layer.name] || [layer.t0, layer.t1];
}

function resetLayer(layer) {
  const d = layer.image.data;
  for (let k = 0; k < layer.n; k++) d[layer.offset[k] + 3] = 0;
  layer.ctx.putImageData(layer.image, 0, 0);
  layer.done = 0; layer.lastT = -Infinity; layer.full = false;
}

function revealLayer(layer, t, cues) {
  if (t < layer.lastT) resetLayer(layer);
  if (layer.full) return;
  const [w0, w1] = layerWindow(layer, cues), span = w1 - w0;
  const edge = cues.edges[layer.name] ?? cues.edges[layer.kind], d = layer.image.data;
  let minX = Infinity, minY = Infinity, maxX = -1, maxY = -1;
  for (let k = layer.done; k < layer.n; k++) {
    const tp = w0 + layer.local[k] * span;
    if (tp >= t) break;
    const f = smooth((t - tp) / edge);
    d[layer.offset[k] + 3] = Math.round(layer.alpha[k] * f);
    if (f >= 1 && k === layer.done) layer.done++;
    const x = layer.px[k], y = layer.py[k];
    if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y;
  }
  layer.lastT = t;
  if (maxX >= 0) layer.ctx.putImageData(layer.image, 0, 0, minX, minY, maxX - minX + 1, maxY - minY + 1);
  if (layer.done === layer.n) layer.full = true;
}

function revealFully(layer) {
  if (layer.full) return;
  const d = layer.image.data;
  for (let k = 0; k < layer.n; k++) d[layer.offset[k] + 3] = layer.alpha[k];
  layer.ctx.putImageData(layer.image, 0, 0);
  layer.done = layer.n; layer.lastT = Infinity; layer.full = true;
}

/** Position, scale and opacity of a layer at time t, in logo pixels. */
export function layerState(name, t, { cues = signature, sun = { x: 631, y: 237.5 }, center = null, reducedMotion = false } = {}) {
  const sprite = cues.sprites[name], motion = cues.layerMotion[name];
  const state = { alpha: 1, dx: 0, dy: 0, scale: 1 };
  if (sprite) {
    const start = sprite.type === 'drop' ? sprite.land - sprite.dur : sprite.at;
    state.alpha = reducedMotion ? smooth((t - start) / 0.3) : smooth((t - start) / (sprite.type === 'rise' ? 0.16 : 0.08));
    if (reducedMotion) return state;
    const p = (t - start) / sprite.dur;
    if (sprite.type === 'press') state.scale = sprite.from + (1 - sprite.from) * settle(p);
    if (sprite.type === 'rise') { const e = settle(p); state.dy = sprite.dy * (1 - e); state.scale = sprite.from + (1 - sprite.from) * e; }
    if (sprite.type === 'drop') state.dy = -sprite.dy * (1 - easeOut(p, 3));
  } else if (motion && !reducedMotion) {
    const e = settle((t - motion.from) / (motion.to - motion.from));
    if (motion.type === 'rise') state.dy = motion.dy * (1 - e);
    if (motion.type === 'emit' && center) {
      const vx = center[0] - sun.x, vy = center[1] - sun.y, len = Math.hypot(vx, vy) || 1;
      state.dx = -motion.dist * (1 - e) * vx / len; state.dy = -motion.dist * (1 - e) * vy / len;
    }
  }
  return state;
}

/**
 * Draw the ident at time t (seconds) into a 2D context. `size` is the side of
 * the square logo box in device pixels and `origin` its top-left corner, so the
 * same frame can sit inside a wider canvas. Before 0 the resting logo clears;
 * from cues.end it is the original logo.
 */
export function drawIdentFrame(ctx, model, t, { size, origin = [0, 0], reducedMotion = false, cues = signature } = {}) {
  const k = size / SIZE;
  if (model.cues !== cues) { model.layers.forEach(layer => { if (layer.kind !== 'sprite') resetLayer(layer); }); model.cues = cues; }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.setTransform(1, 0, 0, 1, origin[0], origin[1]);
  ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
  if (t < 0) {
    const a = 1 - smooth((t - cues.start) / -cues.start);
    if (a > 0) { ctx.globalAlpha = a; ctx.drawImage(model.logoImage, 0, 0, size, size); ctx.globalAlpha = 1; }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    return;
  }
  const sun = model.byName.get('sun');
  const sunCenter = { x: sun.center[0], y: sun.center[1] };
  for (const layer of model.layers) {
    let alpha = 1;
    if (layer.kind !== 'sprite') {
      const [w0] = layerWindow(layer, cues);
      if (reducedMotion) { revealFully(layer); alpha = smooth((t - w0) / 0.3); }
      else revealLayer(layer, t, cues);
      if (t < w0 || alpha <= 0) continue;
    }
    const s = layerState(layer.name, t, { cues, sun: sunCenter, center: layer.center, reducedMotion });
    alpha *= s.alpha;
    if (alpha <= 0.001) continue;
    ctx.globalAlpha = alpha;
    if (s.scale === 1) {
      ctx.drawImage(layer.canvas, (layer.x0 + s.dx) * k, (layer.y0 + s.dy) * k, layer.w * k, layer.h * k);
    } else {
      const [cx, cy] = layer.center;
      ctx.save();
      ctx.translate((cx + s.dx) * k, (cy + s.dy) * k);
      ctx.scale(s.scale * k, s.scale * k);
      ctx.drawImage(layer.canvas, layer.x0 - cx, layer.y0 - cy);
      ctx.restore();
    }
  }
  ctx.globalAlpha = 1;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
