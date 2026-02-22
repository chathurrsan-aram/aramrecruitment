'use client';

const sectorColors = {
  healthcare: { bg: 'rgba(200,92,92,0.1)', text: '#C85C5C', border: 'rgba(200,92,92,0.2)' },
  education: { bg: 'rgba(92,141,200,0.1)', text: '#5C8DC8', border: 'rgba(92,141,200,0.2)' },
  sen: { bg: 'rgba(139,92,200,0.1)', text: '#8B5CC8', border: 'rgba(139,92,200,0.2)' },
  technology: { bg: 'rgba(92,200,181,0.1)', text: '#5CC8B5', border: 'rgba(92,200,181,0.2)' },
  wellbeing: { bg: 'rgba(200,168,92,0.1)', text: '#C8A85C', border: 'rgba(200,168,92,0.2)' },
  'economic-dev': { bg: 'rgba(92,200,106,0.1)', text: '#5CC86A', border: 'rgba(92,200,106,0.2)' },
};

const sectorLabels = {
  healthcare: 'Healthcare',
  education: 'Education',
  sen: 'SEN',
  technology: 'Technology',
  wellbeing: 'Wellbeing',
  'economic-dev': 'Econ Dev',
};

export default function SectorTag({ sector, size = 'sm' }) {
  const colors = sectorColors[sector] || sectorColors.healthcare;
  const label = sectorLabels[sector] || sector;
  const px = size === 'sm' ? 'px-2.5 py-0.5' : 'px-3 py-1';
  const text = size === 'sm' ? 'text-[11px]' : 'text-xs';

  return (
    <span
      className={`inline-flex items-center rounded-full font-mono ${text} font-medium ${px}`}
      style={{ backgroundColor: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
    >
      {label}
    </span>
  );
}
