/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const isProd = ["production"].includes(process.env.NODE_ENV);
// 转发
const rewrites = () => {
  if (!isProd) {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:7000/:path*",
      },
    ];
  } else {
    return [];
  }
};
const withNextIntl = createNextIntlPlugin("./i18n/i18n.ts");
const nextConfig = {
  rewrites,
};

export default withNextIntl(nextConfig);
