/** @type {import('next').NextConfig} */
const backendHost = process.env.BACKEND_HOST;
const backendPort = process.env.BACKEND_PORT || "8000";
const apiBase =
  process.env.NEXT_PUBLIC_API_BASE ||
  (backendHost ? `http://${backendHost}:${backendPort}` : "http://localhost:8000");

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
