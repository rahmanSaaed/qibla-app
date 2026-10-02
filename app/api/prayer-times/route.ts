import type { NextRequest } from "next/server";
import { isValidCoords } from "@/lib/qibla";
import { DEFAULT_METHOD, isValidMethod, type PrayerTimesResponse } from "@/lib/prayer";

const DATE_PATTERN = /^\d{2}-\d{2}-\d{4}$/;

type AladhanTimings = {
  data: {
    timings: Record<string, string>;
    date: {
      gregorian: { date: string };
      hijri: {
        day: string;
        year: string;
        month: { ar: string };
        weekday: { ar: string };
      };
    };
    meta: { timezone: string; method: { name: string } };
  };
};

const stripSuffix = (time: string) => time.split(" ")[0];

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));
  const method = Number(searchParams.get("method") ?? DEFAULT_METHOD);
  const date = searchParams.get("date") ?? "";

  if (!searchParams.has("lat") || !searchParams.has("lng") || !isValidCoords(lat, lng)) {
    return Response.json({ error: "إحداثيات غير صحيحة" }, { status: 400 });
  }
  if (!isValidMethod(method)) {
    return Response.json({ error: "طريقة حساب غير مدعومة" }, { status: 400 });
  }
  if (!DATE_PATTERN.test(date)) {
    return Response.json({ error: "تاريخ غير صحيح" }, { status: 400 });
  }

  // ~100 m precision is plenty for prayer times and lets nearby users share cache entries.
  const url = new URL(`https://api.aladhan.com/v1/timings/${date}`);
  url.searchParams.set("latitude", lat.toFixed(3));
  url.searchParams.set("longitude", lng.toFixed(3));
  url.searchParams.set("method", String(method));

  let payload: AladhanTimings;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Aladhan responded ${res.status}`);
    payload = await res.json();
  } catch {
    return Response.json(
      { error: "تعذّر جلب مواقيت الصلاة، حاول مرة أخرى بعد قليل" },
      { status: 502 },
    );
  }

  const { timings, date: d, meta } = payload.data;
  const body: PrayerTimesResponse = {
    timings: {
      fajr: stripSuffix(timings.Fajr),
      sunrise: stripSuffix(timings.Sunrise),
      dhuhr: stripSuffix(timings.Dhuhr),
      asr: stripSuffix(timings.Asr),
      maghrib: stripSuffix(timings.Maghrib),
      isha: stripSuffix(timings.Isha),
    },
    hijri: {
      day: d.hijri.day,
      month: d.hijri.month.ar,
      year: d.hijri.year,
      weekday: d.hijri.weekday.ar,
    },
    gregorian: d.gregorian.date,
    timezone: meta.timezone,
    method: meta.method.name,
  };

  return Response.json(body, {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}
