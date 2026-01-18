/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.wordunscrambler.cc',
          },
        ],
        destination: 'https://wordunscrambler.cc/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig