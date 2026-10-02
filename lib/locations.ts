export type City = { name: string; lat: number; lng: number };
export type Country = {
  /** ISO 3166-1 alpha-2, lowercase (matches the reverse-geocoder's country_code). */
  code: string;
  name: string;
  /** Aladhan calculation method commonly used in this country. */
  method: number;
  cities: City[];
};

export const COUNTRIES: Country[] = [
  {
    code: "eg",
    name: "مصر",
    method: 5,
    cities: [
      { name: "القاهرة", lat: 30.0444, lng: 31.2357 },
      { name: "الجيزة", lat: 30.0131, lng: 31.2089 },
      { name: "الإسكندرية", lat: 31.2001, lng: 29.9187 },
      { name: "بورسعيد", lat: 31.2653, lng: 32.3019 },
      { name: "السويس", lat: 29.9668, lng: 32.5498 },
      { name: "الإسماعيلية", lat: 30.5965, lng: 32.2715 },
      { name: "المنصورة", lat: 31.0409, lng: 31.3785 },
      { name: "طنطا", lat: 30.7865, lng: 31.0004 },
      { name: "الزقازيق", lat: 30.5877, lng: 31.502 },
      { name: "دمنهور", lat: 31.0341, lng: 30.4682 },
      { name: "كفر الشيخ", lat: 31.1107, lng: 30.9388 },
      { name: "دمياط", lat: 31.4165, lng: 31.8133 },
      { name: "بنها", lat: 30.4659, lng: 31.1848 },
      { name: "شبين الكوم", lat: 30.5582, lng: 31.0118 },
      { name: "الفيوم", lat: 29.3084, lng: 30.8428 },
      { name: "بني سويف", lat: 29.0661, lng: 31.0994 },
      { name: "المنيا", lat: 28.0871, lng: 30.7618 },
      { name: "أسيوط", lat: 27.1783, lng: 31.1859 },
      { name: "سوهاج", lat: 26.5591, lng: 31.6957 },
      { name: "قنا", lat: 26.1551, lng: 32.716 },
      { name: "الأقصر", lat: 25.6872, lng: 32.6396 },
      { name: "أسوان", lat: 24.0889, lng: 32.8998 },
      { name: "الغردقة", lat: 27.2579, lng: 33.8116 },
      { name: "شرم الشيخ", lat: 27.9158, lng: 34.33 },
      { name: "مرسى مطروح", lat: 31.3543, lng: 27.2373 },
      { name: "العريش", lat: 31.1316, lng: 33.7984 },
    ],
  },
  {
    code: "sa",
    name: "السعودية",
    method: 4,
    cities: [
      { name: "مكة المكرمة", lat: 21.3891, lng: 39.8579 },
      { name: "المدينة المنورة", lat: 24.4686, lng: 39.6142 },
      { name: "الرياض", lat: 24.7136, lng: 46.6753 },
      { name: "جدة", lat: 21.4858, lng: 39.1925 },
      { name: "الدمام", lat: 26.4207, lng: 50.0888 },
      { name: "الخبر", lat: 26.2172, lng: 50.1971 },
      { name: "الطائف", lat: 21.2703, lng: 40.4158 },
      { name: "تبوك", lat: 28.3835, lng: 36.5662 },
      { name: "بريدة", lat: 26.326, lng: 43.975 },
      { name: "حائل", lat: 27.5114, lng: 41.7208 },
      { name: "أبها", lat: 18.2164, lng: 42.5053 },
      { name: "جازان", lat: 16.8892, lng: 42.5511 },
      { name: "نجران", lat: 17.5656, lng: 44.2289 },
    ],
  },
  {
    code: "ae",
    name: "الإمارات",
    method: 16,
    cities: [
      { name: "أبوظبي", lat: 24.4539, lng: 54.3773 },
      { name: "دبي", lat: 25.2048, lng: 55.2708 },
      { name: "الشارقة", lat: 25.3463, lng: 55.4209 },
      { name: "عجمان", lat: 25.4052, lng: 55.5136 },
      { name: "العين", lat: 24.2075, lng: 55.7447 },
      { name: "رأس الخيمة", lat: 25.8007, lng: 55.9762 },
      { name: "الفجيرة", lat: 25.1288, lng: 56.3265 },
      { name: "أم القيوين", lat: 25.5647, lng: 55.5552 },
    ],
  },
  {
    code: "kw",
    name: "الكويت",
    method: 9,
    cities: [
      { name: "مدينة الكويت", lat: 29.3759, lng: 47.9774 },
      { name: "حولي", lat: 29.3328, lng: 48.0286 },
      { name: "الجهراء", lat: 29.3375, lng: 47.6581 },
      { name: "الأحمدي", lat: 29.0769, lng: 48.0838 },
    ],
  },
  {
    code: "qa",
    name: "قطر",
    method: 10,
    cities: [
      { name: "الدوحة", lat: 25.2854, lng: 51.531 },
      { name: "الريان", lat: 25.2919, lng: 51.4244 },
      { name: "الوكرة", lat: 25.1659, lng: 51.5976 },
      { name: "الخور", lat: 25.6839, lng: 51.5058 },
    ],
  },
  {
    code: "bh",
    name: "البحرين",
    method: 8,
    cities: [
      { name: "المنامة", lat: 26.2285, lng: 50.586 },
      { name: "المحرق", lat: 26.2572, lng: 50.6119 },
      { name: "الرفاع", lat: 26.13, lng: 50.555 },
    ],
  },
  {
    code: "om",
    name: "عُمان",
    method: 8,
    cities: [
      { name: "مسقط", lat: 23.588, lng: 58.3829 },
      { name: "صلالة", lat: 17.0151, lng: 54.0924 },
      { name: "صحار", lat: 24.3474, lng: 56.7299 },
      { name: "نزوى", lat: 22.9333, lng: 57.5333 },
      { name: "صور", lat: 22.5667, lng: 59.5289 },
    ],
  },
  {
    code: "jo",
    name: "الأردن",
    method: 23,
    cities: [
      { name: "عمّان", lat: 31.9539, lng: 35.9106 },
      { name: "الزرقاء", lat: 32.0728, lng: 36.088 },
      { name: "إربد", lat: 32.5556, lng: 35.85 },
      { name: "السلط", lat: 32.0392, lng: 35.7272 },
      { name: "الكرك", lat: 31.1853, lng: 35.7048 },
      { name: "العقبة", lat: 29.5321, lng: 35.0063 },
    ],
  },
  {
    code: "ps",
    name: "فلسطين",
    method: 3,
    cities: [
      { name: "القدس", lat: 31.7683, lng: 35.2137 },
      { name: "غزة", lat: 31.5017, lng: 34.4668 },
      { name: "رام الله", lat: 31.9038, lng: 35.2034 },
      { name: "نابلس", lat: 32.2211, lng: 35.2544 },
      { name: "الخليل", lat: 31.5326, lng: 35.0998 },
      { name: "جنين", lat: 32.4594, lng: 35.3009 },
    ],
  },
  {
    code: "lb",
    name: "لبنان",
    method: 3,
    cities: [
      { name: "بيروت", lat: 33.8938, lng: 35.5018 },
      { name: "طرابلس", lat: 34.4367, lng: 35.8497 },
      { name: "صيدا", lat: 33.5571, lng: 35.3729 },
      { name: "صور", lat: 33.2705, lng: 35.2038 },
    ],
  },
  {
    code: "sy",
    name: "سوريا",
    method: 3,
    cities: [
      { name: "دمشق", lat: 33.5138, lng: 36.2765 },
      { name: "حلب", lat: 36.2021, lng: 37.1343 },
      { name: "حمص", lat: 34.7324, lng: 36.7137 },
      { name: "حماة", lat: 35.1318, lng: 36.7578 },
      { name: "اللاذقية", lat: 35.5317, lng: 35.7901 },
    ],
  },
  {
    code: "iq",
    name: "العراق",
    method: 3,
    cities: [
      { name: "بغداد", lat: 33.3152, lng: 44.3661 },
      { name: "البصرة", lat: 30.5085, lng: 47.7804 },
      { name: "الموصل", lat: 36.34, lng: 43.13 },
      { name: "أربيل", lat: 36.1911, lng: 44.0092 },
      { name: "النجف", lat: 32.0259, lng: 44.3462 },
      { name: "كربلاء", lat: 32.616, lng: 44.0249 },
    ],
  },
  {
    code: "ye",
    name: "اليمن",
    method: 3,
    cities: [
      { name: "صنعاء", lat: 15.3694, lng: 44.191 },
      { name: "عدن", lat: 12.7855, lng: 45.0187 },
      { name: "تعز", lat: 13.5795, lng: 44.0209 },
      { name: "الحديدة", lat: 14.7978, lng: 42.9545 },
      { name: "المكلا", lat: 14.5425, lng: 49.1242 },
    ],
  },
  {
    code: "sd",
    name: "السودان",
    method: 5,
    cities: [
      { name: "الخرطوم", lat: 15.5007, lng: 32.5599 },
      { name: "أم درمان", lat: 15.6445, lng: 32.4777 },
      { name: "بورتسودان", lat: 19.6158, lng: 37.2164 },
      { name: "ود مدني", lat: 14.4012, lng: 33.5199 },
      { name: "كسلا", lat: 15.451, lng: 36.4 },
    ],
  },
  {
    code: "ly",
    name: "ليبيا",
    method: 3,
    cities: [
      { name: "طرابلس", lat: 32.8872, lng: 13.1913 },
      { name: "بنغازي", lat: 32.1167, lng: 20.0667 },
      { name: "مصراتة", lat: 32.3754, lng: 15.0925 },
      { name: "سبها", lat: 27.0377, lng: 14.4283 },
    ],
  },
  {
    code: "tn",
    name: "تونس",
    method: 18,
    cities: [
      { name: "تونس العاصمة", lat: 36.8065, lng: 10.1815 },
      { name: "صفاقس", lat: 34.7406, lng: 10.7603 },
      { name: "سوسة", lat: 35.8256, lng: 10.6084 },
      { name: "القيروان", lat: 35.6781, lng: 10.0963 },
      { name: "بنزرت", lat: 37.2744, lng: 9.8739 },
    ],
  },
  {
    code: "dz",
    name: "الجزائر",
    method: 19,
    cities: [
      { name: "الجزائر العاصمة", lat: 36.7538, lng: 3.0588 },
      { name: "وهران", lat: 35.6971, lng: -0.6308 },
      { name: "قسنطينة", lat: 36.365, lng: 6.6147 },
      { name: "عنابة", lat: 36.9, lng: 7.7667 },
      { name: "سطيف", lat: 36.19, lng: 5.41 },
      { name: "باتنة", lat: 35.5559, lng: 6.1741 },
    ],
  },
  {
    code: "ma",
    name: "المغرب",
    method: 21,
    cities: [
      { name: "الرباط", lat: 34.0209, lng: -6.8416 },
      { name: "الدار البيضاء", lat: 33.5731, lng: -7.5898 },
      { name: "فاس", lat: 34.0181, lng: -5.0078 },
      { name: "مراكش", lat: 31.6295, lng: -7.9811 },
      { name: "طنجة", lat: 35.7595, lng: -5.834 },
      { name: "مكناس", lat: 33.8935, lng: -5.5473 },
      { name: "أكادير", lat: 30.4278, lng: -9.5981 },
      { name: "وجدة", lat: 34.6814, lng: -1.9086 },
    ],
  },
  {
    code: "mr",
    name: "موريتانيا",
    method: 3,
    cities: [
      { name: "نواكشوط", lat: 18.0735, lng: -15.9582 },
      { name: "نواذيبو", lat: 20.9425, lng: -17.0362 },
    ],
  },
  {
    code: "tr",
    name: "تركيا",
    method: 13,
    cities: [
      { name: "إسطنبول", lat: 41.0082, lng: 28.9784 },
      { name: "أنقرة", lat: 39.9334, lng: 32.8597 },
      { name: "إزمير", lat: 38.4237, lng: 27.1428 },
      { name: "بورصة", lat: 40.1885, lng: 29.061 },
      { name: "أنطاليا", lat: 36.8969, lng: 30.7133 },
      { name: "غازي عنتاب", lat: 37.0662, lng: 37.3833 },
    ],
  },
  {
    code: "pk",
    name: "باكستان",
    method: 1,
    cities: [
      { name: "كراتشي", lat: 24.8607, lng: 67.0011 },
      { name: "لاهور", lat: 31.5204, lng: 74.3587 },
      { name: "إسلام آباد", lat: 33.6844, lng: 73.0479 },
    ],
  },
  {
    code: "my",
    name: "ماليزيا",
    method: 17,
    cities: [
      { name: "كوالالمبور", lat: 3.139, lng: 101.6869 },
      { name: "بينانغ", lat: 5.4141, lng: 100.3288 },
    ],
  },
  {
    code: "id",
    name: "إندونيسيا",
    method: 20,
    cities: [
      { name: "جاكرتا", lat: -6.2088, lng: 106.8456 },
      { name: "سورابايا", lat: -7.2575, lng: 112.7521 },
    ],
  },
  {
    code: "gb",
    name: "المملكة المتحدة",
    method: 15,
    cities: [
      { name: "لندن", lat: 51.5074, lng: -0.1278 },
      { name: "برمنغهام", lat: 52.4862, lng: -1.8904 },
      { name: "مانشستر", lat: 53.4808, lng: -2.2426 },
      { name: "غلاسكو", lat: 55.8642, lng: -4.2518 },
    ],
  },
  {
    code: "de",
    name: "ألمانيا",
    method: 3,
    cities: [
      { name: "برلين", lat: 52.52, lng: 13.405 },
      { name: "هامبورغ", lat: 53.5511, lng: 9.9937 },
      { name: "ميونخ", lat: 48.1351, lng: 11.582 },
      { name: "فرانكفورت", lat: 50.1109, lng: 8.6821 },
      { name: "كولونيا", lat: 50.9375, lng: 6.9603 },
    ],
  },
  {
    code: "fr",
    name: "فرنسا",
    method: 12,
    cities: [
      { name: "باريس", lat: 48.8566, lng: 2.3522 },
      { name: "مارسيليا", lat: 43.2965, lng: 5.3698 },
      { name: "ليون", lat: 45.764, lng: 4.8357 },
      { name: "تولوز", lat: 43.6047, lng: 1.4442 },
    ],
  },
  {
    code: "us",
    name: "الولايات المتحدة",
    method: 2,
    cities: [
      { name: "نيويورك", lat: 40.7128, lng: -74.006 },
      { name: "واشنطن", lat: 38.9072, lng: -77.0369 },
      { name: "شيكاغو", lat: 41.8781, lng: -87.6298 },
      { name: "هيوستن", lat: 29.7604, lng: -95.3698 },
      { name: "ديترويت", lat: 42.3314, lng: -83.0458 },
      { name: "لوس أنجلوس", lat: 34.0522, lng: -118.2437 },
    ],
  },
  {
    code: "ca",
    name: "كندا",
    method: 2,
    cities: [
      { name: "تورونتو", lat: 43.6532, lng: -79.3832 },
      { name: "مونتريال", lat: 45.5017, lng: -73.5673 },
      { name: "أوتاوا", lat: 45.4215, lng: -75.6972 },
      { name: "فانكوفر", lat: 49.2827, lng: -123.1207 },
    ],
  },
];

export type ReverseGeocodeResponse = {
  city: string | null;
  country: string | null;
  countryCode: string | null;
};

export function findCountry(code: string | undefined) {
  return code ? COUNTRIES.find((c) => c.code === code.toLowerCase()) : undefined;
}
