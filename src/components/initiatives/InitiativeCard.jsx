import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import StatusBadge from './StatusBadge';
import SectorTag from './SectorTag';

export default function InitiativeCard({ initiative }) {
  const { slug, title, sector, sectorColor, status, region, flag, summary, image, partner } = initiative;

  return (
    <Link
      href={`/initiatives/${slug}`}
      className="group block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white border border-gray-200"
    >
      {/* Image with overlay */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${sectorColor}88, ${sectorColor}cc)`,
          }}
        />
        {image && (
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-300"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        )}
        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <StatusBadge status={status} />
        </div>
        {/* Sector tag */}
        <div className="absolute top-3 right-3">
          <SectorTag sector={sector} color={sectorColor} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 bg-gray-900 text-white">
        {/* Region */}
        <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-2">
          <span>{flag}</span>
          <span>{region}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-aram-purple-100 transition-colors">
          {title}
        </h3>

        {/* Partner attribution */}
        {partner && (
          <p className="text-xs text-gray-400 mb-2">
            In partnership with <span className="text-gray-300 font-medium">{partner}</span>
          </p>
        )}

        {/* Summary */}
        <p className="text-sm text-gray-300 leading-relaxed mb-4 line-clamp-2">
          {summary}
        </p>

        {/* View link */}
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-aram-purple-light group-hover:text-white transition-colors">
          View initiative
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
