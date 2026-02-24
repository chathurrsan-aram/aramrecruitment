'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, Polyline, Marker, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DISTRICT_META, enrichGeoData } from '@/components/ui/map-utils';

/* ─── Colours ────────────────────────────────────── */
const ACTIVE_COLOR = '#6D4A9E';
const GROUP_B_COLOR = '#2A9D8F';
const VISITED_COLOR = '#C4B1DD';
const UNVISITED_COLOR = '#D1D5DB';

/* ─── Pulsing marker icon ────────────────────────── */
function makePulseIcon(label) {
  const bg = label && label.startsWith('B:') ? GROUP_B_COLOR : ACTIVE_COLOR;
  return L.divIcon({
    className: '',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    html: `
      <div style="position:relative;width:24px;height:24px;">
        <div style="position:absolute;inset:0;border-radius:50%;background:${bg};opacity:0.3;animation:trip-pulse 2s ease-in-out infinite;"></div>
        <div style="position:absolute;top:6px;left:6px;width:12px;height:12px;border-radius:50%;background:${bg};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></div>
        ${label ? `<div style="position:absolute;top:-18px;left:50%;transform:translateX(-50%);background:${bg};color:#fff;font-size:10px;font-weight:700;padding:1px 6px;border-radius:6px;white-space:nowrap;letter-spacing:0.5px;">${label}</div>` : ''}
      </div>
    `,
  });
}

/* ─── Stop label icon (small gray dot + place name) ── */
function makeStopLabel(name) {
  return L.divIcon({
    className: '',
    iconSize: [6, 6],
    iconAnchor: [3, 3],
    html: `
      <div style="position:relative;width:6px;height:6px;">
        <div style="width:6px;height:6px;border-radius:50%;background:${VISITED_COLOR};border:1px solid #fff;"></div>
        <div style="position:absolute;top:8px;left:50%;transform:translateX(-50%);font-size:9px;color:rgba(109,74,158,0.6);white-space:nowrap;font-weight:500;text-shadow:0 0 3px #fff, 0 0 3px #fff;">${name}</div>
      </div>
    `,
  });
}

/* ─── Route segment builder ──────────────────────── */
function buildRouteSegments(tripDays, upToDay = Infinity) {
  const segments = [];
  let currentMain = [];
  let currentA = [];
  let currentB = [];
  let lastState = 'together';
  let lastTogetherPoint = null;

  for (const day of tripDays) {
    if (day.day > upToDay) break;

    const isSplit = day.locations.length > 1;

    if (!isSplit) {
      const point = [day.locations[0].lat, day.locations[0].lng];

      if (lastState === 'split') {
        // Transitioning split → together: close branch segments at this point
        currentA.push(point);
        currentB.push(point);
        if (currentA.length > 1) segments.push({ positions: [...currentA], type: 'groupA' });
        if (currentB.length > 1) segments.push({ positions: [...currentB], type: 'groupB' });
        currentA = [];
        currentB = [];
      }

      currentMain.push(point);
      lastTogetherPoint = point;
      lastState = 'together';
    } else {
      // Split day
      const locA = day.locations.find(l => l.group === 'A');
      const locB = day.locations.find(l => l.group === 'B');
      const pointA = locA ? [locA.lat, locA.lng] : null;
      const pointB = locB ? [locB.lat, locB.lng] : null;

      if (lastState === 'together') {
        // Transitioning together → split: close main, start branches
        if (currentMain.length > 1) segments.push({ positions: [...currentMain], type: 'main' });
        currentMain = [];

        if (lastTogetherPoint) {
          currentA = [lastTogetherPoint];
          currentB = [lastTogetherPoint];
        } else {
          currentA = [];
          currentB = [];
        }
      }

      if (pointA) currentA.push(pointA);
      if (pointB) currentB.push(pointB);
      lastState = 'split';
    }
  }

  // Flush remaining segments
  if (currentMain.length > 1) segments.push({ positions: currentMain, type: 'main' });
  if (currentA.length > 1) segments.push({ positions: currentA, type: 'groupA' });
  if (currentB.length > 1) segments.push({ positions: currentB, type: 'groupB' });

  return segments;
}

/* ─── Style function ─────────────────────────────── */
function getStyle(feature, activeDistricts, visitedDistricts) {
  const code = feature.properties.code;
  const isActive = activeDistricts.has(code);
  const isVisited = visitedDistricts.has(code);

  if (isActive) {
    return {
      fillColor: ACTIVE_COLOR,
      fillOpacity: 0.65,
      color: '#FFFFFF',
      weight: 2.5,
      dashArray: '',
    };
  }
  if (isVisited) {
    return {
      fillColor: VISITED_COLOR,
      fillOpacity: 0.4,
      color: 'rgba(255,255,255,0.8)',
      weight: 1.5,
      dashArray: '',
    };
  }
  return {
    fillColor: UNVISITED_COLOR,
    fillOpacity: 0.18,
    color: 'rgba(255,255,255,0.5)',
    weight: 0.8,
    dashArray: '',
  };
}

/* ─── Map controller ─────────────────────────────── */
function MapController({ geoData, activeDistricts }) {
  const map = useMap();
  const prevActiveRef = useRef(null);

  /* Disable scroll-wheel zoom (would fight page scroll) but allow drag + pinch */
  useEffect(() => {
    map.scrollWheelZoom.disable();
  }, [map]);

  /* Periodic invalidateSize to handle sticky container resizing */
  useEffect(() => {
    map.invalidateSize();
    const t1 = setTimeout(() => map.invalidateSize(), 300);
    const t2 = setTimeout(() => map.invalidateSize(), 800);
    const t3 = setTimeout(() => map.invalidateSize(), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [map]);

  /* Fly to active districts when they change */
  useEffect(() => {
    if (!geoData || activeDistricts.size === 0) return;

    // Serialize to compare — only fly if districts actually changed
    const key = [...activeDistricts].sort().join(',');
    if (key === prevActiveRef.current) return;
    prevActiveRef.current = key;

    const features = geoData.features.filter(f => activeDistricts.has(f.properties.code));
    if (features.length === 0) return;

    const layer = L.geoJSON({ type: 'FeatureCollection', features });
    const bounds = layer.getBounds();

    map.flyToBounds(bounds, {
      padding: [50, 50],
      maxZoom: 9,
      minZoom: 7,
      duration: 1.2,
    });
  }, [geoData, activeDistricts, map]);

  return null;
}

/* ─── Main component ─────────────────────────────── */
export default function TripJourneyMap({ activeDay, tripDays }) {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch('/geo/gadm41_LKA_1.json')
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(geo => {
        enrichGeoData(geo);
        setGeoData(geo);
      })
      .catch(() => {});
  }, []);

  /* Compute which districts are active vs visited */
  const { activeDistricts, visitedDistricts } = useMemo(() => {
    const active = new Set();
    const visited = new Set();

    for (const day of tripDays) {
      if (day.day < activeDay) {
        for (const loc of day.locations) {
          for (const d of loc.districts) visited.add(d);
        }
      } else if (day.day === activeDay) {
        for (const loc of day.locations) {
          for (const d of loc.districts) active.add(d);
        }
      }
    }
    return { activeDistricts: active, visitedDistricts: visited };
  }, [activeDay, tripDays]);

  /* Active day marker labels — show place name instead of just "A"/"B" */
  const activeLocations = useMemo(() => {
    const day = tripDays.find(d => d.day === activeDay);
    if (!day) return [];
    return day.locations.map(loc => ({
      ...loc,
      markerLabel: loc.group ? `${loc.group}: ${loc.label}` : loc.label,
    }));
  }, [activeDay, tripDays]);

  /* Visited stop labels — deduplicated past locations */
  const visitedStops = useMemo(() => {
    const seen = new Set();
    const stops = [];
    for (const day of tripDays) {
      if (day.day >= activeDay) break;
      for (const loc of day.locations) {
        if (!seen.has(loc.label)) {
          seen.add(loc.label);
          stops.push({ lat: loc.lat, lng: loc.lng, label: loc.label });
        }
      }
    }
    return stops;
  }, [activeDay, tripDays]);

  /* Build route segments (branching A/B instead of zigzag) */
  const fullSegments = useMemo(() => buildRouteSegments(tripDays), [tripDays]);
  const completedSegments = useMemo(() => buildRouteSegments(tripDays, activeDay), [activeDay, tripDays]);

  /* Stop circle positions along completed route */
  const completedStopPositions = useMemo(() => {
    const positions = [];
    for (const day of tripDays) {
      if (day.day > activeDay) break;
      if (day.day === activeDay) continue; // don't show stop circle for active day
      for (const loc of day.locations) {
        positions.push([loc.lat, loc.lng]);
      }
    }
    return positions;
  }, [activeDay, tripDays]);

  const styleFn = useCallback(
    (feature) => getStyle(feature, activeDistricts, visitedDistricts),
    [activeDistricts, visitedDistricts]
  );

  const geoKey = `trip-${activeDay}`;

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

  /* Segment style helpers */
  const segmentStyle = (seg, isFull) => {
    if (isFull) {
      // Full route: all faint gray
      return {
        color: '#D1D5DB',
        weight: 2,
        opacity: 0.4,
        dashArray: seg.type === 'main' ? '4 8' : '3 6',
      };
    }
    // Completed route
    if (seg.type === 'main') {
      return {
        color: ACTIVE_COLOR,
        weight: 3,
        opacity: 0.6,
        dashArray: '8 6',
        className: 'trip-route-animated',
      };
    }
    if (seg.type === 'groupA') {
      return {
        color: ACTIVE_COLOR,
        weight: 2.5,
        opacity: 0.5,
        dashArray: '6 4',
        className: 'trip-route-animated',
      };
    }
    // groupB
    return {
      color: GROUP_B_COLOR,
      weight: 2.5,
      opacity: 0.5,
      dashArray: '6 4',
      className: 'trip-route-animated',
    };
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Pulse animation keyframes */}
      <style>{`
        @keyframes trip-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(2.2); opacity: 0; }
        }
        .trip-route-animated {
          animation: trip-dash 30s linear infinite;
        }
        @keyframes trip-dash {
          to { stroke-dashoffset: -1000; }
        }
      `}</style>

      <MapContainer
        center={[7.8731, 80.7718]}
        zoom={7}
        className="w-full h-full"
        zoomControl={false}
        scrollWheelZoom={false}
        dragging={true}
        doubleClickZoom={false}
        touchZoom={true}
        attributionControl={false}
        style={{ background: '#F8FAFC' }}
        minZoom={6}
        maxZoom={10}
        maxBounds={[
          [4.5, 78.0],
          [11.0, 83.5],
        ]}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          opacity={0.35}
        />

        <GeoJSON
          key={geoKey}
          data={geoData}
          style={styleFn}
        />

        {/* Full route segments — faint gray lines */}
        {fullSegments.map((seg, i) => (
          <Polyline
            key={`full-${i}`}
            positions={seg.positions}
            pathOptions={segmentStyle(seg, true)}
          />
        ))}

        {/* Completed route segments — bold purple/teal animated lines */}
        {completedSegments.map((seg, i) => (
          <Polyline
            key={`comp-${i}`}
            positions={seg.positions}
            pathOptions={segmentStyle(seg, false)}
          />
        ))}

        {/* Stop circles along completed route */}
        {completedStopPositions.map((pos, i) => (
          <CircleMarker
            key={`stop-${i}`}
            center={pos}
            radius={4}
            pathOptions={{
              color: '#fff',
              weight: 1,
              fillColor: VISITED_COLOR,
              fillOpacity: 0.7,
            }}
          />
        ))}

        {/* Visited stop labels (place names at past locations) */}
        {visitedStops.map((stop, i) => (
          <Marker
            key={`label-${i}`}
            position={[stop.lat, stop.lng]}
            icon={makeStopLabel(stop.label)}
            interactive={false}
          />
        ))}

        {/* Active day location markers with place names */}
        {activeLocations.map((loc, i) => (
          <Marker
            key={`marker-${activeDay}-${i}`}
            position={[loc.lat, loc.lng]}
            icon={makePulseIcon(loc.markerLabel)}
          />
        ))}

        <MapController geoData={geoData} activeDistricts={activeDistricts} />
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-[400] bg-white/90 backdrop-blur-sm rounded-xl border border-aram-warm-200 shadow-lg px-4 py-3">
        <p className="text-[10px] font-mono uppercase tracking-wider text-aram-warm-400 mb-2">
          Journey
        </p>
        {[
          { color: ACTIVE_COLOR, label: 'Current day' },
          { color: VISITED_COLOR, label: 'Previously visited' },
          { color: UNVISITED_COLOR, label: 'Upcoming' },
          { color: GROUP_B_COLOR, label: 'Group B route' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2 py-0.5">
            <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-aram-warm-500 font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
