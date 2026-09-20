/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";
const apiBase =
  process.env.NEXT_PUBLIC_API_BASE ||
  (isDev ? "http://localhost:8000" : "https://vidya-setu-backend.onrender.com");

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${apiBase}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
