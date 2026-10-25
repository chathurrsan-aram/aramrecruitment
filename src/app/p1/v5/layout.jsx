import { Suspense } from 'react';
import App from '@/components/members/v5/App';
import { displayFace } from '@/components/members/redesign/fonts';
import '../versions.css';

export const metadata = { title: 'V5 · Member Home', robots: { index: false, follow: false } };

// One instance for every V5 section, so moving between them keeps the loaded workspace.
export default function Version5Layout({ children }) {
  return <div className={displayFace.variable}><Suspense fallback={null}><App/></Suspense>{children}<a className="version-return" href="/p1">← Versions</a></div>;
}
