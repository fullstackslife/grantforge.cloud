/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure proper environment
  env: {
    NODE_ENV: process.env.NODE_ENV || 'production',
  },
  async redirects() {
    return [
      {
        source: '/discover',
        destination: '/grants',
        permanent: true,
      },
    ];
  },
  // Optimize for production
  compress: true,
  poweredByHeader: false,
  // Enable static optimization where possible
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig; 