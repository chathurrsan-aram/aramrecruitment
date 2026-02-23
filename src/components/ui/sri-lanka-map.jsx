'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const ARAM_COLORS = {
  'hill-country': '#40916C',
  eastern: '#5C8DC8',
  northern: '#8B6BB5',
  western: '#6D4A9E',
  default: '#C4C4B4',
};

const PROVINCE_TO_ARAM = {
  Central: 'hill-country',
  Uva: 'hill-country',
  Sabaragamuwa: 'hill-country',
  Eastern: 'eastern',
  Northern: 'northern',
  Western: 'western',
};

const SRI_LANKA_CENTER = [7.8731, 80.7718];
const SRI_LANKA_ZOOM = 7;

function getRegionColor(province, selected, hovered) {
  const aramRegion = PROVINCE_TO_ARAM[province];
  const color = aramRegion ? ARAM_COLORS[aramRegion] : ARAM_COLORS.default;
  if (selected) return color;
  if (hovered) return color;
  return aramRegion ? color : ARAM_COLORS.default;
}

function getFeatureStyle(feature, selectedRegion, hoveredProvince) {
  const province = feature.properties.province;
  const aramRegion = PROVINCE_TO_ARAM[province];
  const isAramRegion = !!aramRegion;
  const isSelected = selectedRegion && aramRegion === selectedRegion;
  const isHovered = hoveredProvince === province;

  if (isSelected) {
    return {
      fillColor: ARAM_COLORS[aramRegion],
      fillOpacity: 0.6,
      color: '#fff',
      weight: 3,
    };
  }

  if (isHovered && isAramRegion) {
    return {
      fillColor: ARAM_COLORS[aramRegion],
      fillOpacity: 0.45,
      color: '#fff',
      weight: 2,
    };
  }

  if (isAramRegion) {
    return {
      fillColor: ARAM_COLORS[aramRegion],
      fillOpacity: selectedRegion ? 0.15 : 0.3,
      color: 'rgba(255,255,255,0.5)',
      weight: 1,
    };
  }

  return {
    fillColor: ARAM_COLORS.default,
    fillOpacity: selectedRegion ? 0.05 : 0.12,
    color: 'rgba(255,255,255,0.2)',
    weight: 0.5,
  };
}

function getDistrictStyle(feature, selectedDistrict, hoveredDistrict) {
  const district = feature.properties.district;
  const aramRegion = feature.properties.aramRegion;
  const color = aramRegion ? ARAM_COLORS[aramRegion] : ARAM_COLORS.default;
  const isSelected = selectedDistrict === district;
  const isHovered = hoveredDistrict === district;

  if (isSelected) {
    return {
      fillColor: color,
      fillOpacity: 0.6,
      color: '#fff',
      weight: 3,
    };
  }

  if (isHovered) {
    return {
      fillColor: color,
      fillOpacity: 0.5,
      color: '#fff',
      weight: 2,
    };
  }

  return {
    fillColor: color,
    fillOpacity: 0.3,
    color: 'rgba(255,255,255,0.6)',
    weight: 1,
  };
}

/* Map controller - handles zoom/pan to region */
function MapController({ selectedRegion, selectedDistrict, provincesData, districtsData }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    if (selectedDistrict && districtsData) {
      const feature = districtsData.features.find(
        (f) => f.properties.district === selectedDistrict
      );
      if (feature) {
        const L = require('leaflet');
        const layer = L.geoJSON(feature);
        const bounds = layer.getBounds();
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 10 });
        return;
      }
    }

    if (selectedRegion && provincesData) {
      const regionProvinces = Object.entries(PROVINCE_TO_ARAM)
        .filter(([, r]) => r === selectedRegion)
        .map(([p]) => p);

      const features = provincesData.features.filter((f) =>
        regionProvinces.includes(f.properties.province)
      );

      if (features.length > 0) {
        const L = require('leaflet');
        const group = L.geoJSON({ type: 'FeatureCollection', features });
        const bounds = group.getBounds();
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 10 });
      }
      return;
    }

    map.setView(SRI_LANKA_CENTER, SRI_LANKA_ZOOM);
  }, [selectedRegion, selectedDistrict, map, provincesData, districtsData]);

  return null;
}

export default function SriLankaMap({
  selectedRegion,
  onSelectRegion,
  selectedDistrict,
  onSelectDistrict,
  mode = 'partners', // 'partners' | 'insights'
  partners = [],
  insights = [],
}) {
  const [provincesData, setProvincesData] = useState(null);
  const [districtsData, setDistrictsData] = useState(null);
  const [hoveredProvince, setHoveredProvince] = useState(null);
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const geoJsonRef = useRef(null);
  const districtGeoJsonRef = useRef(null);

  useEffect(() => {
    fetch('/geo/provinces.geojson')
      .then((r) => r.json())
      .then(setProvincesData);
    fetch('/geo/districts.geojson')
      .then((r) => r.json())
      .then(setDistrictsData);
  }, []);

  const onEachProvince = useCallback(
    (feature, layer) => {
      const province = feature.properties.province;
      const aramRegion = PROVINCE_TO_ARAM[province];

      layer.on({
        mouseover: () => {
          if (aramRegion) setHoveredProvince(province);
        },
        mouseout: () => setHoveredProvince(null),
        click: () => {
          if (aramRegion) {
            onSelectRegion(aramRegion === selectedRegion ? null : aramRegion);
            onSelectDistrict(null);
          }
        },
      });

      if (aramRegion) {
        layer.bindTooltip(province, {
          permanent: false,
          direction: 'center',
          className: 'map-tooltip',
        });
      }
    },
    [selectedRegion, onSelectRegion, onSelectDistrict]
  );

  const onEachDistrict = useCallback(
    (feature, layer) => {
      const district = feature.properties.district;

      layer.on({
        mouseover: () => setHoveredDistrict(district),
        mouseout: () => setHoveredDistrict(null),
        click: () => {
          onSelectDistrict(district === selectedDistrict ? null : district);
        },
      });

      layer.bindTooltip(district, {
        permanent: false,
        direction: 'center',
        className: 'map-tooltip',
      });
    },
    [selectedDistrict, onSelectDistrict]
  );

  // Province styles need to update when selection/hover changes
  const provinceStyleFn = useCallback(
    (feature) => getFeatureStyle(feature, selectedRegion, hoveredProvince),
    [selectedRegion, hoveredProvince]
  );

  // District styles
  const districtStyleFn = useCallback(
    (feature) => getDistrictStyle(feature, selectedDistrict, hoveredDistrict),
    [selectedDistrict, hoveredDistrict]
  );

  // Filter districts to selected region
  const filteredDistricts = useMemo(() => {
    if (!districtsData || !selectedRegion) return null;
    return {
      ...districtsData,
      features: districtsData.features.filter(
        (f) => f.properties.aramRegion === selectedRegion
      ),
    };
  }, [districtsData, selectedRegion]);

  // Force GeoJSON re-render on style changes
  const provinceKey = `prov-${selectedRegion}-${hoveredProvince}`;
  const districtKey = `dist-${selectedRegion}-${selectedDistrict}-${hoveredDistrict}`;

  if (!provincesData) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-aram-green-900">
        <p className="text-white/50 text-sm">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={SRI_LANKA_CENTER}
        zoom={SRI_LANKA_ZOOM}
        className="w-full h-full"
        zoomControl={false}
        attributionControl={false}
        style={{ background: '#1B4332' }}
        minZoom={6}
        maxZoom={12}
        maxBounds={[
          [4.5, 78.5],
          [11, 83],
        ]}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
          opacity={0.4}
        />

        {/* Province layer (always shown) */}
        <GeoJSON
          key={provinceKey}
          ref={geoJsonRef}
          data={provincesData}
          style={provinceStyleFn}
          onEachFeature={onEachProvince}
        />

        {/* District layer (shown when region selected) */}
        {filteredDistricts && (
          <GeoJSON
            key={districtKey}
            ref={districtGeoJsonRef}
            data={filteredDistricts}
            style={districtStyleFn}
            onEachFeature={onEachDistrict}
          />
        )}

        <MapController
          selectedRegion={selectedRegion}
          selectedDistrict={selectedDistrict}
          provincesData={provincesData}
          districtsData={districtsData}
        />
      </MapContainer>

      {/* Map legend */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-aram-green-950/90 backdrop-blur-sm rounded-lg px-3 py-2.5 text-xs">
        <p className="text-white/50 font-mono uppercase tracking-wider text-[10px] mb-1.5">
          Aram Regions
        </p>
        {Object.entries({
          'Hill Country': 'hill-country',
          Eastern: 'eastern',
          Northern: 'northern',
          Western: 'western',
        }).map(([label, id]) => (
          <button
            key={id}
            onClick={() => {
              onSelectRegion(id === selectedRegion ? null : id);
              onSelectDistrict(null);
            }}
            className={`flex items-center gap-2 w-full py-0.5 text-left transition-colors ${
              selectedRegion === id
                ? 'text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <span
              className="w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: ARAM_COLORS[id] }}
            />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
