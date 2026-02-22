'use client';

const typeStyles = {
  observation: { bg: 'bg-aram-warm-100', text: 'text-aram-warm-400', label: 'Observation' },
  article: { bg: 'bg-aram-gold-100', text: 'text-aram-gold-500', label: 'Article' },
  research: { bg: 'bg-aram-green-100', text: 'text-aram-green-700', label: 'Research' },
};

export default function TypeBadge({ type }) {
  const style = typeStyles[type] || typeStyles.observation;
  return (
    <span className={`inline-flex items-center rounded-full font-mono text-[11px] font-medium px-2.5 py-0.5 ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
}
