const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cpus: 1,
  },
  images: {
    domains: [
      'localhost',
      'images.unsplash.com',
      '192.168.111.183',
      '192.168.111.183',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.yascript.com',
        pathname: '/**',
      },
    ],
  },

};

module.exports = withNextIntl(nextConfig);