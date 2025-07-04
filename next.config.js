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
};

module.exports = nextConfig; 