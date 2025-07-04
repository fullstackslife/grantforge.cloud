/** @type {import('next').NextConfig} */
const nextConfig = {
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
    // optimizeCss: true, // Disabled due to missing critters dependency
  },
};

module.exports = nextConfig; 