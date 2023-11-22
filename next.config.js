/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["upload.wikimedia.org", "127.0.0.1"],
    },
}

module.exports = nextConfig
