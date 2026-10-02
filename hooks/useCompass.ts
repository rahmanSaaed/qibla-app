"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { normalizeDegrees } from "@/lib/qibla";

export type CompassStatus = "idle" | "active" | "denied" | "unsupported" | "insecure";

type IOSOrientationEvent = DeviceOrientationEvent & { webkitCompassHeading?: number };
type IOSOrientationEventStatic = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

function screenAngle() {
  return typeof screen !== "undefined" && screen.orientation
    ? screen.orientation.angle
    : 0;
}

/**
 * Device heading in degrees clockwise from north.
 * `continuousHeading` is unwrapped (it can go past 360 or below 0) so CSS
 * rotations animate the short way instead of spinning around at north.
 */
export function useCompass() {
  const [status, setStatus] = useState<CompassStatus>("idle");
  const [heading, setHeading] = useState<number | null>(null);
  const [continuousHeading, setContinuousHeading] = useState(0);
  const lastRef = useRef<number | null>(null);
  const accumulatedRef = useRef(0);
  const listeningRef = useRef<{ event: string; handler: (e: Event) => void } | null>(null);

  const stop = useCallback(() => {
    if (listeningRef.current) {
      window.removeEventListener(listeningRef.current.event, listeningRef.current.handler);
      listeningRef.current = null;
    }
  }, []);

  useEffect(() => stop, [stop]);

  const start = useCallback(async () => {
    // Browsers only expose orientation sensors to HTTPS pages (and localhost).
    if (!window.isSecureContext) {
      setStatus("insecure");
      return;
    }
    if (!("DeviceOrientationEvent" in window)) {
      setStatus("unsupported");
      return;
    }

    const OrientationEvent = DeviceOrientationEvent as IOSOrientationEventStatic;
    if (typeof OrientationEvent.requestPermission === "function") {
      try {
        if ((await OrientationEvent.requestPermission()) !== "granted") {
          setStatus("denied");
          return;
        }
      } catch {
        setStatus("denied");
        return;
      }
    }

    stop();

    const handler = (e: Event) => {
      const event = e as IOSOrientationEvent;
      let value: number | null = null;
      if (typeof event.webkitCompassHeading === "number") {
        value = event.webkitCompassHeading;
      } else if (event.absolute && typeof event.alpha === "number") {
        value = 360 - event.alpha;
      }
      if (value === null) return;

      const next = normalizeDegrees(value + screenAngle());
      if (lastRef.current !== null) {
        const delta = ((next - lastRef.current + 540) % 360) - 180;
        accumulatedRef.current += delta;
      } else {
        accumulatedRef.current = next;
      }
      lastRef.current = next;
      setHeading(next);
      setContinuousHeading(accumulatedRef.current);
      setStatus("active");
    };

    const event =
      "ondeviceorientationabsolute" in window ? "deviceorientationabsolute" : "deviceorientation";
    window.addEventListener(event, handler);
    listeningRef.current = { event, handler };

    // Desktops expose the API but never fire a usable reading.
    window.setTimeout(() => {
      if (lastRef.current === null) {
        stop();
        setStatus("unsupported");
      }
    }, 3000);
  }, [stop]);

  return { status, heading, continuousHeading, start };
}
