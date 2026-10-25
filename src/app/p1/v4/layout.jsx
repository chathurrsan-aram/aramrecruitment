import { Suspense } from 'react';
import App from '@/components/members/v4/App';
import { displayFace } from '@/components/members/redesign/fonts';
import '../versions.css';

export const metadata = { title: 'V4 · Member Dashboard', robots: { index: false, follow: false } };

// One instance for every V4 section, so moving between them keeps the loaded workspace.
export default function Version4Layout({ children }) {
  return <div className={displayFace.variable}><Suspense fallback={null}><App/></Suspense>{children}<a className="version-return" href="/p1">← Versions</a></div>;
}
