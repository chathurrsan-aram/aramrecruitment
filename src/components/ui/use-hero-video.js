'use client';

import { useEffect } from 'react';

/**
 * Drives a muted, autoplaying background video.
 *
 * - Mutes via both property and attribute so every browser's autoplay policy
 *   sees a muted video, including elements created after hydration.
 * - Starts playback explicitly and retries on `canplay`; if the browser still
 *   refuses to autoplay, the first tap, click or key press starts it.
 * - Loops manually from `startAt` seconds by restarting on `ended`, instead of
 *   relying on the native `loop` attribute.
 */
export default function useHeroVideo(videoRef, { startAt = 0 } = {}) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('autoplay', '');

    const play = () => {
      const p = video.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };

    const seekToStart = () => {
      if (startAt > 0 && video.currentTime < startAt) {
        try { video.currentTime = startAt; } catch { /* metadata not ready yet */ }
      }
    };

    const handleLoadedMetadata = () => {
      // If the clip already ran to the end before this hook attached (late
      // hydration), play() would restart it from 0; put it at startAt first.
      if (video.ended) video.currentTime = startAt;
      seekToStart();
      play();
    };
    const handleCanPlay = () => { if (video.paused) play(); };
    const handleEnded = () => { video.currentTime = startAt; play(); };
    const handleInteraction = () => { if (video.paused) play(); };

    const interactionEvents = ['pointerdown', 'touchstart', 'keydown'];

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('ended', handleEnded);
    interactionEvents.forEach((e) => window.addEventListener(e, handleInteraction, { passive: true }));

    if (video.readyState >= 1) handleLoadedMetadata();
    else play();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
      interactionEvents.forEach((e) => window.removeEventListener(e, handleInteraction));
    };
  }, [videoRef, startAt]);
}
