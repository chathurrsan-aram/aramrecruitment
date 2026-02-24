/**
 * Shared district metadata for Sri Lanka GeoJSON maps.
 * Used by both the research page map (sri-lanka-map.jsx) and
 * the trip journey map (trip-journey-map.jsx).
 */

/* GADM NAME_1 → district code + province */
export const DISTRICT_META = {
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

export const DISPLAY_NAMES = { NuwaraEliya: 'Nuwara Eliya' };

/**
 * Enrich a GeoJSON FeatureCollection with district codes and display names.
 * Mutates features in place and returns the geo object.
 */
export function enrichGeoData(geo) {
  for (const f of geo.features) {
    const meta = DISTRICT_META[f.properties.NAME_1];
    if (meta) {
      f.properties.code = meta.code;
      f.properties.name = DISPLAY_NAMES[f.properties.NAME_1] || f.properties.NAME_1;
      f.properties.province = meta.province;
    }
  }
  return geo;
}
