import { ImageResponse } from "next/og";

/** App icon: the Kaaba on the app's green background, rendered as a PNG of the given size. */
export function renderAppIcon(size: number) {
  const kaaba = Math.round(size * 0.5);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b3d2e",
        }}
      >
        <div
          style={{
            width: kaaba,
            height: kaaba,
            display: "flex",
            flexDirection: "column",
            background: "#111111",
            borderRadius: Math.round(size * 0.03),
            border: `${Math.max(1, Math.round(size * 0.012))}px solid #d4af37`,
          }}
        >
          <div style={{ height: Math.round(kaaba * 0.22) }} />
          <div style={{ height: Math.round(kaaba * 0.14), background: "#d4af37" }} />
        </div>
      </div>
    ),
    { width: size, height: size },
  );
}
