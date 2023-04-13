/** @type {import('next').NextConfig} */

const path = require("path");

const withNextIntl = require("next-intl/plugin")("./i18n.ts");

const nextConfig = {
  experimental: {
    appDir: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  output: "standalone",
};

module.exports = withNextIntl(nextConfig);
