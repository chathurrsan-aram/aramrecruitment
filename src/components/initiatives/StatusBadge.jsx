import { statusStyles } from '@/data/initiatives';

export default function StatusBadge({ status }) {
  const style = statusStyles[status] || statusStyles['Planning'];

  return (
    <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: style.dot }}
      />
      {style.label}
    </span>
  );
}
