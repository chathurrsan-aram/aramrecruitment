'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PortalIndex() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/ventures/portal/portfolio');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0D0D14] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#2A2A40] border-t-[#6D4A9E] rounded-full animate-spin" />
    </div>
  );
}
