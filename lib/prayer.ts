export const CALCULATION_METHODS = [
  { id: 5, name: "الهيئة المصرية العامة للمساحة" },
  { id: 4, name: "جامعة أم القرى، مكة المكرمة" },
  { id: 3, name: "رابطة العالم الإسلامي" },
  { id: 8, name: "منطقة الخليج" },
  { id: 16, name: "دبي" },
  { id: 9, name: "الكويت" },
  { id: 10, name: "قطر" },
  { id: 23, name: "وزارة الأوقاف الأردنية" },
  { id: 19, name: "الجزائر" },
  { id: 18, name: "تونس" },
  { id: 21, name: "المغرب" },
  { id: 13, name: "رئاسة الشؤون الدينية التركية" },
  { id: 1, name: "جامعة العلوم الإسلامية، كراتشي" },
  { id: 2, name: "الجمعية الإسلامية لأمريكا الشمالية" },
  { id: 12, name: "اتحاد المنظمات الإسلامية في فرنسا" },
  { id: 15, name: "لجنة رؤية الهلال العالمية" },
  { id: 14, name: "الإدارة الدينية لمسلمي روسيا" },
  { id: 17, name: "ماليزيا (JAKIM)" },
  { id: 20, name: "إندونيسيا (KEMENAG)" },
  { id: 11, name: "سنغافورة" },
  { id: 22, name: "البرتغال" },
] as const;

export const DEFAULT_METHOD = 5;
export const METHOD_STORAGE_KEY = "prayer-method";

export const PRAYERS = [
  { key: "fajr", name: "الفجر", isPrayer: true },
  { key: "sunrise", name: "الشروق", isPrayer: false },
  { key: "dhuhr", name: "الظهر", isPrayer: true },
  { key: "asr", name: "العصر", isPrayer: true },
  { key: "maghrib", name: "المغرب", isPrayer: true },
  { key: "isha", name: "العشاء", isPrayer: true },
] as const;

export type PrayerKey = (typeof PRAYERS)[number]["key"];

export type PrayerTimesResponse = {
  /** "HH:mm" in the location's local time. */
  timings: Record<PrayerKey, string>;
  hijri: { day: string; month: string; year: string; weekday: string };
  gregorian: string;
  timezone: string;
  method: string;
};

export function isValidMethod(id: number) {
  return CALCULATION_METHODS.some((m) => m.id === id);
}
