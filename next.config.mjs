/** @type {import('next').NextConfig} */
import nextPWA from "next-pwa";
const isProd = ["production"].includes(process.env.NODE_ENV);
// 转发
const rewrites = () => {
  if (!isProd) {
    return {
      // fallback: [
      //   {
      //     source: "/saavn/:path*",
      //     destination: "https://saavn.dev/api/:path*",
      //   },
      // ],
    };
  } else {
    return {};
  }
};

const withPWA = nextPWA({
  dest: "public/pwa",
  disable: process.env.NODE_ENV === "development", // 开发环境中禁用 PWA
  register: true,
  skipWaiting: true,
});

const nextConfig = withPWA({
  rewrites,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "c.saavncdn.com",
      },
      {
        protocol: "https",
        hostname: "img1.koowo.com",
      },
      {
        protocol: "https",
        hostname: "www.jiosaavn.com",
      },
    ],
  },
});

export default nextConfig;
