export default function SectorTag({ sector, color }) {
  return (
    <span
      className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full text-white"
      style={{ backgroundColor: color }}
    >
      {sector}
    </span>
  );
}
