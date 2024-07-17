/** @type {import('next').NextConfig} */

const isProd = ["production"].includes(process.env.NODE_ENV);
// 转发
const rewrites = () => {
  if (!isProd) {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8001/:path*",
      },
    ];
  } else {
    return [];
  }
};
const nextConfig = {
  rewrites,
};

export default nextConfig;
