import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "اتجاه القبلة ومواقيت الصلاة",
    short_name: "القبلة",
    description: "اعرف اتجاه القبلة ومواقيت الصلاة من موقعك. صدقة جارية.",
    lang: "ar",
    dir: "rtl",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0b3d2e",
    theme_color: "#0b3d2e",
    icons: [
      { src: "/pwa-icon/192", sizes: "192x192", type: "image/png" },
      { src: "/pwa-icon/512", sizes: "512x512", type: "image/png" },
      { src: "/pwa-icon/512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
