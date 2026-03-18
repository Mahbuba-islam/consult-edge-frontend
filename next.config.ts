import type { NextConfig } from "next";
import { env } from "./src/types/env";

const nextConfig: NextConfig = {
  /* config options here */

  trailingSlash: false,   

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
    ],
  },
async rewrites() {
  return [
    {
      source: "/api/auth/:path*",
      destination: `${process.env.NEXT_PUBLIC_AUTH_URL}/:path*`,
    },
    {
      source: "/api/:path*",
      destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
    },
  ];
}

};

export default nextConfig;