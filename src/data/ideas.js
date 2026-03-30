import ideasData from './ideas.json';

export const SECTOR_COLOURS = {
  Healthcare: '#ef4444',
  Education: '#22c55e',
  Technology: '#7c3aed',
  'Economic Development': '#d97706',
  SEN: '#ec4899',
  Wellbeing: '#8b5cf6',
  'Diaspora Reconnection': '#0d9488',
  'Community Development': '#0d9488',
  Media: '#64748b',
};

export const ALL_SECTORS = Object.keys(SECTOR_COLOURS);

export const STATUS_STYLES = {
  'Exploring':        { bg: 'bg-gray-500/20', text: 'text-gray-400' },
  'Semi-clear':       { bg: 'bg-gray-500/20', text: 'text-gray-400' },
  'Research done':    { bg: 'bg-amber-500/20', text: 'text-amber-400' },
  'Template done':    { bg: 'bg-green-500/20', text: 'text-green-400' },
  'Clear idea':       { bg: 'bg-green-500/20', text: 'text-green-400' },
  'Short-term idea':  { bg: 'bg-blue-500/20', text: 'text-blue-400' },
  'Long-term idea':   { bg: 'bg-purple-500/20', text: 'text-purple-400' },
  'Unsure':           { bg: 'bg-gray-500/20', text: 'text-gray-400' },
};

export const READINESS_LABELS = [
  { key: 'research', label: 'Research' },
  { key: 'template', label: 'Template' },
  { key: 'preTripPlan', label: 'Pre-trip plan' },
  { key: 'partnerIdentified', label: "Partner ID'd" },
  { key: 'budget', label: 'Budget' },
  { key: 'confirmed', label: 'Confirmed' },
];

// Returns the index of the current "in progress" step (last completed stage)
export function getCurrentStep(readiness) {
  let lastTrue = -1;
  for (let i = 0; i < READINESS_LABELS.length; i++) {
    if (readiness[READINESS_LABELS[i].key]) lastTrue = i;
  }
  return lastTrue;
}

export const ideas = ideasData;
