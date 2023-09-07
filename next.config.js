/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/auth/sign-in",
        permanent: true,
      },
      {
        source: "/auth",
        destination: "/auth/sign-in",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
