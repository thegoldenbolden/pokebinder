/** @type {import("next").NextConfig} */

const nextConfig = {
 reactStrictMode: true,
 images: {
  formats: ["image/avif", "image/webp"],
  domains: ["images.pokemontcg.io"],
 },
 sassOptions: {
  includePaths: ["src/styles"],
  prependData: `@import "main.scss";`,
 },
 experimental: {
  images: {
   allowFutureImage: true,
  },
 },
};

module.exports = nextConfig;
