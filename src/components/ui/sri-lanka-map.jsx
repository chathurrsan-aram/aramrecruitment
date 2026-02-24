'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { districtProjects, DISTRICT_TO_ARAM_REGION } from '@/data/districtProjects';

/* ─── GADM NAME_1 → existing district code + province ─ */
const DISTRICT_META = {
  Ampara:       { code: 'AP', province: 'Eastern' },
  Anuradhapura: { code: 'AD', province: 'North Central' },
  Badulla:      { code: 'BD', province: 'Uva' },
  Batticaloa:   { code: 'BC', province: 'Eastern' },
  Colombo:      { code: 'CO', province: 'Western' },
  Galle:        { code: 'GL', province: 'Southern' },
  Gampaha:      { code: 'GQ', province: 'Western' },
  Hambantota:   { code: 'HB', province: 'Southern' },
  Jaffna:       { code: 'JA', province: 'Northern' },
  Kalutara:     { code: 'KT', province: 'Western' },
  Kandy:        { code: 'KY', province: 'Central' },
  Kegalle:      { code: 'KE', province: 'Sabaragamuwa' },
  Kilinochchi:  { code: 'KL', province: 'Northern' },
  Kurunegala:   { code: 'KG', province: 'North Western' },
  Mannar:       { code: 'MB', province: 'Northern' },
  Matale:       { code: 'MT', province: 'Central' },
  Matara:       { code: 'MH', province: 'Southern' },
  Moneragala:   { code: 'MJ', province: 'Uva' },
  Mullaitivu:   { code: 'MP', province: 'Northern' },
  NuwaraEliya:  { code: 'NW', province: 'Central' },
  Polonnaruwa:  { code: 'PR', province: 'North Central' },
  Puttalam:     { code: 'PX', province: 'North Western' },
  Ratnapura:    { code: 'RN', province: 'Sabaragamuwa' },
  Trincomalee:  { code: 'TC', province: 'Eastern' },
  Vavuniya:     { code: 'VA', province: 'Northern' },
};

const DISPLAY_NAMES = { NuwaraEliya: 'Nuwara Eliya' };

/* ─── Colour palette ──────────────────────────────── */
const STATUS_COLORS = {
  active: '#6D4A9E',
  planned: '#C4B1DD',
};

const INACTIVE_COLOR = '#D1D5DB';

function getDistrictFill(code) {
  const project = districtProjects[code];
  if (project?.status === 'active') return STATUS_COLORS.active;
  if (project?.status === 'planned') return STATUS_COLORS.planned;
  return INACTIVE_COLOR;
}

/* ─── Styles ──────────────────────────────────────── */
function getStyle(feature, hoveredCode, selectedCode, selectedRegion) {
  const code = feature.properties.code;
  const fill = getDistrictFill(code);
  const isSelected = selectedCode === code;
  const isHovered = hoveredCode === code;
  const hasProject = !!districtProjects[code];
  const districtRegion = DISTRICT_TO_ARAM_REGION[code];
  const isRegionHighlighted = !selectedCode && selectedRegion && districtRegion === selectedRegion;

  if (isSelected) {
    return {
      fillColor: fill,
      fillOpacity: 0.9,
      color: '#FFFFFF',
      weight: 3,
      dashArray: ''
    };
  }

  if (isRegionHighlighted) {
    return {
      fillColor: fill,
      fillOpacity: hasProject ? 0.75 : 0.45,
      color: '#4C3A75',
      weight: 2,
      dashArray: '4 3',
    };
  }

  if (isHovered) {
    return {
      fillColor: fill,
      fillOpacity: hasProject ? 0.75 : 0.4,
      color: '#fff',
      weight: 2,
      dashArray: '',
    };
  }

  return {
    fillColor: fill,
    fillOpacity: hasProject ? 0.6 : 0.25,
    color: 'rgba(255,255,255,0.7)',
    weight: 1,
    dashArray: '',
  };
}

/* ─── Map controller (auto-fit bounds + invalidateSize) ── */
function MapController({ geoData, selectedCode, selectedRegion, hasSidebar }) {
  const map = useMap();

  /* Always disable Leaflet's native scroll zoom; we add our own stepped handler
     in sidebar mode so each scroll tick = exactly one zoom level. */
  useEffect(() => {
    map.scrollWheelZoom.disable();
  }, [map]);

  /* Dynamic minZoom: tighter when sidebar is open (zoom 8 vs 7) */
  useEffect(() => {
    const targetMin = hasSidebar ? 8 : 7;
    map.setMinZoom(targetMin);
    if (hasSidebar && map.getZoom() < 8) map.setZoom(8, { animate: true });
  }, [hasSidebar, map]);

  /* Step scroll-zoom — only active in sidebar (split) mode.
     Keeps natural wheel flow (small cooldown), but passes through to page scroll
     at both zoom boundaries so users can continue scrolling the site. */
  useEffect(() => {
    if (!hasSidebar) return;

    const container = map.getContainer();
    let lastStepTs = 0;

    const handleWheel = (e) => {
      const delta = e.deltaY;
      const zoom = map.getZoom();
      const atMin = zoom <= map.getMinZoom();
      const atMax = zoom >= map.getMaxZoom();
      const scrollingDown = delta > 0;
      const scrollingUp = delta < 0;

      // At bounds, let wheel continue scrolling page naturally
      if ((atMin && scrollingDown) || (atMax && scrollingUp)) return;

      const now = performance.now();
      if (now - lastStepTs < 120) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      lastStepTs = now;

      if (scrollingUp) {
        map.zoomIn(1, { animate: true });
      } else if (scrollingDown) {
        map.zoomOut(1, { animate: true });
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [hasSidebar, map]);

  /* Invalidate size on mount */
  useEffect(() => {
    map.invalidateSize();
    const t = setTimeout(() => map.invalidateSize(), 300);
    return () => clearTimeout(t);
  }, [map]);

  /* Re-invalidate when sidebar opens/closes so Leaflet knows the new container size */
  useEffect(() => {
    // The sidebar animates over ~500ms (spring). Invalidate at intervals to catch the resize.
    const t1 = setTimeout(() => map.invalidateSize(), 100);
    const t2 = setTimeout(() => map.invalidateSize(), 350);
    const t3 = setTimeout(() => map.invalidateSize(), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [hasSidebar, map]);

  /* fitBounds on district selection or sidebar change */
  useEffect(() => {
    if (!geoData) return;

    const doFit = () => {
      const L = require('leaflet');

      if (selectedCode) {
        const feature = geoData.features.find(f => f.properties.code === selectedCode);
        if (feature) {
          const layer = L.geoJSON(feature);
          map.fitBounds(layer.getBounds(), { padding: [60, 60], maxZoom: 10, animate: true, duration: 0.6 });
          return;
        }
      }

      if (selectedRegion) {
        const regionFeatures = geoData.features.filter((f) => DISTRICT_TO_ARAM_REGION[f.properties.code] === selectedRegion);
        if (regionFeatures.length > 0) {
          const regionLayer = L.geoJSON({ type: 'FeatureCollection', features: regionFeatures });
          map.fitBounds(regionLayer.getBounds(), { padding: [50, 50], maxZoom: 9, animate: true, duration: 0.6 });
          return;
        }
      }

      // Fit to full Sri Lanka
      const full = L.geoJSON(geoData);
      map.fitBounds(full.getBounds(), { padding: [10, 10], animate: true });
    };

    // Delay fit to let the container resize animation settle
    const t = setTimeout(doFit, hasSidebar ? 400 : 50);
    return () => clearTimeout(t);
  }, [selectedCode, selectedRegion, geoData, map, hasSidebar]);

  return null;
}

/* ─── Zoom Control — positioned bottom-right, inside map area ── */
function ZoomControl() {
  const map = useMap();
  return (
    <div className="absolute bottom-16 right-4 z-[400] flex flex-col gap-1">
      <button
        onClick={() => map.zoomIn()}
        className="w-8 h-8 bg-white/95 backdrop-blur-sm border border-aram-warm-200 rounded-lg shadow-lg flex items-center justify-center text-aram-warm-500 hover:text-aram-green-900 transition-colors text-lg font-medium"
        aria-label="Zoom in"
      >
        +
      </button>
      <button
        onClick={() => map.zoomOut()}
        className="w-8 h-8 bg-white/95 backdrop-blur-sm border border-aram-warm-200 rounded-lg shadow-lg flex items-center justify-center text-aram-warm-500 hover:text-aram-green-900 transition-colors text-lg font-medium"
        aria-label="Zoom out"
      >
        -
      </button>
    </div>
  );
}

/* ─── Main map component ──────────────────────────── */
export default function SriLankaMap({
  selectedRegion,
  onSelectRegion,
  selectedDistrict,
  onSelectDistrict,
  hasSidebar = false,
}) {
  const [geoData, setGeoData] = useState(null);
  const [hoveredCode, setHoveredCode] = useState(null);
  const geoRef = useRef(null);

  useEffect(() => {
    fetch('/geo/gadm41_LKA_1.json')
      .then(r => r.json())
      .then(geo => {
        for (const f of geo.features) {
          const meta = DISTRICT_META[f.properties.NAME_1];
          if (meta) {
            f.properties.code = meta.code;
            f.properties.name = DISPLAY_NAMES[f.properties.NAME_1] || f.properties.NAME_1;
            f.properties.province = meta.province;
          }
        }
        setGeoData(geo);
      });
  }, []);

  const handleDistrictClick = useCallback((code) => {
    const aramRegion = DISTRICT_TO_ARAM_REGION[code];
    if (aramRegion) {
      onSelectRegion(aramRegion);
    }
    onSelectDistrict(code === selectedDistrict ? null : code);
  }, [selectedDistrict, onSelectRegion, onSelectDistrict]);

  const onEachFeature = useCallback((feature, layer) => {
    const code = feature.properties.code;

    layer.on({
      mouseover: (e) => {
        setHoveredCode(code);
        const hoverStyle = getStyle(feature, code, selectedDistrict, selectedRegion);
        e.target.setStyle(hoverStyle);
        e.target.bringToFront();
      },
      mouseout: (e) => {
        setHoveredCode(null);
        const normalStyle = getStyle(feature, null, selectedDistrict, selectedRegion);
        e.target.setStyle(normalStyle);
      },
      click: () => handleDistrictClick(code),
    });
  }, [handleDistrictClick, selectedDistrict, selectedRegion]);

  const styleFn = useCallback(
    (feature) => getStyle(feature, null, selectedDistrict, selectedRegion),
    [selectedDistrict, selectedRegion]
  );

  const geoKey = `districts-${selectedDistrict || 'none'}-${selectedRegion || 'all'}`;

  if (!geoData) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-aram-warm-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-aram-warm-300 border-t-aram-purple rounded-full animate-spin mx-auto mb-3" />
          <p className="text-aram-warm-400 text-sm">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <MapContainer
        center={[7.8731, 80.7718]}
        zoom={8}
        className="w-full h-full"
        zoomControl={false}
        scrollWheelZoom={false}
        dragging={true}
        doubleClickZoom={true}
        touchZoom={true}
        attributionControl={false}
        style={{ background: '#F8FAFC' }}
        minZoom={7}
        maxZoom={11}
        maxBounds={[
          [5.0, 78.5],
          [10.5, 83.0],
        ]}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          opacity={0.35}
        />

        <GeoJSON
          key={geoKey}
          ref={geoRef}
          data={geoData}
          style={styleFn}
          onEachFeature={onEachFeature}
        />

        <MapController geoData={geoData} selectedCode={selectedDistrict} selectedRegion={selectedRegion} hasSidebar={hasSidebar} />
        <ZoomControl />
      </MapContainer>

      {hoveredCode && <DistrictTooltip code={hoveredCode} geoData={geoData} />}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-sm rounded-xl border border-aram-warm-200 shadow-lg px-4 py-3">
        <p className="text-[10px] font-mono uppercase tracking-wider text-aram-warm-400 mb-2">
          District Status
        </p>
        {[
          { color: STATUS_COLORS.active, label: 'Active', count: Object.values(districtProjects).filter(d => d.status === 'active').length },
          { color: STATUS_COLORS.planned, label: 'Planned', count: Object.values(districtProjects).filter(d => d.status === 'planned').length },
          { color: INACTIVE_COLOR, label: 'No operations', count: 25 - Object.keys(districtProjects).length },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2 py-0.5">
            <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-aram-warm-500 font-medium">
              {item.label}
              <span className="text-aram-warm-300 font-normal ml-1">({item.count})</span>
            </span>
          </div>
        ))}
      </div>

      {/* Selected district indicator */}
      {selectedDistrict && (
        <button
          onClick={() => { onSelectDistrict(null); onSelectRegion(null); }}
          className="absolute top-4 left-4 z-[400] flex items-center gap-1.5 text-sm bg-white/95 backdrop-blur-sm border border-aram-warm-200 rounded-lg px-3 py-2 shadow-lg text-aram-warm-500 hover:text-aram-green-900 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Districts
        </button>
      )}
    </div>
  );
}

/* ─── Tooltip component ───────────────────────────── */
function DistrictTooltip({ code, geoData }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const feature = geoData.features.find(f => f.properties.code === code);
  const project = districtProjects[code];

  useEffect(() => {
    const handler = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  if (!feature) return null;

  return (
    <div
      className="fixed z-[2000] pointer-events-none"
      style={{ left: pos.x + 16, top: pos.y - 12 }}
    >
      <div className="bg-aram-green-950/95 backdrop-blur-sm text-white rounded-lg px-3.5 py-2.5 shadow-xl border border-white/10">
        <p className="font-semibold text-sm">{feature.properties.name}</p>
        <p className="text-white/50 text-xs">{feature.properties.province} Province</p>
        {project?.status === 'active' && (
          <p className="text-aram-purple-light text-xs mt-1 font-medium">
            Active — {project.projects.length} {project.projects.length === 1 ? 'project' : 'projects'}
          </p>
        )}
        {project?.status === 'planned' && (
          <p className="text-purple-300 text-xs mt-1 font-medium">Planned expansion</p>
        )}
        {!project && (
          <p className="text-white/40 text-xs mt-1">No current operations</p>
        )}
      </div>
    </div>
  );
}
