"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  findCountry,
  type City,
  type Country,
  type ReverseGeocodeResponse,
} from "@/lib/locations";
import { METHOD_STORAGE_KEY } from "@/lib/prayer";
import { readStoredValue, useStoredValue, writeStoredValue } from "./useStoredValue";

export type SavedLocation = {
  lat: number;
  lng: number;
  source: "gps" | "manual";
  label?: string;
  countryCode?: string;
};

const STORAGE_KEY = "last-location";

const errorMessages: Record<number, string> = {
  1: "تم رفض إذن الموقع. فعّله من إعدادات المتصفح، أو اختر الدولة والمدينة يدويًا.",
  2: "تعذّر تحديد موقعك. تأكد من تشغيل خدمة الموقع (GPS)، أو اختر المدينة يدويًا.",
  3: "انتهت مهلة تحديد الموقع. حاول مرة أخرى، أو اختر المدينة يدويًا.",
};

function parseLocation(raw: string | null): SavedLocation | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw);
    if (typeof value?.lat !== "number" || typeof value?.lng !== "number") return null;
    return {
      lat: value.lat,
      lng: value.lng,
      source: value.source === "manual" ? "manual" : "gps",
      label: typeof value.label === "string" ? value.label : undefined,
      countryCode: typeof value.countryCode === "string" ? value.countryCode : undefined,
    };
  } catch {
    return null;
  }
}

function save(location: SavedLocation) {
  writeStoredValue(STORAGE_KEY, JSON.stringify(location));
}

/**
 * The user's location, from GPS or a manually picked city, persisted so both
 * pages share it. GPS positions get a human-readable label via reverse geocoding.
 */
export function useLocation() {
  const [stored] = useStoredValue(STORAGE_KEY);
  const location = useMemo(() => parseLocation(stored), [stored]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const labelRequestedFor = useRef<string | null>(null);

  useEffect(() => {
    if (!location || location.label || location.source === "manual") return;
    const key = `${location.lat},${location.lng}`;
    if (labelRequestedFor.current === key) return;
    labelRequestedFor.current = key;

    fetch(`/api/reverse-geocode?lat=${location.lat}&lng=${location.lng}`)
      .then((res) => (res.ok ? (res.json() as Promise<ReverseGeocodeResponse>) : null))
      .then((place) => {
        if (!place) return;
        const latest = parseLocation(readStoredValue(STORAGE_KEY));
        if (!latest || latest.lat !== location.lat || latest.lng !== location.lng) return;

        const label = [place.city, place.country].filter(Boolean).join("، ");
        save({ ...latest, label: label || undefined, countryCode: place.countryCode ?? undefined });

        const country = findCountry(place.countryCode ?? undefined);
        if (country && !readStoredValue(METHOD_STORAGE_KEY)) {
          writeStoredValue(METHOD_STORAGE_KEY, String(country.method));
        }
      })
      .catch(() => {});
  }, [location]);

  const request = useCallback(() => {
    if (!window.isSecureContext) {
      setError("تحديد الموقع يحتاج اتصالًا آمنًا (HTTPS). اختر الدولة والمدينة يدويًا بدلًا من ذلك.");
      return;
    }
    if (!("geolocation" in navigator)) {
      setError("المتصفح لا يدعم تحديد الموقع. اختر الدولة والمدينة يدويًا.");
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        save({ lat: coords.latitude, lng: coords.longitude, source: "gps" });
        setLoading(false);
      },
      (err) => {
        setError(errorMessages[err.code] ?? "حدث خطأ أثناء تحديد الموقع.");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 5 * 60 * 1000 },
    );
  }, []);

  const selectCity = useCallback((country: Country, city: City) => {
    setError(null);
    save({
      lat: city.lat,
      lng: city.lng,
      source: "manual",
      label: `${city.name}، ${country.name}`,
      countryCode: country.code,
    });
    writeStoredValue(METHOD_STORAGE_KEY, String(country.method));
  }, []);

  return { location, loading, error, request, selectCity };
}
