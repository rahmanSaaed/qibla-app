import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets phones on the local network or through a Cloudflare tunnel load the dev server.
  allowedDevOrigins: ["192.168.*.*", "*.trycloudflare.com"],
};

export default nextConfig;
