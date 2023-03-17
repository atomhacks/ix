/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com", "atomhacks.nyc3.cdn.digitaloceanspaces.com"],
  },
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
