'use client';

import { useEffect } from 'react';

/**
 * Drives a muted, autoplaying background video without relying on the
 * native `loop` attribute. Looping is handled manually so the clip can
 * restart from `startAt` seconds, and playback is kicked off explicitly
 * so a blocked or late autoplay attempt does not leave the poster frozen.
 */
export default function useHeroVideo(videoRef, { startAt = 0 } = {}) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    video.muted = true;
    video.defaultMuted = true;

    const play = () => {
      const p = video.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };

    const seekToStart = () => {
      if (startAt > 0 && video.currentTime < startAt) video.currentTime = startAt;
    };

    const handleLoadedMetadata = () => {
      seekToStart();
      play();
    };

    const handleEnded = () => {
      video.currentTime = startAt;
      play();
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    if (video.readyState >= 1) handleLoadedMetadata();
    else play();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [videoRef, startAt]);
}
