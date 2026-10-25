'use client';
import { useState, useSyncExternalStore } from 'react';

const subscribe = () => () => {};
// navigator only exists in the browser, so the server render never offers native sharing.
const browserCanShare = () => typeof navigator.share === 'function';

/** Copy-caption and native share for the redesign share cards. */
export function useShare(text) {
  const [copied, setCopied] = useState(false);
  const canShare = useSyncExternalStore(subscribe, browserCanShare, () => false);
  async function copy() {
    try { await navigator.clipboard.writeText(text); setCopied(true); }
    catch { setCopied(false); }
  }
  function share() {
    navigator.share({ title: 'The Aram Initiative', text }).catch(() => {});
  }
  return { copied, copy, canShare, share };
}
