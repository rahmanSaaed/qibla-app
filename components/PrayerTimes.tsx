"use client";

import { useEffect, useState } from "react";
import LocationPicker from "@/components/LocationPicker";
import { useLocation } from "@/hooks/useLocation";
import { useStoredValue } from "@/hooks/useStoredValue";
import {
  CALCULATION_METHODS,
  DEFAULT_METHOD,
  METHOD_STORAGE_KEY,
  PRAYERS,
  isValidMethod,
  type PrayerKey,
  type PrayerTimesResponse,
} from "@/lib/prayer";

type Result = { key: string; coordsKey: string; data?: PrayerTimesResponse; error?: string };

const timeFormat = new Intl.DateTimeFormat("ar-EG", { hour: "numeric", minute: "2-digit" });
const pad = new Intl.NumberFormat("ar-EG", { minimumIntegerDigits: 2 });
const digits = new Intl.NumberFormat("ar-EG", { useGrouping: false });
const dateFormat = new Intl.DateTimeFormat("ar-EG", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function toApiDate(d: Date) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}-${mm}-${d.getFullYear()}`;
}

/**
 * The wall-clock time in `timeZone`, expressed as a device-local Date so it can
 * be compared directly with prayer times built from "HH:mm" strings.
 */
function wallClock(now: Date, timeZone: string | undefined) {
  if (!timeZone) return now;
  try {
    const parts = Object.fromEntries(
      new Intl.DateTimeFormat("en-US", {
        timeZone,
        hourCycle: "h23",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
        .formatToParts(now)
        .map((p) => [p.type, Number(p.value)]),
    );
    return new Date(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  } catch {
    return now;
  }
}

function atTime(base: Date, hhmm: string, addDays = 0) {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date(base);
  d.setDate(d.getDate() + addDays);
  d.setHours(h, m, 0, 0);
  return d;
}

function findNextPrayer(timings: Record<PrayerKey, string>, now: Date) {
  for (const prayer of PRAYERS) {
    if (!prayer.isPrayer) continue;
    const at = atTime(now, timings[prayer.key]);
    if (at > now) return { key: prayer.key, name: prayer.name, at };
  }
  return { key: "fajr" as const, name: "الفجر", at: atTime(now, timings.fajr, 1) };
}

function formatCountdown(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${pad.format(h)}:${pad.format(m)}:${pad.format(s)}`;
}

export default function PrayerTimes() {
  const loc = useLocation();
  const { location } = loc;
  const [storedMethod, setStoredMethod] = useStoredValue(METHOD_STORAGE_KEY);
  const method =
    storedMethod && isValidMethod(Number(storedMethod)) ? Number(storedMethod) : DEFAULT_METHOD;

  const [now, setNow] = useState(() => new Date());
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const lat = location?.lat;
  const lng = location?.lng;
  const coordsKey = location ? `${lat},${lng}` : null;
  const timeZone = result && result.coordsKey === coordsKey ? result.data?.timezone : undefined;
  const localNow = wallClock(now, timeZone);
  const apiDate = toApiDate(localNow);
  const key = coordsKey ? `${coordsKey}|${method}|${apiDate}` : null;

  useEffect(() => {
    if (lat === undefined || lng === undefined || !key || !coordsKey) return;
    const controller = new AbortController();
    const params = new URLSearchParams({
      lat: String(lat),
      lng: String(lng),
      method: String(method),
      date: apiDate,
    });

    fetch(`/api/prayer-times?${params}`, { signal: controller.signal })
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) throw new Error(body.error ?? "تعذّر جلب مواقيت الصلاة");
        setResult({ key, coordsKey, data: body as PrayerTimesResponse });
      })
      .catch((err: Error) => {
        if (err.name !== "AbortError") setResult({ key, coordsKey, error: err.message });
      });

    return () => controller.abort();
  }, [key, coordsKey, lat, lng, method, apiDate]);

  const current = result?.key === key ? result : null;
  const data = current?.data;
  const next = data ? findNextPrayer(data.timings, localNow) : null;
  const isOtherTimeZone = Math.abs(localNow.getTime() - now.getTime()) >= 60_000;

  return (
    <div className="space-y-6">
      <header className="text-center space-y-1">
        <h1 className="text-2xl font-extrabold text-gold">مواقيت الصلاة</h1>
        {data && (
          <p className="text-sm text-foreground/80">
            {data.hijri.weekday} {digits.format(Number(data.hijri.day))} {data.hijri.month}{" "}
            {digits.format(Number(data.hijri.year))} هـ
            <span className="mx-2 text-foreground/40">|</span>
            {dateFormat.format(localNow)}
          </p>
        )}
      </header>

      <LocationPicker {...loc} />

      {key && !current && <p className="text-center text-foreground/70">جارٍ التحميل...</p>}
      {current?.error && <p className="text-center text-red-300">{current.error}</p>}

      {data && next && (
        <>
          <section className="rounded-2xl border border-gold/40 bg-gold/10 p-5 text-center">
            <p className="text-sm text-foreground/70">الصلاة القادمة</p>
            <p className="text-3xl font-extrabold text-gold">{next.name}</p>
            <p className="mt-1 text-sm text-foreground/70">
              بعد{" "}
              <span dir="ltr" className="font-mono text-lg font-bold text-foreground">
                {formatCountdown(next.at.getTime() - localNow.getTime())}
              </span>
            </p>
            {isOtherTimeZone && (
              <p className="mt-2 text-xs text-foreground/60">
                الساعة الآن هناك {timeFormat.format(localNow)}
              </p>
            )}
          </section>

          <ul className="divide-y divide-white/10 overflow-hidden rounded-2xl bg-white/5">
            {PRAYERS.map((prayer) => {
              const isNext = prayer.key === next.key;
              return (
                <li
                  key={prayer.key}
                  className={`flex items-center justify-between px-5 py-4 ${
                    isNext ? "bg-gold/15" : ""
                  } ${prayer.isPrayer ? "" : "text-foreground/60"}`}
                >
                  <span className={`font-bold ${isNext ? "text-gold" : ""}`}>{prayer.name}</span>
                  <span className="text-lg font-semibold">
                    {timeFormat.format(atTime(localNow, data.timings[prayer.key]))}
                  </span>
                </li>
              );
            })}
          </ul>
        </>
      )}

      <label className="block space-y-2">
        <span className="text-sm text-foreground/70">طريقة الحساب</span>
        <select
          value={method}
          onChange={(e) => setStoredMethod(e.target.value)}
          className="w-full rounded-xl border border-white/20 bg-background px-3 py-3"
        >
          {CALCULATION_METHODS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
