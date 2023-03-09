/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/discord/invite", destination: "https://discord.gg/yj5Q5mPtzC", permanent: true }];
  },
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com", "atomhacks.nyc3.cdn.digitaloceanspaces.com"],
  },
};

module.exports = nextConfig;
