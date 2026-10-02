import type { NextRequest } from "next/server";
import {
  distanceToKaabaKm,
  isValidCoords,
  qiblaBearing,
  type QiblaResponse,
} from "@/lib/qibla";

export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));

  if (!searchParams.has("lat") || !searchParams.has("lng") || !isValidCoords(lat, lng)) {
    return Response.json({ error: "إحداثيات غير صحيحة" }, { status: 400 });
  }

  const body: QiblaResponse = {
    bearing: qiblaBearing(lat, lng),
    distanceKm: distanceToKaabaKm(lat, lng),
  };

  return Response.json(body, {
    headers: { "Cache-Control": "public, max-age=86400, immutable" },
  });
}
