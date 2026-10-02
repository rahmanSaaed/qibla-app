import type { NextRequest } from "next/server";
import type { ReverseGeocodeResponse } from "@/lib/locations";
import { isValidCoords } from "@/lib/qibla";

type NominatimReverse = {
  address?: {
    city?: string;
    town?: string;
    village?: string;
    county?: string;
    state?: string;
    country?: string;
    country_code?: string;
  };
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));

  if (!searchParams.has("lat") || !searchParams.has("lng") || !isValidCoords(lat, lng)) {
    return Response.json({ error: "إحداثيات غير صحيحة" }, { status: 400 });
  }

  // ~1 km precision is enough to name the city and lets nearby users share cache entries.
  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("lat", lat.toFixed(2));
  url.searchParams.set("lon", lng.toFixed(2));
  url.searchParams.set("zoom", "10");
  url.searchParams.set("accept-language", "ar");

  let payload: NominatimReverse;
  try {
    const res = await fetch(url, {
      // Nominatim's usage policy requires an identifying User-Agent.
      headers: { "User-Agent": "qibla-prayer-times-app/1.0" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`Nominatim responded ${res.status}`);
    payload = await res.json();
  } catch {
    return Response.json({ error: "تعذّر تحديد اسم المدينة" }, { status: 502 });
  }

  const a = payload.address ?? {};
  const body: ReverseGeocodeResponse = {
    city: a.city ?? a.town ?? a.village ?? a.county ?? a.state ?? null,
    country: a.country ?? null,
    countryCode: a.country_code ?? null,
  };

  return Response.json(body, {
    headers: { "Cache-Control": "public, max-age=86400" },
  });
}
