import { statusStyles } from '@/data/initiatives';

export default function StatusBadge({ status }) {
  const style = statusStyles[status] || statusStyles['Planning'];
  const isPulsating = status === 'In Progress' || status === 'Pilot Phase';

  return (
    <span className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
      {isPulsating ? (
        <span className={`status-dot ${status === 'In Progress' ? 'status-dot-open' : 'status-dot-urgent'}`}>
          <span className="circle"></span>
          <span className="ringring"></span>
        </span>
      ) : (
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: style.dot }}
        />
      )}
      <span className={isPulsating ? 'ml-1' : ''}>{style.label}</span>
    </span>
  );
}
