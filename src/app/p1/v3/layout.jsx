import { Suspense } from 'react';
import App from '@/components/members/v3/App';
import '../versions.css';

export const metadata = { title: 'V3 · Members Overview', robots: { index: false, follow: false } };

// One instance for every V3 section, so moving between them keeps the loaded workspace.
export default function Version3Layout({ children }) {
  return <><Suspense fallback={null}><App/></Suspense>{children}<a className="version-return" href="/p1">← Versions</a></>;
}
