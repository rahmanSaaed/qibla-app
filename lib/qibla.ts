export const KAABA = { lat: 21.4225, lng: 39.8262 } as const;

const EARTH_RADIUS_KM = 6371;

const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;

export function normalizeDegrees(deg: number) {
  return ((deg % 360) + 360) % 360;
}

/** Initial great-circle bearing from the given point to the Kaaba, clockwise from true north. */
export function qiblaBearing(lat: number, lng: number) {
  const phi1 = toRad(lat);
  const phi2 = toRad(KAABA.lat);
  const deltaLambda = toRad(KAABA.lng - lng);

  const y = Math.sin(deltaLambda);
  const x =
    Math.cos(phi1) * Math.tan(phi2) - Math.sin(phi1) * Math.cos(deltaLambda);

  return normalizeDegrees(toDeg(Math.atan2(y, x)));
}

export function distanceToKaabaKm(lat: number, lng: number) {
  const dPhi = toRad(KAABA.lat - lat);
  const dLambda = toRad(KAABA.lng - lng);
  const a =
    Math.sin(dPhi / 2) ** 2 +
    Math.cos(toRad(lat)) * Math.cos(toRad(KAABA.lat)) * Math.sin(dLambda / 2) ** 2;

  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
}

export function isValidCoords(lat: number, lng: number) {
  return (
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    Math.abs(lat) <= 90 &&
    Math.abs(lng) <= 180
  );
}

export type QiblaResponse = {
  bearing: number;
  distanceKm: number;
};
