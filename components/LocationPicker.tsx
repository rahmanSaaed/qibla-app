"use client";

import { useState } from "react";
import type { useLocation } from "@/hooks/useLocation";
import { COUNTRIES, findCountry } from "@/lib/locations";

type Props = ReturnType<typeof useLocation>;

export default function LocationPicker({ location, loading, error, request, selectCity }: Props) {
  const [open, setOpen] = useState(false);
  const [countryCode, setCountryCode] = useState("");

  const selectedCountry = findCountry(countryCode || location?.countryCode);

  const currentLabel = loading
    ? "جارٍ تحديد موقعك..."
    : location
      ? (location.label ?? "جارٍ تحديد اسم المدينة...")
      : "لم يتم تحديد الموقع بعد";

  return (
    <section className="space-y-3 rounded-2xl bg-white/5 p-4">
      <div className="text-center">
        <p className="text-xs text-foreground/60">موقعك الحالي</p>
        <p className="text-lg font-bold">{currentLabel}</p>
        {location && !loading && (
          <p className="text-xs text-foreground/50">
            {location.source === "gps" ? "حسب GPS" : "اختيار يدوي"}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            request();
          }}
          disabled={loading}
          className="rounded-xl bg-gold py-3 text-sm font-bold text-background hover:brightness-110 disabled:opacity-60"
        >
          استخدام موقعي الحالي
        </button>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="rounded-xl border border-white/20 py-3 text-sm font-bold hover:bg-white/10"
        >
          اختيار الدولة والمدينة
        </button>
      </div>

      {open && (
        <div className="grid grid-cols-2 gap-2">
          <select
            aria-label="الدولة"
            value={selectedCountry?.code ?? ""}
            onChange={(e) => setCountryCode(e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-background px-3 py-3"
          >
            <option value="" disabled>
              الدولة
            </option>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            aria-label="المدينة"
            value=""
            disabled={!selectedCountry}
            onChange={(e) => {
              const city = selectedCountry?.cities[Number(e.target.value)];
              if (selectedCountry && city) {
                selectCity(selectedCountry, city);
                setOpen(false);
              }
            }}
            className="w-full rounded-xl border border-white/20 bg-background px-3 py-3 disabled:opacity-50"
          >
            <option value="" disabled>
              المدينة
            </option>
            {selectedCountry?.cities.map((city, i) => (
              <option key={city.name} value={i}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {error && <p className="text-center text-sm text-red-300">{error}</p>}
    </section>
  );
}
