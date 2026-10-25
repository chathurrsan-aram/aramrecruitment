'use client';
import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { applyAction, DomainError, parseMutation } from '@/lib/members/domain';
import { ledgerCsv } from '../ledger';
import { deriveModel } from './model';

// Signed-out visitors run the same rules as the API against a copy kept in this browser.
const demoKey = 'aram-redesign-demo-workspace-v1';
// Shared with V2 so an initiative saved in one version shows as saved in the others.
const savedKey = 'aram-demo-saved-initiatives-v1';
const subscribeSaved = callback => { window.addEventListener('storage', callback); window.addEventListener('aram-saved', callback); return () => { window.removeEventListener('storage', callback); window.removeEventListener('aram-saved', callback); }; };
const savedSnapshot = () => { try { return localStorage.getItem(savedKey) || '[]'; } catch { return '[]'; } };

function readDemo() {
  try {
    const state = JSON.parse(localStorage.getItem(demoKey) || 'null');
    const valid = state?.demo === true && Number.isSafeInteger(state.version) && state.member && state.vote &&
      Array.isArray(state.projects) && Array.isArray(state.transactions) && Array.isArray(state.updates);
    return valid ? state : null;
  } catch { return null; }
}

export function useWorkspace() {
  const [state, setState] = useState(null), [loading, setLoading] = useState(true), [busy, setBusy] = useState(false);
  const [error, setError] = useState(''), [toast, setToast] = useState(''), [now, setNow] = useState(null);
  const savedString = useSyncExternalStore(subscribeSaved, savedSnapshot, () => '[]');
  const savedIds = useMemo(() => {
    try { const value = JSON.parse(savedString); return Array.isArray(value) ? value.filter(id => typeof id === 'string') : []; } catch { return []; }
  }, [savedString]);

  const load = useCallback(async () => {
    try {
      const response = await fetch('/api/members/dashboard', { cache: 'no-store' });
      if (!response.ok) throw new Error('The dashboard could not load. Please try again.');
      const data = await response.json();
      const demo = data.access?.mode === 'private' ? null : readDemo();
      setState(demo ? { ...demo, access: data.access } : data); setError('');
    } catch (e) { setError(e instanceof Error ? e.message : 'The dashboard could not load.'); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { const timer = setTimeout(load, 0); return () => clearTimeout(timer); }, [load]);
  useEffect(() => { const tick = () => setNow(Date.now()); const first = setTimeout(tick, 0), timer = setInterval(tick, 30000); return () => { clearTimeout(first); clearInterval(timer); }; }, []);
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(''), 5000); return () => clearTimeout(timer); }, [toast]);

  const refresh = () => { setLoading(true); setError(''); load(); };
  const isPrivate = state?.access?.mode === 'private';

  const mutate = async (action, success) => {
    if (!state || busy) return false;
    setError('');
    if (!isPrivate) {
      try {
        const { access, ...current } = state;
        const next = applyAction(current, parseMutation({ version: current.version, action }));
        try { localStorage.setItem(demoKey, JSON.stringify(next)); } catch { /* still applies for this visit */ }
        setState({ ...next, access }); setToast(`${success} in this browser.`); return true;
      } catch (e) { setError(e instanceof DomainError ? e.message : 'That change could not be made.'); return false; }
    }
    setBusy(true);
    try {
      const response = await fetch('/api/members/dashboard', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ version: state.version, action }) });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) load();
        if (response.status === 409 && data.state) setState(data.state);
        throw new Error(data.error || 'Your change could not be saved. Please try again.');
      }
      setState(data); setToast(`${success} to your account.`); return true;
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not save changes.'); return false; }
    finally { setBusy(false); }
  };

  const resetDemo = () => { try { localStorage.removeItem(demoKey); } catch { /* nothing stored */ } setToast('Demo reset to the starting figures.'); refresh(); };

  const toggleSaved = id => {
    try {
      const next = savedIds.includes(id) ? savedIds.filter(v => v !== id) : [...savedIds, id];
      localStorage.setItem(savedKey, JSON.stringify(next)); window.dispatchEvent(new Event('aram-saved'));
      setToast(next.includes(id) ? 'Initiative saved in this browser.' : 'Removed from your saved initiatives.');
    } catch { setError('This browser could not save the initiative. You can bookmark its page instead.'); }
  };

  const copy = async (text, done) => {
    try { await navigator.clipboard.writeText(text); setToast(done); return true; }
    catch { setError('Copying is blocked in this browser. Select the text and copy it instead.'); return false; }
  };

  const exportLedger = () => {
    if (!state) return;
    const url = URL.createObjectURL(new Blob([ledgerCsv(state)], { type: 'text/csv;charset=utf-8;' }));
    const a = document.createElement('a'); a.href = url; a.download = 'aram-ledger.csv'; a.click(); URL.revokeObjectURL(url);
    setToast('Ledger downloaded as a spreadsheet file.');
  };

  const model = useMemo(() => state ? deriveModel(state, now) : null, [state, now]);
  return { state, model, loading, busy, error, toast, now, isPrivate, savedIds, refresh, mutate, resetDemo, toggleSaved, copy, exportLedger, dismissError: () => setError('') };
}
