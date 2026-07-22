/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 90],
  },
  async redirects() {
    return [
      {
        source: "/aboutme",
        has: [{ type: "host", value: "portfolio-oangsa.vercel.app" }],
        destination: "https://me.oangsa.com/profile",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "portfolio-oangsa.vercel.app" }],
        destination: "https://me.oangsa.com/:path*",
        permanent: true,
      },
      {
        source: "/aboutme",
        destination: "/profile",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
