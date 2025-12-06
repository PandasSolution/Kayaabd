/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  experimental: {
    turbo: {
      rules: {
        "*.scss": {
          loaders: ["sass-loader"],
        },
      },
    },
  },

  sassOptions: {
    includePaths: ["node_modules"],
  },
};

module.exports = nextConfig;
