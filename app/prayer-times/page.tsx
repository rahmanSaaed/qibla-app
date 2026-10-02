import type { Metadata } from "next";
import PrayerTimes from "@/components/PrayerTimes";

export const metadata: Metadata = {
  title: "مواقيت الصلاة",
  description: "مواقيت الصلاة اليومية حسب موقعك مع العد التنازلي للصلاة القادمة.",
};

export default function PrayerTimesPage() {
  return <PrayerTimes />;
}
