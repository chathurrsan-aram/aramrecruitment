'use client';
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import { useReducedMotion } from 'framer-motion';
import { LoaderCircle, Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { drawIdentFrame, IDENT_END, IDENT_START, loadIdentModel } from './ident/identRenderer';

const LOGO_SRC = '/members/aram-logo.png';
const TIMING_SRC = '/members/ident/aram-ident-timing.png';
const AUDIO_SRC = '/members/ident/aram-ident.mp3';
const soundKey = 'aram-ident-sound-v1';
let memorySound = null;
const subscribeSound = callback => {
  const changed = event => { if (event.key === soundKey || event.key === null) { memorySound = null; callback(); } };
  window.addEventListener('storage', changed); window.addEventListener('aram-ident-sound', callback);
  return () => { window.removeEventListener('storage', changed); window.removeEventListener('aram-ident-sound', callback); };
};
const soundSnapshot = () => { if (memorySound !== null) return memorySound; try { return localStorage.getItem(soundKey) !== 'off'; } catch { return true; } };

let modelPromise = null;
function loadModel() {
  if (!modelPromise) modelPromise = loadIdentModel({ logoSrc: LOGO_SRC, timingSrc: TIMING_SRC }).catch(error => { modelPromise = null; throw error; });
  return modelPromise;
}

const labels = { idle: 'Play', loading: 'Loading', playing: 'Pause', paused: 'Resume', ended: 'Replay' };
const icons = { idle: Play, loading: LoaderCircle, playing: Pause, paused: Play, ended: RotateCcw };

/**
 * The resting logo is the original image. Pressing Play clears it and builds it
 * again from its own pixels: the Tamil word is written, the figure rises, the
 * light arrives and the wordmark settles, with sound on each beat. Nothing plays
 * or sounds until the visitor asks.
 */
export default function AramIdent() {
  const reduced = useReducedMotion();
  const descriptionId = useId();
  const [phase, setPhase] = useState('idle');
  const [failed, setFailed] = useState(false);
  const sound = useSyncExternalStore(subscribeSound, soundSnapshot, () => true);
  const stageRef = useRef(null), canvasRef = useRef(null), audioRef = useRef(null), modelRef = useRef(null);
  const rafRef = useRef(0), clockRef = useRef(0), timeRef = useRef(IDENT_START), phaseRef = useRef('idle'), reducedRef = useRef(false), requestRef = useRef(0);

  const go = useCallback(next => { phaseRef.current = next; setPhase(next); }, []);
  useEffect(() => { reducedRef.current = !!reduced; }, [reduced]);

  const audio = useCallback(() => {
    if (!audioRef.current && typeof Audio !== 'undefined') {
      const element = new Audio(AUDIO_SRC);
      element.preload = 'auto';
      audioRef.current = element;
    }
    return audioRef.current;
  }, []);

  const draw = useCallback(t => {
    const canvas = canvasRef.current, model = modelRef.current;
    if (!canvas || !model) return;
    const size = Math.max(1, Math.round(canvas.getBoundingClientRect().width * Math.min(window.devicePixelRatio || 1, 2)));
    if (canvas.width !== size) { canvas.width = size; canvas.height = size; }
    drawIdentFrame(canvas.getContext('2d'), model, t, { size, reducedMotion: reducedRef.current });
  }, []);

  const stopLoop = useCallback(() => { cancelAnimationFrame(rafRef.current); rafRef.current = 0; }, []);
  const cancelPlayback = useCallback(() => { requestRef.current++; phaseRef.current = 'idle'; stopLoop(); audioRef.current?.pause(); }, [stopLoop]);

  const startLoop = useCallback(() => {
    stopLoop();
    clockRef.current = performance.now() - (timeRef.current - IDENT_START) * 1000;
    const frame = now => {
      let t = IDENT_START + (now - clockRef.current) / 1000;
      const element = audioRef.current;
      // Follow the audio clock when it is running, so beats and sounds stay together.
      if (element && !element.paused && element.readyState >= 2) {
        const heard = IDENT_START + element.currentTime;
        if (Math.abs(heard - t) > 0.08 && heard < IDENT_END) { clockRef.current = now - (heard - IDENT_START) * 1000; t = heard; }
      }
      timeRef.current = Math.min(t, IDENT_END);
      draw(timeRef.current);
      if (t >= IDENT_END) { rafRef.current = 0; go('ended'); return; }
      rafRef.current = requestAnimationFrame(frame);
    };
    rafRef.current = requestAnimationFrame(frame);
  }, [draw, go, stopLoop]);

  // Start the picture when the sound is ready (or shortly after, silently).
  const begin = useCallback(element => {
    let started = false;
    const request = requestRef.current;
    const start = () => { if (started || request !== requestRef.current || phaseRef.current !== 'playing' || document.hidden) return; started = true; startLoop(); };
    try { element.currentTime = Math.max(0, timeRef.current - IDENT_START); } catch { /* not seekable yet */ }
    const attempt = element.play();
    if (attempt) attempt.then(start, start); else start();
    setTimeout(start, 320);
  }, [startLoop]);

  const prefetch = useCallback(() => { audio(); loadModel().then(model => { modelRef.current = model; }, () => {}); }, [audio]);

  const pause = useCallback(() => { stopLoop(); audioRef.current?.pause(); go('paused'); }, [go, stopLoop]);

  const onPlay = () => {
    if (document.hidden) return;
    if (phaseRef.current === 'playing') { pause(); return; }
    if (phaseRef.current === 'loading') return;
    const request = ++requestRef.current;
    setFailed(false);
    const element = audio();
    if (phaseRef.current !== 'paused') timeRef.current = IDENT_START;
    if (element) element.muted = !sound;
    if (modelRef.current) { go('playing'); draw(timeRef.current); if (element) begin(element); else startLoop(); return; }
    // First visit: the audio is unlocked inside this click, then waits for the artwork.
    go('loading');
    if (element) { element.play()?.catch(() => {}); element.pause(); }
    loadModel().then(model => {
      modelRef.current = model;
      if (request !== requestRef.current || phaseRef.current !== 'loading' || document.hidden) return;
      go('playing'); draw(timeRef.current);
      if (element) begin(element); else startLoop();
    }, () => { if (request === requestRef.current && phaseRef.current === 'loading') { go('idle'); setFailed(true); } });
  };

  const toggleSound = () => {
    const next = !sound;
    memorySound = next;
    try { localStorage.setItem(soundKey, next ? 'on' : 'off'); } catch { /* preference lasts for this page only */ }
    window.dispatchEvent(new Event('aram-ident-sound'));
    if (audioRef.current) audioRef.current.muted = !next;
  };

  useEffect(() => { if (audioRef.current) audioRef.current.muted = !sound; }, [sound]);

  // Pause when the page is hidden; stop everything when the component leaves.
  useEffect(() => {
    const hidden = () => {
      if (!document.hidden) return;
      if (phaseRef.current === 'playing') pause();
      if (phaseRef.current === 'loading') { cancelPlayback(); go('idle'); }
    };
    document.addEventListener('visibilitychange', hidden);
    return () => { document.removeEventListener('visibilitychange', hidden); cancelPlayback(); };
  }, [cancelPlayback, go, pause]);

  // Keep a paused frame sharp if the layout changes size.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(() => { if (phaseRef.current === 'paused') draw(timeRef.current); });
    observer.observe(stage);
    return () => observer.disconnect();
  }, [draw]);

  const live = phase === 'playing' || phase === 'paused';
  const Icon = icons[phase];
  return <div className={`aram-ident ${live ? 'is-live' : ''}`}>
    <div className="ident-stage" ref={stageRef}>
      <div className="ident-square">
        <img src={LOGO_SRC} alt="The Aram Initiative" width="1000" height="1000"/>
        <canvas ref={canvasRef} aria-hidden="true"/>
      </div>
    </div>
    <div className="ident-controls">
      <button type="button" className="ident-button" onClick={onPlay} onPointerEnter={prefetch} onFocus={prefetch} onTouchStart={prefetch} aria-describedby={descriptionId} aria-busy={phase === 'loading' || undefined}>
        <Icon size={16} aria-hidden="true" className={phase === 'loading' ? 'ident-spin' : undefined}/>{labels[phase]}
      </button>
      <button type="button" className="ident-button ident-sound" onClick={toggleSound} aria-pressed={sound}>
        {sound ? <Volume2 size={16} aria-hidden="true"/> : <VolumeX size={16} aria-hidden="true"/>}Sound
      </button>
    </div>
    <p id={descriptionId} className="sr-only">Plays a five second animation of the Aram logo with music: the Tamil word Aram is written, the figure rises, the light arrives and the English wordmark settles. Sound can be turned off.</p>
    {failed && <p className="ident-note" role="status">The animation could not load. The logo is unchanged.</p>}
  </div>;
}
