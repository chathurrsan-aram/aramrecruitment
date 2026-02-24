'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, GeoJSON, Polyline, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DISTRICT_META, enrichGeoData } from '@/components/ui/map-utils';

/* ─── Colours ────────────────────────────────────── */
const ACTIVE_COLOR = '#6D4A9E';
const VISITED_COLOR = '#C4B1DD';
const UNVISITED_COLOR = '#D1D5DB';

/* ─── Pulsing marker icon ────────────────────────── */
function makePulseIcon(label) {
  return L.divIcon({
    className: '',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    html: `
      <div style="position:relative;width:24px;height:24px;">
        <div style="position:absolute;inset:0;border-radius:50%;background:${ACTIVE_COLOR};opacity:0.3;animation:trip-pulse 2s ease-in-out infinite;"></div>
        <div style="position:absolute;top:6px;left:6px;width:12px;height:12px;border-radius:50%;background:${ACTIVE_COLOR};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></div>
        ${label ? `<div style="position:absolute;top:-18px;left:50%;transform:translateX(-50%);background:${ACTIVE_COLOR};color:#fff;font-size:10px;font-weight:700;padding:1px 6px;border-radius:6px;white-space:nowrap;letter-spacing:0.5px;">${label}</div>` : ''}
      </div>
    `,
  });
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

  useEffect(() => {
    map.scrollWheelZoom.disable();
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
  }, [map]);

  useEffect(() => {
    map.invalidateSize();
    const t = setTimeout(() => map.invalidateSize(), 300);
    return () => clearTimeout(t);
  }, [map]);

  /* Fly to active districts when they change */
  useEffect(() => {
    if (!geoData || activeDistricts.size === 0) return;

    const features = geoData.features.filter(f => activeDistricts.has(f.properties.code));
    if (features.length === 0) return;

    const layer = L.geoJSON({ type: 'FeatureCollection', features });
    const bounds = layer.getBounds();

    // Add some padding and constrain zoom
    map.flyToBounds(bounds, {
      padding: [60, 60],
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

  /* Location markers for the active day */
  const activeLocations = useMemo(() => {
    const day = tripDays.find(d => d.day === activeDay);
    if (!day) return [];
    return day.locations;
  }, [activeDay, tripDays]);

  /* Route polyline: connect all visited + active location centers in order */
  const routePositions = useMemo(() => {
    const positions = [];
    for (const day of tripDays) {
      if (day.day > activeDay) break;
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

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Pulse animation keyframes */}
      <style>{`
        @keyframes trip-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>

      <MapContainer
        center={[7.8731, 80.7718]}
        zoom={7}
        className="w-full h-full"
        zoomControl={false}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
        touchZoom={false}
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

        {/* Route polyline */}
        {routePositions.length > 1 && (
          <Polyline
            positions={routePositions}
            pathOptions={{
              color: ACTIVE_COLOR,
              weight: 2.5,
              opacity: 0.5,
              dashArray: '8 6',
            }}
          />
        )}

        {/* Location markers */}
        {activeLocations.map((loc, i) => (
          <Marker
            key={`marker-${activeDay}-${i}`}
            position={[loc.lat, loc.lng]}
            icon={makePulseIcon(loc.group)}
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
