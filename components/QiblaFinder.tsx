"use client";

import { useEffect, useState } from "react";
import Compass, { isAligned } from "@/components/Compass";
import LocationPicker from "@/components/LocationPicker";
import { useCompass } from "@/hooks/useCompass";
import { useLocation } from "@/hooks/useLocation";
import type { QiblaResponse } from "@/lib/qibla";

type Result = { key: string; data?: QiblaResponse; error?: string };

const numberFormat = new Intl.NumberFormat("ar-EG", { maximumFractionDigits: 0 });
const degreeFormat = new Intl.NumberFormat("ar-EG", { maximumFractionDigits: 1 });

export default function QiblaFinder() {
  const loc = useLocation();
  const compass = useCompass();
  const [result, setResult] = useState<Result | null>(null);

  const lat = loc.location?.lat;
  const lng = loc.location?.lng;
  const key = loc.location ? `${lat},${lng}` : null;

  useEffect(() => {
    if (lat === undefined || lng === undefined || !key) return;
    const controller = new AbortController();

    fetch(`/api/qibla?lat=${lat}&lng=${lng}`, { signal: controller.signal })
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) throw new Error(body.error ?? "تعذّر حساب اتجاه القبلة");
        setResult({ key, data: body as QiblaResponse });
      })
      .catch((err: Error) => {
        if (err.name !== "AbortError") setResult({ key, error: err.message });
      });

    return () => controller.abort();
  }, [key, lat, lng]);

  const current = result?.key === key ? result : null;
  const qibla = current?.data;
  const aligned = qibla ? isAligned(qibla.bearing, compass.heading) : false;

  return (
    <div className="space-y-6">
      <header className="text-center space-y-1">
        <h1 className="text-2xl font-extrabold text-gold">اتجاه القبلة</h1>
        <p className="text-sm text-foreground/70">
          ﴿فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ﴾
        </p>
      </header>

      {!loc.location && (
        <p className="text-center text-foreground/80">
          حدّد موقعك أو اختر مدينتك لحساب اتجاه القبلة.
        </p>
      )}

      {key && !current && <p className="text-center text-foreground/70">جارٍ الحساب...</p>}
      {current?.error && <p className="text-center text-red-300">{current.error}</p>}

      {qibla && (
        <>
          <Compass
            bearing={qibla.bearing}
            heading={compass.heading}
            continuousHeading={compass.continuousHeading}
          />

          <p
            className={`text-center text-lg font-bold transition-colors ${
              aligned ? "text-emerald-300" : "text-foreground"
            }`}
          >
            {compass.status === "active"
              ? aligned
                ? "أنت الآن في اتجاه القبلة"
                : "أدِر الهاتف حتى يصل رمز الكعبة إلى المؤشر"
              : "اتجاه القبلة بالنسبة للشمال الحقيقي"}
          </p>

          <dl className="grid grid-cols-2 gap-3 text-center">
            <div className="rounded-xl bg-white/5 p-3">
              <dt className="text-xs text-foreground/60">زاوية القبلة</dt>
              <dd className="text-xl font-bold">{degreeFormat.format(qibla.bearing)}°</dd>
            </div>
            <div className="rounded-xl bg-white/5 p-3">
              <dt className="text-xs text-foreground/60">المسافة إلى مكة</dt>
              <dd className="text-xl font-bold">{numberFormat.format(qibla.distanceKm)} كم</dd>
            </div>
          </dl>

          {compass.status !== "active" && (
            <div className="space-y-2 text-center">
              <button
                type="button"
                onClick={compass.start}
                className="w-full rounded-xl bg-gold py-3 font-bold text-background hover:brightness-110"
              >
                تفعيل البوصلة
              </button>
              {compass.status === "denied" && (
                <p className="text-sm text-red-300">
                  تم رفض إذن البوصلة. اسمح بالوصول إلى حساسات الحركة من إعدادات المتصفح.
                </p>
              )}
              {compass.status === "unsupported" && (
                <p className="text-sm text-foreground/70">
                  جهازك لا يدعم البوصلة (أجهزة الكمبيوتر ليس بها حساس بوصلة). افتح التطبيق من
                  الهاتف، أو وجّه حرف «ش» إلى الشمال وستجد القبلة عند رمز الكعبة.
                </p>
              )}
              {compass.status === "insecure" && (
                <p className="text-sm text-red-300">
                  البوصلة تحتاج اتصالًا آمنًا (رابط يبدأ بـ https). افتح التطبيق من رابط النشر
                  على الهاتف لتعمل البوصلة.
                </p>
              )}
            </div>
          )}

          {compass.status === "active" && (
            <p className="text-center text-xs text-foreground/60">
              للحصول على دقة أفضل: ضع الهاتف مستويًا وابتعد عن المعادن والأجهزة الكهربائية.
            </p>
          )}
        </>
      )}

      <LocationPicker {...loc} />
    </div>
  );
}
