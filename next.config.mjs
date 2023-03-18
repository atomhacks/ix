/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "atomhacks.nyc3.cdn.digitaloceanspaces.com",
      "tr.rbxcdn.com",
      "static.wikia.nocookie.net",
    ],
  },
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
