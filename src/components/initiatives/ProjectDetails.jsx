'use client';

import { useState } from 'react';

export default function ProjectDetails({ details }) {
  const [isOpen, setIsOpen] = useState(false);
  const entries = Object.entries(details);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200 min-h-[48px]"
      >
        <span className="font-semibold text-gray-900 text-sm">Project Details</span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        style={{
          maxHeight: isOpen ? `${entries.length * 60 + 40}px` : '0',
          opacity: isOpen ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.3s ease, opacity 0.3s ease',
        }}
      >
        <div className="px-6 py-4 space-y-3">
          {entries.map(([key, value]) => (
            <div key={key} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide sm:w-40 flex-shrink-0">
                {key}
              </span>
              <span className="text-sm text-gray-700">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
