'use client';

import { FounderModalProvider } from './founder-modal';

export default function VenturesProviders({ children }) {
  return <FounderModalProvider>{children}</FounderModalProvider>;
}
