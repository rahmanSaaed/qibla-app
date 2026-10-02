"use client";

import { useEffect } from "react";
import { normalizeDegrees } from "@/lib/qibla";

const ALIGN_TOLERANCE_DEG = 5;

const cardinals = [
  { angle: 0, label: "ش" },
  { angle: 90, label: "ق" },
  { angle: 180, label: "ج" },
  { angle: 270, label: "غ" },
];

const ticks = Array.from({ length: 72 }, (_, i) => i * 5);

type Props = {
  bearing: number;
  heading: number | null;
  continuousHeading: number;
};

export function isAligned(bearing: number, heading: number | null) {
  if (heading === null) return false;
  const diff = Math.abs(((normalizeDegrees(bearing - heading) + 180) % 360) - 180);
  return diff <= ALIGN_TOLERANCE_DEG;
}

export default function Compass({ bearing, heading, continuousHeading }: Props) {
  const aligned = isAligned(bearing, heading);
  const dialRotation = heading === null ? 0 : -continuousHeading;

  useEffect(() => {
    if (aligned && "vibrate" in navigator) navigator.vibrate(80);
  }, [aligned]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-72">
      <svg
        viewBox="0 0 200 200"
        className={`absolute -top-3 left-1/2 z-10 w-6 -translate-x-1/2 transition-colors ${
          aligned ? "text-emerald-400" : "text-gold"
        }`}
        aria-hidden
      >
        <polygon points="100,200 40,40 160,40" fill="currentColor" />
      </svg>

      <div
        className="h-full w-full transition-transform duration-200 ease-out"
        style={{ transform: `rotate(${dialRotation}deg)` }}
      >
        <svg viewBox="0 0 200 200" className="h-full w-full" role="img" aria-label="بوصلة القبلة">
          <circle
            cx="100"
            cy="100"
            r="96"
            className={`transition-colors ${aligned ? "fill-emerald-900/70" : "fill-black/25"}`}
            stroke="currentColor"
            strokeOpacity="0.3"
            strokeWidth="2"
          />

          {ticks.map((angle) => {
            const major = angle % 30 === 0;
            return (
              <line
                key={angle}
                x1="100"
                y1="6"
                x2="100"
                y2={major ? 16 : 11}
                stroke="currentColor"
                strokeOpacity={major ? 0.8 : 0.35}
                strokeWidth={major ? 1.5 : 1}
                transform={`rotate(${angle} 100 100)`}
              />
            );
          })}

          {cardinals.map(({ angle, label }) => (
            <text
              key={angle}
              x="100"
              y="32"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={angle === 0 ? "#f87171" : "currentColor"}
              transform={`rotate(${angle} 100 100)`}
            >
              {label}
            </text>
          ))}

          <g transform={`rotate(${bearing} 100 100)`}>
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="52"
              stroke="var(--gold)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <g transform="translate(88 30)">
              <rect width="24" height="24" rx="2" fill="#111" stroke="var(--gold)" strokeWidth="1" />
              <rect y="6" width="24" height="4" fill="var(--gold)" />
            </g>
          </g>

          <circle cx="100" cy="100" r="5" fill="var(--gold)" />
        </svg>
      </div>
    </div>
  );
}
