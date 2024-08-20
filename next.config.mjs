/** @type {import('next').NextConfig} */

const isProd = ["production"].includes(process.env.NODE_ENV);
// 转发
const rewrites = () => {
  if (!isProd) {
    return {
      fallback: [
        {
          source: "/saavn/:path*",
          destination: "https://saavn.dev/api/:path*",
        },
      ],
    };
  } else {
    return {};
  }
};
const nextConfig = {
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
};

export default nextConfig;
